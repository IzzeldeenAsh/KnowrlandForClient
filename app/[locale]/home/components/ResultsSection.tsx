'use client'

import React, { Suspense } from 'react';
import { Title, Group, Pagination } from '@mantine/core';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import ViewModeToggle from './ViewModeToggle';
import LoadingState from './LoadingState';
import type { KnowledgeItem } from '../../topic/[id]/[slug]/KnowledgeGrid';
import type { SearchResultItem } from '../SearchResultsGrid';
import TestSearchResults from './TestSearchResults'; // Import the test component

// Dynamically import components with no SSR to avoid hydration issues
const KnowledgeGrid = dynamic(
  () => import('../../topic/[id]/[slug]/KnowledgeGrid'),
  { ssr: false }
);

const KnowledgeList = dynamic(
  () => import('../../topic/[id]/[slug]/KnowledgeList'),
  { ssr: false }
);

const SearchResultsGrid = dynamic(
  () => import('../SearchResultsGrid'),
  { ssr: false }
);

interface ResultsSectionProps {
  searchQuery: string;
  searchResults: SearchResultItem[];
  knowledgeItems: KnowledgeItem[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  locale: string;
  // Add a direct search callback function to trigger API calls
  onPageChange?: (page: number) => void;
  // Optional router for URL updates
  router?: any;
  updateUrlWithFilters?: (params: any) => void;
  // Add search type to force re-render when it changes
  searchType?: 'knowledge' | 'insighter';
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  searchQuery,
  searchResults,
  knowledgeItems,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  viewMode,
  setViewMode,
  locale,
  onPageChange,
  router,
  updateUrlWithFilters,
  searchType
}) => {
  const t4 = useTranslations('Features4');
  const isRtl = locale === 'ar';
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <Group justify="space-between" align="center" mb="md">
      <p className="text-gray-700 font-semibold text-sm uppercase">
         {/* {locale === 'ar' ? '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0646\u062a\u0627\u0626\u062c:' : 'Total results:'}  <span className="font-light lowercase"> {totalItems} {locale === 'ar' ? 'نتيجة' : 'result'}</span> */}
        </p>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </Group>
      <div className="border-b border-gray-300 mb-4"/>
      <Suspense fallback={<LoadingState />}>
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* Display search results whether we have a keyword or not, as backend returns all data for empty keywords */}
            {searchResults.length > 0 ? (
              <SearchResultsGrid
                key={`search-results-${searchType}-${Date.now()}`}
                results={searchResults}
                colNumbers={3}
                locale={locale}
                viewMode={viewMode}
              />
            ) : viewMode === 'grid' ? (
              <KnowledgeGrid 
                knowledge={knowledgeItems} 
                topicName="All Topics"
                showHeader={false}
                colNumbers={3}
                locale={locale}
              />
            ) : (
              <KnowledgeList
                knowledge={knowledgeItems}
                topicName="All Topics"
                showHeader={false}
                locale={locale}
              />
            )}
            {totalItems > 0 && (
              <div className="flex flex-col items-center mt-8">
                <div className="text-sm text-gray-600 mb-2">
                  {locale === 'ar' ? 
                    `عرض ${(currentPage - 1) * 30 + 1} - ${Math.min(currentPage * 30, totalItems)} من ${totalItems}` : 
                    `Showing ${(currentPage - 1) * 30 + 1} - ${Math.min(currentPage * 30, totalItems)} of ${totalItems}`
                  }
                </div>
                <Pagination 
                  total={totalPages} 
                  value={currentPage}
                  onChange={(page) => {
                    // First log the page change to help with debugging
                    console.log('Pagination clicked, changing from page', currentPage, 'to', page);
                    
                    // IMPORTANT: First update our local state
                    // This ensures all components immediately reflect the new page
                    setCurrentPage(page);
                    
                    // SECOND: Call the direct search function if provided
                    // This ensures the API call uses the correct page number
                    if (onPageChange) {
                      console.log('Calling direct search for page:', page);
                      onPageChange(page);
                    } else {
                      console.warn('No onPageChange handler provided!');
                    }
                    
                    // THIRD: Update URL with the page parameter
                    // We do this last to prevent race conditions
                    if (updateUrlWithFilters) {
                      console.log('Updating URL with page:', page);
                      updateUrlWithFilters({ page });
                    } else if (router) {
                      // Fallback if updateUrlWithFilters not provided but router is
                      const urlParams = new URLSearchParams(window.location.search);
                      // Remove page parameter if page 1 for cleaner URLs
                      if (page === 1) {
                        urlParams.delete('page');
                      } else {
                        urlParams.set('page', page.toString());
                      }
                      router.push(`/${locale}/home?${urlParams.toString()}`, { scroll: false });
                    }
                    
                    // Scroll back to top of results for better UX
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }}
                  withControls
                  boundaries={1}
                />
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
  );
};

export default ResultsSection;
