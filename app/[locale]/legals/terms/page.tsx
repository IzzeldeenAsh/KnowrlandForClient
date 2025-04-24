'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function TermsOfService() {
  const t = useTranslations('termsAndConditions')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t("mainTitle")}</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("Introduction")}</h3>
          <p className="mb-4">{t("welcomeKnoldg")}</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("Definitions")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("authorizedUsers")}</li>
            <li>{t("expertContributors")}</li>
            <li>{t("subscribersPurchasers")}</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("userRoles")}</h3>
          <p className="mb-4">{t("primaryUser")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("freeUsers")}</li>
            <li>{t("payYou")}</li>
            <li>{t("subscribers")}</li>
            <li>{t("expertContributors2")}</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("purchasingReports")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("UsersPurchaseReports")}</li>
            <ul className="list-circle pl-6 mb-2 space-y-1">
              <li>{t("payYou2")}</li>
              <li>{t("subscription")}</li>
              <li>{t("enterpriseLicensing")}</li>
            </ul>
            <li>{t("purchasedreports")}</li>
            <li>{t("reportsRestrictions")}</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("reportsCreation")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("knoldgCurates")}</li>
            <li>{t("expertEnsure")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("AccountRegistration")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("Usersaccurate")}</li>
            <li>{t("Usersresponsible")}</li>
            <li>{t("Knoldgnotified")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("PaymentsRefunds")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("Acceptedpayment")}</li>
            <li>{t("RefundsNotAllowed")}</li>
            <li>{t("SubscriptionRenew")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("ServiceModifications")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("KnoldgRight")}</li>
            <li>{t("Usersnotified")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("LimitationLiability")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("ServicesMaterials")}</li>
            <li>{t("Knoldgliable")}</li>
            <li>{t("Liabilitycapped")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("GoverningDispute")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("ForEU")}</li>
            <li>{t("ForUS")}</li>
            <li>{t("ForJordan")}</li>
            <li>{t("Jordanianlaw")}</li>
          </ul>
        </div>
        
        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
         {t("lastUpdatedTerms")}
        </p>
      </div>
       <Footer/>
    </div>
  )
}
