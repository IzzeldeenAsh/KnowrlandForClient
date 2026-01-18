'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getApiUrl } from '@/app/config';
import { getAuthToken } from '@/lib/authToken';

export interface Country {
  id: number;
  region_id: number;
  iso2: string;
  iso3: string;
  international_code: string;
  flag: string;
  name: string;
  names: {
    en: string;
    ar: string;
  };
  nationality: string;
  nationalities: {
    en: string;
    ar: string;
  };
  status: string;
}

export interface CountriesResponse {
  data: Country[];
}

let countriesCache: {
  countries: Country[];
  lastFetchTime: number;
  isLoading: boolean;
  pendingPromise: Promise<Country[]> | null;
} = {
  countries: [],
  lastFetchTime: 0,
  isLoading: false,
  pendingPromise: null
};

const CACHE_DURATION = 300000; // 5 minutes cache for countries (they don't change often)

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>(countriesCache.countries);
  const [isLoading, setIsLoading] = useState(countriesCache.isLoading);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  const fetchCountriesWithRetry = async (maxRetries = 3): Promise<Country[]> => {
    const token = getAuthToken();
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[useCountries] Attempt ${attempt}/${maxRetries} to fetch countries`);
        
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": locale,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(
          getApiUrl("/api/common/setting/country/list"),
          { headers }
        );

        console.log("[useCountries] Countries fetch response", { 
          attempt,
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        });

        if (!response.ok) {
          // Handle specific status codes
          if (response.status === 0) {
            throw new Error('Network error or CORS issue. Please check your internet connection.');
          }

          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt - 1) * 1000;
            console.log(`[useCountries] Request failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }

          throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
        }

        const data: CountriesResponse = await response.json();
        
        console.log("[useCountries] Successfully retrieved countries", { 
          count: data.data.length
        });

        countriesCache.countries = data.data;
        countriesCache.lastFetchTime = Date.now();
        
        return data.data;
      } catch (error) {
        console.error(`[useCountries] Attempt ${attempt} failed:`, error);

        // Handle network errors and CORS issues specifically
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
          console.error('[useCountries] Network error or CORS issue detected');
          if (attempt === maxRetries) {
            throw new Error('Network error: Unable to fetch countries. This may be due to CORS policy or network connectivity issues.');
          }
        } else if (attempt === maxRetries) {
          throw error;
        }

        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return [];
  };

  const fetchCountries = async (forceRefresh = false): Promise<Country[]> => {
    const now = Date.now();
    
    if (!forceRefresh && countriesCache.countries.length > 0 && (now - countriesCache.lastFetchTime) < CACHE_DURATION) {
      console.log("[useCountries] Using cached countries data");
      return countriesCache.countries;
    }

    if (countriesCache.pendingPromise) {
      console.log("[useCountries] Using pending promise");
      return countriesCache.pendingPromise;
    }

    console.log("[useCountries] Starting new countries fetch");
    countriesCache.isLoading = true;
    countriesCache.pendingPromise = fetchCountriesWithRetry();

    try {
      const result = await countriesCache.pendingPromise;
      return result;
    } catch (error) {
      console.error("[useCountries] Error fetching countries:", error);
      throw error;
    } finally {
      countriesCache.isLoading = false;
      countriesCache.pendingPromise = null;
    }
  };

  useEffect(() => {
    const loadCountries = async () => {
      // Skip loading if we're on sign-out related pages
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        if (pathname.includes('/signout') || pathname.includes('/callback')) {
          console.log('[useCountries] Skipping countries fetch on sign-out/callback page');
          return;
        }
      }

      // Check if we have a valid token before starting
      const token = getAuthToken();
      if (!token) {
        console.log('[useCountries] No token available, skipping countries fetch');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const fetchedCountries = await fetchCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch countries';
        setError(errorMessage);
        console.error('[useCountries] Error loading countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCountries();
  }, [locale]);

  const getCountryById = (id: number): Country | undefined => {
    return countries.find(country => country.id === id);
  };

  const getCountryByIso2 = (iso2: string): Country | undefined => {
    return countries.find(country => country.iso2.toLowerCase() === iso2.toLowerCase());
  };

  const getCountryByIso3 = (iso3: string): Country | undefined => {
    return countries.find(country => country.iso3.toLowerCase() === iso3.toLowerCase());
  };

  const getLocalizedCountryName = (country: Country): string => {
    return country.names[locale as 'en' | 'ar'] || country.name;
  };

  const getLocalizedNationality = (country: Country): string => {
    return country.nationalities[locale as 'en' | 'ar'] || country.nationality;
  };

  return {
    countries,
    isLoading,
    error,
    getCountryById,
    getCountryByIso2,
    getCountryByIso3,
    getLocalizedCountryName,
    getLocalizedNationality,
    refetch: () => fetchCountries(true)
  };
}