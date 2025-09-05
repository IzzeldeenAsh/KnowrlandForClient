export default function SubIndustryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="section-header px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden rounded-lg">
        <div className="relative z-10 max-w-6xl mx-auto mt-5 w-full">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <div className="flex space-x-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Title Skeleton */}
            <div className="flex-1">
              <div className="h-12 bg-gray-200 rounded w-96 mb-4 animate-pulse"></div>
            </div>
            
            {/* Stats Cards Skeleton */}
            <div className="flex-shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-12 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Topics Section Skeleton */}
      <section className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>
          
          {/* Topic Cards Grid Skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-slate-50 rounded-sm p-6 shadow-md border border-slate-100 h-full animate-pulse"
              >
                <div className="space-y-2">
                  {/* Icon + Title Skeleton */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded w-28"></div>
                  </div>
                  
                  {/* Knowledge label skeleton */}
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                  
                  {/* Knowledge items skeleton */}
                  <ul className="space-y-1">
                    {[...Array(3)].map((_, childIndex) => (
                      <li key={childIndex} className="flex items-center">
                        <span className="mr-2 text-gray-300">•</span>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}