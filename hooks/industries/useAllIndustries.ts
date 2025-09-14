'use client';
import { useState, useEffect } from 'react';
import { Industry } from './types';
import { getApiUrl } from '@/app/config';

interface UseAllIndustriesOptions {
  locale?: string;
  topSubIndustry?: number;
}

export function useAllIndustries(options: UseAllIndustriesOptions = {}) {
  const { locale = 'en', topSubIndustry = 10 } = options;
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const apiUrl = getApiUrl('/api/platform/industries');
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          body: JSON.stringify({
            top_sub_industry: topSubIndustry
          }),
          cache: 'force-cache',
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch industries: ${res.status}`);
        }

        const json = await res.json();
        setIndustries(json.data || []);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch industries';
        console.error('Error fetching industries:', errorMessage);
        setError(errorMessage);
        setIndustries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, [locale, topSubIndustry]);

  return { industries, isLoading, error };
}