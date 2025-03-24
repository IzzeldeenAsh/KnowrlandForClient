'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ClientLogoutHandler() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get('logged_out');
  
  // Handle logout parameter from Angular app redirect
  useEffect(() => {
    if (loggedOut === 'true') {
      // Clear localStorage only
      console.log('[ClientLogoutHandler] Clearing localStorage auth data');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
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