'use client';

import { useEffect } from 'react';
import { useUserProfile } from '@/app/lib/useUserProfile';

export default function AuthHandler() {
  const { handleSignOut } = useUserProfile();

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
      console.log('[AuthHandler] Cleaning up auth data');
      
      // Clean localStorage
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('foresighta-creds');
        console.log('[AuthHandler] LocalStorage cleaned');
      } catch (e) {
        console.error('[AuthHandler] Error cleaning localStorage:', e);
      }
      
      // Clean cookies
      try {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocalhost) {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } else {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.knoldg.com; Secure; SameSite=None;';
        }
        console.log('[AuthHandler] Cookies cleaned');
      } catch (e) {
        console.error('[AuthHandler] Error cleaning cookies:', e);
      }
    };

    // Check auth state and handle cleanup
    const checkAuth = () => {
      const cookieToken = getTokenFromCookie();
      const localStorageToken = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      console.log('[AuthHandler] Auth check:', {
        hasCookieToken: !!cookieToken,
        hasLocalStorageToken: !!localStorageToken,
        hasUserData: !!userData
      });

      // Clean up in any of these cases:
      // 1. No cookie token but has localStorage data
      // 2. Cookie token doesn't match localStorage token
      // 3. Has localStorage token but no cookie token
      if (!cookieToken || 
          (localStorageToken && cookieToken !== localStorageToken) || 
          (!cookieToken && (localStorageToken || userData))) {
        console.log('[AuthHandler] Auth mismatch detected - cleaning up');
        cleanupAuthData();
        handleSignOut();
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
  }, [handleSignOut]);

  // This component doesn't render anything
  return null;
} 