'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

interface DashboardGuardProps {
  children: React.ReactNode;
  /** When set, the user must have at least one of these roles. */
  roles?: string[];
}

/**
 * Client-side equivalent of the Angular authGuard + RolesGuard pair used on
 * /app/insighter-dashboard routes. Redirects unauthenticated users to signin
 * (preserving the return URL) and users without the required role to home.
 */
export default function DashboardGuard({ children, roles }: DashboardGuardProps) {
  const { user, roles: userRoles, isAuthResolved } = useGlobalProfile();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const roleAllowed = !roles || roles.some((r) => userRoles.includes(r));

  useEffect(() => {
    if (!isAuthResolved) return;

    if (!user) {
      const returnUrl = encodeURIComponent(pathname);
      router.replace(`/${locale}/signin?returnUrl=${returnUrl}`);
      return;
    }

    if (!roleAllowed) {
      router.replace(`/${locale}`);
    }
  }, [isAuthResolved, user, roleAllowed, router, pathname, locale]);

  if (!isAuthResolved || !user || !roleAllowed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
