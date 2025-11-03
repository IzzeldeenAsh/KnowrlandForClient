'use client'

import Image from 'next/image'
import Particles from './particles'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function ContactContent() {
  const t = useTranslations('contactUsPage');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear errors when user types
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
    if (generalError) setGeneralError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setGeneralError('');
    setSuccess(false);
    
    try {
      const response = await fetch('https://api.insightabusiness.com/api/common/content/contact-us', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": 'en',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        if (data.message) {
          setGeneralError(data.message);
        } else {
          setGeneralError(t('somethingWentWrong'));
        }
      } else {
        setSuccess(true);
        setFormData({
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      setGeneralError(t('somethingWentWrong'));
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="max-w-sm mx-auto min-h-[500px]">
          {success ? (
            <div className="bg-slate-800/50 border border-[#2196F3]/40 text-slate-200 px-6 py-5 rounded-xl relative mb-4 shadow-lg backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-[#2196F3]/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2196F3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="block text-lg font-medium">{t('contactUsSuccessMessage') || 'Your message has been sent successfully!'}</span>
                <p className="mt-2 text-slate-400 text-sm">{t('contactUsSuccessSubtext') || "We'll get back to you as soon as possible."}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="max-w-md mx-auto space-y-6">
                {generalError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{generalError}</span>
                  </div>
                )}
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="first_name">
                      {t('contactUsFirstName')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="first_name"
                      className={`form-input w-full ${errors.first_name ? 'border-red-500' : ''}`}
                      type="text"
                      placeholder={t('contactUsFirstNameplaceholder')}
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.first_name[0]}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="last_name">
                      {t('contactUsLastName')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="last_name"
                      className={`form-input w-full ${errors.last_name ? 'border-red-500' : ''}`}
                      type="text"
                      placeholder={t('contactUsLastNameplaceholder')}
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.last_name[0]}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="phone">
                      {t('contactUsPhone')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="phone"
                      className={`form-input w-full ${errors.phone ? 'border-red-500' : ''}`}
                      type="text"
                      placeholder={t('contactUsPhoneplaceholder')}
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="email">
                      {t('contactUsEmail')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      className={`form-input w-full ${errors.email ? 'border-red-500' : ''}`}
                      type="email"
                      placeholder={t('contactUsEmailplaceholder')}
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="message">
                      {t('contactUsMessage')} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      className={`form-textarea w-full ${errors.message ? 'border-red-500' : ''}`}
                      rows={4}
                      placeholder={t('contactUsMessageplaceholder')}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>
                    )}
                  </div>
                </div>

                {/* Send Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white font-semibold py-2 px-4 rounded-xl transition-all bg-gradient-to-r from-[#2196F3] to-[#2196F3]/80 hover:to-[#2196F3] shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? t('sending') || 'Sending...' : t('send')}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
