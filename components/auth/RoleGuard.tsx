'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

const ADMIN_REDIRECT_URL = 'http://localhost:4200/admin-dashboard/admin/dashboard/main-dashboard/requests';

// List of paths that admins are allowed to access in Next.js app
const ADMIN_ALLOWED_PATHS = [
  '/callback', // Allow callback for authentication flow
  '/signout',  // Allow signout
];

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  const { user, roles, isLoading } = useGlobalProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip check if still loading or no user
    if (isLoading || !user) {
      return;
    }

    // Check if user has admin role
    const isAdmin = roles.includes('admin');
    
    if (isAdmin) {
      // Check if current path is allowed for admins
      const isAllowedPath = ADMIN_ALLOWED_PATHS.some(path => 
        pathname.includes(path)
      );

      if (!isAllowedPath) {
        console.log('[RoleGuard] Admin user detected, redirecting to admin dashboard');
        console.log('[RoleGuard] User roles:', roles);
        console.log('[RoleGuard] Current path:', pathname);
        
        // Redirect to Angular admin dashboard
        window.location.href = ADMIN_REDIRECT_URL;
      }
    }
  }, [user, roles, isLoading, pathname]);

  // Show loading state while checking roles
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  // If user is admin and not on allowed path, show loading while redirecting
  if (user && roles.includes('admin') && !ADMIN_ALLOWED_PATHS.some(path => pathname.includes(path))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin mx-auto"></div>
          </div>
          <p className="text-gray-600">Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Render children for non-admin users or admins on allowed paths
  return <>{children}</>;
}