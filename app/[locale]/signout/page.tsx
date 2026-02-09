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
      
      // Remove from root domain and ensure Secure/SameSite settings match creation
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.insightabusiness.com; Secure; SameSite=None;`;
    };
    
    // Clear ALL possible localStorage keys from both apps
    localStorage.removeItem('token'); // Next.js format
    localStorage.removeItem('user'); // Next.js user data
    localStorage.removeItem('foresighta-creds'); // Angular format
    localStorage.removeItem('currentUser'); // Possible Angular user data
    localStorage.removeItem('authToken'); // Possible direct token storage
    
    // Clear any auth cookies
    removeCookie('token');
    removeCookie('auth_token');
    removeCookie('auth_user');
    
    // Check if we also need to notify the Angular app about logout
    const shouldNotifyAngularApp = !redirectUri?.includes('app.insightabusiness.com');
    
    // If logout originated from Next.js, notify Angular app to ensure it also logs out
    if (shouldNotifyAngularApp) {
      // Create an iframe to silently trigger logout on Angular app
      const angularLogoutFrame = document.createElement('iframe');
      angularLogoutFrame.style.display = 'none';
      angularLogoutFrame.src = `https://app.insightabusiness.com/auth/logout?redirect_uri=${encodeURIComponent(window.location.href)}`;
      document.body.appendChild(angularLogoutFrame);
      
      // Remove iframe after 2 seconds to ensure logout completes
      setTimeout(() => {
        try {
          document.body.removeChild(angularLogoutFrame);
        } catch (e) {
          console.log('Frame already removed');
        }
      }, 2000);
    }
    
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
