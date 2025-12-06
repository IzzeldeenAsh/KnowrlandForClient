'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics ID
const GA_MEASUREMENT_ID = 'G-R1XT5PMHG0';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        page_path?: string;
        page_title?: string;
        page_location?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Wait for gtag to be available
    if (typeof window === 'undefined') {
      return;
    }

    // Wait a bit for gtag to be fully loaded
    const sendPageView = () => {
      if (!window.gtag) {
        // Retry after a short delay if gtag is not ready
        setTimeout(sendPageView, 100);
        return;
      }

      // Get the full URL path including search params
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      // Send pageview event to Google Analytics
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    };

    // Initial call
    sendPageView();
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
}

