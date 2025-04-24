'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function DataLicensingAgreement() {
  const t = useTranslations('dataLicenseAgreement')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t('mainTitle')}</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('scopeTitle')}</h3>
          <p className="mb-4">{t('scopeLine1')}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t('scopeLine2')}</li>
            <li>{t('scopeLine3')}</li>
            <li>{t('scopeLine4')}</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('paymentsTitle')}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t('paymentsLine1')}</li>
            <li>{t('paymentsLine2')}</li>
            <li>{t('paymentsLine3')}</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('ipProtectionTitle')}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t('ipLine1')}</li>
            <li>{t('ipLine2')}</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('liabilityTitle')}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t('liabilityLine1')}</li>
            <li>{t('liabilityLine2')}</li>
            <li>{t('liabilityLine3')}</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('terminationTitle')}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t('terminationLine1')}</li>
            <li>{t('terminationLine2')}</li>
          </ul>
        </div>
        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
          {t('lastUpdatedLicensing')}: March 26, 2025
        </p>
      </div>
      <Footer/>
    </div>
  )
}
