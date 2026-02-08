'use client'

import { useState, useEffect } from 'react'
import { AboutInsightaNavbar } from '@/components/AboutInsightaNavbar/AboutInsightaNavbar'
import Footer from '@/components/ui/footer'
import { IconMenu2, IconX } from '@tabler/icons-react'
import PageIllustration from '@/components/page-illustration'
import { useLocale } from 'next-intl'

export default function AboutInsightaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = useLocale()
  const isRTL = locale === 'ar'
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
             {/* Decorative background */}
             <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Gradient blobs */}
          <div
            className={`absolute -top-24 h-72 w-72 rounded-full blur-3xl opacity-20 ${
              isRTL ? 'left-24 bg-gradient-to-l from-blue-500 to-teal-400' : 'right-24 bg-gradient-to-r from-blue-500 to-teal-400'
            }`}
          />
          <div
            className={`absolute top-16 h-72 w-72 rounded-full blur-3xl opacity-15 ${
              isRTL ? 'right-20 bg-gradient-to-l from-indigo-500 to-cyan-400' : 'left-40 bg-gradient-to-r from-indigo-500 to-cyan-400'
            }`}
          />

          {/* Bottom divider line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
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
        {isMobileMenuOpen ? (
             
              <div className="d-none">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Toggle menu"
              >
                 <IconX size={16} />
              </button>
            </div>
            ) : (
                 
              <div className="lg:hidden absolute top-[24px] left-4 z-[70] bg-white border border-gray-200 rounded-lg  flex items-center justify-center h-8 w-8 shadow-md">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Toggle menu"
              >
                <IconMenu2 size={16} />
              </button>
            </div>
             
            )}
       

     
        {/* Mobile Header Spacer */}
        <div className="lg:hidden lg:h-24" />

        {/* Mobile Overlay */}
        {isMobileMenuOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[55] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className="relative flex min-h-screen w-full justify-center pt-0 lg:pt-0">
          <div className="flex w-full  min-h-screen ">
            {/* Sidebar Navigation */}
            <div
              className={`
                fixed lg:static inset-y-0 left-0 z-[60] md:z-[20] w-72 md:w-80 lg:w-[340px]
                bg-white lg:bg-transparent
                transform transition-transform duration-300 ease-in-out
                lg:transform-none
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                lg:flex-shrink-0 
                overflow-y-auto
                shadow-xl lg:shadow-none
                md:pt-20 lg:pt-0
              `}
            >
              <AboutInsightaNavbar onLinkClick={() => setIsMobileMenuOpen(false)} />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 overflow-auto w-full min-w-0">
              {children}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
