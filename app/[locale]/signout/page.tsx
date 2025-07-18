'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { removeAccessToken } from '../../lib/auth/auth';

export default function SignoutPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string || 'en';
  const redirectUri = searchParams.get('redirect_uri');

  useEffect(() => {
    // Use the centralized auth utility to remove tokens from both cookies and localStorage
    removeAccessToken();
    
    // Clear any additional auth data that might exist from legacy systems
    localStorage.removeItem('foresighta-creds'); // Angular format
    localStorage.removeItem('currentUser'); // Possible Angular user data
    localStorage.removeItem('authToken'); // Possible direct token storage
    
    // Helper function to remove any additional cookies that might exist
    const removeCookie = (name: string) => {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocalhost) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      } else {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.knoldg.com; Secure; SameSite=None;`;
      }
    };
    
    // Clear any additional auth cookies that might exist
    removeCookie('auth_token');
    removeCookie('auth_user');
    removeCookie('auth_return_url');
    
    // Check if we also need to notify the Angular app about logout
    const shouldNotifyAngularApp = !redirectUri?.includes('app.knoldg.com');
    
    // If logout originated from Next.js, notify Angular app to ensure it also logs out
    if (shouldNotifyAngularApp) {
      // Create an iframe to silently trigger logout on Angular app
      const angularLogoutFrame = document.createElement('iframe');
      angularLogoutFrame.style.display = 'none';
      angularLogoutFrame.src = `https://app.knoldg.com/auth/logout?redirect_uri=${encodeURIComponent(window.location.href)}`;
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
