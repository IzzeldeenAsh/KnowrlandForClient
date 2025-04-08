'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function CookiesPolicy() {
  const t = useTranslations('Legals')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Cookies Policy</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Introduction</h3>
          <p className="mb-4">This Cookies Policy explains how Knoldg uses cookies and similar technologies when you visit our website and applications.</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Authentication Approach</h3>
          <p className="mb-4">Our platform primarily uses localStorage for authentication instead of cookies. This approach simplifies the authentication flow and resolves issues with users being unexpectedly logged out after login.</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">Types of Cookies We Use</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Essential Cookies: Required for basic functionality of the website.</li>
            <li>Analytical/Performance Cookies: Help us understand how visitors interact with our website.</li>
            <li>Functionality Cookies: Allow the website to remember choices you make.</li>
            <li>Targeting Cookies: Record your visit to our website, pages visited, and links followed.</li>
          </ul>
          
        </div>
        
        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
          {t('cookies.lastUpdated')}: March 26, 2025
        </p>
      </div>
      <Footer/>
    </div>
  )
}
