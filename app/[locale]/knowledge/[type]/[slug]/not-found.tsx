'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';
import Footer from '@/components/ui/footer';
import KnowledgeIcon from '@/components/icons/knowledge-icon';
import { useParams } from 'next/navigation';

export default function KnowledgeNotFound() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  useEffect(() => {
    // Log for debugging
    console.log('Knowledge not found page rendered with locale:', locale);
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <KnowledgeIcon width={80} height={80} />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            {locale === 'ar' ? 'الرؤى غير موجودة' : 'Insights Not Found'}
          </h1>
          
          <p className="text-xl text-gray-500 mb-8">
            {locale === 'ar' 
              ? 'لم نتمكن من العثور على مورد المعرفة الذي تبحث عنه. ربما تمت إزالته أو إعادة تسميته أو أنه غير متاح مؤقتًا.'
              : 'We couldn\'t find the knowledge resource you\'re looking for. It may have been removed, renamed, or is temporarily unavailable.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = `/${locale}/home?search_type=knowledge`}
              variant="outline"
              color="blue"
              className="py-3 px-6"
            >
              {locale === 'ar' ? 'العودة' : 'Go Back'}
            </Button>
            
          
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 