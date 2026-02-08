import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'لماذا إنسايتا هي | إنسايتا' : 'Why Insighta is | Insighta',
    description: isArabic 
      ? 'اكتشف لماذا إنسايتا هي الخيار الأفضل'
      : 'Discover why Insighta is the best choice',
  }
}

export default async function WhyInsightaIsPage({ params }: { params: Promise<{ locale: string }> }) {
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
                  <a href={`/${locale}/resources/first-steps`} className="hover:text-[#013175] transition-colors">
                    {locale === 'ar' ? 'الخطوات الأولى' : 'First Steps'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <a href={`/${locale}/resources/first-steps/about-insighta`} className="hover:text-[#013175] transition-colors">
                    {locale === 'ar' ? 'حول إنسايتا' : 'About Insighta'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types`} className="hover:text-[#013175] transition-colors">
                    {locale === 'ar' ? 'أنواع الحسابات' : 'Account types'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types/client-account`} className="hover:text-[#013175] transition-colors">
                    {locale === 'ar' ? 'حساب العميل' : 'Client account'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-[#013175] font-bold" aria-current="page">
                  {locale === 'ar' ? 'لماذا إنسايتا هي' : 'Why Insighta is'}
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
                  {locale === 'ar' ? 'لماذا إنسايتا هي' : 'Why Insighta is'}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]">
                  {locale === 'ar' ? 'المنصة الرائدة' : 'The Leading Platform'}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              {locale === 'ar' ? (
                <>
                  تعمل معظم منصات المعرفة التقليدية مثل <strong>"الصندوق الأسود"</strong> — تدفع قبل أن تعرف مدى{' '}
                  <strong>موثوقية المحتوى</strong>، مع شفافية قليلة حول <strong>مصادر البيانات</strong> أو{' '}
                  <strong>المنهجية</strong>. هذا يخلق تحديات مثل:
                </>
              ) : (
                <>
                  Most traditional knowledge platforms operate like a <strong>&quot;black box&quot;</strong>—you pay
                  before knowing how reliable the content is, with little transparency about <strong>data sources</strong>{' '}
                  or <strong>methodology</strong>. This creates challenges such as:
                </>
              )}
            </p>

            {locale === 'ar' && (
              <h3 className="text-xl md:text-2xl font-bold text-[#013175] mb-6">
                تحديات نموذج السوق التقليدي (Black Box Model):
              </h3>
            )}

            <ul className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <li className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5"></div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-[#013175] transition-colors">
                  {locale === 'ar' ? (
                    <>
                      انعدام <strong>الشفافية المنهجية</strong>
                    </>
                  ) : (
                    <>
                      Lack of <strong>methodological transparency</strong>
                    </>
                  )}
                </p>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5"></div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-[#013175] transition-colors">
                  {locale === 'ar' ? (
                    <>
                      التقارير تُنتج <strong>داخلياً</strong> دون الإفصاح عن <strong>المصادر</strong> أو{' '}
                      <strong>المنهجية</strong>
                    </>
                  ) : (
                    <>
                      Reports produced <strong>internally</strong> without disclosing <strong>sources</strong> or{' '}
                      <strong>methodology</strong>
                    </>
                  )}
                </p>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5"></div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-[#013175] transition-colors">
                  {locale === 'ar' ? (
                    <>
                      <strong>الالتزام المالي</strong> يسبق الاطلاع على المحتوى
                    </>
                  ) : (
                    <>
                      <strong>Financial commitment</strong> before evaluating content
                    </>
                  )}
                </p>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5"></div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-[#013175] transition-colors">
                  {locale === 'ar' ? (
                    <>
                      غياب <strong>المساءلة</strong> عن دقة وجودة المحتوى
                    </>
                  ) : (
                    <>
                      No clear <strong>accountability</strong> for accuracy
                    </>
                  )}
                </p>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5"></div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-[#013175] transition-colors">
                  {locale === 'ar' ? (
                    <>
                      استحالة <strong>التواصل المباشر</strong> مع معدّي التقارير
                    </>
                  ) : (
                    <>
                      No <strong>direct communication</strong> with content creators
                    </>
                  )}
                </p>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5"></div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-[#013175] transition-colors">
                  {locale === 'ar' ? (
                    <>
                      جميع المخرجات تُنسب للمنصة كـ <strong>علامة بيضاء</strong> (White Label)
                    </>
                  ) : (
                    <>
                      <strong>Anonymous white-label</strong> content
                    </>
                  )}
                </p>
              </li>
            </ul>

            {/* TIP Box - Link to how Insighta fixes this */}
            <div className="mt-12">
              <div
                className={`bg-white border border-gray-300 rounded-md overflow-hidden relative ${isRTL ? 'pl-0 pr-4' : 'pl-4 pr-0'}`}
                style={{
                  borderLeft: isRTL ? '1px solid #d1d5db' : '4px solid #2563eb',
                  borderRight: isRTL ? '4px solid #2563eb' : '1px solid #d1d5db',
                  borderTop: '1px solid #d1d5db',
                  borderBottom: '1px solid #d1d5db',
                }}
              >
                <div className="p-4 md:p-5">
                  <p className={`text-gray-700 text-sm md:text-base leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? (
                      <>
                        إنسايتا قامت <strong>بحل هذه التحديات</strong> عبر نموذج{' '}
                        <a
                          href={`/${locale}/resources/first-steps/about-insighta/account-types/client-account/insightas-transparent`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          شفاف وواضح
                        </a>
                        . تعرّف على كيف تعمل المنصة.
                      </>
                    ) : (
                      <>
                        Insighta <strong>fixes these challenges</strong> through a{' '}
                        <a
                          href={`/${locale}/resources/first-steps/about-insighta/account-types/client-account/insightas-transparent`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          transparent model
                        </a>
                        . See how it works.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
