// API-related utility functions for the home page
import { cookies } from "next/headers";
// Error response interface for the API
export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// Function to format error messages from 422 responses
export function formatErrorMessage(errorResponse: ErrorResponse): string {
  // Start with the main error message
  let formattedMessage = errorResponse.message || 'An error occurred';
  
  // Process field-specific errors if they exist
  if (errorResponse.errors) {
    // Collect all error messages
    const allErrors: string[] = [];
    
    // Process each field's error messages
    Object.entries(errorResponse.errors).forEach(([field, errors]) => {
      if (Array.isArray(errors)) {
        errors.forEach(error => allErrors.push(error));
      }
    });
    
    // If we have any errors, add them as a formatted list
    if (allErrors.length > 0) {
      const errorDetails = allErrors.map(err => `- ${err}`).join('\n');
      formattedMessage = `${formattedMessage}\n\nDetails:\n${errorDetails}`;
    }
  }
  
  return formattedMessage;
}

// API function for autocomplete
export async function fetchAutocomplete(
  keyword: string, 
  locale: string, 
  onError?: (error: string) => void
): Promise<string[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const headers: HeadersInit = {
    "Content-Type": "application/json", 
    "Accept": "application/json",
    "Accept-Language": locale,
    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } 

  if (!keyword.trim()) return [];
  
  try {
    const response = await fetch(`https://api.knoldg.com/api/platform/search/autocomplete?keyword=${encodeURIComponent(keyword)}`, {
     headers
    });
    
    // Handle 422 validation errors specifically
    if (response.status === 422) {
      const errorData: ErrorResponse = await response.json();
      if (onError) {
        onError(formatErrorMessage(errorData));
      }
      return [];
    }
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.data.searchKeywords || [];
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return [];
  }
}

// Function to fetch statistics per type
export async function fetchStatisticsPerType(
  searchQuery: string,
  locale: string,
  languageFilter: 'all' | 'arabic' | 'english',
  countryFilter: number | null,
  regionFilter: number | null = null,
  economicBlocFilter: number | null = null,
  isicCodeFilter: number | null = null,
  industryFilter: number | null = null,
  priceFilter: string | null = null,
  hsCodeFilter: number | null = null,
  accuracyFilter: 'any' | 'all' = 'any',
  roleFilter: 'all' | 'company' | 'individual' = 'all',
  onError?: (errorMessage: any) => void
) {
  try {
    const url = new URL('https://api.knoldg.com/api/platform/search/statistics-per-type');
    
    // Add base parameters
    url.searchParams.append('accuracy', accuracyFilter);
    url.searchParams.append('search_type', 'knowledge');
    url.searchParams.append('keyword', searchQuery.trim());
    
    // Add language parameter
    if (languageFilter && languageFilter !== 'all') {
      url.searchParams.append('language', languageFilter);
    }
    
    // Add country parameter
    if (countryFilter !== null) {
      url.searchParams.append('country', countryFilter.toString());
    }
    
    // Add region parameter
    if (regionFilter !== null) {
      url.searchParams.append('region', regionFilter.toString());
    }
    
    // Add economic bloc parameter
    if (economicBlocFilter !== null) {
      url.searchParams.append('economic_bloc', economicBlocFilter.toString());
    }
    
    // Add ISIC code parameter
    if (isicCodeFilter !== null) {
      url.searchParams.append('isic_code', isicCodeFilter.toString());
    }
    
    // Add HS code parameter
    if (hsCodeFilter !== null) {
      url.searchParams.append('hs_code', hsCodeFilter.toString());
    }
    
    // Add industry parameter
    if (industryFilter !== null) {
      url.searchParams.append('industry', industryFilter.toString());
    }
    
    // Add price parameter
    if (priceFilter !== null) {
      url.searchParams.append('paid', priceFilter);
    }
    
    // Add role parameter
    if (roleFilter !== null && roleFilter !== 'all') {
      url.searchParams.append('role', roleFilter);
    }
    
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json",
        "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      cache: 'no-store'
    });
    
    // Handle 422 validation errors specifically
    if (response.status === 422) {
      const errorData: ErrorResponse = await response.json();
      if (onError) {
        onError(formatErrorMessage(errorData));
      }
      return { data: [] };
    }
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Statistics API request failed:', error);
    if (onError) {
      onError('Failed to fetch statistics. Please try again later.');
    }
    return { data: [] };
  }
}

// Function to fetch search results
export async function fetchSearchResults(
  searchQuery: string,
  searchType: 'knowledge' | 'insighter',
  locale: string,
  currentPage: number,
  activeTab: string | null,
  languageFilter: 'all' | 'arabic' | 'english',
  countryFilter: number | null,
  regionFilter: number | null = null,
  economicBlocFilter: number | null = null,
  isicCodeFilter: number | null = null,
  categoryType: string | null = null,
  perPage: number | string = 30,
  onError?: (errorMessage: any) => void,
  industryFilter: number | null = null,
  priceFilter: string | null = null,
  hsCodeFilter: number | null = null,
  accuracyFilter: 'any' | 'all' = 'any',
  roleFilter: 'all' | 'company' | 'individual' = 'all'
) {
  try {
    // Always use the search API endpoint
    const url = new URL('https://api.knoldg.com/api/platform/search');
    // Use the accuracy parameter passed to the function
    url.searchParams.append('accuracy', accuracyFilter);
    // Backend now returns all data when keyword is empty
    url.searchParams.append('keyword', searchQuery.trim());
    
    // IMPORTANT: Always use the search_type parameter passed to the function
    // This ensures we use the exact search type that was requested
    url.searchParams.append('search_type', searchType);
    
    // IMPORTANT: Always use the directly passed page parameter instead of reading from URL
    // This prevents issues with URL state being out of sync with the requested page
    url.searchParams.append('page', currentPage.toString());
    // Add per_page parameter for pagination control
    const perPageValue = perPage ? perPage.toString() : '30'; // Default to 30 if not provided
    url.searchParams.append('per_page', perPageValue);
    
    // Log pagination parameters for debugging with a clear identifier
    const isPaginationRequest = currentPage > 1;
    console.log(`${isPaginationRequest ? 'PAGINATION REQUEST' : 'SEARCH REQUEST'}: page=${currentPage}, per_page=${perPageValue}`);
    
    // Add detailed logging of the exact URL that will be used
    console.log('FULL API URL BEING REQUESTED:', url.toString());

    
    // Add type parameter for category filtering (data, reports, insights, manuals, courses)
    if (categoryType && categoryType !== 'all') {
      url.searchParams.append('type', categoryType);
    }
    // Add tab filtering if needed and category is not specified
    else if (activeTab && activeTab !== 'all') {
      url.searchParams.append('type', activeTab);
    }
    
    // Add language parameter based on the language filter
    if (languageFilter && languageFilter !== 'all') {
      // Use the language value directly since it's already in the correct format
      url.searchParams.append('language', languageFilter);
    }
    
    // Remove price filtering logic as requested
    
    // Language parameter is already added above
    // No need for duplicate filters[language] parameter
    
    // Add direct country parameter for the API
    if (countryFilter !== null) {
      url.searchParams.append('country', countryFilter.toString());
    }
    
    // Add direct region parameter for the API
    if (regionFilter !== null) {
      url.searchParams.append('region', regionFilter.toString());
    }
    
    // Add direct economic bloc parameter for the API
    if (economicBlocFilter !== null) {
      url.searchParams.append('economic_bloc', economicBlocFilter.toString());
    }
    
    // Add ISIC code parameter for the API
    if (isicCodeFilter !== null) {
      url.searchParams.append('isic_code', isicCodeFilter.toString());
    }
    
    // Add HS code parameter for the API
    if (hsCodeFilter !== null) {
      url.searchParams.append('hs_code', hsCodeFilter.toString());
    }
    
    // Add industry parameter for the API
    if (industryFilter !== null) {
      url.searchParams.append('industry', industryFilter.toString());
    }
    
    // Add price parameter for price filtering
    if (priceFilter !== null) {
      url.searchParams.append('paid', priceFilter);
    }
    
    // Add role parameter for role filtering
    if (roleFilter !== null && roleFilter !== 'all') {
      url.searchParams.append('role', roleFilter);
    }
    
    // Keep the filters[country_id] for backward compatibility if needed
    // if (countryFilter !== null) {
    //   url.searchParams.append('filters[country_id]', countryFilter.toString());
    // }
    
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json",
        "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      cache: 'no-store'
    });
    
    // Handle 422 validation errors specifically
    if (response.status === 422) {
      const errorData: ErrorResponse = await response.json();
      if (onError) {
        onError(formatErrorMessage(errorData));
      }
      return { 
        data: [], 
        links: { first: null, last: null, prev: null, next: null },
        meta: { current_page: 1, from: 0, last_page: 1, per_page: perPage, to: 0, total: 0, links: [] }
      };
    }
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    if (onError) {
      onError('Failed to fetch search results. Please try again later.');
    }
    return { 
      data: [], 
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 0, last_page: 1, per_page: perPage, to: 0, total: 0, links: [] }
    };
  }
}
