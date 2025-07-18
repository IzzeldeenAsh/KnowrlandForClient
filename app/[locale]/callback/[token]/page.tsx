'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAccessToken, setAccessToken, removeAccessToken } from '../../../lib/auth/auth';

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

export default function TokenCallback() {
  const router = useRouter();
  const params = useParams();
  
  const token = params.token as string;
  const locale = params.locale as string || 'en';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token provided');
        }

        console.log('[token-callback] Processing authentication with token:', token.substring(0, 20) + '...');
        
        // Store token using centralized auth utility
        try {
          setAccessToken(token);
          console.log('[token-callback] Token stored using auth utility successfully');
        } catch (storageError) {
          console.error('[token-callback] Failed to store token:', storageError);
          throw storageError;
        }
        
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
        const storedToken = getAccessToken();
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
          window.location.href = 'https://app.knoldg.com/auth/login';
        }, 2000);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error('[token-callback] No token found in URL parameters');
      // Redirect to login if no token
      window.location.href = 'https://app.knoldg.com/auth/login';
    }
  }, [token, locale]);

  // Helper function to clear auth data
  const clearAuthData = () => {
    console.log('[token-callback] Clearing auth data using centralized utility');
    
    // Use centralized auth utility to clear tokens
    removeAccessToken();
    
    // Clear any additional legacy auth data
    localStorage.removeItem('foresighta-creds');
    
    // Clear any additional auth cookies that might exist
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    const removeCookie = (name: string) => {
      if (isLocalhost) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      } else {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Domain=.knoldg.com; Secure;`;
      }
    };
    
    removeCookie('auth_return_url');
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
    console.log('[token-callback] Handling redirect for user:', userData.email);
    console.log('[token-callback] User roles:', userData.roles);
    
    if (userData.roles && 
        (userData.roles.includes('insighter') || 
         userData.roles.includes('company') || 
         userData.roles.includes('company-insighter'))) {
      // Redirect to insighter dashboard
      console.log('[token-callback] Redirecting to Angular insighter dashboard');
      window.location.href = `https://app.knoldg.com/app/insighter-dashboard/my-dashboard`;
    } else {
      // Redirect to home page using current locale
      console.log('[token-callback] Redirecting to home page:', `/${locale}/home`);
      router.push(`/${locale}/home`);
    }
  };

  // Helper function to fetch profile with retry logic
  const fetchProfileWithRetry = async (authToken: string, maxRetries = 3): Promise<any> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[token-callback] Profile fetch attempt ${attempt}/${maxRetries}`);
        
        const response = await fetch('https://api.knoldg.com/api/account/profile', {
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
