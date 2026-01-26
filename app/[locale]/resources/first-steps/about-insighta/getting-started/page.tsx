import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'ما هي إنسايتا | إنسايتا' : 'What is Insighta | Insighta',
    description: isArabic 
      ? 'إنسايتا هي منصة رائدة في السوق الرقمي لاقتصاد المعرفة—حيث المعرفة هي الأصول الأكثر قيمة.'
      : 'Insighta is a leading digital marketplace in the knowledge economy—where knowledge is the most valuable asset.',
  }
}

export default async function GettingStartedPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'

  return (
    <div className="relative min-h-screen">
      {/* Hero Section - Similar to home page */}
      <div className="relative overflow-hidden pt-5 pb-16">
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className={`mb-6 md:mb-8 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
            <ol className={`flex items-center gap-2 text-gray-500 flex-wrap`}>
              <li>
                <a href={`/${locale}/resources/first-steps`} className="hover:text-gray-900 transition-colors">
                  {locale === 'ar' ? 'الخطوات الأولى' : 'First Steps'}
                </a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <a href={`/${locale}/resources/first-steps/about-insighta`} className="hover:text-gray-900 transition-colors">
                  {locale === 'ar' ? 'حول إنسايتا' : 'About Insighta'}
                </a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-gray-900" aria-current="page">
                {locale === 'ar' ? 'البدء' : 'Getting Started'}
              </li>
            </ol>
          </nav>

          {/* Hero Title Section */}
          <div className="text-center mb-2 md:mb-4">
            <div className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`} style={{lineHeight: '1.3'}}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {locale === 'ar' ? 'البدء' : 'Getting Started'}
              </h1>
            
            </div>
          </div>

          {/* Guide cards */}
          <div className="mt-8 md:mt-10" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className={`text-lg md:text-xl font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
              {locale === 'ar' ? 'اختر دليلك' : 'Choose your guide'}
            </h2>
            <p className={`mt-2 text-sm md:text-base text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
              {locale === 'ar'
                ? 'ابدأ بالدليل المناسب لك—للعملاء أو للخبراء (Insighters).'
                : 'Start with the guide that fits you—Client or Insighter.'}
            </p>

            <div className="mt-6 grid gap-4 md:gap-6 md:grid-cols-2">
              <a
                href={`/${locale}/resources/first-steps/client-guide/what-is-insighta`}
                className="group relative overflow-hidden rounded-md border border-gray-200 bg-white p-6 transition hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {/* subtle glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
                </div>

                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                 
                    <div className="space-y-1">
                      <div className="text-gray-900 text-xl font-semibold">
                        {locale === 'ar' ? 'دليل العميل' : 'Client Guide'}
                      </div>
                      <div className="text-gray-600">
                        {locale === 'ar'
                          ? 'تعرّف على كيفية الاستكشاف والشراء وإدارة تجربتك على المنصة.'
                          : 'Learn how to explore, purchase, and manage your experience.'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 text-gray-500 transition group-hover:text-gray-900" aria-hidden="true">
                    {isRTL ? '←' : '→'}
                  </div>
                </div>
              </a>

              <a
                href={`/${locale}/resources/first-steps/insighter-guide`}
                className="group relative overflow-hidden rounded-md border border-gray-200 bg-white p-6 transition hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {/* subtle glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                   
                    <div className="space-y-1">
                      <div className="text-gray-900 text-xl font-semibold">
                        {locale === 'ar' ? 'دليل الإنسايتر' : 'Insighter Guide'}
                      </div>
                      <div className="text-gray-600">
                        {locale === 'ar'
                          ? 'تعرّف على كيفية نشر وبيع المعرفة وإدارة الطلبات والاجتماعات.'
                          : 'Learn how to publish, sell, and manage orders and meetings.'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 text-gray-500 transition group-hover:text-gray-900" aria-hidden="true">
                    {isRTL ? '←' : '→'}
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
