'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export interface User {
  id: number;
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

// Global cache for user profile to prevent duplicate API calls
let userProfileCache: {
  user: User | null;
  roles: string[];
  lastFetchTime: number;
  isLoading: boolean;
  pendingPromise: Promise<{user: User | null; roles: string[]}> | null;
} = {
  user: null,
  roles: [],
  lastFetchTime: 0,
  isLoading: false,
  pendingPromise: null
};

const CACHE_DURATION = 30000; // 30 seconds cache for user profile

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(userProfileCache.user);
  const [roles, setRoles] = useState<string[]>(userProfileCache.roles);
  const [isLoading, setIsLoading] = useState(userProfileCache.isLoading);
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
      return cookieToken;
    }

    // Fallback to localStorage for backward compatibility
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      return localStorageToken;
    }

    return null;
  };

  // Helper function to retry profile fetch with backoff
  const fetchProfileWithRetry = async (token: string, maxRetries = 3): Promise<{user: User | null; roles: string[]}> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[useUserProfile] Attempt ${attempt}/${maxRetries} to fetch profile`);
        
        const response = await fetch(
          "https://api.foresighta.co/api/account/profile",
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

        const data = await response.json();
        
        const userData: User = {
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

        // Update cache
        userProfileCache.user = userData;
        userProfileCache.roles = data.data.roles;
        userProfileCache.lastFetchTime = Date.now();
        
        localStorage.setItem("user", JSON.stringify(userData));
        
        return { user: userData, roles: data.data.roles };
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
    
    return { user: null, roles: [] };
  };

  // Cached fetch function to prevent duplicate API calls
  const fetchProfile = async (forceRefresh = false): Promise<{user: User | null; roles: string[]}> => {
    const token = getAuthToken();
    const now = Date.now();
    
    // Return cached data if still valid and not forced refresh
    if (!forceRefresh && userProfileCache.user && (now - userProfileCache.lastFetchTime) < CACHE_DURATION) {
      console.log("[useUserProfile] Using cached profile data");
      return { user: userProfileCache.user, roles: userProfileCache.roles };
    }

    if (!token) {
      console.log("[useUserProfile] No token found in cookies or localStorage");
      userProfileCache.user = null;
      userProfileCache.roles = [];
      return { user: null, roles: [] };
    }

    // If already fetching, return the pending promise
    if (userProfileCache.pendingPromise) {
      console.log("[useUserProfile] Using pending promise");
      return userProfileCache.pendingPromise;
    }

    // Start new fetch
    console.log("[useUserProfile] Starting new profile fetch");
    userProfileCache.isLoading = true;
    userProfileCache.pendingPromise = fetchProfileWithRetry(token);

    try {
      const result = await userProfileCache.pendingPromise;
      return result;
    } catch (error) {
      console.error("[useUserProfile] Error fetching profile:", error);
      
      // Check if we have cached user data to fall back to
      const existingUser = localStorage.getItem("user");
      if (existingUser && !(error instanceof Error && error.message.includes('Auth failed'))) {
        console.log("[useUserProfile] Using cached user data due to API error");
        const cachedUserData = JSON.parse(existingUser);
        userProfileCache.user = cachedUserData;
        return { user: cachedUserData, roles: userProfileCache.roles };
      } else {
        // Only clear auth data on actual auth failures
        if (error instanceof Error && (error.message.includes('Auth failed') || error.message.includes('401') || error.message.includes('403'))) {
          console.log('[useUserProfile] Auth error, clearing invalid token');
          // Clear both localStorage and cookies
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Clear cookie
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          
          // Clear cache
          userProfileCache.user = null;
          userProfileCache.roles = [];
          userProfileCache.lastFetchTime = 0;
        } else {
          console.log('[useUserProfile] Network/API error, keeping auth data for retry');
        }
      }
      
      return { user: userProfileCache.user, roles: userProfileCache.roles };
    } finally {
      userProfileCache.isLoading = false;
      userProfileCache.pendingPromise = null;
    }
  };

  useEffect(() => {
    // Set loading state
    setIsLoading(userProfileCache.isLoading);

    // Fetch profile data
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        // Force a profile refresh to ensure we have the latest auth state
        const { user: fetchedUser, roles: fetchedRoles } = await fetchProfile(true);
        setUser(fetchedUser);
        setRoles(fetchedRoles);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []); // Remove pathname dependency to prevent unnecessary refetches

  // Update local state when cache changes (for other components)
  useEffect(() => {
    const checkCacheUpdates = () => {
      if (userProfileCache.user !== user) {
        setUser(userProfileCache.user);
      }
      if (userProfileCache.roles !== roles) {
        setRoles(userProfileCache.roles);
      }
    };

    const interval = setInterval(checkCacheUpdates, 1000);
    return () => clearInterval(interval);
  }, [user, roles]);

  const handleSignOut = () => {
    console.log("[useUserProfile] Initiating sign out");
    
    // Clear cache
    userProfileCache.user = null;
    userProfileCache.roles = [];
    userProfileCache.lastFetchTime = 0;
    userProfileCache.isLoading = false;
    userProfileCache.pendingPromise = null;
    
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
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.foresighta.co; Secure; SameSite=None;`;
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
    window.location.href = `https://app.foresighta.co/auth/logout?redirect_uri=${encodeURIComponent(`https://foresighta.co/${locale}?t=${timestamp}`)}`;    
  };

  return { user, roles, isLoading, handleSignOut };
}
