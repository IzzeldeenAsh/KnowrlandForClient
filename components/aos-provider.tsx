'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted first to avoid DOM mismatch
    setMounted(true)
    
    // Use setTimeout with a slight delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      try {
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
        });
        
        // Additional refresh after a short delay to catch any late-rendered elements
        const refreshTimer = setTimeout(() => {
          if (typeof AOS.refresh === 'function') {
            AOS.refresh();
          }
        }, 100);
        
        return () => clearTimeout(refreshTimer);
      } catch (error) {
        console.error('AOS initialization error:', error);
      }
    }, 50); // Small delay to ensure hydration is complete
    
    return () => {
      clearTimeout(timer);
      // Properly clean up AOS when component unmounts
      try {
        if (typeof AOS.refreshHard === 'function') {
          AOS.refreshHard();
        }
      } catch (error) {
        console.error('AOS cleanup error:', error);
      }
    };
  }, [])

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
