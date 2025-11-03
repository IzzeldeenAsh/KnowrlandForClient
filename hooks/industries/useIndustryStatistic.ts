'use client';
import { useState, useEffect } from 'react';
import { IndustryType } from './types';
import { useLocale } from 'next-intl';
interface StatisticItem {
  type: IndustryType;
  count: number;
}

interface IndustryStatistic {
  data: StatisticItem[];
}

export function useIndustryStatistic(industryId: number) {
  const [statistics, setStatistics] = useState<StatisticItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.insightabusiness.com/api/platform/industries/statistic/industry/${industryId}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch industry statistics');
        }

        const data: IndustryStatistic = await response.json();
        setStatistics(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (industryId) {
      fetchStatistics();
    }
  }, [industryId]);

  return {
    statistics,
    isLoading,
    error
  };
}
