'use client'

import { useTranslations } from 'next-intl'

export default function HelpCenter() {
  const t = useTranslations('Resources')
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('helpCenter.title')}</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Help Center</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Welcome to Knoldg Help Center</h3>
        <p className="mb-4">Find solutions to common questions, access resources, and get the support you need to make the most of our platform.</p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Getting Started</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Creating an account and setting up your profile</li>
          <li>Navigating the platform interface</li>
          <li>Understanding subscription options and payment methods</li>
          <li>How to search for and access reports and insights</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">For Expert Contributors</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>How to upload and manage your reports and data</li>
          <li>Setting pricing and access levels</li>
          <li>Monitoring your content performance</li>
          <li>Responding to inquiries and consultation requests</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Need Additional Help?</h3>
        <p className="mb-4">If you can't find what you're looking for, please contact our support team:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Email: support@knoldg.com</li>
          <li>Support hours: Monday to Friday, 9 AM - 6 PM (UTC+3)</li>
        </ul>
      </div>
    </div>
  )
}
