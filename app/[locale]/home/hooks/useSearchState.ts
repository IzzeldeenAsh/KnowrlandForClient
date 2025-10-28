import { useReducer, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from './useDebounce';
import { useApiRequest } from './useApiRequest';
import { 
  SearchState, 
  FilterState, 
  SearchAction, 
  FilterAction 
} from '../types';
import {
  searchReducer,
  filterReducer,
  searchInitialState,
  filterInitialState,
} from '../reducers';
import { fetchSearchResults, fetchStatisticsPerType } from '../utils/api';

interface UseSearchStateOptions {
  locale: string;
  onError?: (error: string) => void;
}

export function useSearchState({ locale, onError }: UseSearchStateOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeRequest, cancelPreviousRequest } = useApiRequest();

  // Initialize state from URL params
  const getInitialSearchState = (): SearchState => {
    const urlParams = new URLSearchParams(searchParams.toString());
    return {
      ...searchInitialState,
      query: urlParams.get('keyword') || '',
      type: (urlParams.get('search_type') as 'knowledge' | 'insighter') || 'knowledge',
      currentPage: parseInt(urlParams.get('page') || '1'),
    };
  };

  const getInitialFilterState = (): FilterState => {
    const urlParams = new URLSearchParams(searchParams.toString());
    return {
      ...filterInitialState,
      language: (urlParams.get('language') as any) || 'all',
      country: urlParams.get('country') ? parseInt(urlParams.get('country')!) : null,
      region: urlParams.get('region') ? parseInt(urlParams.get('region')!) : null,
      economicBloc: urlParams.get('economic_bloc') ? parseInt(urlParams.get('economic_bloc')!) : null,
      industry: urlParams.get('industry') ? parseInt(urlParams.get('industry')!) : null,
      isicCode: urlParams.get('isic_code') || null,
      hsCode: urlParams.get('hs_code') || null,
      price: urlParams.get('paid') || null,
      accuracy: (urlParams.get('accuracy') as any) || 'all',
      role: (urlParams.get('role') as any) || 'all',
      category: urlParams.get('type') || 'all',
    };
  };

  const [searchState, searchDispatch] = useReducer(searchReducer, getInitialSearchState());
  const [filterState, filterDispatch] = useReducer(filterReducer, getInitialFilterState());

  // Update URL with current state
  const updateUrl = useCallback((updates?: { page?: number }) => {
    const params = new URLSearchParams();
    
    // Search params
    if (searchState.query) params.set('keyword', searchState.query);
    params.set('search_type', searchState.type);
    
    // Page param
    const page = updates?.page || searchState.currentPage;
    if (page > 1) params.set('page', page.toString());
    
    // Filter params
    if (filterState.language !== 'all') params.set('language', filterState.language);
    if (filterState.country) params.set('country', filterState.country.toString());
    if (filterState.region) params.set('region', filterState.region.toString());
    if (filterState.economicBloc) params.set('economic_bloc', filterState.economicBloc.toString());
    if (filterState.industry) params.set('industry', filterState.industry.toString());
    if (filterState.isicCode) params.set('isic_code', filterState.isicCode);
    if (filterState.hsCode) params.set('hs_code', filterState.hsCode);
    if (filterState.price) params.set('paid', filterState.price);
    if (filterState.accuracy !== 'all') params.set('accuracy', filterState.accuracy);
    if (filterState.role !== 'all') params.set('role', filterState.role);
    if (filterState.category !== 'all') params.set('type', filterState.category);
    
    router.push(`/${locale}/home?${params.toString()}`, { scroll: false });
  }, [searchState, filterState, locale, router]);

  // Perform search with debouncing
  const performSearch = useCallback(async (resetPage = true) => {
    const requestId = `search-${Date.now()}`;
    
    searchDispatch({ type: 'SET_LOADING', payload: true });
    if (resetPage) {
      searchDispatch({ type: 'SET_PAGE', payload: 1 });
    }
    
    await makeRequest(
      async (signal) => {
        const response = await fetchSearchResults(
          searchState.query,
          searchState.type,
          locale,
          resetPage ? 1 : searchState.currentPage,
          filterState.category !== 'all' ? filterState.category : null,
          filterState.language,
          filterState.country,
          filterState.region,
          filterState.economicBloc,
          filterState.isicCode ? parseInt(filterState.isicCode) : null,
          filterState.category !== 'all' ? filterState.category : null,
          30,
          onError,
          filterState.industry,
          filterState.price,
          filterState.hsCode ? parseInt(filterState.hsCode) : null,
          filterState.accuracy,
          filterState.role
        );

        // Fetch statistics for knowledge search
        if (searchState.type === 'knowledge') {
          const statsResponse = await fetchStatisticsPerType(
            searchState.query,
            locale,
            filterState.language,
            filterState.country,
            filterState.region,
            filterState.economicBloc,
            filterState.isicCode ? parseInt(filterState.isicCode) : null,
            filterState.industry,
            filterState.price,
            filterState.hsCode ? parseInt(filterState.hsCode) : null,
            filterState.accuracy,
            filterState.role,
            null, // rangeStartFilter
            null, // rangeEndFilter
            onError
          );
          searchDispatch({ type: 'SET_STATISTICS', payload: statsResponse.data || [] });
        }

        return response;
      },
      requestId,
      {
        onSuccess: (response) => {
          searchDispatch({
            type: 'SET_RESULTS',
            payload: {
              results: response.data || [],
              totalPages: response.meta?.last_page || 1,
              totalItems: response.meta?.total || 0,
            },
          });
        },
        onError: () => {
          searchDispatch({
            type: 'SET_RESULTS',
            payload: { results: [], totalPages: 1, totalItems: 0 },
          });
        },
        onFinally: () => {
          searchDispatch({ type: 'SET_LOADING', payload: false });
        },
      }
    );
  }, [searchState, filterState, locale, makeRequest, onError]);

  // Debounced search for filter changes
  const debouncedSearch = useDebounce(performSearch, 300);

  // Handle pagination
  const handlePageChange = useCallback(async (page: number) => {
    searchDispatch({ type: 'SET_PAGE', payload: page });
    updateUrl({ page });
    await performSearch(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [updateUrl, performSearch]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    searchState.statistics.forEach(stat => {
      if (stat.type) {
        counts[stat.type] = stat.count;
        counts.all += stat.count;
      }
    });
    return counts;
  }, [searchState.statistics]);

  return {
    searchState,
    filterState,
    searchDispatch,
    filterDispatch,
    performSearch,
    debouncedSearch,
    handlePageChange,
    categoryCounts,
    updateUrl,
    cancelPreviousRequest,
  };
}
