import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar' || locale?.startsWith('ar-')

  return {
    title: isArabic ? 'ركائز الثقة في | إنسايتا' : 'Pillars of Trust in | Insighta',
    description: isArabic 
      ? 'تعرف على ركائز الثقة في إنسايتا'
      : 'Learn about the pillars of trust in Insighta',
  }
}

export default async function PillarsOfTrustPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale?.startsWith('ar-')

  const pillars = isRTL
    ? [
        {
          title: 'العناية الواجبة قبل الشراء',
          bullets: [
            'ملخص تنفيذي شامل',
            'توضيح المنهجية والمصادر والإطار الزمني للبيانات',
            'جلسات استفسار مع الناشر للتحقق من دقة البيانات',
          ],
          note: 'هذا المستوى من التحقق قبل الشراء غير متاح على المنصات التقليدية.',
        },
        {
          title: 'أصالة المحتوى وحوكمته',
          bullets: [
            'محتوى أصلي غير معاد تدويره',
            'حماية كاملة لحقوق الملكية الفكرية',
            'مساءلة مباشرة لكل ناشر عن محتواه',
          ],
        },
        {
          title: 'التحقق من مصداقية الناشر',
          bullets: [
            'مراجعات حقيقية من مشترين فعليين',
            'مؤشر سمعة تراكمي',
            'الاطلاع على سجل النشاط والتخصصات',
          ],
        },
        {
          title: 'نموذج تسعير شفاف',
          bullets: [
            'بدون اشتراكات شهرية أو سنوية',
            'بدون رسوم مخفية',
            'الدفع مقابل القيمة',
            'أفضل عائد على الاستثمار',
          ],
        },
        {
          title: 'المتابعة والتحديثات المستمرة',
          bullets: [
            'إشعارات فورية',
            'تحديثات على المحتوى الذي اشتريته',
            'اكتشاف محتوى جديد في مجالات اهتمامك',
          ],
        },
      ]
    : [
        {
          title: 'Pre‑purchase Due Diligence',
          bullets: [
            'Executive summary',
            'Clear research methodology & timelines',
            'Option to meet the publisher to verify data and discuss insights',
          ],
          note: 'This level of pre‑purchase verification is not available on traditional platforms.',
        },
        {
          title: 'Authenticity & Content Governance',
          bullets: [
            'Original, non‑recycled content',
            'Strong IP protection',
            'Direct accountability of each publisher',
          ],
        },
        {
          title: 'Publisher Credibility',
          bullets: [
            'Real customer reviews',
            'Reputation score',
            'Public publishing track record',
          ],
        },
        {
          title: 'Transparent Pricing',
          bullets: [
            'No subscriptions',
            'No hidden fees',
            'Pay only for the value you need',
            'Best ROI in a governed environment',
          ],
        },
        {
          title: 'Continuous Updates & Follow‑Up',
          bullets: [
            'Real‑time notifications',
            'Updates on purchased content',
            'Alerts for new relevant content',
          ],
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
                  <a href={`/${locale}/resources/first-steps/about-insighta/account-types/client-account`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'حساب العميل' : 'Client account'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-[#013175] font-bold" aria-current="page">
                  {isRTL ? 'ركائز الثقة في' : 'Pillars of Trust in'}
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
                  {isRTL ? 'ركائز الثقة في' : 'Pillars of Trust in'}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]">
                  {isRTL ? 'بناء الثقة' : 'Building Trust'}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
              {isRTL
                ? 'بُنيت إنسايتا على نموذج ثقة واضح يضمن للمشتري التحقق والشفافية والمساءلة قبل وبعد الشراء.'
                : 'Insighta is built on a trust-first model that ensures verification, transparency, and accountability before and after purchase.'}
            </p>

            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {pillars.map((pillar, idx) => (
                <div key={pillar.title} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
                  <div dir={isRTL ? 'rtl' : 'ltr'} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                        {pillar.title}
                      </h3>

                      <ul dir={isRTL ? 'rtl' : 'ltr'} className="space-y-3 text-gray-700 text-base md:text-lg leading-relaxed">
                        {pillar.bullets.map((b) => (
                          <li dir={isRTL ? 'rtl' : 'ltr'} key={b} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {pillar.note && (
                        <div className="mt-5">
                          <div
                            className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${isRTL ? 'text-right' : 'text-left'}`}
                          >
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                              {pillar.note}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="mt-10">
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
                        في إنسايتا أنت لا تشتري صندوقاً أسود مجهول المحتوى، بل تستثمر في محتوى معرفي شفاف بهوية موثقة
                        وتسعير عادل وبعد إجراء العناية الواجبة الكاملة، بما يضمن أفضل قيمة مقابل استثمارك.
                      </>
                    ) : (
                      <>
                        With Insighta, you&rsquo;re not buying a mystery box. You&rsquo;re investing in transparent,
                        verified, high-value expert knowledge—with fair pricing, full visibility, and strong
                        accountability.
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
