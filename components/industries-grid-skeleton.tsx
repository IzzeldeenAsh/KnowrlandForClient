export default function IndustriesGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-white to-slate-50 rounded-sm p-6 shadow-md border border-slate-100 h-full animate-pulse"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            <ul className="space-y-1">
              {[...Array(3)].map((_, childIndex) => (
                <li key={childIndex} className="flex items-center">
                  <span className="mr-2 text-gray-300">•</span>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}