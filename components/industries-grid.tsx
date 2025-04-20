"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Industry {
  id: number
  name: string
  slug: string
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

  return (
    <div 
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto"
      data-aos="zoom-y-out" 
      data-aos-delay="300"
    >
      {industries.map((industry) => (
        <Link key={industry.id} href={`/${currentLocale}/industry/${industry.id}/${industry.slug}`}>
          <div 
            className="relative bg-white min-h-[140px] rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900  hover:text-blue-600 " >
                {industry.name}
              </h3>
              <ul className="space-y-1">
                {industry.children.map((child) => (
                  <li 
                    key={child.id} 
                    className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <Link href={`/${currentLocale}/sub-industry/${child.id}/${child.slug}`}>
                      <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                      {child.name}
                    </Link>
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
          </div>
        </Link>
      ))}
    </div>
  )
}
