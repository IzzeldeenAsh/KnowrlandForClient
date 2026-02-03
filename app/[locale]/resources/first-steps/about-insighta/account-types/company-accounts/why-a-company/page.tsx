import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar' || locale?.startsWith('ar-')

  return {
    title: isArabic ? 'لماذا شركة | إنسايتا' : 'Why a Company | Insighta',
    description: isArabic 
      ? 'تعرف على لماذا شركة'
      : 'Learn why a company',
  }
}

export default async function WhyACompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale?.startsWith('ar-')

  const companyAccountFeatures = isRTL
    ? [
        'إنشاء حساب باسم الشركة',
        'إضافة فريق عمل خاص بالشركة لرفع المحتوى',
        'إدارة مركزية للفريق',
        'تعزيز الوجود الرقمي وتسويق الخدمات',
      ]
    : [
        'Create a corporate profile',
        'Add and manage a team to upload content',
        'Control permissions and publishing from a central dashboard',
        'Strengthen digital presence and promote services through engagement',
      ]

  const whyCompanyBenefits = isRTL
    ? [
        'مصدر دخل إضافي شبه ثابت',
        'كفاءة عالية مقابل العوائد المتوقعة',
        'استثمار المخزون المعرفي',
        'إدارة مركزية للفريق',
        'حوكمة الأعمال الاستشارية (التسليم والإغلاق)',
      ]
    : [
        'Steady additional revenue stream',
        'Highly cost-efficient compared to expected returns',
        'Turn accumulated reports and studies into income-generating assets',
        'Centralized team management',
        'Enhanced digital visibility and brand authority',
        'Governed consulting delivery and payment framework (feature coming soon)',
      ]

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
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types/company-accounts`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'حسابات الشركات' : 'Company accounts'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-[#013175] font-bold" aria-current="page">
                  {isRTL ? 'لماذا شركة' : 'Why a Company'}
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
                  {isRTL ? 'حساب الشركة (Company Account)' : 'Company Accounts'}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]">
                  {locale === 'ar' ? 'مزايا الشركة' : 'Company Benefits'}
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
                  يمكن للشركات أيضاً إنشاء حسابات لنشر المعرفة المؤسسية وتحويلها إلى مصدر دخل مستدام.
                </>
              ) : (
                <>Businesses can create accounts to publish and monetize organizational knowledge.</>
              )}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {isRTL ? 'مع حساب الشركة يمكنك:' : 'With a company account, you can:'}
              </h3>
              <ul className="space-y-4">
                {companyAccountFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5" />
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {isRTL ? 'لماذا يعد حساب الشركة فرصة استثنائية؟' : 'Why a Company Account Is a Powerful Opportunity'}
              </h3>
              <ul className="space-y-4">
                {whyCompanyBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5" />
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">{item}</p>
                  </li>
                ))}
              </ul>

              <p className="text-gray-700 leading-relaxed pt-2">
                {isRTL ? (
                  <>
                    هذا مفيد جداً للشركات التي تمتلك سنوات من التقارير والدراسات والمستندات المخزّنة — ويمكنها أخيراً تحويلها إلى
                    أصول مدرّة للدخل بأقل تكلفة.
                  </>
                ) : (
                  <>
                    This is especially valuable for companies with years of stored knowledge that can finally generate sustainable
                    revenue with minimal cost.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
