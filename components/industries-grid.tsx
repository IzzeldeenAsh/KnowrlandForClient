"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl';

interface Industry {
  id: number
  name: string
  slug: string
  weight?: number
  children: {
    id: number
    name: string,
    slug: string
  }[]
}

interface IndustriesGridProps {
  industries: Industry[]
  locale?: string
}

export default function IndustriesGrid({ industries, locale }: IndustriesGridProps) {
  // Get locale from params if not passed as prop
  const params = useParams();
  const currentLocale = locale || (params?.locale as string) || 'en';
  const isRTL = currentLocale === 'ar';
  const t = useTranslations();

  return (
    <div 
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto"
      data-aos="zoom-y-out" 
      data-aos-delay="300"
    >
      {industries.map((industry) => {
        const isDisabled = industry.weight === 0;
        
        const cardContent = (
          <div 
            className={`relative group bg-white min-h-[140px] rounded-sm p-6 shadow-sm ${!isDisabled ? 'hover:shadow-md transition-all duration-300 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          >
            <div className="space-y-2">
              <h3 className={`text-sm font-semibold ${!isDisabled ? 'text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text' : 'text-gray-900'}`}>
                {industry.name}
                {isDisabled && <span className="ml-2 text-xs text-gray-500"></span>}
              </h3>
              <ul className="space-y-1">
                {industry.children.map((child) => (
                  <li 
                    key={child.id} 
                    className={`text-xs text-gray-600 ${!isDisabled ? 'hover:text-blue-600 transition-colors' : ''} flex items-center`}
                  >
                    {!isDisabled ? (
                      <Link href={`/${currentLocale}/sub-industry/${child.id}/${child.slug}`}>
                        <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                        {child.name}
                      </Link>
                    ) : (
                      <>
                        <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                        {child.name}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'}`}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isRTL ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} 
                />
              </svg>
            </div>
            {isDisabled && (
                <div
                  className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded shadow-md 
                  bottom-1/2 mb-2 left-1/2 -translate-x-1/2 
                  opacity-0 group-hover:opacity-100 
                  pointer-events-none transition-opacity duration-300`}
                >
                  {t('dataNotAvailable')}
                </div>
              )}
          </div>
        );
        
        return isDisabled ? (
          <div key={industry.id}>{cardContent}</div>
        ) : (
          <Link key={industry.id} href={`/${currentLocale}/industry/${industry.id}/${industry.slug}`}>
            {cardContent}
          </Link>
        );
      })}
    </div>
  )
}
