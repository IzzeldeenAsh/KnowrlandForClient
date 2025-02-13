'use client';
import { useState, useEffect } from 'react';
import { Industry, IndustryType } from './types';

interface UseSubIndustryProps {
  type: IndustryType;
  id: number;
  slug: string;
  topTopic?: number;
}

interface SubIndustryResponse {
  data: Industry;
}

export function useSubIndustry({ type, id, slug, topTopic = 2 }: UseSubIndustryProps) {
  const [data, setData] = useState<SubIndustryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubIndustry = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.foresighta.co/api/industries/type/sub/${type}/${id}/${slug}`,
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": "en",
            },
            body: JSON.stringify({
              top_topic: topTopic,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch sub-industry');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubIndustry();
  }, [type, id, slug, topTopic]);

  return {
    subIndustry: data?.data,
    isLoading,
    error
  };
}
