'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

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
  
  // Get token from query parameters or cookies
  let token = searchParams.get('token');
  
  // If no token parameter, check if the entire query string is a token (JWT format)
  if (!token) {
    const queryString = window.location.search.substring(1);
    if (queryString && queryString.startsWith('eyJ') && queryString.includes('.')) {
      token = queryString;
      console.log('[callback] Detected raw token in query string:', token.substring(0, 20) + '...');
    }
  }
  
  const returnUrl = searchParams.get('returnUrl');
  const locale = params.locale as string || 'en';

  // Helper function to get token from cookie
  const getTokenFromCookie = (): string | null => {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };

  // If still no token, try to get it from cookie
  if (!token) {
    token = getTokenFromCookie();
    if (token) {
      console.log('[callback] Found token in cookie:', token.substring(0, 20) + '...');
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token provided');
        }

        console.log('[callback] Processing authentication with token:', token.substring(0, 20) + '...');
        console.log('[callback] Return URL:', returnUrl);
        
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
        
        // Store user data in localStorage
        console.log('[callback] Storing user data in localStorage');
        const userData = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          profile_photo_url: response.data.profile_photo_url,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Verify authentication was successful
        const storedToken = getTokenFromCookie() || localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (!storedToken || !storedUser) {
          throw new Error('Failed to verify stored authentication data');
        }
        
        console.log('[callback] Authentication verification successful');
        
        // Add small delay to ensure all storage operations complete
        setTimeout(() => {
          handleRedirect(response.data);
        }, 200);
        
      } catch (error) {
        console.error('[callback] Error in authentication flow:', error);
        
        // Clear any partially set auth data
        clearAuthData();
        
        // Show error for a moment before redirecting to login
        setTimeout(() => {
          console.log('[callback] Redirecting to login due to error');
          window.location.href = 'https://app.knoldg.com/auth/login';
        }, 2000);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error('[callback] No token found in URL parameters or cookies');
      // Redirect to login if no token
      window.location.href = 'https://app.knoldg.com/auth/login';
    }
  }, [token, locale, returnUrl]);

  // Helper function to set token in cookie with improved localhost settings
  const setTokenCookie = (token: string) => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
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
      cookieSettings = [
        `token=${token}`,
        `Path=/`,
        `Max-Age=${60 * 60 * 24 * 7}`, // 7 days
        `SameSite=None`,
        `Domain=.knoldg.com`,
        `Secure`
      ];
    }
    
    const cookieString = cookieSettings.join('; ');
    console.log('[callback] Setting cookie:', cookieString);
    document.cookie = cookieString;
    
    // Verify the cookie was set
    setTimeout(() => {
      const verification = getTokenFromCookie();
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
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    let cookieSettings;
    
    if (isLocalhost) {
      cookieSettings = [
        'token=',
        'Path=/',
        'Max-Age=-1'
      ];
    } else {
      cookieSettings = [
        'token=',
        'Path=/',
        'Max-Age=-1',
        'SameSite=None',
        'Domain=.knoldg.com',
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
      
      const timezoneResponse = await fetch('https://api.knoldg.com/api/account/timezone/set', {
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
    
    // Check for stored returnUrl in cookie as fallback (for social auth)
    const storedReturnUrl = getCookie('auth_return_url');
    console.log('[callback] Stored return URL from cookie:', storedReturnUrl);
    
    const finalReturnUrl = returnUrl || storedReturnUrl;
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
        const redirectUrl = `https://app.knoldg.com${angularPath}`;
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
      window.location.href = `https://app.knoldg.com/app/insighter-dashboard/my-dashboard`;
    } else {
      // Redirect to home page using current locale
      console.log('[callback] Redirecting to home page:', `/${locale}/home`);
      router.push(`/${locale}/home`);
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
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    let cookieSettings;
    if (isLocalhost) {
      cookieSettings = [
        'auth_return_url=',
        'Path=/',
        'Max-Age=-1'
      ];
    } else {
      cookieSettings = [
        'auth_return_url=',
        'Path=/',
        'Max-Age=-1',
        'SameSite=None',
        'Domain=.knoldg.com',
        'Secure'
      ];
    }
    
    document.cookie = cookieSettings.join('; ');
  };

  // Helper function to fetch profile with retry logic
  const fetchProfileWithRetry = async (authToken: string, maxRetries = 3): Promise<any> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[callback] Profile fetch attempt ${attempt}/${maxRetries}`);
        
        const response = await fetch('https://api.knoldg.com/api/account/profile', {
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
} 