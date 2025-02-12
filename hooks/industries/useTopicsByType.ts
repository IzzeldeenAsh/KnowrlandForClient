'use client';
import { useState, useEffect } from 'react';
import { IndustryType } from './types';

interface Knowledge {
  id: number;
  title: string;
  slug: string;
  type: string;
}

interface Topic {
  id: number;
  name: string;
  slug: string;
  knowledge: Knowledge[];
}

interface SubIndustry {
  id: number;
  name: string;
  slug: string;
  topic: Topic[];
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

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.foresighta.co/api/industries/type/sub/${type}/${id}/${slug}`,
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": "en",
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
    topics: data?.data.topic || [],
    isLoading,
    error
  };
}
