'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export interface User {
  name: string;
  profile_photo_url: string | null;
  first_name: string;
  last_name: string;
  email: string;
  company?: {
    logo: string;
    legal_name?: string;
  };
}

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const locale = useLocale();

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

  // Helper function to get token from any available source
  const getAuthToken = (): string | null => {
    // First try cookie (primary storage)
    const cookieToken = getTokenFromCookie();
    if (cookieToken) {
      console.log("[useUserProfile] Found token in cookie");
      return cookieToken;
    }

    // Fallback to localStorage for backward compatibility
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      console.log("[useUserProfile] Found token in localStorage");
      return localStorageToken;
    }

    return null;
  };

  // Helper function to retry profile fetch with backoff
  const fetchProfileWithRetry = async (token: string, maxRetries = 3): Promise<any> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[useUserProfile] Attempt ${attempt}/${maxRetries} to fetch profile`);
        
        const response = await fetch(
          "https://api.knoldg.com/api/account/profile",
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": locale,
              "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          }
        );

        console.log("[useUserProfile] Profile fetch response", { 
          attempt,
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        });

        if (!response.ok) {
          // For auth errors, don't retry
          if (response.status === 401 || response.status === 403) {
            throw new Error(`Auth failed: ${response.status} ${response.statusText}`);
          }
          
          // For other errors, retry if not the last attempt
          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt - 1) * 1000; // Exponential backoff
            console.log(`[useUserProfile] Request failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error(`[useUserProfile] Attempt ${attempt} failed:`, error);
        
        // If it's an auth error or the last attempt, re-throw
        if ((error instanceof Error && error.message.includes('Auth failed')) || attempt === maxRetries) {
          throw error;
        }
        
        // Otherwise, continue to next attempt
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAuthToken();
      setIsLoading(true);

      console.log("[useUserProfile] Checking authentication state", { 
        hasToken: !!token,
        pathname: pathname
      });

      if (!token) {
        setIsLoading(false);
        console.log("[useUserProfile] No token found in cookies or localStorage");
        return;
      }

      try {
        console.log("[useUserProfile] Fetching profile with token");
        
        const data = await fetchProfileWithRetry(token);
        
        setRoles(data.data.roles);
        const userData = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          company: data.data.company,
        };

        console.log("[useUserProfile] Successfully retrieved profile", { 
          userId: data.data.id,
          roles: data.data.roles,
          verified: data.data.verified
        });

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        
      } catch (error) {
        console.error("[useUserProfile] Error fetching profile:", error);
        
        // Check if we have cached user data to fall back to
        const existingUser = localStorage.getItem("user");
        if (existingUser && !(error instanceof Error && error.message.includes('Auth failed'))) {
          console.log("[useUserProfile] Using cached user data due to API error");
          const cachedUserData = JSON.parse(existingUser);
          setUser(cachedUserData);
        } else {
          // Only clear auth data on actual auth failures
          if (error instanceof Error && (error.message.includes('Auth failed') || error.message.includes('401') || error.message.includes('403'))) {
            console.log('[useUserProfile] Auth error, clearing invalid token');
            // Clear both localStorage and cookies
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Clear cookie
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          } else {
            console.log('[useUserProfile] Network/API error, keeping auth data for retry');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Check for cached user data first for immediate UI update
    const userData = localStorage.getItem("user");
    if (userData) {
      console.log("[useUserProfile] Found cached user data in localStorage");
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("[useUserProfile] Error parsing cached user data:", error);
        localStorage.removeItem("user");
      }
    }
    
    // Then fetch fresh data
    fetchProfile();
  }, [pathname]); // Remove dependency on locale to prevent unnecessary refetches

  const handleSignOut = () => {
    console.log("[useUserProfile] Initiating sign out");
    
    // Clear all auth data from current app
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('foresighta-creds');
    
    // Clear auth cookies
    const clearAuthCookies = () => {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      const removeCookie = (name: string) => {
        if (isLocalhost) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        } else {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.knoldg.com; Secure; SameSite=None;`;
        }
      };
      
      removeCookie('token');
      removeCookie('auth_token');
      removeCookie('auth_user');
      removeCookie('auth_return_url');
    };
    
    clearAuthCookies();
    
    // Get the current locale for the redirect
    const locale = pathname.split('/')[1] || 'en';
    
    // Create a logout timestamp to prevent caching issues
    const timestamp = new Date().getTime();
    
    // Perform a coordinated logout by redirecting to the Angular app's logout endpoint
    window.location.href = `https://app.knoldg.com/auth/logout?redirect_uri=${encodeURIComponent(`https://knoldg.com/${locale}?t=${timestamp}`)}`;    
  };

  return { user, roles, isLoading, handleSignOut };
}
