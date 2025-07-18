/**
 * Authentication utilities using cookies for token management
 * Cookies are now the primary storage mechanism for authentication tokens
 * with localStorage as a fallback for backward compatibility
 */

/**
 * Helper function to get a cookie value by name
 * @param name - The name of the cookie
 * @returns The cookie value or null if not found
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

/**
 * Helper function to set a cookie with appropriate settings
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param options - Cookie options (maxAge, domain, etc.)
 */
function setCookie(name: string, value: string, options: {
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  path?: string;
} = {}): void {
  if (typeof document === 'undefined') return;
  
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  let cookieSettings = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${options.path || '/'}`
  ];
  
  if (options.maxAge !== undefined) {
    cookieSettings.push(`Max-Age=${options.maxAge}`);
  }
  
  if (isLocalhost) {
    // For localhost development - use permissive settings
    cookieSettings.push(`SameSite=${options.sameSite || 'Lax'}`);
  } else {
    // For production - use secure settings
    cookieSettings.push(`SameSite=${options.sameSite || 'None'}`);
    cookieSettings.push(`Domain=${options.domain || '.knoldg.com'}`);
    cookieSettings.push('Secure');
  }
  
  document.cookie = cookieSettings.join('; ');
}

/**
 * Helper function to remove a cookie
 * @param name - The name of the cookie to remove
 */
function removeCookie(name: string): void {
  if (typeof document === 'undefined') return;
  
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } else {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.knoldg.com; Secure; SameSite=None;`;
  }
}

/**
 * Gets the access token from cookies (primary) or localStorage (fallback)
 * @returns The access token or null if not found
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  // First try to get from cookies (primary storage)
  const cookieToken = getCookie('token');
  if (cookieToken) {
    return cookieToken;
  }
  
  // Fallback to localStorage for backward compatibility
  const localStorageToken = localStorage.getItem('token');
  if (localStorageToken) {
    // If we found token in localStorage, migrate it to cookies
    setAccessToken(localStorageToken);
    return localStorageToken;
  }
  
  return null;
}

/**
 * Sets the access token in cookies (primary) and localStorage (for backward compatibility)
 * @param token - The access token to store
 */
export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return;
  
  // Set in cookies (primary storage)
  setCookie('token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'Lax'
  });
  
  // Also set in localStorage for backward compatibility
  localStorage.setItem('token', token);
}

/**
 * Removes the access token from both cookies and localStorage
 */
export function removeAccessToken(): void {
  if (typeof window === 'undefined') return;
  
  // Remove from cookies (primary storage)
  removeCookie('token');
  
  // Remove from localStorage for backward compatibility
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/**
 * Checks if a user is authenticated based on token existence
 * @returns Boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!getAccessToken();
}
