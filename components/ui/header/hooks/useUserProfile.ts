'use client';
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
  const { user, roles, isLoading, isAuthResolved, signOut } = useGlobalProfile();

  const handleSignOut = () => {
    signOut();
  };

  return { user, roles, isLoading, isAuthResolved, handleSignOut };
}
