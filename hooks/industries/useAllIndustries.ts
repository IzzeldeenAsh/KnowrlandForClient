'use client';
import { useState, useEffect } from 'react';
import { Industry } from './types';

export function useAllIndustries() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch('https://api.foresighta.co/api/platform/industries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': 'en',
          },
          body: JSON.stringify({
            top_sub_industry: 10
          }),
          cache: 'force-cache',
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
