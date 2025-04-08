'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicy() {
  const t = useTranslations('Legals')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Privacy Policy</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Data Collection & Usage</h3>
          <p className="mb-4">Knoldg collects personal data to enhance user experience, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Account details (name, email, payment information)</li>
            <li>Browsing behavior (cookies, analytics, search queries)</li>
            <li>Purchase history & interactions with experts</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Legal Basis for Processing (GDPR Compliance)</h3>
          <p className="mb-4">We process personal data based on:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>User consent (e.g., for marketing emails)</li>
            <li>Contractual necessity (e.g., processing payments)</li>
            <li>Legitimate interests (e.g., improving our platform and fraud prevention)</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Data Sharing</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Personal data is not sold to third parties.</li>
            <li>Data may be shared with service providers (e.g., payment processors, fraud prevention services) to facilitate platform operations.</li>
            <li>Information may be disclosed if legally required (e.g., government compliance, legal disputes).</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Cookies & Tracking</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Knoldg uses cookies and tracking technologies to enhance user experience and improve services.</li>
            <li>Users can adjust cookie preferences via their browser settings.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">User Rights</h3>
          <p className="mb-4">Users have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access, correct, or delete personal data</li>
            <li>Opt out of marketing communications</li>
            <li>Request data portability (EU users)</li>
            <li>Withdraw consent at any time</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Data Security</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Knoldg employs industry-standard encryption and access controls to protect user data.</li>
            <li>We follow strict security measures to prevent unauthorized access and breaches.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Retention Period</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Personal data is stored only as long as necessary for service delivery and legal compliance.</li>
          </ul>
        </div>
        
        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
          {t('privacy.lastUpdated')}: March 26, 2025
        </p>
      </div>
      <Footer/>
    </div>
  )
}
