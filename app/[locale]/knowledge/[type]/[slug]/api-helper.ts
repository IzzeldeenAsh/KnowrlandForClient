/**
 * API Helper functions for making consistent API calls
 */

// Base API URL
export const BASE_API_URL = 'https://api.knoldg.com/api';

type ApiOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string | null;
  locale?: string;
};

/**
 * Helper function to make API calls with proper error handling
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export async function callApi<T>(endpoint: string, options: ApiOptions): Promise<ApiResponse<T>> {
  const { method, body, headers = {}, token, locale } = options;
  
  // Build the complete URL
  const url = `${BASE_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Prepare headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...headers
  };
  
  // Add auth token if provided
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  // Add locale if provided
  if (locale) {
    requestHeaders['Accept-Language'] = locale;
  }
  
  // Debug info
  console.log(`[API] Calling ${method} ${url}`, {
    hasToken: !!token,
    hasBody: !!body,
    locale
  });
  
  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined
    });
    
    // Debug response info
    console.log(`[API] Response from ${url}:`, {
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get('content-type')
    });
    
    // Handle non-OK responses
    if (!response.ok) {
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // Parse JSON error
        const errorData = await response.json();
        throw new Error(errorData.message || `API error: ${response.status}`);
      } else {
        // Handle non-JSON error response
        const errorText = await response.text();
        console.error('Non-JSON error response:', errorText.substring(0, 500));
        throw new Error(`API error (${response.status}): The server returned an invalid response`);
      }
    }
    
    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      console.error('Unexpected non-JSON response:', responseText.substring(0, 500));
      throw new Error('Server returned an invalid response format');
    }
    
    // Parse JSON response
    return await response.json();
  } catch (error) {
    // Enhanced error logging
    console.error(`[API] Error calling ${url}:`, error);
    throw error;
  }
}
