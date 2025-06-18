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
  const initialIndustry = searchParams.get('industry') ? parseInt(searchParams.get('industry')!) : null;
  const initialIsicCode = searchParams.get('isic_code') ? parseInt(searchParams.get('isic_code')!) : null;
  const initialHsCode = searchParams.get('hs_code') ? parseInt(searchParams.get('hs_code')!) : null;
  const initialPriceFilter = searchParams.get('paid') || null;
  const initialCategory = searchParams.get('type') || 'all';
  const initialAccuracy = (searchParams.get('accuracy') as 'any' | 'all') || 'all';
  // Get initial page from URL
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const initialRole = (searchParams.get('role') as 'all' | 'company' | 'individual') || 'all';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<'knowledge' | 'insighter'>(initialType);
  const [activeTab, setActiveTab] = useState<string | null>('all');
  
  // Keep searchType synchronized with URL
  useEffect(() => {
    const urlSearchType = searchParams.get('search_type') as 'knowledge' | 'insighter';
    if (urlSearchType && urlSearchType !== searchType) {
      console.log('Syncing searchType with URL parameter:', urlSearchType);
      setSearchType(urlSearchType);
    }
  }, [searchParams, searchType]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  // Add a useEffect to log searchResults changes for debugging
  useEffect(() => {
    console.log('searchResults state changed:', searchResults);
  }, [searchResults]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [languageFilter, setLanguageFilter] = useState<'all' | 'arabic' | 'english'>(initialLanguage);
  const [countryFilter, setCountryFilter] = useState<number | null>(initialCountry);
  const [regionFilter, setRegionFilter] = useState<number | null>(initialRegion);
  const [economicBlocFilter, setEconomicBlocFilter] = useState<number | null>(initialEconomicBloc);
  const [industryFilter, setIndustryFilter] = useState<number | null>(initialIndustry);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isicCodeFilter, setIsicCodeFilter] = useState<number | null>(initialIsicCode);
  const [hsCodeFilter, setHsCodeFilter] = useState<number | null>(initialHsCode);
  const [priceFilter, setPriceFilter] = useState<string | null>(initialPriceFilter);
  const [accuracyFilter, setAccuracyFilter] = useState<'any' | 'all'>(initialAccuracy);
  const [roleFilter, setRoleFilter] = useState<'all' | 'company' | 'individual'>(initialRole);
  
  // Add state for filter visibility
  const [filtersVisible, setFiltersVisible] = useState(true);
  
  // Add state for statistics
  const [statistics, setStatistics] = useState<StatisticsItem[]>([]);
  
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t4 = useTranslations('Features4');
  
  // Access the toast context
  const toast = useToast();
  
  // Flag to track if component has initialized with URL params
  const [initialized, setInitialized] = useState(false);
  
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
          industryFilter,
          priceFilter,
          hsCodeFilter,
          accuracyFilter,
          roleFilter,
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
      isicCodeFilter, industryFilter, priceFilter, hsCodeFilter, accuracyFilter, roleFilter, toast]);
  
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
  const resetFilters = useCallback(() => {
    // Reset all filter states
    setLanguageFilter('all');
    setCountryFilter(null);
    setRegionFilter(null);
    setEconomicBlocFilter(null);
    setIndustryFilter(null);
    setIsicCodeFilter(null);
    setHsCodeFilter(null);
    setPriceFilter(null);
    setSelectedCategory('all');
    setAccuracyFilter('all');
    setRoleFilter('all');
    
    // Keep only search_type and keyword in URL
    const urlParams = new URLSearchParams();
    if (searchQuery && searchQuery.trim() !== '') urlParams.set('keyword', searchQuery);
    urlParams.set('search_type', searchType);
    
    // Update URL with only search parameters
    router.push(`/${locale}/home?${urlParams.toString()}`, { scroll: false });
  }, [searchQuery, searchType, locale, router]);
  

  
  // Helper function to update URL with all current filter parameters
  const updateUrlWithFilters = useCallback((params: {
    query?: string,
    type?: 'knowledge' | 'insighter',
    language?: 'all' | 'arabic' | 'english',
    country?: number | null,
    region?: number | null,
    economic_bloc?: number | null,
    industry?: number | null,
    isic_code?: number | null,
    hs_code?: number | null,
    category?: string | null,
    paid?: string | null,
    accuracy?: 'any' | 'all',
    role?: 'all' | 'company' | 'individual',
    page?: number
  }) => {
    // Build URL parameters
    const urlParams = new URLSearchParams();
    
    // Get the values to use - prioritize new values from params over current state
    const query = params.query !== undefined ? params.query : searchQuery;
    const type = params.type || searchType;
    const language = params.language !== undefined ? params.language : languageFilter;
    const country = params.country !== undefined ? params.country : countryFilter;
    const region = params.region !== undefined ? params.region : regionFilter;
    const economicBloc = params.economic_bloc !== undefined ? params.economic_bloc : economicBlocFilter;
    const industry = params.industry !== undefined ? params.industry : industryFilter;
    const isicCode = params.isic_code !== undefined ? params.isic_code : isicCodeFilter;
    const hsCode = params.hs_code !== undefined ? params.hs_code : hsCodeFilter;
    const paid = params.paid !== undefined ? params.paid : priceFilter;
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
    if (industry !== null) urlParams.set('industry', industry.toString());
    if (isicCode !== null) urlParams.set('isic_code', isicCode.toString());
    if (hsCode !== null) urlParams.set('hs_code', hsCode.toString());
    if (paid !== null) urlParams.set('paid', paid);
    if (category && category !== 'all') urlParams.set('type', category);
    if (accuracy && accuracy !== 'all') urlParams.set('accuracy', accuracy);
    if (role && role !== 'all') urlParams.set('role', role);
    // Add page parameter if not page 1
    if (page && page > 1) urlParams.set('page', page.toString());
    
    // Update URL without refreshing the page
    router.push(`/${locale}/home?${urlParams.toString()}`, { scroll: false });
  }, [locale, router, searchType, searchQuery, currentPage, languageFilter, countryFilter, regionFilter, economicBlocFilter, industryFilter, isicCodeFilter, hsCodeFilter, priceFilter, selectedCategory, accuracyFilter, roleFilter]);

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
    
    // Update search type state
    setSearchType(type);
    
    // Reset to page 1 when changing search type
    setCurrentPage(1);
    setTotalPages(1);
    setTotalItems(0);
    
    // Update URL with new search type
    updateUrlWithFilters({ type: type, page: 1 });
    
    // Perform the search immediately with the new search type
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
        languageFilter,
        countryFilter,
        regionFilter,
        economicBlocFilter,
        isicCodeFilter,
        selectedCategory !== 'all' ? selectedCategory : null,
        30, // perPage
        handleError,
        industryFilter,
        priceFilter,
        hsCodeFilter,
        accuracyFilter,
        roleFilter
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
  }, [updateUrlWithFilters, locale, activeTab, languageFilter, countryFilter, regionFilter, economicBlocFilter, isicCodeFilter, selectedCategory, industryFilter, priceFilter, hsCodeFilter, accuracyFilter, searchQuery, toast, fetchStatisticsIfNeeded]);

  // Custom setter for language filter that triggers search
  const handleLanguageFilterChange = useCallback((value: 'all' | 'arabic' | 'english') => {
    // Set loading immediately to prevent flickering
    setLoading(true);
    
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
    // Set loading immediately to prevent flickering
    setLoading(true);
    
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
    // Set loading immediately to prevent flickering
    setLoading(true);
    
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
    // Set loading immediately to prevent flickering
    setLoading(true);
    
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
    // Set loading immediately to prevent flickering
    setLoading(true);
    
    // Update the price filter state
    setPriceFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ paid: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for industry filter that triggers search
  const handleIndustryFilterChange = useCallback((value: number | null) => {
    // Set loading immediately to prevent flickering
    setLoading(true);
    
    // Update the industry filter state
    setIndustryFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ industry: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for ISIC code filter that triggers search
  const handleIsicCodeFilterChange = useCallback((value: number | null) => {
    // Set loading immediately to prevent flickering
    setLoading(true);
    
    // Update the ISIC code filter state
    setIsicCodeFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ isic_code: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for HS code filter that triggers search
  const handleHsCodeFilterChange = useCallback((value: number | null) => {
    // Set loading immediately to prevent flickering
    setLoading(true);
    
    // Update the HS code filter state
    setHsCodeFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ hs_code: value });
    
    // Reset to page 1 when filter changes
    setCurrentPage(1);
    
    // The main search effect will be triggered by the state change
  }, [updateUrlWithFilters]);
  
  // Custom setter for accuracy filter that triggers search
  const handleAccuracyFilterChange = useCallback((value: 'any' | 'all') => {
    // Set loading immediately to prevent flickering
    setLoading(true);
    
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
    // Set loading immediately to prevent flickering
    setLoading(true);
    
    // Update the role filter state
    setRoleFilter(value);
    // Update URL with new filter
    updateUrlWithFilters({ role: value });
    
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
    const urlIsicCode = searchParams.get('isic_code') ? parseInt(searchParams.get('isic_code')!) : null;
    const urlHsCode = searchParams.get('hs_code') ? parseInt(searchParams.get('hs_code')!) : null;
    const urlCountry = searchParams.get('country') ? parseInt(searchParams.get('country')!) : null;
    const urlLanguage = (searchParams.get('language') as 'all' | 'arabic' | 'english') || 'all';
    const urlPriceFilter = searchParams.get('paid') || null;
    const urlAccuracy = (searchParams.get('accuracy') as 'any' | 'all') || 'all';
    const urlRole = (searchParams.get('role') as 'all' | 'company' | 'individual') || 'all';
    
    console.log('INITIAL URL PARAMETERS:', {
      query, type, accuracy, language, country, categoryType,
      urlIndustry, urlRegion, urlEconomicBloc, urlIsicCode, urlHsCode, urlRole
    });
    
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
      console.log('URL has search parameters, triggering search with direct URL values');
      
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
            urlPriceFilter,
            urlHsCode,
            urlAccuracy,
            urlRole
          );
          
          setSearchResults(response.data || []);
          setTotalPages(response.meta?.last_page || 1);
          setTotalItems(response.meta?.total || 0);
          
          // Update the search query and type state to match URL parameters
          setSearchQuery(query || '');
          if (type) setSearchType(type);
          
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
                urlIndustry, // Use URL value directly
                urlPriceFilter,
                urlHsCode,
                urlAccuracy,
                urlRole,
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
    
    // For subsequent URL changes - use a batch update approach to avoid race conditions
    const urlQuery = searchParams.get('keyword');
    const urlType = searchParams.get('search_type') as 'knowledge' | 'insighter' || 'knowledge';
    const urlLanguage = searchParams.get('language') as 'all' | 'arabic' | 'english';
    const urlCountry = searchParams.get('country') ? parseInt(searchParams.get('country')!) : null;
    const urlRegion = searchParams.get('region') ? parseInt(searchParams.get('region')!) : null;
    const urlEconomicBloc = searchParams.get('economic_bloc') ? parseInt(searchParams.get('economic_bloc')!) : null;
    const urlIndustry = searchParams.get('industry') ? parseInt(searchParams.get('industry')!) : null;
    const urlIsicCode = searchParams.get('isic_code') ? parseInt(searchParams.get('isic_code')!) : null;
    const urlHsCode = searchParams.get('hs_code') ? parseInt(searchParams.get('hs_code')!) : null;
    const urlCategory = searchParams.get('type');
    const urlAccuracy = searchParams.get('accuracy') as 'any' | 'all';
    const urlPriceFilter = searchParams.get('paid');
    const urlRole = searchParams.get('role') as 'all' | 'company' | 'individual' || 'all';
    
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
      
      if (urlIsicCode !== isicCodeFilter) {
        setIsicCodeFilter(urlIsicCode);
      }
      
      if (urlHsCode !== hsCodeFilter) {
        setHsCodeFilter(urlHsCode);
      }
      
      if (urlPriceFilter !== priceFilter) {
        setPriceFilter(urlPriceFilter);
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
    };
    
    updateStates();
  }, [searchParams, initialized]);
  
  // Function to convert KnowledgeItem array to SearchResultItem array
  const mapToSearchResults = useCallback((items: KnowledgeItem[]) => {
    return items.map((item) => ({
      searchable_id: parseInt(item.slug) || Math.random(), // Use slug as ID or fallback to random
      searchable_type: 'knowledge',
      title: item.title,
      description: item.description,
      url: `/${locale}/knowledge/${item.type}/${item.slug}`,
      type: item.type,
      published_at: item.published_at,
      insighter: item.insighter?.name || '',
      total_price: item.total_price
    }));
  }, [locale]);

  // Ref to track URL update timeout
  const urlUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle immediate query change for URL updates
  const handleQueryChange = useCallback((query: string) => {
    // Clear previous timeout if user is still typing
    if (urlUpdateTimeoutRef.current) {
      clearTimeout(urlUpdateTimeoutRef.current);
    }
    
    // Debounce URL updates to avoid interfering with typing and suggestions
    urlUpdateTimeoutRef.current = setTimeout(() => {
      updateUrlWithFilters({ query: query });
    }, 1000); // Wait 1 second after user stops typing
  }, [updateUrlWithFilters]);

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
      
      console.log('Executing explicit search with query:', query);
      
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
        priceFilter,
        hsCodeFilter,
        accuracyFilter,
        roleFilter
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
  }, [searchQuery, searchType, locale, activeTab, languageFilter, countryFilter, regionFilter, economicBlocFilter, isicCodeFilter, selectedCategory, industryFilter, priceFilter, hsCodeFilter, updateUrlWithFilters, toast, accuracyFilter]);

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
    activeTab,
    searchQuery,
    searchType,
    selectedCategory,
    industryFilter,
    isicCodeFilter,
    hsCodeFilter,
    priceFilter,
    accuracyFilter,
    roleFilter
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

  // Direct page search function to be passed to ResultsSection
  const directSearchByPage = useCallback(async (page: number) => {
    // Log that the function was called for easier debugging
    console.log('DIRECT PAGE SEARCH FUNCTION CALLED WITH PAGE:', page);
    
    if (!initialized) {
      console.warn('Skipping page search - not initialized yet');
      return;
    }
    
    // Always run pagination API calls, even for empty searches
    console.log('EXECUTING DIRECT PAGE SEARCH - page:', page, 'with query:', searchQuery.trim() || '(empty)');
    
    // Set the flag to indicate page change is in progress
    isPageChangeInProgressRef.current = true;
    
    // Track this page as the last directly requested page
    lastDirectPageRef.current = page;
    
    // Set flag to skip the next search effect run and keep it true for a while
    skipNextSearchEffectRef.current = true;
    
    // Direct API call for page changes
    setLoading(true);
    try {
      const handleError = (errorMessage: string) => {
        toast.error(errorMessage, 'Validation Error');
      };
      
      console.log('Making API request for page:', page);
      
      const response = await fetchSearchResults(
        searchQuery.trim(),
        searchType,
        locale,
        page, // Use the page parameter directly
        activeTab,
        languageFilter,
        countryFilter,
        regionFilter,
        economicBlocFilter,
        isicCodeFilter,
        selectedCategory !== 'all' ? selectedCategory : null, // Maintain the selected category during pagination
        30, // perPage - consistent with UI calculation (30 items per page)
        handleError, // onError callback
        industryFilter,
        priceFilter,
        hsCodeFilter,
        accuracyFilter
      );
      

      
      setSearchResults(response.data || []);
      setTotalPages(response.meta?.last_page || 1);
      setTotalItems(response.meta?.total || 0);
      
      // Explicitly update the currentPage state to match the requested page
      // This ensures the UI reflects the correct page
      setCurrentPage(page);
      
      // Fetch statistics if search type is knowledge (only for page 1 to avoid duplicate calls)
      if (page === 1) {
        await fetchStatisticsIfNeeded(searchQuery.trim(), searchType);
      }
    } catch (error) {
      console.error('Direct page search failed:', error);
      toast.error('Failed to fetch page results. Please try again.', 'Error');
    } finally {
      setLoading(false);
      // Reset the page change flag when the operation completes
      isPageChangeInProgressRef.current = false;
      
      // Keep the skipNextSearchEffectRef true for a bit longer to ensure
      // no interference from the main search effect
      setTimeout(() => {
        skipNextSearchEffectRef.current = false;
      }, 1000); // Wait 1 second before allowing the main search effect to run again
    }
  }, [initialized, searchQuery, searchType, locale, activeTab, languageFilter, countryFilter, regionFilter, economicBlocFilter, selectedCategory, toast, industryFilter, isicCodeFilter, priceFilter, hsCodeFilter, accuracyFilter]);

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
      console.log('Skipping main search effect because a search type change is in progress');
      return;
    }
    
    // Skip if a direct page change is in progress to prevent interference
    if (isPageChangeInProgressRef.current) {
      console.log('Skipping main search effect because a direct page change is in progress');
      return;
    }
    
    // Skip this effect run if we just completed a pagination request
    if (skipNextSearchEffectRef.current) {
      console.log('Skipping main search effect due to recent pagination');
      skipNextSearchEffectRef.current = false; // Reset for next time
      return;
    }
    
    // If this effect runs due to a change in search parameters (not pagination),
    // we should reset the lastDirectPageRef to ensure proper page handling
    if (!isPageChangeInProgressRef.current) {
      console.log('Search parameters changed, resetting lastDirectPageRef');
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
      params.activeTab !== activeTab ||
      params.searchType !== searchType ||
      params.selectedCategory !== selectedCategory ||
      params.industryFilter !== industryFilter ||
      params.isicCodeFilter !== isicCodeFilter ||
      params.hsCodeFilter !== hsCodeFilter ||
      params.priceFilter !== priceFilter ||
      params.accuracyFilter !== accuracyFilter ||
      params.roleFilter !== roleFilter;
    
    // Log parameter changes for debugging (but don't include searchQuery)
    if (paramsChanged) {
      console.log('Search params changed (excluding query):', { 
        locale, languageFilter, countryFilter, regionFilter, economicBlocFilter,
        activeTab, searchType, selectedCategory, industryFilter, isicCodeFilter, hsCodeFilter, priceFilter, accuracyFilter, roleFilter 
      });
    }
    
    // Update reference (but keep the searchQuery as is - don't update it here)
    searchParamsRef.current = {
      locale,
      currentPage,
      languageFilter,
      countryFilter,
      regionFilter,
      economicBlocFilter,
      activeTab,
      searchQuery: searchParamsRef.current.searchQuery, // Keep previous value
      searchType,
      selectedCategory,
      industryFilter,
      isicCodeFilter,
      hsCodeFilter,
      priceFilter,
      accuracyFilter,
      roleFilter
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
        console.log('Skipping API call - too soon since last call');
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
        
        // Important: Always use page 1 for search parameter changes
        // This resets pagination when filters change
        const pageToRequest = paramsChanged ? 1 : (lastDirectPageRef.current || 1);
        
        console.log('Performing filter-based search with parameters:', { 
          keyword, 
          search_type,
          page: pageToRequest,
          locale,
          languageFilter,
          countryFilter, 
          regionFilter,
          economicBlocFilter 
        });
        
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
          priceFilter,
          hsCodeFilter,
          accuracyFilter,
          roleFilter
        );
        
        setSearchResults(response.data || []);
        setTotalPages(response.meta?.last_page || 1);
        setTotalItems(response.meta?.total || 0);
        
        // Reset pagination to page 1 when filter parameters have changed
        console.log('Resetting to page 1 because filter parameters changed');
        setCurrentPage(1);
        
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
  }, [locale, languageFilter, countryFilter, regionFilter, economicBlocFilter, activeTab, searchType, initialized, toast, selectedCategory, industryFilter, isicCodeFilter, hsCodeFilter, priceFilter, accuracyFilter, roleFilter]);

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
           {locale === 'ar' ? 'ابحث في التقارير والبيانات والرؤى' : 'Search data, reports, and insights'}
         </h1>
         <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-center " style={{lineHeight: '1.3'}}>
           {locale === 'ar' ? 'ابدأ الآن' : 'Start exploring now'}
         </h1>
       </div>
            {/* <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{locale === 'ar' ? 'اكتشف المعرفة بسرعة الضوء' : 'Discover Knowledge at Light Speed'}</h1>*/}
           
           <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg md:mt-5 md:max-w-4xl md:text-lg">
             {locale === 'ar' ? 'الوصول للمعلومات المميزة والمقالات والتحليلات. ابحث واكتشف وتعلم.' : 'Access premium information, data, and insights. Search, discover, and learn.'}
           </p> 
           
           {/* Search Bar Prominent Placement */}
           <div className="mx-auto mt-8 max-w-3xl shadow-md">
             <SearchBar
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
               searchType={searchType}
               setSearchType={handleSearchTypeChange}
               locale={locale}
               placeholder={locale === 'ar' ? 'البحث عن معرفة أو شخص...' : 'Search for knowledge or person...'}
               onSubmit={handleSubmit}
               onSearch={executeSearch}
             />
           </div>
            
                      {/* Category Icons */}
           {/* Only show categories when searchType is 'knowledge' */}
        
             <div className="mt-10">
        {searchType === 'knowledge' && (       <p className="text-sm font-medium text-gray-500 mb-4">{locale === 'ar' ? 'استكشف بحسب الفئة' : 'Explore by category'}</p>)}
               <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                 {/* Using the top-level selectedCategory state */}
                 {(() => {
                   // Function to handle category selection and trigger search API directly
                   const handleCategorySelect = async (category: string) => {
                     // Set loading immediately to prevent flickering
                     setLoading(true);
                     
                     // Clear existing results immediately
                     setSearchResults([]);
                     setKnowledgeItems([]);
                     
                     // Update the top-level state
                     setSelectedCategory(category);
                     // Update URL with new category
                     updateUrlWithFilters({ category: category });
                     
                     // The main search effect will be triggered by the setSelectedCategory above
                     // and will handle the API call and turn off loading
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
                     
                     if (searchResults.length === 0 && !loading && initialized && 
                         !isPageChangeInProgressRef.current && !skipNextSearchEffectRef.current &&
                         !searchQuery.trim() && !hasUrlSearchParams) {
                       handleCategorySelect('all');
                     }
                   // eslint-disable-next-line react-hooks/exhaustive-deps
                   }, [searchResults.length, loading, initialized, searchParams]);
                   
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
                        name="insight" 
                        label="Insights" 
                        locale={locale} 
                        arLabel="الرؤى" 
                        isSelected={selectedCategory === 'insight'} 
                        onClick={(e) => { e.preventDefault(); handleCategorySelect('insight'); }} 
                        count={getCategoryCount('insight')}
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
          <div className="mx-auto max-w-7xl 2xl:max-w-none 2xl:mx-8 px-4 sm:px-6">
            {/* Total results display moved to ResultsSection */}
            
            {/* Filter toggle button */}
            <div className="mb-4 flex justify-start">
              <button
                onClick={() => setFiltersVisible(!filtersVisible)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              >
                {filtersVisible ? (
                  <>
                   <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m11 20v-16h2v16z" fill="#90caea"/><g fill="#3747d6"><path d="m16.9142 12 2.7929-2.79289-1.4142-1.41422-3.5 3.50001c-.3905.3905-.3905 1.0237 0 1.4142l3.5 3.5 1.4142-1.4142z"/><path d="m7.0858 12-2.79289-2.79289 1.41421-1.41422 3.5 3.50001c.39053.3905.39053 1.0237 0 1.4142l-3.5 3.5-1.41421-1.4142z"/></g></g></svg>
                    {locale === 'ar' ? 'إخفاء المرشحات' : 'Hide Filters'}
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

                    {locale === 'ar' ? 'إظهار المرشحات' : 'Show Filters'}
                  </>
                )}
              </button>
            </div>
            
            {/* Responsive layout for filters and content */}
            <div className="flex flex-col lg:flex-row gap-8 relative">
              
              {/* Filters Sidebar */}
              <div 
                className={`lg:flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
                  filtersVisible 
                    ? 'lg:w-80 opacity-100 ' 
                    : 'lg:w-0 opacity-0 max-h-0'
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
                      isicCodeFilter={isicCodeFilter}
                      setIsicCodeFilter={handleIsicCodeFilterChange}
                      industryFilter={industryFilter}
                      setIndustryFilter={handleIndustryFilterChange}
                      hsCodeFilter={hsCodeFilter}
                      setHsCodeFilter={handleHsCodeFilterChange}
                      priceFilter={priceFilter}
                      setPriceFilter={handlePriceFilterChange}
                      accuracyFilter={accuracyFilter}
                      setAccuracyFilter={handleAccuracyFilterChange}
                      roleFilter={roleFilter}
                      setRoleFilter={handleRoleFilterChange}
                      resetFilters={resetFilters}
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
                {searchType === 'insighter' ? (
                  <InsightersResultsSection
                    key={`insighter-section-${searchType}`}
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    loading={loading}
                    currentPage={currentPage}
                    totalItems={totalItems}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    locale={locale}
                    onPageChange={directSearchByPage}
                  />
                ) : (
                  <ResultsSection
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
              onPageChange={directSearchByPage}
              router={router}
              updateUrlWithFilters={updateUrlWithFilters}
              searchType={searchType}
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
