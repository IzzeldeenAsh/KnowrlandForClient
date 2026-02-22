'use client';

import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import TransactionDetailsModal from './TransactionDetailsModal';
import type {
  ChartDataPoint,
  PlatformBalanceResponse,
  StatisticsResponse,
  TransactionMeta,
  TransactionRecord,
  TransactionResponse,
} from './types';

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
const INPUT_CLASS =
  'h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:border-[1px]';
const SECONDARY_BUTTON_CLASS =
  'h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50';
const ROW_ACTION_BUTTON_CLASS =
  'rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 shadow-sm hover:bg-slate-50';

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function toTitle(value: string): string {
  return normalizeText(value)
    .replace(/_/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getTransactionTypeLabel(type: string): string {
  const normalized = normalizeText(type);
  const map: Record<string, string> = {
    income_knowledge: 'Knowledge Income',
    withdraw_payout_insighter_knowledge: 'Insighter Knowledge Payout',
    book_meeting: 'Meeting Booking',
    withdraw_payout_insighter_meeting: 'Insighter Meeting Payout',
    income_case: 'Case Income',
    withdraw_payout_insighter_case: 'Insighter Case Payout',
    income_prize: 'Prize Income',
    withdraw_payout_insighter_prize: 'Insighter Prize Payout',
  };
  return map[normalized] || toTitle(normalized);
}

function formatDate(dateString: string): string {
  const value = normalizeText(dateString);
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatAmountBadge(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const absAmount = Math.abs(safeAmount);
  const open = safeAmount < 0 ? '(' : '';
  const close = safeAmount < 0 ? ')' : '';
  return `${open}$${absAmount.toFixed(2)}${close}`;
}

function getTxBadgeClass(tx: string): string {
  const normalized = normalizeText(tx).toLowerCase();
  if (normalized === 'deposit') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (normalized === 'withdraw') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
  return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
}

function getPaginationWindow(currentPage: number, lastPage: number, maxVisiblePages = 5): number[] {
  const safeLast = Math.max(1, lastPage);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeLast);
  const pages: number[] = [];

  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, safeCurrent - half);
  let end = Math.min(safeLast, start + maxVisiblePages - 1);
  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
}

function convertStatisticsToChartData(response: StatisticsResponse, period: Period): ChartDataPoint[] {
  const chartData: ChartDataPoint[] = [];
  const data = response.data;

  if (period === 'weekly' && data.weekly) {
    const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (const day of weekOrder) {
      const dayData = data.weekly[day];
      chartData.push({
        date: day,
        deposits: Math.abs(dayData?.deposit ?? 0),
        withdrawals: Math.abs(dayData?.withdraw ?? 0),
      });
    }
  } else if (period === 'monthly' && data.monthly) {
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (const month of monthOrder) {
      const monthData = data.monthly[month];
      chartData.push({
        date: month,
        deposits: Math.abs(monthData?.deposit ?? 0),
        withdrawals: Math.abs(monthData?.withdraw ?? 0),
      });
    }
  } else if (period === 'yearly' && data.yearly) {
    const years = Object.keys(data.yearly).sort((a, b) => Number(a) - Number(b));
    for (const year of years) {
      const yearData = data.yearly[year];
      chartData.push({
        date: year,
        deposits: Math.abs(yearData?.deposit ?? 0),
        withdrawals: Math.abs(yearData?.withdraw ?? 0),
      });
    }
  }

  return chartData;
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const element = ref.current;

    const update = () => {
      const rect = element.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();

    if (!(window as any).ResizeObserver) {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }

    const ro = new (window as any).ResizeObserver(() => update());
    ro.observe(element);
    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

function buildSmoothPath(points: Array<{ x: number; y: number }>, tension = 0.4): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return d;
}

function MiniCurveChart({ points }: { points: ChartDataPoint[] }) {
  const { ref: containerRef, size } = useElementSize<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = Math.max(1, Math.round(size.width));
  const height = Math.max(1, Math.round(size.height));

  const padding = useMemo(
    () => ({
      top: 14,
      bottom: 26,
      left: 50,
      right: 14,
    }),
    [],
  );

  const maxValue = useMemo(() => {
    const max = points.reduce((acc, p) => Math.max(acc, Number(p.deposits) || 0, Number(p.withdrawals) || 0), 0);
    return max <= 0 ? 1 : max;
  }, [points]);

  const plotW = Math.max(1, width - padding.left - padding.right);
  const plotH = Math.max(1, height - padding.top - padding.bottom);
  const stepX = points.length > 1 ? plotW / (points.length - 1) : 0;

  const xForIndex = useCallback((index: number) => padding.left + stepX * index, [padding.left, stepX]);
  const yForValue = useCallback(
    (value: number) => {
      const v = Number.isFinite(value) ? value : 0;
      const t = v / maxValue;
      return padding.top + plotH * (1 - clampNumber(t, 0, 1));
    },
    [maxValue, padding.top, plotH],
  );

  const deposits = useMemo(
    () =>
      points.map((p, index) => ({
        x: xForIndex(index),
        y: yForValue(Number(p.deposits) || 0),
        label: p.date,
        value: Number(p.deposits) || 0,
      })),
    [points, xForIndex, yForValue],
  );

  const withdrawals = useMemo(
    () =>
      points.map((p, index) => ({
        x: xForIndex(index),
        y: yForValue(Number(p.withdrawals) || 0),
        label: p.date,
        value: Number(p.withdrawals) || 0,
      })),
    [points, xForIndex, yForValue],
  );

  const depLine = useMemo(() => buildSmoothPath(deposits), [deposits]);
  const wdrLine = useMemo(() => buildSmoothPath(withdrawals), [withdrawals]);
  const bottomY = padding.top + plotH;

  const depArea = useMemo(() => {
    if (!depLine || deposits.length === 0) return '';
    const firstX = deposits[0].x;
    const lastX = deposits[deposits.length - 1].x;
    return `${depLine} L ${lastX.toFixed(2)} ${bottomY.toFixed(2)} L ${firstX.toFixed(2)} ${bottomY.toFixed(2)} Z`;
  }, [bottomY, depLine, deposits]);

  const wdrArea = useMemo(() => {
    if (!wdrLine || withdrawals.length === 0) return '';
    const firstX = withdrawals[0].x;
    const lastX = withdrawals[withdrawals.length - 1].x;
    return `${wdrLine} L ${lastX.toFixed(2)} ${bottomY.toFixed(2)} L ${firstX.toFixed(2)} ${bottomY.toFixed(2)} Z`;
  }, [bottomY, withdrawals, wdrLine]);

  const onPointerMove = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (points.length === 0) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const relative = x - padding.left;
      const rawIndex = stepX > 0 ? Math.round(relative / stepX) : 0;
      setHoverIndex(clampNumber(rawIndex, 0, points.length - 1));
    },
    [padding.left, points.length, stepX],
  );

  const onPointerLeave = useCallback(() => setHoverIndex(null), []);

  const tooltip = useMemo(() => {
    if (hoverIndex === null) return null;
    const label = points[hoverIndex]?.date ?? '';
    const depositsValue = Number(points[hoverIndex]?.deposits ?? 0);
    const withdrawalsValue = Number(points[hoverIndex]?.withdrawals ?? 0);
    return { label, depositsValue, withdrawalsValue, left: xForIndex(hoverIndex), index: hoverIndex };
  }, [hoverIndex, points, xForIndex]);

  const yTicks = useMemo(() => {
    const steps = 4;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      const value = maxValue * (1 - t);
      const y = padding.top + plotH * t;
      return { value, y };
    });
  }, [maxValue, padding.top, plotH]);

  const xTickIndexes = useMemo(() => {
    const count = points.length;
    if (count === 0) return [];
    if (count <= 12) return [...Array(count)].map((_, i) => i);
    const maxTicks = 10;
    const step = Math.ceil(count / maxTicks);
    const indexes: number[] = [];
    for (let i = 0; i < count; i += step) indexes.push(i);
    if (indexes[indexes.length - 1] !== count - 1) indexes.push(count - 1);
    return indexes;
  }, [points.length]);

  if (!points.length) {
    return <div className="text-xs text-slate-500">No chart data.</div>;
  }

  return (
    <div ref={containerRef} className="h-[220px] w-full">
      <div className="relative h-full w-full">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          style={{ touchAction: 'none' }}
          role="img"
          aria-label="Income vs expenditure chart"
        >
          <defs>
            <linearGradient id="depFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wdrFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => (
            <g key={tick.y}>
              <line x1={padding.left} x2={width - padding.right} y1={tick.y} y2={tick.y} stroke="#f3f4f6" strokeWidth={1} />
              <text x={padding.left - 10} y={tick.y + 4} textAnchor="end" fontSize="11" fill="#6b7280">
                {`$${Math.round(tick.value).toLocaleString('en-US')}`}
              </text>
            </g>
          ))}

          {xTickIndexes.map((index) => {
            const x = xForIndex(index);
            return (
              <text key={index} x={x} y={padding.top + plotH + 18} textAnchor="middle" fontSize="11" fill="#6b7280">
                {points[index]?.date ?? ''}
              </text>
            );
          })}

          {wdrArea ? <path d={wdrArea} fill="url(#wdrFill)" /> : null}
          {depArea ? <path d={depArea} fill="url(#depFill)" /> : null}

          {wdrLine ? <path d={wdrLine} fill="none" stroke="#ef4444" strokeWidth={2} /> : null}
          {depLine ? <path d={depLine} fill="none" stroke="#10b981" strokeWidth={2} /> : null}

          {tooltip ? (
            <line x1={tooltip.left} x2={tooltip.left} y1={padding.top} y2={padding.top + plotH} stroke="#6b7280" strokeWidth={2} opacity={0.7} />
          ) : null}

          {tooltip
            ? [
                { color: '#10b981', value: tooltip.depositsValue },
                { color: '#ef4444', value: tooltip.withdrawalsValue },
              ].map((series) => (
                <g key={series.color}>
                  <circle cx={tooltip.left} cy={yForValue(series.value)} r={6} fill={series.color} opacity={0.18} />
                  <circle cx={tooltip.left} cy={yForValue(series.value)} r={4} fill={series.color} stroke="#ffffff" strokeWidth={2} />
                </g>
              ))
            : null}
        </svg>

        {tooltip ? (
          <div
            className="pointer-events-none absolute top-3 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-800 shadow-sm"
            style={{
              left: clampNumber(tooltip.left + 10, 8, Math.max(8, width - 220)),
              width: 210,
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="mb-2 text-center text-[12px] font-semibold text-slate-900">{tooltip.label}</div>
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: '#10b981' }} />
                  <span className="font-medium">Income</span>
                </div>
                <span className="font-semibold">{`$${tooltip.depositsValue.toLocaleString('en-US')}`}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: '#ef4444' }} />
                  <span className="font-medium">Expenditure</span>
                </div>
                <span className="font-semibold">{`$${tooltip.withdrawalsValue.toLocaleString('en-US')}`}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type Period = 'weekly' | 'monthly' | 'yearly';

export default function TransactionsTab() {
  const { handleServerErrors } = useToast();

  const [selectedPeriod, setSelectedPeriod] = useState<Period>('monthly');

  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [meta, setMeta] = useState<TransactionMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [balanceLoading, setBalanceLoading] = useState<boolean>(true);
  const [platformBalance, setPlatformBalance] = useState<number>(0);
  const [providerFee, setProviderFee] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);

  const [chartLoading, setChartLoading] = useState<boolean>(true);
  const [chartPoints, setChartPoints] = useState<ChartDataPoint[]>([]);

  const [perPage, setPerPage] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');

  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const currentRequestAbort = useRef<AbortController | null>(null);

  const fetchTransactions = useCallback(
    async (page = 1, perPageValue = perPage, period: Period = selectedPeriod, signal?: AbortSignal) => {
      setIsLoading(true);
      setError('');

      try {
        const token = getAuthToken();
        if (!token) {
          setTransactions([]);
          setMeta({ current_page: 1, last_page: 1, per_page: perPageValue, total: 0 });
          setError('Missing auth token. Please sign in again.');
          return;
        }

        const url = new URL('https://api.foresighta.co/api/admin/fund/platform/transaction');
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', String(perPageValue));
        url.searchParams.set('per_time', period);

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });

        if (!response.ok) throw await parseApiError(response);
        const payload = (await response.json()) as TransactionResponse;
        setTransactions(Array.isArray(payload.data) ? payload.data : []);
        setMeta(payload.meta ?? { current_page: page, last_page: 1, per_page: perPageValue, total: 0 });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        handleServerErrors(requestError);
        const message =
          requestError && typeof requestError === 'object' && 'message' in requestError
            ? String((requestError as { message?: unknown }).message ?? 'Unable to load transactions right now.')
            : requestError instanceof Error
              ? requestError.message
              : 'Unable to load transactions right now.';
        setError(message);
        setTransactions([]);
        setMeta({ current_page: 1, last_page: 1, per_page: perPageValue, total: 0 });
      } finally {
        setIsLoading(false);
      }
    },
    [handleServerErrors, perPage, selectedPeriod],
  );

  const fetchBalance = useCallback(async (signal?: AbortSignal) => {
    setBalanceLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        setPlatformBalance(0);
        setProviderFee(0);
        setNetAmount(0);
        return;
      }

      const response = await fetch('https://api.foresighta.co/api/admin/fund/platform/balance', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildAuthHeaders(token),
      });
      if (!response.ok) throw await parseApiError(response);
      const payload = (await response.json()) as PlatformBalanceResponse;
      setPlatformBalance(Number(payload.data?.balance ?? 0));
      setProviderFee(Number(payload.data?.provider_fee ?? 0));
      setNetAmount(Number(payload.data?.net_amount ?? 0));
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      handleServerErrors(requestError);
      setPlatformBalance(0);
      setProviderFee(0);
      setNetAmount(0);
    } finally {
      setBalanceLoading(false);
    }
  }, [handleServerErrors]);

  const fetchChart = useCallback(
    async (period: Period, signal?: AbortSignal) => {
      setChartLoading(true);
      try {
        const token = getAuthToken();
        if (!token) {
          setChartPoints([]);
          return;
        }

        const url = new URL('https://api.foresighta.co/api/admin/fund/platform/statistics');
        url.searchParams.set('per_time', period);

        const response = await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token),
        });
        if (!response.ok) throw await parseApiError(response);
        const payload = (await response.json()) as StatisticsResponse;
        setChartPoints(convertStatisticsToChartData(payload, period));
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        handleServerErrors(requestError);
        setChartPoints([]);
      } finally {
        setChartLoading(false);
      }
    },
    [handleServerErrors],
  );

  const refreshAll = (page: number) => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;

    void fetchTransactions(page, perPage, selectedPeriod, controller.signal);
    void fetchBalance(controller.signal);
    void fetchChart(selectedPeriod, controller.signal);
  };

  useEffect(() => {
    refreshAll(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod, perPage]);

  const filteredTransactions = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((tx) => {
      const combined = [
        tx.type,
        tx.type_key,
        getTransactionTypeLabel(tx.type),
        tx.transaction,
        tx.amount,
        tx.order?.order_no,
        tx.order?.invoice_no,
        tx.order?.uuid,
        tx.order?.service,
        tx.order?.user?.name,
        tx.order?.user?.email,
        tx.insighter?.name,
      ]
        .map((v) => String(v ?? ''))
        .join(' ')
        .toLowerCase();
      return combined.includes(q);
    });
  }, [searchInput, transactions]);

  const pages = useMemo(() => getPaginationWindow(meta.current_page, meta.last_page, 5), [meta.current_page, meta.last_page]);

  const onPageChange = (page: number) => {
    currentRequestAbort.current?.abort();
    const controller = new AbortController();
    currentRequestAbort.current = controller;
    void fetchTransactions(page, perPage, selectedPeriod, controller.signal);
  };

  const openDetails = (tx: TransactionRecord) => {
    setSelectedTransaction(tx);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedTransaction(null);
  };

  const totalIncome = chartPoints.reduce((sum, p) => sum + p.deposits, 0);
  const totalExpenditure = chartPoints.reduce((sum, p) => sum + p.withdrawals, 0);

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setSearchInput('');
    }
  };

  return (
    <div className="mt-4">
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <h2 className="text-md font-semibold text-slate-900">Transactions</h2>
            <p className="text-xs font-light text-slate-500 ps-1">Track platform funds and payouts.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['weekly', 'monthly', 'yearly'] as Period[]).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setSelectedPeriod(period)}
                className={[
                  'h-8 rounded-md border px-3 text-xs font-medium shadow-sm',
                  selectedPeriod === period ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                {toTitle(period)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="text-[11px] font-semibold text-slate-500">Platform Balance</div>
            <div className="mt-1 text-xl font-bold text-slate-900">{balanceLoading ? '…' : `$${platformBalance.toFixed(2)}`}</div>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="text-[11px] font-semibold text-slate-500">Provider Fee</div>
            <div className="mt-1 text-xl font-bold text-amber-600">{balanceLoading ? '…' : `$${providerFee.toFixed(2)}`}</div>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="text-[11px] font-semibold text-slate-500">Net Amount</div>
            <div className="mt-1 text-xl font-bold text-emerald-600">{balanceLoading ? '…' : `$${netAmount.toFixed(2)}`}</div>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold text-slate-900">Income vs Expenditure</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                Income: ${totalIncome.toLocaleString()}
              </span>
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700 ring-1 ring-red-200">
                Expenditure: ${totalExpenditure.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-3">
            {chartLoading ? <div className="text-xs text-slate-500">Loading chart…</div> : <MiniCurveChart points={chartPoints} />}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-slate-900">Transactions</h3>
            <p className="text-xs font-light text-slate-500 ps-1">total: {meta.total}</p>
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
                onKeyDown={onSearchKeyDown}
                placeholder="Search (current page)..."
                className={INPUT_WITH_ICON_CLASS}
              />
            </div>

            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className={INPUT_CLASS}>
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="min-w-[1100px] w-full border-collapse text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500">
              <tr>
                <th className="w-[190px] border-b border-slate-200 px-3 py-2 text-left">Service</th>
                <th className="w-[160px] border-b border-slate-200 px-3 py-2 text-left">Order</th>
                <th className="w-[180px] border-b border-slate-200 px-3 py-2 text-left">Date</th>
                <th className="w-[140px] border-b border-slate-200 px-3 py-2 text-left">Transaction</th>
                <th className="w-[200px] border-b border-slate-200 px-3 py-2 text-left">Order Service</th>
                <th className="w-[200px] border-b border-slate-200 px-3 py-2 text-left">Amount</th>
                <th className="w-[120px] border-b border-slate-200 px-3 py-2 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs text-slate-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs text-slate-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx, idx) => {
                  const fee = Number.parseFloat(normalizeText(tx.provider_fee) || '0');
                  const net = Number.parseFloat(normalizeText(tx.net_amount) || '0');
                  const serviceLabel = getTransactionTypeLabel(tx.type);
                  const typeKey = normalizeText(tx.type_key) || normalizeText(tx.type);
                  return (
                    <tr key={`${tx.date}-${idx}`} className="odd:bg-white even:bg-slate-50/50">
                      <td className="border-b border-slate-100 px-3 py-2">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{serviceLabel}</span>
                          <span className="mt-0.5 truncate font-mono text-[10px] text-slate-500">{typeKey || '-'}</span>
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        {tx.order?.order_no ? <span className="font-semibold text-blue-700">#{tx.order.order_no}</span> : <span className="text-slate-500">N/A</span>}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">{formatDate(tx.date)}</td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getTxBadgeClass(tx.transaction)}`}>
                          {toTitle(tx.transaction === 'deposit' ? 'Deposit' : 'Withdraw')}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                          {normalizeText(tx.order?.service) ? toTitle(tx.order?.service ?? '') : '-'}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getTxBadgeClass(tx.transaction)}`}>
                            {formatAmountBadge(tx.amount)}
                          </span>
                          {fee && !Number.isNaN(fee) ? (
                            <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200">
                              Fee: ${fee.toFixed(2)}
                            </span>
                          ) : null}
                          {net && !Number.isNaN(net) ? (
                            <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                              Net: ${Math.abs(net).toFixed(2)}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <div className="flex items-center justify-end">
                          <button type="button" onClick={() => openDetails(tx)} className={ROW_ACTION_BUTTON_CLASS}>
                            View
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

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500">
            Page {meta.current_page} of {meta.last_page}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, meta.current_page - 1))}
              disabled={meta.current_page <= 1}
              className={SECONDARY_BUTTON_CLASS}
            >
              Prev
            </button>

            <div className="flex items-center gap-1">
              {pages.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPageChange(p)}
                  className={[
                    'h-8 min-w-8 rounded-md border px-2 text-xs font-medium shadow-sm',
                    p === meta.current_page
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                  ].join(' ')}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onPageChange(Math.min(meta.last_page, meta.current_page + 1))}
              disabled={meta.current_page >= meta.last_page}
              className={SECONDARY_BUTTON_CLASS}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <TransactionDetailsModal isOpen={detailsOpen} transaction={selectedTransaction} onClose={closeDetails} />
    </div>
  );
}
