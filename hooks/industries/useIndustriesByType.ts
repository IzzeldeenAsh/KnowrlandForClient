'use client';
import { useState, useEffect } from 'react';
import { Industry, IndustryType } from './types';
import { useLocale } from 'next-intl';

interface UseIndustriesByTypeProps {
  type: IndustryType;
  topSubIndustry?: number;
}

export function useIndustriesByType({ type, topSubIndustry = 2 }: UseIndustriesByTypeProps) {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchIndustriesByType = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch(`https://api.insightabusiness.com/api/platform/industries/type/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          body: JSON.stringify({
            top_sub_industry: topSubIndustry,
          }),
          cache: "force-cache",
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch industries for type: ${type}`);
        }

        const json = await res.json();
        
        setIndustries(json.data);
      } catch (error) {
        console.error('Error fetching industries by type:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        setIndustries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustriesByType();
  }, [type, topSubIndustry, locale]);

  return { industries, isLoading, error };
}
