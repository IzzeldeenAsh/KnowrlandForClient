'use client';

import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile';
import AuthBanner from './auth-banner';

export default function ConditionalAuthBanner() {
  const { user, isLoading } = useUserProfile();

  // Don't show the banner if user is authenticated or still loading
  if (user || isLoading) {
    return null;
  }

  return <AuthBanner />;
}