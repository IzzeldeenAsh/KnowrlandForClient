'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CountryRecord, RegionRecord } from '../../types';

const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

type CountryFormState = {
  nameEn: string;
  nameAr: string;
  regionId: string;
  internationalCode: string;
  iso2: string;
  iso3: string;
  nationalityEn: string;
  nationalityAr: string;
  status: 'active' | 'inactive';
  flag: string;
};

export type CountryUpsertPayload = {
  name: { en: string; ar: string };
  region_id: number;
  iso2: string;
  iso3: string;
  nationality: { en: string; ar: string };
  international_code: string;
  flag: string;
  status: 'active' | 'inactive';
};

type CountryUpsertModalProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  country: CountryRecord | null;
  regions: RegionRecord[];
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: CountryUpsertPayload) => void;
};

function toText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function getInitialState(mode: 'create' | 'edit', country: CountryRecord | null): CountryFormState {
  if (mode === 'edit' && country) {
    return {
      nameEn: toText(country.names?.en) || toText(country.name),
      nameAr: toText(country.names?.ar),
      regionId: country.region_id ? String(country.region_id) : '',
      internationalCode: toText(country.international_code),
      iso2: toText(country.iso2),
      iso3: toText(country.iso3),
      nationalityEn: toText(country.nationalities?.en) || toText(country.nationality),
      nationalityAr: toText(country.nationalities?.ar),
      status: (toText(country.status).toLowerCase() === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive',
      flag: toText(country.flag),
    };
  }

  return {
    nameEn: '',
    nameAr: '',
    regionId: '',
    internationalCode: '',
    iso2: '',
    iso3: '',
    nationalityEn: '',
    nationalityAr: '',
    status: 'active',
    flag: '',
  };
}

export default function CountryUpsertModal({
  isOpen,
  mode,
  country,
  regions,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
}: CountryUpsertModalProps) {
  const [form, setForm] = useState<CountryFormState>(() => getInitialState(mode, country));
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setForm(getInitialState(mode, country));
    setLocalError('');
  }, [country, isOpen, mode]);

  const regionOptions = useMemo(() => {
    return regions
      .map((region) => ({
        value: String(region.id),
        label: region.names?.en?.trim() || region.name?.trim() || `Region #${region.id}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [regions]);

  if (!isOpen) return null;

  const title = mode === 'create' ? 'Create country' : `Edit country #${country?.id ?? ''}`;

  const validate = (): string => {
    if (!form.nameEn.trim()) return 'Name (English) is required.';
    if (!form.nameAr.trim()) return 'Name (Arabic) is required.';
    if (!form.regionId.trim()) return 'Region is required.';
    if (!form.internationalCode.trim()) return 'International Code is required.';
    if (!form.iso2.trim()) return 'ISO2 is required.';
    if (!form.iso3.trim()) return 'ISO3 is required.';
    if (!form.nationalityEn.trim()) return 'Nationality (English) is required.';
    if (!form.nationalityAr.trim()) return 'Nationality (Arabic) is required.';
    if (!form.flag.trim()) return 'Flag is required.';
    return '';
  };

  const submit = () => {
    const error = validate();
    setLocalError(error);
    if (error) return;

    const regionId = Number(form.regionId);
    if (!Number.isFinite(regionId) || regionId <= 0) {
      setLocalError('Region is invalid.');
      return;
    }

    onSubmit({
      name: { en: form.nameEn.trim(), ar: form.nameAr.trim() },
      region_id: regionId,
      iso2: form.iso2.trim(),
      iso3: form.iso3.trim(),
      nationality: { en: form.nationalityEn.trim(), ar: form.nationalityAr.trim() },
      international_code: form.internationalCode.trim(),
      flag: form.flag.trim(),
      status: form.status,
    });
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
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name (English)</label>
            <input
              value={form.nameEn}
              onChange={(e) => setForm((prev) => ({ ...prev, nameEn: e.target.value }))}
              className={INPUT_CLASS}
              placeholder="e.g. Algeria"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name (Arabic)</label>
            <input
              value={form.nameAr}
              onChange={(e) => setForm((prev) => ({ ...prev, nameAr: e.target.value }))}
              className={INPUT_CLASS}
              placeholder="e.g. الجزائر"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Region</label>
            <select
              value={form.regionId}
              onChange={(e) => setForm((prev) => ({ ...prev, regionId: e.target.value }))}
              className={INPUT_CLASS}
            >
              <option value="">Select region...</option>
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">International Code</label>
            <input
              value={form.internationalCode}
              onChange={(e) => setForm((prev) => ({ ...prev, internationalCode: e.target.value }))}
              className={INPUT_CLASS}
              placeholder="e.g. 213"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">ISO2</label>
            <input
              value={form.iso2}
              onChange={(e) => setForm((prev) => ({ ...prev, iso2: e.target.value.toUpperCase() }))}
              className={INPUT_CLASS}
              placeholder="e.g. DZ"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">ISO3</label>
            <input
              value={form.iso3}
              onChange={(e) => setForm((prev) => ({ ...prev, iso3: e.target.value.toUpperCase() }))}
              className={INPUT_CLASS}
              placeholder="e.g. DZA"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Nationality (English)</label>
            <input
              value={form.nationalityEn}
              onChange={(e) => setForm((prev) => ({ ...prev, nationalityEn: e.target.value }))}
              className={INPUT_CLASS}
              placeholder="e.g. Algerian"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Nationality (Arabic)</label>
            <input
              value={form.nationalityAr}
              onChange={(e) => setForm((prev) => ({ ...prev, nationalityAr: e.target.value }))}
              className={INPUT_CLASS}
              placeholder="e.g. جزائري"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
              className={INPUT_CLASS}
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Flag</label>
            <input
              value={form.flag}
              onChange={(e) => setForm((prev) => ({ ...prev, flag: e.target.value }))}
              className={INPUT_CLASS}
              placeholder="e.g. algeria"
            />
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

