'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ClientLogoutHandler() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get('logged_out');
  
  // Handle logout parameter from Angular app redirect
  useEffect(() => {
    if (loggedOut === 'true') {
      // Helper function to remove cookies properly with domain detection
      const removeCookie = (name: string) => {
        // Detect domain for cookie deletion
        const domain = window.location.hostname === 'localhost' ? '' : 
                     window.location.hostname.includes('knoldg.com') ? '.knoldg.com' : 
                     window.location.hostname;
                     
        const cookieDomain = domain ? `domain=${domain};` : '';
        
        // Remove from current domain
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        
        // Remove from root domain if applicable
        if (domain) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${cookieDomain}`;
        }
      };
      
      // Clear localStorage in Next.js app
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear cookies
      removeCookie('token');
      removeCookie('auth_token');
      removeCookie('auth_user');
      
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