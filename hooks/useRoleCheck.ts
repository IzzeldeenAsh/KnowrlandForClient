'use client';

import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

export function useRoleCheck() {
  const { user, roles, isLoading } = useGlobalProfile();

  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  const hasAnyRole = (checkRoles: string[]): boolean => {
    return checkRoles.some(role => roles.includes(role));
  };

  const hasAllRoles = (checkRoles: string[]): boolean => {
    return checkRoles.every(role => roles.includes(role));
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  const isInsighter = (): boolean => {
    return hasAnyRole(['insighter', 'company-insighter']);
  };

  const isCompany = (): boolean => {
    return hasAnyRole(['company', 'company-insighter']);
  };

  return {
    user,
    roles,
    isLoading,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isInsighter,
    isCompany,
  };
}