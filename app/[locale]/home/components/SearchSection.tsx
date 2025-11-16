'use client'

import React, { memo, useMemo } from 'react';
import { CategoryIconBox } from './CategoryIcons';
import SearchBar from './SearchBar';
import PerformanceMonitor from './PerformanceMonitor';

interface SearchSectionProps {
  searchQuery: string;
  searchType: 'knowledge' | 'insighter';
  locale: string;
  filterCategory: string;
  categoryCounts: Record<string, number>;
  onQueryChange: (query: string) => void;
  onSearchTypeChange: (type: 'knowledge' | 'insighter') => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onCategorySelect: (category: string) => void;
  onSearch: () => void;
}

const SearchSection = memo<SearchSectionProps>(({
  searchQuery,
  searchType,
  locale,
  filterCategory,
  categoryCounts,
  onQueryChange,
  onSearchTypeChange,
  onSearchSubmit,
  onCategorySelect,
  onSearch,
}) => {
  // Memoized translations
  const translations = useMemo(() => ({
    searchTitle: locale === 'ar' ? 'ابحث في التقارير والبيانات والإحصائيات' : 'Search data, reports, and statistics',
    searchSubtitle: locale === 'ar' ? 'ابدأ الآن' : 'Start exploring now',
    searchPlaceholder: locale === 'ar' ? 'إبحث عن معرفة أو خبير...' : 'Search for Knowledge or Expert...',
    exploreByCategory: locale === 'ar' ? 'عرض حسب الفئة' : 'Explore by category',
  }), [locale]);

  return (
    <>
      <PerformanceMonitor componentName="SearchSection" />
      
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
                {translations.searchTitle}
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-center " style={{lineHeight: '1.3'}}>
                {translations.searchSubtitle}
              </h1>
            </div>
            
            {/* Search Bar */}
            <div className="mx-auto mt-8 max-w-4xl ">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={onQueryChange}
                searchType={searchType}
                setSearchType={onSearchTypeChange}
                locale={locale}
                placeholder={translations.searchPlaceholder}
                onSubmit={onSearchSubmit}
                onSearch={onSearch}
                onQueryChange={onQueryChange}
              />
            </div>
            
            {/* Category Icons */}
            {searchType === 'knowledge' && (
              <div className="mt-10">
                <p className="text-sm font-medium text-gray-500 mb-4">
                  {translations.exploreByCategory}
                </p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  <CategoryIconBox 
                    name="all" 
                    label="All" 
                    locale={locale} 
                    arLabel="الكل" 
                    isSelected={filterCategory === 'all'} 
                    onClick={() => onCategorySelect('all')} 
                    count={categoryCounts['all']}
                  />
                  <div className="hidden sm:block w-px h-16 bg-gray-300 mx-2"></div>
                  <CategoryIconBox 
                    name="data" 
                    label="Data" 
                    locale={locale} 
                    arLabel="البيانات" 
                    isSelected={filterCategory === 'data'} 
                    onClick={() => onCategorySelect('data')} 
                    count={categoryCounts['data']}
                  />
                  <CategoryIconBox 
                    name="report" 
                    label="Reports" 
                    locale={locale} 
                    arLabel="التقارير" 
                    isSelected={filterCategory === 'report'} 
                    onClick={() => onCategorySelect('report')} 
                    count={categoryCounts['report']}
                  />
                  <CategoryIconBox 
                        name="statistic" 
                        label="Statistics" 
                    locale={locale} 
                    arLabel="الرؤى" 
                    isSelected={filterCategory === 'insight'} 
                    onClick={() => onCategorySelect('insight')} 
                    count={categoryCounts['insight']}
                  />
                  <CategoryIconBox 
                    name="manual" 
                    label="Manuals" 
                    locale={locale} 
                    arLabel="الأدلة" 
                    isSelected={filterCategory === 'manual'} 
                    onClick={() => onCategorySelect('manual')} 
                    count={categoryCounts['manual']}
                  />
                  <CategoryIconBox 
                    name="course" 
                    label="Courses" 
                    locale={locale} 
                    arLabel="الدورات" 
                    isSelected={filterCategory === 'course'} 
                    onClick={() => onCategorySelect('course')} 
                    count={categoryCounts['course']}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

SearchSection.displayName = 'SearchSection';

export default SearchSection;