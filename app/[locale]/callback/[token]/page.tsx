'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

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

export default function AuthCallback() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Get token from either path parameter or query parameter
  const pathToken = params.token as string;
  const queryToken = searchParams.get('token');
  const token = pathToken || queryToken;
  const locale = (params.locale as string) || 'en';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error('No token provided');
        }

        console.log('[token-callback] Storing token in localStorage and cookies');
        
        // Store token in both formats for compatibility with both apps
        localStorage.setItem('token', token);
        
        // Also store in Angular app format
        const angularAuthData = {
          authToken: token,
          refreshToken: ''
        };
        localStorage.setItem('foresighta-creds', JSON.stringify(angularAuthData));
        
        // Set the token in a cookie to make it accessible for SSR functions
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // Create cookie settings array based on environment
        let cookieSettings;
        
        if (isLocalhost) {
          // For localhost: Use Lax SameSite without Secure flag
          cookieSettings = [
            `token=${token}`,
            `Path=/`,                 // send on all paths
            `Max-Age=${60 * 60 * 24}`, // expires in 24 hours
            `SameSite=Lax`            // default value, works on same site
          ];
        } else {
          // For production: Use None SameSite with Secure flag and domain
          cookieSettings = [
            `token=${token}`,
            `Path=/`,
            `Max-Age=${60 * 60 * 24}`,
            `SameSite=None`,          // works across domains
            `Domain=.foresighta.co`,  // leading dot = include subdomains
            `Secure`                  // HTTPS only
          ];
        }
        
        document.cookie = cookieSettings.join('; ');
        
        // Fetch profile
        const response = await fetch('https://api.knoldg.com/api/account/profile', {
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
        console.log('[token-callback] Storing user data in localStorage');
        localStorage.setItem('user', JSON.stringify({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        }));
        
        // Check if user has special roles for conditional redirect
        if (data.data.roles && 
            (data.data.roles.includes('insighter') || 
             data.data.roles.includes('company') || 
             data.data.roles.includes('company-insighter'))) {
          // Redirect to insighter dashboard with token
          console.log('[token-callback] Redirecting to Angular app with token parameter');
          // Pass token in both formats for compatibility
          window.location.href = `https://app.knoldg.com/app/insighter-dashboard/my-dashboard?nextjs_token=${encodeURIComponent(token)}`;
        } else {
          // Redirect to home page using current locale
          router.push(`/${locale}/home`);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Redirect to app login page
        window.location.href = 'https://app.knoldg.com/auth/login';
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error('No token found in URL parameters');
      window.location.href = 'https://app.knoldg.com/auth/login';
    }
  }, [token, router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
