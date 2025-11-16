'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicy() {
  const t = useTranslations('privacyPage')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">{t("mainTitle")}</h2>
          <p className="text-sm text-slate-400 mb-6">{t("privacyLastUpdate")}</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("DataCollection")}</h3>
          <p className="mb-4">{t("Knoldgcollects")}</p>
          {/* <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("Accountdetails")}</li>
            <li>{t("Browsingbehavior")}</li>
            <li>{t("PurchaseHistory")}</li>
          </ul> */}

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("LegalBasis")}</h3>
          <p className="mb-4">{t("WeProcess")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("UserConsent")}</li>
            <li>{t("ContractuaNecessity")}</li>
            <li>{t("LegitimateInterests")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("DataSharing")}</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("PersonalData")}</li>
            <li>{t("DataShared")}</li>
            <li>{t("InformationDisclosed")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("UserRights")}</h3>
          <p className="mb-4">{t("UsersHave")}</p>
          {/* <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("AccessCorrect")}</li>
            <li>{t("OptCommunications")}</li>
            <li>{t("RequestPortability")}</li>
            <li>{t("Withdrawonsent")}</li>
          </ul> */}
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("RetentionPeriod")}</h3>
          <p className="list-disc mb-4 space-y-2">
            {t("PersonalData2")}
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("DataSecurity")}</h3>
          <p className="list-disc mb-4 space-y-2">
            {t("Knoldgemploys")}
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">{t("CookiesTracking")}</h3>
          <p className="list-disc mb-4 space-y-2">
            {t("KnoldgCookies")}
            {t("UsersCookie")}
          </p>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-700" />
      </div>
      <Footer/>
    </div>
  )
}
