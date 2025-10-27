'use client'

import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl'
import { useToast } from '@/components/toast/ToastContext';
import Footer from '@/components/ui/footer'
import PageIllustration from "@/components/page-illustration";

// Import types and reducers
import { SearchState, FilterState, UIState } from './types';
import { searchReducer, filterReducer, uiReducer, searchInitialState, filterInitialState, uiInitialState } from './reducers';

// Import hooks
import { useDebounce } from './hooks/useDebounce';
import { useApiRequest } from './hooks/useApiRequest';

// Import components
import SearchSection from './components/SearchSection';
import FilterToggle from './components/FilterToggle';
import FiltersSection from './components/FiltersSection';
import MainContent from './components/MainContent';
import PerformanceMonitor from './components/PerformanceMonitor';

// Import utils
import { fetchSearchResults, fetchStatisticsPerType } from './utils/api';
import { customScrollbarStyle } from './utils/styles';

export default function HomePageFinal() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = params.locale as string || 'en';
  const t4 = useTranslations('Features4');
  const toast = useToast();

  // Initialize API request management
  const { makeRequest, cancelPreviousRequest } = useApiRequest();

  // Initialize state from URL params
  const getInitialSearchState = (): SearchState => {
    return {
      ...searchInitialState,
      query: searchParams.get('keyword') || '',
      type: (searchParams.get('search_type') as 'knowledge' | 'insighter') || 'knowledge',
      currentPage: parseInt(searchParams.get('page') || '1'),
    };
  };

  const getInitialFilterState = (): FilterState => {
    return {
      ...filterInitialState,
      language: (searchParams.get('language') as any) || 'all',
      country: searchParams.get('country') ? parseInt(searchParams.get('country')!) : null,
      region: searchParams.get('region') ? parseInt(searchParams.get('region')!) : null,
      economicBloc: searchParams.get('economic_bloc') ? parseInt(searchParams.get('economic_bloc')!) : null,
      industry: searchParams.get('industry') ? parseInt(searchParams.get('industry')!) : null,
      isicCode: searchParams.get('isic_code') || null,
      hsCode: searchParams.get('hs_code') || null,
      price: searchParams.get('paid') || null,
      priceRangeStart: (() => {
        const value = searchParams.get('range_start');
        if (!value) return 0;
        const parsed = parseInt(value, 10);
        if (Number.isNaN(parsed)) return 0;
        return Math.max(0, parsed);
      })(),
      priceRangeEnd: (() => {
        const value = searchParams.get('range_end');
        if (!value) return 1000;
        const parsed = parseInt(value, 10);
        if (Number.isNaN(parsed)) return 1000;
        return Math.max(0, parsed);
      })(),
      accuracy: (searchParams.get('accuracy') as any) || 'all',
      role: (searchParams.get('role') as any) || 'all',
      category: searchParams.get('type') || 'all',
    };
  };

  // Use reducers for consolidated state management
  const [searchState, searchDispatch] = useReducer(searchReducer, searchInitialState, getInitialSearchState);
  const [filterState, filterDispatch] = useReducer(filterReducer, filterInitialState, getInitialFilterState);
  const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialState);

  // Responsive behavior
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrMobile(window.innerWidth <= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoized category counts calculation
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

  // Update URL with current state
  const updateUrlWithState = useCallback((updates?: { page?: number }) => {
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
    if ((filterState.priceRangeStart !== null && filterState.priceRangeStart !== 0) || filterState.priceRangeEnd !== null) {
      const startValue = filterState.priceRangeStart ?? 0;
      params.set('range_start', startValue.toString());
      if (filterState.priceRangeEnd !== null) {
        params.set('range_end', filterState.priceRangeEnd.toString());
      }
    }
    if (filterState.accuracy !== 'all') params.set('accuracy', filterState.accuracy);
    if (filterState.role !== 'all') params.set('role', filterState.role);
    if (filterState.category !== 'all') params.set('type', filterState.category);
    
    router.push(`/${locale}/home?${params.toString()}`, { scroll: false });
  }, [searchState, filterState, locale, router]);

  // Perform search with error handling
  const performSearch = useCallback(async (resetPage = true) => {
    const requestId = `search-${Date.now()}`;
    
    searchDispatch({ type: 'SET_LOADING', payload: true });
    if (resetPage) {
      searchDispatch({ type: 'SET_PAGE', payload: 1 });
    }
    
    const handleError = (errorMessage: string) => {
      toast.error(errorMessage, 'Validation Error');
    };
    
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
          handleError,
          filterState.industry,
          filterState.price,
          filterState.priceRangeStart,
          filterState.priceRangeEnd,
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
          filterState.priceRangeStart,
          filterState.priceRangeEnd,
          filterState.hsCode ? parseInt(filterState.hsCode) : null,
          filterState.accuracy,
          filterState.role,
          handleError
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
          toast.error('Failed to fetch search results. Please try again later.', 'Error');
        },
        onFinally: () => {
          searchDispatch({ type: 'SET_LOADING', payload: false });
        },
      }
    );
  }, [searchState, filterState, locale, makeRequest, toast]);

  // Debounced search for filter changes
  const debouncedSearch = useDebounce(performSearch, 300);

  // Handle search type change
  const handleSearchTypeChange = useCallback(async (type: 'knowledge' | 'insighter') => {
    searchDispatch({ type: 'SET_SEARCH_TYPE', payload: type });
    
    // Reset type-specific filters
    if (type === 'knowledge') {
      filterDispatch({ type: 'SET_ACCURACY', payload: 'all' });
      filterDispatch({ type: 'SET_ROLE', payload: 'all' });
    } else {
      filterDispatch({ type: 'SET_INDUSTRY', payload: null });
      filterDispatch({ type: 'SET_ISIC_CODE', payload: null });
      filterDispatch({ type: 'SET_HS_CODE', payload: null });
      filterDispatch({ type: 'SET_PRICE', payload: null });
    }
    
    filterDispatch({ type: 'SET_CATEGORY', payload: 'all' });
    
    updateUrlWithState();
    await performSearch();
  }, [updateUrlWithState, performSearch]);

  // Handle pagination
  const handlePageChange = useCallback(async (page: number) => {
    searchDispatch({ type: 'SET_PAGE', payload: page });
    updateUrlWithState({ page });
    await performSearch(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [updateUrlWithState, performSearch]);

  // Handle search submission
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    updateUrlWithState();
    performSearch();
  }, [updateUrlWithState, performSearch]);

  // Handle category selection
  const handleCategorySelect = useCallback((category: string) => {
    filterDispatch({ type: 'SET_CATEGORY', payload: category });
    uiDispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    searchDispatch({ type: 'SET_PAGE', payload: 1 });
    updateUrlWithState();
    performSearch();
  }, [updateUrlWithState, performSearch]);

  // Handle filter changes
  const createFilterHandler = useCallback((actionType: string) => {
    return (value: any) => {
      filterDispatch({ type: actionType as any, payload: value });
      searchDispatch({ type: 'SET_PAGE', payload: 1 });
      debouncedSearch();
    };
  }, [debouncedSearch]);

  // Reset all filters
  const resetFilters = useCallback(async () => {
    filterDispatch({ type: 'RESET_FILTERS' });
    searchDispatch({ type: 'SET_PAGE', payload: 1 });
    updateUrlWithState();
    await performSearch();
  }, [updateUrlWithState, performSearch]);

  // Handle filters toggle
  const handleFiltersToggle = useCallback(() => {
    if (isTabletOrMobile) {
      uiDispatch({ type: 'SET_FILTER_DRAWER', payload: true });
    } else {
      uiDispatch({ type: 'TOGGLE_FILTERS' });
    }
  }, [isTabletOrMobile]);

  // Initial load effect
  useEffect(() => {
    const hasSearchParams = searchParams.toString() !== '';
    if (hasSearchParams || searchState.type === 'knowledge') {
      performSearch();
    }
  }, []); // Only run on mount

  // Filter change effect
  useEffect(() => {
    if (searchState.currentPage === 1) {
      updateUrlWithState();
    }
  }, [filterState, updateUrlWithState]);

  return (
    <main className='min-h-screen flex flex-col bg-gray-50'>
      <PerformanceMonitor componentName="HomePageFinal" />
      <style dangerouslySetInnerHTML={{ __html: customScrollbarStyle }} />
      
      <section className="relative flex-1">
        <PageIllustration />
        
        {/* Search Section */}
        <SearchSection
          searchQuery={searchState.query}
          searchType={searchState.type}
          locale={locale}
          filterCategory={filterState.category}
          categoryCounts={categoryCounts}
          onQueryChange={(query) => {
            searchDispatch({ type: 'SET_QUERY', payload: query });
            updateUrlWithState();
          }}
          onSearchTypeChange={handleSearchTypeChange}
          onSearchSubmit={handleSearchSubmit}
          onCategorySelect={handleCategorySelect}
          onSearch={() => performSearch()}
        />
        
        {/* Main content area */}
        <div className="flex flex-col relative z-3 pt-2 pb-8">
          <div className="w-full">
            <div className="mx-auto max-w-8xl 2xl:max-w-none 2xl:mx-8 px-4 sm:px-6">
              {/* Filter toggle button */}
              <FilterToggle
                locale={locale}
                filtersVisible={uiState.filtersVisible}
                isTabletOrMobile={isTabletOrMobile}
                onToggle={handleFiltersToggle}
              />
              
              {/* Responsive layout for filters and content */}
              <div className="flex flex-col lg:flex-row gap-8 relative">
                {/* Filters Sidebar */}
                <FiltersSection
                  locale={locale}
                  searchType={searchState.type}
                  filterState={filterState}
                  isVisible={uiState.filtersVisible}
                  isDrawerOpen={uiState.filterDrawerOpen}
                  onToggleFilters={() => uiDispatch({ type: 'TOGGLE_FILTERS' })}
                  onSetDrawerOpen={(open) => uiDispatch({ type: 'SET_FILTER_DRAWER', payload: open })}
                  onFilterChange={createFilterHandler}
                  onResetFilters={resetFilters}
                />
                
                {/* Main Content */}
                <MainContent
                  searchState={searchState}
                  uiState={uiState}
                  filtersVisible={uiState.filtersVisible}
                  locale={locale}
                  onPageChange={handlePageChange}
                  onViewModeChange={(mode) => uiDispatch({ type: 'SET_VIEW_MODE', payload: mode })}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  )
}
