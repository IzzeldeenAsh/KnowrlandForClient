'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/components/ui/header/hooks/useUserProfile';
import { useLocale } from 'next-intl';
import { getAuthToken } from '@/lib/authToken';

interface ProfileContextType {
  user: User | null;
  roles: string[];
  isLoading: boolean;
  isAuthResolved: boolean;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType>({
  user: null,
  roles: [],
  isLoading: false,
  isAuthResolved: false,
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
  /**
   * When the profile endpoint returns 401/403 for a token, we "block" further
   * profile fetches for the same token to avoid hammering the API every 5s.
   * This gets reset automatically when the token changes (login/logout).
   */
  authFailedToken: string | null;
} = {
  user: null,
  roles: [],
  lastFetchTime: 0,
  isLoading: false,
  pendingPromise: null,
  authFailedToken: null,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

export function GlobalProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(globalProfileCache.user);
  const [roles, setRoles] = useState<string[]>(globalProfileCache.roles);
  const [isLoading, setIsLoading] = useState(false);
  /**
   * IMPORTANT (SSR hydration):
   * `getAuthToken()` depends on browser APIs (cookie/localStorage), so it must NOT
   * influence the initial render output. Keep `isAuthResolved` deterministic on
   * server + first client render, then resolve it after mount in `refreshProfile()`.
   */
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  const clearAuthTokenEverywhere = () => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('foresighta-creds');
    } catch {
      // ignore storage failures (private mode, etc.)
    }

    // Clear cookie variants (different Path/Domain combinations).
    // Note: Domain must match original cookie to be removed; we attempt common variants.
    const pathsToClear = ['/', '/en', '/ar'];
    const domainsToClear = [undefined, '.foresighta.co'];

    for (const path of pathsToClear) {
      // No domain (localhost / default)
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;

      // Common production domain cookie
      for (const domain of domainsToClear) {
        if (!domain) continue;
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; Domain=${domain};`;
      }
    }
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
            // Mark as an auth failure; callers will clear token + stop refetch loops.
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
    try {
      const token = getAuthToken();
      const now = Date.now();
      
      // If we already got an auth failure for this exact token, do not re-call
      // the profile endpoint again (the interval would otherwise spam 401s).
      if (!forceRefresh && token && globalProfileCache.authFailedToken === token) {
        globalProfileCache.user = null;
        globalProfileCache.roles = [];
        globalProfileCache.lastFetchTime = 0;
        setUser(null);
        setRoles([]);
        return;
      }

      // Return cached data if still valid and not forced refresh
      if (!forceRefresh && globalProfileCache.user && (now - globalProfileCache.lastFetchTime) < CACHE_DURATION) {
        setUser(globalProfileCache.user);
        setRoles(globalProfileCache.roles);
        return;
      }

      if (!token) {
        // No token => logged out. Also reset any previous auth-failure block.
        globalProfileCache.authFailedToken = null;
        globalProfileCache.user = null;
        globalProfileCache.roles = [];
        globalProfileCache.lastFetchTime = 0;
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
            // Block further attempts for this same token until it changes.
            globalProfileCache.authFailedToken = token;

            clearAuthTokenEverywhere();
            
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
    } finally {
      // Mark auth state as resolved after the first check (token/no-token/cached/fetch)
      setIsAuthResolved(true);
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
        globalProfileCache.authFailedToken = null;
        globalProfileCache.user = null;
        globalProfileCache.roles = [];
        globalProfileCache.lastFetchTime = 0;
        setUser(null);
        setRoles([]);
      } 
      // If we have a token but no user, fetch profile
      else if (currentToken && !globalProfileCache.user) {
        // If the current token previously failed auth, do not keep retrying.
        if (globalProfileCache.authFailedToken === currentToken) {
          return;
        }
        refreshProfile();
      } else if (!currentToken) {
        // No token => ensure we don't keep a stale auth-failure block around.
        globalProfileCache.authFailedToken = null;
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
      isAuthResolved,
      refreshProfile: () => refreshProfile(true) 
    }}>
      {children}
    </ProfileContext.Provider>
  );
}