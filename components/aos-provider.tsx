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
    
    // Use setTimeout to ensure initialization happens after hydration is complete
    const timer = setTimeout(() => {
      AOS.init({
        once: true,
        disable: 'phone',
        duration: 700,
        easing: 'ease-out-cubic',
      })
    }, 0)
    
    return () => {
      clearTimeout(timer)
      // Properly clean up AOS when component unmounts
      if (typeof AOS.refreshHard === 'function') {
        AOS.refreshHard()
      }
    }
  }, [])

  // Only render children in a fully initialized state after first client-side render
  if (!mounted) {
    // Return only children without any AOS wrapper initially to prevent hydration mismatch
    return <>{children}</>
  }

  return <div data-aos-initialized="true" style={{ position: 'relative' }}>{children}</div>
}
