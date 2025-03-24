'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface User {
  name: string;
  profile_photo_url: string | null;
  first_name: string;
  last_name: string;
  email: string;
}

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      console.log("[useUserProfile] Checking authentication state", { hasToken: !!token });

      if (!token) {
        setIsLoading(false);
        console.log("[useUserProfile] No token found in localStorage");
        return;
      }

      try {
        console.log("[useUserProfile] Fetching profile with token");
        const response = await fetch(
          "https://api.foresighta.co/api/account/profile",
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": "en",
            },
          }
        );

        console.log("[useUserProfile] Profile fetch response", { 
          status: response.status,
          ok: response.ok 
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setRoles(data.data.roles);
        const userData = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_photo_url: data.data.profile_photo_url,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        };

        console.log("[useUserProfile] Successfully retrieved profile", { 
          userId: data.data.id,
          roles: data.data.roles 
        });

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        console.error("[useUserProfile] Error fetching profile:", error);
        // Remove token if it's invalid to prevent authentication loops
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    const userData = localStorage.getItem("user");
    if (userData) {
      console.log("[useUserProfile] Found cached user data in localStorage");
      setUser(JSON.parse(userData));
    }
    fetchProfile();
  }, []);

  const handleSignOut = () => {
    // Clear localStorage only
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Get the current locale for the redirect
    const locale = pathname.split('/')[1] || 'en';
    
    // Create a logout timestamp to prevent caching issues
    const timestamp = new Date().getTime();
    
    // Perform a coordinated logout by redirecting to the Angular app's logout endpoint
    // After the Angular app processes the logout, it will redirect back to our homepage
    window.location.href = `https://app.knoldg.com/auth/logout?redirect_uri=${encodeURIComponent(`https://knoldg.com/${locale}?t=${timestamp}`)}`;  
  };

  return { user, roles, isLoading, handleSignOut };
}
