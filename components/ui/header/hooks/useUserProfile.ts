'use client';
import { usePathname } from 'next/navigation';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

export interface User {
  id: number;
  uuid?: string;
  name: string;
  country?: string;
  country_id?: number;
  profile_photo_url: string | null;
  first_name: string;
  last_name: string;
  email: string;
  company?: {
    logo: string;
    legal_name?: string;
    uuid?: string;
  };
}

export function useUserProfile() {
  const { user, roles, isLoading, isAuthResolved, refreshProfile } = useGlobalProfile();
  const pathname = usePathname();

  const handleSignOut = () => {
    console.log("[useUserProfile] Initiating sign out");
    
    // Clear all auth data from current app
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('foresighta-creds');
    
    // Clear auth cookies
    const clearAuthCookies = () => {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      const removeCookie = (name: string) => {
        if (isLocalhost) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        } else {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Domain=.insightabusiness.com; Secure; SameSite=None;`;
        }
      };
      
      removeCookie('token');
      removeCookie('auth_token');
      removeCookie('auth_user');
      removeCookie('auth_return_url');
    };
    
    clearAuthCookies();
    
    // Get the current locale for the redirect
    const locale = pathname.split('/')[1] || 'en';
    
    // Create a logout timestamp to prevent caching issues
    const timestamp = new Date().getTime();
    
    // Perform a coordinated logout by redirecting to the Angular app's logout endpoint
    window.location.href = `https://app.insightabusiness.com/auth/logout?redirect_uri=${encodeURIComponent(`https://insightabusiness.com/${locale}?t=${timestamp}`)}`;    
  };

  return { user, roles, isLoading, isAuthResolved, handleSignOut };
}