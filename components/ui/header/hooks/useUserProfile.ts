'use client';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

export interface User {
  id: number;
  uuid?: string;
  name: string;
  country?: string;
  country_id?: number;
  roles?: string[];
  profile_photo_url: string | null;
  first_name: string;
  last_name: string;
  email: string;
  bio?: string | null;
  phone_code?: string | null;
  phone?: string | null;
  whatsapp_status?: string | null;
  whatsapp_country_code?: string | null;
  whatsapp_number?: string | null;
  sms_status?: string | null;
  sms_country_code?: string | null;
  sms_number?: string | null;
  insighter_status?: string | null;
  client_status?: string | null;
  certifications?: ProfileCertification[];
  industries?: ProfileTaxonomy[];
  consulting_field?: ProfileConsultingField[];
  social?: ProfileSocial[];
  verified?: boolean;
  login_social?: boolean;
  login_social_only?: boolean;
  language?: string | null;
  experience?: number | null;
  company?: {
    id?: number;
    logo?: string | null;
    legal_name?: string;
    uuid?: string;
    website?: string | null;
    verified_email?: string | null;
    about_us?: string | null;
    register_document?: string | null;
    country?: {
      id?: number;
      name?: string;
      flag?: string;
    } | null;
    address?: string | null;
    phone_code?: string | null;
    company_phone?: string | null;
    status?: string | null;
    verified?: boolean;
    social?: ProfileSocial[];
    primary_activate_at?: string | null;
    certifications?: ProfileCertification[];
    industries?: ProfileTaxonomy[];
    consulting_field?: ProfileConsultingField[];
    experience?: number | null;
  };
}

export interface ProfileCertification {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface ProfileTaxonomy {
  id: number;
  name: string;
  slug?: string;
  weight?: number;
  image?: string | null;
}

export interface ProfileConsultingField {
  id: number;
  name: string;
  names?: {
    en?: string;
    ar?: string;
  };
}

export interface ProfileSocial {
  id?: number;
  link: string;
  type: string;
}

export function useUserProfile() {
  const { user, roles, isLoading, isAuthResolved, refreshProfile, signOut } = useGlobalProfile();

  const handleSignOut = () => {
    signOut();
  };

  return { user, roles, isLoading, isAuthResolved, refreshProfile, handleSignOut };
}
