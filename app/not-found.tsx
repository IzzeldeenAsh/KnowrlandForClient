'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const pathname = usePathname();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Collect debug information
    const info = {
      timestamp: new Date().toISOString(),
      pathname,
      url: typeof window !== 'undefined' ? window.location.href : null,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer : null,
      isFilterKnowledgesRoute: pathname?.includes('filter-knowledges') || false,
    };
    
    setDebugInfo(info);
    
    // Log to console for easier debugging
    console.error('404 Error Debug Info:', info);
    
    // If this is a filter-knowledges route that's causing 404s
    if (pathname?.includes('filter-knowledges')) {
      // Analyze the URL components
      const pathParts = pathname.split('/');
      console.log('Filter Knowledges 404 - Path parts:', pathParts);
      
      // If this looks like our problematic pattern
      if (pathParts.length >= 6) {
        const [empty, locale, filterKnowledges, taxonomy, id, type] = pathParts;
        console.log('Parsed route segments:', { locale, filterKnowledges, taxonomy, id, type });
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      
      {debugInfo.isFilterKnowledgesRoute && (
        <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-md mb-8 max-w-lg text-left">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">
            Filter Knowledges Route Issue Detected
          </h2>
          <p className="text-yellow-600 mb-4">
            We've detected that you're trying to access a Filter Knowledges page that's returning a 404 error. 
            Our team is working on fixing this issue.
          </p>
          <p className="text-sm text-yellow-700">
            Debug Path: {pathname}
          </p>
        </div>
      )}
      
      <Link href="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Go back to Home
      </Link>
      
      <div className="mt-12 text-xs text-gray-400">
        <p>Request info for troubleshooting:</p>
        <code className="block bg-gray-100 p-4 rounded-md mt-2 max-w-xl overflow-auto">
          {JSON.stringify(debugInfo, null, 2)}
        </code>
      </div>
    </div>
  );
} 