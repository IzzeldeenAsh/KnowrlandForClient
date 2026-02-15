'use client';

import { useEffect, useMemo, useState } from 'react';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

export type ConsultingFieldStatus = 'active' | 'inactive' | 'suggestion';

export type ConsultingFieldNode = {
  key: number;
  names?: { en?: string; ar?: string };
  status?: string;
  parent_id?: number | null;
  children?: ConsultingFieldNode[];
};

export type ConsultingFieldUpsertPayload = {
  name: { en: string; ar: string };
  status: ConsultingFieldStatus;
  parent_id: number;
};

type ConsultingFieldUpsertModalProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  title: string;
  initial: { en: string; ar: string; status: ConsultingFieldStatus; parentId: number };
  parentOptions: Array<{ value: number; label: string }>;
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: ConsultingFieldUpsertPayload) => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default function ConsultingFieldUpsertModal({
  isOpen,
  mode,
  title,
  initial,
  parentOptions,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
}: ConsultingFieldUpsertModalProps) {
  const [nameEn, setNameEn] = useState<string>(initial.en);
  const [nameAr, setNameAr] = useState<string>(initial.ar);
  const [status, setStatus] = useState<ConsultingFieldStatus>(initial.status);
  const [parentId, setParentId] = useState<number>(initial.parentId);
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setNameEn(initial.en);
    setNameAr(initial.ar);
    setStatus(initial.status);
    setParentId(initial.parentId);
    setLocalError('');
  }, [initial.ar, initial.en, initial.parentId, initial.status, isOpen]);

  const sortedParents = useMemo(() => {
    return [...parentOptions].sort((a, b) => a.label.localeCompare(b.label));
  }, [parentOptions]);

  if (!isOpen) return null;

  const validate = (): string => {
    if (!normalizeText(nameEn)) return 'Name (English) is required.';
    if (!normalizeText(nameAr)) return 'Name (Arabic) is required.';
    if (!status) return 'Status is required.';
    if (!Number.isFinite(parentId) || parentId < 0) return 'Parent is invalid.';
    return '';
  };

  const submit = () => {
    const error = validate();
    setLocalError(error);
    if (error) return;
    onSubmit({
      name: { en: normalizeText(nameEn), ar: normalizeText(nameAr) },
      status,
      parent_id: parentId,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-md rounded-md border border-slate-300 bg-white p-4">
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

        <div className="mt-3 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name (English)</label>
            <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={INPUT_CLASS} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name (Arabic)</label>
            <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} className={INPUT_CLASS} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as ConsultingFieldStatus)} className={INPUT_CLASS}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="suggestion">suggestion</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Parent</label>
            <select value={String(parentId)} onChange={(e) => setParentId(Number(e.target.value))} className={INPUT_CLASS}>
              <option value="0">No parent (Top level)</option>
              {sortedParents.map((option) => (
                <option key={option.value} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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

