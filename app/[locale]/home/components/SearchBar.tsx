'use client'

import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconSearch, IconX, IconBuildingBank, IconWorldSearch } from '@tabler/icons-react';
import { useSuggestions, useClickAway } from '../utils/hooks';
import styles from '../utils/custom-search-engine-styles.module.css';
import { Modal, Loader, Popover } from '@mantine/core';
import { getApiUrl } from '@/app/config';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: 'knowledge' | 'insighter';
  setSearchType: (type: 'knowledge' | 'insighter') => void;
  locale: string;
  placeholder: string;
  onSubmit: (e: React.FormEvent) => void;
  onDirectSearchResults?: (results: any) => void; // New prop to handle direct API search results
  onQueryChange?: (query: string) => void; // New prop to handle URL updates when query changes
  onSearch?: (query: string) => void; // New prop to trigger explicit searches
  // New props for ISIC/HS filters (moved from sidebar)
  isicCodeFilter?: string | null;
  setIsicCodeFilter?: (value: string | null) => void;
  hsCodeFilter?: string | null;
  setHsCodeFilter?: (value: string | null) => void;
  // Accuracy moved from sidebar to search bar
  accuracyFilter?: 'any' | 'all';
  setAccuracyFilter?: (filter: 'any' | 'all') => void;
  // Loading state callbacks
  onIsicLoadingChange?: (loading: boolean) => void;
  onHsLoadingChange?: (loading: boolean) => void;
  onDataLoadedChange?: (loaded: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  locale,
  placeholder,
  onSubmit,
  onDirectSearchResults,
  onQueryChange,
  onSearch,
  isicCodeFilter = null,
  setIsicCodeFilter,
  hsCodeFilter = null,
  setHsCodeFilter,
  accuracyFilter = 'all',
  setAccuracyFilter,
  onIsicLoadingChange,
  onHsLoadingChange,
  onDataLoadedChange
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isRtl = locale === 'ar';
  
  // Simplified suggestion state management
  const [inputFocused, setInputFocused] = useState(false);
  const [suggestionSelected, setSuggestionSelected] = useState(false);
  const [mouseInSuggestions, setMouseInSuggestions] = useState(false);
  // ISIC/HS UI state
  const [isIsicModalOpen, setIsIsicModalOpen] = useState(false);
  const [isHsModalOpen, setIsHsModalOpen] = useState(false);
  // Accuracy dropdown state
  const [isAccuracyOpen, setIsAccuracyOpen] = useState(false);

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
    isic_code_id: number;
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
  
  // Track initial URL params to prevent clearing them during load
  const [initialUrlIsic] = useState(() => searchParams.get('isic_code'));
  const [initialUrlHs] = useState(() => searchParams.get('hs_code'));
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  // Store the initial hs_code to restore after HS list loads
  const [pendingHsCode, setPendingHsCode] = useState<string | null>(() => searchParams.get('hs_code'));
  const [hasRestoredHsCode, setHasRestoredHsCode] = useState(false);
  
  // Get suggestions functionality
  const {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isLoadingSuggestions,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    resetSuggestions,
    hideSuggestions,
    allowSuggestions
  } = useSuggestions(searchQuery, locale);
  
  // Handle clicking outside the suggestions dropdown
  const suggestionsRef = useClickAway(() => {
    hideSuggestions();
    setInputFocused(false);
    setMouseInSuggestions(false);
  });

  // Notify parent about loading state changes
  useEffect(() => {
    onIsicLoadingChange?.(isLoadingIsic);
  }, [isLoadingIsic, onIsicLoadingChange]);

  useEffect(() => {
    onHsLoadingChange?.(isLoadingHs);
  }, [isLoadingHs, onHsLoadingChange]);

  useEffect(() => {
    onDataLoadedChange?.(isDataLoaded);
  }, [isDataLoaded, onDataLoadedChange]);

  // Ensure suggestions show when they become available and input is focused
  useEffect(() => {
    if (inputFocused && suggestions.length > 0 && !suggestionSelected) {
        allowSuggestions();
    }
  }, [suggestions, inputFocused, suggestionSelected, allowSuggestions]);

  // Fetch ISIC tree on mount (by locale only)
  useEffect(() => {
    let mounted = true;
    const loadIsic = async () => {
      try {
        setIsLoadingIsic(true);
        const resp = await fetch(getApiUrl('/api/common/setting/isic-code/tree-list'), {
          headers: {
            'Accept-Language': locale,
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
  }, [locale]);

  // Sync selected ISIC from external filter once leaves are available
  useEffect(() => {
    if (isicCodeFilter && isicLeafNodes.length > 0) {
      const numeric = parseInt(isicCodeFilter);
      const found = isicLeafNodes.find(n => n.key === numeric);
      if (found) {
        setSelectedIsic({
          id: found.key,
          code: found.code,
          label: locale === 'ar' ? (found.names?.ar || found.code) : (found.names?.en || found.code),
        });
      }
    } else if (!isicCodeFilter) {
      setSelectedIsic(null);
    }
  }, [isicCodeFilter, isicLeafNodes, locale]);

  // Fetch all HS codes once (independent of ISIC)
  useEffect(() => {
    const fetchAllHs = async () => {
      try {
        setIsLoadingHs(true);
        const resp = await fetch(getApiUrl('/api/common/setting/hs-code/list'), {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });
        if (!resp.ok) throw new Error('Failed to fetch HS codes');
        const data = await resp.json();
        const list: HSCode[] = data?.data || [];
        setHsCodes(list);
        setFilteredHsCodes(list);
        
        // Restore pending HS code after list loads
        if (pendingHsCode && !hasRestoredHsCode && list.length > 0) {
          const hsId = parseInt(pendingHsCode);
          const found = list.find(c => c.id === hsId);
          if (found) {
            console.log('[SearchBar] Restoring pending HS code:', hsId, found.code);
            setSelectedHs({ id: found.id, code: found.code, label: locale === 'ar' ? found.names.ar : found.names.en });
            if (setHsCodeFilter) {
              setHsCodeFilter(pendingHsCode);
            }
          }
          setHasRestoredHsCode(true);
          setPendingHsCode(null);
        }
        
        // Mark data as loaded if we have initial URL params
        if (initialUrlIsic || initialUrlHs) {
          setIsDataLoaded(true);
        }
      } catch (e) {
        console.error('[HS] Fetch error', e);
        setHsCodes([]);
        setFilteredHsCodes([]);
        // Mark as loaded even on error
        if (initialUrlIsic || initialUrlHs) {
          setIsDataLoaded(true);
        }
        // Clear pending on error
        setPendingHsCode(null);
        setHasRestoredHsCode(true);
      } finally {
        setIsLoadingHs(false);
      }
    };
    fetchAllHs();
  }, [locale]);

  // Sync selected HS from external filter when HS list updates
  useEffect(() => {
    // If component is uncontrolled for HS (no setter provided), do not
    // override internal selection based on external filter prop.
    if (!setHsCodeFilter) {
      return;
    }
    
    // Skip if we're waiting to restore a pending HS code
    if (pendingHsCode && !hasRestoredHsCode) {
      return;
    }
    
    if (hsCodeFilter && hsCodes.length > 0) {
      const numeric = parseInt(hsCodeFilter);
      const found = hsCodes.find(c => c.id === numeric);
      if (found) setSelectedHs({ id: found.id, code: found.code, label: locale === 'ar' ? found.names.ar : found.names.en });
    }
  }, [hsCodeFilter, hsCodes, locale, pendingHsCode, hasRestoredHsCode]);

  // Note: ISIC/HS codes are now supported for both knowledge and insighter search types
  // No need to clear them when switching between search types

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
    setSelectedIsic({ id: node.key, code: node.code, label: locale === 'ar' ? (node.names?.ar || node.code) : (node.names?.en || node.code) });
    // Use ID for URL/state to match page.tsx handlers
    setIsicCodeFilter && setIsicCodeFilter(node.key.toString());
    
    // Update URL: set isic_code, do not clear hs_code, reset page
    try {
      console.log('[SearchBar] handleSelectIsic -> node:', { id: node.key, code: node.code });
      const params = new URLSearchParams(searchParams.toString());
      params.set('isic_code', node.key.toString());
      params.delete('page');
      params.set('search_type', searchType);
      const nextUrl = `/${locale}/home?${params.toString()}`;
      console.log('[SearchBar] handleSelectIsic -> push URL:', nextUrl);
      router.push(nextUrl, { scroll: false });
    } catch {}
    setIsIsicModalOpen(false);
  }, [locale, searchParams, router, searchType, setIsicCodeFilter]);

  const handleSelectHs = useCallback((code: HSCode) => {
    setSelectedHs({ id: code.id, code: code.code, label: locale === 'ar' ? code.names.ar : code.names.en });
    // Use HS ID value to align with backend expectations and URL param
    if (setHsCodeFilter) {
      setHsCodeFilter(code.id.toString());
    }
    // Update URL: set hs_code, reset page
    try {
      console.log('[SearchBar] handleSelectHs -> code:', { id: code.id, code: code.code });
      const params = new URLSearchParams(searchParams.toString());
      params.set('hs_code', code.id.toString());
      params.delete('page');
      params.set('search_type', searchType);
      const nextUrl = `/${locale}/home?${params.toString()}`;
      console.log('[SearchBar] handleSelectHs -> push URL:', nextUrl);
      router.push(nextUrl, { scroll: false });
    } catch {}
    setIsHsModalOpen(false);
  }, [locale, searchParams, router, searchType, setHsCodeFilter]);

  const clearIsicSelection = useCallback(() => {
    setSelectedIsic(null);
    setIsicCodeFilter && setIsicCodeFilter(null);
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('isic_code');
      params.delete('page');
      params.set('search_type', searchType);
      const nextUrl = `/${locale}/home?${params.toString()}`;
      console.log('[SearchBar] clear ISIC -> push URL:', nextUrl);
      router.push(nextUrl, { scroll: false });
    } catch {}
  }, [locale, router, searchParams, searchType, setIsicCodeFilter]);

  const clearHsSelection = useCallback(() => {
    setSelectedHs(null);
    setHsCodeFilter && setHsCodeFilter(null);
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('hs_code');
      params.delete('page');
      params.set('search_type', searchType);
      const nextUrl = `/${locale}/home?${params.toString()}`;
      console.log('[SearchBar] clear HS -> push URL:', nextUrl);
      router.push(nextUrl, { scroll: false });
    } catch {}
  }, [locale, router, searchParams, searchType, setHsCodeFilter]);
  
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
      } else {
        // Execute search when Enter is pressed without suggestion selection
        setSuggestionSelected(true);
        hideSuggestions();
      }
    }
    // Escape key
    else if (e.key === 'Escape') {
      hideSuggestions();
      setInputFocused(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSuggestionSelected(true);
    hideSuggestions();
    setInputFocused(false);
    
    // Use the onSearch prop if available, otherwise fall back to URL navigation
    if (onSearch) {
      onSearch(suggestion);
    } else {
      // Fallback behavior
      setSearchQuery(suggestion);
      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set('keyword', suggestion);
        params.set('search_type', searchType);
        params.delete('page');
        const nextUrl = `/${locale}/home?${params.toString()}`;
        router.push(nextUrl, { scroll: false });
      } catch {
        // no-op
      }
    }
  };

  // Handle clearing the search input
  const handleClearSearch = () => {
    setSearchQuery('');
    resetSuggestions();
    setSuggestionSelected(false);
    setInputFocused(false);
    // Focus back to the input after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      setInputFocused(true);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    setInputFocused(true);
    setSuggestionSelected(false);
    // Allow suggestions to show when focused
    allowSuggestions();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setSuggestionSelected(false);
    
    // Always allow suggestions to show when typing
    allowSuggestions();
  };

  // Simplified suggestion visibility logic - show suggestions if we have them and input is focused
  const shouldShowSuggestions = 
    showSuggestions && 
    suggestions.length > 0 &&
    inputFocused &&
    !suggestionSelected;
  
  // Debug log for suggestion visibility
  useEffect(() => {
  }, [showSuggestions, suggestions.length, inputFocused, suggestionSelected, shouldShowSuggestions]);
  
  const searchTypeChipBaseClasses =
    'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm border';
  const searchTypeChipActiveClasses = 'bg-[#299af8] border-[#299af8] text-white shadow-md';
  const searchTypeChipInactiveClasses = 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100';
  const filterChipBaseClasses =
    'flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 shadow-sm';
  const filterChipActiveClasses = 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100';
  const filterChipInactiveClasses = 'bg-white border-gray-200 text-gray-700 hover:border-[#299af8] hover:text-[#299af8]';
  const filterChipDisabledClasses = 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed';

  const typeLabels = {
    knowledge: isRtl ? 'المنشورات' : 'By Insight',
    insighter: isRtl ? "الخبراء (انسايتر)" : 'By Insighter',
  } as const;

  const isHsDisabled = isLoadingHs;

  const renderTypeIcon = (type: 'knowledge' | 'insighter', isActive: boolean) => (
    <span
      className={`flex items-center justify-center w-6 h-6 rounded-full border ${
        isActive ? 'bg-white/20 border-white/40 text-white' : 'bg-white border-blue-100 text-[#299af8]'
      }`}
    >
      {type === 'knowledge' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                      <path d="M3 6l0 13" />
                      <path d="M12 6l0 13" />
                      <path d="M21 6l0 13" />
                    </svg>
                  ) : (
        <svg
                  xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
        >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                      </svg>
      )}
                    </span>
  );

  const renderHsIcon = (isActive: boolean) => (
    <span
      className={`flex items-center justify-center w-6 h-6 rounded-full border ${
        isActive ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-blue-50 border-blue-100 text-[#299af8]'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 64 64" fill="none">
        <g transform="matrix(0.99,0,0,0.99,0.32,0.3)" stroke="none" fill="currentColor">
          <path d="m49.5 34c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5z" />
          <path d="m32 3c-.82842712 0-1.5.67157288-1.5 1.5v2.8007812c-1.2649826.52060382-2.2043206 1.6749789-2.4335938 3.0566406l-14.742188 16.642578h-6.8242188c-1.3590542 0-2.5 1.1409458-2.5 2.5v25c0 1.3590542 1.1409458 2.5 2.5 2.5h51c1.3590542 0 2.5-1.1409458 2.5-2.5v-25c0-1.3590542-1.1409361-2.5000073-2.5-2.5h-28c-.82842712 0-1.5.67157288-1.5 1.5s.67157288 1.5 1.5 1.5h27.5v24h-33v-24.5c0-1.3590542-1.1409458-2.5-2.5-2.5h-4.1679688l11.761719-13.279297c.73236176.78125202 1.7636799 1.2792969 2.90625 1.2792969 1.1727683 0 2.2019554-.53489178 2.9160156-1.359375l9.125 9.765625c.56539461.60477567 1.51386.63711965 2.1191406.0722656.60606614-.56559238.63843164-1.5155634.0722656-2.1210937l-10.396484-11.123047c-.26624623-1.3120561-1.1427571-2.4088386-2.3359375-2.9199219v-2.8144531c0-.82842712-.67157288-1.5-1.5-1.5zm-17 27h5c.554 0 1 .446 1 1v22c0 .554-.446 1-1 1h-5c-.554 0-1-.446-1-1v-22c0-.554.446-1 1-1z" />
                            </g>
                          </svg>
                    </span>
  );
  
  return (
    <form onSubmit={(e) => {
      // First close the suggestions
      hideSuggestions();
      setSuggestionSelected(true);
      setInputFocused(false);
      // Then submit the form
      onSubmit(e);
    }}>
      <div className="flex flex-col w-full gap-5">
        <div className={`flex flex-wrap items-center gap-3 justify-center`}>
          {(['knowledge', 'insighter'] as const).map((type) => {
            const isActive = searchType === type;
            return (
                      <button
                key={type}
                        type="button"
                className={`${searchTypeChipBaseClasses} ${
                  isActive ? searchTypeChipActiveClasses : searchTypeChipInactiveClasses
                } ${isRtl ? 'flex-row-reverse' : ''}`}
                onClick={() => {
                  if (searchType !== type) {
                    setSearchType(type);
                  }
                }}
                aria-pressed={isActive}
              >
                {renderTypeIcon(type, isActive)}
                <span>{typeLabels[type]}</span>
                      </button>
            );
          })}
          </div>

        <div className="relative">
          <div
            className={`${styles.searchBar} flex items-center bg-white border border-[#299af8] rounded-[6px] w-full px-3 py-2 gap-2`}
            style={{ fontSize: '16px' }}
          >
            <input
              ref={searchInputRef}
              type="text"
              className="flex-1 outline-none bg-transparent border-none focus:outline-none focus:border-none focus:ring-0 w-full"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={() => {
                setTimeout(() => {
                  if (!suggestionSelected && !mouseInSuggestions) {
                    setInputFocused(false);
                    hideSuggestions();
                  }
                }, 100);
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              dir={isRtl ? 'rtl' : 'ltr'}
            />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                className={`${isRtl ? 'ml-2' : 'mr-2'} p-1 text-gray-400 hover:text-gray-600 flex items-center justify-center`}
                onClick={handleClearSearch}
                aria-label={isRtl ? 'امسح البحث' : 'Clear search'}
              >
                <IconX size={16} />
              </button>
            )}

            {isLoadingSuggestions && (
              <div className={`flex items-center justify-center ${isRtl ? 'ml-2' : 'mr-2'}`}>
                <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            
            {/* Filter chips inline on md+ screens */}
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                disabled={isLoadingIsic}
                onClick={() => !isLoadingIsic && setIsIsicModalOpen(true)}
                className={`${filterChipBaseClasses} ${isLoadingIsic ? filterChipDisabledClasses : selectedIsic ? filterChipActiveClasses : filterChipInactiveClasses} ${isRtl ? 'flex-row-reverse' : ''}`}
                aria-label={isRtl ? 'اختر رمز ISIC' : 'Select ISIC code'}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full border ${selectedIsic ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-blue-50 border-blue-100 text-[#299af8]'}`}
                >
                  {isLoadingIsic ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <IconBuildingBank className="w-[14px] h-[14px]" />
                  )}
                </span>
                <span className="font-medium text-gray-900">
                 {locale === 'ar' ? ' رمز ISIC' : 'ISIC code'}
                </span>
                {selectedIsic && (
                  <span className={`font-mono text-[11px] bg-gray-100 px-1.5 py-0.5 rounded ${isRtl ? 'mr-2' : 'ml-2'}`}>
                    {selectedIsic.code}
                  </span>
                )}
                {selectedIsic && (
                  <span
                    className={`text-gray-400 hover:text-red-500 transition-colors ${isRtl ? 'mr-1' : 'ml-1'}`}
                    role="button"
                    aria-label={isRtl ? 'مسح اختيار ISIC' : 'Clear ISIC'}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      clearIsicSelection();
                    }}
                  >
                    <IconX size={14} />
                  </span>
                )}
              </button>

              <button
                type="button"
                disabled={isHsDisabled}
                onClick={() => {
                  if (!isHsDisabled) {
                    setIsHsModalOpen(true);
                  }
                }}
                className={`${filterChipBaseClasses} ${isHsDisabled ? filterChipDisabledClasses : selectedHs ? filterChipActiveClasses : filterChipInactiveClasses} ${isRtl ? 'flex-row-reverse' : ''}`}
                aria-label={isRtl ? 'اختر رمز HS' : 'Select HS code'}
              >
                {renderHsIcon(!!selectedHs && !isHsDisabled)}
                <span className="font-medium text-gray-900">
                 {locale === 'ar' ? ' رمز HS' : 'HS code'}
                </span>
                {selectedHs && !isHsDisabled && (
                  <span className={`font-mono text-[11px] bg-gray-100 px-1.5 py-0.5 rounded ${isRtl ? 'mr-2' : 'ml-2'}`}>
                    {selectedHs.code}
                  </span>
                )}
                {selectedHs && !isHsDisabled && (
                  <span
                    className={`text-gray-400 hover:text-red-500 transition-colors ${isRtl ? 'mr-1' : 'ml-1'}`}
                    role="button"
                    aria-label={isRtl ? 'مسح اختيار HS' : 'Clear HS'}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      clearHsSelection();
                    }}
                  >
                    <IconX size={14} />
                  </span>
                )}
              </button>
              
              {/* Accuracy filter moved below the search field */}
            </div>
            
            <button 
              type="button"
              className={`${isRtl ? 'mr-2' : 'ml-2'} bg-[#299af8] text-white p-2 rounded-[4px] flex items-center justify-center hover:bg-[#2185d6] transition-colors duration-150`}
              onClick={async (e) => {
                e.preventDefault();
                hideSuggestions();
                setSuggestionSelected(true);
                setInputFocused(false);
                
                if (onSearch) {
                  onSearch(searchQuery.trim());
                } else {
                  // Fallback: navigate preserving existing filters
                  try {
                    const params = new URLSearchParams(searchParams.toString());
                    if (searchQuery.trim().length > 0) {
                      params.set('keyword', searchQuery.trim());
                    } else {
                      params.delete('keyword');
                    }
                    params.set('search_type', searchType);
                    params.delete('page');
                    const nextUrl = `/${locale}/home?${params.toString()}`;
                    router.push(nextUrl, { scroll: false });
                  } catch {
                    onSubmit(e as any);
                  }
                }
              }}
              aria-label={isRtl ? 'ابحث' : 'Search'}
            >
              <IconSearch size={18} />
            </button>
        </div>
        {/* Accuracy control under the search field */}
        <div className={`mt-2 flex ${isRtl ? 'justify-end' : 'justify-end'}`}>
          <Popover
            opened={isAccuracyOpen}
            onChange={setIsAccuracyOpen}
            position="bottom"
            withinPortal={false}
          >
            <Popover.Target>
              <button
                type="button"
                className="flex  items-center text-sm text-blue-500 text-xs"
                aria-label={isRtl ? 'دقة البحث' : 'Accuracy'}
                dir={isRtl ? 'rtl' : 'ltr'}
                onClick={() => setIsAccuracyOpen((o) => !o)}
              >
                <IconWorldSearch className={`w-[16px] h-[16px] ${isRtl ? 'ml-1' : 'mr-1'}`} />
                <span className="font-medium">{isRtl ? 'الدقة:' : 'Accuracy:'}</span>
                <span className={`${isRtl ? 'mr-1' : 'ml-1'} text-xs text-blue-600 hover:text-blue-700 underline underline-offset-2`}>
                  {accuracyFilter === 'any'
                    ? (isRtl ? 'أي كلمات' : 'Any words')
                    : (isRtl ? 'كل الكلمات' : 'All words')}
                </span>
              </button>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="flex flex-col gap-2 text-xs min-w-[180px]" dir={isRtl ? 'rtl' : 'ltr'}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accuracy"
                    value="all"
                    checked={accuracyFilter === 'all'}
                    onChange={() => {
                      setAccuracyFilter && setAccuracyFilter('all');
                      setIsAccuracyOpen(false);
                    }}
                    className="accent-blue-500"
                  />
                  {isRtl ? 'تضمين جميع الكلمات' : 'Include all words'}
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accuracy"
                    value="any"
                    checked={accuracyFilter === 'any'}
                    onChange={() => {
                      setAccuracyFilter && setAccuracyFilter('any');
                      setIsAccuracyOpen(false);
                    }}
                    className="accent-blue-500"
                  />
                  {isRtl ? 'تضمين أي من كلمات' : 'Include any words'}
                </label>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
        {/* Filter chips below the input on small screens */}
        <div className={`mt-2 md:hidden flex flex-wrap gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
          <button
            type="button"
            disabled={isLoadingIsic}
            onClick={() => !isLoadingIsic && setIsIsicModalOpen(true)}
            className={`${filterChipBaseClasses} ${isLoadingIsic ? filterChipDisabledClasses : selectedIsic ? filterChipActiveClasses : filterChipInactiveClasses} ${isRtl ? 'flex-row-reverse' : ''}`}
            aria-label={isRtl ? 'اختر رمز ISIC' : 'Select ISIC code'}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full border ${selectedIsic ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-blue-50 border-blue-100 text-[#299af8]'}`}
            >
              {isLoadingIsic ? (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <IconBuildingBank className="w-[14px] h-[14px]" />
              )}
            </span>
            <span className="font-medium text-gray-900">
             {locale === 'ar' ? ' رمز ISIC' : 'ISIC code'}
            </span>
            {selectedIsic && (
              <span className={`font-mono text-[11px] bg-gray-100 px-1.5 py-0.5 rounded ${isRtl ? 'mr-2' : 'ml-2'}`}>
                {selectedIsic.code}
              </span>
            )}
            {selectedIsic && (
              <span
                className={`text-gray-400 hover:text-red-500 transition-colors ${isRtl ? 'mr-1' : 'ml-1'}`}
                role="button"
                aria-label={isRtl ? 'مسح اختيار ISIC' : 'Clear ISIC'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearIsicSelection();
                }}
              >
                <IconX size={14} />
              </span>
            )}
          </button>

          <button
            type="button"
            disabled={isHsDisabled}
            onClick={() => {
              if (!isHsDisabled) {
                setIsHsModalOpen(true);
              }
            }}
            className={`${filterChipBaseClasses} ${isHsDisabled ? filterChipDisabledClasses : selectedHs ? filterChipActiveClasses : filterChipInactiveClasses} ${isRtl ? 'flex-row-reverse' : ''}`}
            aria-label={isRtl ? 'اختر رمز HS' : 'Select HS code'}
          >
            {renderHsIcon(!!selectedHs && !isHsDisabled)}
            <span className="font-medium text-gray-900">
             {locale === 'ar' ? ' رمز HS' : 'HS code'}
            </span>
            {selectedHs && !isHsDisabled && (
              <span className={`font-mono text-[11px] bg-gray-100 px-1.5 py-0.5 rounded ${isRtl ? 'mr-2' : 'ml-2'}`}>
                {selectedHs.code}
              </span>
            )}
            {selectedHs && !isHsDisabled && (
              <span
                className={`text-gray-400 hover:text-red-500 transition-colors ${isRtl ? 'mr-1' : 'ml-1'}`}
                role="button"
                aria-label={isRtl ? 'مسح اختيار HS' : 'Clear HS'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearHsSelection();
                }}
              >
                <IconX size={14} />
              </span>
            )}
          </button>
          
          {/* Accuracy chip removed on mobile; control placed under search field */}
        </div>
        
        {shouldShowSuggestions && (
          <div 
            ref={suggestionsRef}
              className="absolute inset-x-0 mt-3 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto custom-scrollbar"
            onMouseEnter={() => setMouseInSuggestions(true)}
            onMouseLeave={() => setMouseInSuggestions(false)}
          >
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${activeSuggestionIndex === index ? 'bg-blue-50' : ''}`}
                onClick={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setActiveSuggestionIndex(index)}
                  dir={isRtl ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 text-gray-400 ${isRtl ? 'ml-2' : 'mr-2'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-800">
                    {searchQuery && suggestion.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                      <>
                        {(() => {
                          const lowerSuggestion = suggestion.toLowerCase();
                          const lowerSearchTerm = searchQuery.toLowerCase();
                          const matchIndex = lowerSuggestion.indexOf(lowerSearchTerm);
                          
                          if (matchIndex >= 0) {
                            const beforeMatch = suggestion.substring(0, matchIndex);
                            const match = suggestion.substring(matchIndex, matchIndex + searchQuery.length);
                            const afterMatch = suggestion.substring(matchIndex + searchQuery.length);
                            
                            return (
                              <>
                                {beforeMatch}
                                <strong className="font-bold">{match}</strong>
                                {afterMatch}
                              </>
                            );
                          }
                          
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
        {/* Selected ISIC/HS details under the search bar */}
        {(selectedIsic || selectedHs) && (
          <div className={`mt-2 flex flex-wrap gap-2 items-start ${isRtl ? 'justify-start' : 'justify-start'} text-xs`}>
            {selectedIsic && (
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full border bg-blue-50 border-blue-200 text-blue-700 ${isRtl ? 'flex-row-reverse' : ''}`}
                aria-label={isRtl ? 'تفاصيل رمز ISIC المحدد' : 'Selected ISIC details'}
              >
                <span className="font-medium">{isRtl ? 'رمز ISIC:' : 'ISIC Code:'}</span>
                <span className="line-clamp-1 truncate max-w-[260px]">{selectedIsic.label}</span>
                <button
                  type="button"
                  className={`text-blue-500 hover:text-blue-700 transition-colors ${isRtl ? 'mr-1' : 'ml-1'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    clearIsicSelection();
                  }}
                  aria-label={isRtl ? 'مسح اختيار ISIC' : 'Clear ISIC'}
                >
                  <IconX size={12} />
                </button>
              </div>
            )}
            {selectedHs && (
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full border bg-blue-50 border-blue-200 text-blue-700 ${isRtl ? 'flex-row-reverse' : ''}`}
                aria-label={isRtl ? 'تفاصيل رمز HS المحدد' : 'Selected HS details'}
              >
                <span className="font-medium">{isRtl ? 'رمز HS:' : 'HS Code:'}</span>
                <span className="line-clamp-1 truncate max-w-[260px]">{selectedHs.label}</span>
                <button
                  type="button"
                  className={`text-blue-500 hover:text-blue-700 transition-colors ${isRtl ? 'mr-1' : 'ml-1'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    clearHsSelection();
                  }}
                  aria-label={isRtl ? 'مسح اختيار HS' : 'Clear HS'}
                >
                  <IconX size={12} />
                </button>
              </div>
            )}
          </div>
        )}
        </div>

        
      </div>
        {/* ISIC Modal */}
        <Modal
          opened={isIsicModalOpen}
          onClose={() => setIsIsicModalOpen(false)}
          title={locale === 'ar' ? 'اختر رمز ISIC' : 'Select ISIC Code'}
          size="lg"
          overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder={locale === 'ar' ? 'ابحث عن رمز ISIC...' : 'Search ISIC codes...'}
              value={isicSearch}
              onChange={(e) => setIsicSearch(e.target.value)}
              className={`w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {isLoadingIsic ? (
              <div className="flex justify-center py-8"><Loader size="md" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
                {filteredIsicLeafNodes.map((node) => (
                  <button
                    key={node.key}
                    className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200`}
                    onClick={() => handleSelectIsic(node)}
                  >
                    <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{node.code}</span>
                    <span className="flex-1">{locale === 'ar' ? (node.names?.ar || node.code) : (node.names?.en || node.code)}</span>
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
          title={locale === 'ar' ? 'اختر رمز HS' : 'Select HS Code'}
          size="lg"
          overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder={locale === 'ar' ? 'ابحث عن رمز HS...' : 'Search HS codes...'}
              value={hsSearch}
              onChange={(e) => setHsSearch(e.target.value)}
              className={`w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {isLoadingHs ? (
              <div className="flex justify-center py-8"><Loader size="md" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
                {selectedIsic ? (
                  <>
                    {(() => {
                      const related = filteredHsCodes.filter(c => c.isic_code_id === selectedIsic.id);
                      const others = filteredHsCodes.filter(c => c.isic_code_id !== selectedIsic.id);
                      return (
                        <>
                          {related.length > 0 && (
                            <>
                              <div className="text-sm font-semibold text-blue-500 px-1">
                                {locale === 'ar' ? 'ذات صلة' : 'Related'}
                              </div>
                              {related.map((code) => (
                                <button
                                  key={code.id}
                                  className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200`}
                                  onClick={() => handleSelectHs(code)}
                                >
                                  <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{code.code}</span>
                                  <span className="flex-1">{locale === 'ar' ? code.names.ar : code.names.en}</span>
                                </button>
                              ))}
                            </>
                          )}
                          {others.length > 0 && (
                            <>
                              <div className="text-sm font-semibold text-gray-700 px-1 mt-2">
                                {locale === 'ar' ? 'أكواد HS كل' : 'All HS code'}
                              </div>
                              {others.map((code) => (
                                <button
                                  key={code.id}
                                  className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200`}
                                  onClick={() => handleSelectHs(code)}
                                >
                                  <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{code.code}</span>
                                  <span className="flex-1">{locale === 'ar' ? code.names.ar : code.names.en}</span>
                                </button>
                              ))}
                            </>
                          )}
                          {related.length === 0 && others.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 text-sm">
                              {locale === 'ar' ? 'لا توجد رموز HS متاحة' : 'No HS codes available'}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </>
                ) : (
                  <>
                    {filteredHsCodes.map((code) => (
                      <button
                        key={code.id}
                        className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200`}
                        onClick={() => handleSelectHs(code)}
                      >
                        <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{code.code}</span>
                        <span className="flex-1">{locale === 'ar' ? code.names.ar : code.names.en}</span>
                      </button>
                    ))}
                    {filteredHsCodes.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 text-sm">
                        {locale === 'ar' ? 'لا توجد رموز HS متاحة' : 'No HS codes available'}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </Modal>
    </form>
  );
};

export default memo(SearchBar, (prevProps, nextProps) => {
  // Custom comparison function to optimize re-renders
  return (
    prevProps.searchQuery === nextProps.searchQuery &&
    prevProps.searchType === nextProps.searchType &&
    prevProps.locale === nextProps.locale &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.isicCodeFilter === nextProps.isicCodeFilter &&
    prevProps.hsCodeFilter === nextProps.hsCodeFilter &&
    prevProps.accuracyFilter === nextProps.accuracyFilter
  );
});

// ISIC Modal and HS Modal rendering
// Keep modals outside memo compare; they rely on internal state
// We'll extend the component by appending modal JSX via prototype hacking is not possible here,
// so include them inside the component return above would be cleaner. Add them just after the suggestions dropdown.
