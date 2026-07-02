'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  IconSearch,
  IconX,
  IconDownload,
  IconFileText,
  IconRosetteDiscountCheckFilled,
} from '@tabler/icons-react';
import PageHeader from '@/components/insighter-dashboard/PageHeader';
import KnowledgeTypeIcon from '@/components/insighter-dashboard/KnowledgeTypeIcon';
import { useToast } from '@/components/toast/ToastContext';
import { getAuthToken } from '@/lib/authToken';
import { downloadAccountKnowledge } from '@/lib/knowledgeDownload';
import {
  getMyDownloads,
  getDocumentDownloadUrl,
  type DownloadKnowledgeItem,
  type DownloadDocument,
  type PaginationMeta,
} from '@/services/insighter-dashboard.api';

const FILE_ICONS = ['csv', 'doc', 'docx', 'jpg', 'mp3', 'mp4', 'pdf', 'ppt', 'pptx', 'txt', 'xls', 'xlsx', 'zip', 'rar', 'png'];

function fileIcon(extension?: string): string {
  const ext = extension?.toLowerCase() ?? '';
  return FILE_ICONS.includes(ext) ? `/file-icons/${ext}.svg` : '/file-icons/file.svg';
}

function formatFileSize(bytes: number): string {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/**
 * /insighter-dashboard/my-downloads — purchased knowledge library.
 * Master-detail layout mirroring the Angular my-downloads page:
 * knowledge list | documents of selection | source details.
 */
export default function MyDownloadsClient() {
  const t = useTranslations('InsighterDashboard.myDownloads');
  const locale = useLocale();
  const toast = useToast();

  const [items, setItems] = useState<DownloadKnowledgeItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<DownloadKnowledgeItem | null>(null);
  const [downloading, setDownloading] = useState<Set<string>>(new Set());
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(
    (page: number, title: string) => {
      setLoading(true);
      getMyDownloads(locale, { page, title })
        .then((res) => {
          setItems(res.data ?? []);
          setMeta(res.meta ?? null);
          setSelected((prev) =>
            prev ? (res.data ?? []).find((k) => k.uuid === prev.uuid) ?? res.data?.[0] ?? null : res.data?.[0] ?? null
          );
        })
        .catch((err) => toast.handleServerErrors(err))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  useEffect(() => {
    load(1, '');
  }, [load]);

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => load(1, value), 500);
  };

  const markBusy = (uuid: string, busy: boolean) =>
    setDownloading((prev) => {
      const next = new Set(prev);
      if (busy) next.add(uuid);
      else next.delete(uuid);
      return next;
    });

  const downloadDocument = async (doc: DownloadDocument) => {
    markBusy(doc.uuid, true);
    try {
      const url = await getDocumentDownloadUrl(locale, doc.uuid);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const now = new Date().toISOString();
      setItems((prev) =>
        prev.map((k) => ({
          ...k,
          documents: k.documents.map((d) => (d.uuid === doc.uuid ? { ...d, download_at: now } : d)),
        }))
      );
      setSelected((prev) =>
        prev
          ? {
              ...prev,
              documents: prev.documents.map((d) =>
                d.uuid === doc.uuid ? { ...d, download_at: now } : d
              ),
            }
          : prev
      );
      toast.success(t('downloadStarted'));
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      markBusy(doc.uuid, false);
    }
  };

  const downloadWholeKnowledge = async (knowledge: DownloadKnowledgeItem) => {
    markBusy(knowledge.uuid, true);
    try {
      await downloadAccountKnowledge(knowledge.uuid, {
        token: getAuthToken(),
        locale,
        filename: knowledge.title,
      });
      toast.success(t('downloadStarted'));
    } catch (err) {
      toast.handleServerErrors(err);
    } finally {
      markBusy(knowledge.uuid, false);
    }
  };

  const isNew = (k: DownloadKnowledgeItem) => !k.download_at;
  const dateFormat = new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formatDate = (value?: string | null) => {
    if (!value) return '—';
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? value : dateFormat.format(parsed);
  };

  return (
    <div>
      <PageHeader icon={<IconDownload size={22} />} title={t('title')} />

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <div className="relative w-full max-w-sm">
          <IconSearch size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pe-9 ps-9 text-sm outline-none focus:border-sky-400"
          />
          {searchTerm && (
            <button
              type="button"
              title={t('clearSearch')}
              onClick={() => onSearchChange('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <IconX size={14} />
            </button>
          )}
        </div>
        {meta && (
          <span className="text-sm text-gray-500">
            {t('total')}: {meta.total}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-gray-200 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white py-16 text-center">
          <IconDownload size={40} className="text-gray-300" />
          <p className="text-sm text-gray-500">
            {searchTerm ? t('noSearchResults') : t('noDownloads')}
          </p>
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="mt-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              {t('viewAll')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Knowledge list */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <h3 className="border-b border-gray-100 px-4 py-3 text-sm font-bold text-gray-900">
              {t('knowledgeItems')}
            </h3>
            <div className="flex max-h-[560px] flex-col gap-2 overflow-y-auto p-3">
              {items.map((k) => (
                <button
                  key={k.uuid}
                  type="button"
                  onClick={() => setSelected(k)}
                  className={`relative rounded-lg border p-3 text-start transition-colors ${
                    selected?.uuid === k.uuid
                      ? 'border-sky-400 bg-sky-50/60'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {isNew(k) && (
                    <span className="absolute end-2 top-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {t('isNew')}
                    </span>
                  )}
                  <div className="flex items-center gap-2 pe-10">
                    <KnowledgeTypeIcon type={k.type} size={18} />
                    <span className="line-clamp-2 text-sm font-semibold text-gray-800">{k.title}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                    <span>
                      {t('by')} {k.insighter}
                    </span>
                    <span>{formatDate(k.purchase_date)}</span>
                  </div>
                </button>
              ))}
            </div>
            {meta && meta.last_page > 1 && (
              <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2 text-sm">
                <span className="text-gray-500">
                  {t('page')} {meta.current_page} {t('of')} {meta.last_page}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => load(p, searchTerm)}
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

          {/* Documents */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <h3 className="text-sm font-bold text-gray-900">{t('documents')}</h3>
              {selected && selected.documents.length > 0 && (
                <button
                  type="button"
                  disabled={downloading.has(selected.uuid)}
                  onClick={() => downloadWholeKnowledge(selected)}
                  className={`inline-flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-600 ${
                    downloading.has(selected.uuid) ? 'opacity-60' : ''
                  }`}
                >
                  <IconDownload size={14} />
                  {t('downloadAll')}
                </button>
              )}
            </div>
            <div className="flex max-h-[560px] flex-col gap-2 overflow-y-auto p-3">
              {!selected ? (
                <p className="py-10 text-center text-sm text-gray-400">{t('selectKnowledge')}</p>
              ) : selected.documents.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-400">{t('noDocuments')}</p>
              ) : (
                selected.documents.map((doc) => (
                  <div
                    key={doc.uuid}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={fileIcon(doc.file_extension)} alt={doc.file_extension} className="h-8 w-8 shrink-0" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-gray-800">{doc.file_name}</div>
                        <div className="text-xs text-gray-400">
                          {formatFileSize(doc.file_size)}
                          {doc.price === 0 && (
                            <span className="ms-2 font-semibold text-green-600">{t('free')}</span>
                          )}
                          {doc.download_at && (
                            <span className="ms-2">
                              {t('downloadDate')}: {formatDate(doc.download_at)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={downloading.has(doc.uuid)}
                      onClick={() => downloadDocument(doc)}
                      title={t('download')}
                      className={`shrink-0 rounded-lg border border-sky-500 p-2 text-sky-600 hover:bg-sky-50 ${
                        downloading.has(doc.uuid) ? 'opacity-60' : ''
                      }`}
                    >
                      <IconDownload size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Source details */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <h3 className="border-b border-gray-100 px-4 py-3 text-sm font-bold text-gray-900">
              {t('knowledgeSource')}
            </h3>
            <div className="p-4">
              {!selected ? (
                <p className="py-10 text-center text-sm text-gray-400">{t('selectItemDetails')}</p>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {selected.company?.logo || selected.insighter_photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selected.company?.logo || selected.insighter_photo || ''}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 font-bold text-sky-600">
                        {(selected.company?.legal_name || selected.insighter || '?').charAt(0)}
                      </span>
                    )}
                    <div>
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
                        {selected.company?.legal_name || selected.insighter}
                        {selected.company?.verified && (
                          <IconRosetteDiscountCheckFilled size={16} className="text-sky-500" />
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t('by')} {selected.insighter}
                      </div>
                    </div>
                  </div>

                  <dl className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-400">{t('type')}</dt>
                      <dd className="flex items-center gap-1.5 font-medium capitalize text-gray-700">
                        <KnowledgeTypeIcon type={selected.type} size={14} />
                        {selected.type}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">{t('purchaseDate')}</dt>
                      <dd className="font-medium text-gray-700">{formatDate(selected.purchase_date)}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/${locale}/knowledge/${selected.type}/${selected.knowledge_slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-500 px-4 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50"
                  >
                    <IconFileText size={16} />
                    {t('view')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
