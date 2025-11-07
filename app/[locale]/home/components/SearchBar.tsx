'use client'

import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useSuggestions, useClickAway } from '../utils/hooks';
import styles from '../utils/custom-search-engine-styles.module.css';
import { fetchSearchResults } from '../utils/api';
import { Modal, Loader } from '@mantine/core';
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
  setHsCodeFilter
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  
  // Simplified suggestion state management
  const [inputFocused, setInputFocused] = useState(false);
  const [suggestionSelected, setSuggestionSelected] = useState(false);
  const [mouseInSuggestions, setMouseInSuggestions] = useState(false);
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
  
  // Handle clicking outside the type dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node) && 
          event.target !== document.querySelector('[data-type-dropdown-toggle]')) {
        setShowTypeDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ensure suggestions show when they become available and input is focused
  useEffect(() => {
    if (inputFocused && suggestions.length > 0 && !suggestionSelected) {
        allowSuggestions();
    }
  }, [suggestions, inputFocused, suggestionSelected, allowSuggestions]);

  // Fetch ISIC tree on mount
  useEffect(() => {
    if (searchType !== 'knowledge') return; // don't load for insighter
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
      } catch (e) {
        setIsicTree([]);
        setIsicLeafNodes([]);
        setFilteredIsicLeafNodes([]);
      } finally {
        setIsLoadingIsic(false);
      }
    };
    loadIsic();
    return () => {
      mounted = false;
    };
  }, [locale, searchType]);

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

  // Fetch HS codes whenever selected ISIC changes
  useEffect(() => {
    const fetchHs = async (isicId: number) => {
      try {
        setIsLoadingHs(true);
        const resp = await fetch(getApiUrl(`/api/common/setting/hs-code/isic-code/${isicId}`), {
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
      } catch (e) {
        console.error('[HS] Fetch error', e);
        setHsCodes([]);
        setFilteredHsCodes([]);
      } finally {
        setIsLoadingHs(false);
      }
    };
    if (selectedIsic?.id) fetchHs(selectedIsic.id);
    else {
      setHsCodes([]);
      setFilteredHsCodes([]);
      setSelectedHs(null);
      setHsCodeFilter && setHsCodeFilter(null);
    }
  }, [selectedIsic?.id, locale, setHsCodeFilter]);

  // Sync selected HS from external filter when HS list updates
  useEffect(() => {
    if (hsCodeFilter && hsCodes.length > 0) {
      const found = hsCodes.find(c => c.code === hsCodeFilter);
      if (found) setSelectedHs({ id: found.id, code: found.code, label: locale === 'ar' ? found.names.ar : found.names.en });
    } else if (!hsCodeFilter) {
      setSelectedHs(null);
    }
  }, [hsCodeFilter, hsCodes, locale]);

  // Clear ISIC/HS when switching to insighter
  useEffect(() => {
    if (searchType === 'insighter') {
      setSelectedIsic(null);
      setSelectedHs(null);
      setIsicCodeFilter && setIsicCodeFilter(null);
      setHsCodeFilter && setHsCodeFilter(null);
    }
  }, [searchType, setIsicCodeFilter, setHsCodeFilter]);

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
    // When ISIC changes, clear HS
    setSelectedHs(null);
    setHsCodeFilter && setHsCodeFilter(null);
    setIsIsicModalOpen(false);
  }, [locale, setIsicCodeFilter, setHsCodeFilter]);

  const handleSelectHs = useCallback((code: HSCode) => {
    setSelectedHs({ id: code.id, code: code.code, label: locale === 'ar' ? code.names.ar : code.names.en });
    // Use HS code value to align with backend expectations and URL param
    if (setHsCodeFilter) {
      setHsCodeFilter(code.code);
    }
    setIsHsModalOpen(false);
  }, [locale, setHsCodeFilter]);
  
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
      router.push(`/${locale}/home?search_type=${searchType}&keyword=${encodeURIComponent(suggestion)}`);
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
  
  return (
    <form onSubmit={(e) => {
      // First close the suggestions
      hideSuggestions();
      setSuggestionSelected(true);
      setInputFocused(false);
      // Then submit the form
      onSubmit(e);
    }}>
      <div className="flex flex-col w-full" style={{ position: 'relative' }}>
        {/* Combined search bar with integrated dropdown */}
        <div className={`${styles.searchBar} flex flex-wrap items-start bg-white border border-[#299af8] rounded-[4px] w-full p-2`}
          style={{ fontSize: '16px' }}
        >
          {/* First row: Search type dropdown + ISIC/HS codes */}
          <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
            {/* Dropdown section */}
            <div
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className={`flex items-center justify-between cursor-pointer px-2 ${locale === 'ar' ? 'ml-2' : 'mr-2'} relative`}
              data-type-dropdown-toggle
            >
              <div className="flex items-center">
                {/* Display the icon based on selected option */}
                <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
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
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.87004 8.1525C6.79504 8.145 6.70504 8.145 6.62254 8.1525C4.83754 8.0925 3.42004 6.63 3.42004 4.83C3.42004 2.9925 4.90504 1.5 6.75004 1.5C8.58754 1.5 10.08 2.9925 10.08 4.83C10.0725 6.63 8.65504 8.0925 6.87004 8.1525Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.3075 3C13.7625 3 14.9325 4.1775 14.9325 5.625C14.9325 7.0425 13.8075 8.1975 12.405 8.25C12.345 8.2425 12.2775 8.2425 12.21 8.25" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.12004 10.92C1.30504 12.135 1.30504 14.115 3.12004 15.3225C5.18254 16.7025 8.56504 16.7025 10.6275 15.3225C12.4425 14.1075 12.4425 12.1275 10.6275 10.92C8.57254 9.5475 5.19004 9.5475 3.12004 10.92Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.755 15C14.295 14.8875 14.805 14.67 15.225 14.3475C16.395 13.47 16.395 12.0225 15.225 11.145C14.8125 10.83 14.31 10.62 13.7775 10.5" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-900 font-medium text-sm uppercase">
                  {searchType === 'knowledge'
                    ? (locale === 'ar' ? 'رؤى' : 'Insights')
                    : (locale === 'ar' ? 'إنسايتر' : 'Insighter')}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 ${locale === 'ar' ? 'mr-2' : 'ml-2'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={locale === 'ar' ? "M15 19l-7-7 7-7" : "M19 9l-7 7-7-7"}
                  ></path>
                </svg>
              </div>

              {/* Type dropdown menu */}
              {showTypeDropdown && (
                <div
                  ref={typeDropdownRef}
                  className={`absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 w-40 ${locale === 'ar' ? 'right-0' : 'left-0'}`}
                >
                  <div
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center ${searchType === 'knowledge' ? 'bg-blue-50' : ''}`}
                    onClick={() => {
                      setSearchType('knowledge');
                      setShowTypeDropdown(false);
                    }}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6l0 13" />
                        <path d="M12 6l0 13" />
                        <path d="M21 6l0 13" />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium text-sm uppercase">
                      {locale === 'ar' ? 'رؤى' : 'INSIGHTS'}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center ${searchType === 'insighter' ? 'bg-blue-50' : ''}`}
                    onClick={() => {
                      setSearchType('insighter');
                      setShowTypeDropdown(false);
                    }}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.87004 8.1525C6.79504 8.145 6.70504 8.145 6.62254 8.1525C4.83754 8.0925 3.42004 6.63 3.42004 4.83C3.42004 2.9925 4.90504 1.5 6.75004 1.5C8.58754 1.5 10.08 2.9925 10.08 4.83C10.0725 6.63 8.65504 8.0925 6.87004 8.1525Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.3075 3C13.7625 3 14.9325 4.1775 14.9325 5.625C14.9325 7.0425 13.8075 8.1975 12.405 8.25C12.345 8.2425 12.2775 8.2425 12.21 8.25" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.12004 10.92C1.30504 12.135 1.30504 14.115 3.12004 15.3225C5.18254 16.7025 8.56504 16.7025 10.6275 15.3225C12.4425 14.1075 12.4425 12.1275 10.6275 10.92C8.57254 9.5475 5.19004 9.5475 3.12004 10.92Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.755 15C14.295 14.8875 14.805 14.67 15.225 14.3475C16.395 13.47 16.395 12.0225 15.225 11.145C14.8125 10.83 14.31 10.62 13.7775 10.5" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium text-sm uppercase ">
                      {locale === 'ar' ? 'إنسايتر' : 'Insighter'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ISIC/HS selectors - only for knowledge, styled like search type */}
            {searchType === 'knowledge' && (
              <>
                {/* ISIC selector styled */}
                <div
                  onClick={() => setIsIsicModalOpen(true)}
                  className={`flex items-center justify-between cursor-pointer px-2 ${locale === 'ar' ? 'ml-2' : 'mr-2'} relative`}
                  data-isic-dropdown-toggle
                >
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16v4H4z" />
                        <path d="M4 10h16v10H4z" />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium text-sm">
                      {selectedIsic ? selectedIsic.code : 'ISIC'}
                    </span>
                    {selectedIsic && (
                      <button
                        type="button"
                        className={`text-gray-400 hover:text-red-500 ${locale === 'ar' ? 'mr-1' : 'ml-1'}`}
                        aria-label="Clear ISIC"
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedIsic(null); setIsicCodeFilter && setIsicCodeFilter(null); setSelectedHs(null); setHsCodeFilter && setHsCodeFilter(null); }}
                      >
                        <IconX size={14} />
                      </button>
                    )}
                    <svg
                      className={`w-5 h-5 text-gray-500 ${locale === 'ar' ? 'mr-2' : 'ml-2'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={locale === 'ar' ? 'M15 19l-7-7 7-7' : 'M19 9l-7 7-7-7'}
                      />
                    </svg>
                  </div>
                </div>

                {/* HS selector styled (disabled when no ISIC) */}
                <div
                  onClick={() => selectedIsic && setIsHsModalOpen(true)}
                  className={`flex items-center justify-between ${selectedIsic ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'} px-2 relative`}
                  data-hs-dropdown-toggle
                >
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3h18v6H3z" />
                        <path d="M3 13h18v8H3z" />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium text-sm">
                      {selectedHs ? selectedHs.code : 'HS'}
                    </span>
                    {selectedHs && (
                      <button
                        type="button"
                        className={`text-gray-400 hover:text-red-500 ${locale === 'ar' ? 'mr-1' : 'ml-1'}`}
                        aria-label="Clear HS"
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedHs(null); setHsCodeFilter && setHsCodeFilter(null); }}
                      >
                        <IconX size={14} />
                      </button>
                    )}
                    <svg
                      className={`w-5 h-5 text-gray-500 ${locale === 'ar' ? 'mr-2' : 'ml-2'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={locale === 'ar' ? 'M15 19l-7-7 7-7' : 'M19 9l-7 7-7-7'}
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Second row: Search input */}
          <div className="flex flex-1 items-center w-full">
            <input
              ref={searchInputRef}
              type="text"
              className="flex-1 outline-none bg-transparent border-none focus-outline-none focus:border-none focus:ring-0 w-full"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={() => {
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => {
                  if (!suggestionSelected && !mouseInSuggestions) {
                    setInputFocused(false);
                    hideSuggestions();
                  }
                }, 100);
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            />
            {/* Clear button - show when there's text in the input */}
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                className="mr-2 p-1 text-gray-400 hover:text-gray-600 flex items-center justify-center"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <IconX size={16} />
              </button>
            )}

            {isLoadingSuggestions && (
              <div className="flex items-center justify-center mr-2">
                <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            
            {/* Search button */}
            <button 
              type="button" /* Changed to button type to prevent form submission */
              className="ml-2 bg-[#299af8] text-white p-2 rounded-[4px] flex items-center justify-center"
              onClick={async (e) => {
                e.preventDefault();
                // Close suggestions
                hideSuggestions();
                setSuggestionSelected(true);
                setInputFocused(false);
                
                // Always execute search, even with empty query
                if (onSearch) {
                  onSearch(searchQuery.trim());
                } else {
                  // Fallback: trigger form submission
                  onSubmit(e as any);
                }
              }}
              aria-label="Search"
            >
              <IconSearch size={18} />
            </button>
          </div>
        </div>
        
        {/* Suggestions dropdown */}
        {shouldShowSuggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-40 overflow-y-auto custom-scrollbar"
            onMouseEnter={() => setMouseInSuggestions(true)}
            onMouseLeave={() => setMouseInSuggestions(false)}
          >
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${activeSuggestionIndex === index ? 'bg-blue-50' : ''}`}
                onClick={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setActiveSuggestionIndex(index)}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center">
                  <svg className={`w-5 h-5 text-gray-400 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                            // Split into three parts: before match, match, after match
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
              </div>
            )}
          </div>
        </Modal>
      </div>
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
    prevProps.hsCodeFilter === nextProps.hsCodeFilter
  );
});

// ISIC Modal and HS Modal rendering
// Keep modals outside memo compare; they rely on internal state
// We'll extend the component by appending modal JSX via prototype hacking is not possible here,
// so include them inside the component return above would be cleaner. Add them just after the suggestions dropdown.
