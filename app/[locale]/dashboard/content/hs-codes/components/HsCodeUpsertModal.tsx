'use client';

import { useEffect, useMemo, useState } from 'react';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

export type HsStatus = 'active' | 'inactive';

export type HsCodeRecord = {
  id: number;
  code: string;
  isic_code_id: number;
  status: string;
  names?: { en?: string; ar?: string };
};

export type IsicTreeNode = {
  key?: number;
  label?: string;
  data?: { key?: number; label?: string; code?: string };
  children?: IsicTreeNode[];
};

export type HsCodeUpsertPayload = {
  name: { en: string; ar: string };
  code: string;
  isic_code_id: number;
  status: HsStatus;
};

type HsCodeUpsertModalProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  title: string;
  initial: { en: string; ar: string; code: string; status: HsStatus; isicCodeId: number };
  isicOptions: Array<{ value: number; label: string }>;
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: HsCodeUpsertPayload) => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default function HsCodeUpsertModal({
  isOpen,
  mode,
  title,
  initial,
  isicOptions,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
}: HsCodeUpsertModalProps) {
  const [englishName, setEnglishName] = useState<string>(initial.en);
  const [arabicName, setArabicName] = useState<string>(initial.ar);
  const [code, setCode] = useState<string>(initial.code);
  const [status, setStatus] = useState<HsStatus>(initial.status);
  const [isicCodeId, setIsicCodeId] = useState<number>(initial.isicCodeId);
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setEnglishName(initial.en);
    setArabicName(initial.ar);
    setCode(initial.code);
    setStatus(initial.status);
    setIsicCodeId(initial.isicCodeId);
    setLocalError('');
  }, [initial.ar, initial.code, initial.en, initial.isicCodeId, initial.status, isOpen]);

  const sortedIsicOptions = useMemo(() => {
    return [...isicOptions].sort((a, b) => a.label.localeCompare(b.label));
  }, [isicOptions]);

  if (!isOpen) return null;

  const validate = (): string => {
    if (!normalizeText(code)) return 'Code is required.';
    if (!normalizeText(arabicName)) return 'Arabic Name is required.';
    if (!normalizeText(englishName)) return 'English Name is required.';
    if (!Number.isFinite(isicCodeId) || isicCodeId <= 0) return 'ISIC Code is required.';
    if (!status) return 'Status is required.';
    return '';
  };

  const submit = () => {
    const error = validate();
    setLocalError(error);
    if (error) return;

    onSubmit({
      name: { en: normalizeText(englishName), ar: normalizeText(arabicName) },
      code: normalizeText(code),
      isic_code_id: isicCodeId,
      status,
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
            <label className="mb-1 block text-xs font-semibold text-slate-700">Code</label>
            <input value={code} onChange={(e) => setCode(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Arabic Name</label>
            <input value={arabicName} onChange={(e) => setArabicName(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">English Name</label>
            <input value={englishName} onChange={(e) => setEnglishName(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">ISIC Code</label>
            <select value={String(isicCodeId)} onChange={(e) => setIsicCodeId(Number(e.target.value))} className={INPUT_CLASS}>
              <option value="0">Select ISIC Code...</option>
              {sortedIsicOptions.map((option) => (
                <option key={option.value} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as HsStatus)} className={INPUT_CLASS}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
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

