'use client';
import { useState, useEffect } from 'react';
import { IndustryType } from './types';

interface StatisticItem {
  type: IndustryType;
  count: number;
}

interface TopicStatistic {  data: StatisticItem[];
}

export function useTopicStatistic(topicId: number) {
  const [statistics, setStatistics] = useState<StatisticItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.knoldg.com/api/industries/statistic/topic/${topicId}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": "en",
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch topic statistics');
        }

        const data: TopicStatistic = await response.json();
        setStatistics(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (topicId) {
      fetchStatistics();
    }
  }, [topicId]);

  return {
    statistics,
    isLoading,
    error
  };
}
