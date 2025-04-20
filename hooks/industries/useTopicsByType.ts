'use client';
import { useState, useEffect } from 'react';
import { IndustryType } from './types';
import { useLocale } from 'next-intl';
interface Chapter {
  chapter: {
    title: string;
    page?: number;
  };
}

interface Document {
  id: number;
  file_name: string;
  file_size: number;
  file_extension: string;
  price: string;
  description: string;
  table_of_content: Chapter[];
}

interface Insighter {
  name: string;
  profile_photo_url: string | null;
  roles: string[];
}

interface Code {
  id: number;
  key: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
}

interface EconomicBloc {
  id: number;
  name: string;
}

interface Knowledge {
  slug: string;
  type: string;
  title: string;
  description: string;
  isic_code: Code | null;
  hs_code: Code | null;
  language: string;
  total_price: string;
  countries: Region[];
  regions: Region[];
  economic_blocs: EconomicBloc[];
  status: string;
  published_at: string;
  review: any[];
  insighter: Insighter;
  documents: Document[];
}

interface SubIndustry {
  id: number;
  name: string;
  slug: string;
  knowledge: Knowledge[];
}

interface TopicsByTypeResponse {
  data: SubIndustry;
}

interface UseTopicsByTypeProps {
  type: IndustryType;
  id: number;
  slug: string;
  topKnowledge?: number;
}

export function useTopicsByType({ type, id, slug, topKnowledge = 10 }: UseTopicsByTypeProps) {
  const [data, setData] = useState<TopicsByTypeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.foresighta.co/api/platform/industries/type/topics/${type}/${id}/${slug}`,
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": locale,
            },
            body: JSON.stringify({
              top_knowledge: topKnowledge,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [type, id, slug, topKnowledge]);

  return {
    subIndustry: data?.data,
    knowledge: data?.data.knowledge || [],
    isLoading,
    error
  };
}
