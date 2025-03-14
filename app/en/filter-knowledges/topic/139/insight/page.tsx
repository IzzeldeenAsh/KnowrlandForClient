'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a static page specifically for the problematic route
export default function SpecificFilterKnowledgesPage() {
  const router = useRouter();

  useEffect(() => {
    console.log('Loaded specific fallback page for /en/filter-knowledges/topic/139/insight');
    
    // After rendering this page, redirect to the dynamic route handler
    // This is just a safety measure in case direct navigation happens
    router.replace('/en/filter-knowledges/topic/139/insight');
  }, [router]);
  
  // This is just a placeholder - the actual content will be loaded
  // by the main FilterKnowledgesPage component after redirection
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading Knowledge...</h1>
        <p>Please wait while we load the content for you.</p>
      </div>
    </div>
  );
} 