'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';
import Footer from '@/components/ui/footer';
import { useParams } from 'next/navigation';

export default function LocaleNotFound() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  useEffect(() => {
    // Log for debugging
    console.log('Not found page rendered with locale:', locale);
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
          </div>
          
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          
          <p className="text-xl text-gray-500 mb-8">
            {locale === 'ar' 
              ? 'لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها أو لم تكن موجودة.'
              : 'We couldn\'t find the page you\'re looking for. The page may have been moved, deleted, or may never have existed.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              color="blue"
              className="py-3 px-6"
            >
              {locale === 'ar' ? 'العودة' : 'Go Back'}
            </Button>
            
            <Link href={`/${locale}`} passHref>
              <Button
                variant="filled"
                color="blue"
                className="py-3 px-6"
              >
                {locale === 'ar' ? 'الصفحة الرئيسية' : 'Return Home'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 