'use client'

import { useRouter } from 'next/navigation'

interface Industry {
  id: number
  name: string
  slug: string
  children: {
    id: number
    name: string
  }[]
}

interface IndustriesGridProps {
  industries: Industry[]
}

export default function IndustriesGrid({ industries }: IndustriesGridProps) {
  const router = useRouter()

  const handleIndustryClick = (industryId: number, slug: string) => {
    router.push(`/industry/${industryId}/${slug}`)
  }

  return (
    <div 
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto"
      data-aos="zoom-y-out" 
      data-aos-delay="300"
    >
      {industries.map((industry) => (
        <div 
          key={industry.id} 
          className="relative bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          onClick={() => handleIndustryClick(industry.id, industry.slug)}
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
                  <span className="mr-2">•</span>
                  {child.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute top-6 right-6">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
