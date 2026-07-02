'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import IsicCodeUpsertModal, { IsicNode, IsicStatus, IsicUpsertPayload } from './IsicCodeUpsertModal';

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

const INPUT_WITH_ICON_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const PRIMARY_BUTTON_CLASS =
  'h-8 rounded-md border border-blue-600 bg-blue-600 px-4 text-xs font-medium text-white shadow-sm shadow-gray-300 hover:bg-blue-700';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === 'active') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'inactive') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function collectAllKeys(nodes: IsicNode[]): number[] {
  const keys: number[] = [];
  const walk = (list: IsicNode[]) => {
    for (const node of list) {
      keys.push(node.key);
      if (Array.isArray(node.children) && node.children.length > 0) {
        walk(node.children);
      }
    }
  };
  walk(nodes);
  return keys;
}

function filterTree(nodes: IsicNode[], query: string): IsicNode[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return nodes;

  const matches = (node: IsicNode): boolean => {
    const combined = [node.key, node.code, node.names?.en, node.names?.ar, node.status]
      .map((v) => String(v ?? ''))
      .join(' ')
      .toLowerCase();
    return combined.includes(normalizedQuery);
  };

  const walk = (list: IsicNode[]): IsicNode[] => {
    const next: IsicNode[] = [];
    for (const node of list) {
      const children = Array.isArray(node.children) ? walk(node.children) : [];
      if (matches(node) || children.length > 0) {
        next.push({ ...node, children });
      }
    }
    return next;
  };

  return walk(nodes);
}

function findImmediateParentId(nodes: IsicNode[], targetKey: number): number {
  const walk = (list: IsicNode[], parent: number): number | null => {
    for (const node of list) {
      if (node.key === targetKey) return parent;
      if (Array.isArray(node.children) && node.children.length > 0) {
        const found = walk(node.children, node.key);
        if (found !== null) return found;
      }
    }
    return null;
  };
  return walk(nodes, 0) ?? 0;
}

type FlatRow = {
  node: IsicNode;
  depth: number;
  hasChildren: boolean;
};

function flattenTree(nodes: IsicNode[], expanded: Set<number>, depth = 0): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const node of nodes) {
    const children = Array.isArray(node.children) ? node.children : [];
    const hasChildren = children.length > 0;
    rows.push({ node, depth, hasChildren });
    if (hasChildren && expanded.has(node.key)) {
      rows.push(...flattenTree(children, expanded, depth + 1));
    }
  }
  return rows;
}

type ParentOption = { value: number; label: string };

function buildParentOptions(nodes: IsicNode[]): ParentOption[] {
  const options: ParentOption[] = [];
  const walk = (list: IsicNode[], depth: number) => {
    for (const node of list) {
      const code = normalizeText(node.code);
      const name = normalizeText(node.names?.en) || `#${node.key}`;
      const prefix = depth > 0 ? `${'—'.repeat(Math.min(4, depth))} ` : '';
      options.push({ value: node.key, label: `${prefix}${code ? `${code} - ` : ''}${name}` });
      if (Array.isArray(node.children) && node.children.length > 0) {
        walk(node.children, depth + 1);
      }
    }
  };
  walk(nodes, 0);
  return options;
}

export default function IsicCodesTab() {
  const { handleServerErrors, success } = useToast();

  const [tree, setTree] = useState<IsicNode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');
  const [expandedKeys, setExpandedKeys] = useState<Set<number>>(new Set());

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchTree = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.foresighta.co/api/common/setting/isic-code/tree-list', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en',
        },
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = (await response.json()) as unknown;
      const nextTree = Array.isArray(payload) ? (payload as IsicNode[]) : [];
      setTree(nextTree);
      setExpandedKeys(new Set()); // collapsed by default; filter auto-expands
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to load ISIC codes right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to load ISIC codes right now.';
      setError(message);
      setTree([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleServerErrors]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchTree(controller.signal);
    return () => controller.abort();
  }, [fetchTree]);

  const filteredTree = useMemo(() => filterTree(tree, searchInput), [searchInput, tree]);
  const hasActiveFilter = Boolean(searchInput.trim());

  useEffect(() => {
    if (!hasActiveFilter) return;
    setExpandedKeys(new Set(collectAllKeys(filteredTree)));
  }, [filteredTree, hasActiveFilter]);

  const flatRows = useMemo(() => flattenTree(filteredTree, expandedKeys), [expandedKeys, filteredTree]);
  const parentOptions = useMemo(() => buildParentOptions(tree), [tree]);

  const selectedNode = useMemo(() => {
    if (selectedKey === null) return null;
    const find = (list: IsicNode[]): IsicNode | null => {
      for (const node of list) {
        if (node.key === selectedKey) return node;
        if (Array.isArray(node.children) && node.children.length > 0) {
          const found = find(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    return find(tree);
  }, [selectedKey, tree]);

  const openCreate = () => {
    setModalMode('create');
    setSelectedKey(null);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const openEdit = (key: number) => {
    setModalMode('edit');
    setSelectedKey(key);
    setSubmitError('');
    setIsSubmitting(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedKey(null);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const submitUpsert = async (payload: IsicUpsertPayload) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const url =
        modalMode === 'create'
          ? 'https://api.foresighta.co/api/admin/setting/isic-code'
          : `https://api.foresighta.co/api/admin/setting/isic-code/${selectedKey ?? ''}`;

      const response = await fetch(url, {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success(modalMode === 'create' ? 'ISIC code created.' : 'ISIC code updated.', '', 3500);
      closeModal();
      const controller = new AbortController();
      void fetchTree(controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to save ISIC code right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to save ISIC code right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const deleteNode = async (key: number, label: string) => {
    const ok = window.confirm(`Delete ISIC code "${label}"? This action cannot be undone.`);
    if (!ok) return;

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError('Missing auth token. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`https://api.foresighta.co/api/admin/setting/isic-code/${key}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      success('ISIC code deleted.', '', 3500);
      const controller = new AbortController();
      void fetchTree(controller.signal);
    } catch (requestError) {
      handleServerErrors(requestError);
      const message =
        requestError && typeof requestError === 'object' && 'message' in requestError
          ? String((requestError as { message?: unknown }).message ?? 'Unable to delete ISIC code right now.')
          : requestError instanceof Error
            ? requestError.message
            : 'Unable to delete ISIC code right now.';
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const toggleExpanded = (key: number) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const collapseAll = () => setExpandedKeys(new Set());
  const expandAll = () => setExpandedKeys(new Set(collectAllKeys(filteredTree)));

  const modalTitle = modalMode === 'create' ? 'Add ISIC Code' : `Edit ISIC Code #${selectedKey ?? ''}`;
  const parentId = selectedKey !== null ? findImmediateParentId(tree, selectedKey) : 0;
  const modalInitial = {
    code: normalizeText(selectedNode?.code),
    en: normalizeText(selectedNode?.names?.en),
    ar: normalizeText(selectedNode?.names?.ar),
    status: (normalizeText(selectedNode?.status).toLowerCase() === 'inactive' ? 'inactive' : 'active') as IsicStatus,
    parentId,
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold text-slate-900">ISIC Codes</h2>
          <p className="text-xs font-light text-slate-500 ps-1">Visible rows: {flatRows.length}</p>
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
              placeholder="Search ISIC code..."
              className={INPUT_WITH_ICON_CLASS}
            />
          </div>

          <button type="button" onClick={collapseAll} className={SECONDARY_BUTTON_CLASS}>
            Collapse
          </button>
          <button type="button" onClick={expandAll} className={SECONDARY_BUTTON_CLASS}>
            Expand
          </button>

          <button type="button" onClick={openCreate} className={PRIMARY_BUTTON_CLASS}>
            Create
          </button>
        </div>
      </div>

      {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}

      <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[980px] w-full border-collapse text-xs text-slate-700">
          <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500">
            <tr>
              <th className="w-[180px] border-b border-slate-200 px-3 py-2 text-left">Code</th>
              <th className="border-b border-slate-200 px-3 py-2 text-left">Name (EN)</th>
              <th className="border-b border-slate-200 px-3 py-2 text-left">Name (AR)</th>
              <th className="w-[140px] border-b border-slate-200 px-3 py-2 text-left">Status</th>
              <th className="w-[160px] border-b border-slate-200 px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-red-600">
                  {error}
                </td>
              </tr>
            ) : flatRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-500">
                  No ISIC codes found.
                </td>
              </tr>
            ) : (
              flatRows.map((row) => {
                const code = normalizeText(row.node.code) || '-';
                const en = normalizeText(row.node.names?.en) || `#${row.node.key}`;
                const ar = normalizeText(row.node.names?.ar) || '-';
                const status = normalizeText(row.node.status) || 'unknown';
                const expanded = expandedKeys.has(row.node.key);

                return (
                  <tr key={row.node.key} className="odd:bg-white even:bg-slate-50/50">
                    <td className="border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center gap-2" style={{ paddingInlineStart: row.depth * 16 }}>
                        {row.hasChildren ? (
                          <button
                            type="button"
                            onClick={() => toggleExpanded(row.node.key)}
                            className="inline-flex h-5 w-5 items-center justify-center rounded border border-slate-200 bg-white text-[10px] text-slate-600 shadow-sm hover:bg-slate-50"
                            aria-label={expanded ? 'Collapse' : 'Expand'}
                          >
                            {expanded ? '–' : '+'}
                          </button>
                        ) : (
                          <span className="h-5 w-5" aria-hidden="true" />
                        )}
                        <span className="font-medium text-slate-900">{code}</span>
                      </div>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">{en}</td>
                    <td className="border-b border-slate-100 px-3 py-2">{ar}</td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => openEdit(row.node.key)} className={ROW_ACTION_BUTTON_CLASS}>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteNode(row.node.key, `${code} - ${en}`)}
                          disabled={isSubmitting}
                          className={ROW_ACTION_BUTTON_CLASS}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <IsicCodeUpsertModal
        isOpen={modalOpen}
        mode={modalMode}
        title={modalTitle}
        initial={modalMode === 'create' ? { code: '', en: '', ar: '', status: 'active', parentId: 0 } : modalInitial}
        parentOptions={parentOptions}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={submitUpsert}
      />
    </div>
  );
}

