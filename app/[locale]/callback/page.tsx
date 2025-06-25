'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { getApiUrl, getAppUrl } from '@/app/config';

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
  
  // First try to get token from query parameter
  let token = searchParams.get('token');
  
  // If no token parameter, check if the entire query string is a token (JWT format)
  if (!token) {
    const queryString = window.location.search.substring(1); // Remove the '?'
    // Check if the query string looks like a JWT token (starts with eyJ)
    if (queryString && queryString.startsWith('eyJ') && queryString.includes('.')) {
      token = queryString;
      console.log('[callback] Detected raw token in query string:', token.substring(0, 20) + '...');
    }
  }
  
  const returnUrl = searchParams.get('returnUrl');
  const locale = params.locale as string || 'en';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token provided');
        }

        // Store token in localStorage and cookies
        console.log('[callback] Storing token in localStorage and cookies');
        
        // Clear any existing tokens to avoid conflicts
        localStorage.removeItem('token');
        localStorage.removeItem('foresighta-creds');
        
        // Store token in Next.js format
        localStorage.setItem('token', token);
        
        // Also store in Angular app format for compatibility
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
        
        // Fetch profile
        const response = await fetch(getApiUrl('/api/account/profile'), {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: ProfileResponse = await response.json();
        
        // Store user data in localStorage only
        console.log('[callback] Storing user data in localStorage');
        localStorage.setItem('user', JSON.stringify({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        }));
        
        // ALWAYS check for a valid return URL first, regardless of user role
        if (returnUrl && returnUrl !== '/' && !returnUrl.includes('/login') && !returnUrl.includes('/auth/')) {
          console.log('[callback] Redirecting to returnUrl:', returnUrl);
          // Redirect to the previous page for all user types
          
          // Handle both relative and absolute URLs
          if (returnUrl.startsWith('http')) {
            // For absolute URLs (like coming from knoldg.com)
            window.location.href = returnUrl;
          } else {
            // For relative URLs within the app
            window.location.href = returnUrl;
          }
        } else {
          console.log('[callback] No valid returnUrl, using role-based redirect');
          // Only use role-based redirects if there's no valid returnUrl
          if (data.data.roles && 
              (data.data.roles.includes('insighter') || 
               data.data.roles.includes('company') || 
               data.data.roles.includes('company-insighter'))) {
            // Redirect to insighter dashboard
            window.location.href = getAppUrl('/app/insighter-dashboard/my-dashboard');
          } else {
            // Fall back to default home page using current locale
            router.push(`/${locale}/home`);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Redirect to app login page
        window.location.href = getAppUrl('/auth/login');
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error('No token found in URL parameters or query string');
      // Redirect to login if no token
      router.push(`/${locale}/login`);
    }
  }, [token, router, locale, returnUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
} 