'use client';
import { useState, useEffect } from 'react';
import { KnowledgeDetails } from '@/app/knowledge/[type]/[slug]/types';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface KnowledgeResponse {
  data: KnowledgeDetails[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: Meta;
}

interface UseKnowledgeProps {
  taxonomy: 'industry' | 'sub_industry' | 'topic';
  id: number;
  knowledgeType: string;
  page: number;
}

export function useKnowledge({ taxonomy, id, knowledgeType, page }: UseKnowledgeProps) {
  const [response, setResponse] = useState<KnowledgeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('type', knowledgeType);
    // the API expects the taxonomy key to be named according to its type
    params.append(taxonomy, id.toString());
    params.append('page', page.toString());

    fetch(`https://api.foresighta.co/api/industries/type/knowledge?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        setResponse(json);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [taxonomy, id, knowledgeType, page]);

  return { response, isLoading, error };
}
