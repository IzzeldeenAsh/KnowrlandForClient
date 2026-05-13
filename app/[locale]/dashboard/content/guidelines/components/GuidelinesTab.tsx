'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { parseApiError } from '../../../_config/api';

type GuidelineType = { value: string; label: string };

const INPUT_WITH_ICON_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';

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

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default function GuidelinesTab() {
  const locale = useLocale();
  const prefix = `/${locale}/dashboard/content/guidelines`;

  const [types, setTypes] = useState<GuidelineType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch('https://api.foresighta.co/api/common/setting/guideline/type', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            'Accept-Language': 'en',
          },
        });
        if (!response.ok) throw await parseApiError(response);
        const payload = (await response.json()) as unknown;
        setTypes(Array.isArray(payload) ? (payload as GuidelineType[]) : []);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load guideline types right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load guideline types right now.';
        setError(message);
        setTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    void run();
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return types;
    return types.filter((type) => {
      const combined = `${normalizeText(type.label)} ${normalizeText(type.value)}`.toLowerCase();
      return combined.includes(q);
    });
  }, [searchInput, types]);

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">Guidelines</h2>
          <p className="text-xs font-light text-slate-500 ps-1">types: {filtered.length}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:flex-1 sm:pl-4">
          <div className="relative flex-1 sm:max-w-[520px]">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search guideline types..."
              className={INPUT_WITH_ICON_CLASS}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-red-600 shadow-sm">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-6 text-center text-xs text-slate-500 shadow-sm">
          No guideline types found.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((type) => (
            <Link
              key={type.value}
              href={`${prefix}/${encodeURIComponent(type.value)}`}
              className="group rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{normalizeText(type.label) || type.value}</div>
                  <div className="mt-1 truncate text-xs text-slate-500">{type.value}</div>
                </div>
                <div className="shrink-0 text-slate-300 transition group-hover:text-blue-500">→</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

