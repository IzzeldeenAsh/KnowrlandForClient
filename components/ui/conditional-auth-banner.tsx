'use client';

import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile';
import AuthBanner from './auth-banner';
import { usePathname } from 'next/navigation';

export default function ConditionalAuthBanner() {
  const { user, isLoading } = useUserProfile();
  const pathname = usePathname();
  
  // Hide on callback routes to keep a clean full-screen loader
  if (pathname.includes('/callback')) {
    return null;
  }

  // Don't show the banner if user is authenticated or still loading
  if (user || isLoading) {
    return null;
  }

  return <AuthBanner />;
}