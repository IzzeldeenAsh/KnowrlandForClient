'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function SubIndustryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Sub-industry page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-8">
          {error.message || 'Failed to load sub-industry details'}
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors mr-4"
          >
            Try again
          </button>
          <Link
            href={\`/\${(useParams().locale as string) || 'en'}/all-industries\`}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors inline-block"
          >
            Back to Industries
          </Link>
        </div>
      </div>
    </div>
  )
}