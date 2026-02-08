'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { MantineProvider, Button } from '@mantine/core';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error t test o an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-lg w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
              Something went wrong
            </h2>
            
            <p className="text-xl text-gray-500 mb-8">
              We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => reset()}
                variant="outline"
                color="blue"
                className="py-3 px-6"
              >
                Try Again
              </Button>
              
              <Link href="/" passHref>
                <Button
                  variant="filled"
                  color="blue"
                  className="py-3 px-6"
                >
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
} 