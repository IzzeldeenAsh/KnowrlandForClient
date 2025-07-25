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

export default function AuthCallback() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Get token from either path parameter or query parameter
  const pathToken = params.token as string;
  const queryToken = searchParams.get('token');
  let token = pathToken || queryToken;
  
  // Additional safety check: if no token found, check if query string is a raw token
  if (!token && typeof window !== 'undefined') {
    const queryString = window.location.search.substring(1);
    if (queryString && queryString.startsWith('eyJ') && queryString.includes('.')) {
      token = queryString;
      console.log('[token-callback] Detected raw token in query string as fallback');
    }
  }
  
  const locale = (params.locale as string) || 'en';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token provided');
        }

        console.log('[token-callback] Processing authentication token:', token.substring(0, 20) + '...');
        
        // Store token in cookie (primary storage) with better error handling
        try {
          setTokenCookie(token);
          console.log('[token-callback] Token stored in cookie successfully');
        } catch (cookieError) {
          console.error('[token-callback] Failed to set token cookie:', cookieError);
          // Continue anyway, as we can still use localStorage
        }
        
        // Store token in localStorage for backward compatibility
        localStorage.setItem('token', token);
        console.log('[token-callback] Token stored in localStorage');
        
        // Set user's timezone (don't let this block the main flow)
        setUserTimezone(token).catch(error => {
          console.error('[token-callback] Failed to set timezone, continuing anyway:', error);
        });
        
        // Fetch profile with retry logic
        console.log('[token-callback] Fetching user profile...');
        const response = await fetchProfileWithRetry(token);
        
        console.log('[token-callback] Profile fetched successfully:', response.data.email, 'Roles:', response.data.roles);
        
        // Store user data in localStorage
        console.log('[token-callback] Storing user data in localStorage');
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
        
        console.log('[token-callback] Authentication verification successful');
        
        // Add small delay to ensure all storage operations complete
        setTimeout(() => {
          handleRedirect(response.data);
        }, 200);
        
      } catch (error) {
        console.error('[token-callback] Error in authentication flow:', error);
        
        // Clear any partially set auth data
        clearAuthData();
        
        // Show error for a moment before redirecting to login
        setTimeout(() => {
          console.log('[token-callback] Redirecting to login due to error');
          window.location.href = 'https://app.foresighta.co/auth/login';
        }, 2000);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error('No token found in URL parameters');
      window.location.href = 'https://app.foresighta.co/auth/login';
    }
  }, [token, locale]);

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
        `Domain=.foresighta.co`,
        `Secure`
      ];
    }
    
    const cookieString = cookieSettings.join('; ');
    console.log('[token-callback] Setting cookie:', cookieString);
    document.cookie = cookieString;
    
    // Verify the cookie was set
    setTimeout(() => {
      const verification = getTokenFromCookie();
      console.log('[token-callback] Cookie set verification:', verification ? 'Success' : 'Failed');
    }, 100);
  };

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
        'Domain=.foresighta.co',
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
      
      const timezoneResponse = await fetch('https://api.foresighta.co/api/account/timezone/set', {
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

  // Helper function to fetch profile with retry logic
  const fetchProfileWithRetry = async (authToken: string, maxRetries = 3): Promise<any> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[token-callback] Profile fetch attempt ${attempt}/${maxRetries}`);
        
        const response = await fetch('https://api.foresighta.co/api/account/profile', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });

        console.log(`[token-callback] Profile fetch response (attempt ${attempt}):`, {
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
            console.log(`[token-callback] Request failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error(`[token-callback] Attempt ${attempt} failed:`, error);
        
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

  // Helper function to handle redirects
  const handleRedirect = (userData: any) => {
    // Check for returnUrl parameter first
    const returnUrl = searchParams.get('returnUrl');
    
    // Check for stored returnUrl in cookie as fallback (for social auth)
    const storedReturnUrl = getCookie('auth_return_url');
    const finalReturnUrl = returnUrl || storedReturnUrl;
    
    // Clean up the stored return URL cookie
    if (storedReturnUrl) {
      clearReturnUrlCookie();
    }
    
    if (finalReturnUrl && finalReturnUrl !== '/' && !finalReturnUrl.includes('/login') && !finalReturnUrl.includes('/auth/')) {
      console.log('[token-callback] Redirecting to returnUrl:', finalReturnUrl);
      
      // Check if this is an Angular route that should go to the Angular app
      if (isAngularRoute(finalReturnUrl)) {
        console.log('[token-callback] Detected Angular route, redirecting to Angular app');
        const angularPath = finalReturnUrl.startsWith('/app/') ? finalReturnUrl : `/app${finalReturnUrl}`;
        window.location.href = `https://app.foresighta.co${angularPath}`;
      } else {
        // Handle Next.js routes
        console.log('[token-callback] Detected Next.js route, redirecting within app');
        if (finalReturnUrl.startsWith('http')) {
          console.log('[token-callback] External URL redirect:', finalReturnUrl);
          window.location.href = finalReturnUrl;
        } else {
          console.log('[token-callback] Internal route redirect:', finalReturnUrl);
          // Use router.push for internal Next.js routes to maintain auth state
          router.push(finalReturnUrl);
        }
      }
    } else if (userData.roles && 
        (userData.roles.includes('insighter') || 
         userData.roles.includes('company') || 
         userData.roles.includes('company-insighter'))) {
      // Redirect to insighter dashboard
      console.log('[token-callback] Redirecting to Angular insighter dashboard');
      window.location.href = `https://app.foresighta.co/app/insighter-dashboard/my-dashboard`;
    } else {
      // Redirect to home page using current locale
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
        'Domain=.foresighta.co',
        'Secure'
      ];
    }
    
    document.cookie = cookieSettings.join('; ');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
