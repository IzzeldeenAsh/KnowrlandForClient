'use client';

import { useCountryCheck } from '@/app/lib/useCountryCheck';
import { useParams } from 'next/navigation';

interface CountryGuardProps {
  children: React.ReactNode;
  enabled?: boolean;
}

/**
 * Component that checks if user has a country set and redirects to update page if not
 */
export default function CountryGuard({ children, enabled = true }: CountryGuardProps) {
  const params = useParams();
  const locale = params.locale as string || 'en';

  const { isLoading } = useCountryCheck({ locale, enabled });

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  // If we get here, user either has country or doesn't need it
  return <>{children}</>;
}