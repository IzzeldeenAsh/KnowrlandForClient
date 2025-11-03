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

// Cache structure for topics by type data
interface TopicsByTypeCache {
  [key: string]: {
    data: TopicsByTypeResponse | null;
    lastFetchTime: number;
    isLoading: boolean;
    error: string | null;
    pendingPromise: Promise<TopicsByTypeResponse> | null;
  };
}

// Global cache for topics by type to prevent duplicate API calls
const topicsByTypeCache: TopicsByTypeCache = {};
const CACHE_DURATION = 300000; // 5 minutes cache

// Generate cache key for the request
function generateCacheKey(type: IndustryType, id: number, slug: string, topKnowledge: number, locale: string): string {
  return `topics-${type}-${id}-${slug}-${topKnowledge}-${locale}`;
}

// Fetch topics by type from API
async function fetchTopicsByTypeFromAPI(
  type: IndustryType, 
  id: number, 
  slug: string, 
  topKnowledge: number, 
  locale: string
): Promise<TopicsByTypeResponse> {
  const response = await fetch(
    `https://api.insightabusiness.com/api/platform/industries/type/topics/${type}/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({
        top_knowledge: topKnowledge,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }

  return await response.json();
}

// Cached fetch function with deduplication
async function fetchTopicsByType(
  type: IndustryType, 
  id: number, 
  slug: string, 
  topKnowledge: number, 
  locale: string,
  forceRefresh: boolean = false
): Promise<TopicsByTypeResponse> {
  const cacheKey = generateCacheKey(type, id, slug, topKnowledge, locale);
  const now = Date.now();

  // Initialize cache entry if it doesn't exist
  if (!topicsByTypeCache[cacheKey]) {
    topicsByTypeCache[cacheKey] = {
      data: null,
      lastFetchTime: 0,
      isLoading: false,
      error: null,
      pendingPromise: null
    };
  }

  const cacheEntry = topicsByTypeCache[cacheKey];

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
  cacheEntry.pendingPromise = fetchTopicsByTypeFromAPI(type, id, slug, topKnowledge, locale);

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

export function useTopicsByType({ type, id, slug, topKnowledge = 10 }: UseTopicsByTypeProps) {
  const locale = useLocale();
  const cacheKey = generateCacheKey(type, id, slug, topKnowledge, locale);
  
  // Initialize state with cached data if available
  const cacheEntry = topicsByTypeCache[cacheKey];
  const [data, setData] = useState<TopicsByTypeResponse | null>(cacheEntry?.data || null);
  const [isLoading, setIsLoading] = useState<boolean>(cacheEntry?.isLoading ?? true);
  const [error, setError] = useState<string | null>(cacheEntry?.error || null);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await fetchTopicsByType(type, id, slug, topKnowledge, locale);
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        
        // If we have cached data, keep it
        const cachedData = topicsByTypeCache[cacheKey]?.data;
        if (cachedData) {
          setData(cachedData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, [type, id, slug, topKnowledge, locale, cacheKey]);

  // Sync with cache updates from other components
  useEffect(() => {
    const checkCacheUpdates = () => {
      const cacheEntry = topicsByTypeCache[cacheKey];
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
    knowledge: data?.data.knowledge || [],
    isLoading,
    error,
    // Add refresh function for manual refresh
    refresh: () => fetchTopicsByType(type, id, slug, topKnowledge, locale, true)
  };
}
