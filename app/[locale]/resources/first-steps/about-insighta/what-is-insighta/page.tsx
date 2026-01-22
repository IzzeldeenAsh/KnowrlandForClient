import type { Metadata } from 'next'
import KnowledgeEconomy from './knowledge-economy'
import SecurePlatform from './secure-platform'

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

export default async function WhatIsInsightaPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'

  return (
    <div className="relative min-h-screen">
      {/* Hero Section - Similar to home page */}
      <div className="relative overflow-hidden pb-16">
           {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
           <div className="relative overflow-hidden px-4 sm:px-12 py-8 md:py-20 mb-6 md:mb-8">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1769062659/New_Project_11_qcbplb.png')",
              }}
              aria-hidden="true"
            />
            {/* Brighter/less dark overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/20"
              aria-hidden="true"
            />

            <div className="relative z-10 px-4 sm:px-12">
              {/* Breadcrumbs */}
              <nav
                className={`mb-6 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
                aria-label="Breadcrumb"
              >
                <ol className="flex items-center gap-2 text-gray-700/80 flex-wrap">
                  <li>
                    <a
                      href={`/${locale}/resources/first-steps`}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {locale === 'ar' ? 'الخطوات الأولى' : 'First Steps'}
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400">/</span>
                  </li>
                  <li>
                    <a
                      href={`/${locale}/resources/first-steps/about-insighta`}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {locale === 'ar' ? 'حول إنسايتا' : 'About Insighta'}
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400">/</span>
                  </li>
                  <li className="text-gray-900 font-bold" aria-current="page">
                    {locale === 'ar' ? 'ما هي إنسايتا' : 'What is Insighta'}
                  </li>
                </ol>
              </nav>

              {/* Hero Title Section */}
              <div className="text-center ">
                <div
                  className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`}
                  style={{ lineHeight: '1.3' }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
                    {locale === 'ar' ? 'ما هي إنسايتا' : 'What is Insighta'}
                  </h1>
                  <h2
                    className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent ${
                      isRTL
                        ? 'bg-gradient-to-l from-blue-800 to-teal-600'
                        : 'bg-gradient-to-r from-blue-500 to-teal-400'
                    }`}
                  >
                    {locale === 'ar' ? 'منصة المعرفة الرائدة' : 'Leading Knowledge Platform'}
                  </h2>
                </div>
              </div>
            </div>
          </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
       
          {/* Main Content */}
          <div className={`max-w-5xl px-8 sm:px-16  space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="prose prose-lg max-w-none">
              <div className={`text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {locale === 'ar' ? (
                  <>
                    <span>
                      <b>إنسايتا</b> هي منصة متخصصة ورائدة في <b>اقتصاد المعرفة</b>، حيث تعد المعرفة الأصل الأكثر قيمة.
                      <br />
                      توفر إنسايتا <b>سوقًا رقمية متقدمة</b> لشراء وبيع محتوى الأعمال عالي القيمة مثل التقارير، المؤشرات، الدراسات، التحليلات، ورؤى الخبراء.
                      <br />
                      كما تربط المنصة <b>منشئي المعرفة</b> بمن يحتاج إليها في بيئة <b>آمنة</b> و<b>موثوقة</b> و<b>فعالة</b>.
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <b>Insighta</b> is a leading digital marketplace in the <b>knowledge economy</b>—where knowledge is the most valuable asset.
                      <br />
                      It is a <b>specialized platform</b> for buying and selling <b>high-value business content</b> including reports, indicators, studies, analytics, and expert insights.
                      <br />
                      The platform connects <b>knowledge creators</b> with those who need that knowledge, in a <b>trusted</b> and <b>efficient</b> environment.
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Additional Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="flex gap-4">
               <KnowledgeEconomy />
               <div>
               <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'اقتصاد المعرفة' : 'Knowledge Economy'}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' 
                    ? 'في عالم اليوم، أصبحت المعرفة والرؤى الأصول الأكثر قيمة للشركات والمهنيين.'
                    : 'Today, knowledge and insights are the top assets for businesses and professionals.'
                  }
                </p>
               </div>
               </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
              <SecurePlatform />
              <div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'منصة متخصصة' : 'Specialized Platform'}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' 
                    ? 'نحن نربط بين منشئي المعرفة والمحتاجين إليها في بيئة آمنة وموثوقة.'
                    : 'We connect knowledge creators with those who need it in a secure and trusted environment.'
                  }
                </p>
                </div>
              </div>
              </div>
            </div>

            {/* TIP Box - Encourage user to go to next link */}
            <div className="mt-12">
              <div className={`bg-white border border-gray-300 rounded-md overflow-hidden relative ${isRTL ? 'pl-0 pr-4' : 'pl-4 pr-0'}`} style={{ 
                borderLeft: isRTL ? '1px solid #d1d5db' : '4px solid #2563eb',
                borderRight: isRTL ? '4px solid #2563eb' : '1px solid #d1d5db',
                borderTop: '1px solid #d1d5db',
                borderBottom: '1px solid #d1d5db'
              }}>
                <div className="p-4 md:p-5">
                  <p className={`text-gray-700 text-sm md:text-base leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {locale === 'ar' ? (
                      <>هل تريد معرفة المزيد؟ يمكنك الاطلاع على{' '}
                        <a 
                          href={`/${locale}/resources/first-steps/about-insighta/content-types`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          أنواع المحتوى المتاحة
                        </a>
                        {' '}للتعرف على المحتوى المتوفر على المنصة.</>
                    ) : (
                      <>Want to learn more? Check out the{' '}
                        <a 
                          href={`/${locale}/resources/first-steps/about-insighta/content-types`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          Types of Content Available
                        </a>
                        {' '}to learn about the content available on the platform.</>
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
