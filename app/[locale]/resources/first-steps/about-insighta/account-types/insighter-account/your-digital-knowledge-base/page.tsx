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
      <div className="relative overflow-hidden pt-5 pb-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <nav className={`mb-6 md:mb-8 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
            <ol
              dir={isRTL ? 'rtl' : 'ltr'}
              className={`flex items-center gap-2 text-gray-500 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}
            >
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
            <div className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{lineHeight: '1.3'}}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {locale === 'ar' ? 'قاعدتك المعرفية الرقمية' : 'Your Digital Knowledge Base'}
              </h1>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-500 to-teal-400' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}>
                {locale === 'ar' ? 'أصولك المعرفية الرقمية' : 'Your Digital Knowledge Assets'}
              </h2>
            </div>
          </div>

          <div className={`max-w-4xl space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
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
