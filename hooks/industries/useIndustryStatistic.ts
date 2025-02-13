'use client';
import { useState, useEffect } from 'react';
import { IndustryType } from './types';

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

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.foresighta.co/api/industries/statistic/industry/${industryId}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": "en",
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
