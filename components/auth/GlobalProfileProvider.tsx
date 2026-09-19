'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/components/ui/header/hooks/useUserProfile';
import { useLocale } from 'next-intl';
import { getAuthToken } from '@/lib/authToken';
import { cookieDomainsToClear } from '@/lib/cookieDomain';

interface ProfileContextType {
  user: User | null;
  roles: string[];
  isLoading: boolean;
  isAuthResolved: boolean;
  refreshProfile: (forceRefresh?: boolean) => Promise<void>;
  signOut: () => void;
}

const ProfileContext = createContext<ProfileContextType>({
  user: null,
  roles: [],
  isLoading: false,
  isAuthResolved: false,
  refreshProfile: async () => { },
  signOut: () => { },
});

export const useGlobalProfile = () => useContext(ProfileContext);

import { globalProfileCache } from '@/lib/auth-profile-cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const ANGULAR_APP_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.insightabusiness.com';

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

  const clearAuthDataEverywhere = () => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('foresighta-creds');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    } catch {
      // ignore storage failures (private mode, etc.)
    }

    // Clear cookie variants (different Path/Domain combinations).
    // Note: Domain must match original cookie to be removed; we attempt common variants.
    const pathsToClear = ['/', '/en', '/ar'];
    const domainsToClear = cookieDomainsToClear(); // [undefined, <env shared domain>]
    const cookieNames = ['token', 'auth_token', 'auth_user', 'auth_return_url'];

    for (const path of pathsToClear) {
      for (const cookieName of cookieNames) {
        // No domain (localhost / default)
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;

        // Common production domain cookie
        for (const domain of domainsToClear) {
          if (!domain) continue;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; Domain=${domain};`;
        }
      }
    }
  };

  const resetProfileState = () => {
    globalProfileCache.user = null;
    globalProfileCache.roles = [];
    globalProfileCache.lastFetchTime = 0;
    globalProfileCache.pendingPromise = null;
    globalProfileCache.isLoading = false;
    setUser(null);
    setRoles([]);
  };

  // Fetch profile with retry logic
  const fetchProfileWithRetry = async (token: string, maxRetries = 3): Promise<{ user: User | null; roles: string[] }> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': locale,
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            // Mark as an auth failure; callers will clear token + stop refetch loops.
            throw new Error(`Auth failed: ${response.status}`);
          }

          if (response.status === 429) {
            // Rate limited — do NOT retry, it will only make things worse.
            throw new Error(`Rate limited: ${response.status}`);
          }

          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt - 1) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }

          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        if (getAuthToken() !== token) throw new Error('Session changed');
        const data = await response.json();
        const profile = (data?.data ?? {}) as Partial<User>;

        const userData: User = {
          ...profile,
          id: Number(profile.id),
          uuid: profile.uuid,
          name: profile.name ?? '',
          email: profile.email ?? '',
          profile_photo_url: profile.profile_photo_url ?? null,
          first_name: profile.first_name ?? '',
          last_name: profile.last_name ?? '',
          company: profile.company,
          country: profile.country,
          country_id: profile.country_id,
          whatsapp_country_code: profile.whatsapp_country_code ?? null,
          whatsapp_number: profile.whatsapp_number ?? null,
        };



        const rolesFromApi: string[] = Array.isArray(profile.roles) ? profile.roles : [];

        // Cache the profile for ALL roles (including admin) to avoid refetch loops.
        // Role-based redirects should be handled by RoleGuard; caching here is about
        // preventing repeated `/api/account/profile` calls (e.g., every 5s).
        globalProfileCache.user = userData;
        globalProfileCache.roles = rolesFromApi;
        globalProfileCache.lastFetchTime = Date.now();
        globalProfileCache.sessionToken = token;

        // Persist only for non-admin users (admin users are typically redirected to Angular).
        if (!rolesFromApi.includes('admin') && !rolesFromApi.includes('staff')) {
          localStorage.setItem('user', JSON.stringify(userData));
        }

        return { user: userData, roles: rolesFromApi };
      } catch (error) {

        if ((error instanceof Error && (error.message.includes('Auth failed') || error.message.includes('Rate limited'))) || attempt === maxRetries) {
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
      if (globalProfileCache.sessionToken !== token) {
        globalProfileCache.user = null;
        globalProfileCache.roles = [];
        globalProfileCache.lastFetchTime = 0;
        globalProfileCache.authFailedToken = null;
        globalProfileCache.sessionToken = token;
      }

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
      if (token && !forceRefresh && globalProfileCache.user && (now - globalProfileCache.lastFetchTime) < CACHE_DURATION) {
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

        // Only an authentication rejection invalidates the shared session.
        // Never restore an origin-local profile belonging to an older login.
        if (error instanceof Error && error.message.includes('Auth failed')) {
          globalProfileCache.authFailedToken = token;
          clearAuthDataEverywhere();
          resetProfileState();
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

  const signOut = () => {
    // Revoke on the logout page before removing the shared cookie.
    window.location.assign(`/${locale}/signout`);
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
      if (globalProfileCache.sessionToken !== currentToken) {
        void refreshProfile();
        return;
      }

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
      refreshProfile: () => refreshProfile(true),
      signOut,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
