"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl';
import { Industry } from '@/hooks/industries/types';

interface IndustriesGridProps {
  industries: Industry[]
  locale?: string
}

export default function IndustriesGrid({ industries, locale }: IndustriesGridProps) {
  const params = useParams();
  const currentLocale = locale || (params?.locale as string) || 'en';
  const isRTL = currentLocale === 'ar';
  const t = useTranslations();

  const IndustryCard = ({ industry, showAsClickable = true }: { industry: Industry, showAsClickable?: boolean }) => {
    const isDisabled = industry.weight === 0;
    
    return (
      <div 
        className={`relative group bg-gradient-to-br from-white to-slate-50 rounded-sm p-6 shadow-md border border-slate-100 h-full flex flex-col ${!isDisabled && showAsClickable ? 'hover:shadow-lg hover:border-blue-100 hover:from-white hover:to-blue-50 transition-all duration-300 cursor-pointer' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="space-y-2 flex-grow">
          <div className="flex items-center gap-3">
            {industry.icon && (
              <img 
                src={industry.icon} 
                alt={`${industry.name} icon`}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
            )}
            <h3 className={`text-base font-bold ${!isDisabled ? 'text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text' : 'text-gray-900'}`}>
              {industry.name}
              {isDisabled && <span className="ml-2 text-xs text-gray-500"></span>}
            </h3>
          </div>
          <ul className="space-y-1">
            {industry.children?.map((child) => (
              <li 
                key={child.id} 
                className="text-sm text-gray-700 flex items-center"
              >
                <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                <span className="text-gray-700">{child.name}</span>
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
            className={`min-w-[240px] absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded shadow-md 
            bottom-1/2 mb-2 left-1/2 -translate-x-1/2 
            opacity-0 group-hover:opacity-100 
            pointer-events-none transition-opacity duration-300`}
          >
            {t('dataNotAvailable')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
      data-aos="zoom-y-out" 
      data-aos-delay="300"
    >
      {industries.map((industry) => {
        const isDisabled = industry.weight === 0;
        
        return isDisabled ? (
          <div key={industry.id} className="h-full">
            <IndustryCard industry={industry} showAsClickable={false} />
          </div>
        ) : (
          <Link key={industry.id} href={`/${currentLocale}/industry/${industry.id}/${industry.slug}`} className="h-full block">
            <IndustryCard industry={industry} />
          </Link>
        );
      })}
    </div>
  )
}