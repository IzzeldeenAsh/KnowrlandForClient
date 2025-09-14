'use client'

import React, { memo, useMemo } from 'react';
import FilterBox from './FilterBox';
import PerformanceMonitor from './PerformanceMonitor';
import { FilterState } from '../types';

interface FiltersSectionProps {
  locale: string;
  searchType: 'knowledge' | 'insighter';
  filterState: FilterState;
  isVisible: boolean;
  isDrawerOpen: boolean;
  onToggleFilters: () => void;
  onSetDrawerOpen: (open: boolean) => void;
  onFilterChange: (actionType: string) => (value: any) => void;
  onResetFilters: () => Promise<void>;
}

const FiltersSection = memo<FiltersSectionProps>(({
  locale,
  searchType,
  filterState,
  isVisible,
  isDrawerOpen,
  onToggleFilters,
  onSetDrawerOpen,
  onFilterChange,
  onResetFilters,
}) => {
  // Memoized translations
  const translations = useMemo(() => ({
    filters: locale === 'ar' ? 'المرشحات' : 'Filters',
    showFilters: locale === 'ar' ? 'إظهار المرشحات' : 'Show Filters',
    hideFilters: locale === 'ar' ? 'إخفاء المرشحات' : 'Hide Filters',
  }), [locale]);

  return (
    <>
      <PerformanceMonitor componentName="FiltersSection" />
      
      <div className={`lg:flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isVisible 
          ? 'lg:w-80 opacity-100' 
          : 'lg:w-0 opacity-0 max-h-0'
      }`}>
        <div className={`sticky rounded-md top-2 transition-transform duration-300 ease-in-out ${
          isVisible ? 'transform translate-x-0' : 'transform -translate-x-full lg:translate-x-0'
        }`}>
          <FilterBox
            key={`filter-box-${searchType}`}
            locale={locale}
            searchType={searchType}
            languageFilter={filterState.language}
            setLanguageFilter={onFilterChange('SET_LANGUAGE')}
            countryFilter={filterState.country}
            setCountryFilter={onFilterChange('SET_COUNTRY')}
            regionFilter={filterState.region}
            setRegionFilter={onFilterChange('SET_REGION')}
            economicBlocFilter={filterState.economicBloc}
            setEconomicBlocFilter={onFilterChange('SET_ECONOMIC_BLOC')}
            isicCodeFilter={filterState.isicCode}
            setIsicCodeFilter={onFilterChange('SET_ISIC_CODE')}
            industryFilter={filterState.industry}
            setIndustryFilter={onFilterChange('SET_INDUSTRY')}
            hsCodeFilter={filterState.hsCode}
            setHsCodeFilter={onFilterChange('SET_HS_CODE')}
            priceFilter={filterState.price}
            setPriceFilter={onFilterChange('SET_PRICE')}
            accuracyFilter={filterState.accuracy}
            setAccuracyFilter={onFilterChange('SET_ACCURACY')}
            roleFilter={filterState.role}
            setRoleFilter={onFilterChange('SET_ROLE')}
            resetFilters={onResetFilters}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={onSetDrawerOpen}
          />
        </div>
      </div>
    </>
  );
});

FiltersSection.displayName = 'FiltersSection';

export default FiltersSection;