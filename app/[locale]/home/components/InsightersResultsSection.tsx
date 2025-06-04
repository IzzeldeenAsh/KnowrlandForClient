'use client'

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoadingState from './LoadingState';

// Import existing SearchResultItem type or define a compatible type
export interface InsighterProfile {
  uuid: string;
  name: string;
  profile_photo_url: string | null;
}

interface InsightersResultsSectionProps {
  searchQuery: string;
  searchResults: any[]; // Accept any array and we'll handle type checking internally
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  locale: string;
  onPageChange?: (page: number) => void;
}

const InsightersResultsSection: React.FC<InsightersResultsSectionProps> = ({
  searchQuery,
  searchResults,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  locale,
  onPageChange
}) => {
  const isRtl = locale === 'ar';
  
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-4">
      <p className="text-gray-700 font-semibold text-sm capitalize">
         {locale === 'ar' ? '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0646\u062a\u0627\u0626\u062c:' : 'Total results:'}  <span className="font-light lowercase"> {totalItems} {locale === 'ar' ? 'نتيجة' : 'result'}</span>
        </p>
      </div>
      <div className="border-b border-gray-300 mb-4"/>
      <Suspense fallback={<LoadingState />}>
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((insighter) => {
                  // Extract properties safely with fallbacks
                  const uuid = insighter.uuid || insighter.id || '';
                  const name = insighter.name || '';
                  const photoUrl = insighter.profile_photo_url || insighter.photo || insighter.image || null;
                  
                  return (
                    <Link 
                      href={`/${locale}/profile/${uuid}?entity=insighter`} 
                      key={uuid}
                      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-6"
                    >
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                          {photoUrl ? (
                            <Image 
                              src={photoUrl} 
                              alt={name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                              <span className="text-2xl font-semibold text-blue-600">
                                {name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                      <div className='text-sm font-semibold'>{name}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {locale === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                </p>
              </div>
            )}
            
            {totalItems > 0 && (
              <div className="flex flex-col items-center mt-8">
                <div className="text-sm text-gray-600 mb-2">
                  {locale === 'ar' ? 
                    `عرض ${(currentPage - 1) * 10 + 1} - ${Math.min(currentPage * 10, totalItems)} من ${totalItems}` : 
                    `Showing ${(currentPage - 1) * 10 + 1} - ${Math.min(currentPage * 10, totalItems)} of ${totalItems}`
                  }
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => {
                      if (currentPage > 1) {
                        const newPage = currentPage - 1;
                        setCurrentPage(newPage);
                        if (onPageChange) {
                          onPageChange(newPage);
                        }
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    disabled={currentPage <= 1}
                    className={`px-3 py-1 rounded ${currentPage <= 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    {locale === 'ar' ? 'السابق' : 'Previous'}
                  </button>
                  
                  {/* Generate page buttons */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      // If 5 or fewer pages, show all
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // If at start, show first 5
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // If at end, show last 5
                      pageNum = totalPages - 4 + i;
                    } else {
                      // Otherwise show current and 2 on each side
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          if (onPageChange) {
                            onPageChange(pageNum);
                          }
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        }}
                        className={`px-3 py-1 rounded ${
                          pageNum === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => {
                      if (currentPage < totalPages) {
                        const newPage = currentPage + 1;
                        setCurrentPage(newPage);
                        if (onPageChange) {
                          onPageChange(newPage);
                        }
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    disabled={currentPage >= totalPages}
                    className={`px-3 py-1 rounded ${currentPage >= totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    {locale === 'ar' ? 'التالي' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
  );
};

export default InsightersResultsSection;
