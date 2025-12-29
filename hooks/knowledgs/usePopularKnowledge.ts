'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export interface PopularKnowledgeItem {
  slug: string;
  type: string;
  title: string;
  description: string;
  total_price: string;
  published_at: string;
  insighter: {
    uuid: string;
    name: string;
    profile_photo_url: string | null;
    roles: string[];
    company?: {
      uuid: string;
      legal_name: string;
      logo?: string;
      verified?: boolean;
    };
  };
  is_owner: boolean;
  review_summary: {
    count: number;
    average: number;
  };
  language: 'arabic' | 'english';
}

interface PopularKnowledgeResponse {
  data: PopularKnowledgeItem[];
}

export function usePopularKnowledge() {
  const [data, setData] = useState<PopularKnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const params = useParams();
  const locale = params.locale as string || 'en';

  useEffect(() => {
    fetch(`https://api.foresighta.co/api/platform/industries/knowledge/popular`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json: PopularKnowledgeResponse) => {
        setData(json.data.slice(0, 5)); // Only take first 5 items
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [locale]);

  return { data, isLoading, error };
}