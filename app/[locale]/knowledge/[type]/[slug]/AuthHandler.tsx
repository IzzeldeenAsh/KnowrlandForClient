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
      const userData = localStorage.getItem('user');
      
      // Only trigger signout if:
      // 1. There's no token (they lost their session)
      // 2. AND there's user data (indicating they were previously logged in)
      if (!token && userData) {
        console.log('[AuthHandler] User was previously logged in but token is missing - signing out');
        
        // Clean up any remaining auth data
        localStorage.removeItem('token');
        localStorage.removeItem('foresighta-creds');
        
        // Handle signout
        handleSignOut();
      } else if (!token && !userData) {
        console.log('[AuthHandler] No token and no user data - user was never logged in, no action needed');
      } else if (token && userData) {
        console.log('[AuthHandler] Token and user data present - user is authenticated');
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