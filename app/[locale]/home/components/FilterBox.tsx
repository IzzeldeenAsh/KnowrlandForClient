'use client'

import React, { useState, useEffect, useCallback, useRef, useMemo, useDeferredValue, memo } from 'react';
import { Modal, Chip, Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCode, IconBuildingFactory, IconBuildingBank, IconWorld, IconLanguage, IconCoin, IconSearch, IconX, IconCalendarEvent } from '@tabler/icons-react';
import CustomYearPicker from './CustomYearPicker';

import { getApiUrl } from '@/app/config';

// Arabic search normalization (hamza/diacritics tolerant) + whitespace normalization
const ARABIC_DIACRITICS_AND_TATWEEL_RE = /[\u0640\u064B-\u065F\u0670\u06D6-\u06ED]/g;
function normalizeSearchText(input: string): string {
  if (!input) return '';
  let s = input.toLowerCase().trim();
  s = s.replace(ARABIC_DIACRITICS_AND_TATWEEL_RE, '');
  s = s.replace(/[إأآٱ]/g, 'ا');
  s = s.replace(/[ؤ]/g, 'و');
  s = s.replace(/[ئ]/g, 'ي');
  s = s.replace(/[ء]/g, '');
  s = s.replace(/[ى]/g, 'ي');
  s = s.replace(/\s+/g, ' ');
  return s;
}

type SelectOption = { value: string; label: string };

const OptionsButtonsList = memo(function OptionsButtonsList(props: {
  options: SelectOption[];
  locale: string;
  selectedValue: string | null;
  isDisabled: boolean;
  onSelect: (value: string) => void;
}) {
  const { options, locale, selectedValue, isDisabled, onSelect } = props;
  if (options.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 text-sm">
        {locale === 'ar' ? 'لا توجد نتائج' : 'Nothing found'}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelect(option.value)}
            className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${
              isSelected
                ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                : 'hover:bg-gray-100 border border-gray-200'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex-1">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
});

interface Region {
  id: number;
  name: string;
}

interface EconomicBloc {
  id: number;
  name: string;
}

interface TagItem {
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

type IndustryGroup = { parentKey: number; parentLabel: string; children: IndustryNode[] };

const IndustryGroupsList = memo(function IndustryGroupsList(props: {
  groups: IndustryGroup[];
  locale: string;
  isDisabled: boolean;
  selectedIndustryId: number | null;
  onSelectIndustry: (node: IndustryNode) => void;
  onSelectAll: () => void;
}) {
  const { groups, locale, isDisabled, selectedIndustryId, onSelectIndustry, onSelectAll } = props;
  return (
    <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
      {/* All option */}
      <button
        className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${
          !selectedIndustryId
            ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
            : 'hover:bg-gray-100 border border-gray-200'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !isDisabled && onSelectAll()}
        disabled={isDisabled}
      >
        <span className="flex-1 font-medium">{locale === 'ar' ? 'الكل' : 'All'}</span>
      </button>

      {groups.map((group) => (
        <div key={group.parentKey} className="mt-2">
          <div className="text-blue-600 font-semibold text-xs mb-1 px-1 cursor-default select-none">
            {group.parentLabel}
          </div>
          {group.children.map((node) => {
            const isSelected = selectedIndustryId === node.key;
            return (
              <button
                key={node.key}
                className={`py-2 px-3 mb-2 rounded-md text-sm flex items-start text-start w-full transition-colors ${
                  isSelected
                    ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                    : 'hover:bg-gray-100 border border-gray-200'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isDisabled && onSelectIndustry(node)}
                disabled={isDisabled}
              >
                <span className="flex-1">{node.label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
});

interface YearRange {
  startYear: number | null;
  endYear: number | null;
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
  tagFilter?: string | null;
  setTagFilter?: (filter: string | null) => void;
  isicCodeFilter?: string | null;
  setIsicCodeFilter?: (filter: string | null) => void;
  hsCodeFilter?: string | null;
  setHsCodeFilter?: (filter: string | null) => void;
  industryFilter?: number | null;
  setIndustryFilter?: (filter: number | null) => void;
  priceFilter?: string | null;
  setPriceFilter?: (filter: string | null) => void;
  rangeStartFilter?: string | null;
  setRangeStartFilter?: (filter: string | null) => void;
  rangeEndFilter?: string | null;
  setRangeEndFilter?: (filter: string | null) => void;
  applyRangeFilters?: (start: string | null, end: string | null) => void;
  accuracyFilter?: 'any' | 'all';
  setAccuracyFilter?: (filter: 'any' | 'all') => void;
  roleFilter?: 'all' | 'company' | 'individual';
  setRoleFilter?: (filter: 'all' | 'company' | 'individual') => void;
  yearOfStudyFilter?: YearRange | null;
  setYearOfStudyFilter?: (filter: YearRange | null) => void;
  resetFilters?: () => Promise<void>;
  // Drawer props for responsive behavior
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (open: boolean) => void;
  forceDrawerMode?: boolean;
}

const noop = () => {};

const FilterBox: React.FC<FilterBoxProps> = React.memo(({
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
  tagFilter = null,
  setTagFilter = () => {},
  isicCodeFilter = null,
  setIsicCodeFilter = noop,
  hsCodeFilter = null,
  setHsCodeFilter = noop,
  industryFilter = null,
  setIndustryFilter = noop,
  priceFilter = null,
  setPriceFilter = noop,
  rangeStartFilter = null,
  setRangeStartFilter = noop,
  rangeEndFilter = null,
  setRangeEndFilter = noop,
  applyRangeFilters = noop as unknown as (start: string | null, end: string | null) => void,
  accuracyFilter = 'all',
  setAccuracyFilter = noop,
  roleFilter = 'all',
  setRoleFilter = noop,
  yearOfStudyFilter = null,
  setYearOfStudyFilter = noop,
  resetFilters = async () => {},
  // Drawer props
  isDrawerOpen = false,
  setIsDrawerOpen = () => {},
  forceDrawerMode = false
}) => {
  // Debug logs removed to prevent console spam during typing

  // Responsive breakpoint detection - tablet and mobile use drawer
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
  const shouldUseDrawer = forceDrawerMode || isTabletOrMobile;

  // API Data States
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [economicBlocs, setEconomicBlocs] = useState<EconomicBloc[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [isicCodes, setIsicCodes] = useState<ISICCode[]>([]);
  const [hsCodes, setHsCodes] = useState<HSCode[]>([]);
  const [industries, setIndustries] = useState<IndustryNode[]>([]);

  // Loading States - Enhanced granular loading
  const [apiLoading] = useState(false); // Main API loading from parent
  const [dataLoading, setDataLoading] = useState({
    countries: false,
    regions: false,
    economicBlocs: false,
    tags: false,
    isicCodes: false,
    hsCodes: false,
    industries: false
  });

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHsCodeModalOpen, setIsHsCodeModalOpen] = useState(false);
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [isYearPickerModalOpen, setIsYearPickerModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isEconomicBlocModalOpen, setIsEconomicBlocModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);


  // Selection States
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

  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [leafNodes, setLeafNodes] = useState<ISICCode[]>([]);
  const [filteredLeafNodes, setFilteredLeafNodes] = useState<ISICCode[]>([]);
  const [hsCodeSearchTerm, setHsCodeSearchTerm] = useState("");
  const [filteredHsCodes, setFilteredHsCodes] = useState<HSCode[]>([]);
  const [industrySearchTerm, setIndustrySearchTerm] = useState("");
  const [industryLeafNodes, setIndustryLeafNodes] = useState<IndustryNode[]>([]);
  const [filteredIndustryLeafNodes, setFilteredIndustryLeafNodes] = useState<IndustryNode[]>([]);

  // Collapse States - adjust based on search type and screen size
  const [priceCollapsed, setPriceCollapsed] = useState(true);
  const [languageCollapsed, setLanguageCollapsed] = useState(true);
  const [industryCollapsed, setIndustryCollapsed] = useState(true);

  // Defer heavy filtering so typing stays instant
  const deferredIndustrySearchTerm = useDeferredValue(industrySearchTerm);
  const [targetMarketCollapsed, setTargetMarketCollapsed] = useState(true);
  const [tagsCollapsed, setTagsCollapsed] = useState(true);
  const [yearOfStudyCollapsed, setYearOfStudyCollapsed] = useState(true);
  const [roleCollapsed, setRoleCollapsed] = useState(true);

  // Range price filter states - using refs to avoid re-renders
  const tempRangeStartRef = useRef('');
  const tempRangeEndRef = useRef('');
  const [rangeError, setRangeError] = useState('');

  // Refs to maintain focus and store values
  const rangeStartInputRef = useRef<HTMLInputElement>(null);
  const rangeEndInputRef = useRef<HTMLInputElement>(null);

  // Sync input values with applied filters
  useEffect(() => {
    if (rangeStartInputRef.current && !document.activeElement?.isSameNode(rangeStartInputRef.current)) {
      rangeStartInputRef.current.value = rangeStartFilter || '';
      tempRangeStartRef.current = rangeStartFilter || '';
    }
    if (rangeEndInputRef.current && !document.activeElement?.isSameNode(rangeEndInputRef.current)) {
      rangeEndInputRef.current.value = rangeEndFilter || '';
      tempRangeEndRef.current = rangeEndFilter || '';
    }
  }, [rangeStartFilter, rangeEndFilter]);

  // Modal search states (instead of combobox search — prevents focus loss)
  const [economicBlocSearch, setEconomicBlocSearch] = useState('');
  const [regionSearch, setRegionSearch] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');

  // Defer modal filtering so typing stays instant
  const deferredEconomicBlocSearch = useDeferredValue(economicBlocSearch);
  const deferredRegionSearch = useDeferredValue(regionSearch);
  const deferredCountrySearch = useDeferredValue(countrySearch);
  const deferredTagSearch = useDeferredValue(tagSearch);

  // Detect if we're in a loading state from parent component
  // This assumes the parent passes some loading indication
  const isDisabled = apiLoading || Object.values(dataLoading).some(loading => loading);



  // Note: we intentionally removed Combobox search inputs for these filters.
  // They caused focus loss on each keystroke due to internal remount/blur behavior.

  // Update collapsed states when search type or screen size changes
  useEffect(() => {
    // Always keep filters collapsed by default on any context change
    setIndustryCollapsed(true);
    setPriceCollapsed(true);
    setLanguageCollapsed(true);
    setRoleCollapsed(true);
    setTargetMarketCollapsed(true);
    setTagsCollapsed(true);
  }, [searchType, shouldUseDrawer]);

  // Enhanced API fetch functions with better loading states
  const fetchWithLoading = useCallback(async (
    fetchFn: () => Promise<any>,
    loadingKey: keyof typeof dataLoading,
    stateSetter: (data: any) => void
  ) => {
    setDataLoading(prev => ({ ...prev, [loadingKey]: true }));
    try {
      const data = await fetchFn();
      stateSetter(data);
    } catch (error) {
      console.error(`Error fetching ${loadingKey}:`, error);
      stateSetter([]);
    } finally {
      setDataLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  }, []);

  // Fetch all data on mount
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(getApiUrl('/api/common/setting/country/list'), {
        headers: {
          'Accept-Language': locale,
          'Accept': 'application/json',
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data = await response.json();
      return data.data || [];
    };

    const fetchRegions = async () => {
      const response = await fetch(getApiUrl('/api/common/setting/region/list'), {
        headers: {
          'Accept-Language': locale,
          'Accept': 'application/json',
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch regions');
      const data = await response.json();
      return data.data ? data.data.map((region: Region) => ({
        id: region.id,
        name: region.name
      })) : [];
    };

    const fetchEconomicBlocs = async () => {
      const response = await fetch(getApiUrl('/api/common/setting/economic-bloc/list'), {
        headers: {
          'Accept-Language': locale,
          'Accept': 'application/json',
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch economic blocs');
      const data = await response.json();
      return data.data ? data.data.map((bloc: EconomicBloc) => ({
        id: bloc.id,
        name: bloc.name
      })) : [];
    };

    const fetchTags = async () => {
      const response = await fetch(getApiUrl('/api/common/setting/tag/common/list'), {
        headers: {
          'Accept-Language': locale,
          'Accept': 'application/json',
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch tags');
      const data = await response.json();
      return data.data ? data.data.map((t: TagItem) => ({ id: t.id, name: t.name })) : [];
    };

    const fetchIndustries = async () => {
      const response = await fetch(getApiUrl('/api/common/setting/industry/tree'), {
        headers: {
          'Accept-Language': locale,
          'Accept': 'application/json',
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch industries');
      const data = await response.json();
      return data || [];
    };

    // Run all fetches with loading states
    Promise.all([
      fetchWithLoading(fetchCountries, 'countries', setCountries),
      fetchWithLoading(fetchRegions, 'regions', setRegions),
      fetchWithLoading(fetchEconomicBlocs, 'economicBlocs', setEconomicBlocs),
      fetchWithLoading(fetchTags, 'tags', setTags),
      fetchWithLoading(fetchIndustries, 'industries', setIndustries)
    ]);
  }, [locale, fetchWithLoading]);

  // Products fetching moved to SearchBar. Avoid duplicate calls here.

  // Initialize selected codes based on prop values
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

  // Helper functions
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

  // Convert data to select options
  const countryOptions = useMemo<SelectOption[]>(
    () =>
      countries.map((country) => ({
        value: country.id.toString(),
        label: `${getCountryFlagEmoji(country.iso2)} ${locale === 'ar' && country.names?.ar ? country.names.ar : country.name}`,
      })),
    [countries, locale]
  );

  const regionOptions = useMemo<SelectOption[]>(
    () =>
      regions.map((region: Region) => ({
        value: region.id.toString(),
        label: region.name,
      })),
    [regions]
  );

  const economicBlocOptions = useMemo<SelectOption[]>(
    () =>
      economicBlocs.map((bloc: EconomicBloc) => ({
        value: bloc.id.toString(),
        label: bloc.name,
      })),
    [economicBlocs]
  );

  const tagOptions = useMemo<SelectOption[]>(
    () =>
      tags.map((t: TagItem) => ({
        value: t.id.toString(),
        label: t.name,
      })),
    [tags]
  );

  // Helper functions for selected values
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

  const getSelectedTagLabel = () => {
    // tagFilter prop is now a string (tag name)
    // tags state contains id + name
    // Find selected tag by name
    // If not found return null
    // Note: tagFilter may be undefined if not provided
    if (!tagFilter) return null;
    const selected = tags.find(t => t.name === tagFilter);
    return selected ? selected.name : null;
  };

  const getSelectedCountryLabel = () => {
    if (!countryFilter) return null;
    const selected = countries.find(country => country.id === countryFilter);
    return selected ? `${getCountryFlagEmoji(selected.iso2)} ${locale === 'ar' && selected.names?.ar ? selected.names.ar : selected.name}` : null;
  };

  // Build lightweight search indexes once per options list
  const economicBlocOptionsIndex = useMemo(
    () => economicBlocOptions.map((o) => ({ option: o, norm: normalizeSearchText(o.label) })),
    [economicBlocOptions]
  );
  const regionOptionsIndex = useMemo(
    () => regionOptions.map((o) => ({ option: o, norm: normalizeSearchText(o.label) })),
    [regionOptions]
  );
  const countryOptionsIndex = useMemo(
    () => countryOptions.map((o) => ({ option: o, norm: normalizeSearchText(o.label) })),
    [countryOptions]
  );
  const tagOptionsIndex = useMemo(
    () => tagOptions.map((o) => ({ option: o, norm: normalizeSearchText(o.label) })),
    [tagOptions]
  );

  // Filter options based on DEFERRED search so typing stays responsive
  const filteredEconomicBlocOptions = useMemo(() => {
    const q = normalizeSearchText(deferredEconomicBlocSearch);
    if (!q) return economicBlocOptions;
    return economicBlocOptionsIndex.filter((x) => x.norm.includes(q)).map((x) => x.option);
  }, [deferredEconomicBlocSearch, economicBlocOptions, economicBlocOptionsIndex]);

  const filteredRegionOptions = useMemo(() => {
    const q = normalizeSearchText(deferredRegionSearch);
    if (!q) return regionOptions;
    return regionOptionsIndex.filter((x) => x.norm.includes(q)).map((x) => x.option);
  }, [deferredRegionSearch, regionOptions, regionOptionsIndex]);

  const filteredCountryOptions = useMemo(() => {
    const q = normalizeSearchText(deferredCountrySearch);
    if (!q) return countryOptions;
    return countryOptionsIndex.filter((x) => x.norm.includes(q)).map((x) => x.option);
  }, [deferredCountrySearch, countryOptions, countryOptionsIndex]);

  const filteredTagOptions = useMemo(() => {
    const q = normalizeSearchText(deferredTagSearch);
    if (!q) return tagOptions;
    return tagOptionsIndex.filter((x) => x.norm.includes(q)).map((x) => x.option);
  }, [deferredTagSearch, tagOptions, tagOptionsIndex]);

  // Leaf node helpers
  const isLeafNode = (node: ISICCode): boolean => {
    return node.children.length === 0;
  };

  const isIndustryLeafNode = (node: IndustryNode): boolean => {
    return node.children.length === 0;
  };

  // Extract leaf nodes
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

  // Filter nodes based on search
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

  useEffect(() => {
    if (!industrySearchTerm.trim()) {
      setFilteredIndustryLeafNodes(industryLeafNodes);
      return;
    }

    // NOTE: use deferred value so UI input stays responsive
    // and normalize Arabic to be hamza/diacritics tolerant.
    const q = normalizeSearchText(deferredIndustrySearchTerm);
    if (!q) {
      setFilteredIndustryLeafNodes(industryLeafNodes);
      return;
    }

    const filtered = industryLeafNodes.filter((node) => normalizeSearchText(node.label).includes(q));

    setFilteredIndustryLeafNodes(filtered);
  }, [deferredIndustrySearchTerm, industryLeafNodes]);

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

  // Group industry leaf nodes by their parent label (top-level parent)
  // Precompute all leaf groups once (tree traversal only when industries change)
  const allIndustryLeafGroups = useMemo<IndustryGroup[]>(() => {
    const collectAllLeaves = (node: IndustryNode, acc: IndustryNode[]) => {
      if (node.children.length === 0) {
        acc.push(node);
        return;
      }
      for (const child of node.children) collectAllLeaves(child, acc);
    };

    const groups: IndustryGroup[] = [];
    for (const parent of industries) {
      const leaves: IndustryNode[] = [];
      collectAllLeaves(parent, leaves);
      if (leaves.length > 0) {
        groups.push({ parentKey: parent.key, parentLabel: parent.label, children: leaves });
      }
    }
    return groups;
  }, [industries]);

  // Filter visible groups cheaply based on filtered leaf keys
  const groupedIndustryLeaves = useMemo<IndustryGroup[]>(() => {
    const filteredKeys = new Set(filteredIndustryLeafNodes.map((n) => n.key));
    return allIndustryLeafGroups
      .map((g) => ({
        parentKey: g.parentKey,
        parentLabel: g.parentLabel,
        children: g.children.filter((n) => filteredKeys.has(n.key)),
      }))
      .filter((g) => g.children.length > 0);
  }, [allIndustryLeafGroups, filteredIndustryLeafNodes]);

  // Render functions
  const renderLeafNodes = () => {
    if (dataLoading.isicCodes) {
      return <div className="py-8" />;
    }

    return (
      <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
        {filteredLeafNodes.map((node) => {
          const isSelected = selectedIsicCode?.id === node.key;
          const marginClass = locale === 'ar' ? 'ml-2' : 'mr-2';

          return (
            <button
              key={node.key}
              className={`py-2 px-3 rounded-md text-sm flex text-start items-start w-full transition-colors ${
                isSelected
                  ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                  : 'hover:bg-gray-100 border border-gray-200'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && handleSelectIsicCode(node)}
              disabled={isDisabled}
            >
              <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${marginClass}`}>{node.code}</span>
              <span className="flex-1">{locale === 'ar' ? node.names.ar : node.names.en}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderHsCodes = () => {
    if (dataLoading.hsCodes) {
      return <div className="py-8" />;
    }

    if (filteredHsCodes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            {locale === 'ar' ? 'لا توجد رموز HS متاحة لرمز ISIC المحدد' : 'No Products available for the selected ISIC code'}
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
              className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${
                isSelected
                  ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                  : 'hover:bg-gray-100 border border-gray-200'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && handleSelectHsCode(code)}
              disabled={isDisabled}
            >
              <span className={`font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ${marginClass}`}>{code.code}</span>
              <span className="flex-1">{locale === 'ar' ? code.names.ar : code.names.en}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderIndustryLeafNodes = () => {
    if (dataLoading.industries) {
      return <div className="py-8" />;
    }

    return (
      <IndustryGroupsList
        groups={groupedIndustryLeaves}
        locale={locale}
        isDisabled={isDisabled}
        selectedIndustryId={selectedIndustry?.id ?? null}
        onSelectIndustry={handleSelectIndustry}
        onSelectAll={() => {
          setSelectedIndustry(null);
          setIndustryFilter?.(null);
          setIsIndustryModalOpen(false);
        }}
      />
    );
  };

  // Selection handlers
  const handleSelectIsicCode = (node: ISICCode) => {
    if (isLeafNode(node)) {
      setSelectedIsicCode({
        id: node.key,
        code: node.code,
        label: locale === 'ar' ? node.names.ar : node.names.en
      });
      // Use ISIC code string for filter/url
      setIsicCodeFilter?.(node.code);
      setIsModalOpen(false);
    }
  };

  const handleSelectIndustry = (node: IndustryNode) => {
    if (isIndustryLeafNode(node)) {
      setSelectedIndustry({
        id: node.key,
        label: node.label
      });

      if (setIndustryFilter) {
        setIndustryFilter(node.key);
      }

      setIsIndustryModalOpen(false);
    }
  };

  const handleSelectHsCode = (code: HSCode) => {
    setSelectedHsCode({
      id: code.id,
      code: code.code,
      label: locale === 'ar' ? code.names.ar : code.names.en
    });

    if (setHsCodeFilter) {
      setHsCodeFilter(code.code);
    }

    setIsHsCodeModalOpen(false);
  };

  // Clear handlers
  const handleClearIsicCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIsicCode(null);
    if (setIsicCodeFilter) setIsicCodeFilter(null);
  };

  const handleClearIndustry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndustry(null);
    if (setIndustryFilter) setIndustryFilter(null);
  };

  const handleClearHsCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedHsCode(null);
    if (setHsCodeFilter) setHsCodeFilter(null);
  };

  // Reset handler
  const handleResetFilters = async () => {
    try {

      setSelectedIsicCode(null);
      setSelectedHsCode(null);
      setSelectedIndustry(null);

      await resetFilters();

    } catch (error) {
      console.error('Error during filter reset:', error);
    }
  };

  // Filter handlers
  const handlePriceFilterChange = (value: string | null) => {
    if (setPriceFilter) {
      setPriceFilter(value);
    }

    // Reset range filters when Free is selected
    if (value === 'false') { // 'false' means Free
      handleRangePriceClear();
    }
  };

  const handleRoleFilterChange = (value: 'all' | 'company' | 'individual') => {
    if (setRoleFilter) {
      setRoleFilter(value);
    }
  };

  // Range price filter handlers - memoized to prevent re-renders
  const handleRangePriceSearch = useCallback(() => {
    // Clear previous errors
    setRangeError('');

    // Validate inputs
    const startValue = (rangeStartInputRef.current?.value ?? tempRangeStartRef.current).trim();
    const endValue = (rangeEndInputRef.current?.value ?? tempRangeEndRef.current).trim();

    // If both are empty, do nothing
    if (!startValue && !endValue) {
      setRangeError(locale === 'ar' ? 'يرجى إدخال قيمة واحدة على الأقل' : 'Please enter at least one value');
      return;
    }

    // Parse values
    const start = startValue ? parseFloat(startValue) : null;
    const end = endValue ? parseFloat(endValue) : null;

    // Disallow providing only maximum without minimum
    if (start === null && end !== null) {
      setRangeError(locale === 'ar' ? 'يرجى إدخال الحد الأدنى فقط (لا يمكن استخدام الحد الأقصى بمفرده)' : 'Please provide a minimum price only (maximum cannot be used alone)');
      return;
    }

    // Validate numbers
    if ((startValue && (isNaN(start!) || start! < 0)) ||
        (endValue && (isNaN(end!) || end! < 0))) {
      setRangeError(locale === 'ar' ? 'يرجى إدخال أرقام صحيحة وموجبة' : 'Please enter valid positive numbers');
      return;
    }

    // Validate that max > min if both are provided
    if (start !== null && end !== null && start >= end) {
      setRangeError(locale === 'ar' ? 'يجب أن يكون الحد الأقصى أكبر من الحد الأدنى' : 'Maximum must be greater than minimum');
      return;
    }

    // Apply both filters together to avoid race conditions with URL updates
    const startStr = start !== null ? start.toString() : null;
    const endStr = end !== null ? end.toString() : null;
    if (applyRangeFilters) {
      applyRangeFilters(startStr, endStr);
    } else {
      if (setRangeStartFilter) setRangeStartFilter(startStr);
      if (setRangeEndFilter) setRangeEndFilter(endStr);
    }
  }, [locale, setRangeStartFilter, setRangeEndFilter, applyRangeFilters]);

  const handleRangePriceClear = useCallback(() => {
    // Clear ref values
    tempRangeStartRef.current = '';
    tempRangeEndRef.current = '';

    // Clear input fields
    if (rangeStartInputRef.current) {
      rangeStartInputRef.current.value = '';
    }
    if (rangeEndInputRef.current) {
      rangeEndInputRef.current.value = '';
    }

    // Clear error state
    setRangeError('');

    // Clear applied filters
    if (setRangeStartFilter) {
      setRangeStartFilter(null);
    }
    if (setRangeEndFilter) {
      setRangeEndFilter(null);
    }
  }, [setRangeStartFilter, setRangeEndFilter]);

  // Input change handlers using refs to avoid re-renders
  const handleRangeStartChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    tempRangeStartRef.current = e.target.value;
  }, []);

  const handleRangeEndChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    tempRangeEndRef.current = e.target.value;
  }, []);


  // Memoized applied range display to prevent unnecessary re-renders
  const appliedRangeDisplay = useMemo(() => {
    if (rangeStartFilter || rangeEndFilter) {
      return `${locale === 'ar' ? 'النطاق المطبق:' : 'Applied range:'} ${rangeStartFilter || '0'} - ${rangeEndFilter || '∞'}`;
    }
    return null;
  }, [rangeStartFilter, rangeEndFilter, locale]);

  // Enhanced LoadingOverlay component
  const LoadingOverlay = ({ children, isLoading, message }: {
    children: React.ReactNode;
    isLoading: boolean;
    message?: string;
  }) => (
    <div>{children}</div>
  );

  // Filter content component
  const FilterContent = () => (
    <div className={`${shouldUseDrawer ? '' : 'bg-gray-50  border border-gray-200  w-full max-w-xs min-w-[350px] h-[100vh]'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">{locale === 'ar' ? 'الفلاتر' : 'Filters'}</h2>
        <div className="flex items-center gap-3 text-xs font-medium">
          <button
            className={`text-blue-500 hover:underline transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleResetFilters}
            disabled={isDisabled}
          >
            {locale === 'ar' ? 'مسح' : 'Clear'}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Price Types Section */}
        {searchType !== 'insighter' && (
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white" data-debug={`Price section visible for ${searchType}`}>
            <button
              onClick={() => !isDisabled && setPriceCollapsed(!priceCollapsed)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconCoin size={20} className="p-0.5 rounded-full" />
                {locale === 'ar' ? 'السعر' : 'Price'}
              </span>
              <div className="flex items-center gap-2">
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${priceCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {!priceCollapsed && (
              <div className="px-4 py-3 bg-white">
                <LoadingOverlay isLoading={isDisabled} message={locale === 'ar' ? 'جاري التحديث...' : 'Updating...'}>
                  <div className="space-y-3">
                    {/* Original Price Filter Chips */}
                    <div className="flex gap-1.5 flex-wrap">
                      <Chip
                        checked={priceFilter === null}
                        onChange={() => !isDisabled && handlePriceFilterChange(null)}
                        variant="outline"
                        size="sm"
                        disabled={isDisabled}
                      >
                        {locale === 'ar' ? 'الكل' : 'All'}
                      </Chip>
                      <Chip
                        checked={priceFilter === 'false'}
                        onChange={() => !isDisabled && handlePriceFilterChange('false')}
                        variant="outline"
                        size="sm"
                        disabled={isDisabled}
                      >
                        {locale === 'ar' ? 'مجاني' : 'Free'}
                      </Chip>
                      <Chip
                        checked={priceFilter === 'true'}
                        onChange={() => !isDisabled && handlePriceFilterChange('true')}
                        variant="outline"
                        size="sm"
                        disabled={isDisabled}
                      >
                        {locale === 'ar' ? 'مدفوع' : 'Paid'}
                      </Chip>
                    </div>

                    {/* Range Price Filter - Hidden when Free is selected */}
                    {priceFilter !== 'false' && (
                      <div className="border-t pt-3">
                      {/* <span className="text-xs font-semibold text-gray-700 mb-2 block">
                        {locale === 'ar' ? 'أو حسب النطاق السعري' : 'Or by price range'}
                      </span> */}
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          ref={rangeStartInputRef}
                          type="number"
                          placeholder={locale === 'ar' ? 'الحد الأدنى' : 'Min price'}
                          defaultValue={rangeStartFilter || ''}
                          onChange={handleRangeStartChange}
                          className={`w-[100px] px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
                            rangeStartFilter ? 'bg-blue-50 border-blue-300' : ''
                          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={isDisabled}
                          min="0"
                          step="0.01"
                        />
                        <input
                          ref={rangeEndInputRef}
                          type="number"
                          placeholder={locale === 'ar' ? 'الحد الأقصى' : 'Max price'}
                          defaultValue={rangeEndFilter || ''}
                          onChange={handleRangeEndChange}
                          className={`w-[100px] px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
                            rangeEndFilter ? 'bg-blue-50 border-blue-300' : ''
                          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={isDisabled}
                          min="0"
                          step="0.01"
                        />
                     <button
                          onClick={handleRangePriceSearch}
                          disabled={isDisabled}
                          className={`p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          title={locale === 'ar' ? 'بحث' : 'Search'}
                        >
                          <IconSearch size={16} />
                        </button>
                        <button
                          onClick={handleRangePriceClear}
                          disabled={isDisabled}
                          className={`p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          title={locale === 'ar' ? 'مسح' : 'Clear'}
                        >
                          <IconX size={16} />
                        </button>
                      </div>
                      {rangeError && (
                        <p className="text-xs text-red-500 mt-1">{rangeError}</p>
                      )}
                      {appliedRangeDisplay && (
                        <p className="text-xs text-gray-600 mt-1">
                          {appliedRangeDisplay}
                        </p>
                      )}
                      </div>
                    )}
                  </div>
                </LoadingOverlay>
              </div>
            )}
          </div>
        )}

        {/* Language Section */}
        {searchType !== 'insighter' && (
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white" data-debug={`Language section visible for ${searchType}`}>
            <button
              onClick={() => !isDisabled && setLanguageCollapsed(!languageCollapsed)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconLanguage size={20} className="p-0.5 rounded-full" />
                {locale === 'ar' ? 'اللغة' : 'Language'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${languageCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {!languageCollapsed && (
              <div className="px-4 py-3 bg-white">
                <LoadingOverlay isLoading={isDisabled}>
                  <div className="flex gap-2 flex-wrap">
                    <Chip
                      checked={languageFilter === 'all'}
                      onChange={() => !isDisabled && setLanguageFilter('all')}
                      variant="outline"
                      size="sm"
                      disabled={isDisabled}
                    >
                      {locale === 'ar' ? 'الكل' : 'All'}
                    </Chip>
                    <Chip
                      checked={languageFilter === 'english'}
                      onChange={() => !isDisabled && setLanguageFilter('english')}
                      variant="outline"
                      size="sm"
                      disabled={isDisabled}
                    >
                      {locale === 'ar' ? 'الإنجليزية' : 'English'}
                    </Chip>
                    <Chip
                      checked={languageFilter === 'arabic'}
                      onChange={() => !isDisabled && setLanguageFilter('arabic')}
                      variant="outline"
                      size="sm"
                      disabled={isDisabled}
                    >
                      {locale === 'ar' ? 'العربية' : 'Arabic'}
                    </Chip>
                  </div>
                </LoadingOverlay>
              </div>
            )}
          </div>
        )}
        {/* Year of Study Section */}
        {searchType !== 'insighter' && (
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
            <button
              onClick={() => !isDisabled && setYearOfStudyCollapsed(!yearOfStudyCollapsed)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconCalendarEvent size={20} className="p-0.5 rounded-full" />
                {locale === 'ar' ? 'النطاق الزمني للبيانات' : 'Data Coverage Period'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${yearOfStudyCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {!yearOfStudyCollapsed && (
              <div className="px-4 py-3 bg-white">
                <LoadingOverlay isLoading={isDisabled}>
                  <div className="flex flex-col gap-2">
                    <div
                      onClick={() => {
                        setIsYearPickerModalOpen(true);
                      }}
                      className={`border border-gray-200 bg-white py-2 px-3 rounded text-sm cursor-pointer flex justify-between items-center hover:border-blue-400 transition-colors ${
                        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {yearOfStudyFilter && (yearOfStudyFilter.startYear || yearOfStudyFilter.endYear) ? (
                        <span className="truncate text-gray-800 font-medium">
                          {yearOfStudyFilter.startYear || 'Any'} - {yearOfStudyFilter.endYear || 'Any'}
                        </span>
                      ) : (
                        <span className="text-gray-800 font-semibold">
                          {locale === 'ar' ? 'جميع السنوات' : 'All Years'}
                        </span>
                      )}
                      {yearOfStudyFilter && (yearOfStudyFilter.startYear || yearOfStudyFilter.endYear) && !isDisabled && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (setYearOfStudyFilter) {
                              setYearOfStudyFilter(null);
                            }
                          }}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </LoadingOverlay>
              </div>
            )}
          </div>
        )}

        {/* Industry Section */}
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
          <button
            onClick={() => !isDisabled && setIndustryCollapsed(!industryCollapsed)}
            disabled={isDisabled}
            className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-blue-500 font-semibold">
              <IconBuildingFactory size={20} className="p-0.5 rounded-full" />
              {locale === 'ar' ? 'المجال' : 'Industry'}
            </span>
            <div className="flex items-center gap-2">
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${industryCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {!industryCollapsed && (
            <div className="px-4 py-3 bg-white space-y-5">
              <LoadingOverlay isLoading={isDisabled}>
                {/* Industry Filter */}
                <div className="flex flex-col gap-2 mb-4">
                  <div
                    onClick={() => !isDisabled && setIsIndustryModalOpen(true)}
                    className={`border border-gray-200 bg-white py-2 px-3 rounded text-sm cursor-pointer flex justify-between items-center hover:border-blue-400 transition-colors ${
                      isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {selectedIndustry ? (
                      <span className="truncate text-gray-800 font-semibold">{selectedIndustry.label.length > 30 ? `${selectedIndustry.label.substring(0, 30)}...` : selectedIndustry.label}</span>
                    ) : (
                      <span className="text-gray-800 font-semibold">{locale === 'ar' ? 'الكل' : 'All'}</span>
                    )}
                    {selectedIndustry && !isDisabled && (
                      <button onClick={handleClearIndustry} className="ml-2 text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* ISIC/HS filters moved to top SearchBar */}

              </LoadingOverlay>
            </div>
          )}
        </div>

        {/* Tags Section */}
        {searchType !== 'insighter' && (
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
            <button
              onClick={() => !isDisabled && setTagsCollapsed(!tagsCollapsed)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconCode size={20} className="p-0.5 rounded-full" />
                {locale === 'ar' ? 'الوسوم (Tags)' : 'Tags'}
              </span>
              <div className="flex items-center gap-2">
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${tagsCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {!tagsCollapsed && (
              <div className="px-4 py-3 bg-white">
                <LoadingOverlay isLoading={isDisabled}>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => !isDisabled && setIsTagModalOpen(true)}
                      className={`w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-blue-400 ${
                        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="text-gray-800 font-medium truncate">
                        {getSelectedTagLabel() ? getSelectedTagLabel() : (locale === 'ar' ? 'الكل' : 'All')}
                      </span>
                      <span className="flex items-center gap-2">
                        {tagFilter && !isDisabled && (
                          <span
                            role="button"
                            aria-label="Clear tag"
                            className="text-gray-400 hover:text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setTagFilter?.(null);
                            }}
                          >
                            <IconX size={14} />
                          </span>
                        )}
                        <span className="text-gray-400">{locale === 'ar' ? 'اختر' : 'Select'}</span>
                      </span>
                    </button>
                  </div>
                </LoadingOverlay>
              </div>
            )}
          </div>
        )}

        {/* Target Market Section */}
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
          <button
            onClick={() => !isDisabled && setTargetMarketCollapsed(!targetMarketCollapsed)}
            disabled={isDisabled}
            className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-blue-500 font-semibold">
              <IconWorld size={20} className="p-0.5 rounded-full" />
              {locale === 'ar' ? (searchType === 'insighter' ? 'بلد الإنسايتر' : 'السوق المستهدفة') : (searchType === 'insighter' ? 'Insighter Origin' : 'Target Market')}
            </span>
            <div className="flex items-center gap-2">
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${targetMarketCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {!targetMarketCollapsed && (
            <div className="px-4 py-3 bg-white space-y-5">
              <LoadingOverlay isLoading={isDisabled}>
                {/* Economic Bloc */}
                {searchType !== 'insighter' && (
                  <div className="flex flex-col gap-2 mb-4">
                    <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'المنطقة الاقتصادية' : 'By Economic Block'}</span>
                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => !isDisabled && setIsEconomicBlocModalOpen(true)}
                      className={`w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-blue-400 ${
                        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="text-gray-800 font-medium truncate">
                        {getSelectedEconomicBlocLabel() ? getSelectedEconomicBlocLabel() : (locale === 'ar' ? 'الكل' : 'All')}
                      </span>
                      <span className="flex items-center gap-2">
                        {economicBlocFilter && !isDisabled && (
                          <span
                            role="button"
                            aria-label="Clear economic bloc"
                            className="text-gray-400 hover:text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setEconomicBlocFilter?.(null);
                            }}
                          >
                            <IconX size={14} />
                          </span>
                        )}
                        <span className="text-gray-400">{locale === 'ar' ? 'اختر' : 'Select'}</span>
                      </span>
                    </button>
                  </div>
                )}

                {/* Region */}
                <div className="flex flex-col gap-2 mb-4">
                  <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'اختر المنطقة الجغرافية' : 'Or By Region'}</span>
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => !isDisabled && setIsRegionModalOpen(true)}
                    className={`w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-blue-400 ${
                      isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="text-gray-800 font-medium truncate">
                      {getSelectedRegionLabel() ? getSelectedRegionLabel() : (locale === 'ar' ? 'الكل' : 'All')}
                    </span>
                    <span className="flex items-center gap-2">
                      {regionFilter && !isDisabled && (
                        <span
                          role="button"
                          aria-label="Clear region"
                          className="text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setRegionFilter?.(null);
                          }}
                        >
                          <IconX size={14} />
                        </span>
                      )}
                      <span className="text-gray-400">{locale === 'ar' ? 'اختر' : 'Select'}</span>
                    </span>
                  </button>
                </div>

                {/* Country */}
                <div className="flex flex-col gap-2 mb-4">
                  <span className="text-xs font-semibold text-gray-700">{locale === 'ar' ? 'الدولة' : 'Or By Country'}</span>
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => !isDisabled && setIsCountryModalOpen(true)}
                    className={`w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-blue-400 ${
                      isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="text-gray-800 font-medium truncate">
                      {getSelectedCountryLabel() ? getSelectedCountryLabel() : (locale === 'ar' ? 'الكل' : 'All')}
                    </span>
                    <span className="flex items-center gap-2">
                      {countryFilter && !isDisabled && (
                        <span
                          role="button"
                          aria-label="Clear country"
                          className="text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCountryFilter?.(null);
                          }}
                        >
                          <IconX size={14} />
                        </span>
                      )}
                      <span className="text-gray-400">{locale === 'ar' ? 'اختر' : 'Select'}</span>
                    </span>
                  </button>
                </div>
              </LoadingOverlay>
            </div>
          )}
        </div>

      
        {/* Role Section - Only for insighter */}
        {searchType === 'insighter' && (
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white" data-debug={`Role section visible for ${searchType}`}>
            <button
              onClick={() => !isDisabled && setRoleCollapsed(!roleCollapsed)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                <IconBuildingBank size={20} className="p-0.5 rounded-full" />
                {locale === 'ar' ? 'النوع' : 'Role'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${roleCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {!roleCollapsed && (
              <div className="px-2 py-3 bg-white">
                <LoadingOverlay isLoading={isDisabled}>
                  <div className="flex gap-2 flex-wrap">
                    <Chip
                      checked={roleFilter === 'all'}
                      onChange={() => !isDisabled && handleRoleFilterChange('all')}
                      variant="outline"
                      size="sm"
                      disabled={isDisabled}
                    >
                      {locale === 'ar' ? 'الكل' : 'All'}
                    </Chip>
                    <Chip
                      checked={roleFilter === 'company'}
                      onChange={() => !isDisabled && handleRoleFilterChange('company')}
                      variant="outline"
                      size="sm"
                      disabled={isDisabled}
                    >
                      {locale === 'ar' ? 'شركة' : 'Company'}
                    </Chip>
                    <Chip
                      checked={roleFilter === 'individual'}
                      onChange={() => !isDisabled && handleRoleFilterChange('individual')}
                      variant="outline"
                      size="sm"
                      disabled={isDisabled}
                    >
                      {locale === 'ar' ? 'فرد' : 'Individual'}
                    </Chip>
                  </div>
                </LoadingOverlay>
              </div>
            )}
          </div>
        )}

        {/* Accuracy filter moved to SearchBar */}
      </div>

      {/* Enhanced Modals */}
      <Modal
        opened={isModalOpen}
        onClose={() => !isDisabled && setIsModalOpen(false)}
        title={locale === 'ar' ? 'اختر رمز ISIC' : 'Select ISIC Code'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث عن رمز ISIC...' : 'Search ISIC codes...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDisabled}
          />
          {renderLeafNodes()}
        </div>
      </Modal>

      <Modal
        opened={isHsCodeModalOpen}
        onClose={() => !isDisabled && setIsHsCodeModalOpen(false)}
        title={locale === 'ar' ? 'اختر رمز المنتج' : 'Select Product'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث عن رمز المنتج...' : 'Search Products...'}
            value={hsCodeSearchTerm}
            onChange={(e) => setHsCodeSearchTerm(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDisabled}
          />
          {renderHsCodes()}
        </div>
      </Modal>

      <Modal
        opened={isIndustryModalOpen}
        onClose={() => !isDisabled && setIsIndustryModalOpen(false)}
        title={locale === 'ar' ? 'اختر المجال' : 'Select Industry'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث عن المجال...' : 'Search industries...'}
            value={industrySearchTerm}
            onChange={(e) => setIndustrySearchTerm(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDisabled}
          />
          {renderIndustryLeafNodes()}
        </div>
      </Modal>

      <Modal
        opened={isYearPickerModalOpen}
        onClose={() => {
          setIsYearPickerModalOpen(false);
        }}
        title={locale === 'ar' ? 'اختر النطاق الزمني للبيانات' : 'Select Data Coverage Period'}
        size="md"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <CustomYearPicker
            placeholder={locale === 'ar' ? 'اختر النطاق الزمني للبيانات' : 'Select Data Coverage Period'}
            yearRangeStart={1900}
            yearRangeEnd={2030}
            allowRange={true}
            locale={locale}
            value={yearOfStudyFilter}
            onChange={(value) => {
              if (setYearOfStudyFilter) {
                setYearOfStudyFilter(value);
              }
              setIsYearPickerModalOpen(false);
            }}
            disabled={isDisabled}
            inline
          />
        </div>
      </Modal>

      {/* Tags Modal */}
      <Modal
        opened={isTagModalOpen}
        onClose={() => !isDisabled && setIsTagModalOpen(false)}
        title={locale === 'ar' ? 'اختر الوسم' : 'Select Tag'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث في الوسوم...' : 'Search tags...'}
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            autoFocus
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDisabled}
          />
          <div className="space-y-2">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (isDisabled) return;
                setTagFilter?.(null);
                setIsTagModalOpen(false);
              }}
              className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${
                !tagFilter
                  ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                  : 'hover:bg-gray-100 border border-gray-200'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="flex-1 font-medium">{locale === 'ar' ? 'الكل' : 'All'}</span>
            </button>
            <OptionsButtonsList
              options={filteredTagOptions}
              locale={locale}
              selectedValue={tagFilter ? (tags.find((t) => t.name === tagFilter)?.id?.toString() ?? null) : null}
              isDisabled={isDisabled}
              onSelect={(val) => {
                if (isDisabled) return;
                const selected = tags.find((t) => t.id.toString() === val);
                if (selected) setTagFilter?.(selected.name);
                setIsTagModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>

      {/* Economic Bloc Modal */}
      <Modal
        opened={isEconomicBlocModalOpen}
        onClose={() => !isDisabled && setIsEconomicBlocModalOpen(false)}
        title={locale === 'ar' ? 'اختر المنطقة الاقتصادية' : 'Select Economic Block'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'البحث في الكتل الاقتصادية...' : 'Search economic blocs...'}
            value={economicBlocSearch}
            onChange={(e) => setEconomicBlocSearch(e.target.value)}
            autoFocus
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDisabled}
          />
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              setEconomicBlocFilter?.(null);
              setIsEconomicBlocModalOpen(false);
            }}
            className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${
              !economicBlocFilter
                ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                : 'hover:bg-gray-100 border border-gray-200'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex-1 font-medium">{locale === 'ar' ? 'الكل' : 'All'}</span>
          </button>
          <OptionsButtonsList
            options={filteredEconomicBlocOptions}
            locale={locale}
            selectedValue={economicBlocFilter ? economicBlocFilter.toString() : null}
            isDisabled={isDisabled}
            onSelect={(val) => {
              if (isDisabled) return;
              // Parent handler now clears the mutually exclusive filters (region, country)
              setEconomicBlocFilter?.(parseInt(val));
              setIsEconomicBlocModalOpen(false);
            }}
          />
        </div>
      </Modal>

      {/* Region Modal */}
      <Modal
        opened={isRegionModalOpen}
        onClose={() => !isDisabled && setIsRegionModalOpen(false)}
        title={locale === 'ar' ? 'اختر المنطقة الجغرافية' : 'Select Region'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'البحث في المناطق...' : 'Search regions...'}
            value={regionSearch}
            onChange={(e) => setRegionSearch(e.target.value)}
            autoFocus
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDisabled}
          />
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              setRegionFilter?.(null);
              setIsRegionModalOpen(false);
            }}
            className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${
              !regionFilter
                ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                : 'hover:bg-gray-100 border border-gray-200'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex-1 font-medium">{locale === 'ar' ? 'الكل' : 'All'}</span>
          </button>
          <OptionsButtonsList
            options={filteredRegionOptions}
            locale={locale}
            selectedValue={regionFilter ? regionFilter.toString() : null}
            isDisabled={isDisabled}
            onSelect={(val) => {
              if (isDisabled) return;
              // Parent handler now clears the mutually exclusive filters (economic_bloc, country)
              setRegionFilter?.(parseInt(val));
              setIsRegionModalOpen(false);
            }}
          />
        </div>
      </Modal>

      {/* Country Modal */}
      <Modal
        opened={isCountryModalOpen}
        onClose={() => !isDisabled && setIsCountryModalOpen(false)}
        title={locale === 'ar' ? 'اختر الدولة' : 'Select Country'}
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        zIndex={4000}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder={locale === 'ar' ? 'البحث في البلدان...' : 'Search countries...'}
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
            autoFocus
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDisabled}
          />
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              setCountryFilter?.(null);
              setIsCountryModalOpen(false);
            }}
            className={`py-2 px-3 rounded-md text-sm flex items-start text-start w-full transition-colors ${
              !countryFilter
                ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium'
                : 'hover:bg-gray-100 border border-gray-200'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex-1 font-medium">{locale === 'ar' ? 'الكل' : 'All'}</span>
          </button>
          <OptionsButtonsList
            options={filteredCountryOptions}
            locale={locale}
            selectedValue={countryFilter ? countryFilter.toString() : null}
            isDisabled={isDisabled}
            onSelect={(val) => {
              if (isDisabled) return;
              // Parent handler now clears the mutually exclusive filters (economic_bloc, region)
              setCountryFilter?.(parseInt(val));
              setIsCountryModalOpen(false);
            }}
          />
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
          {FilterContent()}
        </div>
      </Drawer>
    );
  }

  return FilterContent();
});

FilterBox.displayName = 'FilterBox';

export default FilterBox;