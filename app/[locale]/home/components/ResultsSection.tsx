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
  
  // Loading state component with a nice spinner
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">
        {locale === 'ar' ? 'جارٍ التحميل...' : 'Loading...'}
      </p>
    </div>
  );
  
  // Empty state component 
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {locale === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {locale === 'ar' ? 
          'حاول تعديل البحث أو تغيير المرشحات للعثور على المزيد من النتائج.' : 
          'Try adjusting your search or changing the filters to find more results.'
        }
      </p>
    </div>
  );
  
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <Group justify="space-between" align="center" mb="md">
        <p className="text-gray-700 font-semibold text-sm uppercase">
          {/* {!loading && totalItems > 0 && (
            <>
              {locale === 'ar' ? 'إجمالي النتائج:' : 'Total results:'} 
              <span className="font-light lowercase ml-2">{totalItems} {locale === 'ar' ? 'نتيجة' : 'result'}</span>
            </>
          )} */}
        </p>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </Group>
      <div className="border-b border-gray-300 mb-4"/>
      
      <Suspense fallback={<LoadingSpinner />}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Show results if we have them */}
            {searchResults.length > 0 ? (
              <SearchResultsGrid
                key={`search-results-${searchType}-${Date.now()}`}
                results={searchResults}
                colNumbers={3}
                locale={locale}
                viewMode={viewMode}
              />
            ) : knowledgeItems.length > 0 ? (
              // Show knowledge items if we have them
              viewMode === 'grid' ? (
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
              )
            ) : (
              // Only show empty state when not loading and no results
              <EmptyState />
            )}
            
            {/* Pagination - only show when we have results and not loading */}
            {!loading && totalItems > 0 && (
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
