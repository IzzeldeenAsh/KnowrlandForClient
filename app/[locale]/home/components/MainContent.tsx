'use client'

import React, { memo } from 'react';
import ResultsSection from './ResultsSection';
import InsightersResultsSection from './InsightersResultsSection';
import PerformanceMonitor from './PerformanceMonitor';
import { SearchState, UIState } from '../types';

interface MainContentProps {
  searchState: SearchState;
  uiState: UIState;
  filtersVisible: boolean;
  locale: string;
  onPageChange: (page: number) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const MainContent = memo<MainContentProps>(({
  searchState,
  uiState,
  filtersVisible,
  locale,
  onPageChange,
  onViewModeChange,
}) => {
  return (
    <>
      <PerformanceMonitor componentName="MainContent" />
      
      <div className={`transition-all duration-300 ease-in-out ${
        filtersVisible ? 'flex-1' : 'flex-1 lg:max-w-none'
      }`}>
        {/* Results section */}
        {searchState.type === 'insighter' ? (
          <InsightersResultsSection
            key={`insighter-section-${searchState.type}-${searchState.totalItems}`}
            searchQuery={searchState.query}
            searchResults={searchState.results}
            loading={searchState.loading}
            currentPage={searchState.currentPage}
            totalItems={searchState.totalItems}
            setCurrentPage={onPageChange}
            totalPages={searchState.totalPages}
            locale={locale}
            onPageChange={onPageChange}
          />
        ) : (
          <ResultsSection
            key={`results-section-${searchState.type}-${searchState.totalItems}`}
            searchQuery={searchState.query}
            searchResults={searchState.results}
            knowledgeItems={[]}
            loading={searchState.loading}
            currentPage={searchState.currentPage}
            setCurrentPage={onPageChange}
            totalPages={searchState.totalPages}
            totalItems={searchState.totalItems}
            viewMode={uiState.viewMode}
            setViewMode={onViewModeChange}
            locale={locale}
            onPageChange={onPageChange}
            searchType={searchState.type}
          />
        )}
      </div>
    </>
  );
});

MainContent.displayName = 'MainContent';

export default MainContent;