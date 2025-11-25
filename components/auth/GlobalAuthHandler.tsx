'use client';

import { useEffect } from 'react';
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile';
import { usePathname } from 'next/navigation';

export default function GlobalAuthHandler() {
  const { handleSignOut } = useUserProfile();
  const pathname = usePathname();

  useEffect(() => {
    // Helper function to get token from cookie
    const getTokenFromCookie = (): string | null => {
      if (typeof document === 'undefined') return null;
      
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
          return decodeURIComponent(value);
        }
      }
      return null;
    };

    // Function to clean up all auth data
    const cleanupAuthData = () => {
      
      // Clean localStorage
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('foresighta-creds');
      } catch (e) {
      }
    };

    // Check auth state and handle cleanup
    const checkAuth = () => {
      const cookieToken = getTokenFromCookie();
      const localStorageToken = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      // Skip auth check for public routes
      const isPublicRoute = pathname.includes('/home') || 
                          pathname === '/' || 
                          pathname.includes('/callback') ||
                          pathname.includes('/signout');

      if (isPublicRoute) {
        return;
      }


      // If we have localStorage data but no cookie token, we need to clean up and redirect
      if (!cookieToken && (localStorageToken || userData)) {
        cleanupAuthData();
        
        // Get the current locale for the redirect
        const locale = pathname.split('/')[1] || 'en';
        const timestamp = new Date().getTime();
        
        // Redirect to Angular app's logout endpoint
        window.location.href = `http://localhost:4200/auth/logout?redirect_uri=${encodeURIComponent(`http://localhost:3000/${locale}?t=${timestamp}`)}`;
      }
    };

    // Run initial check
    if (typeof window !== 'undefined') {
      checkAuth();
    }

    // Set up interval to periodically check auth state
    const interval = setInterval(checkAuth, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [handleSignOut, pathname]);

  // This component doesn't render anything
  return null;
} 