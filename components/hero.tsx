'use client'

import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom-blue.svg'
import LogoIcon from '@/public/images/SVG/Logo-icon-white.svg'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Modal, Loader } from '@mantine/core'
import { getApiUrl } from '@/app/config'

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// API function for autocomplete
async function fetchAutocomplete(keyword: string, locale: string): Promise<string[]> {
  if (!keyword.trim()) return [];
  
  try {
    const response = await fetch(`https://api.foresighta.co/api/platform/search/autocomplete?keyword=${encodeURIComponent(keyword)}`, {
      headers: {
        'Accept-Language': locale, // Set the locale in the header
        'Accept': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.data.searchKeywords || [];
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return [];
  }
}

// *** NEW COMPONENT FOR BOLD PLACEHOLDER ***
function Placeholder() {
  const t = useTranslations('Hero');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const placeholderText = isMobile ? t.raw('searchPlaceholderMobile') : t.raw('searchPlaceholder');

  return (
    <div
      className="absolute inset-y-0 flex items-center pointer-events-none text-gray-500 md:text-lg text-base"
      dangerouslySetInnerHTML={{ __html: placeholderText }}
    />
  );
}


export default function Hero() {
  const t = useTranslations('Hero');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = pathname.split('/')[1];
  const [searchType, setSearchType] = useState<'knowledge' | 'insighter'>('knowledge');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // ISIC/HS UI state
  const [isIsicModalOpen, setIsIsicModalOpen] = useState(false);
  const [isHsModalOpen, setIsHsModalOpen] = useState(false);

  // ISIC/HS data state
  type ISICNode = {
    key: number;
    code: string;
    label?: string;
    names?: { en: string; ar: string };
    children: ISICNode[];
  };
  type HSCode = {
    id: number;
    code: string;
    names: { en: string; ar: string };
  };

  const [isicTree, setIsicTree] = useState<ISICNode[]>([]);
  const [isicLeafNodes, setIsicLeafNodes] = useState<ISICNode[]>([]);
  const [filteredIsicLeafNodes, setFilteredIsicLeafNodes] = useState<ISICNode[]>([]);
  const [isicSearch, setIsicSearch] = useState('');
  const [isLoadingIsic, setIsLoadingIsic] = useState(false);

  const [hsCodes, setHsCodes] = useState<HSCode[]>([]);
  const [filteredHsCodes, setFilteredHsCodes] = useState<HSCode[]>([]);
  const [hsSearch, setHsSearch] = useState('');
  const [isLoadingHs, setIsLoadingHs] = useState(false);

  const [selectedIsic, setSelectedIsic] = useState<{ id: number; code: string; label: string } | null>(null);
  const [selectedHs, setSelectedHs] = useState<{ id: number; code: string; label: string } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Track initial URL params to prevent clearing them during load
  const [initialUrlIsic] = useState(() => searchParams.get('isic_code'));
  const [initialUrlHs] = useState(() => searchParams.get('hs_code'));
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  // Store the initial hs_code to restore after HS list loads
  const [pendingHsCode, setPendingHsCode] = useState<string | null>(() => searchParams.get('hs_code'));
  const [hasRestoredHsCode, setHasRestoredHsCode] = useState(false);

  // Initialize ISIC/HS from URL parameters
  useEffect(() => {
    const urlIsicCode = searchParams.get('isic_code');
    const urlHsCode = searchParams.get('hs_code');

    if (urlIsicCode || urlHsCode) {
      // If we have URL parameters, we need to initialize the state
      if (urlIsicCode && !selectedIsic) {
        // We need to find the ISIC node that matches this ID
        // For now, create a minimal object - this will be updated when the tree loads
        const isicId = parseInt(urlIsicCode);
        setSelectedIsic({
          id: isicId,
          code: urlIsicCode, // Temporary, will be updated when tree loads
          label: `ISIC ${urlIsicCode}` // Temporary, will be updated when tree loads
        });
      }

      if (urlHsCode && !selectedHs) {
        // Similar for HS code
        const hsId = parseInt(urlHsCode);
        setSelectedHs({
          id: hsId,
          code: urlHsCode, // Temporary, will be updated when codes load
          label: `HS ${urlHsCode}` // Temporary, will be updated when codes load
        });
      }
    }

    setIsInitialized(true);
  }, [searchParams, selectedIsic, selectedHs]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  // Fetch suggestions when debounced search term changes
  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedSearchTerm) {
        setIsLoading(true);
        const suggestionResults = await fetchAutocomplete(debouncedSearchTerm, currentLocale);
        setSuggestions(suggestionResults);
        setShowSuggestions(suggestionResults.length > 0);
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    getSuggestions();
  }, [debouncedSearchTerm, currentLocale]);

  // Fetch ISIC tree on mount
  useEffect(() => {
    if (searchType !== 'knowledge') return; // don't load for insighter
    let mounted = true;
    const loadIsic = async () => {
      try {
        setIsLoadingIsic(true);
        const resp = await fetch(getApiUrl('/api/common/setting/isic-code/tree-list'), {
          headers: {
            'Accept-Language': currentLocale,
            'Accept': 'application/json',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });
        if (!resp.ok) throw new Error('Failed to fetch ISIC codes');
        const data = await resp.json();
        if (!mounted) return;
        const tree: ISICNode[] = data || [];
        setIsicTree(tree);
        const extractLeaves = (nodes: ISICNode[]): ISICNode[] => {
          const result: ISICNode[] = [];
          for (const n of nodes) {
            if (!n.children || n.children.length === 0) result.push(n);
            else result.push(...extractLeaves(n.children));
          }
          return result;
        };
        const leaves = extractLeaves(tree);
        setIsicLeafNodes(leaves);
        setFilteredIsicLeafNodes(leaves);

        // Update selectedIsic with proper details if it was initialized from URL
        if (selectedIsic && selectedIsic.label.startsWith('ISIC ')) {
          const matchingNode = leaves.find(node => node.key === selectedIsic.id);
          if (matchingNode) {
            setSelectedIsic({
              id: matchingNode.key,
              code: matchingNode.code,
              label: currentLocale === 'ar' ? (matchingNode.names?.ar || matchingNode.code) : (matchingNode.names?.en || matchingNode.code)
            });
          }
        }
        
        // If no initial URL params for ISIC/HS, mark as loaded immediately
        if (!initialUrlIsic && !initialUrlHs) {
          setIsDataLoaded(true);
        }
      } catch (e) {
        setIsicTree([]);
        setIsicLeafNodes([]);
        setFilteredIsicLeafNodes([]);
        // Mark as loaded even on error to prevent blocking
        if (!initialUrlIsic && !initialUrlHs) {
          setIsDataLoaded(true);
        }
      } finally {
        setIsLoadingIsic(false);
      }
    };
    loadIsic();
    return () => {
      mounted = false;
    };
  }, [currentLocale, searchType, selectedIsic, initialUrlIsic, initialUrlHs]);

  // Fetch HS codes whenever selected ISIC changes
  useEffect(() => {
    const fetchHs = async (isicId: number) => {
      try {
        setIsLoadingHs(true);
        const resp = await fetch(getApiUrl(`/api/common/setting/hs-code/isic-code/${isicId}`), {
          headers: {
            'Accept-Language': currentLocale,
            'Accept': 'application/json',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });
        if (!resp.ok) throw new Error('Failed to fetch HS codes');
        const data = await resp.json();
        const list: HSCode[] = data?.data || [];
        setHsCodes(list);
        setFilteredHsCodes(list);

        // Update selectedHs with proper details if it was initialized from URL
        if (selectedHs && selectedHs.label.startsWith('HS ')) {
          const matchingCode = list.find(code => code.id === selectedHs.id);
          if (matchingCode) {
            setSelectedHs({
              id: matchingCode.id,
              code: matchingCode.code,
              label: currentLocale === 'ar' ? matchingCode.names.ar : matchingCode.names.en
            });
          }
        }
        
        // Restore pending HS code after list loads
        if (pendingHsCode && !hasRestoredHsCode && list.length > 0) {
          const hsId = parseInt(pendingHsCode);
          const found = list.find(c => c.id === hsId);
          if (found) {
            console.log('[Hero] Restoring pending HS code:', hsId, found.code);
            setSelectedHs({ id: found.id, code: found.code, label: currentLocale === 'ar' ? found.names.ar : found.names.en });
          }
          setHasRestoredHsCode(true);
          setPendingHsCode(null);
        }
        
        // Mark data as loaded if we have initial URL params
        if (initialUrlIsic) {
          setIsDataLoaded(true);
        }
      } catch (e) {
        console.error('[HS] Fetch error', e);
        setHsCodes([]);
        setFilteredHsCodes([]);
        // Mark as loaded even on error
        if (initialUrlIsic) {
          setIsDataLoaded(true);
        }
        // Clear pending on error
        setPendingHsCode(null);
        setHasRestoredHsCode(true);
      } finally {
        setIsLoadingHs(false);
      }
    };
    
    if (selectedIsic?.id) {
      fetchHs(selectedIsic.id);
    } else if (isDataLoaded && !pendingHsCode) {
      // Only clear HS codes after initial load is complete
      // Don't clear if we still have a pending HS code to restore
      setHsCodes([]);
      setFilteredHsCodes([]);
      // Only clear HS selection if there was no initial URL HS code
      if (!initialUrlHs) {
        setSelectedHs(null);
      }
    }
  }, [selectedIsic?.id, currentLocale, selectedHs, initialUrlIsic, initialUrlHs, isDataLoaded, pendingHsCode, hasRestoredHsCode]);

  // Clear ISIC/HS when switching to insighter
  useEffect(() => {
    if (searchType === 'insighter') {
      setSelectedIsic(null);
      setSelectedHs(null);
    }
  }, [searchType]);

  // ISIC search filter
  useEffect(() => {
    if (!isicSearch.trim()) {
      setFilteredIsicLeafNodes(isicLeafNodes);
      return;
    }
    const q = isicSearch.toLowerCase();
    setFilteredIsicLeafNodes(
      isicLeafNodes.filter(n =>
        n.code.toLowerCase().includes(q) ||
        (n.names?.en?.toLowerCase().includes(q) ?? false) ||
        (n.names?.ar?.toLowerCase().includes(q) ?? false)
      )
    );
  }, [isicSearch, isicLeafNodes]);

  // HS search filter
  useEffect(() => {
    if (!hsSearch.trim()) {
      setFilteredHsCodes(hsCodes);
      return;
    }
    const q = hsSearch.toLowerCase();
    setFilteredHsCodes(
      hsCodes.filter(c =>
        c.code.toLowerCase().includes(q) ||
        c.names.en.toLowerCase().includes(q) ||
        c.names.ar.toLowerCase().includes(q)
      )
    );
  }, [hsSearch, hsCodes]);

  const handleSelectIsic = useCallback((node: ISICNode) => {
    if (node.children && node.children.length > 0) return;
    setSelectedIsic({
      id: node.key,
      code: node.code,
      label: currentLocale === 'ar' ? (node.names?.ar || node.code) : (node.names?.en || node.code)
    });
    // When ISIC changes manually (after initial load), clear HS
    if (isDataLoaded) {
      setSelectedHs(null);
    }
    setIsIsicModalOpen(false);
  }, [currentLocale, isDataLoaded]);

  const handleSelectHs = useCallback((code: HSCode) => {
    setSelectedHs({
      id: code.id,
      code: code.code,
      label: currentLocale === 'ar' ? code.names.ar : code.names.en
    });
    setIsHsModalOpen(false);
  }, [currentLocale]);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Up arrow
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
    // Enter key
    else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        e.preventDefault();
        handleSuggestionSelect(suggestions[activeSuggestionIndex]);
      }
    }
    // Escape key
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSearchInput(suggestion);
    setShowSuggestions(false);

    // Build URL params
    const params = new URLSearchParams();
    params.set('search_type', searchType);
    params.set('keyword', suggestion);
    params.set('accuracy', 'any');

    // Add ISIC code if selected, or preserve from URL
    if (selectedIsic) {
      params.set('isic_code', selectedIsic.id.toString());
    } else if (initialUrlIsic) {
      params.set('isic_code', initialUrlIsic);
    }

    // Add HS code if selected, or preserve from URL
    if (selectedHs) {
      params.set('hs_code', selectedHs.id.toString());
    } else if (initialUrlHs) {
      params.set('hs_code', initialUrlHs);
    }

    router.push(`/${currentLocale}/home?${params.toString()}`);
  };

  // Handle clear search input
  const handleClearSearch = () => {
    setSearchInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build URL params
    const params = new URLSearchParams();
    params.set('search_type', searchType);
    params.set('keyword', searchInput.trim());
    params.set('accuracy', 'any');

    // Add ISIC code if selected, or preserve from URL
    if (selectedIsic) {
      params.set('isic_code', selectedIsic.id.toString());
    } else if (initialUrlIsic) {
      params.set('isic_code', initialUrlIsic);
    }

    // Add HS code if selected, or preserve from URL
    if (selectedHs) {
      params.set('hs_code', selectedHs.id.toString());
    } else if (initialUrlHs) {
      params.set('hs_code', initialUrlHs);
    }

    // Navigate to home page
    router.push(`/${currentLocale}/home?${params.toString()}`);
  };

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-14 pb-16  md:pb-32" >
          {/* Hero content */}
          <div className="max-w-5xl mx-auto text-center" >
            <div className="mb-6" data-aos="fade-down">
            </div>
            <div className="flex justify-center mb-6" data-aos="fade-down" data-aos-delay="100">
              <Image src={LogoIcon} width={80} height={80} alt="Logo" priority />
            </div>
            <h2 className="h2 max-w-3xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-5 leading-[1.5]" data-aos="fade-down">{t('title')}</h2>
            <p className="text-lg text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              {t('description')}
            </p>
            <div className="max-w-4xl mx-auto w-full pb-4" data-aos="fade-down" data-aos-delay="300">
              <div className="relative">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                  <div className="relative w-full">
                    {/* Integrated search bar with dropdown */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden p-2" style={{ minHeight: '60px' }}>
                      {/* Dropdown selector */}
                      <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center justify-between cursor-pointer px-2 mb-2 sm:mb-0 sm:me-3 w-full sm:w-auto ${currentLocale === 'ar' ? 'sm:border-l' : 'sm:border-r'} sm:border-gray-200 sm:pr-3 relative`}
                      >
                        <div className="flex items-center">
                          {/* Display the icon based on selected option */}
                          <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                            {searchType === 'knowledge' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6l0 13" />
                                <path d="M12 6l0 13" />
                                <path d="M21 6l0 13" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                              </svg>
                            )}
                          </div>
                          <span className="text-gray-900 font-medium md:text-md text-sm">
                            {searchType === 'knowledge' 
                              ? (currentLocale === 'ar' ? 'رؤى' : 'Insights') 
                              : (currentLocale === 'ar' ? 'إنسايتر' : 'Insighter')}
                          </span>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-500 ${currentLocale === 'ar' ? 'mr-2' : 'ml-2'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d={currentLocale === 'ar' ? "M15 19l-7-7 7-7" : "M19 9l-7 7-7-7"}
                          ></path>
                        </svg>
                      </div>

                      {/* ISIC/HS selectors - only for knowledge */}
                      {searchType === 'knowledge' && (
                        <>
                          {/* ISIC selector */}
                          <div
                            onClick={() => !isLoadingIsic && setIsIsicModalOpen(true)}
                            className={`flex items-center justify-between ${isLoadingIsic ? 'cursor-wait opacity-60' : 'cursor-pointer'} px-2 mb-2 sm:mb-0 ${currentLocale === 'ar' ? 'sm:ml-2' : 'sm:mr-2'} relative`}
                            data-isic-dropdown-toggle
                          >
                            <div className="flex items-center">
                              <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                                {isLoadingIsic ? (
                                  <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4h16v4H4z" />
                                    <path d="M4 10h16v10H4z" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-gray-900 font-medium text-sm">
                                {isLoadingIsic ? (currentLocale === 'ar' ? 'جاري التحميل...' : 'Loading...') : (selectedIsic ? selectedIsic.code : 'ISIC')}
                              </span>
                              {selectedIsic && (
                                <button
                                  type="button"
                                  className={`text-gray-400 hover:text-red-500 ${currentLocale === 'ar' ? 'mr-1' : 'ml-1'}`}
                                  aria-label="Clear ISIC"
                                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedIsic(null); setSelectedHs(null); }}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              )}
                              <svg
                                className={`w-5 h-5 text-gray-500 ${currentLocale === 'ar' ? 'mr-2' : 'ml-2'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d={currentLocale === 'ar' ? 'M15 19l-7-7 7-7' : 'M19 9l-7 7-7-7'}
                                />
                              </svg>
                            </div>
                          </div>

                          {/* HS selector (disabled when no ISIC) */}
                          <div
                            onClick={() => selectedIsic && !isLoadingHs && setIsHsModalOpen(true)}
                            className={`flex items-center justify-between ${(selectedIsic && !isLoadingHs) ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'} px-2 mb-2 sm:mb-0 relative`}
                            data-hs-dropdown-toggle
                          >
                            <div className="flex items-center">
                              <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                                {isLoadingHs ? (
                                  <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3h18v6H3z" />
                                    <path d="M3 13h18v8H3z" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-gray-900 font-medium text-sm">
                                {isLoadingHs ? (currentLocale === 'ar' ? 'جاري التحميل...' : 'Loading...') : (selectedHs ? selectedHs.code : 'HS')}
                              </span>
                              {selectedHs && (
                                <button
                                  type="button"
                                  className={`text-gray-400 hover:text-red-500 ${currentLocale === 'ar' ? 'mr-1' : 'ml-1'}`}
                                  aria-label="Clear HS"
                                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedHs(null); }}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              )}
                              <svg
                                className={`w-5 h-5 text-gray-500 ${currentLocale === 'ar' ? 'mr-2' : 'ml-2'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d={currentLocale === 'ar' ? 'M15 19l-7-7 7-7' : 'M19 9l-7 7-7-7'}
                                />
                              </svg>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Search input field */}
                      {/* *** MODIFIED SECTION: Added relative positioning and custom placeholder *** */}
                      <div className="relative flex flex-1 items-center w-full sm:w-auto">
                        {/* Render custom placeholder only when input is empty */}
                        {!searchInput && <Placeholder />}

                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          onFocus={() => searchInput && suggestions.length > 0 && setShowSuggestions(true)}
                          onKeyDown={handleKeyDown}
                          //                            placeholder={window.innerWidth < 768 ? t('searchPlaceholderMobile') : t('searchPlaceholder')} // The native placeholder is removed.
                          className="flex-1 outline-none bg-transparent border-none focus-outline-none focus:border-none focus:ring-0 md:text-lg text-base placeholder-transparent text-gray-800 w-full"
                          autoComplete="off"
                          dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
                        />  
                      
                        {/* Clear button - show when there's text in the input */}
                        {searchInput.trim().length > 0 && (
                          <button
                            type="button"
                            className="mr-2 p-1 text-gray-400 hover:text-gray-600 flex items-center justify-center"
                            onClick={handleClearSearch}
                            aria-label="Clear search"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}

                        {/* Loading indicator */}
                        {isLoading && (
                          <div className="flex items-center justify-center mr-2">
                            <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                        
                        {/* Search button */}
                        <button
                          type="submit"
                          className="ml-2 bg-blue-600 text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition duration-300"
                          aria-label="Search"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none" 
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round" 
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                      <div className={`absolute mt-1 w-[160px] bg-white border border-gray-200 rounded-md shadow-lg z-10 ${currentLocale === 'ar' ? 'right-0' : 'left-0'}`}>
                        <div 
                          className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${searchType === 'knowledge' ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setSearchType('knowledge');
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-3'}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6l0 13" />
                                <path d="M12 6l0 13" />
                                <path d="M21 6l0 13" />
                              </svg>
                            </div>
                            <span className="text-gray-900 font-medium md:text-md text-sm">{currentLocale === 'ar' ? 'معرفة' : 'Knowledge'}</span>
                          </div>
                        </div>
                        <div 
                          className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${searchType === 'insighter' ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setSearchType('insighter');
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-3'}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                              </svg>
                            </div>
                            <span className="text-gray-900 font-medium md:text-md text-sm">{currentLocale === 'ar' ? 'إنسايتر' : 'Insighter'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Suggestions dropdown */}
                    {showSuggestions && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto"
                      >
                        {suggestions.map((suggestion, index) => (
                          <div 
                            key={index}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${activeSuggestionIndex === index ? 'bg-blue-50' : ''}`}
                            onClick={() => handleSuggestionSelect(suggestion)}
                            onMouseEnter={() => setActiveSuggestionIndex(index)}
                            dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
                          >
                            <div className="flex items-center">
                              <svg className={`w-5 h-5 text-gray-400 ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <span className="text-gray-800">
                                {debouncedSearchTerm && suggestion.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ? (
                                  <>
                                    {/* Find the start index of the matching part */}
                                    {(() => {
                                      const lowerSuggestion = suggestion.toLowerCase();
                                      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
                                      const matchIndex = lowerSuggestion.indexOf(lowerSearchTerm);
                                      
                                      if (matchIndex >= 0) {
                                        // Split into three parts: before match, match, after match
                                        const beforeMatch = suggestion.substring(0, matchIndex);
                                        const match = suggestion.substring(matchIndex, matchIndex + debouncedSearchTerm.length);
                                        const afterMatch = suggestion.substring(matchIndex + debouncedSearchTerm.length);
                                        
                                        return (
                                          <>
                                            {beforeMatch}
                                            <strong className="font-bold">{match}</strong>
                                            {afterMatch}
                                          </>
                                        );
                                      }
                                      
                                      // Fallback if no match found (shouldn't happen in normal cases)
                                      return suggestion;
                                    })()}
                                  </>
                                ) : (
                                  suggestion
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ISIC Modal */}
      <Modal
        opened={isIsicModalOpen}
        onClose={() => setIsIsicModalOpen(false)}
        title={currentLocale === 'ar' ? 'اختر رمز ISIC' : 'Select ISIC Code'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={currentLocale === 'ar' ? 'ابحث عن رمز ISIC...' : 'Search ISIC codes...'}
            value={isicSearch}
            onChange={(e) => setIsicSearch(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {isLoadingIsic ? (
            <div className="flex justify-center py-8"><Loader size="md" /></div>
          ) : (
            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
              {filteredIsicLeafNodes.map((node) => (
                <button
                  key={node.key}
                  className="py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200"
                  onClick={() => handleSelectIsic(node)}
                >
                  <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`}>{node.code}</span>
                  <span className="flex-1">{currentLocale === 'ar' ? (node.names?.ar || node.code) : (node.names?.en || node.code)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* HS Modal */}
      <Modal
        opened={isHsModalOpen}
        onClose={() => setIsHsModalOpen(false)}
        title={currentLocale === 'ar' ? 'اختر رمز HS' : 'Select HS Code'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={currentLocale === 'ar' ? 'ابحث عن رمز HS...' : 'Search HS codes...'}
            value={hsSearch}
            onChange={(e) => setHsSearch(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {isLoadingHs ? (
            <div className="flex justify-center py-8"><Loader size="md" /></div>
          ) : (
            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
              {filteredHsCodes.map((code) => (
                <button
                  key={code.id}
                  className="py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200"
                  onClick={() => handleSelectHs(code)}
                >
                  <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`}>{code.code}</span>
                  <span className="flex-1">{currentLocale === 'ar' ? code.names.ar : code.names.en}</span>
                </button>
              ))}
              {filteredHsCodes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 text-sm">
                  {currentLocale === 'ar' ? 'لا توجد رموز HS متاحة' : 'No HS codes available'}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </section>
  )
}