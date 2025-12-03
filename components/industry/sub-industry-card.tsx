'use client'

import { useTranslations } from 'next-intl'
import { IndustryChild } from '@/hooks/industries/types'

interface SubIndustryCardProps {
  child: IndustryChild
  locale: string
  isRTL: boolean
}

export default function SubIndustryCard({ child, locale, isRTL }: SubIndustryCardProps) {
  const t = useTranslations()
  const isDisabled = child.weight === 0

  return (
    <div 
      className={`relative group bg-gradient-to-br from-white to-slate-50 rounded-sm p-6 shadow-md border border-slate-100 h-full flex flex-col ${!isDisabled ? 'hover:shadow-lg hover:border-blue-100 hover:from-white hover:to-blue-50 transition-all duration-300 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
    >
      <div className="space-y-2 flex-grow">
        <h3 className={`text-base font-bold ${!isDisabled ? `text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text` : 'text-gray-900'}`}>
          {child.name}
          {isDisabled && <span className="ml-2 text-xs text-gray-500"></span>}
        </h3>
        
        {child.topic.length > 0 ? (
          <ul className="space-y-1">
            {child.topic.map((topic) => {
              const isTopicDisabled = topic.weight === 0
              
              return (
                <li 
                  key={topic.id} 
                  className="text-sm text-gray-700 flex items-center"
                >
                  <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                  <span className={isTopicDisabled ? "opacity-50" : ""}>{topic.name}</span>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="text-xs text-gray-500 italic flex items-center">
            <span className={isRTL ? "ml-2" : "mr-2"}></span>
            <p>{ (locale === 'ar' ? 'لا توجد مواضيع متاحة' : 'No topics available')}</p>
          </div>
        )}
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
        <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded shadow-md bottom-1/2 mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
          <div className="min-w-[240px]">
            { (locale === 'ar' ? 'البيانات غير متوفرة' : 'No Insights Available Yet')}
          </div>
        </div>
      )}
    </div>
  )
}