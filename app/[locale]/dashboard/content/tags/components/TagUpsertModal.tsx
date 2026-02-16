'use client';

import { useEffect, useMemo, useState } from 'react';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

export type TagStatus = 'active' | 'inactive' | 'suggestion';

export type IndustryRecord = {
  id: number;
  name: string;
};

export type TagRecord = {
  id: number;
  names: { en: string; ar: string };
  status?: string;
  industries: number[];
};

export type TagUpsertPayload = {
  name: { en: string; ar: string };
  status: TagStatus;
  industries: number[];
};

type TagUpsertModalProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  title: string;
  initial: { en: string; ar: string; status: TagStatus; industries: number[] };
  industries: IndustryRecord[];
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: TagUpsertPayload) => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function uniqNumbers(values: number[]): number[] {
  return Array.from(new Set(values.filter((value) => Number.isFinite(value))));
}

export default function TagUpsertModal({
  isOpen,
  mode,
  title,
  initial,
  industries,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
}: TagUpsertModalProps) {
  const [nameEn, setNameEn] = useState<string>(initial.en);
  const [nameAr, setNameAr] = useState<string>(initial.ar);
  const [status, setStatus] = useState<TagStatus>(initial.status);
  const [industryQuery, setIndustryQuery] = useState<string>('');
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<number[]>(initial.industries);
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setNameEn(initial.en);
    setNameAr(initial.ar);
    setStatus(initial.status);
    setSelectedIndustryIds(initial.industries);
    setIndustryQuery('');
    setLocalError('');
  }, [initial.ar, initial.en, initial.industries, initial.status, isOpen]);

  const filteredIndustries = useMemo(() => {
    const q = industryQuery.trim().toLowerCase();
    if (!q) return industries;
    return industries.filter((industry) => industry.name.toLowerCase().includes(q));
  }, [industries, industryQuery]);

  const toggleIndustry = (id: number) => {
    setSelectedIndustryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return Array.from(next);
    });
  };

  if (!isOpen) return null;

  const validate = (): string => {
    if (!normalizeText(nameEn)) return 'English Name is required.';
    if (!normalizeText(nameAr)) return 'Arabic Name is required.';
    if (!status) return 'Status is required.';
    return '';
  };

  const submit = () => {
    const error = validate();
    setLocalError(error);
    if (error) return;

    onSubmit({
      name: { en: normalizeText(nameEn), ar: normalizeText(nameAr) },
      status,
      industries: uniqNumbers(selectedIndustryIds),
    });
  };

  const selectedCount = selectedIndustryIds.length;

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
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              English Name <span className="text-red-500">*</span>
            </label>
            <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Arabic Name <span className="text-red-500">*</span>
            </label>
            <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value as TagStatus)} className={INPUT_CLASS}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="suggestion">suggestion</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <label className="mb-1 block text-xs font-semibold text-slate-700">Industries</label>
              <div className="text-[11px] text-slate-500">{selectedCount ? `${selectedCount} selected` : 'Optional'}</div>
            </div>

            <input
              value={industryQuery}
              onChange={(e) => setIndustryQuery(e.target.value)}
              className={INPUT_CLASS}
              placeholder="Search industries..."
            />

            <div className="mt-2 max-h-52 overflow-auto rounded-md border border-slate-200 bg-white">
              {filteredIndustries.length === 0 ? (
                <div className="px-3 py-3 text-xs text-slate-500">No industries match your search.</div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {filteredIndustries.map((industry) => {
                    const checked = selectedIndustryIds.includes(industry.id);
                    return (
                      <li key={industry.id} className="px-3 py-2">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleIndustry(industry.id)}
                            className="h-4 w-4"
                          />
                          <span className="text-xs text-slate-700">{industry.name}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
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

