'use client'

import React from 'react';
import Link from 'next/link';

interface ServiceRequestCTAProps {
  locale: string;
}

const ServiceRequestCTA: React.FC<ServiceRequestCTAProps> = ({ locale }) => {
  const isRTL = locale === 'ar';

  return (
    <div className="relative mx-auto mt-4 max-w-4xl px-4 pb-5 sm:px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Soft ambient glow behind the heading */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center" aria-hidden="true">
        <div className="h-64 w-[36rem] max-w-full rounded-full bg-gradient-to-r from-blue-400/10 via-teal-300/10 to-blue-400/10 blur-3xl" />
      </div>

      <div className="relative text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-md">
          {isRTL ? (
            <>
              أو اطلب{' '}
              <span className={`bg-clip-text text-transparent ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-blue-500 to-teal-400`}>
                خدمة مخصصة
              </span>
            </>
          ) : (
            <>
              Or request a custom{' '}
              <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                service
              </span>
            </>
          )}
        </h2>
       

        <div className="mt-8 flex items-center justify-center">
          <Link
            href={`/${locale}/project/wizard/project-type`}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-base"
          >
            {isRTL ? 'ابدأ الطلب': 'Start Request'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`transition-transform duration-200 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
            >
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      
      </div>
    </div>
  );
};

export default ServiceRequestCTA;
