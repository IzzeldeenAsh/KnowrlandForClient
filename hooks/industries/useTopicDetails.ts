'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getApiUrl } from '@/app/config';
import { TopicDetails } from './types';

interface UseTopicDetailsProps {
  id: string;
  slug: string;
}

export function useTopicDetails({ id, slug }: UseTopicDetailsProps) {
  const locale = useLocale();
  const [data, setData] = useState<TopicDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(getApiUrl(`/api/platform/industries/topics/${id}/${slug}`), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch topic details');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, slug, locale]);

  return { topic: data, isLoading, error };
}
