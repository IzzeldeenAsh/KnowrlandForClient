'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { IconSearch, IconBookmark, IconTrash, IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import PageHeader from '@/components/insighter-dashboard/PageHeader';
import KnowledgeTypeIcon from '@/components/insighter-dashboard/KnowledgeTypeIcon';
import { useToast } from '@/components/toast/ToastContext';
import {
  getReadLaterList,
  removeReadLaterItem,
  type ReadLaterItem,
  type PaginationMeta,
} from '@/services/insighter-dashboard.api';

const TYPES = ['', 'data', 'report', 'manual', 'course', 'media', 'statistic'] as const;

/** /insighter-dashboard/read-later — bookmarked knowledge (Angular read-later). */
export default function ReadLaterClient() {
  const t = useTranslations('InsighterDashboard.readLater');
  const tk = useTranslations('InsighterDashboard.myKnowledge.types');
  const locale = useLocale();
  const toast = useToast();

  const [items, setItems] = useState<ReadLaterItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [removing, setRemoving] = useState<string | null>(null);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(
    (page: number, title: string, type: string) => {
      setLoading(true);
      getReadLaterList(locale, { page, title, type })
        .then((res) => {
          setItems(res.data ?? []);
          setMeta(res.meta ?? null);
        })
        .catch((err) => toast.handleServerErrors(err))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  useEffect(() => {
    load(1, '', '');
  }, [load]);

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => load(1, value, typeFilter), 500);
  };

  const remove = async (item: ReadLaterItem) => {
    setRemoving(item.slug);
    try {
      await removeReadLaterItem(locale, item.slug);
      toast.success(t('removed'));
      load(meta?.current_page ?? 1, searchTerm, typeFilter);
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      setRemoving(null);
    }
  };

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const publisher = (item: ReadLaterItem) =>
    item.company?.legal_name || item.insighter?.company?.legal_name || item.insighter?.name || '—';

  return (
    <div>
      <PageHeader icon={<IconBookmark size={22} />} title={t('title')} />

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-xs">
            <IconSearch size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pe-3 ps-9 text-sm outline-none focus:border-sky-400"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((type) => (
              <button
                key={type || 'all'}
                type="button"
                onClick={() => {
                  setTypeFilter(type);
                  load(1, searchTerm, type);
                }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  typeFilter === type
                    ? 'border-sky-500 bg-sky-50 text-sky-600'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {tk(type || 'all')}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <IconBookmark size={40} className="text-gray-300" />
            <p className="text-sm text-gray-500">
              {searchTerm || typeFilter ? t('emptyFiltered') : t('empty')}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-100 p-4 hover:border-gray-300"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <KnowledgeTypeIcon type={item.type} size={20} />
                  <div className="min-w-0">
                    <Link
                      href={`/${locale}/knowledge/${item.type}/${item.slug}`}
                      className="line-clamp-1 text-sm font-semibold text-gray-800 hover:text-sky-600"
                    >
                      {item.title}
                    </Link>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                      {t('by')} {publisher(item)}
                      {(item.company?.verified || item.insighter?.company?.verified) && (
                        <IconRosetteDiscountCheckFilled size={13} className="text-sky-500" />
                      )}
                      <span className="mx-1">•</span>
                      {t('publishedAt')}: {dateFormat.format(Date.parse(item.published_at) || Date.now())}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">
                    {currency.format(parseFloat(item.total_price) || 0)}
                  </span>
                  <Link
                    href={`/${locale}/knowledge/${item.type}/${item.slug}`}
                    className="rounded-lg border border-sky-500 px-3 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50"
                  >
                    {t('view')}
                  </Link>
                  <button
                    type="button"
                    disabled={removing === item.slug}
                    onClick={() => remove(item)}
                    title={t('remove')}
                    className={`rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 ${
                      removing === item.slug ? 'opacity-60' : ''
                    }`}
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && meta && meta.last_page > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {t('page')} {meta.current_page} {t('of')} {meta.last_page}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => load(p, searchTerm, typeFilter)}
                  className={`min-w-[28px] rounded-md px-1.5 py-1 text-xs font-medium ${
                    p === meta.current_page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
