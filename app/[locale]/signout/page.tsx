'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

export default function SignoutPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string || 'en';
  const redirectUri = searchParams.get('redirect_uri');

  useEffect(() => {
    // Helper function to remove cookies properly
    const removeCookie = (name: string) => {
      // Remove from current domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      
      // Remove from root domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.knoldg.com;`;
    };
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear any auth cookies
    removeCookie('token');
    removeCookie('auth_token');
    removeCookie('auth_user');
    
    // Redirect to the specified redirect URI or home page
    if (redirectUri) {
      window.location.href = redirectUri;
    } else {
      router.push(`/${locale}`);
    }
  }, [router, locale, redirectUri]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Signing Out...</h1>
        <p>Please wait while we log you out.</p>
      </div>
    </div>
  );
}
