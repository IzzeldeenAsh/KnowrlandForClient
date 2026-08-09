'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import { getAuthToken } from '@/lib/authToken';
import { fetchOnboardingPromptStatuses } from '@/services/onboarding.service';

interface UseCountryCheckOptions {
  locale: string;
  enabled?: boolean;
}

/**
 * Protects country-dependent screens using the backend onboarding state.
 */
export function useCountryCheck({ locale, enabled = true }: UseCountryCheckOptions) {
  const { user, isLoading: isProfileLoading } = useGlobalProfile();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [checkedUserId, setCheckedUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled || isProfileLoading || !user) return;

    const token = getAuthToken();
    if (!token) return;

    let cancelled = false;
    const checkCountryPrompt = async () => {
      setIsChecking(true);
      try {
        const prompts = await fetchOnboardingPromptStatuses({ token, locale });
        const countryPrompt = prompts.find((prompt) => prompt.prompt_key === 'country');
        const shouldRedirect = countryPrompt?.should_show === true;

        if (cancelled) return;
        setNeedsUpdate(shouldRedirect);

        if (shouldRedirect) {
          const fullUrl = searchParams.toString()
            ? `${pathname}?${searchParams.toString()}`
            : pathname;
          window.location.replace(
            `/${locale}/onboarding?redirect=${encodeURIComponent(fullUrl)}`,
          );
        }
      } catch (error) {
        // A temporary prompt-status failure must not make protected pages unusable.
        console.error('[useCountryCheck] Unable to check onboarding status:', error);
        if (!cancelled) setNeedsUpdate(false);
      } finally {
        if (!cancelled) {
          setCheckedUserId(user.id);
          setIsChecking(false);
        }
      }
    };

    void checkCountryPrompt();
    return () => {
      cancelled = true;
    };
  }, [enabled, isProfileLoading, locale, pathname, searchParams, user]);

  return {
    needsUpdate,
    isLoading:
      isProfileLoading ||
      isChecking ||
      Boolean(enabled && user && checkedUserId !== user.id),
    user
  };
}
