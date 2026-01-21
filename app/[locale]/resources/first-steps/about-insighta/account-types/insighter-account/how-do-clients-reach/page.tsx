import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar' || locale?.startsWith('ar-')

  return {
    title: isArabic ? 'كيف يصل العملاء | إنسايتا' : 'How Do Clients Reach | Insighta',
    description: isArabic 
      ? 'تعرف على كيفية وصول العملاء إليك'
      : 'Learn how clients can reach you',
  }
}

export default async function HowDoClientsReachPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale?.startsWith('ar-')

  const channels = isRTL
    ? [
        { title: 'تحسين محركات البحث (SEO)', description: 'تظهر منشوراتك في نتائج البحث عند استخدام كلمات مفتاحية مناسبة.' },
        { title: 'التسويق المباشر للمنصة', description: 'يتم الترويج لإنسايتا عبر الحملات الرقمية والقنوات المختلفة باستمرار.' },
        { title: 'شبكة علاقات واسعة', description: 'شبكة شركاء وعلاقات عامة وخاصة تساعد في الوصول لفئات مستهدفة.' },
        { title: 'مشاركتك الشخصية للمحتوى', description: 'كلما شاركت روابط محتواك عبر قنواتك زاد الوصول.' },
        { title: 'دعم المؤثرين والناشطين', description: 'نشاطك وحضورك الرقمي يعزّز ظهورك ويزيد التفاعل.' },
      ]
    : [
        {
          title: 'Search Engine Optimization (SEO)',
          description: 'The platform is built with advanced SEO, helping your content appear in top search results.',
        },
        {
          title: 'Direct Platform Marketing',
          description: 'Insighta is continuously promoted through social media and outreach campaigns.',
        },
        {
          title: 'Strategic Network Access',
          description: 'A wide network of public and private partners helps reach targeted users.',
        },
        {
          title: 'Your Own Promotion',
          description: 'Share your content links through your own social channels.',
        },
        {
          title: 'Influencer Support',
          description: 'If you are active online, your presence boosts visibility even more.',
        },
      ]

  return (
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
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
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-gray-900" aria-current="page">
                {isRTL ? 'كيف يصل العملاء' : 'How Do Clients Reach'}
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12 md:mb-16">
            <div className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{lineHeight: '1.3'}}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {isRTL ? 'كيف يصل العملاء إلى محتواك؟' : 'How Do Clients Reach Your Content?'}
              </h1>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-500 to-teal-400' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}>
                {locale === 'ar' ? 'تواصل العملاء' : 'Client Connection'}
              </h2>
            </div>
          </div>

          <div className={`max-w-4xl space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {isRTL ? (
                <>
                  تضمن إنسايتا وصول محتواك إلى الجمهور المناسب عبر أكثر من قناة — من تحسين محركات البحث إلى التسويق المباشر وشبكة
                  العلاقات، بالإضافة إلى دورك الشخصي في مشاركة المحتوى.
                </>
              ) : (
                <>Insighta ensures your work reaches the right audience through multiple channels.</>
              )}
            </p>

            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm p-5 md:p-7">
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="text-gray-900">
                      <th className={`pb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'القناة' : 'Channel'}</th>
                      <th className={`pb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'كيف تساعدك' : 'How It Helps'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {channels.map((c) => (
                      <tr key={c.title} className="border-t border-gray-200">
                        <td className="py-3 font-semibold text-gray-900 align-top">{c.title}</td>
                        <td className="py-3 align-top">{c.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
