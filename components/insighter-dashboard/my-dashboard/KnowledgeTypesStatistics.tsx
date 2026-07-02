'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import DonutChart, { DonutLegend, type DonutSlice } from './DonutChart';
import {
  getKnowledgeTypeStatistics,
  type KnowledgeTypeStatistic,
} from '@/services/insighter-dashboard.api';

const TYPE_COLORS: Record<string, string> = {
  report: '#0095E8',
  statistic: '#0070C0',
  manual: '#104E8B',
  data: '#1E90FF',
  insight: '#0056B3',
  course: '#4682B4',
  media: '#000080',
  other: '#0047AB',
};

/**
 * Donut chart of the insighter's published knowledge by type.
 * Mirrors Angular knowledge-types-statistics.component.
 */
export default function KnowledgeTypesStatistics({
  onHasStatistics,
}: {
  onHasStatistics?: (has: boolean) => void;
}) {
  const t = useTranslations('InsighterDashboard.myDashboard.knowledgeTypes');
  const locale = useLocale();
  const [statistics, setStatistics] = useState<KnowledgeTypeStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    getKnowledgeTypeStatistics(locale)
      .then((stats) => {
        setStatistics(stats);
        onHasStatistics?.(stats.length > 0);
      })
      .catch(() => {
        setError(true);
        onHasStatistics?.(false);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">{t('loadError')}</p>
        <button
          type="button"
          onClick={load}
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  if (statistics.length === 0) return null;

  const slices: DonutSlice[] = statistics.map((stat) => ({
    label: t.has(stat.type) ? t(stat.type) : stat.type,
    value: stat.count,
    color: TYPE_COLORS[stat.type] ?? '#A1A5B7',
  }));
  const total = statistics.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-800">{t('title')}</h3>
        <p className="text-sm text-gray-500">{t('subtitle')}</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <DonutChart slices={slices} centerValue={total} centerLabel={t('total')} />
        <DonutLegend slices={slices} />
      </div>
    </div>
  );
}
