'use client'

import React, { Suspense } from 'react';
import { Title, Group, Pagination } from '@mantine/core';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
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
  searchType
}) => {
  const t4 = useTranslations('Features4');
  const isRtl = locale === 'ar';
  const searchParams = useSearchParams();
  
  // Get current page directly from URL - this is the source of truth!
  const urlCurrentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  
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
      <Image
        src="/images/Search-Not-Found.svg"
        alt="No search results found"
        width={350}
        height={350}
        className="mb-4"
      />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {locale === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {locale === 'ar' ? 
          'حاول تعديل البحث أو تغيير الفلاتر للعثور على المزيد من النتائج.' : 
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
                key={`search-results-${searchType}-${totalItems}-${currentPage}`}
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
                    `عرض ${(urlCurrentPage - 1) * 30 + 1} - ${Math.min(urlCurrentPage * 30, totalItems)} من ${totalItems}` : 
                    `Showing ${(urlCurrentPage - 1) * 30 + 1} - ${Math.min(urlCurrentPage * 30, totalItems)} of ${totalItems}`
                  }
                </div>
                <Pagination 
                  key={`pagination-${totalPages}-${totalItems}`}
                  total={totalPages} 
                  value={urlCurrentPage}
                  onChange={(page) => {
                    // Simply call the pagination handler - it will update URL which will update our display
                    if (onPageChange) {
                      onPageChange(page);
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
