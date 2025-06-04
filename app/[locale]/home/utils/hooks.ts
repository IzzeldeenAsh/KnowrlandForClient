import { useState, useEffect, useRef } from 'react';
import { fetchAutocomplete } from './api';
import { useToast } from '@/components/toast/ToastContext';

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
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

// Custom hook for handling search suggestions
export function useSuggestions(searchQuery: string, locale: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  
  const toast = useToast();
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  
  useEffect(() => {
    const getSuggestions = async () => {
      // Only trigger autocomplete if the search term is at least 2 characters
      if (debouncedSearchTerm && debouncedSearchTerm.trim().length >= 2) {
        setIsLoadingSuggestions(true);
        
        // Handle errors using the toast context
        const handleError = (errorMessage: string) => {
          toast.error(errorMessage, 'Validation Error');
        };
        
        // Use try/catch to handle potential network issues
        try {
          const suggestionResults = await fetchAutocomplete(debouncedSearchTerm, locale, handleError);
          setSuggestions(suggestionResults);
          // Always try to show suggestions if we have results
          if (suggestionResults.length > 0) {
            setShowSuggestions(true);
          } else {
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsLoadingSuggestions(false);
      }
    };

    getSuggestions();
  }, [debouncedSearchTerm, locale, toast]);
  
  const resetSuggestions = () => {
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };
  
  return {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isLoadingSuggestions,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    resetSuggestions
  };
}

// Custom hook for handling clickaway behavior
export function useClickAway(onClickAway: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickAway]);
  
  return ref;
}
