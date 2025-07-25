'use client';
import { useState, useEffect } from 'react';
import { Industry } from './types';
import { useLocale } from 'next-intl';
export function useIndustries() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch("https://api.foresighta.co/api/platform/industries/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          body: JSON.stringify({
            top_industry: 9,
            top_sub_industry: 6,
          }),
          cache: "force-cache",
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch industries');
        }

        const json = await res.json();
        setIndustries(json.data);
      } catch (error) {
        console.error('Error fetching industries:', error);
        setIndustries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  return { industries, isLoading };
}
