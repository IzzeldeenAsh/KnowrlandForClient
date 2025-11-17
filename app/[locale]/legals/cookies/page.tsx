'use client'

import Link from 'next/link'
import Footer from '@/components/ui/footer'
import { useTranslations, useLocale } from 'next-intl'

export default function CookiesPolicy() {
  const t = useTranslations('cookiesPolicy')
  const locale = useLocale()

  const privacyHref = `/${locale}/legals/privacy`
  const termsHref = `/${locale}/legals/terms`

  const relationLine = t.rich?.('relationLineRich', {
    privacy: (chunks) => (
      <Link href={privacyHref} className="text-slate-100 underline underline-offset-4 hover:text-white">
        {chunks}
      </Link>
    ),
    terms: (chunks) => (
      <Link href={termsHref} className="text-slate-100 underline underline-offset-4 hover:text-white">
        {chunks}
      </Link>
    ),
  })
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">
            {t('mainTitle')}
          </h2>
          <p className="text-sm text-slate-400 mb-6">{t('lastUpdatedCookies')}</p>

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
            {t('cookieDurationTitle')}
          </h3>
          <p>{t('cookieDurationLine1')}</p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('thirdPartyTitle')}
          </h3>
          <p>{t('thirdPartyLine1')}</p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('manageTitle')}
          </h3>
          <p>{t('manageLine1')}</p>
          <p>{t('manageLine2')}</p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">
            {t('relationTitle')}
          </h3>
          <p>{relationLine ?? t('relationLine1')}</p>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-700" />
      </div>

      <Footer />
    </div>
  )
}
