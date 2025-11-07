'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/components/ui/header/hooks/useUserProfile';
import { useLocale } from 'next-intl';

interface ProfileContextType {
  user: User | null;
  roles: string[];
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType>({
  user: null,
  roles: [],
  isLoading: false,
  refreshProfile: async () => {},
});

export const useGlobalProfile = () => useContext(ProfileContext);

// Global cache for user profile to prevent duplicate API calls across all components
let globalProfileCache: {
  user: User | null;
  roles: string[];
  lastFetchTime: number;
  isLoading: boolean;
  pendingPromise: Promise<{ user: User | null; roles: string[] }> | null;
} = {
  user: null,
  roles: [],
  lastFetchTime: 0,
  isLoading: false,
  pendingPromise: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

export function GlobalProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(globalProfileCache.user);
  const [roles, setRoles] = useState<string[]>(globalProfileCache.roles);
  const [isLoading, setIsLoading] = useState(false);
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
    const cookieToken = getTokenFromCookie();
    if (cookieToken) return cookieToken;
    
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) return localStorageToken;
    
    return null;
  };

  // Fetch profile with retry logic
  const fetchProfileWithRetry = async (token: string, maxRetries = 3): Promise<{ user: User | null; roles: string[] }> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        
        const response = await fetch("https://api.foresighta.co/api/account/profile", {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error(`Auth failed: ${response.status}`);
          }
          
          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt - 1) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        
        const userData: User = {
          id: data.data.id,
          uuid: data.data.uuid,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          company: data.data.company,
          country: data.data.country,
          country_id: data.data.country_id,
        };

    

        // Check if user is admin before caching
        if (data.data.roles && data.data.roles.includes('admin')) {
          // Still return the data but don't cache it
          return { user: userData, roles: data.data.roles };
        }

        // Update cache only for non-admin users
        globalProfileCache.user = userData;
        globalProfileCache.roles = data.data.roles;
        globalProfileCache.lastFetchTime = Date.now();
        
        localStorage.setItem("user", JSON.stringify(userData));
        
        return { user: userData, roles: data.data.roles };
      } catch (error) {
        
        if ((error instanceof Error && error.message.includes('Auth failed')) || attempt === maxRetries) {
          throw error;
        }
        
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return { user: null, roles: [] };
  };

  const refreshProfile = async (forceRefresh = false) => {
    const token = getAuthToken();
    const now = Date.now();
    
    // Return cached data if still valid and not forced refresh
    if (!forceRefresh && globalProfileCache.user && (now - globalProfileCache.lastFetchTime) < CACHE_DURATION) {
      setUser(globalProfileCache.user);
      setRoles(globalProfileCache.roles);
      return;
    }

    if (!token) {
      globalProfileCache.user = null;
      globalProfileCache.roles = [];
      setUser(null);
      setRoles([]);
      return;
    }

    // If already fetching, return the pending promise
    if (globalProfileCache.pendingPromise) {
      try {
        const result = await globalProfileCache.pendingPromise;
        setUser(result.user);
        setRoles(result.roles);
      } catch (error) {
      }
      return;
    }

    // Start new fetch
    setIsLoading(true);
    globalProfileCache.isLoading = true;
    globalProfileCache.pendingPromise = fetchProfileWithRetry(token);

    try {
      const result = await globalProfileCache.pendingPromise;
      setUser(result.user);
      setRoles(result.roles);
    } catch (error) {
      
      // Check if we have cached user data to fall back to
      const existingUser = localStorage.getItem("user");
      if (existingUser && !(error instanceof Error && error.message.includes('Auth failed'))) {
        const cachedUserData = JSON.parse(existingUser);
        globalProfileCache.user = cachedUserData;
        setUser(cachedUserData);
        setRoles(globalProfileCache.roles);
      } else {
        // Only clear auth data on actual auth failures
        if (error instanceof Error && error.message.includes('Auth failed')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          
          globalProfileCache.user = null;
          globalProfileCache.roles = [];
          globalProfileCache.lastFetchTime = 0;
          setUser(null);
          setRoles([]);
        }
      }
    } finally {
      globalProfileCache.isLoading = false;
      globalProfileCache.pendingPromise = null;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Skip profile fetch for callback pages as they handle their own auth flow
    if (pathname.includes('/callback')) {
      return;
    }

    // Initial fetch when component mounts
    refreshProfile();
    
    // Set up auth state monitoring
    const checkAuthState = () => {
      const currentToken = getAuthToken();
      
      // If we had a user but token is gone, clear state
      if (globalProfileCache.user && !currentToken) {
        globalProfileCache.user = null;
        globalProfileCache.roles = [];
        globalProfileCache.lastFetchTime = 0;
        setUser(null);
        setRoles([]);
      } 
      // If we have a token but no user, fetch profile
      else if (currentToken && !globalProfileCache.user) {
        refreshProfile();
      }
    };

    // Check auth state every 5 seconds
    const interval = setInterval(checkAuthState, 5000);
    
    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <ProfileContext.Provider value={{ 
      user, 
      roles, 
      isLoading, 
      refreshProfile: () => refreshProfile(true) 
    }}>
      {children}
    </ProfileContext.Provider>
  );
}