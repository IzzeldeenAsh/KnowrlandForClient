'use client'

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoadingState from './LoadingState';
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import { Rating, Pagination } from '@mantine/core';

function getInitials(fullName: string, maxLetters = 2) {
  const cleaned = (fullName || '').trim();
  if (!cleaned) return '';

  const parts = cleaned.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    // If there's only one word, take up to the first 2 characters (unicode-safe)
    return Array.from(parts[0]).slice(0, maxLetters).join('').toUpperCase();
  }

  // Take first letter of first two words (unicode-safe)
  return parts
    .slice(0, maxLetters)
    .map((p) => (Array.from(p)[0] ?? ''))
    .join('')
    .toUpperCase();
}

// Import existing SearchResultItem type or define a compatible type
export interface InsighterProfile {
  uuid: string;
  name: string;
  profile_photo_url: string | null;
  roles: string[];
  reviews_summary: {
    count: number;
    average: number;
  };
  company?: {
    uuid: string;
    legal_name: string;
    logo: string;
    verified: boolean;
  };
  country?: {
    id: number;
    name: string;
    flag: string;
  };
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
  filtersVisible?: boolean; // Add prop to track filter visibility
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
  onPageChange,
  filtersVisible = true
}) => {
  const isRtl = locale === 'ar';
  
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-4 px-10">
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
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 px-10 ${
                filtersVisible ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
              }`}>
                {searchResults.map((insighter) => {
                  // Extract properties safely with fallbacks
                  const uuid = insighter.uuid || insighter.id || '';
                  const name = insighter.name || '';
                  const photoUrl = insighter.profile_photo_url || insighter.photo || insighter.image || null;
                  const roles = insighter.roles || [];
                  const isInsighter = roles.includes('insighter');
                  const isCompany = roles.includes('company');
                  const isCompanyInsighter = roles.includes('company-insighter');
                  const reviewsSummary = insighter.reviews_summary || { count: 0, average: 0 };
                  const company = insighter.company;
                  const country = insighter.country;
                  
                  return (
                    <Link 
                      href={`/${locale}/profile/${uuid}?entity=insighter`} 
                      key={uuid}
                      className="flex flex-col justify-between gap-4 bg-white rounded-lg border-1 border-gray-200 overflow-hidden duration-300 p-6 hover:translate-y-[-5px] hover:shadow-md-blue-500"
                      style={{
                        backgroundImage: "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1746774672/Artboard_2_qzimiu.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="flex flex-col items-center space-y-4">
                        {/* Avatar Section */}
                        <div className="relative w-24 h-24 rounded-full border border-blue-500">
                          {/* Avatar display logic based on role */}
                          {isCompanyInsighter ? (
                            // Company-insighter: Show profile photo or initials with company logo overlay
                            <>
                              {photoUrl ? (
                                // Show profile photo if available
                                <Image 
                                  src={photoUrl} 
                                  alt={name}
                                  fill
                                  className="object-cover border-1 border-blue-500 rounded-full object-top"
                                />
                              ) : (
                                // Fallback to initials
                                <div className="w-full h-full bg-blue-100 flex items-center justify-center rounded-full">
                                  <span className="text-2xl font-semibold text-blue-600 rounded-full">
                                    {getInitials(name)}
                                  </span>
                                </div>
                              )}
                              {company?.logo && (
                                <div className="absolute -bottom-4 -right-7 w-14 h-14 rounded-full overflow-hidden border-4 border-white bg-white z-10">
                                  <Image 
                                    src={company.logo} 
                                    alt={company.legal_name || 'Company'}
                                    fill
                                    className="object-cover rounded-full object-top"
                                  />
                                </div>
                              )}
                            </>
                          ) : isCompany && company?.logo ? (
                            // Company: Show company logo with profile photo/initials overlay
                            <>
                              <Image 
                                src={company.logo} 
                                alt={company.legal_name || name}
                                fill
                                className="object-cover border-1 border-blue-500 rounded-full"
                              />
                              {photoUrl ? (
                                <div className="absolute -bottom-4 -right-7 w-14 h-14 rounded-full border-4 border-white bg-white z-10">
                                  <Image 
                                    src={photoUrl} 
                                    alt={name}
                                    fill
                                    className="object-cover rounded-full object-top"
                                  />
                                </div>
                              ) : (
                                <div className="absolute -bottom-4 -right-7 w-14 h-14 rounded-full bg-blue-100 border-4 border-white z-10 flex items-center justify-center">
                                  <span className="text-sm font-semibold text-blue-600 rounded-full">
                                    {getInitials(name)}
                                  </span>
                                </div>
                              )}
                            </>
                          ) : photoUrl ? (
                            // Regular insighter: Show profile photo
                            <Image 
                              src={photoUrl} 
                              alt={name}
                              fill
                              className="object-cover border-1 border-blue-500 rounded-full object-top"
                            />
                          ) : (
                            // Fallback: Show initials
                            <div className="w-full h-full bg-blue-100 flex items-center justify-center rounded-full">
                              <span className="text-2xl font-semibold text-blue-600 rounded-full">
                                {getInitials(name)}
                              </span>
                            </div>
                          )}
                          
                          {/* Online indicator */}
                        </div>

                        {/* Name and Badge Section */}
                        <div className='flex flex-col items-center gap-3'>
                            {/* Role-based badges */}
                            {isCompanyInsighter && company && (
                            <span className="bg-[#EFF8FF] text-[#299AF8] font-bold uppercase text-[10px] px-3 py-1 rounded-full">
                              {company.legal_name} 
                            </span>
                          )}
                          
                          {isInsighter && !isCompanyInsighter && (
                            <span className="bg-[#DFFEE9] text-[#1BC653] font-bold uppercase text-[10px] px-3 py-1 rounded-full">
                              Insighter
                            </span>
                          )}
                          
                          {isCompany && !isCompanyInsighter && company && (
                            <>
                              <span className="bg-[#EFF8FF] text-[#299AF8] font-bold text-[10px] px-3 py-1 rounded-full uppercase">
                                {company.legal_name} 
                              </span>
                        
                            </>
                          )}
                          <div className='flex items-center gap-2' style={{direction:'ltr'}}>
                            <div className='text-lg font-semibold text-center'>{name}</div>
                            <IconRosetteDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                          </div>
                          
                          {/* Country Flag and Name */}
                          {country && country.flag && (
                            <div className="flex items-center gap-2">
                              <div className="relative w-4 h-4 flex-shrink-0">
                                <Image
                                  src={`/images/flags/${country.flag}.svg`}
                                  alt={country.name || 'Country flag'}
                                  fill
                                  className="object-cover rounded-sm"
                                  onError={(e) => {
                                    // Fallback to default flag if country flag doesn't exist
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/flags/default.svg';
                                  }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">{country.name}</span>
                            </div>
                          )}
                        
                        </div>
                        
                        {/* Rating Section */}
                        {reviewsSummary && reviewsSummary.count >= 1 && reviewsSummary.average > 0 && (
                          <div className="flex items-center gap-2">
                            <Rating value={reviewsSummary.average} fractions={2} readOnly size="sm" />
                            <span className="text-sm font-medium text-gray-700">({reviewsSummary.average.toFixed(1)})</span>
                          </div>
                        )}

                       
                      </div>
                       {/* Action Buttons */}
                       <div className="flex flex-col gap-2 w-full">
                          <Link
                            href={`/${locale}/profile/${uuid}?entity=insighter&tab=meet`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1"
                          >
                            <button className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-xs text-white px-6 py-2 rounded-md font-medium hover:shadow-lg transition-all duration-300">
                              {locale === 'ar' ? ` حجز مقابلة ` : `Meet `}
                            </button>
                          </Link>
                          <Link
                            href={`/${locale}/profile/${uuid}?entity=insighter`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1"
                          >
                            <button className="w-full bg-white text-xs text-gray-900 border border-gray-300 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-all duration-300">
                              {locale === 'ar' ? 'عرض الرؤى المنشورة' : 'View Published Insights'}
                            </button>
                          </Link>

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
            
            {/* Pagination - only show when we have results and not loading */}
            {!loading && totalItems > 0 && (
              <div className="flex flex-col items-center mt-8 mb-8">
                {/* <div className="text-sm text-gray-600 mb-2">
                  {locale === 'ar' ?
                    `عرض ${(currentPage - 1) * 30 + 1} - ${Math.min(currentPage * 30, totalItems)} من ${totalItems}` :
                    `Showing ${(currentPage - 1) * 30 + 1} - ${Math.min(currentPage * 30, totalItems)} of ${totalItems}`
                  }
                </div> */}
                <Pagination
                  key={`pagination-${totalPages}-${totalItems}`}
                  total={totalPages}
                  value={currentPage}
                  onChange={(page) => {
                    // Simply call the pagination handler - it will update URL which will update our display
                    setCurrentPage(page);
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

export default InsightersResultsSection;
