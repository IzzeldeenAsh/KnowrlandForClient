'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl'
import { useToast } from '@/components/toast/ToastContext';
import Footer from '@/components/ui/footer'
import PageIllustration from "@/components/page-illustration";
import type { KnowledgeItem } from '../topic/[id]/[slug]/KnowledgeGrid';
import type { SearchResultItem } from './SearchResultsGrid';

// Import components
import SearchBar from './components/SearchBar';
// ContentTabs removed as per requirement
import ResultsSection from './components/ResultsSection';
import InsightersResultsSection from './components/InsightersResultsSection';
import FilterBox from './components/FilterBox';
import { CategoryIconBox } from './components/CategoryIcons';

// Import utils
import { fetchSearchResults, fetchStatisticsPerType } from './utils/api';
import { customScrollbarStyle } from './utils/styles';

// Statistics types
export interface StatisticsItem {
  type: string | null;
  count: number;
}

export interface StatisticsResponse {
  data: StatisticsItem[];
}

interface YearRange {
  startYear: number | null;
  endYear: number | null;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Initialize state with URL parameters if available
  const initialQuery = searchParams.get('keyword') || '';
  const initialType = (searchParams.get('search_type') as 'knowledge' | 'insighter') || 'knowledge';
  const initialLanguage = (searchParams.get('language') as 'all' | 'arabic' | 'english') || 'all';
  const initialCountry = searchParams.get('country') ? parseInt(searchParams.get('country')!) : null;
  const initialRegion = searchParams.get('region') ? parseInt(searchParams.get('region')!) : null;
  const initialEconomicBloc = searchParams.get('economic_bloc') ? parseInt(searchParams.get('economic_bloc')!) : null;
  const initialTag = searchParams.get('tag') ? parseInt(searchParams.get('tag')!) : null;
  const initialIndustry = searchParams.get('industry') ? parseInt(searchParams.get('industry')!) : null;
  const initialIsicCode = searchParams.get('isic_code') ? parseInt(searchParams.get('isic_code')!) : null;
  const initialHsCode = searchParams.get('hs_code') ? parseInt(searchParams.get('hs_code')!) : null;
  const initialPriceFilter = searchParams.get('paid') || null;
  const initialRangeStart = searchParams.get('range_start') || null;
  const initialRangeEnd = searchParams.get('range_end') || null;
  const initialCategory = searchParams.get('type') || 'all';
  const initialAccuracy = (searchParams.get('accuracy') as 'any' | 'all') || 'all';
  // Get initial page from URL
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const initialRole = (searchParams.get('role') as 'all' | 'company' | 'individual') || 'all';

  // Parse year of study from URL params
  const initialCoverStart = searchParams.get('cover_start');
  const initialCoverEnd = searchParams.get('cover_end');
  const initialYearOfStudy = (initialCoverStart || initialCoverEnd) ? {
    startYear: initialCoverStart ? parseInt(initialCoverStart) : null,
    endYear: initialCoverEnd ? parseInt(initialCoverEnd) : null,
  } : null;
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<'knowledge' | 'insighter'>(initialType);
  const [activeTab] = useState<string | null>('all');
  
  // Keep searchType synchronized with URL
  useEffect(() => {
    const urlSearchType = searchParams.get('search_type') as 'knowledge' | 'insighter';
    if (urlSearchType && urlSearchType !== searchType) {
      setSearchType(urlSearchType);
    }
  }, [searchParams, searchType]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [languageFilter, setLanguageFilter] = useState<'all' | 'arabic' | 'english'>(initialLanguage);
  const [countryFilter, setCountryFilter] = useState<number | null>(initialCountry);
  const [regionFilter, setRegionFilter] = useState<number | null>(initialRegion);
  const [economicBlocFilter, setEconomicBlocFilter] = useState<number | null>(initialEconomicBloc);
  const [tagFilter, setTagFilter] = useState<number | null>(initialTag);
  const [industryFilter, setIndustryFilter] = useState<number | null>(initialIndustry);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isicCodeFilter, setIsicCodeFilter] = useState<number | null>(initialIsicCode);
  const [hsCodeFilter, setHsCodeFilter] = useState<number | null>(initialHsCode);
  const [priceFilter, setPriceFilter] = useState<string | null>(initialPriceFilter);
  const [rangeStartFilter, setRangeStartFilter] = useState<string | null>(initialRangeStart);
  const [rangeEndFilter, setRangeEndFilter] = useState<string | null>(initialRangeEnd);
  const [accuracyFilter, setAccuracyFilter] = useState<'any' | 'all'>(initialAccuracy);
  const [roleFilter, setRoleFilter] = useState<'all' | 'company' | 'individual'>(initialRole);
  const [yearOfStudyFilter, setYearOfStudyFilter] = useState<YearRange | null>(initialYearOfStudy);
  
  // Add state for filter visibility and drawer
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrMobile(window.innerWidth <= 1024);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Add state for statistics
  const [statistics, setStatistics] = useState<StatisticsItem[]>([]);
  
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  // Access the toast context
  const toast = useToast();
  
  // Flag to track if component has initialized with URL params
  const [initialized, setInitialized] = useState(false);
  
  // Global loading states for ISIC/HS codes
  const [isLoadingIsic, setIsLoadingIsic] = useState(false);
  const [isLoadingHs, setIsLoadingHs] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(false);
  

  // Mark initial load as complete when everything is ready
  useEffect(() => {
    if (initialized && (!loading) && (searchType === 'insighter' || (searchType === 'knowledge' && isDataLoaded && !isLoadingIsic && (!isicCodeFilter || !isLoadingHs)))) {
      setHasCompletedInitialLoad(true);
    }
  }, [initialized, loading, searchType, isDataLoaded, isLoadingIsic, isLoadingHs, isicCodeFilter]);
  
  // Helper function to fetch statistics when search type is knowledge
  const fetchStatisticsIfNeeded = useCallback(async (
    searchQuery: string,
    searchType: 'knowledge' | 'insighter'
  ) => {
    if (searchType === 'knowledge') {
      try {
        const statsResponse = await fetchStatisticsPerType(
          searchQuery,
          locale,
          languageFilter,
          countryFilter,
          regionFilter,
          economicBlocFilter,
          isicCodeFilter,
          tagFilter,
          industryFilter,
          priceFilter,
          hsCodeFilter,
          accuracyFilter,
          roleFilter,
          rangeStartFilter,
          rangeEndFilter,
          yearOfStudyFilter?.startYear?.toString() || null,
          yearOfStudyFilter?.endYear?.toString() || null,
          (errorMsg) => toast.error(errorMsg, 'Statistics Error')
        );
        setStatistics(statsResponse.data || []);
      } catch (error) {
        setStatistics([]);
      }
    } else {
      setStatistics([]);
    }
  }, [locale, languageFilter, countryFilter, regionFilter, economicBlocFilter,
      isicCodeFilter, tagFilter, industryFilter, priceFilter, hsCodeFilter, accuracyFilter, roleFilter, rangeStartFilter, rangeEndFilter, yearOfStudyFilter, toast]);
  
  // Helper function to get count for a specific category type from statistics
  const getCategoryCount = useCallback((categoryType: string) => {
    if (categoryType === 'all') {
      // For 'all', sum up all counts
      return statistics.reduce((total, stat) => total + stat.count, 0);
    }
    
    // Find the specific category in statistics
    const stat = statistics.find(s => s.type === categoryType);
    return stat ? stat.count : 0;
  }, [statistics]);
  
  // Function to reset all filters to default values
  const resetFilters = useCallback(async () => {
    // Set flag to prevent other effects from interfering
    isFilterResetInProgressRef.current = true;
    
    // Set loading immediately to show user that action is being performed
    setLoading(true);
    
    // Clear existing results immediately to prevent showing stale data
    setSearchResults([]);
    setKnowledgeItems([]);
    setStatistics([]);
    
    // Reset all filter states
    setLanguageFilter('all');
    setCountryFilter(null);
    setRegionFilter(null);
    setEconomicBlocFilter(null);
    setIndustryFilter(null);
    setTagFilter(null);
    setIsicCodeFilter(null);
    setHsCodeFilter(null);
    setPriceFilter(null);
    setRangeStartFilter(null);
    setRangeEndFilter(null);
    setYearOfStudyFilter(null);
    setSelectedCategory('all');
    setAccuracyFilter('all');
    setRoleFilter('all');
    setCurrentPage(1);
    
    // Keep only search_type and keyword in URL
    const urlParams = new URLSearchParams();
    if (searchQuery && searchQuery.trim() !== '') urlParams.set('keyword', searchQuery);
    urlParams.set('search_type', searchType);
    
    // Update URL with only search parameters
    router.push(`/${locale}/home?${urlParams.toString()}`, { scroll: false });
    
    // Explicitly trigger search with reset parameters
    try {
      const handleError = (errorMessage: string) => {
        toast.error(errorMessage, 'Validation Error');
      };
      
      
      const response = await fetchSearchResults(
        searchQuery.trim(),
        searchType,
        locale,
        1, // Reset to page 1
        activeTab,
        'all', // Reset language filter
        null, // Reset country filter
        null, // Reset region filter
        null, // Reset economic bloc filter
        null, // Reset ISIC code filter
        'all', // Reset category to 'all'
        30, // perPage
        handleError,
        null, // Reset industry filter
        null, // Reset tag filter
        null, // Reset price filter
        null, // Reset HS code filter
        'all', // Reset accuracy filter
        'all', // Reset role filter
        null, // Reset range start filter
        null // Reset range end filter
      );
      
      setSearchResults(response.data || []);
      setTotalPages(response.meta?.last_page || 1);
      setTotalItems(response.meta?.total || 0);
      
      // Fetch statistics if search type is knowledge
      if (searchType === 'knowledge') {
        await fetchStatisticsIfNeeded(searchQuery.trim(), searchType);
      } else {
        setStatistics([]);
      }
    } catch (error) {
      console.error('Search after filter reset failed:', error);
      setSearchResults([]);
      setKnowledgeItems([]);
      toast.error('Failed to fetch search results. Please try again later.', 'Error');
    } finally {
      setLoading(false);
      // Reset the flag after the operation completes
      setTimeout(() => {
        isFilterResetInProgressRef.current = false;
      }, 500); // Wait a bit to ensure no race conditions
    }
  }, [searchQuery, searchType, locale, router, activeTab, toast, fetchStatisticsIfNeeded]);
  

  
  // Helper function to update URL with all current filter parameters
  const updateUrlWithFilters = useCallback((params: {
    query?: string,
    type?: 'knowledge' | 'insighter',
    language?: 'all' | 'arabic' | 'english',
    country?: number | null,
    region?: number | null,
    economic_bloc?: number | null,
    tag?: number | null,
    industry?: number | null,
    isic_code?: number | null,
    hs_code?: number | null,
    category?: string | null,
    paid?: string | null,
    range_start?: string | null,
    range_end?: string | null,
    cover_start?: string | null,
    cover_end?: string | null,
    accuracy?: 'any' | 'all',
    role?: 'all' | 'company' | 'individual',
    page?: number
  }) => {
    // Skip URL updates during pagination to prevent interference
    if (isPageChangeInProgressRef.current) {
      return;
    }
    // Skip URL updates if component is still initializing to prevent overriding incoming URL parameters
    if (!initialized) {
      return;
    }
    // Build URL parameters
    const urlParams = new URLSearchParams();
    
    // Get the values to use - prioritize new values from params over current state
    const query = params.query !== undefined ? params.query : searchQuery;
    const type = params.type || searchType;
    const language = params.language !== undefined ? params.language : languageFilter;
    const country = params.country !== undefined ? params.country : countryFilter;
    const region = params.region !== undefined ? params.region : regionFilter;
    const economicBloc = params.economic_bloc !== undefined ? params.economic_bloc : economicBlocFilter;
    const tag = params.tag !== undefined ? params.tag : tagFilter;
    const industry = params.industry !== undefined ? params.industry : industryFilter;
    const isicCode = params.isic_code !== undefined ? params.isic_code : isicCodeFilter;
    const hsCode = params.hs_code !== undefined ? params.hs_code : hsCodeFilter;
    const paid = params.paid !== undefined ? params.paid : priceFilter;
    const rangeStart = params.range_start !== undefined ? params.range_start : rangeStartFilter;
    const rangeEnd = params.range_end !== undefined ? params.range_end : rangeEndFilter;
    const coverStart = params.cover_start !== undefined ? params.cover_start : (yearOfStudyFilter?.startYear?.toString() || null);
    const coverEnd = params.cover_end !== undefined ? params.cover_end : (yearOfStudyFilter?.endYear?.toString() || null);
    const category = params.category !== undefined ? params.category : selectedCategory;
    const accuracy = params.accuracy !== undefined ? params.accuracy : accuracyFilter;
    const role = params.role !== undefined ? params.role : roleFilter;
    const page = params.page !== undefined ? params.page : currentPage;
    
    // Add only non-default/non-empty parameters to the URL
    // Required parameters
    if (query && query.trim() !== '') urlParams.set('keyword', query);
    urlParams.set('search_type', type); // Always include search type
    
    // Optional parameters - only add if not default values
    if (language && language !== 'all') urlParams.set('language', language);
    if (country !== null) urlParams.set('country', country.toString());
    if (region !== null) urlParams.set('region', region.toString());
    if (economicBloc !== null) urlParams.set('economic_bloc', economicBloc.toString());
    if (tag !== null) urlParams.set('tag', tag.toString());
    if (industry !== null) urlParams.set('industry', industry.toString());
    if (isicCode !== null) urlParams.set('isic_code', isicCode.toString());
    if (hsCode !== null) urlParams.set('hs_code', hsCode.toString());
    if (paid !== null) urlParams.set('paid', paid);
    if (rangeStart !== null) urlParams.set('range_start', rangeStart);
    if (rangeEnd !== null) urlParams.set('range_end', rangeEnd);
    if (coverStart !== null) urlParams.set('cover_start', coverStart);
    if (coverEnd !== null) urlParams.set('cover_end', coverEnd);
    if (category && category !== 'all') urlParams.set('type', category);
    if (accuracy && accuracy !== 'all') urlParams.set('accuracy', accuracy);
    if (role && role !== 'all') urlParams.set('role', role);
    // Always add page and per_page parameters to maintain consistency
    if (page > 1) {
      urlParams.set('page', page.toString());
      urlParams.set('per_page', '30');
    }
    
    const nextUrl = `/${locale}/home?${urlParams.toString()}`;
    try {
      console.log('[updateUrlWithFilters] applying params:', {
        query,
        type,
        language,
        country,
        region,
        economicBloc,
        tag,
        industry,
        isicCode,
        hsCode,
        paid,
        rangeStart,
        rangeEnd,
        coverStart,
        coverEnd,
        category,
        accuracy,
        role,
        page
      });
      console.log('[updateUrlWithFilters] next URL:', nextUrl);
    } catch {}
    // Update URL without refreshing the page
    router.push(nextUrl, { scroll: false });
  }, [locale, router, searchType, searchQuery, currentPage, languageFilter, countryFilter, regionFilter, economicBlocFilter, tagFilter, industryFilter, isicCodeFilter, hsCodeFilter, priceFilter, selectedCategory, accuracyFilter, roleFilter, rangeStartFilter, rangeEndFilter, yearOfStudyFilter, initialized]);

  // Handler for search type changes
  const handleSearchTypeChange = useCallback(async (type: 'knowledge' | 'insighter') => {
    
    // Set flag to prevent main search effect from interfering
    isSearchTypeChangingRef.current = true;
    
    // Set loading immediately to show loading state during transition
    setLoading(true);
    
    // Clear existing results immediately to prevent showing old data
    setSearchResults([]);
    setKnowledgeItems([]);
    setStatistics([]);
    
    // Batch all state updates together using React's automatic batching
    // This ensures they all take effect in the same render cycle
    React.startTransition(() => {
      // Update search type state FIRST
      setSearchType(type);
      
      // Reset to page 1 when changing search type
      setCurrentPage(1);
      setTotalPages(1);
      setTotalItems(0);
      
      // Reset ALL filters when switching search types
      setLanguageFilter('all');
      setCountryFilter(null);
      setRegionFilter(null);
      setEconomicBlocFilter(null);
      setTagFilter(null);
      setIndustryFilter(null);
      setIsicCodeFilter(null);
      setHsCodeFilter(null);
      setPriceFilter(null);
      setRangeStartFilter(null);
      setRangeEndFilter(null);
      setYearOfStudyFilter(null);
      setSelectedCategory('all');
      setAccuracyFilter('all');
      setRoleFilter('all');
    });
    
    // Build URL parameters for the new search type with reset filters (only keyword + search_type)
    const urlParams = new URLSearchParams();
    if (searchQuery && searchQuery.trim() !== '') urlParams.set('keyword', searchQuery);
    urlParams.set('search_type', type);
    
    // Update URL with clean parameters for the new search type
    router.push(`/${locale}/home?${urlParams.toString()}`, { scroll: false });
    
    // Perform the search immediately with the new search type and explicitly reset filters
    try {
      const handleError = (errorMessage: string) => {
        toast.error(errorMessage, 'Validation Error');
      };
      
      
      const response = await fetchSearchResults(
        searchQuery.trim(),
        type, // Use the new search type directly
        locale,
        1, // Reset to page 1
        activeTab,
        'all',
        null,
        null,
        null,
        null, // Always reset ISIC code when switching types
        'all', // Always reset category to 'all'
        30, // perPage
        handleError,
        null, // Always reset industry when switching types
        null, // Always reset tag when switching types
        null, // Always reset price when switching types
        null, // Always reset HS code when switching types
        'all', // Always reset accuracy to 'all' when switching types
        'all', // Always reset role to 'all' when switching types
        null, // Always reset range start when switching types
        null, // Always reset range end when switching types
        null, // Always reset cover_start when switching types
        null  // Always reset cover_end when switching types
      );
      
      
      // Update results with the correct search type data
      setSearchResults(response.data || []);
      setTotalPages(response.meta?.last_page || 1);
      setTotalItems(response.meta?.total || 0);
      
      // Fetch statistics if search type is knowledge
      if (type === 'knowledge') {
        await fetchStatisticsIfNeeded(searchQuery.trim(), type);
      } else {
        setStatistics([]);
      }
    } catch (error) {
      console.error('Search type change failed:', error);
      setSearchResults([]);
      toast.error('Failed to fetch search results. Please try again later.', 'Error');
    } finally {
      setLoading(false);
      // Reset the flag after the search is complete
      setTimeout(() => {
        isSearchTypeChangingRef.current = false;
      }, 500); // Wait a bit to ensure no race conditions
    }
  }, [searchQuery, locale, router, activeTab, languageFilter, countryFilter, regionFilter, economicBlocFilter, toast, fetchStatisticsIfNeeded]);

  // Custom setter for language filter that triggers search
  const handleLanguageFilterChange = useCallback((value: 'all' | 'arabic' | 'english') => {
    // Update the language filter state
    setLanguageFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ language: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for country filter that triggers search
  const handleCountryFilterChange = useCallback((value: number | null) => {
    // Update the country filter state
    setCountryFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ country: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for region filter that triggers search
  const handleRegionFilterChange = useCallback((value: number | null) => {
    // Update the region filter state
    setRegionFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ region: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for economic bloc filter that triggers search
  const handleEconomicBlocFilterChange = useCallback((value: number | null) => {
    // Update the economic bloc filter state
    setEconomicBlocFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ economic_bloc: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for price filter that triggers search
  const handlePriceFilterChange = useCallback((value: string | null) => {
    // Update the price filter state
    setPriceFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ paid: value });

    // Reset to page 1 when filter changes
    setCurrentPage(1);

    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);

  // Custom setter for range start filter that triggers search
  const handleRangeStartFilterChange = useCallback((value: string | null) => {
    // Update the range start filter state
    setRangeStartFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ range_start: value });

    // Reset to page 1 when filter changes
    setCurrentPage(1);

    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);

  // Custom setter for range end filter that triggers search
  const handleRangeEndFilterChange = useCallback((value: string | null) => {
    // Update the range end filter state
    setRangeEndFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ range_end: value });

    // Reset to page 1 when filter changes
    setCurrentPage(1);

    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for industry filter that triggers search
  const handleIndustryFilterChange = useCallback((value: number | null) => {
    // Update the industry filter state
    setIndustryFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ industry: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for ISIC code filter that triggers search
  const handleIsicCodeFilterChange = useCallback((value: string | null) => {
    // Convert string to number for internal state, or null if empty
    const numericValue = value ? parseInt(value) : null;
    
    // Update the ISIC code filter state
    setIsicCodeFilter(numericValue);
    // Update URL with new filter (use the numeric value)
    updateUrlWithFilters({ isic_code: numericValue });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for HS code filter that triggers search
  const handleHsCodeFilterChange = useCallback((value: string | null) => {
    // Convert string to number for internal state, or null if empty
    const numericValue = value ? parseInt(value) : null;

    // Update the HS code filter state
    setHsCodeFilter(numericValue);
    // Update URL with new filter (use the numeric value)
    console.log('[handleHsCodeFilterChange] value:', value, 'numeric:', numericValue);
    updateUrlWithFilters({ hs_code: numericValue });

    // Reset to page 1 when filter changes
    setCurrentPage(1);

    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for accuracy filter that triggers search
  const handleAccuracyFilterChange = useCallback((value: 'any' | 'all') => {
    // Update the accuracy filter state
    setAccuracyFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ accuracy: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);

  // Custom setter for role filter that triggers search
  const handleRoleFilterChange = useCallback((value: 'all' | 'company' | 'individual') => {
    // Update the role filter state
    setRoleFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ role: value });

    // Reset to page 1 when filter changes
    setCurrentPage(1);

    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);

  // Custom setter for tag filter that triggers search
  const handleTagFilterChange = useCallback((value: number | null) => {
    setTagFilter(value);
    updateUrlWithFilters({ tag: value });
    setCurrentPage(1);
  }, [updateUrlWithFilters]);

  const handleYearOfStudyFilterChange = useCallback((value: YearRange | null) => {

    // Update the year of study filter state
    setYearOfStudyFilter(value);

    // Update URL with new filter - convert to cover_start and cover_end
    const urlParams: any = {};
    if (value) {
      if (value.startYear !== null) {
        urlParams.cover_start = value.startYear.toString();
      }
      if (value.endYear !== null) {
        urlParams.cover_end = value.endYear.toString();
      }
    } else {
      // Clear the URL params when filter is null
      urlParams.cover_start = null;
      urlParams.cover_end = null;
    }

    updateUrlWithFilters(urlParams);

    // Reset to page 1 when filter changes
    setCurrentPage(1);

    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);

  // Reference to track if empty query has been called
  const emptyQueryCalledRef = useRef<boolean>(false);

  // Effect to directly trigger search when URL has query parameters
  useEffect(() => {
    // Only run this effect once on initial mount

    if (initialized) return;
      const query = searchParams.get('keyword');
    const type = searchParams.get('search_type') as 'knowledge' | 'insighter';
    const accuracy = searchParams.get('accuracy');
    const language = searchParams.get('language');
    const country = searchParams.get('country');
    const categoryType = searchParams.get('type');
    
    // Read ALL filter parameters directly from URL to avoid state synchronization issues
    const urlRegion = searchParams.get('region') ? parseInt(searchParams.get('region')!) : null;
    const urlEconomicBloc = searchParams.get('economic_bloc') ? parseInt(searchParams.get('economic_bloc')!) : null;
    const urlIndustry = searchParams.get('industry') ? parseInt(searchParams.get('industry')!) : null;
    const urlTag = searchParams.get('tag') ? parseInt(searchParams.get('tag')!) : null;
    const urlIsicCode = searchParams.get('isic_code') ? parseInt(searchParams.get('isic_code')!) : null;
    const urlHsCode = searchParams.get('hs_code') ? parseInt(searchParams.get('hs_code')!) : null;
    const urlCountry = searchParams.get('country') ? parseInt(searchParams.get('country')!) : null;
    const urlLanguage = (searchParams.get('language') as 'all' | 'arabic' | 'english') || 'all';
    const urlPriceFilter = searchParams.get('paid') || null;
    const urlRangeStart = searchParams.get('range_start') || null;
    const urlRangeEnd = searchParams.get('range_end') || null;
    const urlAccuracy = (searchParams.get('accuracy') as 'any' | 'all') || 'all';
    const urlRole = (searchParams.get('role') as 'all' | 'company' | 'individual') || 'all';
    
    
    // Set loading to true immediately if we have any search parameters
    const hasSearchParams = query || type || language || country || categoryType || accuracy || 
                           urlIndustry || urlRegion || urlEconomicBloc || urlIsicCode || urlHsCode || urlRole;
    if (hasSearchParams) {
      setLoading(true);
    }
    
    // Trigger search if we have query parameters OR other search parameters that should show results
    const shouldTriggerSearch = query || type || accuracy || language || country || categoryType ||
                               urlIndustry || urlRegion || urlEconomicBloc || urlIsicCode || urlHsCode || urlRole;
    
    if (shouldTriggerSearch) {
      
      const triggerSearch = async () => {
        try {
          const handleError = (errorMessage: string) => {
            toast.error(errorMessage, 'Validation Error');
          };
          
          // Use URL parameters directly to avoid state synchronization issues
          const response = await fetchSearchResults(
            query?.trim() || '', // Use empty string if no query - backend should return all results
            type || 'knowledge',
            locale,
            currentPage,
            activeTab,
            urlLanguage,
            urlCountry,
            urlRegion,
            urlEconomicBloc,
            urlIsicCode,
            categoryType || 'all',
            30, // perPage
          handleError, // onError callback
          urlIndustry, // Use URL value directly
          urlTag,
          urlPriceFilter,
          urlHsCode,
          urlAccuracy,
          urlRole,
          urlRangeStart,
          urlRangeEnd
        );
          
          setSearchResults(response.data || []);
          setTotalPages(response.meta?.last_page || 1);
          setTotalItems(response.meta?.total || 0);
          
          // Update the search query and type state to match URL parameters
          setSearchQuery(query || '');
          if (type) setSearchType(type);
          setPriceFilter(urlPriceFilter);
          
          // Update the previous search query reference to avoid duplicate searches
          prevSearchQueryRef.current = query || '';
          
          // Fetch statistics if search type is knowledge using URL parameters directly
          if ((type || 'knowledge') === 'knowledge') {
            try {
              const statsResponse = await fetchStatisticsPerType(
                query?.trim() || '',
                locale,
                urlLanguage,
                urlCountry,
                urlRegion,
                urlEconomicBloc,
                urlIsicCode,
                urlTag,
                urlIndustry, // Use URL value directly
                urlPriceFilter,
                urlHsCode,
                urlAccuracy,
                urlRole,
                urlRangeStart,
                urlRangeEnd,
                null, // coverStartFilter
                null, // coverEndFilter
                (errorMsg) => toast.error(errorMsg, 'Statistics Error')
              );
              setStatistics(statsResponse.data || []);
            } catch (error) {
              setStatistics([]);
            }
          } else {
            setStatistics([]);
          }
        } catch (error) {
          console.error('Initial search failed:', error);
          toast.error('Failed to fetch search results. Please try again later.', 'Error');
        } finally {
          setLoading(false);
        }
      };
      
      triggerSearch();
    } else if (hasSearchParams) {
      // If we have other search parameters but no query, still set loading off after a brief moment
      setTimeout(() => setLoading(false), 100);
    }
    
    // Set initialized after handling initial URL parameters
    setInitialized(true);
  }, [searchParams, locale, currentPage, activeTab, initialized]);
  
  // Listen for changes in URL params after initial mount
  useEffect(() => {
    // Skip the first render since we handle it in the mount effect above
    if (!initialized) {
      return;
    }
    
    // Skip if a page change is in progress to prevent interference
    if (isPageChangeInProgressRef.current) {
      return;
    }
    
    // Skip if a search type change is in progress to prevent interference
    if (isSearchTypeChangingRef.current) {
      return;
    }
    
    // Skip if a filter reset is in progress to prevent interference
    if (isFilterResetInProgressRef.current) {
      return;
    }
    
    // Skip if pagination flags are active
    if (skipNextSearchEffectRef.current) {
      return;
    }
    
    // CRITICAL: Skip if only the page parameter changed (pagination request)
    // Check if this is only a page parameter change
    const currentUrlParams = new URLSearchParams(window.location.search);
    const expectedUrlParams = new URLSearchParams();
    
    // Build expected URL params based on current state
    if (searchQuery && searchQuery.trim() !== '') expectedUrlParams.set('keyword', searchQuery);
    expectedUrlParams.set('search_type', searchType);
    if (languageFilter && languageFilter !== 'all') expectedUrlParams.set('language', languageFilter);
    if (countryFilter !== null) expectedUrlParams.set('country', countryFilter.toString());
    if (regionFilter !== null) expectedUrlParams.set('region', regionFilter.toString());
    if (economicBlocFilter !== null) expectedUrlParams.set('economic_bloc', economicBlocFilter.toString());
    if (industryFilter !== null) expectedUrlParams.set('industry', industryFilter.toString());
    if (isicCodeFilter !== null) expectedUrlParams.set('isic_code', isicCodeFilter.toString());
    if (hsCodeFilter !== null) expectedUrlParams.set('hs_code', hsCodeFilter.toString());
    if (tagFilter !== null) expectedUrlParams.set('tag', tagFilter.toString());
    if (priceFilter !== null) expectedUrlParams.set('paid', priceFilter);
    if (selectedCategory && selectedCategory !== 'all') expectedUrlParams.set('type', selectedCategory);
    if (accuracyFilter && accuracyFilter !== 'all') expectedUrlParams.set('accuracy', accuracyFilter);
    if (roleFilter && roleFilter !== 'all') expectedUrlParams.set('role', roleFilter);
    if (currentPage && currentPage > 1) expectedUrlParams.set('page', currentPage.toString());
    
    // Compare URLs without page parameter
    const currentWithoutPage = new URLSearchParams(currentUrlParams);
    const expectedWithoutPage = new URLSearchParams(expectedUrlParams);
    currentWithoutPage.delete('page');
    expectedWithoutPage.delete('page');
    
    // If only page parameter is different, skip this effect (let pagination handle it)
    if (currentWithoutPage.toString() === expectedWithoutPage.toString()) {
      return;
    }
    
    // For subsequent URL changes - use a batch update approach to avoid race conditions
    const urlQuery = searchParams.get('keyword');
    const urlType = searchParams.get('search_type') as 'knowledge' | 'insighter' || 'knowledge';
    const urlLanguage = searchParams.get('language') as 'all' | 'arabic' | 'english';
    const urlCountry = searchParams.get('country') ? parseInt(searchParams.get('country')!) : null;
    const urlRegion = searchParams.get('region') ? parseInt(searchParams.get('region')!) : null;
    const urlEconomicBloc = searchParams.get('economic_bloc') ? parseInt(searchParams.get('economic_bloc')!) : null;
    const urlIndustry = searchParams.get('industry') ? parseInt(searchParams.get('industry')!) : null;
    const urlTag = searchParams.get('tag') ? parseInt(searchParams.get('tag')!) : null;
    const urlIsicCode = searchParams.get('isic_code') ? parseInt(searchParams.get('isic_code')!) : null;
    const urlHsCode = searchParams.get('hs_code') ? parseInt(searchParams.get('hs_code')!) : null;
    const urlCategory = searchParams.get('type');
    const urlAccuracy = searchParams.get('accuracy') as 'any' | 'all';
    const urlPriceFilter = searchParams.get('paid');
    const urlRangeStart = searchParams.get('range_start');
    const urlRangeEnd = searchParams.get('range_end');
    const urlCoverStart = searchParams.get('cover_start');
    const urlCoverEnd = searchParams.get('cover_end');
    const urlRole = searchParams.get('role') as 'all' | 'company' | 'individual' || 'all';
    const urlPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    
    // Batch all state updates to avoid multiple re-renders and race conditions
    const updateStates = () => {
      // Handle search query and type updates
      if (urlQuery !== searchQuery) {
        setSearchQuery(urlQuery || '');
        // Reset the empty query flag to ensure search runs with the new query
        emptyQueryCalledRef.current = false;
      }
      
      if (urlType && urlType !== searchType) {
        setSearchType(urlType);
      }
      
      // Handle language filter
      if (urlLanguage && urlLanguage !== languageFilter) {
        setLanguageFilter(urlLanguage);
      } else if (!urlLanguage && languageFilter !== 'all') {
        setLanguageFilter('all');
      }
      
      // Handle numeric filters
      if (urlCountry !== countryFilter) {
        setCountryFilter(urlCountry);
      }
      
      if (urlRegion !== regionFilter) {
        setRegionFilter(urlRegion);
      }
      
      if (urlEconomicBloc !== economicBlocFilter) {
        setEconomicBlocFilter(urlEconomicBloc);
      }
      
      if (urlIndustry !== industryFilter) {
        setIndustryFilter(urlIndustry);
      }
      if (urlTag !== tagFilter) {
        setTagFilter(urlTag);
      }
      
      if (urlIsicCode !== isicCodeFilter) {
        setIsicCodeFilter(urlIsicCode);
      }
      
      if (urlHsCode !== hsCodeFilter) {
        setHsCodeFilter(urlHsCode);
      }
      
      if (urlPriceFilter !== priceFilter) {
        setPriceFilter(urlPriceFilter);
      }

      if (urlRangeStart !== rangeStartFilter) {
        setRangeStartFilter(urlRangeStart);
      }

      if (urlRangeEnd !== rangeEndFilter) {
        setRangeEndFilter(urlRangeEnd);
      }

      // Handle year of study parameter (cover_start and cover_end)
      const urlYearOfStudy = (urlCoverStart || urlCoverEnd) ? {
        startYear: urlCoverStart ? parseInt(urlCoverStart) : null,
        endYear: urlCoverEnd ? parseInt(urlCoverEnd) : null,
      } : null;

      if (JSON.stringify(urlYearOfStudy) !== JSON.stringify(yearOfStudyFilter)) {
        setYearOfStudyFilter(urlYearOfStudy);
      }

      // Handle category parameter
      if (urlCategory && urlCategory !== selectedCategory) {
        setSelectedCategory(urlCategory);
      } else if (!urlCategory && selectedCategory !== 'all') {
        setSelectedCategory('all');
      }
      
      // Handle accuracy parameter
      if (urlAccuracy && urlAccuracy !== accuracyFilter) {
        setAccuracyFilter(urlAccuracy);
      } else if (!urlAccuracy && accuracyFilter !== 'all') {
        setAccuracyFilter('all');
      }
      
      // Handle role parameter
      if (urlRole && urlRole !== roleFilter) {
        setRoleFilter(urlRole);
      }
      
          // Handle page parameter - CRITICAL for pagination
    // ONLY update page if we're not in the middle of a pagination operation
    if (urlPage !== currentPage && !isPageChangeInProgressRef.current && !skipNextSearchEffectRef.current) {
      setCurrentPage(urlPage);
    } else if (isPageChangeInProgressRef.current || skipNextSearchEffectRef.current) {
    }
    };
    
    updateStates();
  }, [searchParams, initialized]);
  

  // Ref to track URL update timeout
  const urlUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle immediate query change for URL updates - REMOVED LOADING STATE
  const handleQueryChange = useCallback((query: string) => {
    // Skip URL updates if component is still initializing to prevent overriding incoming URL parameters
    if (!initialized) {
      return;
    }

    // Clear previous timeout if user is still typing
    if (urlUpdateTimeoutRef.current) {
      clearTimeout(urlUpdateTimeoutRef.current);
    }

    // Debounce URL updates to avoid interfering with typing and suggestions
    urlUpdateTimeoutRef.current = setTimeout(() => {
      updateUrlWithFilters({ query: query });
    }, 1000); // Wait 1 second after user stops typing
  }, [updateUrlWithFilters, initialized]);

  // Dedicated search function for explicit user actions (Enter, button click, suggestion selection)
  const executeSearch = useCallback(async (queryToSearch?: string) => {
    const query = queryToSearch || searchQuery.trim();
    
    // Update the search query state if a specific query was provided (from suggestion selection)
    if (queryToSearch && queryToSearch !== searchQuery) {
      setSearchQuery(queryToSearch);
    }
    
    // Update URL with search parameters
    updateUrlWithFilters({ query: query, type: searchType });
    
    // Update the search params ref to track this search
    searchParamsRef.current.searchQuery = query;
    prevSearchQueryRef.current = query;
    
    setLoading(true);
    
    try {
      const handleError = (errorMessage: string) => {
        toast.error(errorMessage, 'Validation Error');
      };
      
      
      const response = await fetchSearchResults(
        query,
        searchType,
        locale,
        1, // Always start at page 1 for new searches
        activeTab,
        languageFilter,
        countryFilter,
        regionFilter,
        economicBlocFilter,
        isicCodeFilter,
        selectedCategory !== 'all' ? selectedCategory : null,
        30, // perPage
        handleError,
        industryFilter,
        tagFilter,
        priceFilter,
        hsCodeFilter,
        accuracyFilter,
        roleFilter,
        rangeStartFilter,
        rangeEndFilter,
        yearOfStudyFilter?.startYear?.toString() || null,
        yearOfStudyFilter?.endYear?.toString() || null
      );



      // Handle search API response format
      setSearchResults(response.data || []);
      setTotalPages(response.meta?.last_page || 1);
      setTotalItems(response.meta?.total || 0);
      setCurrentPage(1); // Reset to page 1 for new searches
      
      // Fetch statistics if search type is knowledge
      await fetchStatisticsIfNeeded(query, searchType);
    } catch (error) {
      console.error('Explicit search failed:', error);
      setKnowledgeItems([]);
      setSearchResults([]);
      toast.error('Failed to fetch search results. Please try again later.', 'Error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchType, locale, activeTab, languageFilter, countryFilter, regionFilter, economicBlocFilter, isicCodeFilter, selectedCategory, industryFilter, priceFilter, hsCodeFilter, updateUrlWithFilters, toast, accuracyFilter, roleFilter, rangeStartFilter, rangeEndFilter, yearOfStudyFilter]);

  // Handle search submission (Enter key or search button)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Always execute search, even with empty query to show all results
    executeSearch();
  };

  // Create a stable reference for the search parameters to prevent unnecessary API calls
  const searchParamsRef = useRef({
    locale,
    currentPage,
    languageFilter,
    countryFilter,
    regionFilter,
    economicBlocFilter,
    tagFilter,
    activeTab,
    searchQuery,
    searchType,
    selectedCategory,
    industryFilter,
    isicCodeFilter,
    hsCodeFilter,
    priceFilter,
    accuracyFilter,
    roleFilter,
    rangeStartFilter,
    rangeEndFilter,
    yearOfStudyFilter
  });
  
  // Track previous search query to avoid redundant API calls
  const prevSearchQueryRef = useRef(searchQuery);
  
  // Track when a direct page change is in progress to prevent other effects from interfering
  const isPageChangeInProgressRef = useRef(false);

  // Track the last page that was directly requested through pagination
  const lastDirectPageRef = useRef<number | null>(null);

  // Track if we should skip the next search effect run (to prevent overriding pagination)
  const skipNextSearchEffectRef = useRef(false);
  
  // Flag to prevent main search effect from running during search type changes
  const isSearchTypeChangingRef = useRef(false);
  
  // Flag to prevent main search effect from running during filter reset
  const isFilterResetInProgressRef = useRef(false);

  // COMPLETELY NEW SIMPLE PAGINATION SYSTEM
  const handlePageChange = useCallback(async (newPage: number) => {
    
    // Step 1: Set flags to prevent any other effects from interfering
    isPageChangeInProgressRef.current = true;
    skipNextSearchEffectRef.current = true;
    
    // Step 2: Update current page state immediately (this will make UI show correct active page)
    setCurrentPage(newPage);
    setLoading(true);
    
    // Step 3: Build and update URL with new page
    const params = new URLSearchParams();
    if (searchQuery?.trim()) params.set('keyword', searchQuery.trim());
    params.set('search_type', searchType);
    if (languageFilter !== 'all') params.set('language', languageFilter);
    if (countryFilter) params.set('country', countryFilter.toString());
    if (regionFilter) params.set('region', regionFilter.toString());
    if (economicBlocFilter) params.set('economic_bloc', economicBlocFilter.toString());
    if (industryFilter) params.set('industry', industryFilter.toString());
    if (tagFilter) params.set('tag', tagFilter.toString());
    if (isicCodeFilter) params.set('isic_code', isicCodeFilter.toString());
    if (hsCodeFilter) params.set('hs_code', hsCodeFilter.toString());
    if (priceFilter) params.set('paid', priceFilter);
    if (selectedCategory && selectedCategory !== 'all') params.set('type', selectedCategory);
    if (accuracyFilter !== 'all') params.set('accuracy', accuracyFilter);
    if (roleFilter !== 'all') params.set('role', roleFilter);
    params.set('page', newPage.toString());
    params.set('per_page', '30');
    
    const newUrl = `/${locale}/home?${params.toString()}`;
    
    // Update URL without triggering navigation
    window.history.pushState({}, '', newUrl);
    
    // Step 4: Make API call with new page
    try {
      const response = await fetchSearchResults(
        searchQuery?.trim() || '',
        searchType,
        locale,
        newPage,
        activeTab,
        languageFilter,
        countryFilter,
        regionFilter,
        economicBlocFilter,
        isicCodeFilter,
        selectedCategory !== 'all' ? selectedCategory : 'all',
        30,
        (error) => toast.error(error, 'Error'),
        industryFilter,
        tagFilter,
        priceFilter,
        hsCodeFilter,
        accuracyFilter,
        roleFilter,
        rangeStartFilter,
        rangeEndFilter,
        yearOfStudyFilter?.startYear?.toString() || null,
        yearOfStudyFilter?.endYear?.toString() || null
      );

      
      // Step 5: Update results
      setSearchResults(response.data || []);
      setTotalPages(response.meta?.last_page || 1);
      setTotalItems(response.meta?.total || 0);
      
      
    } catch (error) {
      console.error('📄 Pagination error:', error);
      toast.error('Failed to load page', 'Error');
    } finally {
      setLoading(false);
      
      // Step 6: Reset flags after a longer delay to prevent interference
      setTimeout(() => {
        isPageChangeInProgressRef.current = false;
        skipNextSearchEffectRef.current = false;
      }, 2000); // Increased to 2 seconds to ensure no interference
    }
  }, [searchQuery, searchType, locale, activeTab, languageFilter, countryFilter, regionFilter, economicBlocFilter, isicCodeFilter, selectedCategory, industryFilter, priceFilter, hsCodeFilter, accuracyFilter, roleFilter, rangeStartFilter, rangeEndFilter, yearOfStudyFilter, toast]);

  // Track the last time an API call was made to prevent too many calls
  const lastApiCallTimeRef = useRef<number>(0);
  const MIN_API_CALL_INTERVAL = 500; // milliseconds
  
  // Add a debounce timer ref for search effect
  const searchEffectTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch search results when other parameters change (BUT NOT searchQuery - only on explicit search actions)
  useEffect(() => {

    // Skip if not initialized yet (initial search is handled by the mount effect)
    if (!initialized) {
      return;
    }
    
    // Skip if a search type change is in progress to prevent interference
    if (isSearchTypeChangingRef.current) {
      return;
    }

    // Skip if a direct page change is in progress to prevent interference
    if (isPageChangeInProgressRef.current) {
      return;
    }

    // Skip if a filter reset is in progress to prevent interference
    if (isFilterResetInProgressRef.current) {
      return;
    }

    // Skip this effect run if we just completed a pagination request
    if (skipNextSearchEffectRef.current) {
      return; // Don't reset the flag here - let pagination handle it
    }

    
    // If this effect runs due to a change in search parameters (not pagination),
    // we should reset the lastDirectPageRef to ensure proper page handling
    if (!isPageChangeInProgressRef.current) {
      lastDirectPageRef.current = null;
    }
    
    // Update the reference values (EXCLUDING searchQuery - we don't want to auto-search on typing)
    const params = searchParamsRef.current;
    const paramsChanged =
      params.locale !== locale ||
      params.languageFilter !== languageFilter ||
      params.countryFilter !== countryFilter ||
      params.regionFilter !== regionFilter ||
      params.economicBlocFilter !== economicBlocFilter ||
      params.tagFilter !== tagFilter ||
      params.activeTab !== activeTab ||
      params.searchType !== searchType ||
      params.selectedCategory !== selectedCategory ||
      params.industryFilter !== industryFilter ||
      params.isicCodeFilter !== isicCodeFilter ||
      params.hsCodeFilter !== hsCodeFilter ||
      params.priceFilter !== priceFilter ||
      params.accuracyFilter !== accuracyFilter ||
      params.roleFilter !== roleFilter ||
      params.rangeStartFilter !== rangeStartFilter ||
      params.rangeEndFilter !== rangeEndFilter ||
      JSON.stringify(params.yearOfStudyFilter) !== JSON.stringify(yearOfStudyFilter);
    
    // Log parameter changes for debugging (but don't include searchQuery)
    if (paramsChanged) {
    }
    
    // Update reference (but keep the searchQuery as is - don't update it here)
    searchParamsRef.current = {
      locale,
      currentPage,
      languageFilter,
      countryFilter,
      regionFilter,
      economicBlocFilter,
      tagFilter,
      activeTab,
      searchQuery: searchParamsRef.current.searchQuery, // Keep previous value
      searchType,
      selectedCategory,
      industryFilter,
      isicCodeFilter,
      hsCodeFilter,
      priceFilter,
      accuracyFilter,
      roleFilter,
      rangeStartFilter,
      rangeEndFilter,
      yearOfStudyFilter
    };
    
    // If nothing changed, don't fetch
    if (!paramsChanged) {
      return;
    }
    
    // SET LOADING TO TRUE IMMEDIATELY when parameters change
    setLoading(true);
    
    // Clear existing results immediately to prevent flickering
    setSearchResults([]);
    setKnowledgeItems([]);
    
    // Clear any existing timer
    if (searchEffectTimerRef.current) {
      clearTimeout(searchEffectTimerRef.current);
    }
    
    // Debounce only the API call, not the loading state
    searchEffectTimerRef.current = setTimeout(async () => {
      // Check if enough time has passed since the last API call
      const currentTime = Date.now();
      const timeSinceLastCall = currentTime - lastApiCallTimeRef.current;
      
      if (timeSinceLastCall < MIN_API_CALL_INTERVAL) {
        // Still turn off loading even if we skip the API call
        setLoading(false);
        return;
      }
      
      // Update the last API call time
      lastApiCallTimeRef.current = currentTime;
      
      // Loading is already true from above, no need to set it again
      
      try {        
        const handleError = (errorMessage: string) => {
          toast.error(errorMessage, 'Validation Error');
        };
        
        // Use the current searchQuery state for the API call
        const keyword = searchQuery.trim();
        const search_type = searchType;
        
        // Important: Use page 1 for NON-PAGE filter changes, but respect current page for pagination
        // This resets pagination when filters change but preserves it for page-only changes
        const pageToRequest = lastDirectPageRef.current || currentPage || 1;
        
        
        const response = await fetchSearchResults(
          keyword,
          search_type,
          locale,
          pageToRequest,
          activeTab,
          languageFilter,
          countryFilter,
          regionFilter,
          economicBlocFilter,
          isicCodeFilter,
          selectedCategory !== 'all' ? selectedCategory : null, // Use the selected category
          30, // perPage - consistent with UI calculation (30 items per page)
          handleError, // onError callback
          industryFilter,
          tagFilter,
          priceFilter,
          hsCodeFilter,
          accuracyFilter,
          roleFilter,
          rangeStartFilter,
          rangeEndFilter,
          yearOfStudyFilter?.startYear?.toString() || null,
          yearOfStudyFilter?.endYear?.toString() || null
        );

        setSearchResults(response.data || []);
        setTotalPages(response.meta?.last_page || 1);
        setTotalItems(response.meta?.total || 0);
        
        // Only reset pagination to page 1 when filter parameters have changed (not for pagination requests)
        if (!lastDirectPageRef.current) {
          setCurrentPage(1);
        } else {
        }
        
        // Fetch statistics if search type is knowledge
        await fetchStatisticsIfNeeded(keyword, search_type);
      } catch (error) {
        console.error('API request failed:', error);
        setKnowledgeItems([]);
        setSearchResults([]);
        
        // Show a generic error message for other types of errors
        toast.error('Failed to fetch search results. Please try again later.', 'Error');
      } finally {
        setLoading(false);
      }
    }, 150); // Reduced debounce delay to 150ms for faster response
    
    // Cleanup function to clear the timer
    return () => {
      if (searchEffectTimerRef.current) {
        clearTimeout(searchEffectTimerRef.current);
      }
    };
  // REMOVED searchQuery from dependencies - only trigger on filter changes, not query changes
  }, [locale, languageFilter, countryFilter, regionFilter, economicBlocFilter, tagFilter, activeTab, searchType, initialized, toast, selectedCategory, industryFilter, isicCodeFilter, hsCodeFilter, priceFilter, accuracyFilter, roleFilter, rangeStartFilter, rangeEndFilter, yearOfStudyFilter, fetchStatisticsIfNeeded]);

  return (
   <main className='min-h-screen flex flex-col bg-gray-50'>
     <style dangerouslySetInnerHTML={{ __html: customScrollbarStyle }} />
     
     {/* Global Loading Overlay */}
  
     <section className="relative flex-1">
      <PageIllustration />
  {/* Hero Banner Section */}
  <div className="relative overflow-hidden pt-16 pb-16">
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
         <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center ">
           {locale === 'ar' ? 'ابحث في التقارير والبيانات والرؤى' : 'Search data, reports, and insights'}
         </h1>
         <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-500 text-center " >
           {locale === 'ar' ? 'ابدأ الآن' : 'Start exploring now'}
         </h1>
       </div>
            {/* <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{locale === 'ar' ? 'اكتشف المعرفة بسرعة الضوء' : 'Discover Knowledge at Light Speed'}</h1>*/}
           
           {/* <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg md:mt-5 md:max-w-4xl md:text-lg">
             {locale === 'ar' ? 'الوصول للمعلومات المميزة والمقالات والتحليلات. ابحث واكتشف وتعلم.' : 'Access premium information, data, and insights. Search, discover, and learn.'}
           </p>  */}
           
           {/* Search Bar Prominent Placement */}
           <div className="mx-auto mt-8 max-w-4xl ">
             <SearchBar
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
               searchType={searchType}
               setSearchType={handleSearchTypeChange}
               locale={locale}
               placeholder={locale === 'ar' ? 'إبحث عن رؤى أو إنسايتر...' : 'Search for Insights or Insighter...'}
               onSubmit={handleSubmit}
               onSearch={executeSearch}
              onQueryChange={handleQueryChange}
              isicCodeFilter={isicCodeFilter?.toString() || null}
              setIsicCodeFilter={handleIsicCodeFilterChange}
              hsCodeFilter={hsCodeFilter?.toString() || null}
              setHsCodeFilter={handleHsCodeFilterChange}
              onIsicLoadingChange={setIsLoadingIsic}
              onHsLoadingChange={setIsLoadingHs}
              onDataLoadedChange={setIsDataLoaded}
             />
           </div>
            
                      {/* Category Icons */}
           {/* Only show categories when searchType is 'knowledge' */}
        
             <div className="mt-4">
        {searchType === 'knowledge' && (       <p className="text-sm font-medium text-gray-500 mb-4">{locale === 'ar' ? 'استكشف بحسب الفئة' : 'Explore by category'}</p>)}
               <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                 {/* Using the top-level selectedCategory state */}
                 {(() => {
                   // Function to handle category selection and trigger search API directly
                   const handleCategorySelect = async (category: string) => {
                     // Check if the category is already selected to prevent unnecessary loading
                     if (selectedCategory === category) {
                       return;
                     }
                     
                     // Update the top-level state
                     setSelectedCategory(category);
                     // Update URL with new category
                     updateUrlWithFilters({ category: category });
                     
                     // Reset to page 1 when category changes
                     setCurrentPage(1);
                     
                     // The main search effect will be triggered by the setSelectedCategory above
                     // and will handle the API call and loading state
                   };
                   
                   // Call handleCategorySelect with 'all' on initial load to get results
                   React.useEffect(() => {
                     // Only call when searchResults is empty AND we're not in the middle of pagination
                     // AND there's no current search query AND no URL search parameters to prevent overriding existing search results
                     const hasUrlSearchParams = searchParams.get('keyword') || 
                                               searchParams.get('search_type') || 
                                               searchParams.get('accuracy') || 
                                               searchParams.get('language') || 
                                               searchParams.get('country') || 
                                               searchParams.get('type');
                     
                     // Only trigger if no results, not loading, initialized, no search query, and no URL params
                     if (searchResults.length === 0 && !loading && initialized && 
                         !isPageChangeInProgressRef.current && !skipNextSearchEffectRef.current &&
                         !searchQuery.trim() && !hasUrlSearchParams && searchType === 'knowledge') {
                       handleCategorySelect('all');
                     }
                   // eslint-disable-next-line react-hooks/exhaustive-deps
                   }, [searchResults.length, loading, initialized, searchParams, searchType]);
                   
                   return (
                    searchType === 'knowledge' && (
                      <>
                      {/* Show loading indicator when fetching results */}
                 
                      <CategoryIconBox 
                        name="all" 
                        label="All" 
                        locale={locale} 
                        arLabel="الكل" 
                        isSelected={selectedCategory === 'all'} 
                        onClick={(e) => { e.preventDefault(); handleCategorySelect('all'); }} 
                        count={getCategoryCount('all')}
                      />
                      {/* Separator between "All" and specific categories */}
                      <div className="hidden sm:block w-px h-16 bg-gray-300 mx-2"></div>
                      <CategoryIconBox 
                        name="data" 
                        label="Data" 
                        locale={locale} 
                        arLabel="البيانات" 
                        isSelected={selectedCategory === 'data'} 
                        onClick={(e) => { e.preventDefault(); handleCategorySelect('data'); }} 
                        count={getCategoryCount('data')}
                      />
                      <CategoryIconBox 
                        name="report" 
                        label="Reports" 
                        locale={locale} 
                        arLabel="التقارير" 
                        isSelected={selectedCategory === 'report'} 
                        onClick={(e) => { e.preventDefault(); handleCategorySelect('report'); }} 
                        count={getCategoryCount('report')}
                      />
                      <CategoryIconBox 
                        name="statistic" 
                        label="Statistics" 
                        locale={locale} 
                        arLabel="الإحصائيات" 
                        isSelected={selectedCategory === 'statistic'} 
                        onClick={(e) => { e.preventDefault(); handleCategorySelect('statistic'); }} 
                        count={getCategoryCount('statistic')}
                      />
                      <CategoryIconBox 
                        name="manual" 
                        label="Manuals" 
                        locale={locale} 
                        arLabel="الأدلة" 
                        isSelected={selectedCategory === 'manual'} 
                        onClick={(e) => { e.preventDefault(); handleCategorySelect('manual'); }} 
                        count={getCategoryCount('manual')}
                      />
                      <CategoryIconBox 
                        name="course" 
                        label="Courses" 
                        locale={locale} 
                        arLabel="الدورات" 
                        isSelected={selectedCategory === 'course'} 
                        onClick={(e) => { e.preventDefault(); handleCategorySelect('course'); }} 
                        count={getCategoryCount('course')}
                      />
                    </>
                    )
                    
                   );
                 })()}
               </div>
             </div>
         </div>
       </div>
     </div>
      {/* Main content area */}
      <div className="flex flex-col relative z-3 pt-2 pb-8">
        <div className="w-full">
          <div className="mx-auto max-w-8xl 2xl:max-w-none 2xl:mx-8 px-4 sm:px-6">
            {/* Total results display moved to ResultsSection */}
            
            {/* Filter toggle button */}
            <div className="mb-1 flex justify-start">
              <button
                onClick={() => {
                  // On tablet/mobile, open drawer instead of toggling sidebar
                  if (isTabletOrMobile) {
                    setIsFilterDrawerOpen(true);
                  } else {
                    setFiltersVisible(!filtersVisible);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              >
                {filtersVisible && !isTabletOrMobile ? (
                  <>
                   <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g clipRule="evenodd" fillRule="evenodd"><path d="m11 20v-16h2v16z" fill="#90caea"/><g fill="#3747d6"><path d="m16.9142 12 2.7929-2.79289-1.4142-1.41422-3.5 3.50001c-.3905.3905-.3905 1.0237 0 1.4142l3.5 3.5 1.4142-1.4142z"/><path d="m7.0858 12-2.79289-2.79289 1.41421-1.41422 3.5 3.50001c.39053.3905.39053 1.0237 0 1.4142l-3.5 3.5-1.41421-1.4142z"/></g></g></svg>
                    {locale === 'ar' ? 'إخفاء الفلاتر' : 'Hide Filters'}
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
<path d="M12.5 17.627H14.6973V19.0918H12.5V17.627Z" fill="#4DA6FF"/>
<path d="M12.5 11.7676H20.5566V13.2324H12.5V11.7676Z" fill="#4DA6FF"/>
<path d="M12.5 5.9082H14.6973V7.37305H12.5V5.9082Z" fill="#4DA6FF"/>
<path d="M15.4297 8.83789C14.2181 8.83789 13.2324 7.85225 13.2324 6.64062C13.2324 5.429 14.2181 4.44336 15.4297 4.44336C16.6413 4.44336 17.627 5.429 17.627 6.64062C17.627 7.85225 16.6413 8.83789 15.4297 8.83789Z" fill="#4D5B99"/>
<path d="M15.4297 20.5566C14.2181 20.5566 13.2324 19.571 13.2324 18.3594C13.2324 17.1478 14.2181 16.1621 15.4297 16.1621C16.6413 16.1621 17.627 17.1478 17.627 18.3594C17.627 19.571 16.6413 20.5566 15.4297 20.5566Z" fill="#4D5B99"/>
</svg>

                    {locale === 'ar' ? 'إظهار الفلاتر' : 'Show Filters'}
                  </>
                )}
              </button>
            </div>
            
            {/* Responsive layout for filters and content */}
            <div className="flex flex-col lg:flex-row gap-8 relative">
              
              {/* Filters Sidebar */}
              <div 
                className={`lg:flex-shrink-0 transition-all duration-300 ease-in-out ${
                  filtersVisible 
                    ? 'overflow-visible lg:w-80 opacity-100 ' 
                    : 'overflow-hidden lg:w-0 opacity-0 max-h-0'
                }`}
              >
                <div className={`sticky rounded-md top-2 transition-transform duration-300 ease-in-out ${
                  filtersVisible ? 'transform translate-x-0' : 'transform -translate-x-full lg:translate-x-0'
                }`}>
                    <FilterBox
                      locale={locale}
                      searchType={searchType}
                      languageFilter={languageFilter}
                      setLanguageFilter={handleLanguageFilterChange}
                      countryFilter={countryFilter}
                      setCountryFilter={handleCountryFilterChange}
                      regionFilter={regionFilter}
                      setRegionFilter={handleRegionFilterChange}
                      economicBlocFilter={economicBlocFilter}
                      setEconomicBlocFilter={handleEconomicBlocFilterChange}
                      tagFilter={tagFilter}
                      setTagFilter={handleTagFilterChange}
                      isicCodeFilter={isicCodeFilter?.toString() || null}
                      setIsicCodeFilter={handleIsicCodeFilterChange}
                      industryFilter={industryFilter}
                      setIndustryFilter={handleIndustryFilterChange}
                      hsCodeFilter={hsCodeFilter?.toString() || null}
                      setHsCodeFilter={handleHsCodeFilterChange}
                      priceFilter={priceFilter}
                      setPriceFilter={handlePriceFilterChange}
                      rangeStartFilter={rangeStartFilter}
                      setRangeStartFilter={handleRangeStartFilterChange}
                      rangeEndFilter={rangeEndFilter}
                      setRangeEndFilter={handleRangeEndFilterChange}
                      accuracyFilter={accuracyFilter}
                      setAccuracyFilter={handleAccuracyFilterChange}
                      roleFilter={roleFilter}
                      setRoleFilter={handleRoleFilterChange}
                      yearOfStudyFilter={yearOfStudyFilter}
                      setYearOfStudyFilter={handleYearOfStudyFilterChange}
                      resetFilters={resetFilters}
                      isDrawerOpen={isFilterDrawerOpen}
                      setIsDrawerOpen={setIsFilterDrawerOpen}
                    />
                </div>
              </div>
              {/* Main Content */}
              <div className={`transition-all duration-300 ease-in-out ${
                filtersVisible ? 'flex-1' : 'flex-1 lg:max-w-none'
              }`}>
                {/* Search bar above tabs */}
                <div className=" p-4 pt-0 pb-0 rounded-md">
                
                  
                  {/* Content tabs have been removed */}
                </div>
                
                {/* Results section - conditionally show either ResultsSection or InsightersResultsSection based on searchType */}
                {(() => {
                  return searchType === 'insighter' ? (
                    <InsightersResultsSection
                      key={`insighter-section-${searchType}-${totalItems}`}
                      searchQuery={searchQuery}
                      searchResults={searchResults}
                      loading={loading}
                      currentPage={currentPage}
                      totalItems={totalItems}
                      setCurrentPage={setCurrentPage}
                      totalPages={totalPages}
                      locale={locale}
                      onPageChange={handlePageChange}
                    />
                  ) : (
                    <ResultsSection
                key={`results-section-${searchType}-${totalItems}`}
                searchQuery={searchQuery}
                searchResults={searchResults}
                knowledgeItems={knowledgeItems}
                loading={loading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                viewMode={viewMode}
                setViewMode={setViewMode}
                locale={locale}
                onPageChange={handlePageChange}
                searchType={searchType}
                filtersVisible={filtersVisible}
              />
                  );
                })()}
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
