'use client';

import { useEffect, useMemo, useState } from 'react';
import type { DepartmentRecord, PositionRecord, StaffStatus } from './types';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

export type StaffUpsertPayload = {
  name: string;
  email: string;
  department_id: number;
  position_id: number;
  status?: StaffStatus;
};

type StaffUpsertModalProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  title: string;
  initial: {
    name: string;
    email: string;
    departmentId: number | null;
    positionId: number | null;
    status: StaffStatus;
  };
  departments: DepartmentRecord[];
  positions: PositionRecord[];
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: StaffUpsertPayload) => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getOptionLabel(item: { name?: string; names?: { en?: string; ar?: string } }, fallback: string) {
  const en = normalizeText(item.names?.en);
  const baseName = normalizeText(item.name);
  return en || baseName || fallback;
}

function isValidEmail(email: string): boolean {
  const value = email.trim();
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function StaffUpsertModal({
  isOpen,
  mode,
  title,
  initial,
  departments,
  positions,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
}: StaffUpsertModalProps) {
  const [name, setName] = useState<string>(initial.name);
  const [email, setEmail] = useState<string>(initial.email);
  const [departmentId, setDepartmentId] = useState<string>(initial.departmentId ? String(initial.departmentId) : '');
  const [positionId, setPositionId] = useState<string>(initial.positionId ? String(initial.positionId) : '');
  const [status, setStatus] = useState<StaffStatus>(initial.status);
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setName(initial.name);
    setEmail(initial.email);
    setDepartmentId(initial.departmentId ? String(initial.departmentId) : '');
    setPositionId(initial.positionId ? String(initial.positionId) : '');
    setStatus(initial.status);
    setLocalError('');
  }, [initial.departmentId, initial.email, initial.name, initial.positionId, initial.status, isOpen]);

  const departmentOptions = useMemo(
    () =>
      departments
        .slice()
        .sort((a, b) => getOptionLabel(a, '').localeCompare(getOptionLabel(b, ''))),
    [departments],
  );

  const positionOptions = useMemo(
    () => positions.slice().sort((a, b) => getOptionLabel(a, '').localeCompare(getOptionLabel(b, ''))),
    [positions],
  );

  if (!isOpen) return null;

  const validate = (): string => {
    if (!normalizeText(name)) return 'Name is required.';
    if (!isValidEmail(email)) return 'A valid email is required.';

    const dep = Number(departmentId);
    if (!Number.isFinite(dep) || dep <= 0) return 'Department is required.';

    const pos = Number(positionId);
    if (!Number.isFinite(pos) || pos <= 0) return 'Position is required.';

    if (mode === 'edit' && !status) return 'Status is required.';

    return '';
  };

  const submit = () => {
    const error = validate();
    setLocalError(error);
    if (error) return;

    const payload: StaffUpsertPayload = {
      name: normalizeText(name),
      email: normalizeText(email),
      department_id: Number(departmentId),
      position_id: Number(positionId),
    };

    if (mode === 'edit') {
      payload.status = status;
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-2xl rounded-md border border-slate-300 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Department <span className="text-red-500">*</span>
            </label>
            <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className={INPUT_CLASS}>
              <option value="">Select department...</option>
              {departmentOptions.map((department) => (
                <option key={department.id} value={department.id}>
                  {getOptionLabel(department, `Department #${department.id}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Position <span className="text-red-500">*</span>
            </label>
            <select value={positionId} onChange={(e) => setPositionId(e.target.value)} className={INPUT_CLASS}>
              <option value="">Select position...</option>
              {positionOptions.map((position) => (
                <option key={position.id} value={position.id}>
                  {getOptionLabel(position, `Position #${position.id}`)}
                </option>
              ))}
            </select>
          </div>

          {mode === 'edit' ? (
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select value={status} onChange={(e) => setStatus(e.target.value as StaffStatus)} className={INPUT_CLASS}>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          ) : null}
        </div>

        {localError ? <p className="mt-3 text-xs text-red-600">{localError}</p> : null}
        {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

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
            onClick={submit}
            disabled={isSubmitting}
            className="h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

