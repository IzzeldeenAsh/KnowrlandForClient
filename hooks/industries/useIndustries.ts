'use client';
import { useState, useEffect } from 'react';
import { Industry } from './types';
import { useLocale } from 'next-intl';

// Simple per-locale in-memory cache (client-side)
interface IndustriesCacheEntry {
  data: Industry[];
  lastFetchTime: number;
  isLoading: boolean;
  pendingPromise: Promise<Industry[]> | null;
}

const industriesCacheByLocale: Record<string, IndustriesCacheEntry> = {};
const INDUSTRIES_CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

async function fetchIndustriesFromAPI(locale: string): Promise<Industry[]> {
  const res = await fetch('https://api.foresighta.co/api/platform/industries/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    body: JSON.stringify({
      top_industry: 9,
      top_sub_industry: 6,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch industries');
  }

  const json = await res.json();
  return (json?.data ?? []) as Industry[];
}

async function getIndustriesWithCache(locale: string): Promise<Industry[]> {
  const now = Date.now();
  const entry = industriesCacheByLocale[locale];

  if (
    entry &&
    entry.data.length > 0 &&
    now - entry.lastFetchTime < INDUSTRIES_CACHE_DURATION_MS
  ) {
    return entry.data;
  }

  if (entry?.isLoading && entry.pendingPromise) {
    return entry.pendingPromise;
  }

  const newEntry: IndustriesCacheEntry = entry ?? {
    data: [],
    lastFetchTime: 0,
    isLoading: false,
    pendingPromise: null,
  };

  newEntry.isLoading = true;
  newEntry.pendingPromise = fetchIndustriesFromAPI(locale)
    .then((industries) => {
      newEntry.data = industries;
      newEntry.lastFetchTime = Date.now();
      return industries;
    })
    .finally(() => {
      newEntry.isLoading = false;
      newEntry.pendingPromise = null;
    });

  industriesCacheByLocale[locale] = newEntry;
  return newEntry.pendingPromise;
}

export function useIndustries() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      try {
        const data = await getIndustriesWithCache(locale);
        if (isMounted) setIndustries(data);
      } catch (error) {
        console.error('Error fetching industries:', error);
        if (isMounted) setIndustries([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  return { industries, isLoading };
}
