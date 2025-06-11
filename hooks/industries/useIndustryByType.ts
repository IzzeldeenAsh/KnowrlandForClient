'use client';
import { useState, useEffect } from 'react';
import { IndustryType } from './types';
import { useLocale } from 'next-intl';
interface Topic {
  id: number;
  name: string;
  slug: string;
}

interface SubIndustry {
  id: number;
  name: string;
  slug: string;
  topic: Topic[];
}

interface Industry {
  id: number;
  name: string;
  slug: string;
  children: SubIndustry[];
}

interface IndustryByTypeResponse {
  data: Industry;
}

interface UseIndustryByTypeProps {
  type: IndustryType;
  id: number;
  slug: string;
  topTopic?: number;
}

export function useIndustryByType({ type, id, slug, topTopic = 2 }: UseIndustryByTypeProps) {
  const [data, setData] = useState<IndustryByTypeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.knoldg.com/api/platform/industries/type/${type}/${id}/${slug}`,
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": locale,
            },
            body: JSON.stringify({
              top_topic: topTopic,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch industry');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustry();
  }, [type, id, slug, topTopic]);

  return {
    industry: data?.data,
    isLoading,
    error
  };
}
