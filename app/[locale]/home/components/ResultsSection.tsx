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
import styles from '../../profile/[uuid]/profile.module.css';

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
  filtersVisible?: boolean;
  // Optional: category chips props
  selectedCategory?: string | null;
  onCategoryChange?: (category: string) => void;
  getCategoryCount?: (category: string) => number;
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
  searchType,
  filtersVisible = true,
  selectedCategory,
  onCategoryChange,
  getCategoryCount
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
    <div className="px-10">
    <Group justify="space-between" align="center" mb="md">
        <div className="flex items-center gap-2">
          {searchType === 'knowledge' && selectedCategory !== undefined && onCategoryChange && getCategoryCount && (
            <div className="flex flex-wrap items-center gap-2">
              {(() => {
                const categories = [
                  { name: 'all', label: 'All', arLabel: 'الكل', filterClass: styles.filterAllActive, iconClass: styles.iconData },
                  { name: 'data', label: 'Data', arLabel: 'البيانات', filterClass: styles.filterDataActive, iconClass: styles.iconData },
                  { name: 'report', label: 'Reports', arLabel: 'التقارير', filterClass: styles.filterReportActive, iconClass: styles.iconReport },
                  { name: 'statistic', label: 'Statistics', arLabel: 'الإحصائيات', filterClass: styles.filterInsightActive, iconClass: styles.iconInsight },
                  { name: 'manual', label: 'Manuals', arLabel: 'الأدلة', filterClass: styles.filterManualActive, iconClass: styles.iconManual },
                  { name: 'course', label: 'Courses', arLabel: 'الدورات', filterClass: styles.filterCourseActive, iconClass: styles.iconCourse },
                ] as const;
                const renderIcon = (name: string, isActive: boolean, iconClass: string) => {
                  switch (name) {
                    case 'all':
                      return (
                        <svg
                          className={`${styles.icon} ${iconClass} ${isActive ? styles.iconActive : ''}`}
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 18.5V19.38C12 21.25 11.25 22 9.37 22H4.62C3.17 22 2 20.83 2 19.38V14.63C2 12.75 2.75 12 4.62 12H5.5V15.5C5.5 17.16 6.84 18.5 8.5 18.5H12Z" fill="currentColor"/>
                          <path d="M17 13.5V14.37C17 15.82 15.82 17 14.37 17H9.62C7.75 17 7 16.25 7 14.37V9.62C7 8.17 8.17 7 9.62 7H10.5V10.5C10.5 12.16 11.84 13.5 13.5 13.5H17Z" fill="currentColor"/>
                          <path d="M22 4.62V9.37C22 11.25 21.25 12 19.37 12H14.62C12.75 12 12 11.25 12 9.37V4.62C12 2.75 12.75 2 14.62 2H19.37C21.25 2 22 2.75 22 4.62Z" fill="currentColor"/>
                        </svg>
                      );
                    case 'data':
                      return (
                        <svg
                          className={`${styles.icon} ${iconClass} ${isActive ? styles.iconActive : ''}`}
                          width="15"
                          height="15"
                          viewBox="0 0 30 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M14.5464 0C10.5851 0 6.86364 0.704566 4.06815 1.98373C1.48292 3.16777 0 4.73376 0 6.28348C0 7.8332 1.48292 9.39967 4.06815 10.5831C6.86364 11.8623 10.585 12.5669 14.5464 12.5669C18.5078 12.5669 22.2297 11.8623 25.0243 10.5831C27.6099 9.39967 29.0933 7.8333 29.0933 6.28348C29.0933 4.73367 27.6099 3.16777 25.0243 1.98373C22.2293 0.704566 18.5077 0 14.5464 0Z" fill="currentColor"/>
                          <path d="M0 9.45442C0.821516 10.3442 1.99713 11.1499 3.49489 11.8359C6.46628 13.1954 10.3914 13.9444 14.5469 13.9444C18.7023 13.9444 22.627 13.1949 25.5984 11.8359C27.0961 11.1499 28.2718 10.3445 29.0933 9.45442V13.4496C29.0933 15.004 27.6131 16.5723 25.0331 17.7531C22.2436 19.029 18.5194 19.7326 14.5464 19.7326C10.5734 19.7326 6.84871 19.029 4.05982 17.7531C1.47967 16.5723 0 15.004 0 13.4496V9.45442Z" fill="currentColor"/>
                          <path d="M29.0933 16.6207C26.6302 19.2908 21.1116 21.1102 14.5464 21.1102C7.98116 21.1102 2.46273 19.2908 0 16.6207V20.1383C0 21.6918 1.47967 23.261 4.05982 24.4417C6.84871 25.7181 10.5734 26.4217 14.5464 26.4217C18.5194 26.4217 22.2436 25.7181 25.0336 24.4417C27.6136 23.261 29.0933 21.6918 29.0933 20.1383V16.6207Z" fill="currentColor"/>
                          <path d="M4.05982 31.608C1.47967 30.4272 0 28.858 0 27.3041V23.3093C2.46273 25.9799 7.98116 27.7994 14.5464 27.7994C21.1116 27.7994 26.6302 25.9799 29.0933 23.3093V27.3041C29.0933 28.858 27.6131 30.4272 25.0331 31.608C22.2436 32.8844 18.5194 33.5875 14.5464 33.5875C10.5734 33.5875 6.84871 32.8844 4.05982 31.608Z" fill="currentColor"/>
                        </svg>
                      );
                    case 'statistic': // map to insight styles/icons
                      return (
                        <svg
                          className={`${styles.icon} ${iconClass} ${isActive ? styles.iconActive : ''}`}
                          width="15"
                          height="15"
                          viewBox="0 0 42 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M29.5625 0C37.1458 0 41.6663 4.52116 41.6455 12.1045V29.5625C41.6455 37.1457 37.1251 41.6669 29.542 41.667H12.1045C4.52127 41.667 0.00012927 37.146 0 29.542V12.1045C0 4.52116 4.52116 0 12.1045 0H29.5625ZM11.9346 21.46C10.7753 21.4601 9.83305 22.4022 9.83301 23.5615V29.4678C9.83321 30.6269 10.7754 31.5682 11.9346 31.5684C13.112 31.5684 14.0545 30.627 14.0547 29.4678V23.5615C14.0546 22.4021 13.1121 21.46 11.9346 21.46ZM19.96 12.1846C18.7825 12.1847 17.8409 13.1268 17.8408 14.2861V29.4678C17.841 30.6269 18.7827 31.5682 19.96 31.5684C21.1192 31.5684 22.0613 30.627 22.0615 29.4678V14.2861C22.0615 13.1267 21.1194 12.1846 19.96 12.1846ZM27.6689 8.83301C26.4561 8.83301 25.4854 9.93196 25.4854 11.2842V28.9912C25.4855 30.3434 26.4561 31.4424 27.6689 31.4424C28.863 31.4423 29.8329 30.3433 29.833 28.9912V11.2842C29.8329 9.93204 28.8631 8.83313 27.6689 8.83301Z" fill="currentColor"/>
                        </svg>
                      );
                    case 'report':
                      return (
                        <svg
                          className={`${styles.icon} ${iconClass} ${isActive ? styles.iconActive : ''}`}
                          width="15"
                          height="15"
                          viewBox="0 0 50 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M45.125 21.75L43.0833 30.4583C41.3333 37.9792 37.875 41.0208 31.375 40.3958C30.3333 40.3125 29.2083 40.125 28 39.8333L24.5 39C15.8125 36.9375 13.125 32.6458 15.1667 23.9375L17.2083 15.2083C17.625 13.4375 18.125 11.8958 18.75 10.625C21.1875 5.58333 25.3333 4.22916 32.2917 5.875L35.7708 6.6875C44.5 8.72916 47.1667 13.0417 45.125 21.75Z" fill="currentColor"/>
                          <path d="M31.375 40.3958C30.0833 41.2708 28.4583 42 26.4792 42.6458L23.1875 43.7292C14.9167 46.3958 10.5625 44.1667 7.87499 35.8958L5.20833 27.6667C2.54166 19.3958 4.74999 15.0208 13.0208 12.3542L16.3125 11.2708C17.1667 11 17.9792 10.7708 18.75 10.625C18.125 11.8958 17.625 13.4375 17.2083 15.2083L15.1667 23.9375C13.125 32.6458 15.8125 36.9375 24.5 39L28 39.8333C29.2083 40.125 30.3333 40.3125 31.375 40.3958Z" fill="currentColor"/>
                          <path d="M36.4375 21.8959C36.3125 21.8959 36.1875 21.875 36.0417 21.8542L25.9375 19.2917C25.1042 19.0834 24.6042 18.2292 24.8125 17.3959C25.0208 16.5625 25.875 16.0625 26.7083 16.2709L36.8125 18.8334C37.6458 19.0417 38.1458 19.8959 37.9375 20.7292C37.7708 21.4167 37.125 21.8959 36.4375 21.8959Z" fill="white"/>
                          <path d="M30.3333 28.9375C30.2083 28.9375 30.0833 28.9167 29.9375 28.8959L23.875 27.3542C23.0417 27.1459 22.5417 26.2917 22.75 25.4584C22.9583 24.625 23.8125 24.125 24.6458 24.3334L30.7083 25.875C31.5417 26.0834 32.0417 26.9375 31.8333 27.7709C31.6667 28.4792 31.0417 28.9375 30.3333 28.9375Z" fill="white"/>
                        </svg>
                      );
                    case 'manual':
                      return (
                        <svg
                          className={`${styles.icon} ${iconClass} ${isActive ? styles.iconActive : ''}`}
                          width="15"
                          height="15"
                          viewBox="0 0 50 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M42.7083 14.5834V31.25H13.2292C9.95834 31.25 7.29167 33.9167 7.29167 37.1875V14.5834C7.29167 6.25002 9.37501 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z" fill="currentColor"/>
                          <path d="M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29167 42.5625 7.29167 38.5417V37.1875C7.29167 33.9167 9.95834 31.25 13.2292 31.25H42.7083Z" fill="currentColor"/>
                          <path d="M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z" fill="white"/>
                          <path d="M27.0833 23.4375H16.6667C15.8125 23.4375 15.1042 22.7292 15.1042 21.875C15.1042 21.0208 15.8125 20.3125 16.6667 20.3125H27.0833C27.9375 20.3125 28.6458 21.0208 28.6458 21.875C28.6458 22.7292 27.9375 23.4375 27.0833 23.4375Z" fill="white"/>
                        </svg>
                      );
                    case 'course':
                      return (
                        <svg
                          className={`${styles.icon} ${iconClass} ${isActive ? styles.iconActive : ''}`}
                          width="15"
                          height="15"
                          viewBox="0 0 39 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z" fill="currentColor"/>
                          <path d="M37.1327 0H1.86734C1.05624 0 0.397949 0.657551 0.397949 1.46939V30.8572C0.397949 31.6683 1.05624 32.3265 1.86734 32.3265H20.9694V31.3443C20.0143 30.0372 19.5 28.4694 19.5 26.8163C19.5 22.5625 22.9604 19.102 27.2143 19.102C31.4682 19.102 34.9286 22.5625 34.9286 26.8163C34.9286 28.4701 34.4143 30.038 33.4592 31.345V32.3265H37.1327C37.9438 32.3265 38.6021 31.6683 38.6021 30.8572V1.46939C38.6021 0.657551 37.9438 0 37.1327 0ZM20.9694 13.2245H8.47959V10.2857H20.9694V13.2245ZM30.5204 7.34694H8.47959V4.40816H30.5204V7.34694Z" fill="currentColor"/>
                        </svg>
                      );
                    default:
                      return null;
                  }
                };
                return categories.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  const count = cat.name === 'all' ? getCategoryCount('all') : getCategoryCount(cat.name);
                  return (
                    <button
                      key={cat.name}
                      onClick={() => onCategoryChange(cat.name)}
                      className={`${styles.filterButton} ${isActive ? `${styles.filterButtonActive} ${cat.filterClass}` : ''}`}
                    >
                      <span className={`flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className={styles.iconWrapper}>
                          {renderIcon(cat.name, isActive, cat.iconClass)}
                      </span>
                        <span className={`${isRtl ? 'me-2' : 'ml-2'} font-medium text-xs`}>
                        {isRtl ? cat.arLabel : cat.label}
                      </span>
                        <span className={`${styles.countBadge} ${isRtl ? 'me-0' : 'ml-2'}`}>
                        {count > 999 ? '999+' : count}
                        </span>
                      </span>
                    </button>
                  );
                });
              })()}
            </div>
          )}
        </div>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </Group>
    </div>
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
                filtersVisible={filtersVisible}
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
              <div className="flex flex-col items-center mt-8 mb-8">
                {/* <div className="text-sm text-gray-600 mb-2">
                  {locale === 'ar' ? 
                    `عرض ${(urlCurrentPage - 1) * 30 + 1} - ${Math.min(urlCurrentPage * 30, totalItems)} من ${totalItems}` : 
                    `Showing ${(urlCurrentPage - 1) * 30 + 1} - ${Math.min(urlCurrentPage * 30, totalItems)} of ${totalItems}`
                  }
                </div> */}
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
