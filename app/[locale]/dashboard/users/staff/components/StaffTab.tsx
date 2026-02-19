'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import { getApiUrl } from '@/app/config';
import StaffUpsertModal, { type StaffUpsertPayload } from './StaffUpsertModal';
import StaffDeleteModal from './StaffDeleteModal';
import type { DepartmentRecord, PositionRecord, StaffRecord, StaffStatus } from './types';
import type { RoleRecord } from '../../../_config/rbac';
import StaffRolesModal from './StaffRolesModal';

type Meta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number | null;
  to?: number | null;
};

type PaginatedResponse<T> = {
  data: T[];
  meta?: Meta;
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
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function resolveName(item: { name?: string; names?: { en?: string; ar?: string } } | null | undefined): string {
  if (!item) return '-';
  return normalizeText(item.names?.en) || normalizeText(item.name) || '-';
}

function normalizeStaff(payload: unknown): StaffRecord[] {
  if (!payload || typeof payload !== 'object') return [];
  const data = (payload as { data?: unknown }).data;
  if (!Array.isArray(data)) return [];

  return data
    .map((entry) => {
      const row = entry as {
        id?: number | string;
        name?: string;
        email?: string;
        roles?: unknown;
        department?: DepartmentRecord | null;
        position?: PositionRecord | null;
        profile_photo_url?: string | null;
        status?: string;
        verified?: boolean | number | string;
      };

      const numericId = Number(row.id);
      if (!Number.isFinite(numericId) || numericId <= 0) return null;

      const roles = Array.isArray(row.roles) ? row.roles.filter((r): r is string => typeof r === 'string') : [];

      const department =
        row.department && typeof row.department === 'object' && !Array.isArray(row.department) ? row.department : null;
      const position =
        row.position && typeof row.position === 'object' && !Array.isArray(row.position) ? row.position : null;

      return {
        id: numericId,
        name: normalizeText(row.name) || 'Unknown',
        email: normalizeText(row.email) || '-',
        roles,
        department,
        position,
        profilePhotoUrl: typeof row.profile_photo_url === 'string' && row.profile_photo_url.trim() ? row.profile_photo_url : null,
        status: normalizeText(row.status) || 'unknown',
        verified: Boolean(row.verified),
      } satisfies StaffRecord;
    })
    .filter((staff): staff is StaffRecord => staff !== null);
}

function normalizeMeta(meta: unknown, fallbackPage: number): Meta {
  const safeFallback: Meta = { current_page: fallbackPage, last_page: 1, per_page: 10, total: 0, from: null, to: null };
  if (!meta || typeof meta !== 'object') return safeFallback;
  const m = meta as Partial<Meta>;
  const current_page = Number(m.current_page ?? fallbackPage);
  const last_page = Number(m.last_page ?? 1);
  const per_page = Number(m.per_page ?? 10);
  const total = Number(m.total ?? 0);
  const from = m.from == null ? null : Number(m.from);
  const to = m.to == null ? null : Number(m.to);

  return {
    current_page: Number.isFinite(current_page) && current_page > 0 ? current_page : fallbackPage,
    last_page: Number.isFinite(last_page) && last_page > 0 ? last_page : 1,
    per_page: Number.isFinite(per_page) && per_page > 0 ? per_page : 10,
    total: Number.isFinite(total) && total >= 0 ? total : 0,
    from: from != null && Number.isFinite(from) ? from : null,
    to: to != null && Number.isFinite(to) ? to : null,
  };
}

function getStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === 'active') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'inactive') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getRoleLabel(role: RoleRecord): string {
  return normalizeText(role.display_name) || normalizeText(role.name) || `Role #${role.id}`;
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

function buildPublicHeaders(locale: string = 'en') {
  return {
    Accept: 'application/json',
    'Accept-Language': locale || 'en',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export default function StaffTab() {
  const { handleServerErrors, success } = useToast();

  const [staff, setStaff] = useState<StaffRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [positions, setPositions] = useState<PositionRecord[]>([]);
  const [roleOptions, setRoleOptions] = useState<RoleRecord[]>([]);
  const [rolesByUserId, setRolesByUserId] = useState<Record<string, RoleRecord[]>>({});
  const [rolesLoadingByUserId, setRolesLoadingByUserId] = useState<Record<string, boolean>>({});

  const [meta, setMeta] = useState<Meta>({ current_page: 1, last_page: 1, per_page: 10, total: 0, from: null, to: null });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const [upsertOpen, setUpsertOpen] = useState<boolean>(false);
  const [upsertMode, setUpsertMode] = useState<'create' | 'edit'>('create');
  const [selectedStaff, setSelectedStaff] = useState<StaffRecord | null>(null);

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<StaffRecord | null>(null);

  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [rolesModalOpen, setRolesModalOpen] = useState<boolean>(false);
  const [rolesTarget, setRolesTarget] = useState<StaffRecord | null>(null);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [rolesSubmitError, setRolesSubmitError] = useState<string>('');
  const [rolesIsSubmitting, setRolesIsSubmitting] = useState<boolean>(false);

  const currentRequestAbort = useRef<AbortController | null>(null);

  const getMemberRoleLabels = useCallback(
    (member: StaffRecord): string[] => {
      const key = String(member.id);
      const roles = rolesByUserId[key];
      if (Array.isArray(roles) && roles.length) {
        return roles.map(getRoleLabel).filter(Boolean);
      }
      return member.roles;
    },
    [rolesByUserId],
  );

  const filteredStaff = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter((member) => {
      const combined = [
        member.name,
        member.email,
        getMemberRoleLabels(member).join(' '),
        resolveName(member.department),
        resolveName(member.position),
      ]
        .join(' ')
        .toLowerCase();
      return combined.includes(q);
    });
  }, [getMemberRoleLabels, searchInput, staff]);

  const pages = useMemo(
    () => getPaginationWindow(meta.current_page, meta.last_page, 5),
    [meta.current_page, meta.last_page],
  );

  const fetchDepartments = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(getApiUrl('/api/common/setting/department/list'), {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildPublicHeaders('en'),
      });
      if (!response.ok) throw await parseApiError(response);
      const payload = (await response.json()) as { data?: DepartmentRecord[] };
      setDepartments(Array.isArray(payload.data) ? payload.data : []);
    } catch {
      setDepartments([]);
    }
  }, []);

  const fetchPositions = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(getApiUrl('/api/common/setting/position/list'), {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildPublicHeaders('en'),
      });
      if (!response.ok) throw await parseApiError(response);
      const payload = (await response.json()) as { data?: PositionRecord[] };
      setPositions(Array.isArray(payload.data) ? payload.data : []);
    } catch {
      setPositions([]);
    }
  }, []);

  const fetchRoleOptions = useCallback(async (signal?: AbortSignal) => {
    try {
      const token = getAuthToken();
      if (!token) {
        setRoleOptions([]);
        return;
      }

      const response = await fetch(getApiUrl('/api/admin/account/role/list'), {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildAuthHeaders(token),
      });
      if (!response.ok) throw await parseApiError(response);
      const payload = (await response.json()) as { data?: RoleRecord[] };
      setRoleOptions(Array.isArray(payload.data) ? payload.data : []);
    } catch {
      setRoleOptions([]);
    }
  }, []);

  const fetchUserRoles = useCallback(async (userId: number, signal?: AbortSignal): Promise<RoleRecord[]> => {
    const token = getAuthToken();
    if (!token) return [];

    const response = await fetch(getApiUrl(`/api/admin/account/role/user/${userId}`), {
      method: 'GET',
      cache: 'no-store',
      signal,
      headers: buildAuthHeaders(token),
    });
    if (!response.ok) throw await parseApiError(response);
    const payload = (await response.json()) as { data?: RoleRecord[] };
    return Array.isArray(payload.data) ? payload.data : [];
  }, []);

  const fetchStaff = useCallback(
    async (page = 1, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setStaff([]);
          setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0, from: null, to: null });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL(getApiUrl('/api/admin/account/staff'));
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

        const payload = (await response.json()) as PaginatedResponse<unknown>;
        setStaff(normalizeStaff(payload));
        setMeta(normalizeMeta(payload.meta, page));
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load staff right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load staff right now.';
        setError(message);
        setStaff([]);
        setMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0, from: null, to: null });
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchDepartments(controller.signal);
    void fetchPositions(controller.signal);
    void fetchRoleOptions(controller.signal);
    return () => controller.abort();
  }, [fetchDepartments, fetchPositions, fetchRoleOptions]);

  useEffect(() => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchStaff(1, controller.signal);
    return () => controller.abort();
  }, [fetchStaff]);

  useEffect(() => {
    if (!staff.length) return;
    const controller = new AbortController();
    const missingIds = staff.map((member) => member.id).filter((id) => rolesByUserId[String(id)] == null);
    if (!missingIds.length) return () => controller.abort();

    setRolesLoadingByUserId((prev) => {
      const next = { ...prev };
      for (const id of missingIds) next[String(id)] = true;
      return next;
    });

    (async () => {
      const results = await Promise.allSettled(
        missingIds.map(async (id) => {
          const roles = await fetchUserRoles(id, controller.signal);
          return [id, roles] as const;
        }),
      );

      setRolesByUserId((prev) => {
        const next = { ...prev };
        for (const result of results) {
          if (result.status === 'fulfilled') {
            const [id, roles] = result.value;
            next[String(id)] = roles;
          }
        }
        return next;
      });

      setRolesLoadingByUserId((prev) => {
        const next = { ...prev };
        for (const id of missingIds) next[String(id)] = false;
        return next;
      });
    })().catch(() => {
      setRolesLoadingByUserId((prev) => {
        const next = { ...prev };
        for (const id of missingIds) next[String(id)] = false;
        return next;
      });
    });

    return () => controller.abort();
  }, [fetchUserRoles, rolesByUserId, staff]);

  const onPageChange = (page: number) => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchStaff(page, controller.signal);
  };

  const openCreate = () => {
    setUpsertMode('create');
    setSelectedStaff(null);
    setSubmitError('');
    setIsSubmitting(false);
    setUpsertOpen(true);
  };

  const openEdit = (member: StaffRecord) => {
    setUpsertMode('edit');
    setSelectedStaff(member);
    setSubmitError('');
    setIsSubmitting(false);
    setUpsertOpen(true);
  };

  const closeUpsert = () => {
    setUpsertOpen(false);
    setSelectedStaff(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const openDelete = (member: StaffRecord) => {
    setDeleteTarget(member);
    setSubmitError('');
    setIsSubmitting(false);
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setDeleteTarget(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const openRolesModal = async (member: StaffRecord) => {
    setRolesTarget(member);
    setRolesSubmitError('');
    setRolesIsSubmitting(false);
    setRolesModalOpen(true);

    try {
      const roles = await fetchUserRoles(member.id);
      setRolesByUserId((prev) => ({ ...prev, [String(member.id)]: roles }));
      setSelectedRoleIds(roles.map((role) => role.id).filter((id) => Number.isFinite(id)));
    } catch (requestError) {
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load roles right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load roles right now.';
      setRolesSubmitError(message);
      setSelectedRoleIds([]);
    }
  };

  const closeRolesModal = () => {
    setRolesModalOpen(false);
    setRolesTarget(null);
    setRolesSubmitError('');
    setRolesIsSubmitting(false);
    setSelectedRoleIds([]);
  };

  const toggleSelectedRole = (roleId: number) => {
    setSelectedRoleIds((prev) => {
      const next = new Set(prev);
      if (next.has(roleId)) next.delete(roleId);
      else next.add(roleId);
      return Array.from(next);
    });
  };

  const submitRoles = async () => {
    if (!rolesTarget) return;

    setRolesSubmitError('');
    setRolesIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setRolesSubmitError('Missing auth token. Please sign in again.');
        setRolesIsSubmitting(false);
        return;
      }

      const response = await fetch(getApiUrl(`/api/admin/account/role/user/sync/${rolesTarget.id}`), {
        method: 'PUT',
        headers: buildAuthHeaders(token),
        body: JSON.stringify({
          roles: selectedRoleIds,
        }),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const roles = await fetchUserRoles(rolesTarget.id);
      setRolesByUserId((prev) => ({ ...prev, [String(rolesTarget.id)]: roles }));
      closeRolesModal();
      success('Roles updated successfully.', '', 5000);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to update roles right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to update roles right now.';
      setRolesSubmitError(message);
      setRolesIsSubmitting(false);
    }
  };

  const submitUpsert = async (payload: StaffUpsertPayload) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const isEdit = upsertMode === 'edit' && selectedStaff;
      const endpoint = isEdit
        ? getApiUrl(`/api/admin/account/staff/${selectedStaff.id}`)
        : getApiUrl('/api/admin/account/staff');

      const body =
        isEdit
          ? payload
          : {
              name: payload.name,
              email: payload.email,
              department_id: payload.department_id,
              position_id: payload.position_id,
            };

      const response = await fetch(endpoint, {
        method: isEdit ? 'PUT' : 'POST',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      closeUpsert();
      success(isEdit ? 'Staff member updated successfully.' : 'Staff member created successfully.', '', 5000);

      currentRequestAbort.current?.abort();
      const controller = new AbortController();
      currentRequestAbort.current = controller;
      await fetchStaff(meta.current_page || 1, controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to save staff right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to save staff right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(getApiUrl(`/api/admin/account/staff/${deleteTarget.id}`), {
        method: 'DELETE',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const name = deleteTarget.name;
      closeDelete();
      success(`${name} deleted successfully.`, '', 5000);

      currentRequestAbort.current?.abort();
      const controller = new AbortController();
      currentRequestAbort.current = controller;
      await fetchStaff(meta.current_page || 1, controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to delete staff right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to delete staff right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const upsertInitial = useMemo(() => {
    const baseStatus: StaffStatus = (selectedStaff?.status?.toLowerCase() === 'inactive' ? 'inactive' : 'active') as StaffStatus;
    return {
      name: selectedStaff?.name ?? '',
      email: selectedStaff?.email ?? '',
      departmentId: selectedStaff?.department?.id ?? null,
      positionId: selectedStaff?.position?.id ?? null,
      status: baseStatus,
    };
  }, [selectedStaff]);

  const showingLabel = meta.total
    ? meta.from != null && meta.to != null
      ? `Showing ${meta.from}-${meta.to} of ${meta.total}`
      : `Total ${meta.total}`
    : '';

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Staff list</h2>
          {showingLabel ? <div className="mt-1 text-xs text-slate-500">{showingLabel}</div> : null}
        </div>
        <button type="button" onClick={openCreate} className={PRIMARY_BUTTON_CLASS}>
          Create staff
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-[520px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search staff..."
            className={INPUT_WITH_ICON_CLASS}
          />
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-md border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Email</th>
                <th className="px-3 py-2 font-semibold">Department</th>
                <th className="px-3 py-2 font-semibold">Position</th>
                <th className="px-3 py-2 font-semibold">Roles</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Verified</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-xs text-slate-500">
                    Loading staff...
                  </td>
                </tr>
              ) : null}

              {!isLoading && error ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-xs text-red-600">
                    {error}
                  </td>
                </tr>
              ) : null}

              {!isLoading && !error && filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-xs text-slate-500">
                    No staff found.
                  </td>
                </tr>
              ) : null}

              {!isLoading &&
                !error &&
                filteredStaff.map((member) => (
                  <tr key={member.id} className="text-slate-700">
                    <td className="px-3 py-2 font-semibold">{member.name}</td>
                    <td className="px-3 py-2">{member.email}</td>
                    <td className="px-3 py-2">{resolveName(member.department)}</td>
                    <td className="px-3 py-2">{resolveName(member.position)}</td>
                    <td className="px-3 py-2">
                      {(() => {
                        const key = String(member.id);
                        const roles = rolesByUserId[key];
                        const loading = rolesLoadingByUserId[key];
                        const labels = (Array.isArray(roles) ? roles.map(getRoleLabel) : member.roles).filter(Boolean);

                        if (!labels.length && loading) {
                          return <span className="text-[11px] text-slate-500">Loading...</span>;
                        }
                        if (!labels.length) return '-';

                        return (
                          <div className="flex flex-wrap gap-1">
                            {labels.map((label) => (
                              <span
                                key={label}
                                className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${getStatusBadgeClass(
                          member.status,
                        )}`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                          member.verified
                            ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                            : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                        }`}
                      >
                        {member.verified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" onClick={() => openEdit(member)} className={ROW_ACTION_BUTTON_CLASS}>
                          Edit
                        </button>
                        <button type="button" onClick={() => void openRolesModal(member)} className={ROW_ACTION_BUTTON_CLASS}>
                          Roles
                        </button>
                        <button
                          type="button"
                          onClick={() => openDelete(member)}
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

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-slate-500">
          Page {meta.current_page} of {meta.last_page}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, meta.current_page - 1))}
            disabled={meta.current_page <= 1 || isLoading}
            className={`${SECONDARY_BUTTON_CLASS} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Prev
          </button>
          {pages.map((p) => {
            const active = p === meta.current_page;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                disabled={isLoading}
                className={`h-8 rounded-md px-3 text-xs font-medium shadow-sm disabled:cursor-not-allowed disabled:opacity-60 ${
                  active ? 'border border-blue-600 bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onPageChange(Math.min(meta.last_page, meta.current_page + 1))}
            disabled={meta.current_page >= meta.last_page || isLoading}
            className={`${SECONDARY_BUTTON_CLASS} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Next
          </button>
        </div>
      </div>

      <StaffUpsertModal
        isOpen={upsertOpen}
        mode={upsertMode}
        title={upsertMode === 'create' ? 'Create staff member' : 'Edit staff member'}
        initial={upsertInitial}
        departments={departments}
        positions={positions}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeUpsert}
        onSubmit={submitUpsert}
      />

      <StaffDeleteModal
        isOpen={deleteOpen}
        staff={deleteTarget}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />

      <StaffRolesModal
        isOpen={rolesModalOpen}
        staffName={rolesTarget?.name ?? ''}
        roles={roleOptions}
        selectedRoleIds={selectedRoleIds}
        submitError={rolesSubmitError}
        isSubmitting={rolesIsSubmitting}
        onClose={closeRolesModal}
        onToggleRole={toggleSelectedRole}
        onSubmit={submitRoles}
      />
    </div>
  );
}
