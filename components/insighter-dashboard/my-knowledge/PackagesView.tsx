'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Modal } from '@mantine/core';
import { IconTrash, IconPackage, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useToast } from '@/components/toast/ToastContext';
import KnowledgeTypeIcon from '@/components/insighter-dashboard/KnowledgeTypeIcon';
import {
  getPackagesList,
  deletePackage,
  getPackageKnowledge,
  type KnowledgePackage,
  type MyKnowledge,
} from '@/services/insighter-dashboard.api';

/** Packages tab: list of knowledge packages with expandable contents. */
export default function PackagesView() {
  const t = useTranslations('InsighterDashboard.myKnowledge');
  const locale = useLocale();
  const toast = useToast();
  const [packages, setPackages] = useState<KnowledgePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [contents, setContents] = useState<Record<number, MyKnowledge[]>>({});
  const [deleteTarget, setDeleteTarget] = useState<KnowledgePackage | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    getPackagesList(locale)
      .then(setPackages)
      .catch((err) => toast.handleServerErrors(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleExpand = (pkg: KnowledgePackage) => {
    const next = expanded === pkg.id ? null : pkg.id;
    setExpanded(next);
    if (next !== null && !contents[pkg.id]) {
      getPackageKnowledge(locale, pkg.id)
        .then((res) => setContents((prev) => ({ ...prev, [pkg.id]: res.data ?? [] })))
        .catch(() => setContents((prev) => ({ ...prev, [pkg.id]: [] })));
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      await deletePackage(locale, deleteTarget.id);
      toast.success(t('confirmDelete.deleted'));
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-16 text-center">
        <IconPackage size={40} className="text-gray-300" />
        <h3 className="text-lg font-bold text-gray-800">{t('empty.title')}</h3>
        <p className="max-w-md text-sm text-gray-500">{t('empty.message')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {packages.map((pkg) => (
        <div key={pkg.id} className="rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <button
              type="button"
              onClick={() => toggleExpand(pkg)}
              className="flex items-center gap-3 text-start"
            >
              <IconPackage size={22} className="text-[#0071FF]" />
              <span className="font-semibold text-gray-800">{pkg.name}</span>
              {pkg.status && (
                <span
                  className={`rounded-md px-2 py-1 text-xs font-semibold capitalize ${
                    pkg.status === 'published'
                      ? 'bg-[#DFFEE9] text-[#1BC653]'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {pkg.status}
                </span>
              )}
              {expanded === pkg.id ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </button>
            <div className="flex items-center gap-2">
              {pkg.discount != null && Number(pkg.discount) > 0 && (
                <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600">
                  -{pkg.discount}%
                </span>
              )}
              <button
                type="button"
                title={t('actions.delete')}
                onClick={() => setDeleteTarget(pkg)}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
              >
                <IconTrash size={18} />
              </button>
            </div>
          </div>
          {expanded === pkg.id && (
            <div className="border-t border-gray-100 p-5">
              {!contents[pkg.id] ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
              ) : contents[pkg.id].length === 0 ? (
                <p className="text-sm text-gray-400">{t('empty.message')}</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {contents[pkg.id].map((k) => (
                    <li key={k.id} className="flex items-center gap-2 text-sm text-gray-700">
                      <KnowledgeTypeIcon type={k.type} />
                      {k.title?.trim() || t('untitled')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      <Modal
        opened={!!deleteTarget}
        onClose={() => !busy && setDeleteTarget(null)}
        title={t('confirmDelete.title')}
        centered
      >
        <p className="mb-5 text-sm text-gray-600">{t('confirmDelete.text')}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => setDeleteTarget(null)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            {t('confirmDelete.cancel')}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={confirmDelete}
            className={`rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 ${busy ? 'opacity-60' : ''}`}
          >
            {t('confirmDelete.confirm')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
