'use client';

import { useState, useEffect } from 'react';
import { getAuthToken } from '@/lib/authToken';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getAuthToken();
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const refreshAuthStatus = () => {
    const token = getAuthToken();
    setIsLoggedIn(!!token);
  };

  return {
    isLoggedIn,
    isLoading,
    token: getAuthToken(),
    refreshAuthStatus
  };
}