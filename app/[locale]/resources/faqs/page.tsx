'use client'

import { useTranslations } from 'next-intl'

export default function FAQs() {
  const t = useTranslations('Resources')
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('faqs.title')}</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Account & Registration</h3>
        <div className="mb-6">
          <p className="font-semibold mb-2">How do I create an account?</p>
          <p className="ml-1 mb-4">Click the "Login" button in the top right corner and select "Sign Up". Follow the prompts to create your account.</p>
          
          <p className="font-semibold mb-2">Is registration free?</p>
          <p className="ml-1 mb-4">Yes, basic registration is free. You only pay when you purchase specific reports or subscribe to premium services.</p>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Payments & Subscriptions</h3>
        <div className="mb-6">
          <p className="font-semibold mb-2">What payment methods do you accept?</p>
          <p className="ml-1 mb-4">We accept major credit cards, PayPal, and bank transfers for enterprise accounts.</p>
          
          <p className="font-semibold mb-2">Can I cancel my subscription anytime?</p>
          <p className="ml-1 mb-4">Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing cycle.</p>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Content & Reports</h3>
        <div className="mb-6">
          <p className="font-semibold mb-2">Can I download reports for offline use?</p>
          <p className="ml-1 mb-4">Yes, purchased reports can be downloaded in PDF format for offline reference.</p>
          
          <p className="font-semibold mb-2">How often is content updated?</p>
          <p className="ml-1 mb-4">New content is added daily by our network of expert contributors. Industry reports are typically updated quarterly or when significant changes occur.</p>
        </div>
      </div>
    </div>
  )
}
