'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function CookiesPolicy() {
  const t = useTranslations('cookiesPolicy')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">
            {t('mainTitle')}
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('introTitle')}
          </h3>
          <p>{t('introLine1')}</p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('consentTitle')}
          </h3>
          <p>{t('consentLine1')}</p>
          <p>{t('consentLine2')}</p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('authTitle')}
          </h3>
          <p>{t('authLine1')}</p>
          <p>{t('authLine2')}</p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('typesTitle')}
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('typeEssential')}</li>
            <li>{t('typeAnalytics')}</li>
            <li>{t('typeFunctionality')}</li>
            <li>{t('typeTargeting')}</li>
            <li>{t('typeConsent')}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('manageTitle')}
          </h3>
          <p>{t('manageLine1')}</p>
          <p>{t('manageLine2')}</p>

        </div>

        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
          {t('lastUpdatedCookies')}: March 26, 2025
        </p>
      </div>

      <Footer />
    </div>
  )
}
