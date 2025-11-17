'use client'

import Link from 'next/link'
import Footer from '@/components/ui/footer'
import { useTranslations, useLocale } from 'next-intl'

export default function TermsOfService() {
  const t = useTranslations('termsAndConditions')
  const locale = useLocale()

  const getListItems = (keys: string[]) =>
    keys
      .map((key) => t(key))
      .filter((value) => value && value.trim().length > 0)

  const definitionItems = getListItems(['authorizedUsers', 'expertContributors', 'subscribersPurchasers'])
  const userRoleItems = getListItems(['freeUsers', 'payYou', 'subscribers', 'expertContributors2'])
  const purchasingItems = getListItems(['UsersPurchaseReports', 'payYou2', 'subscription'])
  const registrationItems = getListItems(['Usersaccurate', 'Usersresponsible', 'Knoldgnotified'])
  const paymentItems = getListItems(['Acceptedpayment', 'RefundsNotAllowed', 'SubscriptionRenew'])
  const serviceItems = getListItems(['KnoldgRight', 'Usersnotified'])
  const ipItems = getListItems(['purchasedreports', 'reportsRestrictions'])
  const limitationItems = getListItems(['ServicesMaterials', 'Knoldgliable', 'Liabilitycapped'])
  const disputeItems = getListItems(['ForEU', 'ForUS', 'ForJordan', 'Jordanianlaw'])

  const privacyHref = `/${locale}/legals/privacy`
  const cookiesHref = `/${locale}/legals/cookies`
  const licensingHref = `/${locale}/legals/licensing`

  const relatedDocs = [
    { href: privacyHref, label: t('privacyLinkLabel') },
    { href: cookiesHref, label: t('cookiesLinkLabel') },
    { href: licensingHref, label: t('licensingLinkLabel') }
  ].filter((doc) => doc.label && doc.label.trim().length > 0)

  const relatedSentence = t.rich?.('knoldgCuratesRich', {
    privacy: (chunks) => (
      <Link href={privacyHref} className="text-slate-100 underline underline-offset-4 hover:text-white">
        {chunks}
      </Link>
    ),
    cookies: (chunks) => (
      <Link href={cookiesHref} className="text-slate-100 underline underline-offset-4 hover:text-white">
        {chunks}
      </Link>
    ),
    licensing: (chunks) => (
      <Link href={licensingHref} className="text-slate-100 underline underline-offset-4 hover:text-white">
        {chunks}
      </Link>
    )
  })

  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">{t('mainTitle')}</h2>
          <p className="text-sm text-slate-400 mb-6">{t('lastUpdatedTerms')}</p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('Introduction')}</h3>
          <p className="mb-4">{t('welcomeKnoldg')}</p>

          {definitionItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('Definitions')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {definitionItems.map((item, index) => (
                  <li key={`definition-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {userRoleItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('userRoles')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {userRoleItems.map((item, index) => (
                  <li key={`role-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {purchasingItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('purchasingReports')}</h3>
              <ul className="list-circle pl-6 mb-2 space-y-1">
                {purchasingItems.map((item, index) => (
                  <li key={`purchasing-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {registrationItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('AccountRegistration')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {registrationItems.map((item, index) => (
                  <li key={`registration-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {paymentItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('PaymentsRefunds')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {paymentItems.map((item, index) => (
                  <li key={`payment-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {serviceItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('ServiceModifications')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {serviceItems.map((item, index) => (
                  <li key={`service-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {ipItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('enterpriseLicensing')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {ipItems.map((item, index) => (
                  <li key={`ip-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {limitationItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('LimitationLiability')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {limitationItems.map((item, index) => (
                  <li key={`limitation-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {disputeItems.length > 0 && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('GoverningDispute')}</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {disputeItems.map((item, index) => (
                  <li key={`dispute-${index}`}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {(relatedSentence || relatedDocs.length > 0) && (
            <>
              <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t('reportsCreation')}</h3>
              {relatedSentence && <p className="mb-4">{relatedSentence}</p>}
              {!relatedSentence && relatedDocs.length > 0 && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {relatedDocs.map((doc) => (
                    <li key={doc.href}>
                      <Link
                        href={doc.href}
                        className="text-slate-100 underline underline-offset-4 hover:text-white"
                      >
                        {doc.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
          {t('lastUpdatedTerms')}
        </p>
      </div>
      <Footer/>
    </div>
  )
}
