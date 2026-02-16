'use client';

import { useEffect, useMemo, useState } from 'react';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';

export type TopicStatus = 'active' | 'inactive' | 'suggestion';

export type TopicKeywordPair = { en: string; ar: string };

export type TopicRecord = {
  id: number;
  names: { en: string; ar: string };
  industry_id: number;
  status: string;
  keywords?:
    | Array<{ en: string; ar: string }>
    | {
        en: string[];
        ar: string[];
      };
  keyword?: string[];
};

export type IndustryOption = {
  value: number;
  label: string;
  rawLabel: string;
};

export type TopicUpsertPayload = {
  name: { en: string; ar: string };
  industry_id: number;
  status: TopicStatus;
  keywords: Array<{ en: string; ar: string }>;
};

type TopicUpsertModalProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  title: string;
  industries: IndustryOption[];
  submitError: string;
  isSubmitting: boolean;
  initial: {
    en: string;
    ar: string;
    status: TopicStatus;
    industryId: number;
    keywords: TopicKeywordPair[];
  };
  onClose: () => void;
  onSubmit: (payload: TopicUpsertPayload) => void;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizePairs(pairs: TopicKeywordPair[]): TopicKeywordPair[] {
  const cleaned = pairs
    .map((pair) => ({ en: normalizeText(pair.en), ar: normalizeText(pair.ar) }))
    .filter((pair) => pair.en || pair.ar);
  return cleaned.length ? cleaned : [];
}

export default function TopicUpsertModal({
  isOpen,
  mode,
  title,
  industries,
  submitError,
  isSubmitting,
  initial,
  onClose,
  onSubmit,
}: TopicUpsertModalProps) {
  const [nameEn, setNameEn] = useState<string>(initial.en);
  const [nameAr, setNameAr] = useState<string>(initial.ar);
  const [status, setStatus] = useState<TopicStatus>(initial.status);
  const [industryId, setIndustryId] = useState<number>(initial.industryId);
  const [industryQuery, setIndustryQuery] = useState<string>('');
  const [keywordPairs, setKeywordPairs] = useState<TopicKeywordPair[]>(initial.keywords);
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setNameEn(initial.en);
    setNameAr(initial.ar);
    setStatus(initial.status);
    setIndustryId(initial.industryId);
    setIndustryQuery('');
    setKeywordPairs(initial.keywords);
    setLocalError('');
  }, [initial.ar, initial.en, initial.industryId, initial.keywords, initial.status, isOpen]);

  const filteredIndustryOptions = useMemo(() => {
    const q = industryQuery.trim().toLowerCase();
    if (!q) return industries;
    return industries.filter((option) => option.rawLabel.toLowerCase().includes(q));
  }, [industries, industryQuery]);

  if (!isOpen) return null;

  const validate = (): string => {
    if (!normalizeText(nameEn)) return 'Name (EN) is required.';
    if (!normalizeText(nameAr)) return 'Name (AR) is required.';
    if (!status) return 'Status is required.';
    if (!Number.isFinite(industryId) || industryId <= 0) return 'Industry is required.';

    const pairs = normalizePairs(keywordPairs);
    for (const pair of pairs) {
      if (!pair.en || !pair.ar) return 'Keywords must be filled in both EN and AR (or remove the row).';
    }

    return '';
  };

  const addKeywordRow = () => {
    setKeywordPairs((prev) => [...prev, { en: '', ar: '' }]);
  };

  const removeKeywordRow = (index: number) => {
    setKeywordPairs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateKeyword = (index: number, field: 'en' | 'ar', value: string) => {
    setKeywordPairs((prev) =>
      prev.map((pair, i) => (i === index ? { ...pair, [field]: value } : pair)),
    );
  };

  const submit = () => {
    const error = validate();
    setLocalError(error);
    if (error) return;

    const pairs = normalizePairs(keywordPairs).filter((pair) => pair.en && pair.ar);

    onSubmit({
      name: { en: normalizeText(nameEn), ar: normalizeText(nameAr) },
      industry_id: industryId,
      status,
      keywords: pairs.map((pair) => ({ en: pair.en, ar: pair.ar })),
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-3xl rounded-md border border-slate-300 bg-white p-4">
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
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name (EN)</label>
            <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={INPUT_CLASS} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name (AR)</label>
            <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} className={INPUT_CLASS} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as TopicStatus)} className={INPUT_CLASS}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="suggestion">suggestion</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Industry</label>
            <input
              value={industryQuery}
              onChange={(e) => setIndustryQuery(e.target.value)}
              className={INPUT_CLASS}
              placeholder="Search industries..."
            />
            <select value={String(industryId)} onChange={(e) => setIndustryId(Number(e.target.value))} className={`${INPUT_CLASS} mt-2`}>
              <option value="0">Select industry...</option>
              {filteredIndustryOptions.map((option) => (
                <option key={option.value} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-slate-700">Keywords</div>
                <div className="text-[11px] text-slate-500">Add keyword pairs (EN + AR). Leave empty if none.</div>
              </div>
              <button type="button" onClick={addKeywordRow} className={SECONDARY_BUTTON_CLASS}>
                Add keyword
              </button>
            </div>

            {keywordPairs.length === 0 ? (
              <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                No keywords added.
              </div>
            ) : (
              <div className="mt-2 space-y-2">
                {keywordPairs.map((pair, index) => (
                  <div key={index} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr,1fr,auto]">
                    <input
                      value={pair.en}
                      onChange={(e) => updateKeyword(index, 'en', e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="Keyword (EN)"
                    />
                    <input
                      value={pair.ar}
                      onChange={(e) => updateKeyword(index, 'ar', e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="Keyword (AR)"
                    />
                    <button type="button" onClick={() => removeKeywordRow(index)} className={SECONDARY_BUTTON_CLASS}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {localError ? <p className="mt-3 text-xs text-red-600">{localError}</p> : null}
        {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

        <div className="mt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className={SECONDARY_BUTTON_CLASS}>
            Cancel
          </button>
          <button type="button" onClick={submit} disabled={isSubmitting} className={PRIMARY_BUTTON_CLASS}>
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

