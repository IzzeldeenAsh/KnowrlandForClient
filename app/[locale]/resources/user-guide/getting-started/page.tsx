'use client'

import { useTranslations } from 'next-intl'
import { UserGuideNavbar } from '@/components/UserGuideNavbar/UserGuideNavbar'
import { useLocale } from 'next-intl'
import Particles from '@/components/particles'

export default function GettingStarted() {
  const t = useTranslations('Resources')
  const locale = useLocale()
  
  // Check if locale is RTL
  const isRtl = locale === 'ar'
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Radial gradient */}
      <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
        <div className="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-50"></div>
      </div>
      
      {/* Particles animation */}
      <Particles className="absolute inset-0 -z-10" quantity={8} />

      <div className="flex h-full w-full">
        <div className="flex w-full h-full bg-slate-900">
          <div className="w-[300px] border-r border-slate-800" style={{ backgroundColor: '#0f172a' }}>
            <UserGuideNavbar />
          </div>
          
          <div className="flex-1 bg-slate-900 overflow-auto p-8">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              {t('getting-started')}
            </h2>
            
            <div className="text-slate-400 space-y-6">
              <p className="text-lg">
                {t('getting-started-description') || 'Welcome to Insighta! This guide will help you get started with our platform.'}
              </p>
              
              <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4">
                {t('quick-start') || 'Quick Start Guide'}
              </h3>
              
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                  <div>
                    <strong className="text-slate-50 font-medium">
                      {t('create-account-step') || 'Create an account or sign in to your existing account'}
                    </strong>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                  <div>
                    <strong className="text-slate-50 font-medium">
                      {t('complete-profile-step') || 'Complete your profile with relevant information'}
                    </strong>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                  <div>
                    <strong className="text-slate-50 font-medium">
                      {t('explore-content-step') || 'Start exploring content from the home page'}
                    </strong>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                  <div>
                    <strong className="text-slate-50 font-medium">
                      {t('save-content-step') || 'Save interesting content for later reference'}
                    </strong>
                  </div>
                </li>
              </ul>
              
              <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4">
                {t('next-steps') || 'Next Steps'}
              </h3>
              
              <p>
                {t('next-steps-description') || 'After getting familiar with the basics, continue exploring:'}
              </p>
              
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                  <div>
                    <strong className="text-slate-50 font-medium">
                      {t('account-management-next') || 'Learn more about account management options'}
                    </strong>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                  <div>
                    <strong className="text-slate-50 font-medium">
                      {t('content-features-next') || 'Discover advanced content features'}
                    </strong>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                  <div>
                    <strong className="text-slate-50 font-medium">
                      {t('search-tips-next') || 'Check out search tips to find exactly what you need'}
                    </strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
