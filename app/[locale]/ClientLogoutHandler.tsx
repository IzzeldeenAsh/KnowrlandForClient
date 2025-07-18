'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { removeAccessToken } from '../lib/auth/auth';

export default function ClientLogoutHandler() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get('logged_out');
  
  // Handle logout parameter from Angular app redirect
  useEffect(() => {
    if (loggedOut === 'true') {
      // Use the centralized auth utility to remove tokens from both cookies and localStorage
      console.log('[ClientLogoutHandler] Clearing auth data using centralized utility');
      removeAccessToken();
      
      console.log('Logged out successfully from Angular app redirect');
      
      // Optionally remove the logged_out parameter from URL using history API
      if (window.history && window.history.replaceState) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, [loggedOut]);
  
  // This component doesn't render anything visible
  return null;
}