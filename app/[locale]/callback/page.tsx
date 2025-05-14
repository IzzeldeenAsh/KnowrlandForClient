'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { getApiUrl, getAppUrl } from '@/app/config';

interface ProfileResponse {
  data: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
    profile_photo_url: string | null;
    country_id: number | null;
    country: string | null;
    status: string;
    verified: boolean;
  };
}

export default function QueryParamAuthCallback() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const returnUrl = searchParams.get('returnUrl');
  const locale = params.locale as string || 'en';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token provided');
        }

        // Store token in localStorage only
        console.log('[callback] Storing token in localStorage');
        localStorage.setItem('token', token);
        
        // Fetch profile
        const response = await fetch(getApiUrl('/api/account/profile'), {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: ProfileResponse = await response.json();
        
        // Store user data in localStorage only
        console.log('[callback] Storing user data in localStorage');
        localStorage.setItem('user', JSON.stringify({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        }));
        
        // ALWAYS check for a valid return URL first, regardless of user role
        if (returnUrl && returnUrl !== '/' && !returnUrl.includes('/login') && !returnUrl.includes('/auth/')) {
          console.log('[callback] Redirecting to returnUrl:', returnUrl);
          // Redirect to the previous page for all user types
          
          // Handle both relative and absolute URLs
          if (returnUrl.startsWith('http')) {
            // For absolute URLs (like coming from knoldg.com)
            window.location.href = returnUrl;
          } else {
            // For relative URLs within the app
            window.location.href = returnUrl;
          }
        } else {
          console.log('[callback] No valid returnUrl, using role-based redirect');
          // Only use role-based redirects if there's no valid returnUrl
          if (data.data.roles && 
              (data.data.roles.includes('insighter') || 
               data.data.roles.includes('company') || 
               data.data.roles.includes('company-insighter'))) {
            // Redirect to insighter dashboard
            window.location.href = getAppUrl('/app/insighter-dashboard/my-dashboard');
          } else {
            // Fall back to default home page using current locale
            router.push(`/${locale}/home`);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Redirect to app login page
        window.location.href = getAppUrl('/auth/login');
      }
    };

    if (token) {
      fetchProfile();
    } else {
      // Redirect to login if no token
      router.push(`/${locale}/login`);
    }
  }, [token, router, locale, returnUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
} 