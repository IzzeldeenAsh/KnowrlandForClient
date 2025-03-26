'use client'

import { useTranslations } from 'next-intl'

export default function CookiesPolicy() {
  const t = useTranslations('Legals')
  
  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('cookies.title')}</h1>
        <div className="prose prose-invert max-w-none text-slate-300">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Cookies Policy</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">4.1 Introduction</h3>
          <p className="mb-4">This Cookies Policy explains how Knoldg uses cookies and similar technologies when you visit our website and applications.</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">4.2 Authentication Approach</h3>
          <p className="mb-4">Our platform primarily uses localStorage for authentication instead of cookies. This approach simplifies the authentication flow and resolves issues with users being unexpectedly logged out after login.</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">4.3 Types of Cookies We Use</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Essential Cookies: Required for basic functionality of the website.</li>
            <li>Analytical/Performance Cookies: Help us understand how visitors interact with our website.</li>
            <li>Functionality Cookies: Allow the website to remember choices you make.</li>
            <li>Targeting Cookies: Record your visit to our website, pages visited, and links followed.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-slate-200">4.4 Managing Cookies</h3>
          <p className="mb-4">Most web browsers allow some control of cookies through browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.</p>
        </div>
        
        <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-700">
          {t('cookies.lastUpdated')}: March 26, 2025
        </p>
      </div>
    </div>
  )
}
