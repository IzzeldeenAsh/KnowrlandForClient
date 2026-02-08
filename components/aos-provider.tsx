'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Globa dl flag to prevent multiple AOS initializations
let aosInitialized = false

// Safe AOS utility function that can be used by components
export const safeAOSInit = (config = {}) => {
  try {
    if (typeof AOS !== 'undefined' && typeof AOS.init === 'function' && !aosInitialized) {
      AOS.init({
        once: true,
        disable: 'phone',
        duration: 700,
        easing: 'ease-out-cubic',
        mirror: false,
        startEvent: 'DOMContentLoaded',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        ...config
      });
      aosInitialized = true
    }
  } catch (error) {
    console.warn('Safe AOS init warning:', error);
  }
}

// Safe AOS refresh function
export const safeAOSRefresh = () => {
  try {
    if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function' && aosInitialized) {
      AOS.refresh();
    }
  } catch (error) {
    console.warn('Safe AOS refresh warning:', error);
  }
}

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted first to avoid DOM mismatch
    setMounted(true)
    
    // Only initialize AOS if it hasn't been initialized yet
    if (!aosInitialized) {
      // Use setTimeout with a slight delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        try {
          // Check if AOS is available before initializing
          if (typeof AOS !== 'undefined' && typeof AOS.init === 'function') {
            // Initialize AOS only when the component is mounted
            AOS.init({
              once: true,
              disable: 'phone',
              duration: 700,
              easing: 'ease-out-cubic',
              // Disable mirror animations which can cause the 'mirror' error
              mirror: false,
              // Add a small delay to ensure elements are ready
              startEvent: 'DOMContentLoaded',
              // Disable animations that might cause issues
              useClassNames: false,
              disableMutationObserver: false,
              debounceDelay: 50,
              throttleDelay: 99,
            });
            
            // Mark as initialized
            aosInitialized = true
            
            // Additional refresh after a short delay to catch any late-rendered elements
            const refreshTimer = setTimeout(() => {
              try {
                if (typeof AOS.refresh === 'function') {
                  AOS.refresh();
                }
              } catch (refreshError) {
                console.warn('AOS refresh warning:', refreshError);
              }
            }, 200);
            
            return () => clearTimeout(refreshTimer);
          }
        } catch (error) {
          console.error('AOS initialization error:', error);
          // Reset the flag if initialization failed
          aosInitialized = false
        }
      }, 100); // Slightly longer delay to ensure hydration is complete
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [])

  // Cleanup function when component unmounts
  useEffect(() => {
    return () => {
      try {
        // Only cleanup if AOS was initialized by this provider
        if (aosInitialized && typeof AOS !== 'undefined') {
          if (typeof AOS.refreshHard === 'function') {
            AOS.refreshHard();
          }
        }
      } catch (error) {
        console.warn('AOS cleanup warning:', error);
      }
    };
  }, []);

  // Only render children in a fully initialized state after first client-side render
  if (!mounted) {
    // Return only children without any AOS wrapper initially to prevent hydration mismatch
    return <>{children}</>
  }

  return (
    <div
      data-aos-initialized="true"
      style={{ position: 'relative' }}
      suppressHydrationWarning
    >
      {children}
    </div>
  )
}
