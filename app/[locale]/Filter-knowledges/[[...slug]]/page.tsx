'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function FilterKnowledgesCatchAll() {
  const params = useParams();
  const router = useRouter();
  
  // Extract the slug array or create an empty array if it doesn't exist
  const slugArray = params.slug as string[] || [];
  
  useEffect(() => {
    console.log('Catch-all route params:', params);
    console.log('Slug array:', slugArray);
    
    // If we have the expected pattern, redirect to the proper route
    if (slugArray.length >= 3) {
      const [taxonomy, id, type] = slugArray;
      const locale = params.locale as string || 'en';
      
      console.log('Redirecting to proper route:', {
        taxonomy, id, type, locale
      });
      
      // Redirect to the properly structured route
      router.push(`/${locale}/filter-knowledges/${taxonomy}/${id}/${type}`);
    }
  }, [params, slugArray, router]);
  
  // This is just a transitional page, it will redirect
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p>Please wait while we redirect you to the correct page.</p>
      </div>
    </div>
  );
} 