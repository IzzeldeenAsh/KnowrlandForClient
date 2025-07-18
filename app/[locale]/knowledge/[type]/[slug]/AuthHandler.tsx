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
          return value;
        }
      }
      return null;
    };

    // Helper function to get token from any available source
    const getAuthToken = (): string | null => {
      // First try cookie (primary storage)
      const cookieToken = getTokenFromCookie();
      if (cookieToken) {
        return cookieToken;
      }

      // Fallback to localStorage for backward compatibility
      const localStorageToken = localStorage.getItem("token");
      if (localStorageToken) {
        return localStorageToken;
      }

      return null;
    };

    // Check if there's no token and handle signout
    const checkAuth = () => {
      const token = getAuthToken();
      
      if (!token) {
        // Clean up any remaining auth data
        localStorage.removeItem('token');
        localStorage.removeItem('foresighta-creds');
        
        // Handle signout
        handleSignOut();
      }
    };

    // Only run this check on the client side
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, [handleSignOut]);

  // This component doesn't render anything
  return null;
} 