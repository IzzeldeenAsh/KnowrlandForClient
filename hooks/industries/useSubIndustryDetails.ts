'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getApiUrl } from '@/app/config';
import { SubIndustryDetails } from './types';

interface UseSubIndustryDetailsProps {
  id: string;
  slug: string;
  topKnowledge?: number;
}

export function useSubIndustryDetails({ id, slug, topKnowledge = 10 }: UseSubIndustryDetailsProps) {
  const locale = useLocale();
  const [data, setData] = useState<SubIndustryDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(getApiUrl(`/api/platform/industries/sub/${id}/${slug}`), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          body: JSON.stringify({ top_knowledge: topKnowledge }),
        });
        if (!res.ok) throw new Error('Failed to fetch sub-industry details');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, slug, topKnowledge, locale]);

  return { subIndustry: data, isLoading, error };
}
