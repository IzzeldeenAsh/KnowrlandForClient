'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function DataLicensingAgreement() {
  const t = useTranslations('dataLicenseAgreement')

  const getListItems = (keys: string[]) =>
    keys
      .map((key) => t(key))
      .filter((value) => value && value.trim().length > 0)

  const sectionHasContent = (items: string[], intro?: string) =>
    items.length > 0 || (intro && intro.trim().length > 0)

  const scopeItems = getListItems(['scopeLine2', 'scopeLine3', 'scopeLine4'])
  const paymentsItems = getListItems(['paymentsLine1', 'paymentsLine2', 'paymentsLine3'])
  const ipItems = getListItems(['ipLine1', 'ipLine2'])
  const liabilityItems = getListItems(['liabilityLine1', 'liabilityLine2', 'liabilityLine3'])
  const terminationItems = getListItems(['terminationLine1', 'terminationLine2'])

  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">{t('mainTitle')}</h2>
          <p className="text-sm text-slate-400 mb-6">{t('lastUpdatedLicensing')}</p>
          
          {sectionHasContent(scopeItems, t('scopeLine1')) && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('scopeTitle')}</h3>
              {t('scopeLine1')?.trim() && <p className="mb-4">{t('scopeLine1')}</p>}
              {scopeItems.length > 0 && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {scopeItems.map((item, index) => (
                    <li key={`scope-${index}`}>{item}</li>
                  ))}
                </ul>
              )}
            </>
          )}

          {sectionHasContent(paymentsItems) && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('paymentsTitle')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {paymentsItems.map((item, index) => (
                  <li key={`payments-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {sectionHasContent(ipItems) && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('ipProtectionTitle')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {ipItems.map((item, index) => (
                  <li key={`ip-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {sectionHasContent(liabilityItems) && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('liabilityTitle')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {liabilityItems.map((item, index) => (
                  <li key={`liability-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {sectionHasContent(terminationItems) && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('terminationTitle')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {terminationItems.map((item, index) => (
                  <li key={`termination-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('applicableLawTitle')}</h3>
          <p className="mb-4">{t('applicableLawText')}</p>
        </div>
        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
          {t('lastUpdatedLicensing')}
          {/* : March 26, 2025 */}
        </p>
      </div>
      <Footer/>
    </div>
  )
}
