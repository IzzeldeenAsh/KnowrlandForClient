'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import { needsCountryUpdate, shouldRequireCountry, redirectToCountryUpdate } from './countryUtils';

interface UseCountryCheckOptions {
  locale: string;
  enabled?: boolean;
}

/**
 * Hook to check if user needs to update country and redirect if necessary
 */
export function useCountryCheck({ locale, enabled = true }: UseCountryCheckOptions) {
  const { user, isLoading } = useGlobalProfile();
  const pathname = usePathname();

  useEffect(() => {
    // Skip if disabled or still loading
    if (!enabled || isLoading) {
      return;
    }

    // Skip if no user (not authenticated)
    if (!user) {
      return;
    }

    // Skip if current route doesn't require country
    if (!shouldRequireCountry(pathname)) {
      console.log('[useCountryCheck] Skipping country check for route:', pathname);
      return;
    }

    // Check if user needs country update
    if (needsCountryUpdate(user)) {
      console.log('[useCountryCheck] User needs country update, redirecting');
      redirectToCountryUpdate(locale, pathname);
    }
  }, [user, isLoading, pathname, locale, enabled]);

  return {
    needsUpdate: needsCountryUpdate(user),
    isLoading,
    user
  };
}