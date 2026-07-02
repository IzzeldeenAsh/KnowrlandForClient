'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Modal } from '@mantine/core';
import {
  IconSearch,
  IconPlus,
  IconLayoutGrid,
  IconList,
  IconEye,
  IconTrash,
  IconPackage,
  IconUpload,
  IconDownload,
} from '@tabler/icons-react';
import { useToast } from '@/components/toast/ToastContext';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import KnowledgeTypeIcon from '@/components/insighter-dashboard/KnowledgeTypeIcon';
import {
  getMyKnowledgeList,
  deleteMyKnowledge,
  setMyKnowledgeStatus,
  type MyKnowledge,
} from '@/services/insighter-dashboard.api';

const KNOWLEDGE_TYPES = ['', 'data', 'report', 'manual', 'course', 'media', 'statistic'] as const;

type StatusFilter = '' | 'published' | 'scheduled' | 'unpublished';

function statusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'published':
      return 'bg-[#DFFEE9] text-[#1BC653]';
    case 'unpublished':
      return 'bg-red-50 text-red-500';
    case 'scheduled':
      return 'bg-amber-50 text-amber-600';
    default:
      return 'bg-[#EFF8FF] text-[#299AF8]';
  }
}

/**
 * Shared knowledge list for the my-knowledge tabs (general / posted /
 * scheduled / unpublished). Mirrors Angular general/posted/scheduled/
 * unpublished components: debounced search, type filter chips, list/grid
 * toggle, pagination, bulk delete and per-status actions.
 */
export default function KnowledgeListView({ status = '' as StatusFilter }: { status?: StatusFilter }) {
  const t = useTranslations('InsighterDashboard.myKnowledge');
  const locale = useLocale();
  const toast = useToast();
  const { hasRole } = useRoleCheck();

  const [items, setItems] = useState<MyKnowledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [confirm, setConfirm] = useState<{
    title: string;
    confirmLabel: string;
    danger?: boolean;
    action: () => Promise<void>;
  } | null>(null);
  const [confirmBusy, setConfirmBusy] = useState(false);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hadResults = useRef(false);

  const isCompanyInsighter = hasRole('company-insighter');

  const load = useCallback(
    (targetPage: number, keyword: string, type: string) => {
      setLoading(true);
      getMyKnowledgeList(locale, { page: targetPage, status: status || undefined, keyword, type })
        .then((res) => {
          setItems(res.data ?? []);
          setLastPage(res.meta?.last_page ?? 1);
          setPage(res.meta?.current_page ?? targetPage);
          if ((res.data ?? []).length > 0) hadResults.current = true;
          setSelected(new Set());
        })
        .catch((err) => toast.handleServerErrors(err))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, status]
  );

  useEffect(() => {
    load(1, '', '');
  }, [load]);

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => load(1, value, typeFilter), 500);
  };

  const onTypeFilter = (type: string) => {
    setTypeFilter(type);
    load(1, searchTerm, type);
  };

  const canShowDelete = (k: MyKnowledge) => {
    const requestStatus = k.account_manager_process?.request_status;
    if (requestStatus === 'declined') return false;
    if (isCompanyInsighter && requestStatus === 'pending') return false;
    return true;
  };

  const runConfirm = async () => {
    if (!confirm) return;
    setConfirmBusy(true);
    try {
      await confirm.action();
      setConfirm(null);
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      setConfirmBusy(false);
    }
  };

  const askDelete = (ids: number[]) => {
    setConfirm({
      title: t('confirmDelete.title'),
      confirmLabel: ids.length > 1 ? t('confirmDelete.confirmMany') : t('confirmDelete.confirm'),
      danger: true,
      action: async () => {
        await Promise.all(ids.map((id) => deleteMyKnowledge(locale, id)));
        toast.success(t('confirmDelete.deleted'));
        load(page, searchTerm, typeFilter);
      },
    });
  };

  const askUnpublish = (k: MyKnowledge) => {
    setConfirm({
      title: t('confirmUnpublish.title'),
      confirmLabel: t('confirmUnpublish.confirm'),
      action: async () => {
        await setMyKnowledgeStatus(locale, k.id, 'unpublished', new Date().toISOString());
        toast.success(t('confirmUnpublish.success'));
        load(page, searchTerm, typeFilter);
      },
    });
  };

  const askPublish = (k: MyKnowledge) => {
    setConfirm({
      title: t('confirmPublish.title'),
      confirmLabel: t('confirmPublish.confirm'),
      action: async () => {
        await setMyKnowledgeStatus(locale, k.id, 'published', new Date().toISOString());
        toast.success(t('confirmPublish.success'));
        load(page, searchTerm, typeFilter);
      },
    });
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.size === items.length ? new Set() : new Set(items.map((k) => k.id))
    );
  };

  const statusLabel = (k: MyKnowledge) => {
    if (k.status_label) return k.status_label;
    const key = k.status?.toLowerCase();
    return t.has(`status.${key}`) ? t(`status.${key}`) : k.status;
  };

  const viewHref = (k: MyKnowledge) => `/${locale}/my-knowledge-base/view-my-knowledge/${k.id}`;
  const addHref = `/${locale}/add-knowledge/stepper`;

  const rowActions = (k: MyKnowledge) => (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={viewHref(k)}
        title={t('actions.view')}
        className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-sky-600"
      >
        <IconEye size={18} />
      </Link>
      {status === 'published' && (
        <button
          type="button"
          title={t('actions.unpublish')}
          onClick={() => askUnpublish(k)}
          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-amber-600"
        >
          <IconDownload size={18} />
        </button>
      )}
      {status === 'scheduled' && (
        <button
          type="button"
          title={t('actions.publish')}
          onClick={() => askPublish(k)}
          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-green-600"
        >
          <IconUpload size={18} />
        </button>
      )}
      {status !== 'published' && canShowDelete(k) && (
        <button
          type="button"
          title={t('actions.delete')}
          onClick={() => askDelete([k.id])}
          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
        >
          <IconTrash size={18} />
        </button>
      )}
    </div>
  );

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const price = (k: MyKnowledge) => {
    const value = parseFloat(k.total_price);
    return Number.isFinite(value) ? currency.format(value) : k.total_price;
  };

  const emptyWithFilters = searchTerm || typeFilter;

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Toolbar */}
      {(items.length > 0 || emptyWithFilters || hadResults.current) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
          <div className="relative w-full max-w-xs">
            <IconSearch size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('search')}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pe-3 ps-9 text-sm outline-none focus:border-sky-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={addHref}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
            >
              <IconPlus size={16} />
              {t('addKnowledge')}
            </Link>
            <div className="flex rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={`rounded-s-lg p-2 ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
              >
                <IconLayoutGrid size={16} />
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className={`rounded-e-lg p-2 ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
              >
                <IconList size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Type filter chips */}
        {(items.length > 0 || emptyWithFilters) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {KNOWLEDGE_TYPES.map((type) => (
              <button
                key={type || 'all'}
                type="button"
                onClick={() => onTypeFilter(type)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  typeFilter === type
                    ? 'border-sky-500 bg-sky-50 text-sky-600'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {t(`types.${type || 'all'}`)}
              </button>
            ))}
          </div>
        )}

        {/* Bulk selection bar */}
        {selected.size > 0 && (
          <div className="mb-3 flex items-center justify-end gap-3 rounded-lg bg-gray-50 px-4 py-2">
            <span className="text-sm font-bold text-gray-700">
              {selected.size} {t('selected')}
            </span>
            <button
              type="button"
              onClick={() => askDelete(Array.from(selected))}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
            >
              {t('deleteSelected')}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          </div>
        )}

        {/* Empty state */}
        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <h3 className="text-lg font-bold text-gray-800">{t('empty.title')}</h3>
            <p className="max-w-md text-sm text-gray-500">
              {emptyWithFilters ? t('empty.filteredMessage') : t('empty.startCreating')}
            </p>
            <Link
              href={addHref}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
            >
              <IconPlus size={16} />
              {t('addKnowledge')}
            </Link>
          </div>
        )}

        {/* List view */}
        {!loading && items.length > 0 && view === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-start text-xs font-semibold uppercase text-gray-400">
                  <th className="w-8 py-3 pe-2">
                    <input
                      type="checkbox"
                      checked={selected.size === items.length && items.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="min-w-[250px] py-3 text-start">{t('table.name')}</th>
                  <th className="py-3 text-start">{t('table.type')}</th>
                  <th className="py-3 text-start">{t('table.price')}</th>
                  <th className="py-3 text-start">{t('table.status')}</th>
                  <th className="w-28 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map((k) => (
                  <tr key={k.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 pe-2">
                      <input
                        type="checkbox"
                        checked={selected.has(k.id)}
                        onChange={() => toggleSelect(k.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3">
                      <Link href={viewHref(k)} className="font-medium text-gray-800 hover:text-sky-600">
                        {k.title?.trim() || t('untitled')}
                      </Link>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-2 text-gray-600">
                        <KnowledgeTypeIcon type={k.type} />
                        <span className="capitalize">
                          {t.has(`types.${k.type}`) ? t(`types.${k.type}`) : k.type}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-gray-900">{price(k)}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-2">
                        {k.publish_as !== 'package' && (
                          <span
                            className={`rounded-md px-2 py-1 text-xs font-semibold capitalize ${statusBadgeClass(k.status)}`}
                          >
                            {statusLabel(k)}
                          </span>
                        )}
                        {(k.publish_as === 'both' || k.publish_as === 'package') && (
                          <span
                            title={k.publish_as === 'both' ? t('packageBadgeBoth') : t('packageBadgeOnly')}
                          >
                            <IconPackage size={18} className="text-[#0071FF]" />
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3">{rowActions(k)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid view */}
        {!loading && items.length > 0 && view === 'grid' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Link
              href={addHref}
              className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-sky-300 text-sky-500 hover:bg-sky-50"
            >
              <IconPlus size={36} />
              <span className="text-base font-bold">{t('addKnowledge')}</span>
            </Link>
            {items.map((k) => (
              <div
                key={k.id}
                className="relative flex min-h-[220px] flex-col justify-between rounded-xl border border-gray-200 p-5"
              >
                <div>
                  <Link
                    href={viewHref(k)}
                    className="line-clamp-2 min-h-[45px] font-semibold text-gray-800 hover:text-sky-600"
                  >
                    {k.title?.trim() || t('untitled')}
                  </Link>
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <KnowledgeTypeIcon type={k.type} />
                    <span className="capitalize">
                      {t.has(`types.${k.type}`) ? t(`types.${k.type}`) : k.type}
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-bold text-gray-900">{price(k)}</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-semibold capitalize ${statusBadgeClass(k.status)}`}
                  >
                    {statusLabel(k)}
                  </span>
                  {rowActions(k)}
                </div>
                {k.publish_as === 'package' && (
                  <span className="absolute end-3 top-3" title={t('packageBadgeOnly')}>
                    <IconPackage size={18} className="text-[#0071FF]" />
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && items.length > 0 && lastPage > 1 && (
          <div className="mt-4 flex justify-end gap-1">
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => load(p, searchTerm, typeFilter)}
                className={`min-w-[32px] rounded-md px-2 py-1.5 text-sm font-medium ${
                  p === page ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirm modal */}
      <Modal
        opened={!!confirm}
        onClose={() => !confirmBusy && setConfirm(null)}
        title={confirm?.title}
        centered
      >
        <p className="mb-5 text-sm text-gray-600">{t('confirmDelete.text')}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            disabled={confirmBusy}
            onClick={() => setConfirm(null)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            {t('confirmDelete.cancel')}
          </button>
          <button
            type="button"
            disabled={confirmBusy}
            onClick={runConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
              confirm?.danger ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'
            } ${confirmBusy ? 'opacity-60' : ''}`}
          >
            {confirm?.confirmLabel}
          </button>
        </div>
      </Modal>
    </div>
  );
}
