'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import { getApiUrl } from '@/app/config';
import type { PermissionRecord, RoleRecord } from '../../../_config/rbac';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getRoleLabel(role: RoleRecord): string {
  return normalizeText(role.display_name) || normalizeText(role.name) || `Role #${role.id}`;
}

function getPermissionLabel(permission: PermissionRecord): string {
  return normalizeText(permission.display_name) || normalizeText(permission.name) || `Permission #${permission.id}`;
}

export default function RolesPermissionsTab() {
  const { handleServerErrors, success } = useToast();

  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [permissions, setPermissions] = useState<PermissionRecord[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rolePermissionsLoading, setRolePermissionsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [permissionQuery, setPermissionQuery] = useState<string>('');

  const rolePermissionsAbort = useRef<AbortController | null>(null);

  const selectedRole = useMemo(() => roles.find((role) => role.id === selectedRoleId) ?? null, [roles, selectedRoleId]);

  const filteredPermissions = useMemo(() => {
    const q = permissionQuery.trim().toLowerCase();
    if (!q) return permissions;
    return permissions.filter((perm) => {
      const combined = `${getPermissionLabel(perm)} ${normalizeText(perm.description)}`.toLowerCase();
      return combined.includes(q);
    });
  }, [permissionQuery, permissions]);

  const togglePermission = (permissionId: number) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      if (next.has(permissionId)) next.delete(permissionId);
      else next.add(permissionId);
      return Array.from(next);
    });
  };

  const fetchRolesAndPermissions = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        setRoles([]);
        setPermissions([]);
        setSelectedRoleId(null);
        setSelectedPermissionIds([]);
        setError('Missing auth token. Please sign in again.');
        return;
      }

      const [rolesRes, permsRes] = await Promise.all([
        fetch(getApiUrl('/api/admin/account/role/list'), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        }),
        fetch(getApiUrl('/api/admin/account/permission/list'), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        }),
      ]);

      if (!rolesRes.ok) throw await parseApiError(rolesRes);
      if (!permsRes.ok) throw await parseApiError(permsRes);

      const rolesPayload = (await rolesRes.json()) as { data?: RoleRecord[] };
      const permsPayload = (await permsRes.json()) as { data?: PermissionRecord[] };

      const nextRoles = Array.isArray(rolesPayload.data) ? rolesPayload.data : [];
      setRoles(nextRoles);
      setPermissions(Array.isArray(permsPayload.data) ? permsPayload.data : []);

      setSelectedRoleId((prev) => prev ?? (nextRoles[0]?.id ?? null));
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') {
        return;
      }
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load roles and permissions right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load roles and permissions right now.';
      setError(message);
      setRoles([]);
      setPermissions([]);
      setSelectedRoleId(null);
      setSelectedPermissionIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors]);

  const fetchRolePermissions = useCallback(
    async (roleId: number, signal?: AbortSignal) => {
      setRolePermissionsLoading(true);
      setSubmitError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setSelectedPermissionIds([]);
          setSubmitError('Missing auth token. Please sign in again.');
          return;
        }

        const response = await fetch(getApiUrl(`/api/admin/account/permission/role/${roleId}`), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });

        if (!response.ok) {
          throw await parseApiError(response);
        }

        const payload = (await response.json()) as { data?: PermissionRecord[] };
        const ids = (Array.isArray(payload.data) ? payload.data : [])
          .map((perm) => perm?.id)
          .filter((id): id is number => typeof id === 'number' && Number.isFinite(id));
        setSelectedPermissionIds(ids);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load role permissions right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load role permissions right now.';
        setSubmitError(message);
        setSelectedPermissionIds([]);
      } finally {
        setRolePermissionsLoading(false);
      }
    },
    [handleServerErrors],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchRolesAndPermissions(controller.signal);
    return () => controller.abort();
  }, [fetchRolesAndPermissions]);

  useEffect(() => {
    if (!selectedRoleId) return;
    rolePermissionsAbort.current?.abort();
    const controller = new AbortController();
    rolePermissionsAbort.current = controller;
    void fetchRolePermissions(selectedRoleId, controller.signal);
    return () => controller.abort();
  }, [fetchRolePermissions, selectedRoleId]);

  const submitRolePermissions = async () => {
    if (!selectedRoleId) return;

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(getApiUrl(`/api/admin/account/permission/role/sync/${selectedRoleId}`), {
        method: 'PUT',
        headers: buildAuthHeaders(token),
        body: JSON.stringify({
          permissions: selectedPermissionIds,
        }),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('Permissions updated successfully.', '', 5000);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to update permissions right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to update permissions right now.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Roles &amp; Permissions</h2>
          <p className="mt-1 text-xs text-slate-500">Assign permissions to roles.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            void fetchRolesAndPermissions();
          }}
          disabled={isLoading}
          className={SECONDARY_BUTTON_CLASS}
        >
          Refresh
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="text-xs font-semibold text-slate-700">Roles</div>
            <div className="mt-2 space-y-1">
              {isLoading ? <div className="text-xs text-slate-500">Loading roles...</div> : null}
              {!isLoading && error ? <div className="text-xs text-red-600">{error}</div> : null}
              {!isLoading && !error && roles.length === 0 ? (
                <div className="text-xs text-slate-500">No roles found.</div>
              ) : null}
              {!isLoading &&
                !error &&
                roles.map((role) => {
                  const active = role.id === selectedRoleId;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-xs shadow-sm ${
                        active
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-semibold">{getRoleLabel(role)}</span>
                      <span className={`${active ? 'text-white/80' : 'text-slate-500'}`}>#{role.id}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-700">Permissions</div>
                <div className="mt-0.5 text-[11px] text-slate-500">
                  {selectedRole ? `Role: ${getRoleLabel(selectedRole)}` : 'Select a role to edit permissions.'}
                </div>
              </div>
              <button
                type="button"
                onClick={submitRolePermissions}
                disabled={!selectedRoleId || isLoading || rolePermissionsLoading || isSubmitting}
                className={PRIMARY_BUTTON_CLASS}
              >
                {isSubmitting ? 'Saving...' : 'Save permissions'}
              </button>
            </div>

            <div className="mt-3">
              <label className="mb-1 block text-xs font-semibold text-slate-700">Search permissions</label>
              <input
                value={permissionQuery}
                onChange={(e) => setPermissionQuery(e.target.value)}
                className={INPUT_CLASS}
                placeholder="Search..."
              />
            </div>

            {submitError ? <p className="mt-3 text-xs text-red-600">{submitError}</p> : null}

            <div className="mt-3 max-h-[520px] overflow-auto rounded-md border border-slate-200">
              {rolePermissionsLoading ? (
                <div className="px-3 py-3 text-xs text-slate-500">Loading role permissions...</div>
              ) : filteredPermissions.length === 0 ? (
                <div className="px-3 py-3 text-xs text-slate-500">No permissions match your search.</div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {filteredPermissions.map((perm) => {
                    const checked = selectedPermissionIds.includes(perm.id);
                    return (
                      <li key={perm.id} className="px-3 py-2">
                        <label className="flex cursor-pointer items-start gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={!selectedRoleId}
                            onChange={() => togglePermission(perm.id)}
                            className="mt-0.5 h-4 w-4"
                          />
                          <span className="flex-1">
                            <div className="text-xs font-semibold text-slate-800">{getPermissionLabel(perm)}</div>
                            {normalizeText(perm.description) ? (
                              <div className="mt-0.5 text-[11px] text-slate-500">{normalizeText(perm.description)}</div>
                            ) : null}
                          </span>
                          <span className="text-[11px] text-slate-400">#{perm.id}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
