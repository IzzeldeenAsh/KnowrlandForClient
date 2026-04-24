'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getApiUrl } from '@/app/config';
import { IndustryDetails } from './types';

interface UseIndustryDetailsProps {
  id: number;
  slug: string;
  topTopic?: number;
}

export function useIndustryDetails({ id, slug, topTopic = 2 }: UseIndustryDetailsProps) {
  const locale = useLocale();
  const [data, setData] = useState<IndustryDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(getApiUrl(`/api/platform/industries/${id}/${slug}`), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          body: JSON.stringify({ top_topic: topTopic }),
        });
        if (!res.ok) throw new Error('Failed to fetch industry details');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, slug, topTopic, locale]);

  return { industry: data, isLoading, error };
}
