'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@mantine/core';
import Footer from '@/components/ui/footer';

export default function GlobalNotFound() {
  const pathname = usePathname();
  const firstSegment = pathname?.split('/')[1] || 'en';
  const locale = (firstSegment === 'ar' || firstSegment === 'en') ? firstSegment : 'en';
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-xl text-gray-500 mb-8">
            {isRTL
              ? 'الصفحة التي تبحث عنها غير متوفرة. قد تكون نُقلت أو حُذفت.'
              : 'The page you’re looking for isn’t available. It may have been moved or deleted.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}`} passHref>
              <Button variant="filled" color="blue" className="py-3 px-6">
                {isRTL ? 'الصفحة الرئيسية' : 'Return Home'}
              </Button>
            </Link>
            <Link href={`/${locale}/home`} passHref>
              <Button variant="outline" color="blue" className="py-3 px-6">
                {isRTL ? 'استكشف المحتوى' : 'Explore Content'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


