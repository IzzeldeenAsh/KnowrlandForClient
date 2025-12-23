import Link from 'next/link';

export default function GlobalNotFound() {
  // Render a static 404 page to allow prerendering/export without runtime hooks
  const locale = 'en';
  const isRTL = false;

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
              <span className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold cursor-pointer">
                {isRTL ? 'الصفحة الرئيسية' : 'Return Home'}
              </span>
            </Link>
            <Link href={`/${locale}/home`} passHref>
              <span className="inline-flex items-center justify-center rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 font-semibold cursor-pointer">
                {isRTL ? 'استكشف المحتوى' : 'Explore Content'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


