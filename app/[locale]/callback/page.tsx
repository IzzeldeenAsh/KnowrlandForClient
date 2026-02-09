'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import FullScreenLoader from '@/components/ui/FullScreenLoader';
import { useLocale } from 'next-intl';
import AgreementModal from '@/components/agreements/AgreementModal';
import { getAuthToken, getTokenFromCookie } from '@/lib/authToken';
interface ProfileResponse {
  data: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
    profile_photo_url: string | null;
    country_id: number | null;
    country: string | null;
    status: string;
    verified: boolean;
  };
}

export default function QueryParamAuthCallback() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { refreshProfile } = useGlobalProfile();
  const currentLocale = useLocale();
  const [showAgreement, setShowAgreement] = useState(false);
  const [postAcceptUser, setPostAcceptUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  // Get token from query parameters or cookies
  let token = searchParams.get('token');
  
  // If no token parameter, check if the entire query string is a token (JWT format)
  if (!token && typeof window !== 'undefined') {
    const queryString = window.location.search.substring(1);
    if (queryString && queryString.startsWith('eyJ') && queryString.includes('.')) {
      token = queryString;
      console.log('[callback] Detected raw token in query string:', token.substring(0, 20) + '...');
    }
  }
  
  const returnUrl = searchParams.get('returnUrl');
  const locale = params.locale as string || 'en';

  // If still no token, try to get it from cookie
  if (!token) {
    token = getTokenFromCookie('token');
    if (token) {
      console.log('[callback] Found token in cookie:', token.substring(0, 20) + '...');
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (!token) {
          throw new Error('No token provided');
        }

        
        // Store token in cookie (primary storage) with error handling
        try {
          setTokenCookie(token);
          console.log('[callback] Token stored in cookie successfully');
        } catch (cookieError) {
          console.error('[callback] Failed to set token cookie:', cookieError);
          // Continue anyway, as we can still use localStorage
        }
        
        // Store token in localStorage for backward compatibility
        localStorage.setItem('token', token);
        console.log('[callback] Token stored in localStorage');
        
        // Set user's timezone (don't let this block the main flow)
        setUserTimezone(token).catch(error => {
          console.error('[callback] Failed to set timezone, continuing anyway:', error);
        });
        
        // Fetch profile with retry logic
        console.log('[callback] Fetching user profile...');
        const response = await fetchProfileWithRetry(token);
        
        console.log('[callback] Profile fetched successfully:', response.data.email, 'Roles:', response.data.roles);
        
        // Store user data in localStorage (including country_id for redirect logic)
        console.log('[callback] Storing user data in localStorage');
        const userData = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          profile_photo_url: response.data.profile_photo_url,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          country_id: response.data.country_id, // Include country_id for redirect logic
          roles: response.data.roles, // Include roles for redirect logic
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Verify authentication was successful
        const storedToken = getAuthToken();
        const storedUser = localStorage.getItem('user');
        
        if (!storedToken || !storedUser) {
          throw new Error('Failed to verify stored authentication data');
        }
        
        console.log('[callback] Authentication verification successful');
        
        // Refresh the global profile state
        await refreshProfile();
        // Agreement check for insighter/company roles only
        if (response.data.roles && (response.data.roles.includes('insighter') || response.data.roles.includes('company') || response.data.roles.includes('company-insighter'))) {
          const accepted = await checkLatestAgreement(token, locale);
          if (!accepted) {
            setPostAcceptUser(response.data);
            setShowAgreement(true);
            setLoading(false); // stop loader while user reads/accepts
            return;
          }
        }
        setTimeout(() => handleRedirect(response.data), 200);
        
      } catch (error) {
        console.error('[callback] Error in authentication flow:', error);
        
        // Clear any partially set auth data
        clearAuthData();
        
        // Show error for a moment before redirecting to login
        setTimeout(() => {
          console.log('[callback] Redirecting to login due to error');
          window.location.href = 'https://app.insightabusiness.com/auth/login';
        }, 2000);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error('[callback] No token found in URL parameters or cookies');
      // Redirect to login if no token
      window.location.href = 'https://app.insightabusiness.com/auth/login';
    }
  }, [token, locale, returnUrl]);

  // Helper function to set token in cookie with improved localhost settings
  const setTokenCookie = (token: string) => {
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.startsWith('localhost:') ||
                       window.location.hostname.startsWith('127.0.0.1:');
    
    let cookieSettings;
    if (isLocalhost) {
      // For localhost development - use permissive settings
      cookieSettings = [
        `token=${token}`,
        `Path=/`,
        `Max-Age=${60 * 60 * 24 * 7}`, // 7 days
        `SameSite=Lax` // More permissive for localhost
      ];
    } else {
      // Use .insightabusiness.com domain for cross-domain cookie sharing between app.insightabusiness.com and www.insightabusiness.com
      cookieSettings = [
        `token=${token}`,
        `Path=/`,
        `Max-Age=${60 * 60 * 24 * 7}`, // 7 days
        `SameSite=None`,
        `Domain=.insightabusiness.com`,
        `Secure`
      ];
    }
    
    const cookieString = cookieSettings.join('; ');
    console.log('[callback] Setting cookie:', cookieString);
    document.cookie = cookieString;
    
    // Verify the cookie was set
    setTimeout(() => {
      const verification = getTokenFromCookie('token');
      console.log('[callback] Cookie set verification:', verification ? 'Success' : 'Failed');
    }, 100);
  };

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  // Helper function to clear auth data
  const clearAuthData = () => {
    console.log('[callback] Clearing auth data');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('foresighta-creds');
    
    // Clear token cookie
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.startsWith('localhost:') ||
                       window.location.hostname.startsWith('127.0.0.1:');
    let cookieSettings;
    
    if (isLocalhost) {
      cookieSettings = [
        'token=',
        'Path=/',
        'Max-Age=-1'
      ];
    } else {
      // Use .insightabusiness.com domain to match the cookie set by Angular app
      cookieSettings = [
        'token=',
        'Path=/',
        'Max-Age=-1',
        'SameSite=None',
        'Domain=.insightabusiness.com',
        'Secure'
      ];
    }
    
    document.cookie = cookieSettings.join('; ');
  };

  // Helper function to set user's timezone
  const setUserTimezone = async (authToken: string) => {
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log('[TIMEZONE] Setting timezone:', userTimezone);
      
      const timezoneResponse = await fetch('https://api.insightabusiness.com/api/account/timezone/set', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': locale,
        },
        body: JSON.stringify({
          timezone: userTimezone
        })
      });
      
      if (!timezoneResponse.ok) {
        console.error('[TIMEZONE] Failed to set timezone:', timezoneResponse.status);
      } else {
        console.log('[TIMEZONE] Successfully set timezone');
      }
    } catch (timezoneError) {
      console.error('[TIMEZONE] Error setting timezone:', timezoneError);
      // Continue with the flow even if timezone setting fails
    }
  };

  // Helper function to handle redirects
  const handleRedirect = (userData: any) => {
    console.log('[callback] Handling redirect for user:', userData.email);
    console.log('[callback] User roles:', userData.roles);
    console.log('[callback] Return URL from params:', returnUrl);
    const preferredLanguage = getCookie('preferred_language') || locale;
    const normalizeNextUrlToLocale = (url: string | null, targetLocale: string): string | null => {
      if (!url) return url;
      try {
        const u = new URL(url, window.location.origin);
        // Consider localhost:3000 and production Next.js host as internal
        const isNextHost = (u.hostname === 'localhost' && u.port === '3000') || (!u.hostname.includes('localhost') && !u.hostname.startsWith('app.'));
        if (isNextHost) {
          const withoutLocale = u.pathname.replace(/^\/(en|ar)(\/|$)/, '/');
          u.pathname = `/${targetLocale}${withoutLocale === '/' ? '' : withoutLocale}`;
          return u.toString();
        }
        return url;
      } catch {
        if (url.startsWith('/')) {
          const withoutLocale = url.replace(/^\/(en|ar)(\/|$)/, '/');
          return `/${targetLocale}${withoutLocale === '/' ? '' : withoutLocale}`;
        }
        return url;
      }
    };

    // Check if user has admin role
    if (userData.roles && userData.roles.includes('admin')) {
      console.log('[callback] Admin user detected, redirecting to admin dashboard');
      window.location.href = 'https://app.insightabusiness.com/admin-dashboard/admin/dashboard/main-dashboard/requests';
      return;
    }

    // Check if user needs to update country
    if (!userData.country_id) {
      console.log('[callback] User missing country, redirecting to country update');

      // Store the intended destination for after country update
      const storedReturnUrl = getCookie('auth_return_url');
      const finalReturnUrl = returnUrl || storedReturnUrl;

      let redirectUrl: string;
      if (finalReturnUrl && finalReturnUrl !== '/' && !finalReturnUrl.includes('/login') && !finalReturnUrl.includes('/auth/')) {
        // Store the return URL for after country update
        redirectUrl = finalReturnUrl;
        storeCountryUpdateReturnUrl(finalReturnUrl);
      } else if (userData.roles &&
          (userData.roles.includes('insighter') ||
           userData.roles.includes('company') ||
           userData.roles.includes('company-insighter'))) {
        // Store Angular dashboard as return URL
        redirectUrl = '/app/insighter-dashboard/my-dashboard';
        storeCountryUpdateReturnUrl(redirectUrl);
      } else {
        // Store home page as return URL
        redirectUrl = `/${preferredLanguage}/home`;
        storeCountryUpdateReturnUrl(redirectUrl);
      }

      // Clean up auth return URL cookie
      if (getCookie('auth_return_url')) {
        clearReturnUrlCookie();
      }

      // Redirect to country update page with redirect parameter
      window.location.href = `/${preferredLanguage}/update-country?redirect=${encodeURIComponent(redirectUrl)}`;
      return;
    }

    // Check for stored returnUrl in cookie as fallback (for social auth)
    const storedReturnUrl = getCookie('auth_return_url');
    console.log('[callback] Stored return URL from cookie:', storedReturnUrl);

    const finalReturnUrlRaw = returnUrl || storedReturnUrl;
    const finalReturnUrl = normalizeNextUrlToLocale(finalReturnUrlRaw, preferredLanguage || 'en');
    console.log('[callback] Final return URL:', finalReturnUrl);

    // Clean up the stored return URL cookie
    if (storedReturnUrl) {
      clearReturnUrlCookie();
    }

    if (finalReturnUrl && finalReturnUrl !== '/' && !finalReturnUrl.includes('/login') && !finalReturnUrl.includes('/auth/')) {
      console.log('[callback] Redirecting to returnUrl:', finalReturnUrl);

      // Check if this is an Angular route that should go to the Angular app
      if (isAngularRoute(finalReturnUrl)) {
        console.log('[callback] Detected Angular route, redirecting to Angular app');
        const angularPath = finalReturnUrl.startsWith('/app/') ? finalReturnUrl : `/app${finalReturnUrl}`;
        const redirectUrl = `https://app.insightabusiness.com${angularPath}`;
        console.log('[callback] Final Angular redirect URL:', redirectUrl);
        window.location.href = redirectUrl;
      } else {
        // Handle Next.js routes
        console.log('[callback] Detected Next.js route, redirecting within app');
        if (finalReturnUrl.startsWith('http')) {
          console.log('[callback] External URL redirect:', finalReturnUrl);
          window.location.href = finalReturnUrl;
        } else {
          console.log('[callback] Internal route redirect:', finalReturnUrl);
          // Use router.push for internal Next.js routes to maintain auth state
          router.push(finalReturnUrl);
        }
      }
    } else if (userData.roles &&
        (userData.roles.includes('insighter') ||
         userData.roles.includes('company') ||
         userData.roles.includes('company-insighter'))) {
      // Redirect to insighter dashboard
      console.log('[callback] Redirecting to Angular insighter dashboard');
      window.location.href = `https://app.insightabusiness.com/app/insighter-dashboard/my-dashboard`;
    } else {
      // Redirect to home page using current locale
      console.log('[callback] Redirecting to home page:', `/${preferredLanguage}/home`);
      router.push(`/${preferredLanguage}/home`);
    }
  };

  // Helper function to check if route is Angular route
  const isAngularRoute = (url: string): boolean => {
    const angularRoutes = [
      '/app/',
      '/profile/',
      '/insighter-dashboard/',
      '/knowledge-detail/',
      '/my-knowledge-base/',
      '/add-knowledge/',
      '/edit-knowledge/',
      '/review-insighter-knowledge/'
    ];
    
    return angularRoutes.some(route => url.startsWith(route));
  };

  // Helper function to clear return URL cookie
  const clearReturnUrlCookie = () => {
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.startsWith('localhost:') ||
                       window.location.hostname.startsWith('127.0.0.1:');

    let cookieSettings;
    if (isLocalhost) {
      cookieSettings = [
        'auth_return_url=',
        'Path=/',
        'Max-Age=-1'
      ];
    } else {
      // Use .insightabusiness.com domain to match the cookie set by Angular app
      cookieSettings = [
        'auth_return_url=',
        'Path=/',
        'Max-Age=-1',
        'SameSite=None',
        'Domain=.insightabusiness.com',
        'Secure'
      ];
    }

    document.cookie = cookieSettings.join('; ');
  };

  // Helper function to store country update return URL
  const storeCountryUpdateReturnUrl = (url: string) => {
    localStorage.setItem('countryUpdateReturnUrl', url);

    // Also store in cookie for cross-domain compatibility
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.startsWith('localhost:') ||
                       window.location.hostname.startsWith('127.0.0.1:');

    let cookieSettings;
    if (isLocalhost) {
      cookieSettings = [
        `countryUpdateReturnUrl=${encodeURIComponent(url)}`,
        `Path=/`,
        `Max-Age=${60 * 60}`, // 1 hour
        `SameSite=Lax`
      ];
    } else {
      // Use .insightabusiness.com domain to match the cookie set by Angular app
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
  };

  // Helper function to fetch profile with retry logic
  const fetchProfileWithRetry = async (authToken: string, maxRetries = 3): Promise<any> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[callback] Profile fetch attempt ${attempt}/${maxRetries}`);
        
        const response = await fetch('https://api.insightabusiness.com/api/account/profile', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });

        console.log(`[callback] Profile fetch response (attempt ${attempt}):`, {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        });

        if (!response.ok) {
          // For auth errors, don't retry
          if (response.status === 401 || response.status === 403) {
            throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
          }
          
          // For other errors, retry if not the last attempt
          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt - 1) * 1000; // Exponential backoff
            console.log(`[callback] Request failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error(`[callback] Attempt ${attempt} failed:`, error);
        
        // If it's an auth error or the last attempt, re-throw
        if ((error instanceof Error && error.message.includes('Authentication failed')) || attempt === maxRetries) {
          throw error;
        }
        
        // Otherwise, continue to next attempt
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Failed to fetch profile after all retry attempts');
  };

  const checkLatestAgreement = async (authToken: string, lang: string): Promise<boolean> => {
    try {
      const res = await fetch('https://api.insightabusiness.com/api/account/agreement/check', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
          'Accept-Language': lang,
        }
      });
      if (!res.ok) return true;
      const data = await res.json();
      return !!data?.data?.accept;
    } catch {
      return true;
    }
  };

  return (
    <>
      {loading && (
        <FullScreenLoader message={currentLocale === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing you in...'} />
      )}
      <AgreementModal
        opened={showAgreement}
        onClose={() => {
          // proceed even if user cancels/closes
          setLoading(true);
          if (postAcceptUser) handleRedirect(postAcceptUser);
        }}
        onAccepted={() => {
          setLoading(true);
          if (postAcceptUser) handleRedirect(postAcceptUser);
        }}
        locale={locale}
      />
    </>
  );
} 