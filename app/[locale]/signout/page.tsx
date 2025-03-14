'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Helper function to remove cookies properly
    const removeCookie = (name: string) => {
      // Remove from current domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      
      // Remove from root domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.knoldg.com;`;
    };
    
    // Remove all authentication cookies
    removeCookie('token');
    removeCookie('auth_token');
    removeCookie('auth_user');
    
    // Redirect to home page
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Signing out...</p>
    </div>
  );
}
