'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

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

export default function ClientLogoutHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const loggedOut = searchParams.get('logged_out');
  
  useEffect(() => {
    // Handle logout parameter from Angular app redirect
    if (loggedOut === 'true') {
      cleanupAuthData();
      
      // Optionally remove the logged_out parameter from URL using history API
      if (window.history && window.history.replaceState) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, [loggedOut]);

  useEffect(() => {
    // Skip auth check for public routes
    const isPublicRoute = pathname.includes('/home') || 
                         pathname === '/' || 
                         pathname.includes('/callback') ||
                         pathname.includes('/signout');

    if (isPublicRoute) {
      return;
    }

    // Check auth state and handle cleanup
    const checkAuth = () => {
      const cookieToken = getTokenFromCookie();
      const localStorageToken = localStorage.getItem('token');
      const userData = localStorage.getItem('user');


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
  }, [pathname]);
  
  // This component doesn't render anything visible
  return null;
}