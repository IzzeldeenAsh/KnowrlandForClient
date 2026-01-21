'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FullScreenLoader from '../ui/FullScreenLoader';
import { useLocale } from 'next-intl';
type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  startPageLoading: () => void;
  stopPageLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isManualLoading, setIsManualLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const isAboutInsightaSection = pathname.includes('/resources/first-steps/about-insighta');
  // Check for preferred language cookie and determine if loading should be shown
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const preferredLanguage = getCookie('preferred_language');
    const currentLanguage = pathname.split('/')[1];
    
    // If the current language matches the preferred one or no preference exists,
    // we can stop showing the loader
    if (!preferredLanguage || preferredLanguage === currentLanguage) {
      setIsLoading(false);
    }
    
    // This timeout ensures we don't show the loader indefinitely if something goes wrong
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Handle navigation state
  useEffect(() => {
    // When pathname changes, mark navigation as complete
    setIsNavigating(false);
    
    // Listen for navigation start events
    const handleNavigationStart = () => {
      setIsNavigating(true);
    };

    // For client-side navigation, we need to listen for click events on links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && 
          link.href && 
          !link.target && 
          !link.download && 
          !link.rel?.includes('external') &&
          link.origin === window.location.origin) {
        // Avoid showing the GLOBAL fullscreen loader for in-section navigation
        // (these routes have their own local content loader so the sidebar stays visible)
        const destinationPathname = new URL(link.href).pathname;
        const isDestinationAboutInsighta = destinationPathname.includes('/resources/first-steps/about-insighta');
        if (isAboutInsightaSection && isDestinationAboutInsighta) return;

        setIsNavigating(true);
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname, isAboutInsightaSection]);

  // Functions to manually control loading state
  const startPageLoading = () => setIsManualLoading(true);
  const stopPageLoading = () => setIsManualLoading(false);

  // Show loader either during initial load, during navigation, or when manually triggered
  const isCallbackRoute = pathname.includes('/callback');
  const showLoader = !isCallbackRoute && (isLoading || isNavigating || isManualLoading);

  return (
    <LoadingContext.Provider value={{ 
      isLoading: showLoader, 
      setIsLoading,
      startPageLoading,
      stopPageLoading
    }}>
      {showLoader ? <FullScreenLoader message={currentLocale === 'ar' ? 'جاري تحميل الصفحة...' : 'Loading...'} /> : children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

export function usePageLoading() {
  const { startPageLoading, stopPageLoading } = useLoading();
  return { startPageLoading, stopPageLoading };
} 