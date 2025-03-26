'use client'

import { useTranslations } from 'next-intl'

export default function TermsOfService() {
  const t = useTranslations('Legals')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('terms.title')}</h1>
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Terms of Service</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Introduction</h3>
          <p className="mb-4">Welcome to Knoldg, an online platform that provides access to expert insights, reports, and data. By accessing or using our platform, you agree to comply with these Terms of Service. If you do not agree, please refrain from using Knoldg.</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Definitions</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Authorized Users: Individuals or businesses that have registered and obtained access to Knoldg's services according to their account type.</li>
            <li>Expert Contributors: Individuals or companies that upload reports, insights, or data for sale.</li>
            <li>Subscribers & Purchasers: Users who buy or subscribe to reports and insights.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">User Roles</h3>
          <p className="mb-4">Knoldg has four primary user types:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Free Users: Can browse available content but have limited access to premium insights.</li>
            <li>Pay-as-You-Go Users: Purchase individual reports or insights on demand.</li>
            <li>Subscribers: Access tiered subscription plans that provide broader access to reports and insights.</li>
            <li>Expert Contributors: Individuals who upload insights, reports, or data for sale.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Purchasing Reports</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Users can purchase reports individually or subscribe to tiered access plans:</li>
            <ul className="list-circle pl-6 mb-2 space-y-1">
              <li>Pay-as-you-go: One-time purchases of specific reports or insights.</li>
              <li>Subscription Tiers: Monthly or annual plans with varying levels of access.</li>
              <li>Enterprise Licensing: Custom solutions for businesses requiring multiple-user access.</li>
            </ul>
            <li>Purchased reports are for personal or internal business use only and may not be redistributed, modified, or resold.</li>
            <li>Reports may include usage restrictions or expiration terms as defined by the expert contributor.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Reports Creation</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Knoldg curates reports from expert contributors and develops its own proprietary insights.</li>
            <li>Expert contributors must ensure their content is accurate, non-misleading, and compliant with applicable laws and regulations.</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Account Registration & Obligations</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Users must provide accurate and complete information upon registration.</li>
            <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
            <li>Knoldg must be notified immediately of any unauthorized account activity.</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Payments, Refunds & Compliance</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Accepted payment methods include credit cards, PayPal, bank transfers, and region-specific options.</li>
            <li>Refunds are not allowed once content has been accessed, except in cases of technical errors (e.g., duplicate charges, corrupt downloads).</li>
            <li>Subscription plans will auto-renew unless canceled by the user.</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Service Modifications</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Knoldg reserves the right to modify, discontinue, or update features without prior notice.</li>
            <li>Users will be notified of any significant changes that impact access or pricing.</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Limitation of Liability</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Services and materials are provided "as is" without warranties of any kind.</li>
            <li>Knoldg is not liable for business decisions made based on purchased insights.</li>
            <li>Liability is capped at the amount paid by the user for the disputed service.</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Governing Law & Dispute Resolution</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>For EU users: Governed by GDPR and EU consumer laws.</li>
            <li>For U.S. users: Governed by CCPA and applicable state laws.</li>
            <li>For Jordan & GCC: Governed by local data protection and e-commerce laws.</li>
            <li>Jordanian law applies to all disputes. Any disputes shall be resolved through arbitration or courts in Knoldg's registered jurisdiction.</li>
          </ul>
        </div>
        
        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
         Last Updated: March 26, 2025
        </p>
      </div>
    </div>
  )
}
