'use client'

import React, { useRef, useEffect, useState, memo, useCallback, useMemo, useDeferredValue } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconSearch, IconX, IconBuildingBank, IconWorldSearch, IconLock } from '@tabler/icons-react';
import { useSuggestions, useClickAway } from '../utils/hooks';
import styles from '../utils/custom-search-engine-styles.module.css';
import { Modal, Loader, Popover } from '@mantine/core';
import { getApiUrl } from '@/app/config';
import { createPortal } from 'react-dom';

// Arabic search normalization (hamza/diacritics tolerant)
const ARABIC_DIACRITICS_AND_TATWEEL_RE = /[\u0640\u064B-\u065F\u0670\u06D6-\u06ED]/g;

function normalizeSearchText(input: string): string {
  if (!input) return '';
  // Lowercasing is harmless for Arabic and helpful for Latin.
  let s = input.toLowerCase().trim();
  // Remove Arabic diacritics (tashkeel) + tatweel.
  s = s.replace(ARABIC_DIACRITICS_AND_TATWEEL_RE, '');
  // Normalize common hamza/alif variants.
  s = s.replace(/[إأآٱ]/g, 'ا');
  s = s.replace(/[ؤ]/g, 'و');
  s = s.replace(/[ئ]/g, 'ي');
  // Drop standalone hamza.
  s = s.replace(/[ء]/g, '');
  // Normalize alif-maqsura to ya.
  s = s.replace(/[ى]/g, 'ي');
  // Collapse whitespace.
  s = s.replace(/\s+/g, ' ');
  return s;
}

function escapeRegExpLiteral(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildArabicFuzzyRegex(rawNeedle: string): RegExp | null {
  const needle = normalizeSearchText(rawNeedle);
  if (!needle) return null;

  // Allow diacritics/tatweel between characters.
  const gap = '[\\u0640\\u064B-\\u065F\\u0670\\u06D6-\\u06ED]*';

  let pattern = '';
  for (const ch of needle) {
    if (ch === ' ') {
      pattern += '\\s+';
      continue;
    }

    // Hamza-tolerant groups.
    if (ch === 'ا') pattern += '[اأإآٱ]';
    else if (ch === 'و') pattern += '[وؤ]';
    else if (ch === 'ي') pattern += '[يىئ]';
    else pattern += escapeRegExpLiteral(ch);

    pattern += gap;
  }

  try {
    return new RegExp(pattern, 'i');
  } catch {
    return null;
  }
}

function arabicFuzzyMatch(haystack: string, needle: string): { index: number; length: number } | null {
  if (!haystack) return null;
  const re = buildArabicFuzzyRegex(needle);
  if (!re) return null;
  const m = re.exec(haystack);
  if (!m || typeof m.index !== 'number') return null;
  return { index: m.index, length: m[0]?.length ?? 0 };
}

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

const IsicLeafNodesList = memo(function IsicLeafNodesList(props: {
  nodes: ISICNode[];
  locale: string;
  onSelect: (node: ISICNode) => void;
}) {
  const { nodes, locale, onSelect } = props;
  return (
    <>
      {nodes.map((node) => (
        <button
          key={node.key}
          className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200`}
          onClick={() => onSelect(node)}
        >
          <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{node.code}</span>
          <span className="flex-1">{locale === 'ar' ? (node.names?.ar || node.code) : (node.names?.en || node.code)}</span>
        </button>
      ))}
    </>
  );
});

const HsCodesList = memo(function HsCodesList(props: {
  codes: HSCode[];
  locale: string;
  onSelect: (code: HSCode) => void;
}) {
  const { codes, locale, onSelect } = props;
  return (
    <>
      {codes.map((code) => (
        <button
          key={code.id}
          className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors hover:bg-gray-100 border border-gray-200`}
          onClick={() => onSelect(code)}
        >
          <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{code.code}</span>
          <span className="flex-1">{locale === 'ar' ? code.names.ar : code.names.en}</span>
        </button>
      ))}
    </>
  );
});

const HsBucketsList = memo(function HsBucketsList(props: {
  related: HSCode[];
  others: HSCode[];
  locale: string;
  onSelect: (code: HSCode) => void;
}) {
  const { related, others, locale, onSelect } = props;
  return (
    <>
      {related.length > 0 && (
        <>
          <div className="text-sm font-semibold text-blue-500 px-1">
            {locale === 'ar' ? 'ذات صلة' : 'Related'}
          </div>
          <HsCodesList codes={related} locale={locale} onSelect={onSelect} />
        </>
      )}

      {others.length > 0 && (
        <>
          <div className="text-sm font-semibold text-gray-700 px-1 mt-2">
            {locale === 'ar' ? 'أكواد HS كل' : 'All Products'}
          </div>
          <HsCodesList codes={others} locale={locale} onSelect={onSelect} />
        </>
      )}

      {related.length === 0 && others.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 text-sm">
          {locale === 'ar' ? 'لا توجد رموز HS متاحة' : 'No Products available'}
        </div>
      )}
    </>
  );
});

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
  // Portal mount + dropdown positioning
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  // ISIC/HS UI state
  const [isIsicModalOpen, setIsIsicModalOpen] = useState(false);
  const [isHsModalOpen, setIsHsModalOpen] = useState(false);
  // Accuracy dropdown state
  const [isAccuracyOpen, setIsAccuracyOpen] = useState(false);

  // ISIC/HS data state
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
  
  // Defer expensive filtering work so typing stays responsive
  const deferredIsicSearch = useDeferredValue(isicSearch);
  const deferredHsSearch = useDeferredValue(hsSearch);

  // Handle clicking outside the suggestions dropdown
  const suggestionsRef = useClickAway(() => {
    hideSuggestions();
    setInputFocused(false);
    setMouseInSuggestions(false);
  });

  // Suggestion visibility
  const shouldShowSuggestions =
    showSuggestions &&
    suggestions.length > 0 &&
    inputFocused &&
    !suggestionSelected;

  // Enable portal rendering on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute dropdown position anchored to the input field
  const updateDropdownPosition = useCallback(() => {
    const inputEl = searchInputRef.current;
    if (!inputEl) return;
    const rect = inputEl.getBoundingClientRect();
    const offset = 0; // flush under the input
    setDropdownRect({
      top: rect.bottom + offset,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  // Reposition when suggestions open and on viewport changes
  useEffect(() => {
    if (!shouldShowSuggestions) return;
    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition, true);
    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition, true);
    };
  }, [shouldShowSuggestions, updateDropdownPosition]);

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
      const found = isicLeafNodes.find(n => n.code === isicCodeFilter);
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

  // Fetch all Products once (independent of ISIC)
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
        if (!resp.ok) throw new Error('Failed to fetch Products');
        const data = await resp.json();
        const list: HSCode[] = data?.data || [];
        setHsCodes(list);
        setFilteredHsCodes(list);
        
        // Restore pending Products after list loads
        if (pendingHsCode && !hasRestoredHsCode && list.length > 0) {
          const found = list.find(c => c.code === pendingHsCode);
          if (found) {
            setSelectedHs({ id: found.id, code: found.code, label: locale === 'ar' ? found.names.ar : found.names.en });
            if (setHsCodeFilter) {
              setHsCodeFilter(found.code);
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
    
    // Skip if we're waiting to restore a pending Products
    if (pendingHsCode && !hasRestoredHsCode) {
      return;
    }
    
    if (hsCodeFilter && hsCodes.length > 0) {
      const found = hsCodes.find(c => c.code === hsCodeFilter);
      if (found) setSelectedHs({ id: found.id, code: found.code, label: locale === 'ar' ? found.names.ar : found.names.en });
    }
  }, [hsCodeFilter, hsCodes, locale, pendingHsCode, hasRestoredHsCode]);

  // Note: ISIC/Products are now supported for both knowledge and insighter search types
  // No need to clear them when switching between search types

  // Build lightweight search indexes (normalized text cached once per dataset)
  const isicSearchIndex = useMemo(() => {
    return isicLeafNodes.map((n) => ({
      node: n,
      normCode: normalizeSearchText(n.code),
      normEn: normalizeSearchText(n.names?.en || ''),
      normAr: normalizeSearchText(n.names?.ar || ''),
    }));
  }, [isicLeafNodes]);

  const hsSearchIndex = useMemo(() => {
    return hsCodes.map((c) => ({
      code: c,
      normCode: normalizeSearchText(c.code),
      normEn: normalizeSearchText(c.names.en),
      normAr: normalizeSearchText(c.names.ar),
    }));
  }, [hsCodes]);

  // ISIC search filter
  useEffect(() => {
    if (!deferredIsicSearch.trim()) {
      setFilteredIsicLeafNodes(isicLeafNodes);
      return;
    }
    const q = normalizeSearchText(deferredIsicSearch);
    setFilteredIsicLeafNodes(
      isicSearchIndex
        .filter((x) => x.normCode.includes(q) || x.normEn.includes(q) || x.normAr.includes(q))
        .map((x) => x.node)
    );
  }, [deferredIsicSearch, isicLeafNodes, isicSearchIndex]);

  // HS search filter
  useEffect(() => {
    if (!deferredHsSearch.trim()) {
      setFilteredHsCodes(hsCodes);
      return;
    }
    const q = normalizeSearchText(deferredHsSearch);
    setFilteredHsCodes(
      hsSearchIndex
        .filter((x) => x.normCode.includes(q) || x.normEn.includes(q) || x.normAr.includes(q))
        .map((x) => x.code)
    );
  }, [deferredHsSearch, hsCodes, hsSearchIndex]);

  // Avoid recalculating "related vs others" lists on every render
  const hsModalBuckets = useMemo(() => {
    if (!selectedIsic) return null;
    const related: HSCode[] = [];
    const others: HSCode[] = [];
    for (const c of filteredHsCodes) {
      if (c.isic_code_id === selectedIsic.id) related.push(c);
      else others.push(c);
    }
    return { related, others };
  }, [filteredHsCodes, selectedIsic]);

  const handleSelectIsic = useCallback((node: ISICNode) => {
    if (node.children && node.children.length > 0) return;
    setSelectedIsic({ id: node.key, code: node.code, label: locale === 'ar' ? (node.names?.ar || node.code) : (node.names?.en || node.code) });
    // Use code string for URL/state
    setIsicCodeFilter && setIsicCodeFilter(node.code);
    
    // Update URL: set isic_code, do not clear hs_code, reset page
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set('isic_code', node.code);
      params.delete('page');
      params.set('search_type', searchType);
      const nextUrl = `/${locale}/home?${params.toString()}`;
      router.push(nextUrl, { scroll: false });
    } catch {}
    setIsIsicModalOpen(false);
  }, [locale, searchParams, router, searchType, setIsicCodeFilter]);

  const handleSelectHs = useCallback((code: HSCode) => {
    setSelectedHs({ id: code.id, code: code.code, label: locale === 'ar' ? code.names.ar : code.names.en });
    // Use Products string for URL/state
    if (setHsCodeFilter) {
      setHsCodeFilter(code.code);
    }
    // Update URL: set hs_code, reset page
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set('hs_code', code.code);
      params.delete('page');
      params.set('search_type', searchType);
      const nextUrl = `/${locale}/home?${params.toString()}`;
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
    onQueryChange?.('');
    resetSuggestions();
    setSuggestionSelected(false);
    setInputFocused(false);
    // Remove keyword from URL so it doesn't come back on next interactions
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('keyword');
      params.delete('page');
      params.set('search_type', searchType);
      const nextUrl = `/${locale}/home?${params.toString()}`;
      router.push(nextUrl, { scroll: false });
    } catch {}
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

  const searchTypeChipBaseClasses =
    'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm border';
  const searchTypeChipActiveClasses = 'bg-[#299af8] border-[#299af8] text-white shadow-md';
  const searchTypeChipInactiveClasses = 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100';
  const searchTypeChipDisabledClasses = 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70';
  // Filter chips (ISIC/HS) style — match screenshot pill layout
  const filterPillBaseClasses =
    'group flex items-center gap-3 rounded-full border bg-white px-3 py-1 transition-colors';
  const filterPillActiveClasses = 'border-[#D7E9FF]';
  const filterPillInactiveClasses = 'border-gray-200 hover:border-[#299af8]/50';
  const filterPillDisabledClasses = 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-80';

  const typeLabels = {
    knowledge: isRtl ? 'المنشورات' : 'By Insight',
    insighter: isRtl ? "الخبراء (انسايتر)" : 'By Insighter',
  } as const;

  const isHsDisabled = isLoadingHs;

  const renderTypeIcon = (type: 'knowledge' | 'insighter', isActive: boolean, isLocked: boolean) => (
    <span
      className={`flex items-center justify-center w-6 h-6 rounded-full border ${
        isLocked
          ? 'bg-gray-200 border-gray-300 text-gray-500'
          : isActive
            ? 'bg-white/20 border-white/40 text-white'
            : 'bg-white border-blue-100 text-[#299af8]'
      }`}
    >
      {isLocked ? (
        <IconLock className="w-3.5 h-3.5" />
      ) : type === 'knowledge' ? (
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

  const renderFilterPill = (opts: {
    title: string;
    subtitle: string;
    ariaLabel: string;
    icon: React.ReactNode;
    disabled?: boolean;
    active?: boolean;
    onClick: () => void;
    onClear?: () => void;
  }) => {
    const disabled = !!opts.disabled;
    const active = !!opts.active;

    return (
      <button
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={opts.ariaLabel}
        onClick={() => {
          if (!disabled) opts.onClick();
        }}
        className={`${filterPillBaseClasses} ${
          disabled ? filterPillDisabledClasses : active ? filterPillActiveClasses : filterPillInactiveClasses
        } ${isRtl ? 'flex-row-reverse' : ''}`}
      >
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full border ${
            disabled ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-[#EFF8FF] border-[#D7E9FF] text-[#299AF8]'
          }`}
        >
          {opts.icon}
        </span>

        <span className={`flex flex-col leading-tight ${isRtl ? 'items-end' : 'items-start'}`}>
          <span className="text-xs font-medium text-gray-900">{opts.title}</span>
          <span className="text-[10px] font-light text-[#299AF8]">{opts.subtitle}</span>
        </span>

        {opts.onClear && (
          <span
            className={`text-gray-400 hover:text-red-500 transition-colors ${isRtl ? 'ml-0 mr-auto' : 'ml-auto'}`}
            role="button"
            aria-label={isRtl ? 'مسح' : 'Clear'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              opts.onClear?.();
            }}
          >
            <IconX size={16} />
          </span>
        )}
      </button>
    );
  };
  
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
            const isLocked = type === 'insighter';
            return (
              <div key={type} className="flex flex-col">
                         <button
                        type="button"
                disabled={isLocked}
                aria-disabled={isLocked}
               
                title={isLocked ? (isRtl ? 'مغلق حالياً' : 'Locked for now') : undefined}
                className={`${searchTypeChipBaseClasses} ${
                  isLocked ? searchTypeChipDisabledClasses : isActive ? searchTypeChipActiveClasses : searchTypeChipInactiveClasses
                } ${isRtl ? 'flex-row-reverse' : ''}`}
                onClick={() => {
                  if (isLocked) return;
                  if (searchType !== type) {
                    setSearchType(type);
                  }
                }}
                aria-pressed={isLocked ? false : isActive}
              >
                {renderTypeIcon(type, isActive, isLocked)}
                <span>{typeLabels[type]}</span>
                      </button>
          {/* {isLocked && (
             <div className='text-xs pt-1 text-green-600'> {isRtl ? 'قريباً' : 'Coming Soon'}</div>
          )}
          {!isLocked && (
             <div className='text-xs pt-1 text-gray-800'>&nbsp;</div>
          )} */}
              </div>
             
                     
            );
           
          })}
          
          </div>

        <div className="relative">
          <div
            className={`${styles.searchBar} flex items-center bg-white border border-[#299af8] rounded-[6px] w-full px-3 py-2 gap-2`}
            style={{ fontSize: '16px' }}
          >
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
            <div
              aria-hidden="true"
              className={`h-6 w-px bg-gray-200 mx-2 `}
              style={{ alignSelf: 'center' }}
            />
            {/* Filter chips inline on md+ screens */}
            <div className="hidden md:flex items-center gap-2">
              {renderFilterPill({
                title: locale === 'ar' ? 'القطاع' : 'Industry',
                subtitle: selectedIsic ? selectedIsic.code : (locale === 'ar' ? 'رمز ISIC' : 'ISIC code'),
                ariaLabel: isRtl ? 'اختر القطاع (ISIC)' : 'Select Industry (ISIC code)',
                disabled: isLoadingIsic,
                active: !!selectedIsic,
                icon: isLoadingIsic ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <IconBuildingBank className="w-[18px] h-[18px]" />
                ),
                onClick: () => setIsIsicModalOpen(true),
                onClear: selectedIsic ? () => clearIsicSelection() : undefined,
              })}

              {renderFilterPill({
                title: locale === 'ar' ? 'المنتج' : 'Products',
                subtitle: selectedHs ? selectedHs.code : (locale === 'ar' ? 'رمز HS' : 'HS code'),
                ariaLabel: isRtl ? 'اختر رمز المنتج (HS Code)' : 'Select Product (HS Code)',
                disabled: isHsDisabled,
                active: !!selectedHs && !isHsDisabled,
                icon: isHsDisabled ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 64 64" fill="none">
                    <g transform="matrix(0.99,0,0,0.99,0.32,0.3)" stroke="none" fill="currentColor">
                      <path d="m49.5 34c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5z" />
                      <path d="m32 3c-.82842712 0-1.5.67157288-1.5 1.5v2.8007812c-1.2649826.52060382-2.2043206 1.6749789-2.4335938 3.0566406l-14.742188 16.642578h-6.8242188c-1.3590542 0-2.5 1.1409458-2.5 2.5v25c0 1.3590542 1.1409458 2.5 2.5 2.5h51c1.3590542 0 2.5-1.1409458 2.5-2.5v-25c0-1.3590542-1.1409361-2.5000073-2.5-2.5h-28c-.82842712 0-1.5.67157288-1.5 1.5s.67157288 1.5 1.5 1.5h27.5v24h-33v-24.5c0-1.3590542-1.1409458-2.5-2.5-2.5h-4.1679688l11.761719-13.279297c.73236176.78125202 1.7636799 1.2792969 2.90625 1.2792969 1.1727683 0 2.2019554-.53489178 2.9160156-1.359375l9.125 9.765625c.56539461.60477567 1.51386.63711965 2.1191406.0722656.60606614-.56559238.63843164-1.5155634.0722656-2.1210937l-10.396484-11.123047c-.26624623-1.3120561-1.1427571-2.4088386-2.3359375-2.9199219v-2.8144531c0-.82842712-.67157288-1.5-1.5-1.5zm-17 27h5c.554 0 1 .446 1 1v22c0 .554-.446 1-1 1h-5c-.554 0-1-.446-1-1v-22c0-.554.446-1 1-1z" />
                    </g>
                  </svg>
                ),
                onClick: () => setIsHsModalOpen(true),
                onClear: selectedHs ? () => clearHsSelection() : undefined,
              })}
              
              {/* Accuracy filter moved below the search field */}
            </div>
            
            
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
          {renderFilterPill({
            title: locale === 'ar' ? 'الصناعة' : 'Industry',
            subtitle: selectedIsic ? selectedIsic.code : (locale === 'ar' ? 'رمز ISIC' : 'ISIC code'),
            ariaLabel: isRtl ? 'اختر القطاع (ISIC)' : 'Select Industry (ISIC code)',
            disabled: isLoadingIsic,
            active: !!selectedIsic,
            icon: isLoadingIsic ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <IconBuildingBank className="w-[18px] h-[18px]" />
            ),
            onClick: () => setIsIsicModalOpen(true),
            onClear: selectedIsic ? () => clearIsicSelection() : undefined,
          })}

          {renderFilterPill({
            title: locale === 'ar' ? 'المنتج' : 'Products',
            subtitle: selectedHs ? selectedHs.code : (locale === 'ar' ? 'رمز HS' : 'HS code'),
            ariaLabel: isRtl ? 'اختر رمز المنتج (HS Code)' : 'Select Product (HS Code)',
            disabled: isHsDisabled,
            active: !!selectedHs && !isHsDisabled,
            icon: isHsDisabled ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 64 64" fill="none">
                <g transform="matrix(0.99,0,0,0.99,0.32,0.3)" stroke="none" fill="currentColor">
                  <path d="m49.5 34c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5z" />
                  <path d="m32 3c-.82842712 0-1.5.67157288-1.5 1.5v2.8007812c-1.2649826.52060382-2.2043206 1.6749789-2.4335938 3.0566406l-14.742188 16.642578h-6.8242188c-1.3590542 0-2.5 1.1409458-2.5 2.5v25c0 1.3590542 1.1409458 2.5 2.5 2.5h51c1.3590542 0 2.5-1.1409458 2.5-2.5v-25c0-1.3590542-1.1409361-2.5000073-2.5-2.5h-28c-.82842712 0-1.5.67157288-1.5 1.5s.67157288 1.5 1.5 1.5h27.5v24h-33v-24.5c0-1.3590542-1.1409458-2.5-2.5-2.5h-4.1679688l11.761719-13.279297c.73236176.78125202 1.7636799 1.2792969 2.90625 1.2792969 1.1727683 0 2.2019554-.53489178 2.9160156-1.359375l9.125 9.765625c.56539461.60477567 1.51386.63711965 2.1191406.0722656.60606614-.56559238.63843164-1.5155634.0722656-2.1210937l-10.396484-11.123047c-.26624623-1.3120561-1.1427571-2.4088386-2.3359375-2.9199219v-2.8144531c0-.82842712-.67157288-1.5-1.5-1.5zm-17 27h5c.554 0 1 .446 1 1v22c0 .554-.446 1-1 1h-5c-.554 0-1-.446-1-1v-22c0-.554.446-1 1-1z" />
                </g>
              </svg>
            ),
            onClick: () => setIsHsModalOpen(true),
            onClear: selectedHs ? () => clearHsSelection() : undefined,
          })}
          
          {/* Accuracy chip removed on mobile; control placed under search field */}
        </div>
        
        {shouldShowSuggestions && isMounted
          ? (createPortal(
              <div
                ref={suggestionsRef}
                style={{
                  position: 'fixed',
                  top: dropdownRect.top,
                  left: dropdownRect.left,
                  width: dropdownRect.width,
                  zIndex: 10000,
                }}
                className="mt-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                onMouseEnter={() => setMouseInSuggestions(true)}
                onMouseLeave={() => setMouseInSuggestions(false)}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion}-${index}`}
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
                        {(() => {
                          const match = searchQuery ? arabicFuzzyMatch(suggestion, searchQuery) : null;
                          if (!match || match.length <= 0) return suggestion;
                          const beforeMatch = suggestion.substring(0, match.index);
                          const matchedText = suggestion.substring(match.index, match.index + match.length);
                          const afterMatch = suggestion.substring(match.index + match.length);
                          return (
                            <>
                              {beforeMatch}
                              <strong className="font-bold">{matchedText}</strong>
                              {afterMatch}
                            </>
                          );
                        })()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>,
              document.body
            ) as any)
          : null}
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
                aria-label={isRtl ? 'تفاصيل رمز المنتج المحدد' : 'Selected HS details'}
              >
                <span className="font-medium">{isRtl ? 'رمز المنتج (HS Code):' : 'Products (HS Code):'}</span>
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
          title={locale === 'ar' ? 'ابحث عن التقارير والبيانات والرؤى حسب القطاع' : 'Search data, reports, and insights by industry'}
          size="lg"
          overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder={locale === 'ar' ? ' ابحث هنا' : ' search here'}
              value={isicSearch}
              onChange={(e) => setIsicSearch(e.target.value)}
              className={`w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              dir={isRtl ? 'rtl' : 'ltr'}
            />
            {isLoadingIsic ? (
              <div className="flex justify-center py-8"><Loader size="md" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
                <IsicLeafNodesList nodes={filteredIsicLeafNodes} locale={locale} onSelect={handleSelectIsic} />
              </div>
            )}
          </div>
        </Modal>
        {/* HS Modal */}
        <Modal
          opened={isHsModalOpen}
          onClose={() => setIsHsModalOpen(false)}
          title={locale === 'ar' ? 'ابحث عن التقارير والبيانات والرؤى حسب المنتج' : 'Search data, reports, and insights by product'}
          size="lg"
          overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder={locale === 'ar' ? 'ابحث عن رمز المنتج...' : 'Search Products...'}
              value={hsSearch}
              onChange={(e) => setHsSearch(e.target.value)}
              className={`w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              dir={isRtl ? 'rtl' : 'ltr'}
            />
            {isLoadingHs ? (
              <div className="flex justify-center py-8"><Loader size="md" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
                {selectedIsic ? (
                  <>
                    {hsModalBuckets && (
                      <HsBucketsList
                        related={hsModalBuckets.related}
                        others={hsModalBuckets.others}
                        locale={locale}
                        onSelect={handleSelectHs}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <HsCodesList codes={filteredHsCodes} locale={locale} onSelect={handleSelectHs} />
                    {filteredHsCodes.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 text-sm">
                        {locale === 'ar' ? 'لا توجد رموز HS متاحة' : 'No Products available'}
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

export default SearchBar;
