'use client'

import Image from 'next/image'
import Particles from './particles'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ContactContent() {
  const t = useTranslations('contactUsPage');

  return (
    <>
      <section className="relative pt-20 border-bottom-[1px] border-slate-800 border pb-20">
        {/* Background effects */}
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
          <div className="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-50"></div>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto text-center pb-12">
            <h1
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 leading-relaxed"
            >
                {t('contactUsTitle')}
            </h1>
        </div>

        <Particles className="absolute inset-0 h-96 -z-10" quantity={8} />

        {/* Form */}
        <div className="max-w-sm mx-auto">
          <form>
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="first-name">
                    {t('contactUsFirstName')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="first-name"
                    className="form-input w-full"
                    type="text"
                    placeholder={t('contactUsFirstNameplaceholder')}
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="last-name">
                    {t('contactUsLastName')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="last-name"
                    className="form-input w-full"
                    type="text"
                    placeholder={t('contactUsLastNameplaceholder')}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="phone">
                    {t('contactUsPhone')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    className="form-input w-full"
                    type="text"
                    placeholder={t('contactUsPhoneplaceholder')}
                    required
                  />
                </div>
                <div>
                    <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="email">
                        {t('contactUsEmail')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                        id="email"
                        className="form-input w-full"
                        type="email"
                        placeholder={t('contactUsEmailplaceholder')}
                        required
                    />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="message">
                    {t('contactUsMessage')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    className="form-textarea w-full"
                    rows={4}
                    placeholder={t('contactUsMessageplaceholder')}
                    required
                  />
                </div>
              </div>

              {/* Send Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full text-white font-semibold py-2 px-4 rounded-xl transition-all bg-gradient-to-r from-[#2196F3] to-[#2196F3]/80 hover:to-[#2196F3] shadow-md"
                >
                  {t('send')}
                </button>
              </div>

              {/* Company Info */}
              <div className="pt-6 border-t  border-slate-700 text-slate-400 text-sm space-y-1">
                <p className="font-semibold text-center">{t('regionalOperations')}</p>
                {/* <p className="text-[#2196F3] font-medium">{t('jordanPhone')}</p> */}
                </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
