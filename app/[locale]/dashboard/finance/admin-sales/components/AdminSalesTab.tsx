'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { useLocale } from 'next-intl';
import { getAuthToken } from '@/lib/authToken';
import { useToast } from '@/components/toast/ToastContext';
import { buildAuthHeaders, parseApiError } from '../../../_config/api';
import styles from './AdminSalesTab.module.css';

type PeriodType = 'weekly' | 'monthly' | 'yearly';

type OrderStatistics = {
  orders_total: number;
  orders_amount: number;
  platform_orders_amount?: number;
};

type PeriodStatisticsData = {
  order_statistics: Record<string, OrderStatistics>;
  knowledge_order_statistics: Record<string, OrderStatistics>;
  meeting_booking_order_statistics: Record<string, OrderStatistics>;
};

type TotalStatisticsData = {
  order_statistics: OrderStatistics;
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function getText(locale: string, key: string): string {
  const translations: Record<string, { en: string; ar: string }> = {
    TOTAL_ORDERS: { en: 'Total Orders', ar: 'إجمالي الطلبات' },
    ORDERS_REVENUE: { en: 'Orders Revenue', ar: 'إيرادات الطلبات' },
    PLATFORM_REVENUE: { en: 'Platform Revenue', ar: 'إيرادات المنصة' },
    REVENUE_CHART: { en: 'Revenue Chart', ar: 'مخطط الإيرادات' },
    EXPORT_TO_EXCEL: { en: 'Export to Excel', ar: 'تصدير إلى Excel' },
    LOADING: { en: 'Loading...', ar: 'جاري التحميل...' },
    ADMIN_SALES_DASHBOARD: { en: 'Insighta Sales Dashboard', ar: 'لوحة مبيعات الإدارة' },
    WEEKLY: { en: 'Weekly', ar: 'أسبوعي' },
    MONTHLY: { en: 'Monthly', ar: 'شهري' },
    YEARLY: { en: 'Yearly', ar: 'سنوي' },
    KNOWLEDGE: { en: 'Knowledge', ar: 'المعرفة' },
    MEETINGS: { en: 'Sessions', ar: 'الجلسات الاستشارية' },
    WARNING: { en: 'Warning', ar: 'تحذير' },
    NO_EXPORT: { en: 'No data available to export', ar: 'لا توجد بيانات للتصدير' },
    EXPORT_SUCCESS: { en: 'Export Successful', ar: 'نجح التصدير' },
    EXPORT_ERROR: { en: 'Export Error', ar: 'خطأ في التصدير' },
    EXPORT_ERROR_MESSAGE: { en: 'An error occurred while exporting the report', ar: 'حدث خطأ أثناء تصدير التقرير' },
  };

  const entry = translations[key];
  if (!entry) return key;
  return locale === 'ar' ? entry.ar : entry.en;
}

const EN_WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const EN_MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function parseDateLike(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function extractYear(value: string): string | null {
  const match = value.match(/(19|20)\d{2}/);
  return match ? match[0] : null;
}

function formatXAxisLabel(
  rawLabel: string,
  period: PeriodType,
  index: number,
  locale: string,
): string {
  const trimmed = rawLabel.trim();
  const date = parseDateLike(trimmed);

  if (period === 'weekly') {
    if (/^(mon|tue|wed|thu|fri|sat|sun)$/i.test(trimmed)) {
      return trimmed.slice(0, 1).toUpperCase() + trimmed.slice(1, 3).toLowerCase();
    }
    if (date) {
      return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short' }).format(date);
    }
    return EN_WEEKDAYS_SHORT[index % 7];
  }

  if (period === 'monthly') {
    if (/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/i.test(trimmed)) {
      return trimmed.slice(0, 1).toUpperCase() + trimmed.slice(1, 3).toLowerCase();
    }
    const monthAsNumber = Number(trimmed);
    if (Number.isFinite(monthAsNumber) && monthAsNumber >= 1 && monthAsNumber <= 12) {
      return EN_MONTHS_SHORT[monthAsNumber - 1];
    }
    if (date) {
      return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short' }).format(date);
    }
    return EN_MONTHS_SHORT[index % 12];
  }

  // yearly
  if (/^(19|20)\d{2}$/.test(trimmed)) return trimmed;
  const yearFromText = extractYear(trimmed);
  if (yearFromText) return yearFromText;
  if (date) return String(date.getFullYear());
  return trimmed;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildSpreadsheetMlWorkbook(
  sheets: Array<{ name: string; rows: Array<Array<string | number>> }>,
): string {
  const safeSheets = sheets.map((sheet, index) => {
    const rawName = sheet.name?.trim() || `Sheet${index + 1}`;
    const name = rawName.slice(0, 31);
    return { name, rows: sheet.rows };
  });

  const renderCell = (value: string | number) => {
    const numeric = typeof value === 'number' && Number.isFinite(value);
    const cellType = numeric ? 'Number' : 'String';
    const text = numeric ? String(value) : escapeXml(String(value ?? ''));
    return `<Cell><Data ss:Type="${cellType}">${text}</Data></Cell>`;
  };

  const renderRow = (row: Array<string | number>) => `<Row>${row.map(renderCell).join('')}</Row>`;

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
${safeSheets
  .map(
    (sheet) => `<Worksheet ss:Name="${escapeXml(sheet.name)}"><Table>${sheet.rows
      .map(renderRow)
      .join('')}</Table></Worksheet>`,
  )
  .join('')}
</Workbook>`;
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

function RevenueChart({
  labels,
  knowledgeData,
  meetingData,
  locale,
  period,
}: {
  labels: string[];
  knowledgeData: number[];
  meetingData: number[];
  locale: string;
  period: PeriodType;
}) {
  const { ref: containerRef, size } = useElementSize<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = Math.max(1, Math.round(size.width));
  const height = Math.max(1, Math.round(size.height));

  const padding = useMemo(
    () => ({
      top: 14,
      bottom: 24,
      left: 48,
      right: 14,
    }),
    [],
  );

  const xLabels = useMemo(
    () => labels.map((label, index) => formatXAxisLabel(label, period, index, locale)),
    [labels, locale, period],
  );

  const maxValue = useMemo(() => {
    const all = [...knowledgeData, ...meetingData];
    const max = all.reduce((acc, v) => (Number.isFinite(v) ? Math.max(acc, v) : acc), 0);
    return max <= 0 ? 1 : max;
  }, [knowledgeData, meetingData]);

  const plotW = Math.max(1, width - padding.left - padding.right);
  const plotH = Math.max(1, height - padding.top - padding.bottom);
  const stepX = labels.length > 1 ? plotW / (labels.length - 1) : 0;

  const xForIndex = useCallback(
    (index: number) => padding.left + stepX * index,
    [padding.left, stepX],
  );

  const yForValue = useCallback(
    (value: number) => {
      const v = Number.isFinite(value) ? value : 0;
      const t = v / maxValue;
      return padding.top + plotH * (1 - clampNumber(t, 0, 1));
    },
    [maxValue, padding.top, plotH],
  );

  const buildLinePath = useCallback(
    (values: number[]) => {
      if (!values.length) return '';
      if (values.length === 1) {
        return `M ${xForIndex(0).toFixed(2)} ${yForValue(values[0]).toFixed(2)}`;
      }

      const points = values.map((value, index) => ({
        x: xForIndex(index),
        y: yForValue(value),
      }));

      const tension = 0.4;
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
    },
    [xForIndex, yForValue],
  );

  const buildAreaPath = useCallback(
    (values: number[]) => {
      if (!values.length) return '';
      const line = buildLinePath(values);
      const lastX = xForIndex(values.length - 1);
      const firstX = xForIndex(0);
      const bottomY = padding.top + plotH;
      return `${line} L ${lastX.toFixed(2)} ${bottomY.toFixed(2)} L ${firstX.toFixed(2)} ${bottomY.toFixed(2)} Z`;
    },
    [buildLinePath, padding.top, plotH, xForIndex],
  );

  const knowledgeLine = useMemo(() => buildLinePath(knowledgeData), [buildLinePath, knowledgeData]);
  const knowledgeArea = useMemo(() => buildAreaPath(knowledgeData), [buildAreaPath, knowledgeData]);
  const meetingLine = useMemo(() => buildLinePath(meetingData), [buildLinePath, meetingData]);
  const meetingArea = useMemo(() => buildAreaPath(meetingData), [buildAreaPath, meetingData]);

  const onPointerMove = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (labels.length === 0) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const relative = x - padding.left;
      const rawIndex = stepX > 0 ? Math.round(relative / stepX) : 0;
      setHoverIndex(clampNumber(rawIndex, 0, labels.length - 1));
    },
    [labels.length, padding.left, stepX],
  );

  const onPointerLeave = useCallback(() => setHoverIndex(null), []);

  const tooltip = useMemo(() => {
    if (hoverIndex === null) return null;
    const label = labels[hoverIndex] ?? '';
    const knowledge = knowledgeData[hoverIndex] ?? 0;
    const meetings = meetingData[hoverIndex] ?? 0;
    const left = xForIndex(hoverIndex);
    return { label, knowledge, meetings, left };
  }, [hoverIndex, knowledgeData, labels, meetingData, xForIndex]);

  const yTicks = useMemo(() => {
    const steps = 4;
    const ticks = Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      const value = maxValue * (1 - t);
      const y = padding.top + plotH * t;
      return { value, y };
    });
    return ticks;
  }, [maxValue, padding.top, plotH]);

  const xTickIndexes = useMemo(() => {
    const count = xLabels.length;
    if (count === 0) return [];
    if (period === 'weekly') return [...Array(count)].map((_, i) => i);
    if (period === 'monthly') {
      if (count <= 12) return [...Array(count)].map((_, i) => i);
    }
    if (period === 'yearly') return [...Array(count)].map((_, i) => i);

    const maxTicks = 8;
    if (count <= maxTicks) return [...Array(count)].map((_, i) => i);
    const step = Math.ceil(count / maxTicks);
    const indexes: number[] = [];
    for (let i = 0; i < count; i += step) indexes.push(i);
    if (indexes[indexes.length - 1] !== count - 1) indexes.push(count - 1);
    return indexes;
  }, [period, xLabels.length]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <div className="relative h-full w-full">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          style={{ touchAction: 'none' }}
          role="img"
          aria-label={getText(locale, 'REVENUE_CHART')}
        >
          <defs>
            <linearGradient id="knowledgeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(55, 153, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(55, 153, 255, 0)" />
            </linearGradient>
            <linearGradient id="meetingFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(80, 200, 120, 0.2)" />
              <stop offset="100%" stopColor="rgba(80, 200, 120, 0)" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => (
            <g key={tick.y}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={tick.y}
                y2={tick.y}
                stroke="#f3f4f6"
                strokeWidth={1}
              />
              <text
                x={padding.left - 10}
                y={tick.y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#6b7280"
              >
                {`$${Math.round(tick.value).toLocaleString('en-US')}`}
              </text>
            </g>
          ))}

          {xTickIndexes.map((index) => {
            const x = xForIndex(index);
            return (
              <text
                key={index}
                x={x}
                y={padding.top + plotH + 18}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
              >
                {xLabels[index] ?? ''}
              </text>
            );
          })}

          {knowledgeArea ? <path d={knowledgeArea} fill="url(#knowledgeFill)" /> : null}
          {meetingArea ? <path d={meetingArea} fill="url(#meetingFill)" /> : null}

          {knowledgeLine ? <path d={knowledgeLine} fill="none" stroke="#3799FF" strokeWidth={2} /> : null}
          {meetingLine ? <path d={meetingLine} fill="none" stroke="#50C878" strokeWidth={2} /> : null}

          {tooltip ? (
            <line
              x1={tooltip.left}
              x2={tooltip.left}
              y1={padding.top}
              y2={padding.top + plotH}
              stroke="#6b7280"
              strokeWidth={2}
              opacity={0.7}
            />
          ) : null}

          {tooltip
            ? [
                { color: '#3799FF', value: tooltip.knowledge },
                { color: '#50C878', value: tooltip.meetings },
              ].map((series, idx) => (
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
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: '#3799FF' }} />
                  <span className="font-medium">{getText(locale, 'KNOWLEDGE')}</span>
                </div>
                <span className="font-semibold">{formatCurrency(tooltip.knowledge)}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: '#50C878' }} />
                  <span className="font-medium">{getText(locale, 'MEETINGS')}</span>
                </div>
                <span className="font-semibold">{formatCurrency(tooltip.meetings)}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function AdminSalesTab() {
  const locale = useLocale();
  const { handleServerErrors, success, warning, error } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [isLoading, setIsLoading] = useState(false);
  const [totalStatistics, setTotalStatistics] = useState<TotalStatisticsData | null>(null);
  const [periodStatistics, setPeriodStatistics] = useState<PeriodStatisticsData | null>(null);

  const periodOptions = useMemo(
    () => [
      { label: getText(locale, 'WEEKLY'), value: 'weekly' as const },
      { label: getText(locale, 'MONTHLY'), value: 'monthly' as const },
      { label: getText(locale, 'YEARLY'), value: 'yearly' as const },
    ],
    [locale],
  );

  const fetchTotalStatistics = useCallback(
    async (signal?: AbortSignal) => {
      const token = getAuthToken();
      if (!token) {
        setTotalStatistics(null);
        warning(locale === 'ar' ? 'الرجاء تسجيل الدخول مرة أخرى' : 'Please sign in again.', getText(locale, 'WARNING'));
        return;
      }

      const response = await fetch('https://api.foresighta.co/api/admin/dashboard/sales/revenue/statistics', {
        method: 'GET',
        cache: 'no-store',
        signal,
        headers: buildAuthHeaders(token, locale),
      });

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = (await response.json()) as { data?: TotalStatisticsData };
      setTotalStatistics(payload?.data ?? null);
    },
    [locale, warning],
  );

  const fetchPeriodStatistics = useCallback(
    async (period: PeriodType, signal?: AbortSignal) => {
      const token = getAuthToken();
      if (!token) {
        setPeriodStatistics(null);
        warning(locale === 'ar' ? 'الرجاء تسجيل الدخول مرة أخرى' : 'Please sign in again.', getText(locale, 'WARNING'));
        return;
      }

      const response = await fetch(
        `https://api.foresighta.co/api/admin/dashboard/sales/revenue/period/statistics?per_time=${period}`,
        {
          method: 'GET',
          cache: 'no-store',
          signal,
          headers: buildAuthHeaders(token, locale),
        },
      );

      if (!response.ok) {
        throw await parseApiError(response);
      }

      const payload = (await response.json()) as { data?: PeriodStatisticsData };
      setPeriodStatistics(payload?.data ?? null);
    },
    [locale, warning],
  );

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    Promise.all([fetchTotalStatistics(controller.signal), fetchPeriodStatistics(selectedPeriod, controller.signal)])
      .catch((requestError) => {
        handleServerErrors(requestError);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPeriodChange = useCallback(
    async (period: PeriodType) => {
      setSelectedPeriod(period);
      setIsLoading(true);
      const controller = new AbortController();
      try {
        await fetchPeriodStatistics(period, controller.signal);
      } catch (requestError) {
        handleServerErrors(requestError);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPeriodStatistics, handleServerErrors],
  );

  const exportToExcel = useCallback(async () => {
    if (!periodStatistics) {
      warning(getText(locale, 'NO_EXPORT'), getText(locale, 'WARNING'));
      return;
    }

    try {
      const periodLabels = Object.keys(periodStatistics.order_statistics ?? {});
      const periodText = selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1);
      const dateString = new Date().toISOString().split('T')[0];

      const headers = [
        locale === 'ar' ? 'الفترة' : 'Period',
        getText(locale, 'TOTAL_ORDERS'),
        getText(locale, 'ORDERS_REVENUE'),
        getText(locale, 'PLATFORM_REVENUE'),
      ];

      const overallRows: Array<Array<string | number>> = [
        headers,
        ...periodLabels.map((period) => [
          period,
          periodStatistics.order_statistics[period]?.orders_total ?? 0,
          periodStatistics.order_statistics[period]?.orders_amount ?? 0,
          periodStatistics.order_statistics[period]?.platform_orders_amount ?? 0,
        ]),
      ];

      const knowledgeRows: Array<Array<string | number>> = [
        headers,
        ...periodLabels.map((period) => [
          period,
          periodStatistics.knowledge_order_statistics[period]?.orders_total ?? 0,
          periodStatistics.knowledge_order_statistics[period]?.orders_amount ?? 0,
          periodStatistics.knowledge_order_statistics[period]?.platform_orders_amount ?? 0,
        ]),
      ];

      const meetingRows: Array<Array<string | number>> = [
        headers,
        ...periodLabels.map((period) => [
          period,
          periodStatistics.meeting_booking_order_statistics[period]?.orders_total ?? 0,
          periodStatistics.meeting_booking_order_statistics[period]?.orders_amount ?? 0,
          periodStatistics.meeting_booking_order_statistics[period]?.platform_orders_amount ?? 0,
        ]),
      ];

      const workbookXml = buildSpreadsheetMlWorkbook([
        { name: locale === 'ar' ? 'إحصائيات_الطلبات' : 'Order_Statistics', rows: overallRows },
        { name: locale === 'ar' ? 'طلبات_المعرفة' : 'Knowledge_Orders', rows: knowledgeRows },
        { name: locale === 'ar' ? 'طلبات_الاجتماعات' : 'Meeting_Orders', rows: meetingRows },
      ]);

      const fileName = `${locale === 'ar' ? 'تقرير_مبيعات_الإدارة' : 'admin_sales_report'}_${periodText}_${dateString}.xml`;
      const blob = new Blob([workbookXml], { type: 'application/vnd.ms-excel;charset=utf-8' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      success(locale === 'ar' ? 'تم تصدير التقرير بنجاح' : 'Report exported successfully', getText(locale, 'EXPORT_SUCCESS'));
    } catch (exportError) {
      // eslint-disable-next-line no-console
      console.error('Error exporting to Excel:', exportError);
      error(getText(locale, 'EXPORT_ERROR_MESSAGE'), getText(locale, 'EXPORT_ERROR'));
    }
  }, [error, locale, periodStatistics, selectedPeriod, success, warning]);

  const chartModel = useMemo(() => {
    if (!periodStatistics) return null;
    const labels = Object.keys(periodStatistics.order_statistics ?? {});
    const knowledgeData = labels.map((label) => periodStatistics.knowledge_order_statistics?.[label]?.orders_amount ?? 0);
    const meetingData = labels.map((label) => periodStatistics.meeting_booking_order_statistics?.[label]?.orders_amount ?? 0);
    return { labels, knowledgeData, meetingData };
  }, [periodStatistics]);

  return (
    <div className="flex flex-col overflow-hidden p-6">
      <div className="mb-5">
        <h1 className={`${styles.pageHeading} text-[20px] font-bold`}>{getText(locale, 'ADMIN_SALES_DASHBOARD')}</h1>
      </div>

      {totalStatistics ? (
        <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className={styles.statsCard}>
            <div className="p-6">
              <div className={`${styles.statsLabel} mb-3 text-sm`}>{getText(locale, 'TOTAL_ORDERS')}</div>
              <div className={`${styles.statsValue} text-4xl`}>{formatNumber(totalStatistics.order_statistics.orders_total ?? 0)}</div>
            </div>
          </div>

          <div className={styles.statsCard}>
            <div className="p-6">
              <div className={`${styles.statsLabel} mb-3 text-sm`}>{getText(locale, 'ORDERS_REVENUE')}</div>
              <div className={`${styles.statsValue} text-4xl`}>{formatCurrency(totalStatistics.order_statistics.orders_amount ?? 0)}</div>
            </div>
          </div>

          <div className={styles.statsCard}>
            <div className="p-6">
              <div className={`${styles.statsLabel} mb-3 text-sm`}>{getText(locale, 'PLATFORM_REVENUE')}</div>
              <div className={`${styles.statsValue} text-4xl`}>{formatCurrency(totalStatistics.order_statistics.platform_orders_amount ?? 0)}</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className={`${styles.salesCard} mb-5`}>
        <div className="border-b border-transparent p-6 pb-4">
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-start text-[18px] font-bold text-slate-900">{getText(locale, 'REVENUE_CHART')}</div>

            <button
              type="button"
              className="inline-flex h-8 items-center justify-center rounded-md bg-white px-3 text-xs font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ border: '1px solid #2CCC63' }}
              onClick={() => void exportToExcel()}
              disabled={isLoading || !periodStatistics}
            >
              {getText(locale, 'EXPORT_TO_EXCEL')}
            </button>
          </div>

          <div className="flex w-full justify-end pt-4">
            <div className={styles.tabNav}>
              {periodOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={isLoading}
                  className={`${styles.tabButton} ${selectedPeriod === option.value ? styles.tabButtonActive : ''}`}
                  onClick={() => void onPeriodChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 pt-2">
          <div className={`${styles.chartContainer} relative`}>
            {chartModel ? (
              <RevenueChart
                labels={chartModel.labels}
                knowledgeData={chartModel.knowledgeData}
                meetingData={chartModel.meetingData}
                locale={locale}
                period={selectedPeriod}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs font-medium text-slate-500">
                {locale === 'ar' ? 'لا توجد بيانات' : 'No data yet.'}
              </div>
            )}
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />
                <span className="sr-only">{getText(locale, 'LOADING')}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
