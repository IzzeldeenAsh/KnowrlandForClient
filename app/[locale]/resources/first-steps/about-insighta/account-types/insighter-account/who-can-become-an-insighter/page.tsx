import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar' || locale?.startsWith('ar-')

  return {
    title: isArabic ? 'من يمكنه أن ينضم  كـ إنسايتر ( خبير)' : 'Who Can Become an Insighta',
    description: isArabic 
      ? 'تعرف على من يمكنه أن يصبح إنسايتر'
      : 'Learn who can become an Insighter',
  }
}

export default async function WhoCanBecomeAnPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale?.startsWith('ar-')

  const enExamples = [
    {
      title: 'Market Researchers',
      description: 'Upload your market studies and reports and sell them to companies and investors who need reliable insight.',
    },
    {
      title: 'Industry & Technical Professionals',
      description: 'Share specialized technical knowledge, best practices, and problem-solving material from your field.',
    },
    {
      title: 'Corporate Employees',
      description:
        'If you have meaningful insight about products, competitors, or market trends, turn it into an additional income stream.',
    },
    {
      title: 'Consultants',
      description:
        'If your career has produced countless reports, studies, presentations, indicators, and data — monetize them instead of letting them sit unused.',
    },
    {
      title: 'Experts from Any Sector',
      description:
        'Industry, agriculture, tourism, economy, services, public sector and beyond — if you have structured, practical knowledge, Insighta helps you turn it into revenue.',
    },
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
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types/insighter-account`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'حساب الإنسايتر' : 'Insighter account'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-[#013175] font-bold" aria-current="page">
                  {isRTL ? 'من يمكنه أن ينضم كـ إنسايتر ( خبير)' : 'Who Can Become an Insighter'}
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
                  {isRTL ? 'من يمكنه أن ينضم كـ إنسايتر ( خبير)' : 'Who Can Become an Insighter'}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]">
                  {isRTL ? 'ابدأ رحلتك' : 'Start Your Journey'}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              {isRTL ? (
                <>
                  يمكن لأي شخص يملك معرفة ذات قيمة أن يكون <strong>Insighter</strong>. لا تحتاج لأن تكون مشهوراً أو تعمل في
                  شركة كبرى، يكفي أن تملك خبرة حقيقية في مجال معين.
                </>
              ) : (
                <>
                  You don&rsquo;t need to be famous or work for a large corporation to join. Anyone with valuable expertise
                  that others need can become an <strong>Insighter</strong>.
                </>
              )}
            </p>

            {isRTL ? (
              <>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">أمثلة:</h3>
                <ul className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {[
                    'باحث سوق',
                    'فني صناعي',
                    'موظف شركة',
                    'مستشار',
                    'أكاديمي أو باحث علمي',
                    'خبراء في السياحة، الزراعة، الاقتصاد، الصناعة، الخدمات، وغيرها',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5"></div>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  Examples – Who Can Join and What Can They Publish?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enExamples.map((ex) => (
                    <div key={ex.title} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7 min-h-[200px]">
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{ex.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{ex.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
