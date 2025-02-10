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
    
    // Redirect to home page
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Signing out...</p>
    </div>
  );
}
