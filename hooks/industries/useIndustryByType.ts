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

// Cache structure for industry by type data
interface IndustryByTypeCache {
  [key: string]: {
    data: IndustryByTypeResponse | null;
    lastFetchTime: number;
    isLoading: boolean;
    error: string | null;
    pendingPromise: Promise<IndustryByTypeResponse> | null;
  };
}

// Global cache for industry by type to prevent duplicate API calls
const industryByTypeCache: IndustryByTypeCache = {};
const CACHE_DURATION = 300000; // 5 minutes cache

// Generate cache key for the request
function generateCacheKey(type: IndustryType, id: number, slug: string, topTopic: number, locale: string): string {
  return `${type}-${id}-${slug}-${topTopic}-${locale}`;
}

// Fetch industry by type from API
async function fetchIndustryByTypeFromAPI(
  type: IndustryType, 
  id: number, 
  slug: string, 
  topTopic: number, 
  locale: string
): Promise<IndustryByTypeResponse> {
  const response = await fetch(
    `https://api.foresighta.co/api/platform/industries/type/${type}/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({
        top_topic: topTopic,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch industry');
  }

  return await response.json();
}

// Cached fetch function with deduplication
async function fetchIndustryByType(
  type: IndustryType, 
  id: number, 
  slug: string, 
  topTopic: number, 
  locale: string,
  forceRefresh: boolean = false
): Promise<IndustryByTypeResponse> {
  const cacheKey = generateCacheKey(type, id, slug, topTopic, locale);
  const now = Date.now();

  // Initialize cache entry if it doesn't exist
  if (!industryByTypeCache[cacheKey]) {
    industryByTypeCache[cacheKey] = {
      data: null,
      lastFetchTime: 0,
      isLoading: false,
      error: null,
      pendingPromise: null
    };
  }

  const cacheEntry = industryByTypeCache[cacheKey];

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
  cacheEntry.pendingPromise = fetchIndustryByTypeFromAPI(type, id, slug, topTopic, locale);

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

export function useIndustryByType({ type, id, slug, topTopic = 2 }: UseIndustryByTypeProps) {
  const locale = useLocale();
  const cacheKey = generateCacheKey(type, id, slug, topTopic, locale);
  
  // Initialize state with cached data if available
  const cacheEntry = industryByTypeCache[cacheKey];
  const [data, setData] = useState<IndustryByTypeResponse | null>(cacheEntry?.data || null);
  const [isLoading, setIsLoading] = useState<boolean>(cacheEntry?.isLoading ?? true);
  const [error, setError] = useState<string | null>(cacheEntry?.error || null);

  useEffect(() => {
    const loadIndustry = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await fetchIndustryByType(type, id, slug, topTopic, locale);
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        
        // If we have cached data, keep it
        const cachedData = industryByTypeCache[cacheKey]?.data;
        if (cachedData) {
          setData(cachedData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadIndustry();
  }, [type, id, slug, topTopic, locale, cacheKey]);

     // Sync with cache updates from other components
   useEffect(() => {
     const checkCacheUpdates = () => {
       const cacheEntry = industryByTypeCache[cacheKey];
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
    industry: data?.data,
    isLoading,
    error,
    // Add refresh function for manual refresh
    refresh: () => fetchIndustryByType(type, id, slug, topTopic, locale, true)
  };
}
