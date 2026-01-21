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
    <div className="relative min-h-screen">
      <div className="relative overflow-hidden pt-5 pb-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
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
            </ol>
          </nav>

          <div className="text-center mb-12 md:mb-16">
            <div className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`} style={{lineHeight: '1.3'}}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {locale === 'ar' ? 'شفافية إنسايتا' : 'Insighta\'s Transparent'}
              </h1>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-500 to-teal-400' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}>
                {locale === 'ar' ? 'الشفافية والوضوح' : 'Transparency and Clarity'}
              </h2>
            </div>
          </div>

          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
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
