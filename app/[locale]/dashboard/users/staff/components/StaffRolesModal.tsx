'use client';

import { useEffect, useMemo, useState } from 'react';
import type { RoleRecord } from '../../../_config/rbac';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

type StaffRolesModalProps = {
  isOpen: boolean;
  staffName: string;
  roles: RoleRecord[];
  selectedRoleIds: number[];
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onToggleRole: (roleId: number) => void;
  onSubmit: () => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getRoleLabel(role: RoleRecord): string {
  return normalizeText(role.display_name) || normalizeText(role.name) || `Role #${role.id}`;
}

export default function StaffRolesModal({
  isOpen,
  staffName,
  roles,
  selectedRoleIds,
  submitError,
  isSubmitting,
  onClose,
  onToggleRole,
  onSubmit,
}: StaffRolesModalProps) {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
  }, [isOpen]);

  const filteredRoles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((role) => `${getRoleLabel(role)} ${normalizeText(role.description)}`.toLowerCase().includes(q));
  }, [query, roles]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-2xl rounded-md border border-slate-300 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-slate-900">Edit roles — {staffName}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-xs font-semibold text-slate-700">Search roles</label>
          <input value={query} onChange={(e) => setQuery(e.target.value)} className={INPUT_CLASS} placeholder="Search..." />
        </div>

        <div className="mt-3 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white">
          {filteredRoles.length === 0 ? (
            <div className="px-3 py-3 text-xs text-slate-500">No roles match your search.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {filteredRoles.map((role) => {
                const checked = selectedRoleIds.includes(role.id);
                return (
                  <li key={role.id} className="px-3 py-2">
                    <label className="flex cursor-pointer items-start gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleRole(role.id)}
                        className="mt-0.5 h-4 w-4"
                      />
                      <span className="flex-1">
                        <div className="text-xs font-semibold text-slate-800">{getRoleLabel(role)}</div>
                        {normalizeText(role.description) ? (
                          <div className="mt-0.5 text-[11px] text-slate-500">{normalizeText(role.description)}</div>
                        ) : null}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {submitError ? <p className="mt-3 text-xs text-red-600">{submitError}</p> : null}

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Save roles'}
          </button>
        </div>
      </div>
    </div>
  );
}

