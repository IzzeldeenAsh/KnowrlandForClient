'use client'

import React, { useState, useEffect, useCallback, useMemo, memo, useReducer } from 'react'
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
import SearchBar from './components/SearchBar';
import ResultsSection from './components/ResultsSection';
import InsightersResultsSection from './components/InsightersResultsSection';
import FilterBox from './components/FilterBox';
import { CategoryIconBox } from './components/CategoryIcons';

// Import utils
import { fetchSearchResults, fetchStatisticsPerType } from './utils/api';
import { customScrollbarStyle } from './utils/styles';

// Memoized components
const MemoizedSearchBar = memo(SearchBar);
const MemoizedResultsSection = memo(ResultsSection);
const MemoizedInsightersResultsSection = memo(InsightersResultsSection);
const MemoizedFilterBox = memo(FilterBox);

export default function HomePageOptimized() {
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

  // Memoized translations
  const translations = useMemo(() => ({
    searchPlaceholder: locale === 'ar' ? 'إبحث عن معرفة أو خبير...' : 'Search for Knowledge or Expert...',
    searchTitle: locale === 'ar' ? 'ابحث في التقارير والبيانات والرؤى' : 'Search data, reports, and insights',
    searchSubtitle: locale === 'ar' ? 'ابدأ الآن' : 'Start exploring now',
    exploreByCategory: locale === 'ar' ? 'استكشف بحسب الفئة' : 'Explore by category',
    filters: locale === 'ar' ? 'الفلاتر' : 'Filters',
    showFilters: locale === 'ar' ? 'إظهار الفلاتر' : 'Show Filters',
    hideFilters: locale === 'ar' ? 'إخفاء الفلاتر' : 'Hide Filters',
  }), [locale]);

  return (
    <main className='min-h-screen flex flex-col bg-gray-50'>
      <style dangerouslySetInnerHTML={{ __html: customScrollbarStyle }} />
      
      <section className="relative flex-1">
        <PageIllustration />
        
        {/* Hero Banner Section */}
        <div className="relative overflow-hidden pt-16 pb-8">
          <div className="absolute inset-0 z-0">
            <svg className="absolute right-0 top-0 h-full w-1/2 translate-x-1/3 transform text-white opacity-10" fill="none" viewBox="0 0 400 400">
              <defs>
                <pattern id="91c570bc-8fb3-48a2-a478-944f3c995113" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-100" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#91c570bc-8fb3-48a2-a478-944f3c995113)" />
            </svg>
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <div className="flex flex-col sm:flex-col align-center justify-center gap-2" style={{lineHeight: '1.3'}}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center " style={{lineHeight: '1.3'}}>
                  {translations.searchTitle}
                </h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-center " style={{lineHeight: '1.3'}}>
                  {translations.searchSubtitle}
                </h1>
              </div>
              
              {/* Search Bar */}
              <div className="mx-auto mt-8 max-w-3xl shadow-md">
                <MemoizedSearchBar
                  searchQuery={searchState.query}
                  setSearchQuery={(query) => searchDispatch({ type: 'SET_QUERY', payload: query })}
                  searchType={searchState.type}
                  setSearchType={handleSearchTypeChange}
                  locale={locale}
                  placeholder={translations.searchPlaceholder}
                  onSubmit={handleSearchSubmit}
                  onSearch={() => performSearch()}
                  onQueryChange={(query) => {
                    searchDispatch({ type: 'SET_QUERY', payload: query });
                    updateUrlWithState();
                  }}
                />
              </div>
              
              {/* Category Icons */}
              {searchState.type === 'knowledge' && (
                <div className="mt-10">
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    {translations.exploreByCategory}
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    <CategoryIconBox 
                      name="all" 
                      label="All" 
                      locale={locale} 
                      arLabel="الكل" 
                      isSelected={filterState.category === 'all'} 
                      onClick={() => handleCategorySelect('all')} 
                      count={categoryCounts['all']}
                    />
                    <div className="hidden sm:block w-px h-16 bg-gray-300 mx-2"></div>
                    <CategoryIconBox 
                      name="data" 
                      label="Data" 
                      locale={locale} 
                      arLabel="البيانات" 
                      isSelected={filterState.category === 'data'} 
                      onClick={() => handleCategorySelect('data')} 
                      count={categoryCounts['data']}
                    />
                    <CategoryIconBox 
                      name="report" 
                      label="Reports" 
                      locale={locale} 
                      arLabel="التقارير" 
                      isSelected={filterState.category === 'report'} 
                      onClick={() => handleCategorySelect('report')} 
                      count={categoryCounts['report']}
                    />
                    <CategoryIconBox 
                      name="insight" 
                      label="Insights" 
                      locale={locale} 
                      arLabel="الرؤى" 
                      isSelected={filterState.category === 'insight'} 
                      onClick={() => handleCategorySelect('insight')} 
                      count={categoryCounts['insight']}
                    />
                    <CategoryIconBox 
                      name="manual" 
                      label="Manuals" 
                      locale={locale} 
                      arLabel="الأدلة" 
                      isSelected={filterState.category === 'manual'} 
                      onClick={() => handleCategorySelect('manual')} 
                      count={categoryCounts['manual']}
                    />
                    <CategoryIconBox 
                      name="course" 
                      label="Courses" 
                      locale={locale} 
                      arLabel="الدورات" 
                      isSelected={filterState.category === 'course'} 
                      onClick={() => handleCategorySelect('course')} 
                      count={categoryCounts['course']}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col relative z-3 pt-2 pb-8">
          <div className="w-full">
            <div className="mx-auto max-w-8xl 2xl:max-w-none 2xl:mx-8 px-4 sm:px-6">
              {/* Filter toggle button */}
              <div className="mb-1 flex justify-start">
                <button
                  onClick={() => {
                    if (isTabletOrMobile) {
                      uiDispatch({ type: 'SET_FILTER_DRAWER', payload: true });
                    } else {
                      uiDispatch({ type: 'TOGGLE_FILTERS' });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                >
                  {uiState.filtersVisible && !isTabletOrMobile ? (
                    <>
                      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <g clipRule="evenodd" fillRule="evenodd">
                          <path d="m11 20v-16h2v16z" fill="#90caea"/>
                          <g fill="#3747d6">
                            <path d="m16.9142 12 2.7929-2.79289-1.4142-1.41422-3.5 3.50001c-.3905.3905-.3905 1.0237 0 1.4142l3.5 3.5 1.4142-1.4142z"/>
                            <path d="m7.0858 12-2.79289-2.79289 1.41421-1.41422 3.5 3.50001c.39053.3905.39053 1.0237 0 1.4142l-3.5 3.5-1.41421-1.4142z"/>
                          </g>
                        </g>
                      </svg>
                      {translations.hideFilters}
                    </>
                  ) : (
                    <>
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.44336 5.9082H14.6973V7.37305H4.44336V5.9082Z" fill="#4DC4FF"/>
                        <path d="M16.1621 5.9082H20.5566V7.37305H16.1621V5.9082Z" fill="#4DA6FF"/>
                        <path d="M4.44336 11.7676H8.83789V13.2324H4.44336V11.7676Z" fill="#4DC4FF"/>
                        <path d="M10.3027 11.7676H20.5566V13.2324H10.3027V11.7676Z" fill="#4DC4FF"/>
                        <path d="M9.57031 14.6973C8.35869 14.6973 7.37305 13.7116 7.37305 12.5C7.37305 11.2884 8.35869 10.3027 9.57031 10.3027C10.7819 10.3027 11.7676 11.2884 11.7676 12.5C11.7676 13.7116 10.7819 14.6973 9.57031 14.6973Z" fill="#5A77B3"/>
                        <path d="M4.44336 17.627H14.6973V19.0918H4.44336V17.627Z" fill="#4DC4FF"/>
                        <path d="M16.1621 17.627H20.5566V19.0918H16.1621V17.627Z" fill="#4DA6FF"/>
                        <path d="M15.4297 8.83789C14.2181 8.83789 13.2324 7.85225 13.2324 6.64062C13.2324 5.429 14.2181 4.44336 15.4297 4.44336C16.6413 4.44336 17.627 5.429 17.627 6.64062C17.627 7.85225 16.6413 8.83789 15.4297 8.83789Z" fill="#4D5B99"/>
                        <path d="M15.4297 20.5566C14.2181 20.5566 13.2324 19.571 13.2324 18.3594C13.2324 17.1478 14.2181 16.1621 15.4297 16.1621C16.6413 16.1621 17.627 17.1478 17.627 18.3594C17.627 19.571 16.6413 20.5566 15.4297 20.5566Z" fill="#4D5B99"/>
                      </svg>
                      {translations.showFilters}
                    </>
                  )}
                </button>
              </div>
              
              {/* Responsive layout for filters and content */}
              <div className="flex flex-col lg:flex-row gap-8 relative">
                {/* Filters Sidebar */}
                <div className={`lg:flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
                  uiState.filtersVisible 
                    ? 'lg:w-80 opacity-100' 
                    : 'lg:w-0 opacity-0 max-h-0'
                }`}>
                  <div className={`sticky rounded-md top-2 transition-transform duration-300 ease-in-out ${
                    uiState.filtersVisible ? 'transform translate-x-0' : 'transform -translate-x-full lg:translate-x-0'
                  }`}>
                    <MemoizedFilterBox
                      key={`filter-box-${searchState.type}`}
                      locale={locale}
                      searchType={searchState.type}
                      languageFilter={filterState.language}
                      setLanguageFilter={createFilterHandler('SET_LANGUAGE')}
                      countryFilter={filterState.country}
                      setCountryFilter={createFilterHandler('SET_COUNTRY')}
                      regionFilter={filterState.region}
                      setRegionFilter={createFilterHandler('SET_REGION')}
                      economicBlocFilter={filterState.economicBloc}
                      setEconomicBlocFilter={createFilterHandler('SET_ECONOMIC_BLOC')}
                      isicCodeFilter={filterState.isicCode}
                      setIsicCodeFilter={createFilterHandler('SET_ISIC_CODE')}
                      industryFilter={filterState.industry}
                      setIndustryFilter={createFilterHandler('SET_INDUSTRY')}
                      hsCodeFilter={filterState.hsCode}
                      setHsCodeFilter={createFilterHandler('SET_HS_CODE')}
                      priceFilter={filterState.price}
                      setPriceFilter={createFilterHandler('SET_PRICE')}
                      accuracyFilter={filterState.accuracy}
                      setAccuracyFilter={createFilterHandler('SET_ACCURACY')}
                      roleFilter={filterState.role}
                      setRoleFilter={createFilterHandler('SET_ROLE')}
                      resetFilters={resetFilters}
                      isDrawerOpen={uiState.filterDrawerOpen}
                      setIsDrawerOpen={(open) => uiDispatch({ type: 'SET_FILTER_DRAWER', payload: open })}
                    />
                  </div>
                </div>
                
                {/* Main Content */}
                <div className={`transition-all duration-300 ease-in-out ${
                  uiState.filtersVisible ? 'flex-1' : 'flex-1 lg:max-w-none'
                }`}>
                  {/* Results section */}
                  {searchState.type === 'insighter' ? (
                    <MemoizedInsightersResultsSection
                      key={`insighter-section-${searchState.type}-${searchState.totalItems}`}
                      searchQuery={searchState.query}
                      searchResults={searchState.results}
                      loading={searchState.loading}
                      currentPage={searchState.currentPage}
                      totalItems={searchState.totalItems}
                      setCurrentPage={(page) => handlePageChange(page)}
                      totalPages={searchState.totalPages}
                      locale={locale}
                      onPageChange={handlePageChange}
                    />
                  ) : (
                    <MemoizedResultsSection
                      key={`results-section-${searchState.type}-${searchState.totalItems}`}
                      searchQuery={searchState.query}
                      searchResults={searchState.results}
                      knowledgeItems={[]}
                      loading={searchState.loading}
                      currentPage={searchState.currentPage}
                      setCurrentPage={(page) => handlePageChange(page)}
                      totalPages={searchState.totalPages}
                      totalItems={searchState.totalItems}
                      viewMode={uiState.viewMode}
                      setViewMode={(mode) => uiDispatch({ type: 'SET_VIEW_MODE', payload: mode })}
                      locale={locale}
                      onPageChange={handlePageChange}
                      searchType={searchState.type}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  )
}