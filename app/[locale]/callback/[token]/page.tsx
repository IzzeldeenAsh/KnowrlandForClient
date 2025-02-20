'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
  const token = params.token as string;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Store token
        localStorage.setItem('token', token);
        //store in cookie
        document.cookie = `token=${token}; path=/; secure; samesite=strict;`;

        // Fetch profile
        const response = await fetch('https://api.foresighta.co/api/account/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": "en",
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data: ProfileResponse = await response.json();
        
        // Store user data
        localStorage.setItem('user', JSON.stringify({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        }));

        // Redirect to home page
        router.push('/en/home');
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle error - maybe redirect to login
        router.push('/en/login');
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
