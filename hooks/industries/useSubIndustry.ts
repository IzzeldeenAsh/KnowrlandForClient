'use client';
import { useState, useEffect } from 'react';
import { Industry, IndustryType } from './types';
import { useLocale } from 'next-intl';

interface UseSubIndustryProps {
  type: IndustryType;
  id: number;
  slug: string;
  topTopic?: number;
}

interface SubIndustryResponse {
  data: Industry;
}

// Cache structure for sub-industry data
interface SubIndustryCache {
  [key: string]: {
    data: SubIndustryResponse | null;
    lastFetchTime: number;
    isLoading: boolean;
    error: string | null;
    pendingPromise: Promise<SubIndustryResponse> | null;
  };
}

// Global cache for sub-industry to prevent duplicate API calls
const subIndustryCache: SubIndustryCache = {};
const CACHE_DURATION = 300000; // 5 minutes cache

// Generate cache key for the request
function generateCacheKey(type: IndustryType, id: number, slug: string, topTopic: number, locale: string): string {
  return `sub-${type}-${id}-${slug}-${topTopic}-${locale}`;
}

// Fetch sub-industry from API
async function fetchSubIndustryFromAPI(
  type: IndustryType, 
  id: number, 
  slug: string, 
  topTopic: number, 
  locale: string
): Promise<SubIndustryResponse> {
  const response = await fetch(
    `https://api.foresighta.co/api/platform/industries/type/sub/${type}/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({
        top_topic: topTopic,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch sub-industry');
  }

  return await response.json();
}

// Cached fetch function with deduplication
async function fetchSubIndustry(
  type: IndustryType, 
  id: number, 
  slug: string, 
  topTopic: number, 
  locale: string,
  forceRefresh: boolean = false
): Promise<SubIndustryResponse> {
  const cacheKey = generateCacheKey(type, id, slug, topTopic, locale);
  const now = Date.now();

  // Initialize cache entry if it doesn't exist
  if (!subIndustryCache[cacheKey]) {
    subIndustryCache[cacheKey] = {
      data: null,
      lastFetchTime: 0,
      isLoading: false,
      error: null,
      pendingPromise: null
    };
  }

  const cacheEntry = subIndustryCache[cacheKey];

  // Return cached data if still valid and not forced refresh
  if (!forceRefresh && cacheEntry.data && (now - cacheEntry.lastFetchTime) < CACHE_DURATION) {
    return cacheEntry.data;
  }

  // If already fetching, return the pending promise
  if (cacheEntry.isLoading && cacheEntry.pendingPromise) {
    return cacheEntry.pendingPromise;
  }

  // Start new fetch
  cacheEntry.isLoading = true;
  cacheEntry.error = null;
  cacheEntry.pendingPromise = fetchSubIndustryFromAPI(type, id, slug, topTopic, locale);

  try {
    const result = await cacheEntry.pendingPromise;
    
    // Update cache
    cacheEntry.data = result;
    cacheEntry.lastFetchTime = now;
    cacheEntry.error = null;
    
    return result;
  } catch (error) {
    cacheEntry.error = error instanceof Error ? error.message : 'An error occurred';
    
    // Return cached data if available on error
    if (cacheEntry.data) {
      console.warn('API error, returning cached data:', error);
      return cacheEntry.data;
    }
    
    throw error;
  } finally {
    cacheEntry.isLoading = false;
    cacheEntry.pendingPromise = null;
  }
}

export function useSubIndustry({ type, id, slug, topTopic = 2 }: UseSubIndustryProps) {
  const locale = useLocale();
  const cacheKey = generateCacheKey(type, id, slug, topTopic, locale);
  
  // Initialize state with cached data if available
  const cacheEntry = subIndustryCache[cacheKey];
  const [data, setData] = useState<SubIndustryResponse | null>(cacheEntry?.data || null);
  const [isLoading, setIsLoading] = useState<boolean>(cacheEntry?.isLoading ?? true);
  const [error, setError] = useState<string | null>(cacheEntry?.error || null);

  useEffect(() => {
    const loadSubIndustry = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await fetchSubIndustry(type, id, slug, topTopic, locale);
        setData(result);
        console.log("Sub-Industry", result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        
        // If we have cached data, keep it
        const cachedData = subIndustryCache[cacheKey]?.data;
        if (cachedData) {
          setData(cachedData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSubIndustry();
  }, [type, id, slug, topTopic, locale, cacheKey]);

  // Sync with cache updates from other components
  useEffect(() => {
    const checkCacheUpdates = () => {
      const cacheEntry = subIndustryCache[cacheKey];
      if (cacheEntry) {
        if (cacheEntry.data !== data) {
          setData(cacheEntry.data);
        }
        if (cacheEntry.error !== error) {
          setError(cacheEntry.error);
        }
      }
    };

    const interval = setInterval(checkCacheUpdates, 1000);
    return () => clearInterval(interval);
  }, [cacheKey, data, error]);

  return {
    subIndustry: data?.data,
    isLoading,
    error,
    // Add refresh function for manual refresh
    refresh: () => fetchSubIndustry(type, id, slug, topTopic, locale, true)
  };
}
