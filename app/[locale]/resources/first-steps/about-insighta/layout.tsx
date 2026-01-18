'use client'

import { useState, useEffect } from 'react'
import { AboutInsightaNavbar } from '@/components/AboutInsightaNavbar/AboutInsightaNavbar'
import Footer from '@/components/ui/footer'
import { IconMenu2, IconX } from '@tabler/icons-react'
import PageIllustration from '@/components/page-illustration'

export default function AboutInsightaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen, isMobile])

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-gray-50">
        {/* Page Illustrations - same as home page */}
        <PageIllustration top={true} middle={true} bottom={true} />
        
        {/* Background pattern overlay */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute right-0 top-0 h-full w-1/2 translate-x-1/3 transform text-white opacity-5" fill="none" viewBox="0 0 400 400">
            <defs>
              <pattern id="about-insighta-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-100" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#about-insighta-pattern)" />
          </svg>
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-20 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-md">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <IconX size={24} />
            ) : (
              <IconMenu2 size={24} />
            )}
          </button>
        </div>

        {/* Mobile Header Spacer */}
        <div className="lg:hidden h-24" />

        {/* Mobile Overlay */}
        {isMobileMenuOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className="relative z-10 flex min-h-screen w-full justify-center pt-0 lg:pt-0">
          <div className="flex w-full  min-h-screen ">
            {/* Sidebar Navigation */}
            <div
              className={`
                fixed lg:static inset-y-0 left-0 z-40 w-72 md:w-80 lg:w-[340px]
                bg-white lg:bg-transparent
                transform transition-transform duration-300 ease-in-out
                lg:transform-none
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                lg:flex-shrink-0 lg:pe-8
                overflow-y-auto
                shadow-xl lg:shadow-none
                pt-20 lg:pt-0
              `}
            >
              <AboutInsightaNavbar onLinkClick={() => setIsMobileMenuOpen(false)} />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 overflow-auto px-4 md:px-6 lg:pl-8 lg:pr-0 w-full min-w-0">
              {children}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
