'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

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
  paid_status?: 'free' | 'partial_paid' | 'paid';
}

interface PopularKnowledgeResponse {
  data: PopularKnowledgeItem[];
}

const POPULAR_URL =
  'https://api.foresighta.co/api/platform/industries/knowledge/popular';

// Dedupe + cache per locale (prevents double GET in production if mounted twice)
const popularCache = new Map<string, PopularKnowledgeItem[]>();
const popularInFlight = new Map<string, Promise<PopularKnowledgeItem[]>>();

function normalizeLocale(locale: string | undefined): 'ar' | 'en' {
  return locale === 'ar' ? 'ar' : 'en';
}

async function fetchPopularKnowledge(locale: 'ar' | 'en') {
  const res = await fetch(POPULAR_URL, {
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const json: PopularKnowledgeResponse = await res.json();
  return json.data.slice(0, 5);
}

export function usePopularKnowledge() {
  const [data, setData] = useState<PopularKnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const locale = normalizeLocale(useLocale());

  useEffect(() => {
    let cancelled = false;

    // Serve from cache immediately when possible
    const cached = popularCache.get(locale);
    if (cached) {
      setData(cached);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const existing = popularInFlight.get(locale);
    const p = existing ?? fetchPopularKnowledge(locale);
    if (!existing) popularInFlight.set(locale, p);

    p.then((items) => {
      popularCache.set(locale, items);
      popularInFlight.delete(locale);
      if (!cancelled) {
        setData(items);
        setIsLoading(false);
      }
    }).catch((err) => {
      popularInFlight.delete(locale);
      if (!cancelled) {
        setError(err);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { data, isLoading, error };
}