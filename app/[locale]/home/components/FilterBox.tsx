'use client'

import React, { useState, useEffect } from 'react';
import { Select, Modal, Loader } from '@mantine/core';
import { IconRefresh, IconCode, IconBuildingFactory, IconWorldSearch, IconBuildingBank, IconMap, IconWorld, IconLanguage, IconCoin } from '@tabler/icons-react';

import { useTranslations } from 'next-intl';

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
  isicCodeFilter?: number | null;
  setIsicCodeFilter?: (filter: number | null) => void;
  hsCodeFilter?: number | null;
  setHsCodeFilter?: (filter: number | null) => void;
  industryFilter?: number | null;
  setIndustryFilter?: (filter: number | null) => void;
  priceFilter?: string | null;
  setPriceFilter?: (filter: string | null) => void;
  accuracyFilter?: 'any' | 'all';
  setAccuracyFilter?: (filter: 'any' | 'all') => void;
  resetFilters?: () => void;
}

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
  setIsicCodeFilter = () => {},
  hsCodeFilter = null,
  setHsCodeFilter = () => {},
  industryFilter = null,
  setIndustryFilter = () => {},
  priceFilter = null,
  setPriceFilter = () => {},
  accuracyFilter = 'all',
  setAccuracyFilter = () => {},
  resetFilters = () => {}
}) => {
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

  // State for content types collapse
  const [priceCollapsed, setpriceCollapsed] = useState(false);
  const [languageCollapsed, setLanguageCollapsed] = useState(false);
  const [accuracyCollapsed, setAccuracyCollapsed] = useState(true);
  const [industryCollapsed, setIndustryCollapsed] = useState(false);
  const [targetMarketCollapsed, setTargetMarketCollapsed] = useState(true);
  const [publicationDateCollapsed, setPublicationDateCollapsed] = useState(true);
  const [archiveCollapsed, setArchiveCollapsed] = useState(true);

  // State for publication date filter
  const [publicationDateFilter, setPublicationDateFilter] = useState<'all' | 'last_month' | 'last_3_months' | 'last_6_months' | 'last_year'>('all');
  
  // State for archive filter  
  const [archiveFilter, setArchiveFilter] = useState<'all' | 'with_archive' | 'without_archive'>('without_archive');

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.knoldg.com/api/common/setting/country/list', {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json'
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
        const response = await fetch('https://api.knoldg.com/api/common/setting/region/list', {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json'
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
        const response = await fetch('https://api.knoldg.com/api/common/setting/economic-bloc/list', {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json'
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
        const response = await fetch('https://api.knoldg.com/api/common/setting/isic-code/tree-list', {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json'
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

    const fetchHsCodes = async () => {
      setLoadingHsCodes(true);
      try {
        const response = await fetch('https://api.knoldg.com/api/common/setting/hs-code/list', {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch HS codes');
        
        const data = await response.json();
        setHsCodes(data.data || []);
      } catch (error) {
        console.error('Error fetching HS codes:', error);
      } finally {
        setLoadingHsCodes(false);
      }
    };

    const fetchIndustries = async () => {
      setLoadingIndustries(true);
      try {
        const response = await fetch('https://api.knoldg.com/api/common/setting/industry/tree', {
          headers: {
            'Accept-Language': locale,
            'Accept': 'application/json'
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
    fetchHsCodes();
    fetchIndustries();
  }, [locale]);

  // Initialize selected HS code based on prop value
  useEffect(() => {
    if (hsCodeFilter && hsCodes.length > 0) {
      const selectedCode = hsCodes.find(code => code.id === hsCodeFilter);
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
  const regionOptions = [
    { value: 'all', label: locale === 'ar' ? '\u0627\u0644\u0643\u0644' : 'All' },
    ...regions.map((region: Region) => ({
      value: region.id.toString(),
      label: region.name
    }))
  ];
  
  // Convert economic blocs to Mantine Select data format
  const economicBlocOptions = [
    { value: 'all', label: locale === 'ar' ? '\u0627\u0644\u0643\u0644' : 'All' },
    ...economicBlocs.map((bloc: EconomicBloc) => ({
      value: bloc.id.toString(),
      label: bloc.name
    }))
  ];

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
              className={`py-2 px-3 rounded-md text-sm flex items-center w-full transition-colors ${isSelected ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-100 border border-gray-200'}`}
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
    return (
      <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
        {filteredHsCodes.map((code) => {
          const isSelected = selectedHsCode?.id === code.id;
          const marginClass = locale === 'ar' ? 'ml-2' : 'mr-2';
          
          return (
            <button
              key={code.id}
              className={`py-2 px-3 rounded-md text-sm flex items-center w-full transition-colors ${isSelected ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-100 border border-gray-200'}`}
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
              className={`py-2 px-3 rounded-md text-sm flex items-center w-full transition-colors ${isSelected ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-100 border border-gray-200'}`}
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
      setSelectedIsicCode({
        id: node.key,
        code: node.code,
        label: locale === 'ar' ? node.names.ar : node.names.en
      });
      setIsicCodeFilter?.(node.key);
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
    
    // Clear the selected ISIC code
    setSelectedIsicCode(null);
    
    // Call the parent component's setIsicCodeFilter function to trigger a search without the ISIC code filter
    if (setIsicCodeFilter) {
      setIsicCodeFilter(null);
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
      setHsCodeFilter(code.id);
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
  const handleResetFilters = () => {
    // Clear local component state
    setSelectedIsicCode(null);
    setSelectedHsCode(null);
    setSelectedIndustry(null);
    setIndustryFilter(null);
    setPriceFilter(null);
    // Call the parent resetFilters function to update URL and global state
    resetFilters();
  };
  
  // Handle price filter selection
  const handlePriceFilterChange = (value: string | null) => {
    // Call the parent component's setPriceFilter function to trigger the search
    if (setPriceFilter) {
      setPriceFilter(value);
    }
  };

  return (
    <div className="bg-white border-t-4 rounded-md border-[#299af8] shadow-md" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="p-6">
        {/* Filter Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {locale === 'ar' ? '\u0641\u0644\u062a\u0631' : 'Filter'}
          </h2>
          <button
            onClick={handleResetFilters}
            className="text-sm text-[#299af8] flex items-center gap-1 hover:text-blue-800 transition-colors"
          >
            <span>{locale === 'ar' ? '\u0625\u0639\u0627\u062f\u0629 \u0636\u0628\u0637 \u0627\u0644\u0641\u0644\u0627\u062a\u0631' : 'Reset filters'}</span>
            <IconRefresh size={14} />
          </button>
        </div>

        {/* Price Types Section */}
        {searchType !== 'insighter' && (
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => setpriceCollapsed(!priceCollapsed)}
              className="w-full flex justify-between items-center py-2 text-left hover:bg-gray-50 rounded-md px-2"
            >
              <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full me-2">
                      <IconCoin size={16} className="text-blue-500" />
                    </div>
                <h3 className="text-md font-semibold text-gray-700">
                  {locale === 'ar' ? 'السعر' : 'Price'}
                </h3>
              </div>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform ${priceCollapsed ? 'rotate-0' : 'rotate-180'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {!priceCollapsed && (
              <div className="mt-3 space-y-4 px-2">
                {/* Price Filter */}
                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePriceFilterChange(null)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${priceFilter === null ? 'bg-[#299af8] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      {locale === 'ar' ? '\u0627\u0644\u0643\u0644' : 'All'}
                    </button>
                    <button
                      onClick={() => handlePriceFilterChange('false')}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${priceFilter === 'false' ? 'bg-[#299af8] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      {locale === 'ar' ? '\u0645\u062c\u0627\u0646\u064a' : 'Free'}
                    </button>
                    <button
                      onClick={() => handlePriceFilterChange('true')}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${priceFilter === 'true' ? 'bg-[#299af8] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      {locale === 'ar' ? '\u0645\u062f\u0641\u0648\u0639' : 'Paid'}
                    </button>
                  </div>
                </div>

             
              </div>
            )}
          </div>
        )}
                  {/* language Types Section */}
        {searchType !== 'insighter' && (
          <div className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => setLanguageCollapsed(!languageCollapsed)}
            className="w-full flex justify-between items-center py-2 text-left hover:bg-gray-50 rounded-md px-2"
          >
            <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconLanguage size={16} className="text-blue-500" />
                  </div>
              <h3 className="text-md font-semibold text-gray-700">
                {locale === 'ar' ? 'اللغة' : 'Language'}
              </h3>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${languageCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {!languageCollapsed && (
            <div className="mt-3 space-y-4 px-2">
           

              {/* Language Filter */}
              <div>
               
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguageFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${languageFilter === 'all' ? 'bg-[#299af8] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {locale === 'ar' ? '\u0627\u0644\u0643\u0644' : 'All'}
                  </button>
                  <button
                    onClick={() => setLanguageFilter('english')}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${languageFilter === 'english' ? 'bg-[#299af8] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {locale === 'ar' ? '\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629' : 'English'}
                  </button>
                  <button
                    onClick={() => setLanguageFilter('arabic')}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${languageFilter === 'arabic' ? 'bg-[#299af8] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {locale === 'ar' ? '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' : 'Arabic'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

    

        {/* Industry Section */}
        <div className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => setIndustryCollapsed(!industryCollapsed)}
            className="w-full flex justify-between items-center py-2 text-left hover:bg-gray-50 rounded-md px-2"
          >
            <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconBuildingFactory size={16} className="text-blue-500" />
                  </div>
              <h3 className="text-md font-semibold text-gray-700">
                {locale === 'ar' ? 'الصناعة' : 'Industry'}
              </h3>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${industryCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {!industryCollapsed && (
            <div className="mt-3 space-y-4 px-2">
              {/* Industry Filter */}
              <div>
                <div className="flex items-center mb-2">
                
                  <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                    {locale === 'ar' ? '\u0627\u0644\u0635\u0646\u0627\u0639\u0629' : 'Industry'}
                  </h4>
                </div>
                <div className="relative w-full">
                  <div
                    onClick={() => setIsIndustryModalOpen(true)}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full text-sm cursor-pointer flex justify-between items-center"
                  >
                    {selectedIndustry ? (
                      <div className="flex items-center flex-1 overflow-hidden">
                        <span className="truncate">{selectedIndustry.label.length > 30 ? `${selectedIndustry.label.substring(0, 30)}...` : selectedIndustry.label}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        {locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0627\u0644\u0635\u0646\u0627\u0639\u0629' : 'Select Industry'}
                      </span>
                    )}
                    {selectedIndustry ? (
                      <button 
                        onClick={handleClearIndustry}
                        className={`text-gray-600  ${locale === 'ar' ? 'mr-2' : 'ml-2'}  rounded-full hover:bg-red-50`}
                        title={locale === 'ar' ? 'مسح الاختيار' : 'Clear selection'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* ISIC Code Filter */}
              <div>
                <div className="flex items-center mb-2">
             
                  <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                    {locale === 'ar' ? '\u0631\u0645\u0632 ISIC' : 'ISIC Code'}
                  </h4>
                </div>
                <div className="relative w-full">
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full text-sm cursor-pointer flex justify-between items-center"
                  >
                    {selectedIsicCode ? (
                      <div className="flex items-center flex-1 overflow-hidden">
                        <span className={`font-mono flex-shrink-0 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{selectedIsicCode.code}</span>
                        <span className="truncate">{selectedIsicCode.label.length > 30 ? `${selectedIsicCode.label.substring(0, 30)}...` : selectedIsicCode.label}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        {locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0631\u0645\u0632 ISIC' : 'Select ISIC Code'}
                      </span>
                    )}
                    {selectedIsicCode ? (
                      <button 
                        onClick={handleClearIsicCode}
                        className={`text-gray-600  ${locale === 'ar' ? 'mr-2' : 'ml-2'}  rounded-full hover:bg-red-50`}
                        title={locale === 'ar' ? 'مسح الاختيار' : 'Clear selection'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <IconCode size={16} className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* HS Code Filter */}
              <div>
                <div className="flex items-center mb-2">
               
                  <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                    {locale === 'ar' ? '\u0631\u0645\u0632 HS' : 'HS Code'}
                  </h4>
                </div>
                <div className="relative w-full">
                  <div
                    onClick={() => setIsHsCodeModalOpen(true)}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full text-sm cursor-pointer flex justify-between items-center"
                  >
                    {selectedHsCode ? (
                      <div className="flex items-center flex-1 overflow-hidden">
                        <span className={`font-mono flex-shrink-0 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>{selectedHsCode.code}</span>
                        <span className="truncate">{selectedHsCode.label.length > 30 ? `${selectedHsCode.label.substring(0, 30)}...` : selectedHsCode.label}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        {locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0631\u0645\u0632 HS' : 'Select HS Code'}
                      </span>
                    )}
                    {selectedHsCode ? (
                      <button 
                        onClick={handleClearHsCode}
                        className={`text-gray-600  ${locale === 'ar' ? 'mr-2' : 'ml-2'}  rounded-full hover:bg-red-50`}
                        title={locale === 'ar' ? 'مسح الاختيار' : 'Clear selection'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <IconCode size={16} className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
            {/* Target Market Section */}
            <div  className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => setTargetMarketCollapsed(!targetMarketCollapsed)}
            className="w-full flex justify-between items-center py-2 text-left hover:bg-gray-50 rounded-md px-2"
          >
            <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconWorld size={16} className="text-blue-500" />
                  </div>
              <h3 className="text-md font-semibold text-gray-700">
               
                {locale === 'ar' ? (searchType === 'insighter' ? 'بلد الإنسايتر' : 'السوق المستهدف') : (searchType === 'insighter' ? 'Insighter Origin' : 'Target Market')}
              </h3>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${targetMarketCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {!targetMarketCollapsed && (
            <div className="mt-3 space-y-4 px-2">
              {/* Economic Blocs Filter - Hide for insighter */}
              {searchType !== 'insighter' && (
                <div>
                  <div className="flex items-center mb-2">
                   
                    <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                      {locale === 'ar' ? '\u0627\u0644\u0643\u062a\u0644 \u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f\u064a\u0629' : 'By Economic Block'}
                    </h4>
                  </div>
                  <div className="relative w-full">
                    <Select
                      placeholder={locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0643\u062a\u0644\u0629 \u0627\u0642\u062a\u0635\u0627\u062f\u064a\u0629' : 'Select an economic bloc'}
                      data={economicBlocOptions}
                      value={economicBlocFilter?.toString() || 'all'}
                      onChange={(value) => {
                        if (value === 'all') {
                          setEconomicBlocFilter(null);
                        } else {
                          setEconomicBlocFilter(value ? parseInt(value) : null);
                        }
                      }}
                      clearable
                      searchable
                      className="w-full"
                      classNames={{
                        root: 'w-full',
                        input: 'border border-gray-300 py-2 px-3 rounded-md w-full text-sm',
                        dropdown: 'bg-white shadow-lg border border-gray-200 rounded-md mt-1'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Regions Filter */}
              <div>
                <div className="flex items-center mb-2">
                
                  <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                    {locale === 'ar' ? '\u0627\u0644\u0645\u0646\u0627\u0637\u0642' : 'By Region'}
                  </h4>
                </div>
                <div className="relative w-full">
                  <Select
                    placeholder={locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0645\u0646\u0637\u0642\u0629' : 'Select a region'}
                    data={regionOptions}
                    value={regionFilter?.toString() || 'all'}
                    onChange={(value) => {
                      if (value === 'all') {
                        setRegionFilter(null);
                      } else {
                        setRegionFilter(value ? parseInt(value) : null);
                      }
                    }}
                    clearable
                    searchable
                    className="w-full"
                    classNames={{
                      root: 'w-full',
                      input: 'border border-gray-300 py-2 px-3 rounded-md w-full text-sm',
                      dropdown: 'bg-white shadow-lg border border-gray-200 rounded-md mt-1'
                    }}
                  />
                </div>
              </div>

              {/* Countries Filter */}
              <div>
                <div className="flex items-center mb-2">
                
                  <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                    {locale === 'ar' ? '\u0627\u0644\u0628\u0644\u062f\u0627\u0646' : 'By Country'}
                  </h4>
                </div>
                <div className="relative w-full">
                  <Select
                    placeholder={locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u062f\u0648\u0644\u0629' : 'Select a country'}
                    data={countryOptions}
                    value={countryFilter?.toString() || ''}
                    onChange={(value) => setCountryFilter(value ? parseInt(value) : null)}
                    clearable
                    searchable
                    className="w-full"
                    classNames={{
                      root: 'w-full',
                      input: 'border border-gray-300 py-2 px-3 rounded-md w-full text-sm',
                      dropdown: 'bg-white shadow-lg border border-gray-200 rounded-md mt-1'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
    {/* Accuracy Section */}
    <div >
          <button
            onClick={() => setAccuracyCollapsed(!accuracyCollapsed)}
            className="w-full flex justify-between items-center py-2 text-left hover:bg-gray-50 rounded-md px-2"
          >
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full me-2">
                <IconWorldSearch size={16} className="text-blue-500" />
              </div>
              <h3 className="text-md font-semibold text-gray-700">
                {locale === 'ar' ? 'الدقة' : 'Accuracy'}
              </h3>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${accuracyCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {!accuracyCollapsed && (
            <div className="mt-3 space-y-4 px-2">
              {/* Accuracy Description */}
              <p className="text-sm text-gray-600 mb-3">
                {locale === 'ar' ? 'اضبط دقة البحث الخاص بك.' : 'Adjust the accuracy of your search.'}
              </p>
              
              {/* Accuracy Filter */}
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="accuracy"
                    value="all"
                    checked={accuracyFilter === 'all'}
                    onChange={(e) => setAccuracyFilter(e.target.value as 'any' | 'all')}
                    className="w-4 h-4 text-[#299af8] bg-gray-100 border-gray-300 focus:ring-[#299af8] focus:ring-2"
                  />
                  <span className="ms-2 text-sm text-gray-700">
                    {locale === 'ar' ? 'تضمين جميع الكلمات' : 'Include all words'}
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="accuracy"
                    value="any"
                    checked={accuracyFilter === 'any'}
                    onChange={(e) => setAccuracyFilter(e.target.value as 'any' | 'all')}
                    className="w-4 h-4 text-[#299af8] bg-gray-100 border-gray-300 focus:ring-[#299af8] focus:ring-2"
                  />
                  <span className="ms-2 text-sm text-gray-700">
                    {locale === 'ar' ? 'تضمين أي كلمات' : 'Include any words'}
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
    

        {/* Publication Date Section */}
        {/* <div className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => setPublicationDateCollapsed(!publicationDateCollapsed)}
            className="w-full flex justify-between items-center py-2 text-left hover:bg-gray-50 rounded-md px-2"
          >
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-700">
                {locale === 'ar' ? 'تاريخ النشر' : 'Publication Date'}
              </h3>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${publicationDateCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {!publicationDateCollapsed && (
            <div className="mt-3 space-y-4 px-2">
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconCode size={16} className="text-blue-500" />
                  </div>
                  <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                    {locale === 'ar' ? '\u0627\u0644\u062a\u0627\u0631\u064a\u062e' : 'Publication Date'}
                  </h4>
                </div>
                <div className="relative w-full">
                  <div
                    className="border border-gray-300 py-2 px-3 rounded-md w-full text-sm cursor-pointer flex justify-between items-center"
                  >
                    <span className="text-gray-500">
                      {locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0627\u0644\u062a\u0627\u0631\u064a\u062e' : 'Select publication date'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}

        {/* Archive Section */}
        {/* <div className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => setArchiveCollapsed(!archiveCollapsed)}
            className="w-full flex justify-between items-center py-2 text-left hover:bg-gray-50 rounded-md px-2"
          >
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-700">
                {locale === 'ar' ? 'الأرشيف' : 'Archive'}
              </h3>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${archiveCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {!archiveCollapsed && (
            <div className="mt-3 space-y-4 px-2">
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconCode size={16} className="text-blue-500" />
                  </div>
                  <h4 className="uppercase text-xs font-bold tracking-wider text-gray-600">
                    {locale === 'ar' ? '\u0627\u0644\u0623\u0631\u0634\u064a\u0641' : 'Archive'}
                  </h4>
                </div>
                <div className="relative w-full">
                  <div
                    className="border border-gray-300 py-2 px-3 rounded-md w-full text-sm cursor-pointer flex justify-between items-center"
                  >
                    <span className="text-gray-500">
                      {locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0627\u0644\u0623\u0631\u0634\u064a\u0641' : 'Select archive'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}

        {/* Modal for Industry selection */}
        <Modal 
          opened={isIndustryModalOpen} 
          onClose={() => setIsIndustryModalOpen(false)}
          title={locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0627\u0644\u0635\u0646\u0627\u0639\u0629' : 'Select Industry'}
          size="xl"
          centered
        >
          <div className="max-h-[70vh] overflow-y-auto">
            {loadingIndustries ? (
              <div className="flex justify-center p-10">
                <Loader size="md" />
              </div>
            ) : (
              <div className="p-4">
                {/* Search Input */}
                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input 
                      type="search" 
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder={locale === 'ar' ? '\u0627\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0635\u0646\u0627\u0639\u0629...' : 'Search for industry...'}
                      value={industrySearchTerm}
                      onChange={(e) => setIndustrySearchTerm(e.target.value)}
                      dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {industrySearchTerm && (
                      <button 
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setIndustrySearchTerm('')}
                      >
                        <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  {filteredIndustryLeafNodes.length > 0 ? (
                    renderIndustryLeafNodes()
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">{locale === 'ar' ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u0645\u0637\u0627\u0628\u0642\u0629' : 'No matching results found'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
        {/* Modal for ISIC Code selection */}
        <Modal 
          opened={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title={locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0631\u0645\u0632 ISIC' : 'Select ISIC Code'}
          size="xl"
          centered
        >
          <div className="max-h-[70vh] overflow-y-auto">
            {loadingIsicCodes ? (
              <div className="flex justify-center p-10">
                <Loader size="md" />
              </div>
            ) : (
              <div className="p-4">
                {/* Search Input */}
                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input 
                      type="search" 
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder={locale === 'ar' ? '\u0627\u0628\u062d\u062b \u0639\u0646 \u0631\u0645\u0632 ISIC...' : 'Search for ISIC code...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {searchTerm && (
                      <button 
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setSearchTerm('')}
                      >
                        <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  {filteredLeafNodes.length > 0 ? (
                    renderLeafNodes()
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">{locale === 'ar' ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u0645\u0637\u0627\u0628\u0642\u0629' : 'No matching results found'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
        
        {/* Modal for HS Code selection */}
        <Modal 
          opened={isHsCodeModalOpen} 
          onClose={() => setIsHsCodeModalOpen(false)}
          title={locale === 'ar' ? '\u0627\u062e\u062a\u0631 \u0631\u0645\u0632 HS' : 'Select HS Code'}
          size="xl"
          centered
        >
          <div className="max-h-[70vh] overflow-y-auto">
            {loadingHsCodes ? (
              <div className="flex justify-center p-10">
                <Loader size="md" />
              </div>
            ) : (
              <div className="p-4">
                {/* Search Input */}
                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input 
                      type="search" 
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder={locale === 'ar' ? '\u0627\u0628\u062d\u062b \u0639\u0646 \u0631\u0645\u0632 HS...' : 'Search for HS code...'}
                      value={hsCodeSearchTerm}
                      onChange={(e) => setHsCodeSearchTerm(e.target.value)}
                      dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {hsCodeSearchTerm && (
                      <button 
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setHsCodeSearchTerm('')}
                      >
                        <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  {filteredHsCodes.length > 0 ? (
                    renderHsCodes()
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">{locale === 'ar' ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u0645\u0637\u0627\u0628\u0642\u0629' : 'No matching results found'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FilterBox;
