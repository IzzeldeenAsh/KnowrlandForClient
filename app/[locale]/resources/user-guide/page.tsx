'use client'

import { useTranslations } from 'next-intl'
import { UserGuideNavbar } from '@/components/UserGuideNavbar/UserGuideNavbar'
import { Box, Paper, Text, Title } from '@mantine/core'
import { useLocale } from 'next-intl'
import Particles from '@/components/particles'

export default function UserGuide() {
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
              {t('welcome-to-user-guide')}
            </h2>
            
            <div className="text-slate-400 space-y-6">
              <p className="text-lg">
                {t('user-guide-welcome-message')}
              </p>
              
              <p>
                {t('user-guide-navigation-instruction')}
              </p>
              
              <p>
                {t('user-guide-help-instruction')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
