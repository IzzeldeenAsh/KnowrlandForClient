import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'شفافية إنسايتا | إنسايتا' : 'Insighta\'s Transparent | Insighta',
    description: isArabic 
      ? 'تعرف على شفافية إنسايتا'
      : 'Learn about Insighta\'s transparency',
  }
}

export default async function InsightasTransparentPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'

  return (
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <div className="relative overflow-hidden px-4 sm:px-12 py-8 md:py-24 mb-6 md:mb-8">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1770102117/pattern_lj3gmd.png')",
              transform: isRTL ? 'scaleX(-1)' : 'none',
              transformOrigin: 'center',
              backgroundPositionX: isRTL ? '1%' : '1%',
              backgroundSize: isRTL ? '95% 100%' : '100% 95%',
            }}
            aria-hidden="true"
          />
          {/* Brighter/less dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/20" aria-hidden="true" />

          <div className="relative z-10 px-4 sm:px-12">
            {/* Breadcrumbs */}
            <nav className={`mb-6 text-xs md:text-sm ps-6 md:ps-0 ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-gray-700/80 flex-wrap">
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
                <li>
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'أنواع الحسابات' : 'Account types'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types/client-account`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'حساب العميل' : 'Client account'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-[#013175] font-bold" aria-current="page">
                  {locale === 'ar' ? 'شفافية إنسايتا' : 'Insighta\'s Transparent'}
                </li>
              </ol>
            </nav>

            {/* Hero Title Section */}
            <div className="text-center ">
              <div
                className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`}
                style={{ lineHeight: '1.3' }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#013175]">
                  {locale === 'ar' ? 'شفافية إنسايتا' : 'Insighta\'s Transparent'}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]">
                  {locale === 'ar' ? 'الشفافية والوضوح' : 'Transparency and Clarity'}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              {locale === 'ar'
                ? 'إنسايتا تستبدل نموذج "الصندوق الأسود" بالوضوح الكامل:'
                : 'Insighta replaces the black-box approach with full clarity:'}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-50">
                    <th className={`border border-gray-200 px-4 py-3 font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {locale === 'ar' ? 'النموذج التقليدي' : 'Traditional Model'}
                    </th>
                    <th className={`border border-gray-200 px-4 py-3 font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {locale === 'ar' ? 'نموذج إنسايتا' : 'Insighta Model'}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'محتوى مغلق المصدر' : 'Closed content'}</span>
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          {locale === 'ar'
                            ? 'شفافية كاملة + ملخص تنفيذي ووصف منهجي'
                            : 'Full transparency + executive summary'}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'لا قناة تواصل مع المصدر' : 'No access to source'}</span>
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          {locale === 'ar'
                            ? 'إمكانية عقد اجتماع مع الناشر قبل الشراء'
                            : 'Direct communication with publisher'}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'محتوى معاد إنتاجه' : 'Recycled content'}</span>
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'محتوى أصلي من المصدر الأول مباشرة' : 'Original native content'}</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'التزامات مالية دورية' : 'Subscription fees'}</span>
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'الدفع عند الاستخدام (Pay-Per-Use)' : 'Pay only when you use'}</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'مُعدّ مجهول الهوية' : 'Anonymous publishers'}</span>
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'هوية موثقة ومسؤول عن المحتوى' : 'Verified identity'}</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'لا متابعة بعد الشراء' : 'No follow-up'}</span>
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{locale === 'ar' ? 'تحديثات استباقية وإشعارات فورية' : 'Proactive updates'}</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
