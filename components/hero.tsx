'use client'

import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom-blue.svg'
import LogoIcon from '@/public/images/SVG/Logo-icon-white.svg'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// API function for autocomplete
async function fetchAutocomplete(keyword: string, locale: string): Promise<string[]> {
  if (!keyword.trim()) return [];
  
  try {
    const response = await fetch(`https://api.foresighta.co/api/platform/search/autocomplete?keyword=${encodeURIComponent(keyword)}`, {
      headers: {
        'Accept-Language': locale, // Set the locale in the header
        'Accept': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.data.searchKeywords || [];
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return [];
  }
}

// *** NEW COMPONENT FOR BOLD PLACEHOLDER ***
function Placeholder() {
  const t = useTranslations('Hero');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const placeholderText = isMobile ? t.raw('searchPlaceholderMobile') : t.raw('searchPlaceholder');

  return (
    <div
      className="absolute inset-y-0 flex items-center pointer-events-none text-gray-500 md:text-lg text-base"
      dangerouslySetInnerHTML={{ __html: placeholderText }}
    />
  );
}


export default function Hero() {
  const t = useTranslations('Hero');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const [searchType, setSearchType] = useState<'knowledge' | 'insighter'>('knowledge');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  // Fetch suggestions when debounced search term changes
  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedSearchTerm) {
        setIsLoading(true);
        const suggestionResults = await fetchAutocomplete(debouncedSearchTerm, currentLocale);
        setSuggestions(suggestionResults);
        setShowSuggestions(suggestionResults.length > 0);
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    getSuggestions();
  }, [debouncedSearchTerm, currentLocale]);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Up arrow
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
    // Enter key
    else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        e.preventDefault();
        handleSuggestionSelect(suggestions[activeSuggestionIndex]);
      }
    }
    // Escape key
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSearchInput(suggestion);
    setShowSuggestions(false);
    router.push(`/${currentLocale}/home?search_type=${searchType}&keyword=${encodeURIComponent(suggestion)}&accuracy=any`);
  };

  // Handle clear search input
  const handleClearSearch = () => {
    setSearchInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home page even with empty input
    router.push(`/${currentLocale}/home?search_type=${searchType}&keyword=${encodeURIComponent(searchInput.trim())}&accuracy=any`);
  };

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-14 pb-16  md:pb-32" >
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center" >
            <div className="mb-6" data-aos="fade-down">
            </div>
            <div className="flex justify-center mb-6" data-aos="fade-down" data-aos-delay="100">
              <Image src={LogoIcon} width={80} height={80} alt="Logo" priority />
            </div>
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-5 leading-[1.2]" data-aos="fade-down">{t('title')}</h2>
            <p className="text-lg text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              {t('description')}
            </p>
            <div className="max-w-3xl mx-auto w-full pb-4" data-aos="fade-down" data-aos-delay="300">
              <div className="relative">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                  <div className="relative w-full">
                    {/* Integrated search bar with dropdown */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden p-2" style={{ minHeight: '60px' }}>
                      {/* Dropdown selector */}
                      <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center justify-between cursor-pointer px-2 mb-2 sm:mb-0 sm:me-3 w-full sm:w-auto ${currentLocale === 'ar' ? 'sm:border-l' : 'sm:border-r'} sm:border-gray-200 sm:pr-3 relative`}
                      >
                        <div className="flex items-center">
                          {/* Display the icon based on selected option */}
                          <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                            {searchType === 'knowledge' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6l0 13" />
                                <path d="M12 6l0 13" />
                                <path d="M21 6l0 13" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                              </svg>
                            )}
                          </div>
                          <span className="text-gray-900 font-medium md:text-md text-sm">
                            {searchType === 'knowledge' 
                              ? (currentLocale === 'ar' ? 'معرفة' : 'Knowledge') 
                              : (currentLocale === 'ar' ? 'إنسايتر' : 'Insighter')}
                          </span>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-500 ${currentLocale === 'ar' ? 'mr-2' : 'ml-2'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d={currentLocale === 'ar' ? "M15 19l-7-7 7-7" : "M19 9l-7 7-7-7"}
                          ></path>
                        </svg>
                      </div>
                      
                      {/* Search input field */}
                      {/* *** MODIFIED SECTION: Added relative positioning and custom placeholder *** */}
                      <div className="relative flex flex-1 items-center w-full sm:w-auto">
                        {/* Render custom placeholder only when input is empty */}
                        {!searchInput && <Placeholder />}

                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          onFocus={() => searchInput && suggestions.length > 0 && setShowSuggestions(true)}
                          onKeyDown={handleKeyDown}
                          //                            placeholder={window.innerWidth < 768 ? t('searchPlaceholderMobile') : t('searchPlaceholder')} // The native placeholder is removed.
                          className="flex-1 outline-none bg-transparent border-none focus-outline-none focus:border-none focus:ring-0 md:text-lg text-base placeholder-transparent text-gray-800 w-full"
                          autoComplete="off"
                          dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
                        />  
                      
                        {/* Clear button - show when there's text in the input */}
                        {searchInput.trim().length > 0 && (
                          <button
                            type="button"
                            className="mr-2 p-1 text-gray-400 hover:text-gray-600 flex items-center justify-center"
                            onClick={handleClearSearch}
                            aria-label="Clear search"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}

                        {/* Loading indicator */}
                        {isLoading && (
                          <div className="flex items-center justify-center mr-2">
                            <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                        
                        {/* Search button */}
                        <button
                          type="submit"
                          className="ml-2 bg-blue-600 text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition duration-300"
                          aria-label="Search"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none" 
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round" 
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                      <div className={`absolute mt-1 w-[160px] bg-white border border-gray-200 rounded-md shadow-lg z-10 ${currentLocale === 'ar' ? 'right-0' : 'left-0'}`}>
                        <div 
                          className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${searchType === 'knowledge' ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setSearchType('knowledge');
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-3'}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                <path d="M3 6l0 13" />
                                <path d="M12 6l0 13" />
                                <path d="M21 6l0 13" />
                              </svg>
                            </div>
                            <span className="text-gray-900 font-medium md:text-md text-sm">{currentLocale === 'ar' ? 'معرفة' : 'Knowledge'}</span>
                          </div>
                        </div>
                        <div 
                          className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${searchType === 'insighter' ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setSearchType('insighter');
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${currentLocale === 'ar' ? 'ml-2' : 'mr-3'}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                              </svg>
                            </div>
                            <span className="text-gray-900 font-medium md:text-md text-sm">{currentLocale === 'ar' ? 'إنسايتر' : 'Insighter'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Suggestions dropdown */}
                    {showSuggestions && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto"
                      >
                        {suggestions.map((suggestion, index) => (
                          <div 
                            key={index}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${activeSuggestionIndex === index ? 'bg-blue-50' : ''}`}
                            onClick={() => handleSuggestionSelect(suggestion)}
                            onMouseEnter={() => setActiveSuggestionIndex(index)}
                            dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
                          >
                            <div className="flex items-center">
                              <svg className={`w-5 h-5 text-gray-400 ${currentLocale === 'ar' ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <span className="text-gray-800">
                                {debouncedSearchTerm && suggestion.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ? (
                                  <>
                                    {/* Find the start index of the matching part */}
                                    {(() => {
                                      const lowerSuggestion = suggestion.toLowerCase();
                                      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
                                      const matchIndex = lowerSuggestion.indexOf(lowerSearchTerm);
                                      
                                      if (matchIndex >= 0) {
                                        // Split into three parts: before match, match, after match
                                        const beforeMatch = suggestion.substring(0, matchIndex);
                                        const match = suggestion.substring(matchIndex, matchIndex + debouncedSearchTerm.length);
                                        const afterMatch = suggestion.substring(matchIndex + debouncedSearchTerm.length);
                                        
                                        return (
                                          <>
                                            {beforeMatch}
                                            <strong className="font-bold">{match}</strong>
                                            {afterMatch}
                                          </>
                                        );
                                      }
                                      
                                      // Fallback if no match found (shouldn't happen in normal cases)
                                      return suggestion;
                                    })()}
                                  </>
                                ) : (
                                  suggestion
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}