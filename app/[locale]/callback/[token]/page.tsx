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
    // Helper function to set user's timezone in the API
    const setUserTimezone = async (authToken: string) => {
      try {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log('%c[TIMEZONE API REQUEST]', 'background: #6b8aff; color: white; font-size: 14px; padding: 5px;', 
          'Setting timezone:', userTimezone);
          
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
        
        // Log the complete response for debugging
        const responseStatus = timezoneResponse.status;
        let responseData = null;
        try {
          responseData = await timezoneResponse.clone().json();
        } catch (e) {
          responseData = 'Could not parse response as JSON';
        }
        
        if (!timezoneResponse.ok) {
          console.error('%c[TIMEZONE API ERROR]', 'background: #ff6b6b; color: white; font-size: 14px; padding: 5px;', 
            'Failed with status:', responseStatus, 
            'Response:', responseData);
        } else {
          console.log('%c[TIMEZONE API SUCCESS]', 'background: #6bff8a; color: black; font-size: 14px; padding: 5px;', 
            'Status:', responseStatus,
            'Response:', responseData);
        }
      } catch (timezoneError) {
        console.error('%c[TIMEZONE API EXCEPTION]', 'background: #ff6b6b; color: white; font-size: 14px; padding: 5px;', timezoneError);
        // Continue with the flow even if timezone setting fails
      }
    };
    
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token provided');
        }

        console.log('[token-callback] Storing token in localStorage and cookies');
        
        // Clear any existing tokens to avoid conflicts
        // This ensures we're starting with a clean state
        localStorage.removeItem('token');
        localStorage.removeItem('foresighta-creds');
        
        // Store token in Next.js format
        localStorage.setItem('token', token);
        
        // Also store in Angular app format
        const angularAuthData = {
          authToken: token,
          refreshToken: ''
        };
        localStorage.setItem('foresighta-creds', JSON.stringify(angularAuthData));
        
        // Set the token in a cookie to make it accessible for SSR functions
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // Create cookie settings array based on environment
        let cookieSettings;
        
        if (isLocalhost) {
          // For localhost: Use Lax SameSite without Secure flag
          cookieSettings = [
            `token=${token}`,
            `Path=/`,                 // send on all paths
            `Max-Age=${60 * 60 * 24}`, // expires in 24 hours
            `SameSite=Lax`            // default value, works on same site
          ];
        } else {
          // For production: Use None SameSite with Secure flag and domain
          cookieSettings = [
            `token=${token}`,
            `Path=/`,
            `Max-Age=${60 * 60 * 24}`,
            `SameSite=None`,          // works across domains
            `Domain=.knoldg.com`,     // leading dot = include subdomains
            `Secure`                  // HTTPS only
          ];
        }
        
        document.cookie = cookieSettings.join('; ');
        
        // Set user's timezone as soon as we have a token
        // This happens independent of profile fetch success
        await setUserTimezone(token);
        
        // Fetch profile
        const response = await fetch('https://api.knoldg.com/api/account/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: ProfileResponse = await response.json();
        
        // Store user data in localStorage only
        console.log('[token-callback] Storing user data in localStorage');
        localStorage.setItem('user', JSON.stringify({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        }));
        
        // Check for returnUrl parameter first
        const returnUrl = searchParams.get('returnUrl');
        
        // Function to get cookie value
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
        
        // Check for stored returnUrl in cookie as fallback (for social auth)
        const storedReturnUrl = getCookie('auth_return_url');
        const finalReturnUrl = returnUrl || storedReturnUrl;
        
        // Clean up the stored return URL cookie
        if (storedReturnUrl) {
          const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
          let cookieSettings;
          
          if (isLocalhost) {
            cookieSettings = [
              'auth_return_url=',
              'Path=/',
              'Max-Age=-1'  // expire immediately
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
        }
        
        if (finalReturnUrl && finalReturnUrl !== '/' && !finalReturnUrl.includes('/login') && !finalReturnUrl.includes('/auth/')) {
          console.log('[token-callback] Redirecting to returnUrl:', finalReturnUrl);
          
          // Check if this is an Angular route that should go to the Angular app
          if (finalReturnUrl.startsWith('/app/') || 
              finalReturnUrl.startsWith('/profile/') ||
              finalReturnUrl.startsWith('/insighter-dashboard/') ||
              finalReturnUrl.startsWith('/knowledge-detail/') ||
              finalReturnUrl.startsWith('/my-knowledge-base/') ||
              finalReturnUrl.startsWith('/add-knowledge/') ||
              finalReturnUrl.startsWith('/edit-knowledge/') ||
              finalReturnUrl.startsWith('/review-insighter-knowledge/')) {
            
            // Ensure Angular routes go to the Angular app
            console.log('[token-callback] Detected Angular route, redirecting to Angular app');
            
            // Make sure path has /app/ prefix if not already present
            const angularPath = finalReturnUrl.startsWith('/app/') 
              ? finalReturnUrl 
              : `/app${finalReturnUrl}`;
              
            window.location.href = `https://app.knoldg.com${angularPath}?nextjs_token=${encodeURIComponent(token)}`;
          } else {
            // Handle both relative and absolute URLs for Next.js app
            if (finalReturnUrl.startsWith('http')) {
              // For absolute URLs
              window.location.href = finalReturnUrl;
            } else {
              // For relative URLs within Next.js app
              window.location.href = finalReturnUrl;
            }
          }
        }
        // Only use role-based redirect if there's no valid returnUrl
        else if (data.data.roles && 
            (data.data.roles.includes('insighter') || 
             data.data.roles.includes('company') || 
             data.data.roles.includes('company-insighter'))) {
          // Redirect to insighter dashboard with token
          console.log('[token-callback] Redirecting to Angular app with token parameter');
          // Pass token in both formats for compatibility
          window.location.href = `https://app.knoldg.com/app/insighter-dashboard/my-dashboard?nextjs_token=${encodeURIComponent(token)}`;
        } else {
          // Redirect to home page using current locale
          router.push(`/${locale}/home`);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Redirect to app login page
        window.location.href = 'https://app.knoldg.com/auth/login';
      }
    };

    if (token) {
      // Always attempt to set timezone if we have a token, regardless of profile fetch outcome
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const setTimezoneDirectly = async () => {
        try {
          await setUserTimezone(token);
          console.log('[token-callback] Set timezone call completed');
        } catch (e) {
          console.error('[token-callback] Failed to set timezone directly:', e);
          // Continue with auth flow even if timezone setting fails
        }
      };
      
      // Start timezone API call immediately
      setTimezoneDirectly();
      
      // Continue with normal profile fetch
      fetchProfile();
    } else {
      console.error('No token found in URL parameters');
      window.location.href = 'https://app.knoldg.com/auth/login';
    }
  }, [token, router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
