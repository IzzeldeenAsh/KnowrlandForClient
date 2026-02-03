import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar' || locale?.startsWith('ar-')

  return {
    title: isArabic ? 'قاعدتك المعرفية الرقمية   ' : 'Your Digital Knowledge Base',
    description: isArabic 
      ? 'تعرف على قاعدتك المعرفية الرقمية'
      : 'Learn about your digital knowledge base',
  }
}

export default async function YourDigitalKnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale?.startsWith('ar-')

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
            <nav className={`mb-6 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
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
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types/insighter-account`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'حساب الإنسايتر' : 'Insighter account'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-[#013175] font-bold" aria-current="page">
                  {locale === 'ar' ? 'قاعدتك المعرفية الرقمية' : 'Your Digital Knowledge Base'}
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
                  {locale === 'ar' ? 'قاعدتك المعرفية الرقمية' : 'Your Digital Knowledge Base'}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]">
                  {locale === 'ar' ? 'أصولك المعرفية الرقمية' : 'Your Digital Knowledge Assets'}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {isRTL ? (
                <>
                  حسابك على المنصة هو قاعدة معرفية رقمية خاصة بك، يمكنك من خلالها عرض وتسويق كافة أشكال معرفتك، وإتمام صفقاتك
                  الاستشارية في بيئة محوكمة واحترافية.
                </>
              ) : (
                <>
                  In today&rsquo;s knowledge economy, your expertise is one of your most valuable assets. Your Insighta
                  account becomes your personal digital knowledge hub — accessible anywhere, anytime. You can showcase
                  and sell reports, studies, indicators, business material, databases, and more, within a fully governed
                  and professional environment.
                </>
              )}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {isRTL
                  ? 'فكر جيداً: أنت تنشر بالمجان، لماذا لا تربح؟'
                  : 'Think About It: You Already Publish for Free — Why Not Earn from It?'}
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {isRTL ? (
                  <>
                    أنت تنشر أفكارك وبياناتك وحلولك يومياً على LinkedIn بالمجان. الآن يمكنك نشر نفس المحتوى على إنسايتا وفتح مصدر
                    دخل إضافي.
                  </>
                ) : (
                  <>
                    Every day you share valuable ideas on platforms like LinkedIn with no financial return. Now you can
                    publish the same kind of high-value knowledge on Insighta, set your price, and turn it into real
                    income.
                  </>
                )}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {isRTL ? (
                  <>فقط ارفع ملفاتك وحدد السعر وابدأ.</>
                ) : (
                  <>Just upload your files, set your price, and start earning.</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
