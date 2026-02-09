'use client';

import { User } from '@/components/ui/header/hooks/useUserProfile';

/**
 * Check if user needs to update their country
 */
export function needsCountryUpdate(user: User | null): boolean {
  if (!user) return false;

  // If user doesn't have country_id, they need to update
  return !user.country_id;
}

/**
 * Store the current URL as return URL for after country update
 */
export function storeReturnUrl(url: string) {
  localStorage.setItem('countryUpdateReturnUrl', url);

  // Also store in cookie for cross-domain compatibility
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  let cookieSettings;
  if (isLocalhost) {
    cookieSettings = [
      `countryUpdateReturnUrl=${encodeURIComponent(url)}`,
      `Path=/`,
      `Max-Age=${60 * 60}`, // 1 hour
      `SameSite=Lax`
    ];
  } else {
    cookieSettings = [
      `countryUpdateReturnUrl=${encodeURIComponent(url)}`,
      `Path=/`,
      `Max-Age=${60 * 60}`, // 1 hour
      `SameSite=None`,
      `Domain=.insightabusiness.com`,
      `Secure`
    ];
  }

  document.cookie = cookieSettings.join('; ');
}

/**
 * Get the return URL from storage
 */
export function getReturnUrl(): string | null {
  // Check localStorage first
  const localStorageUrl = localStorage.getItem('countryUpdateReturnUrl');
  if (localStorageUrl) return localStorageUrl;

  // Check cookie as fallback
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'countryUpdateReturnUrl') {
      return decodeURIComponent(value);
    }
  }

  return null;
}

/**
 * Clear the stored return URL
 */
export function clearReturnUrl() {
  localStorage.removeItem('countryUpdateReturnUrl');

  // Clear cookie
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  let cookieSettings;
  if (isLocalhost) {
    cookieSettings = [
      'countryUpdateReturnUrl=',
      'Path=/',
      'Max-Age=-1'
    ];
  } else {
    cookieSettings = [
      'countryUpdateReturnUrl=',
      'Path=/',
      'Max-Age=-1',
      'SameSite=None',
      'Domain=.insightabusiness.com',
      'Secure'
    ];
  }

  document.cookie = cookieSettings.join('; ');
}

/**
 * Check if current route should be protected by country requirement
 */
export function shouldRequireCountry(pathname: string): boolean {
  // Skip country check for these routes
  const skipRoutes = [
    '/update-country',
    '/callback',
    '/signin',
    '/signup',
    '/auth',
    '/reset-password',
    '/_next',
    '/api'
  ];

  // Always require country for these specific routes
  const requireCountryRoutes = [
    '/checkout',
    '/profile/'
  ];

  // Check if this is a required route
  const isRequiredRoute = requireCountryRoutes.some(route => pathname.includes(route));

  // If it's a required route, always return true (require country)
  if (isRequiredRoute) {
    return true;
  }

  // For other routes, follow the normal skip logic
  return !skipRoutes.some(route => pathname.includes(route));
}

/**
 * Redirect to country update page
 */
export function redirectToCountryUpdate(locale: string, currentUrl?: string) {
  let redirectUrl = `/${locale}/update-country`;

  if (currentUrl && shouldRequireCountry(currentUrl)) {
    storeReturnUrl(currentUrl);
    // Also add as URL parameter for immediate access
    redirectUrl += `?redirect=${encodeURIComponent(currentUrl)}`;
  }

  window.location.href = redirectUrl;
}