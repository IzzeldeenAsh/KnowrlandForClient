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
    setMounted(true)
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  }, [])

  // Only render children after first client-side render to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <div data-aos-initialized="true" style={{ position: 'relative' }}>{children}</div>
}
