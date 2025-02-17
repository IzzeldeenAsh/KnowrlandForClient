
import Link from 'next/link'

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
}

export default function IndustriesGrid({ industries }: IndustriesGridProps) {


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
        >
          <div className="space-y-2">
            <Link href={`/en/industry/${industry.id}/${industry.slug}`}>
            <h3 className="text-sm font-semibold text-gray-900  hover:text-blue-600 " >
              {industry.name}
            </h3>
            </Link>
            <ul className="space-y-1">
              {industry.children.map((child) => (
                <li 
                  key={child.id} 
                  className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
               <Link href={`/en/sub-industry/${child.id}/${child.slug}`}>
               <span className="mr-2">•</span>
               {child.name}
               </Link>
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
