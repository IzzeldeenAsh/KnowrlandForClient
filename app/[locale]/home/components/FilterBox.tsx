'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Select, Modal, Loader, Chip, Combobox, Input, InputBase, useCombobox, Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconRefresh, IconCode, IconBuildingFactory, IconWorldSearch, IconBuildingBank, IconMap, IconWorld, IconLanguage, IconCoin } from '@tabler/icons-react';

import { useTranslations } from 'next-intl';
import { getApiUrl } from '@/app/config';
import { useSearchParams } from 'next/navigation';

interface Region {
  id: number;
  name: string;
}

interface EconomicBloc {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
  flag?: string;
  iso2?: string;
  iso3?: string;
  names?: {
    en: string;
    ar: string;
  };
  nationality?: string;
  nationalities?: {
    en: string;
    ar: string;
  };
  region_id?: number;
  international_code?: string;
  status?: string;
}

interface ISICCode {
  key: number;
  code: string;
  label: string;
  names: {
    en: string;
    ar: string;
  };
  parent_id: number;
  status: string;
  children: ISICCode[];
}

interface HSCode {
  id: number;
  code: string;
  isic_code_id: number;
  status: string;
  name: string;
  names: {
    en: string;
    ar: string;
  };
}

interface IndustryNode {
  key: number;
  label: string;
  children: IndustryNode[];
}

interface FilterBoxProps {
  locale: string;
  searchType?: 'knowledge' | 'insighter';
  languageFilter: 'all' | 'arabic' | 'english';
  setLanguageFilter: (filter: 'all' | 'arabic' | 'english') => void;
  countryFilter: number | null;
  setCountryFilter: (filter: number | null) => void;
  regionFilter?: number | null;
  setRegionFilter?: (filter: number | null) => void;
  economicBlocFilter?: number | null;
  setEconomicBlocFilter?: (filter: number | null) => void;
  isicCodeFilter?: string | null;
  setIsicCodeFilter?: (filter: string | null) => void;
  hsCodeFilter?: string | null;
  setHsCodeFilter?: (filter: string | null) => void;
  industryFilter?: number | null;
  setIndustryFilter?: (filter: number | null) => void;
  priceFilter?: string | null;
  setPriceFilter?: (filter: string | null) => void;
  priceRangeStart?: number | null;
  setPriceRangeStart?: (value: number | null) => void;
  priceRangeEnd?: number | null;
  setPriceRangeEnd?: (value: number | null) => void;
  accuracyFilter?: 'any' | 'all';
  setAccuracyFilter?: (filter: 'any' | 'all') => void;
  roleFilter?: 'all' | 'company' | 'individual';
  setRoleFilter?: (filter: 'all' | 'company' | 'individual') => void;
  resetFilters?: () => Promise<void>;
  // Drawer props for responsive behavior
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (open: boolean) => void;
  forceDrawerMode?: boolean;
}

const noop = () => {};
const PRICE_RANGE_DEBOUNCE_MS = 1000;

const FilterBox: React.FC<FilterBoxProps> = ({
  locale,
  searchType = 'knowledge',
  languageFilter,
  setLanguageFilter,
  countryFilter,
  setCountryFilter,
  regionFilter = null,
  setRegionFilter = () => {},
  economicBlocFilter = null,
  setEconomicBlocFilter = () => {},
  isicCodeFilter = null,
  setIsicCodeFilter = noop,
  hsCodeFilter = null,
  setHsCodeFilter = noop,
  industryFilter = null,
  setIndustryFilter = noop,
  priceFilter = null,
  setPriceFilter = noop,
  priceRangeStart = 0,
  setPriceRangeStart = noop,
  priceRangeEnd = null,
  setPriceRangeEnd = noop,
  accuracyFilter = 'all',
  setAccuracyFilter = noop,
  roleFilter = 'all',
  setRoleFilter = noop,
  resetFilters = async () => {},
  // Drawer props
  isDrawerOpen = false,
  setIsDrawerOpen = () => {},
  forceDrawerMode = false
}) => {
  console.log(`🔧 FilterBox rendered with searchType: ${searchType}`);
  console.log(`🔧 Price/Language sections visible: ${searchType !== 'insighter'}`);
  console.log(`🔧 Role section visible: ${searchType === 'insighter'}`);
  
  // Responsive breakpoint detection - tablet and mobile use drawer
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
  const shouldUseDrawer = forceDrawerMode || isTabletOrMobile;
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [economicBlocs, setEconomicBlocs] = useState<EconomicBloc[]>([]);
  const [isicCodes, setIsicCodes] = useState<ISICCode[]>([]);
  const [hsCodes, setHsCodes] = useState<HSCode[]>([]);
  const [industries, setIndustries] = useState<IndustryNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingEconomicBlocs, setLoadingEconomicBlocs] = useState(false);
  const [loadingIsicCodes, setLoadingIsicCodes] = useState(false);
  const [loadingHsCodes, setLoadingHsCodes] = useState(false);
  const [loadingIndustries, setLoadingIndustries] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHsCodeModalOpen, setIsHsCodeModalOpen] = useState(false);
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [selectedIsicCode, setSelectedIsicCode] = useState<{
    id: number;
    code: string;
    label: string;
  } | null>(null);
  const [selectedHsCode, setSelectedHsCode] = useState<{
    id: number;
    code: string;
    label: string;
  } | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<{
    id: number;
    label: string;
  } | null>(null);

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  const [leafNodes, setLeafNodes] = useState<ISICCode[]>([]);
  const [filteredLeafNodes, setFilteredLeafNodes] = useState<ISICCode[]>([]);
  
  // State for HS code search
  const [hsCodeSearchTerm, setHsCodeSearchTerm] = useState("");
  const [filteredHsCodes, setFilteredHsCodes] = useState<HSCode[]>([]);
  
  // State for industry search
  const [industrySearchTerm, setIndustrySearchTerm] = useState("");
  const [industryLeafNodes, setIndustryLeafNodes] = useState<IndustryNode[]>([]);
  const [filteredIndustryLeafNodes, setFilteredIndustryLeafNodes] = useState<IndustryNode[]>([]);

  // State for content types collapse - adjust based on search type and screen size
  const [priceCollapsed, setpriceCollapsed] = useState(shouldUseDrawer);
  const [languageCollapsed, setLanguageCollapsed] = useState(shouldUseDrawer);
  const [accuracyCollapsed, setAccuracyCollapsed] = useState(searchType === 'knowledge' || shouldUseDrawer); // Collapsed for knowledge or small screens, visible for insighter on large screens
  const [industryCollapsed, setIndustryCollapsed] = useState(searchType === 'insighter' || shouldUseDrawer); // Collapsed for insighter or small screens, visible for knowledge on large screens
  const [targetMarketCollapsed, setTargetMarketCollapsed] = useState(true);
  const [publicationDateCollapsed, setPublicationDateCollapsed] = useState(true);
  const [archiveCollapsed, setArchiveCollapsed] = useState(true);
  const [roleCollapsed, setRoleCollapsed] = useState(shouldUseDrawer);

  // State for publication date filter
  const [publicationDateFilter, setPublicationDateFilter] = useState<'all' | 'last_month' | 'last_3_months' | 'last_6_months' | 'last_year'>('all');
  
  // State for archive filter  
  const [archiveFilter, setArchiveFilter] = useState<'all' | 'with_archive' | 'without_archive'>('without_archive');

  // State for combobox search functionality
  const [economicBlocSearch, setEconomicBlocSearch] = useState('');
  const [regionSearch, setRegionSearch] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);
  const priceRangeStartSetterRef = useRef(setPriceRangeStart);
  const priceRangeEndSetterRef = useRef(setPriceRangeEnd);
  const shouldApplyDefaultPriceRangeEndRef = useRef(priceRangeEnd === null);
  const debounceTimeoutStartRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeoutEndRef = useRef<NodeJS.Timeout | null>(null);
  const lastUserInputStartRef = useRef<number>(0);
  const lastUserInputEndRef = useRef<number>(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    priceRangeStartSetterRef.current = setPriceRangeStart;
  }, [setPriceRangeStart]);

  useEffect(() => {
    priceRangeEndSetterRef.current = setPriceRangeEnd;
  }, [setPriceRangeEnd]);

  // Initialize input values from URL params on mount
  useEffect(() => {
    const urlRangeStart = searchParams.get('range_start');
    const urlRangeEnd = searchParams.get('range_end');

    if (minPriceInputRef.current) {
      minPriceInputRef.current.value = urlRangeStart || (priceRangeStart ?? 0).toString();
    }
    if (maxPriceInputRef.current) {
      if (urlRangeEnd) {
        maxPriceInputRef.current.value = urlRangeEnd;
      } else if (priceRangeEnd !== null && priceRangeEnd !== undefined) {
        maxPriceInputRef.current.value = priceRangeEnd.toString();
      } else {
        maxPriceInputRef.current.value = '1000000';
      }
    }
  }, []); // Only run on mount

  // Handle price filter changes
  useEffect(() => {
    if (priceFilter === 'false') {
      if (minPriceInputRef.current) {
        minPriceInputRef.current.value = '0';
      }
      if (maxPriceInputRef.current) {
        maxPriceInputRef.current.value = '';
      }
      priceRangeStartSetterRef.current(0);
      priceRangeEndSetterRef.current(null);
      shouldApplyDefaultPriceRangeEndRef.current = true;
    } else if (priceRangeEnd === null && shouldApplyDefaultPriceRangeEndRef.current) {
      if (maxPriceInputRef.current) {
        maxPriceInputRef.current.value = '1000000';
      }
      priceRangeEndSetterRef.current(1000000);
      shouldApplyDefaultPriceRangeEndRef.current = false;
    }
  }, [priceFilter, priceRangeEnd]);

  // Sync input values with URL parameters (but not during user input)
  useEffect(() => {
    const now = Date.now();
    const timeSinceLastInputStart = now - lastUserInputStartRef.current;
    const timeSinceLastInputEnd = now - lastUserInputEndRef.current;

    // Get values from URL params
    const urlRangeStart = searchParams.get('range_start');
    const urlRangeEnd = searchParams.get('range_end');

    // Sync min price input if user hasn't typed recently
    if (minPriceInputRef.current && timeSinceLastInputStart > 2000) {
      const expectedValue = urlRangeStart || '0';
      const currentValue = minPriceInputRef.current.value;

      if (currentValue !== expectedValue) {
        minPriceInputRef.current.value = expectedValue;
      }
    }

    // Sync max price input if user hasn't typed recently
    if (maxPriceInputRef.current && timeSinceLastInputEnd > 2000) {
      const expectedValue = urlRangeEnd || '';
      const currentValue = maxPriceInputRef.current.value;

      if (currentValue !== expectedValue) {
        maxPriceInputRef.current.value = expectedValue;
      }
    }
  }, [searchParams]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutStartRef.current) {
        clearTimeout(debounceTimeoutStartRef.current);
      }
      if (debounceTimeoutEndRef.current) {
        clearTimeout(debounceTimeoutEndRef.current);
      }
    };
  }, []);

  // Combobox stores
  const economicBlocCombobox = useCombobox({
    onDropdownClose: () => {
      economicBlocCombobox.resetSelectedOption();
      economicBlocCombobox.focusTarget();
      setEconomicBlocSearch('');
    },
    onDropdownOpen: () => {
      economicBlocCombobox.focusSearchInput();
    },
  });

  const regionCombobox = useCombobox({
    onDropdownClose: () => {
      regionCombobox.resetSelectedOption();
      regionCombobox.focusTarget();
      setRegionSearch('');
    },
    onDropdownOpen: () => {
      regionCombobox.focusSearchInput();
    },
  });

  const countryCombobox = useCombobox({
    onDropdownClose: () => {
      countryCombobox.resetSelectedOption();
      countryCombobox.focusTarget();
      setCountrySearch('');
    },
    onDropdownOpen: () => {
      countryCombobox.focusSearchInput();
    },
  });

  // Update collapsed states when search type or screen size changes
  useEffect(() => {
    console.log(`🔧 FilterBox searchType changed to: ${searchType}, screen size drawer: ${shouldUseDrawer}, updating collapsed states`);
    setAccuracyCollapsed(searchType === 'knowledge' || shouldUseDrawer); // Visible for insighter on large screens only
    setIndustryCollapsed(searchType === 'insighter' || shouldUseDrawer); // Visible for knowledge on large screens only
    setpriceCollapsed(shouldUseDrawer); // Closed on small screens by default
    setLanguageCollapsed(shouldUseDrawer); // Closed on small screens by default  
    setRoleCollapsed(shouldUseDrawer); // Closed on small screens by default
  }, [searchType, shouldUseDrawer]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(getApiUrl('/api/common/setting/country/list'), {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json',
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch countries');
        
        const data = await response.json();
        setCountries(data.data || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRegions = async () => {
      setLoadingRegions(true);
      try {
        const response = await fetch(getApiUrl('/api/common/setting/region/list'), {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json',
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch regions');
        
        const data = await response.json();
        // Extract only the region data without countries
        const regionsData = data.data ? data.data.map((region: Region) => ({
          id: region.id,
          name: region.name
        })) : [];
        setRegions(regionsData);
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoadingRegions(false);
      }
    };

    const fetchEconomicBlocs = async () => {
      setLoadingEconomicBlocs(true);
      try {
        const response = await fetch(getApiUrl('/api/common/setting/economic-bloc/list'), {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json',
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch economic blocs');
        
        const data = await response.json();
        // Extract only the economic bloc data without countries
        const economicBlocsData = data.data ? data.data.map((bloc: EconomicBloc) => ({
          id: bloc.id,
          name: bloc.name
        })) : [];
        setEconomicBlocs(economicBlocsData);
      } catch (error) {
        console.error('Error fetching economic blocs:', error);
      } finally {
        setLoadingEconomicBlocs(false);
      }
    };

    const fetchIsicCodes = async () => {
      setLoadingIsicCodes(true);
      try {
        const response = await fetch(getApiUrl('/api/common/setting/isic-code/tree-list'), {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json',
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch ISIC codes');
        
        const data = await response.json();
        setIsicCodes(data || []);
      } catch (error) {
        console.error('Error fetching ISIC codes:', error);
      } finally {
        setLoadingIsicCodes(false);
      }
    };

    const fetchIndustries = async () => {
      setLoadingIndustries(true);
      try {
        const response = await fetch(getApiUrl('/api/common/setting/industry/tree'), {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json',
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch industries');
        
        const data = await response.json();
        setIndustries(data || []);
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setLoadingIndustries(false);
      }
    };

    fetchCountries();
    fetchRegions();
    fetchEconomicBlocs();
    fetchIsicCodes();
    fetchIndustries();
  }, [locale]);

  // Fetch HS codes when ISIC code is selected
  useEffect(() => {
    const fetchHsCodes = async (isicCodeId: number) => {
      setLoadingHsCodes(true);
      try {
        const response = await fetch(getApiUrl(`/api/common/setting/hs-code/isic-code/${isicCodeId}`), {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json',
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch HS codes');
        
        const data = await response.json();
        setHsCodes(data.data || []);
      } catch (error) {
        console.error('Error fetching HS codes:', error);
        setHsCodes([]);
      } finally {
        setLoadingHsCodes(false);
      }
    };

    if (selectedIsicCode?.id) {
      fetchHsCodes(selectedIsicCode.id);
    } else {
      // Clear HS codes when no ISIC code is selected
      setHsCodes([]);
      setSelectedHsCode(null);
      setHsCodeFilter?.(null);
    }
  }, [selectedIsicCode?.id, locale, setHsCodeFilter]);

  // Initialize selected ISIC code based on prop value
  useEffect(() => {
    if (isicCodeFilter && leafNodes.length > 0) {
      const selectedCode = leafNodes.find(node => node.code === isicCodeFilter);
      if (selectedCode) {
        setSelectedIsicCode({
          id: selectedCode.key,
          code: selectedCode.code,
          label: locale === 'ar' ? selectedCode.names.ar : selectedCode.names.en
        });
      }
    } else if (!isicCodeFilter) {
      setSelectedIsicCode(null);
    }
  }, [isicCodeFilter, leafNodes, locale]);

  // Initialize selected HS code based on prop value
  useEffect(() => {
    if (hsCodeFilter && hsCodes.length > 0) {
      const selectedCode = hsCodes.find(code => code.code === hsCodeFilter);
      if (selectedCode) {
        setSelectedHsCode({
          id: selectedCode.id,
          code: selectedCode.code,
          label: locale === 'ar' ? selectedCode.names.ar : selectedCode.names.en
        });
      }
    } else if (!hsCodeFilter) {
      setSelectedHsCode(null);
    }
  }, [hsCodeFilter, hsCodes, locale]);

  // Initialize selected industry based on prop value
  useEffect(() => {
    if (industryFilter && industryLeafNodes.length > 0) {
      const selectedNode = industryLeafNodes.find(node => node.key === industryFilter);
      if (selectedNode) {
        setSelectedIndustry({
          id: selectedNode.key,
          label: selectedNode.label
        });
      }
    } else if (!industryFilter) {
      setSelectedIndustry(null);
    }
  }, [industryFilter, industryLeafNodes]);

  // Function to convert ISO2 country code to flag emoji
  const getCountryFlagEmoji = (iso2?: string): string => {
    if (!iso2 || iso2.length !== 2) return '';
    try {
      const codePoints = iso2
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch (error) {
      console.error('Error generating flag emoji:', error);
      return '';
    }
  };

  // Convert countries to Mantine Select data format with flag emojis
  const countryOptions = countries.map(country => ({
    value: country.id.toString(),
    label: `${getCountryFlagEmoji(country.iso2)} ${locale === 'ar' && country.names?.ar ? country.names.ar : country.name}`
  }));
  // Convert regions to Mantine Select data format
  const regionOptions = regions.map((region: Region) => ({
    value: region.id.toString(),
    label: region.name
  }));
  
  // Convert economic blocs to Mantine Select data format
  const economicBlocOptions = economicBlocs.map((bloc: EconomicBloc) => ({
    value: bloc.id.toString(),
    label: bloc.name
  }));

  // Helper functions to get display text for selected values
  const getSelectedEconomicBlocLabel = () => {
    if (!economicBlocFilter) return null;
    const selected = economicBlocs.find(bloc => bloc.id === economicBlocFilter);
    return selected ? selected.name : null;
  };

  const getSelectedRegionLabel = () => {
    if (!regionFilter) return null;
    const selected = regions.find(region => region.id === regionFilter);
    return selected ? selected.name : null;
  };

  const getSelectedCountryLabel = () => {
    if (!countryFilter) return null;
    const selected = countries.find(country => country.id === countryFilter);
    return selected ? `${getCountryFlagEmoji(selected.iso2)} ${locale === 'ar' && selected.names?.ar ? selected.names.ar : selected.name}` : null;
  };

  // Filter options based on search
  const filteredEconomicBlocOptions = economicBlocOptions.filter(option =>
    option.label.toLowerCase().includes(economicBlocSearch.toLowerCase().trim())
  );

  const filteredRegionOptions = regionOptions.filter(option =>
    option.label.toLowerCase().includes(regionSearch.toLowerCase().trim())
  );

  const filteredCountryOptions = countryOptions.filter(option =>
    option.label.toLowerCase().includes(countrySearch.toLowerCase().trim())
  );

  // Define language options for dropdown
  const languageOptions = [
    { value: 'all', label: locale === 'ar' ? '\u0627\u0644\u0643\u0644' : 'All' },
    { value: 'arabic', label: locale === 'ar' ? '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' : 'Arabic' },
    { value: 'english', label: locale === 'ar' ? '\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629' : 'English' }
  ];

  // Check if a node is a leaf node (has no children)
  const isLeafNode = (node: ISICCode): boolean => {
    return node.children.length === 0;
  };
  
  // Check if an industry node is a leaf node (has no children)
  const isIndustryLeafNode = (node: IndustryNode): boolean => {
    return node.children.length === 0;
  };

  // Extract all leaf nodes from the tree structure
  useEffect(() => {
    const extractLeafNodes = (nodes: ISICCode[]): ISICCode[] => {
      let result: ISICCode[] = [];
      
      for (const node of nodes) {
        if (isLeafNode(node)) {
          result.push(node);
        } else {
          result = result.concat(extractLeafNodes(node.children));
        }
      }
      
      return result;
    };
    
    const allLeafNodes = extractLeafNodes(isicCodes);
    setLeafNodes(allLeafNodes);
    setFilteredLeafNodes(allLeafNodes);
  }, [isicCodes]);
  
  // Extract all industry leaf nodes from the tree structure
  useEffect(() => {
    const extractIndustryLeafNodes = (nodes: IndustryNode[]): IndustryNode[] => {
      let result: IndustryNode[] = [];
      
      for (const node of nodes) {
        if (isIndustryLeafNode(node)) {
          result.push(node);
        } else {
          result = [...result, ...extractIndustryLeafNodes(node.children)];
        }
      }
      
      return result;
    };
    
    const allIndustryLeafNodes = extractIndustryLeafNodes(industries);
    setIndustryLeafNodes(allIndustryLeafNodes);
    setFilteredIndustryLeafNodes(allIndustryLeafNodes);
  }, [industries]);

  // Filter leaf nodes based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLeafNodes(leafNodes);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = leafNodes.filter(node => {
      return (
        node.code.toLowerCase().includes(searchTermLower) ||
        node.names.en.toLowerCase().includes(searchTermLower) ||
        node.names.ar.toLowerCase().includes(searchTermLower)
      );
    });

    setFilteredLeafNodes(filtered);
  }, [searchTerm, leafNodes]);
  
  // Filter industry leaf nodes based on search term
  useEffect(() => {
    if (!industrySearchTerm.trim()) {
      setFilteredIndustryLeafNodes(industryLeafNodes);
      return;
    }

    const searchTermLower = industrySearchTerm.toLowerCase();
    const filtered = industryLeafNodes.filter(node => {
      return node.label.toLowerCase().includes(searchTermLower);
    });

    setFilteredIndustryLeafNodes(filtered);
  }, [industrySearchTerm, industryLeafNodes]);

  // Filter HS codes based on search term
  useEffect(() => {
    if (!hsCodeSearchTerm.trim()) {
      setFilteredHsCodes(hsCodes);
      return;
    }

    const searchTermLower = hsCodeSearchTerm.toLowerCase();
    const filtered = hsCodes.filter(code => {
      return (
        code.code.toLowerCase().includes(searchTermLower) ||
        code.names.en.toLowerCase().includes(searchTermLower) ||
        code.names.ar.toLowerCase().includes(searchTermLower)
      );
    });

    setFilteredHsCodes(filtered);
  }, [hsCodeSearchTerm, hsCodes]);

  // Render the list of leaf nodes
  const renderLeafNodes = () => {
    return (
      <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
        {filteredLeafNodes.map((node) => {
          const isSelected = selectedIsicCode?.id === node.key;
          const marginClass = locale === 'ar' ? 'ml-2' : 'mr-2';
          
          return (
            <button
              key={node.key}
              className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors ${isSelected ? ' text-blue-800 font-medium' : 'hover:bg-gray-100 border border-gray-200'}`}
              onClick={() => handleSelectIsicCode(node)}
            >
              <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${marginClass}`}>{node.code}</span>
              <span className="flex-1">{locale === 'ar' ? node.names.ar : node.names.en}</span>
            </button>
          );
        })}
      </div>
    );
  };
  
  // Render the list of HS codes
  const renderHsCodes = () => {
    if (filteredHsCodes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            {locale === 'ar' ? 'لا توجد رموز HS متاحة لرمز ISIC المحدد' : 'No HS codes available for the selected ISIC code'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
        {filteredHsCodes.map((code) => {
          const isSelected = selectedHsCode?.id === code.id;
          const marginClass = locale === 'ar' ? 'ml-2' : 'mr-2';
          
          return (
            <button
              key={code.id}
              className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${isSelected ? ' text-blue-800 font-medium' : 'hover:bg-gray-100 border border-gray-200'}`}
              onClick={() => handleSelectHsCode(code)}
            >
              <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${marginClass}`}>{code.code}</span>
              <span className="flex-1">{locale === 'ar' ? code.names.ar : code.names.en}</span>
            </button>
          );
        })}
      </div>
    );
  };
  
  // Render the list of industry leaf nodes
  const renderIndustryLeafNodes = () => {
    return (
      <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
        {filteredIndustryLeafNodes.map((node) => {
          const isSelected = selectedIndustry?.id === node.key;
          
          return (
            <button
              key={node.key}
              className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${isSelected ? ' text-blue-800 font-medium' : 'hover:bg-gray-100 border border-gray-200'}`}
              onClick={() => handleSelectIndustry(node)}
            >
              <span className="flex-1">{node.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Handle ISIC code selection
  const handleSelectIsicCode = (node: ISICCode) => {
    if (isLeafNode(node)) {
      // Clear HS code selection when ISIC code changes
      setSelectedHsCode(null);
      setHsCodeFilter?.(null);
      
      setSelectedIsicCode({
        id: node.key,
        code: node.code,
        label: locale === 'ar' ? node.names.ar : node.names.en
      });
      setIsicCodeFilter?.(node.code);
      setIsModalOpen(false);
    }
  };
  
  // Handle industry selection
  const handleSelectIndustry = (node: IndustryNode) => {
    if (isIndustryLeafNode(node)) {
      setSelectedIndustry({
        id: node.key,
        label: node.label
      });
      
      // Call the parent component's setIndustryFilter function to trigger the search
      if (setIndustryFilter) {
        setIndustryFilter(node.key);
      }
      
      // Close the modal
      setIsIndustryModalOpen(false);
    }
  };
  
  // Handle clearing the ISIC code filter
  const handleClearIsicCode = (e: React.MouseEvent) => {
    // Prevent the click from bubbling up to the parent div that opens the modal
    e.stopPropagation();
    
    // Clear the selected ISIC code and HS code
    setSelectedIsicCode(null);
    setSelectedHsCode(null);
    
    // Call the parent component's filter functions to trigger a search without the filters
    if (setIsicCodeFilter) {
      setIsicCodeFilter(null);
    }
    if (setHsCodeFilter) {
      setHsCodeFilter(null);
    }
  };
  
  // Handle clearing the industry filter
  const handleClearIndustry = (e: React.MouseEvent) => {
    // Prevent the click from bubbling up to the parent div that opens the modal
    e.stopPropagation();
    
    // Clear the selected industry
    setSelectedIndustry(null);
    
    // Call the parent component's setIndustryFilter function to trigger a search without the industry filter
    if (setIndustryFilter) {
      setIndustryFilter(null);
    }
  };

  // Handle HS code selection
  const handleSelectHsCode = (code: HSCode) => {
    setSelectedHsCode({
      id: code.id,
      code: code.code,
      label: locale === 'ar' ? code.names.ar : code.names.en
    });
    
    // Call the parent component's setHsCodeFilter function to trigger the search
    if (setHsCodeFilter) {
      setHsCodeFilter(code.code);
    }
    
    // Close the modal
    setIsHsCodeModalOpen(false);
  };

  // Handle clearing the HS code filter
  const handleClearHsCode = (e: React.MouseEvent) => {
    // Prevent the click from bubbling up to the parent div that opens the modal
    e.stopPropagation();
    
    // Clear the selected HS code
    setSelectedHsCode(null);
    
    // Call the parent component's setHsCodeFilter function to trigger a search without the HS code filter
    if (setHsCodeFilter) {
      setHsCodeFilter(null);
    }
  };

  // Reset all filters to default values
  const handleResetFilters = async () => {
    try {
      console.log('Starting filter reset...');
      
      // Clear local component state
      setSelectedIsicCode(null);
      setSelectedHsCode(null);
      setSelectedIndustry(null);
      shouldApplyDefaultPriceRangeEndRef.current = true;

      // Reset input values directly
      if (minPriceInputRef.current) {
        minPriceInputRef.current.value = '0';
      }
      if (maxPriceInputRef.current) {
        maxPriceInputRef.current.value = '1000000';
      }
      
      // Call the parent resetFilters function to update URL and global state
      // This is now async and will handle the search API call
      await resetFilters();
      
      console.log('Filter reset completed successfully');
    } catch (error) {
      console.error('Error during filter reset:', error);
      // You could add a toast notification here if needed
    }
  };
  
  // Handle price filter selection
  const handlePriceFilterChange = (value: string | null) => {
    // Call the parent component's setPriceFilter function to trigger the search
    if (setPriceFilter) {
      setPriceFilter(value);
    }

    if (value === 'false') {
      if (minPriceInputRef.current) {
        minPriceInputRef.current.value = '0';
      }
      if (maxPriceInputRef.current) {
        maxPriceInputRef.current.value = '';
      }
      setPriceRangeStart(0);
      setPriceRangeEnd(null);
      shouldApplyDefaultPriceRangeEndRef.current = true;
    } else if (value !== 'false' && priceRangeEnd === null) {
      shouldApplyDefaultPriceRangeEndRef.current = true;
      if (maxPriceInputRef.current) {
        maxPriceInputRef.current.value = '1000000';
      }
    }
  };

  // Handle price range minimum change with debouncing
  const handlePriceRangeStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    // Track when user last typed
    lastUserInputStartRef.current = Date.now();

    // Clear existing timeout
    if (debounceTimeoutStartRef.current) {
      clearTimeout(debounceTimeoutStartRef.current);
    }

    // Set new timeout
    debounceTimeoutStartRef.current = setTimeout(() => {
      if (priceFilter === 'false') return;

      const rawValue = value.trim();
      const parsed = rawValue === '' ? 0 : parseInt(rawValue, 10);
      const sanitized = Number.isNaN(parsed) ? 0 : Math.max(0, parsed);

      priceRangeStartSetterRef.current(sanitized);
    }, PRICE_RANGE_DEBOUNCE_MS);
  };

  // Handle price range maximum change with debouncing
  const handlePriceRangeEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    shouldApplyDefaultPriceRangeEndRef.current = false;

    // Track when user last typed
    lastUserInputEndRef.current = Date.now();

    // Clear existing timeout
    if (debounceTimeoutEndRef.current) {
      clearTimeout(debounceTimeoutEndRef.current);
    }

    // Set new timeout
    debounceTimeoutEndRef.current = setTimeout(() => {
      if (priceFilter === 'false') return;

      const rawValue = value.trim();
      if (rawValue === '') {
        priceRangeEndSetterRef.current(null);
        return;
      }

      const parsed = parseInt(rawValue, 10);
      if (Number.isNaN(parsed)) {
        priceRangeEndSetterRef.current(null);
        return;
      }

      const sanitized = Math.max(0, parsed);
      priceRangeEndSetterRef.current(sanitized);
    }, PRICE_RANGE_DEBOUNCE_MS);
  };

  // Handle role filter selection
  const handleRoleFilterChange = (value: 'all' | 'company' | 'individual') => {
    // Call the parent component's setRoleFilter function to trigger the search
    if (setRoleFilter) {
      setRoleFilter(value);
    }
  };

  // Extract the filter content into a reusable component
  const FilterContent = () => (
    <div className={`${shouldUseDrawer ? '' : 'bg-gray-50 rounded-xl shadow border border-gray-200 w-full max-w-xs'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">{locale === 'ar' ? 'الفلاتر' : 'Filters'}</h2>
        <div className="flex items-center gap-3 text-xs font-medium">
          <button className="text-blue-500 hover:underline" onClick={handleResetFilters}>{locale === 'ar' ? 'مسح' : 'Clear'}</button>
        </div>
      </div>
      <div className="p-0 divide-y divide-gray-200">
        {/* Price Types Section */}
        {searchType !== 'insighter' && (
          <div data-debug={`Price section visible for ${searchType}`}>
            <button
              onClick={() => setpriceCollapsed(!priceCollapsed)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconCoin size={20} className="p-0.5  rounded-full" />
                {locale === 'ar' ? 'السعر' : 'Price'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${priceCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {!priceCollapsed && (
              <div className="px-4 py-3 bg-white space-y-3">
                <div className="flex gap-1.5 flex-wrap">
                  <Chip
                    checked={priceFilter === null}
                    onChange={() => handlePriceFilterChange(null)}
                    variant="outline"
                    size="sm"
                  >
                    {locale === 'ar' ? 'الكل' : 'All'}
                  </Chip>
                  <Chip
                    checked={priceFilter === 'false'}
                    onChange={() => handlePriceFilterChange('false')}
                    variant="outline"
                    size="sm"
                  >
                    {locale === 'ar' ? 'مجاني' : 'Free'}
                  </Chip>
                  <Chip
                    checked={priceFilter === 'true'}
                    onChange={() => handlePriceFilterChange('true')}
                    variant="outline"
                    size="sm"
                >
                  {locale === 'ar' ? 'مدفوع' : 'Paid'}
                </Chip>
              </div>
                {priceFilter !== 'false' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">
                        {locale === 'ar' ? 'السعر الأدنى' : 'Min price'}
                      </span>
                      <Input
                        type="number"
                        min={0}
                        ref={minPriceInputRef}
                        onChange={handlePriceRangeStartChange}
                        placeholder="0"
                        size="xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">
                        {locale === 'ar' ? 'السعر الأقصى' : 'Max price'}
                      </span>
                      <Input
                        type="number"
                        min={0}
                        ref={maxPriceInputRef}
                        onChange={handlePriceRangeEndChange}
                        placeholder="1000000"
                        size="xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {/* Language Section */}
        {searchType !== 'insighter' && (
          <div data-debug={`Language section visible for ${searchType}`}>
            <button
              onClick={() => setLanguageCollapsed(!languageCollapsed)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconLanguage size={20} className="p-0.5  rounded-full" />
                {locale === 'ar' ? 'اللغة' : 'Language'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${languageCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {!languageCollapsed && (
              <div className="px-4 py-3 bg-white flex gap-2 flex-wrap">
                <Chip
                  checked={languageFilter === 'all'}
                  onChange={() => setLanguageFilter('all')}
                  variant="outline"
                  size="sm"
                >
                  {locale === 'ar' ? 'الكل' : 'All'}
                </Chip>
                <Chip
                  checked={languageFilter === 'english'}
                  onChange={() => setLanguageFilter('english')}
                  variant="outline"
                  size="sm"
                >
                  {locale === 'ar' ? 'الإنجليزية' : 'English'}
                </Chip>
                <Chip
                  checked={languageFilter === 'arabic'}
                  onChange={() => setLanguageFilter('arabic')}
                  variant="outline"
                  size="sm"
                >
                  {locale === 'ar' ? 'العربية' : 'Arabic'}
                </Chip>
              </div>
            )}
          </div>
        )}
        {/* Industry Section */}
        <div>
          <button
            onClick={() => setIndustryCollapsed(!industryCollapsed)}
            className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
          >
            <span className="flex items-center gap-2 text-blue-500 font-semibold">
              <IconBuildingFactory size={20} className="p-0.5  rounded-full" />
              {locale === 'ar' ? 'المجال' : 'Industry'}
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${industryCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {!industryCollapsed && (
            <div className="px-4 py-3 bg-white space-y-2">
              {/* Industry Filter */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'المجال' : 'Industry'}</span>
                <div onClick={() => setIsIndustryModalOpen(true)} className="border border-gray-200 bg-white py-2 px-3 rounded text-sm cursor-pointer flex justify-between items-center hover:border-blue-400 transition-colors">
                  {selectedIndustry ? (
                    <span className="truncate text-gray-800 font-semibold">{selectedIndustry.label.length > 30 ? `${selectedIndustry.label.substring(0, 30)}...` : selectedIndustry.label}</span>
                  ) : (
                    <span className="text-gray-400 font-medium">{locale === 'ar' ? 'اختر المجال' : 'Select Industry'}</span>
                  )}
                  {selectedIndustry && (
                    <button onClick={handleClearIndustry} className="ml-2 text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
              {/* ISIC Code Filter */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'رمز ISIC' : 'ISIC Code'}</span>
                <div onClick={() => setIsModalOpen(true)} className="border border-gray-200 bg-white py-2 px-3 rounded text-sm cursor-pointer flex justify-between items-center hover:border-blue-400 transition-colors">
                  {selectedIsicCode ? (
                    <span className="truncate text-gray-800 font-semibold">{selectedIsicCode.code} - {selectedIsicCode.label.length > 30 ? `${selectedIsicCode.label.substring(0, 30)}...` : selectedIsicCode.label}</span>
                  ) : (
                    <span className="text-gray-400 font-medium">{locale === 'ar' ? 'اختر رمز ISIC' : 'Select ISIC Code'}</span>
                  )}
                  {selectedIsicCode && (
                    <button onClick={handleClearIsicCode} className="ml-2 text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
              {/* HS Code Filter */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'رمز HS' : 'HS Code'}</span>
                <div 
                  onClick={selectedIsicCode ? () => setIsHsCodeModalOpen(true) : undefined} 
                  className={`border border-gray-200 py-2 px-3 rounded text-sm flex justify-between items-center transition-colors ${
                    selectedIsicCode 
                      ? 'bg-white cursor-pointer hover:border-blue-400' 
                      : 'bg-gray-100 cursor-not-allowed opacity-60'
                  }`}
                >
                  {selectedHsCode ? (
                    <span className="truncate text-gray-800 font-semibold">{selectedHsCode.code} - {selectedHsCode.label.length > 30 ? `${selectedHsCode.label.substring(0, 30)}...` : selectedHsCode.label}</span>
                  ) : (
                    <span className="text-gray-400 font-medium">
                      {selectedIsicCode 
                        ? (locale === 'ar' ? 'اختر رمز HS' : 'Select HS Code')
                        : (locale === 'ar' ? 'اختر رمز ISIC أولاً' : 'Select ISIC Code first')
                      }
                    </span>
                  )}
                  {selectedHsCode && selectedIsicCode && (
                    <button onClick={handleClearHsCode} className="ml-2 text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Target Market Section */}
        <div>
          <button
            onClick={() => setTargetMarketCollapsed(!targetMarketCollapsed)}
            className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
          >
            <span className="flex items-center gap-2 text-blue-500 font-semibold">
              <IconWorld size={20} className="p-0.5  rounded-full" />
              {locale === 'ar' ? (searchType === 'insighter' ? 'بلد الإنسايتر' : 'السوق المستهدف') : (searchType === 'insighter' ? 'Insighter Origin' : 'Target Market')}
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${targetMarketCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {!targetMarketCollapsed && (
            <div className="px-4 py-3 bg-white space-y-2">
              {/* Economic Bloc, Region, Country Selects */}
              {searchType !== 'insighter' && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'المنطقة الاقتصادية' : 'By Economic Block'}</span>
                  <Combobox
                    store={economicBlocCombobox}
                    withinPortal={false}
                    onOptionSubmit={(val) => {
                      console.log('🟦 Economic Bloc changed:', val, 'Clearing region and country filters');
                      if (setEconomicBlocFilter) setEconomicBlocFilter(parseInt(val));
                      // Clear other target market filters when economic bloc is selected
                      if (setRegionFilter) setRegionFilter(null);
                      if (setCountryFilter) setCountryFilter(null);
                      economicBlocCombobox.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <InputBase
                        component="button"
                        type="button"
                        pointer
                        rightSection={<Combobox.Chevron />}
                        onClick={() => economicBlocCombobox.toggleDropdown()}
                        rightSectionPointerEvents="none"
                        className="text-sm font-semibold hover:border-blue-400 transition-colors"
                      >
                        {getSelectedEconomicBlocLabel() || <Input.Placeholder>{locale === 'ar' ? 'اختر المنطقة الاقتصادية' : 'Select an economic bloc'}</Input.Placeholder>}
                      </InputBase>
                    </Combobox.Target>
                    <Combobox.Dropdown>
                      <Combobox.Search
                        value={economicBlocSearch}
                        onChange={(event) => setEconomicBlocSearch(event.currentTarget.value)}
                        placeholder={locale === 'ar' ? 'البحث في الكتل الاقتصادية' : 'Search economic blocs'}
                      />
                      <Combobox.Options>
                        {filteredEconomicBlocOptions.length > 0 ? (
                          filteredEconomicBlocOptions.map((option) => (
                            <Combobox.Option value={option.value} key={option.value}>
                              {option.label}
                            </Combobox.Option>
                          ))
                        ) : (
                          <Combobox.Empty>{locale === 'ar' ? 'لا توجد نتائج' : 'Nothing found'}</Combobox.Empty>
                        )}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'اختر المنطقة الجغرافية' : 'Or By Region'}</span>
                <Combobox
                  store={regionCombobox}
                  withinPortal={false}
                  onOptionSubmit={(val) => {
                    console.log('🟩 Region changed:', val, 'Clearing economic bloc and country filters');
                    if (setRegionFilter) setRegionFilter(parseInt(val));
                    // Clear other target market filters when region is selected
                    if (setEconomicBlocFilter) setEconomicBlocFilter(null);
                    if (setCountryFilter) setCountryFilter(null);
                    regionCombobox.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <InputBase
                      component="button"
                      type="button"
                      pointer
                      rightSection={<Combobox.Chevron />}
                      onClick={() => regionCombobox.toggleDropdown()}
                      rightSectionPointerEvents="none"
                      className=" text-sm font-semibold hover:border-blue-400 transition-colors"
                    >
                      {getSelectedRegionLabel() || <Input.Placeholder>{locale === 'ar' ? 'اختر منطقة' : 'Select a region'}</Input.Placeholder>}
                    </InputBase>
                  </Combobox.Target>
                  <Combobox.Dropdown>
                    <Combobox.Search
                      value={regionSearch}
                      onChange={(event) => setRegionSearch(event.currentTarget.value)}
                      placeholder={locale === 'ar' ? 'البحث في المناطق' : 'Search regions'}
                    />
                    <Combobox.Options>
                      {filteredRegionOptions.length > 0 ? (
                        filteredRegionOptions.map((option) => (
                          <Combobox.Option value={option.value} key={option.value}>
                            {option.label}
                          </Combobox.Option>
                        ))
                      ) : (
                        <Combobox.Empty>{locale === 'ar' ? 'لا توجد نتائج' : 'Nothing found'}</Combobox.Empty>
                      )}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'الدولة' : 'Or By Country'}</span>
                <Combobox
                  store={countryCombobox}
                  withinPortal={false}
                  onOptionSubmit={(val) => {
                    console.log('🟨 Country changed:', val, 'Clearing economic bloc and region filters');
                    if (setCountryFilter) setCountryFilter(parseInt(val));
                    // Clear other target market filters when country is selected
                    if (setEconomicBlocFilter) setEconomicBlocFilter(null);
                    if (setRegionFilter) setRegionFilter(null);
                    countryCombobox.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <InputBase
                      component="button"
                      type="button"
                      pointer
                      rightSection={<Combobox.Chevron />}
                      onClick={() => countryCombobox.toggleDropdown()}
                      rightSectionPointerEvents="none"
                      className=" text-sm font-semibold hover:border-blue-400 transition-colors"
                    >
                      {getSelectedCountryLabel() || <Input.Placeholder>{locale === 'ar' ? 'اختر دولة' : 'Select a country'}</Input.Placeholder>}
                    </InputBase>
                  </Combobox.Target>
                  <Combobox.Dropdown>
                    <Combobox.Search
                      value={countrySearch}
                      onChange={(event) => setCountrySearch(event.currentTarget.value)}
                      placeholder={locale === 'ar' ? 'البحث في البلدان' : 'Search countries'}
                    />
                    <Combobox.Options className="max-h-60 overflow-y-auto">
                      {filteredCountryOptions.length > 0 ? (
                        filteredCountryOptions.map((option) => (
                          <Combobox.Option value={option.value} key={option.value}>
                            {option.label}
                          </Combobox.Option>
                        ))
                      ) : (
                        <Combobox.Empty>{locale === 'ar' ? 'لا توجد نتائج' : 'Nothing found'}</Combobox.Empty>
                      )}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </div>
            </div>
          )}
        </div>
        {/* Role Section - Only for insighter */}
        {searchType === 'insighter' && (
          <div data-debug={`Role section visible for ${searchType}`}>
            <button
              onClick={() => setRoleCollapsed(!roleCollapsed)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconBuildingBank size={20} className="p-0.5  rounded-full" />
                {locale === 'ar' ? 'النوع' : 'Role'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${roleCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {!roleCollapsed && (
              <div className="px-2 py-3 bg-white flex gap-2 flex-wrap">
                <Chip
                  checked={roleFilter === 'all'}
                  onChange={() => handleRoleFilterChange('all')}
                  variant="outline"
                  size="sm"
                >
                  {locale === 'ar' ? 'الكل' : 'All'}
                </Chip>
                <Chip
                  checked={roleFilter === 'company'}
                  onChange={() => handleRoleFilterChange('company')}
                  variant="outline"
                  size="sm"
                >
                  {locale === 'ar' ? 'شركة' : 'Company'}
                </Chip>
                <Chip
                  checked={roleFilter === 'individual'}
                  onChange={() => handleRoleFilterChange('individual')}
                  variant="outline"
                  size="sm"
                >
                  {locale === 'ar' ? 'فرد' : 'Individual'}
                </Chip>
              </div>
            )}
          </div>
        )}
        {/* Accuracy Section */}
        <div>
          <button
            onClick={() => setAccuracyCollapsed(!accuracyCollapsed)}
            className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
          >
            <span className="flex items-center gap-2 text-blue-500 font-semibold">
              <IconWorldSearch size={20} className="p-0.5  rounded-full" />
              {locale === 'ar' ? 'دقة البحث' : 'Accuracy'}
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${accuracyCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {!accuracyCollapsed && (
            <div className="px-4 py-3 bg-white space-y-2">
              <p className="text-xs text-gray-500 mb-1">{locale === 'ar' ? 'اضبط دقة البحث الخاص بك.' : 'Adjust the accuracy of your search.'}</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input type="radio" name="accuracy" value="all" checked={accuracyFilter === 'all'} onChange={(e) => setAccuracyFilter(e.target.value as 'any' | 'all')} className="accent-blue-500" />
                  {locale === 'ar' ? 'تضمين جميع الكلمات' : 'Include all words'}
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input type="radio" name="accuracy" value="any" checked={accuracyFilter === 'any'} onChange={(e) => setAccuracyFilter(e.target.value as 'any' | 'all')} className="accent-blue-500" />
                  {locale === 'ar' ? 'تضمين أي من كلمات' : 'Include any words'}
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* ISIC Code Modal */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={locale === 'ar' ? 'اختر رمز ISIC' : 'Select ISIC Code'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث عن رمز ISIC...' : 'Search ISIC codes...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {loadingIsicCodes ? (
            <div className="flex justify-center py-8">
              <Loader size="md" />
            </div>
          ) : (
            renderLeafNodes()
          )}
        </div>
      </Modal>

      {/* HS Code Modal */}
      <Modal
        opened={isHsCodeModalOpen}
        onClose={() => setIsHsCodeModalOpen(false)}
        title={locale === 'ar' ? 'اختر رمز HS' : 'Select HS Code'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث عن رمز HS...' : 'Search HS codes...'}
            value={hsCodeSearchTerm}
            onChange={(e) => setHsCodeSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
          />
          {loadingHsCodes ? (
            <div className="flex justify-center py-8">
              <Loader size="md" />
            </div>
          ) : (
            renderHsCodes()
          )}
        </div>
      </Modal>

      {/* Industry Modal */}
      <Modal
        opened={isIndustryModalOpen}
        onClose={() => setIsIndustryModalOpen(false)}
        title={locale === 'ar' ? 'اختر المجال' : 'Select Industry'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث عن المجال...' : 'Search industries...'}
            value={industrySearchTerm}
            onChange={(e) => setIndustrySearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
          />
          {loadingIndustries ? (
            <div className="flex justify-center py-8">
              <Loader size="md" />
            </div>
          ) : (
            renderIndustryLeafNodes()
          )}
        </div>
      </Modal>
    </div>
  );

  // Conditional rendering based on screen size
  if (shouldUseDrawer) {
    return (
      <Drawer
        opened={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={locale === 'ar' ? 'الفلاتر' : 'Filters'}
        padding="md"
        size="sm"
        position={locale === 'ar' ? 'right' : 'left'}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div className="h-full overflow-y-auto">
          <FilterContent />
        </div>
      </Drawer>
    );
  }

  // Default sidebar rendering for desktop
  return <FilterContent />;
};

export default FilterBox;
