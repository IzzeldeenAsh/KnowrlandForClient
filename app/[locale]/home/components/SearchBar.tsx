'use client'

import React, { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useSuggestions, useClickAway } from '../utils/hooks';
import styles from '../utils/custom-search-engine-styles.module.css';
import { fetchSearchResults } from '../utils/api';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: 'knowledge' | 'insighter';
  setSearchType: (type: 'knowledge' | 'insighter') => void;
  locale: string;
  placeholder: string;
  onSubmit: (e: React.FormEvent) => void;
  onDirectSearchResults?: (results: any) => void; // New prop to handle direct API search results
  onQueryChange?: (query: string) => void; // New prop to handle URL updates when query changes
  onSearch?: (query: string) => void; // New prop to trigger explicit searches
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  locale,
  placeholder,
  onSubmit,
  onDirectSearchResults,
  onQueryChange,
  onSearch
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  
  // Simplified suggestion state management
  const [inputFocused, setInputFocused] = useState(false);
  const [suggestionSelected, setSuggestionSelected] = useState(false);
  const [mouseInSuggestions, setMouseInSuggestions] = useState(false);
  
  // Get suggestions functionality
  const {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isLoadingSuggestions,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    resetSuggestions,
    hideSuggestions,
    allowSuggestions
  } = useSuggestions(searchQuery, locale);
  
  // Handle clicking outside the suggestions dropdown
  const suggestionsRef = useClickAway(() => {
    hideSuggestions();
    setInputFocused(false);
    setMouseInSuggestions(false);
  });
  
  // Handle clicking outside the type dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node) && 
          event.target !== document.querySelector('[data-type-dropdown-toggle]')) {
        setShowTypeDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ensure suggestions show when they become available and input is focused
  useEffect(() => {
    if (inputFocused && suggestions.length > 0 && !suggestionSelected) {
      console.log('Triggering allowSuggestions from useEffect');
      allowSuggestions();
    }
  }, [suggestions, inputFocused, suggestionSelected, allowSuggestions]);
  
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
      } else {
        // Execute search when Enter is pressed without suggestion selection
        setSuggestionSelected(true);
        hideSuggestions();
      }
    }
    // Escape key
    else if (e.key === 'Escape') {
      hideSuggestions();
      setInputFocused(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSuggestionSelected(true);
    hideSuggestions();
    setInputFocused(false);
    
    // Use the onSearch prop if available, otherwise fall back to URL navigation
    if (onSearch) {
      onSearch(suggestion);
    } else {
      // Fallback behavior
      setSearchQuery(suggestion);
      router.push(`/${locale}/home?search_type=${searchType}&keyword=${encodeURIComponent(suggestion)}`);
    }
  };

  // Handle clearing the search input
  const handleClearSearch = () => {
    setSearchQuery('');
    resetSuggestions();
    setSuggestionSelected(false);
    setInputFocused(false);
    // Focus back to the input after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      setInputFocused(true);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    setInputFocused(true);
    setSuggestionSelected(false);
    // Allow suggestions to show when focused
    allowSuggestions();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setSuggestionSelected(false);
    
    // Call onQueryChange for URL updates (debounced in parent)
    if (onQueryChange) {
      onQueryChange(newQuery);
    }
    
    // Always allow suggestions to show when typing
    allowSuggestions();
  };

  // Simplified suggestion visibility logic - show suggestions if we have them and input is focused
  const shouldShowSuggestions = 
    showSuggestions && 
    suggestions.length > 0 &&
    inputFocused &&
    !suggestionSelected;
  
  // Debug log for suggestion visibility
  useEffect(() => {
    console.log('Suggestion visibility state:', {
      showSuggestions,
      suggestionsCount: suggestions.length,
      inputFocused,
      suggestionSelected,
      shouldShowSuggestions
    });
  }, [showSuggestions, suggestions.length, inputFocused, suggestionSelected, shouldShowSuggestions]);
  
  return (
    <form onSubmit={(e) => {
      // First close the suggestions
      hideSuggestions();
      setSuggestionSelected(true);
      setInputFocused(false);
      // Then submit the form
      onSubmit(e);
    }}>
      <div className="flex flex-col w-full" style={{ position: 'relative' }}>
        {/* Combined search bar with integrated dropdown */}
        <div className={`${styles.searchBar} flex flex-wrap sm:flex-nowrap items-center bg-white border border-[#299af8] rounded-[4px] w-full p-2`} 
          style={{ fontSize: '16px' }}
        >
          {/* Dropdown section */}
          <div 
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className={`flex items-center justify-between cursor-pointer px-2 mb-2 sm:mb-0 sm:me-3 w-full sm:w-auto ${locale === 'ar' ? 'sm:border-l' : 'sm:border-r'} sm:border-gray-200 sm:pr-3 relative`}
            data-type-dropdown-toggle
          >
            <div className="flex items-center">
              {/* Display the icon based on selected option */}
              <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.87004 8.1525C6.79504 8.145 6.70504 8.145 6.62254 8.1525C4.83754 8.0925 3.42004 6.63 3.42004 4.83C3.42004 2.9925 4.90504 1.5 6.75004 1.5C8.58754 1.5 10.08 2.9925 10.08 4.83C10.0725 6.63 8.65504 8.0925 6.87004 8.1525Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.3075 3C13.7625 3 14.9325 4.1775 14.9325 5.625C14.9325 7.0425 13.8075 8.1975 12.405 8.25C12.345 8.2425 12.2775 8.2425 12.21 8.25" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.12004 10.92C1.30504 12.135 1.30504 14.115 3.12004 15.3225C5.18254 16.7025 8.56504 16.7025 10.6275 15.3225C12.4425 14.1075 12.4425 12.1275 10.6275 10.92C8.57254 9.5475 5.19004 9.5475 3.12004 10.92Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.755 15C14.295 14.8875 14.805 14.67 15.225 14.3475C16.395 13.47 16.395 12.0225 15.225 11.145C14.8125 10.83 14.31 10.62 13.7775 10.5" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-gray-900 font-medium text-sm">
                {searchType === 'knowledge' 
                  ? (locale === 'ar' ? 'معرفة' : 'Knowledge') 
                  : (locale === 'ar' ? 'إنسايتر' : 'Insighter')}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-500 ${locale === 'ar' ? 'mr-2' : 'ml-2'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={locale === 'ar' ? "M15 19l-7-7 7-7" : "M19 9l-7 7-7-7"}
                ></path>
              </svg>
            </div>
            
            {/* Type dropdown menu */}
            {showTypeDropdown && (
              <div 
                ref={typeDropdownRef}
                className={`absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 w-40 ${locale === 'ar' ? 'right-0' : 'left-0'}`}
              >
                <div 
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center ${searchType === 'knowledge' ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    setSearchType('knowledge');
                    setShowTypeDropdown(false);
                  }}
                >
                  <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                      <path d="M3 6l0 13" />
                      <path d="M12 6l0 13" />
                      <path d="M21 6l0 13" />
                    </svg>
                  </div>
                  <span className="text-gray-900 font-medium text-sm">
                    {locale === 'ar' ? 'معرفة' : 'Knowledge'}
                  </span>
                </div>
                <div 
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center ${searchType === 'insighter' ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    setSearchType('insighter');
                    setShowTypeDropdown(false);
                  }}
                >
                  <div className={`flex items-center justify-center w-6 h-6 bg-blue-50 rounded-md ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.87004 8.1525C6.79504 8.145 6.70504 8.145 6.62254 8.1525C4.83754 8.0925 3.42004 6.63 3.42004 4.83C3.42004 2.9925 4.90504 1.5 6.75004 1.5C8.58754 1.5 10.08 2.9925 10.08 4.83C10.0725 6.63 8.65504 8.0925 6.87004 8.1525Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.3075 3C13.7625 3 14.9325 4.1775 14.9325 5.625C14.9325 7.0425 13.8075 8.1975 12.405 8.25C12.345 8.2425 12.2775 8.2425 12.21 8.25" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.12004 10.92C1.30504 12.135 1.30504 14.115 3.12004 15.3225C5.18254 16.7025 8.56504 16.7025 10.6275 15.3225C12.4425 14.1075 12.4425 12.1275 10.6275 10.92C8.57254 9.5475 5.19004 9.5475 3.12004 10.92Z" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.755 15C14.295 14.8875 14.805 14.67 15.225 14.3475C16.395 13.47 16.395 12.0225 15.225 11.145C14.8125 10.83 14.31 10.62 13.7775 10.5" stroke="#2463EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-900 font-medium text-sm">
                    {locale === 'ar' ? 'إنسايتر' : 'Insighter'}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Search input */}
          <div className="flex flex-1 items-center w-full sm:w-auto">
            <input
              ref={searchInputRef}
              type="text"
              className="flex-1 outline-none bg-transparent border-none focus-outline-none focus:border-none focus:ring-0 w-full"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={() => {
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => {
                  if (!suggestionSelected && !mouseInSuggestions) {
                    setInputFocused(false);
                    hideSuggestions();
                  }
                }, 100);
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            />
            {/* Clear button - show when there's text in the input */}
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                className="mr-2 p-1 text-gray-400 hover:text-gray-600 flex items-center justify-center"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <IconX size={16} />
              </button>
            )}

            {isLoadingSuggestions && (
              <div className="flex items-center justify-center mr-2">
                <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            
            {/* Search button */}
            <button 
              type="button" /* Changed to button type to prevent form submission */
              className="ml-2 bg-[#299af8] text-white p-2 rounded-[4px] flex items-center justify-center"
              onClick={async (e) => {
                e.preventDefault();
                // Close suggestions
                hideSuggestions();
                setSuggestionSelected(true);
                setInputFocused(false);
                
                // Always execute search, even with empty query
                if (onSearch) {
                  onSearch(searchQuery.trim());
                } else {
                  // Fallback: trigger form submission
                  onSubmit(e as any);
                }
              }}
              aria-label="Search"
            >
              <IconSearch size={18} />
            </button>
          </div>
        </div>
        
        {/* Suggestions dropdown */}
        {shouldShowSuggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-40 overflow-y-auto custom-scrollbar"
            onMouseEnter={() => setMouseInSuggestions(true)}
            onMouseLeave={() => setMouseInSuggestions(false)}
          >
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${activeSuggestionIndex === index ? 'bg-blue-50' : ''}`}
                onClick={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setActiveSuggestionIndex(index)}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center">
                  <svg className={`w-5 h-5 text-gray-400 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-800">
                    {searchQuery && suggestion.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                      <>
                        {(() => {
                          const lowerSuggestion = suggestion.toLowerCase();
                          const lowerSearchTerm = searchQuery.toLowerCase();
                          const matchIndex = lowerSuggestion.indexOf(lowerSearchTerm);
                          
                          if (matchIndex >= 0) {
                            // Split into three parts: before match, match, after match
                            const beforeMatch = suggestion.substring(0, matchIndex);
                            const match = suggestion.substring(matchIndex, matchIndex + searchQuery.length);
                            const afterMatch = suggestion.substring(matchIndex + searchQuery.length);
                            
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
  );
};

export default SearchBar;
