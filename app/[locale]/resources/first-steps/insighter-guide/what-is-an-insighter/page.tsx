import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'ما هو دور الخبير | إنسايتا' : 'What is an Insighter | Insighta',
    description: isArabic
      ? 'الخبير (Insighter) هو خبير متخصص ينشر المعرفة، يبيع المستندات الاحترافية، ويقدّم جلسات استشارية مدفوعة على منصة إنسايتا.'
      : 'An Insighter is a subject-matter expert who publishes knowledge, sells professional documents, and offers paid consulting sessions on Insighta.',
  }
}

export default async function WhatIsAnInsighterPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const capabilities = [
    t('Upload and sell documents (Insights)', 'رفع وبيع مستندات احترافية (Insights)'),
    t('Split insights into multiple priced files', 'تقسيم المستندات إلى عدة ملفات مُسعّرة'),
    t('Offer paid consulting sessions', 'تقديم جلسات استشارية مدفوعة'),
    t('Respond to client questions', 'الرد على أسئلة العملاء العامة'),
    t('Track sales and earnings', 'متابعة المبيعات والأرباح'),
    t('Withdraw earnings through your Wallet', 'سحب الأرباح عبر محفظة المنصة'),
  ]

  return (
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section - same style as "What is Insighta" */}
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <div className="relative overflow-hidden px-4 sm:px-12 py-8 md:py-20 mb-6 md:mb-8">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              transform: isRTL ? 'scaleX(-1)' : 'none',
              transformOrigin: 'center',
            }}
            aria-hidden="true"
          />
          {/* Brighter/less dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/20" aria-hidden="true" />

          <div className="relative z-10 px-4 sm:px-12">
            {/* Breadcrumbs */}
            <nav className={`mb-6 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-gray-700/80 flex-wrap">
                <li>
                  <a
                    href={`/${locale}/resources/first-steps`}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {t('First Steps', 'الخطوات الأولى')}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <a
                    href={`/${locale}/resources/first-steps/insighter-guide`}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {t('Insighter Guide', 'دليل الخبير')}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-gray-900 font-bold" aria-current="page">
                  {t('What is an Insighter', 'ما هو دور الخبير')}
                </li>
              </ol>
            </nav>

            {/* Hero Title Section */}
            <div className="text-center">
              <div
                className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`}
                style={{ lineHeight: '1.3' }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
                  {t('What is an Insighter?', 'ما هو دور الخبير (Insighter)؟')}
                </h1>
                <h2
                  className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent ${
                    isRTL ? 'bg-gradient-to-l from-blue-800 to-teal-600' : 'bg-gradient-to-r from-blue-500 to-teal-400'
                  }`}
                >
                  {t('Knowledge Creator & Consultant', 'منشئ معرفة ومستشار')}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Main Content */}
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
              {t(
                'An Insighter is a subject matter expert that publishes knowledge on the platform, answers clients’ published insight-related questions, and offers paid consulting sessions.',
                'الخبير (Insighter) هو خبير متخصص يعمل على نشر معرفة متخصصة عبر منصة Insighta، وبيع مستندات احترافية، إضافةً إلى تقديم جلسات استشارية مدفوعة.'
              )}
            </p>

            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {t('As an Insighter, you can:', 'بصفتك خبيرًا، يمكنك:')}
              </h2>
              <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700 text-base md:text-lg`}>
                {capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {t('Insighters can operate as individual experts or as company accounts.', 'يمكن التسجيل كخبير فردي أو كـ حساب شركة.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

