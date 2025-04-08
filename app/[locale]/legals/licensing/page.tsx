'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function DataLicensingAgreement() {
  const t = useTranslations('Legals')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Data Licensing Agreement</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Scope of Licensing</h3>
          <p className="mb-4">Contributors grant Knoldg a non-exclusive, worldwide license to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Distribute and sell insights</li>
            <li>Display and promote content</li>
            <li>Use insights for platform analytics</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Contributor Payments & Revenue Sharing</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contributors earn a royalty per sale from each transaction.</li>
            <li>Knoldg will issue payouts within X days after each transaction.</li>
            <li>Taxes are the responsibility of the contributor.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Intellectual Property Protection</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contributors must own or have rights to any content they upload.</li>
            <li>Knoldg reserves the right to remove any content that infringes IP laws.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Liability & Indemnification</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Experts must ensure content accuracy and comply with all applicable laws.</li>
            <li>Knoldg is not liable for damages resulting from reliance on purchased insights.</li>
            <li>Experts agree to indemnify Knoldg against legal claims arising from misleading or false content.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Termination of License</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contributors may request content removal, but existing sales and licenses remain valid.</li>
            <li>Knoldg may terminate agreements with contributors who violate policies.</li>
          </ul>
        </div>
      </div>
       <Footer/>
    </div>
  )
}
