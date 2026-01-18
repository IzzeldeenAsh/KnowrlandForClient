'use client'

import { useTranslations, useLocale } from 'next-intl'
import Logo from './logo'

export default function Footer() {
  const t = useTranslations('Footer')
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <footer className='bg-slate-900 text-slate-400'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3 order-1 lg:order-none text-center sm:text-left">
            <div className="h-full flex flex-col sm:flex-row lg:flex-col justify-between items-center sm:items-start">
              <div className="mb-4 sm:mb-0">
                <div className="mb-4 flex justify-center sm:justify-start">
                  <Logo />
                </div>
                <div className="text-sm text-slate-300">{t('copyright')}</div>
              </div>
              {/* Social links */}
              <ul className="flex space-x-4 justify-center sm:justify-start">
                {/* LinkedIn */}
                <li>
                  <a className="flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="https://www.linkedin.com/company/knoldg" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </li>
                {/* Twitter */}
                <li>
                  <a className="mx-4 flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="https://x.com/knoldg75651" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </li>
             
              </ul>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 text-center sm:text-left">
            <h6 className="text-sm text-slate-50 font-medium mb-2 text-start">{t('insight.title')}</h6>
            <ul className="text-sm space-y-2 text-start">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/industries/insight`}>{t('insight.insights')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/industries/report`}>{t('insight.reports')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/industries/data`}>{t('insight.data')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/industries/manual`}>{t('insight.manual')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/industries/course`}>{t('insight.courses')}</a>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 text-center sm:text-left">
            <h6 className="text-sm text-slate-50 font-medium mb-2 text-start">{t('company.title')}</h6>
            <ul className="text-sm space-y-2 text-start">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/about`}>{t('company.about')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/blog`}>{t('company.blog')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/contact`}>{t('company.contact')}</a>
              </li>
            </ul>
          </div>
            {/* 3rd block */}
            {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 text-center sm:text-left">
            <h6 className="text-sm text-slate-50 font-medium mb-2 text-start">First Steps</h6>
            <ul className="text-sm space-y-2 text-start">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/resources/first-steps/about-insighta`}>{t('firstSteps.aboutInsighta')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/resources/first-steps/insighter-guide`}>{t('firstSteps.insighterGuide')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/resources/first-steps/client-guide`}>{t('firstSteps.clientGuide')}</a>
              </li>
            </ul>
          </div> */}
          
          {/* 4th block - Resources */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 text-center sm:text-left">
            <h6 className="text-sm text-slate-50 font-medium mb-2 text-start">{t('resources.title')}</h6>
            <ul className="text-sm space-y-2 text-start">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/resources/help-center`}>{t('resources.helpCenter')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/resources/faqs`}>{t('resources.faqs')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/resources/user-guide`}>{t('resources.userGuide')}</a>
              </li>
            </ul>
          </div> */}

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3 text-center sm:text-left">
            <h6 className="text-sm text-slate-50 font-medium mb-2 text-start">{t('legals.title')}</h6>
            <ul className="text-sm space-y-2 text-start">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/legals/terms`}>{t('legals.terms')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/legals/privacy`}>{t('legals.privacy')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/legals/licensing`}>{t('legals.dataLicensing')}</a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href={`/${locale}/legals/cookies`}>{t('legals.cookies')}</a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  )
}
