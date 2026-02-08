import { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'لماذا إنسايتا | إنسايتا' : 'Why Insighta | Insighta',
    description: isArabic 
      ? 'اكتشف لماذا إنسايتا هي الخيار الأفضل'
      : 'Discover why Insighta is the best choice',
  }
}

export default async function WhyInsightaPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const t = (en: string, ar: string) => (isRTL ? ar : en)
  const imageAlign = isRTL ? 'ml-auto' : 'mr-auto'

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
                <li className="text-[#013175] font-bold" aria-current="page">
                  {locale === 'ar' ? 'لماذا إنسايتا' : 'Why Insighta'}
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
                  {t('Why Insighta', 'لماذا إنسايتا؟')}
                </h1>
                <h2
                  className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]"
                >
                  {t('The Best Choice', 'الخيار الأفضل')}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Main Content */}
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Introduction */}
            <div className="pb-6">
              <div className="prose prose-lg md:prose-xl max-w-none">
                <div
                  className={`text-gray-700 text-base md:text-lg lg:text-lg leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <span>
                    {t(
                      'Insighta gives you a flexible way to access high-value knowledge and connect with experts—without subscriptions, without waste, and with clearer quality signals before you buy.',
                      'إنسايتا تمنحك طريقة مرنة للوصول إلى معرفة عالية القيمة والتواصل مع الخبراء—بدون اشتراكات، بدون هدر، ومع أدوات تساعدك على التحقق من الجودة قبل الشراء.'
                    )}
                  </span>
                </div>
              </div>
            </div>

            <ul className={`space-y-10 md:space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
              <li className="flex flex-col gap-4 group">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[#013175]">{t('Pay-as-you-go – No Subscriptions', 'بدون اشتراكات – Pay as You Go')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('You only pay for what you buy. There are no monthly or annual commitments.', 'ادفع فقط مقابل ما تشتريه دون التزامات شهرية أو سنوية.')}
                  </p>
                </div>
                <Image
                  src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768900043/Group_13546_1_1_v35urv.png"
                  alt="Pay-as-you-go"
                  width={300}
                  height={150}
                  className={`mt-6 block ${imageAlign}`}
                  priority
                />
              </li>

              <li className="flex flex-col gap-4 group">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[#013175]">{t('Buy Only the Value You Need', 'اشترِ ما تحتاجه فقط')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t(
                      'Instead of paying large amounts for full reports just to access a few pages of information, you can buy only the exact content you need.',
                      'لا داعي لشراء تقارير كبيرة بمبالغ كبيرة للوصول لمعلومات محددة فقط.'
                    )}
                  </p>
                </div>
                <Image
                  src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768900304/New_Project_2_ovc7dk.png"
                  alt="Buy Only the Value You Need"
                  width={500}
                  height={150}
                  className={`mt-6 block ${imageAlign}`}
                  priority
                />
              </li>

              <li className="flex flex-col gap-4 group">
                <div className="space-y-5">
                  <h3 className="text-xl md:text-2xl font-bold text-[#013175]">{t('Verify Quality Before You Buy', 'تحقق من الجودة قبل الشراء')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t(
                      'You can request a meeting with the expert, read authentic buyer reviews, or ask the expert directly through the inquiry feature.',
                      'اتخذ قرارك بثقة عبر الأدوات التالية:'
                    )}
                  </p>
                  <ul className="space-y-6">
                    {(
                      isRTL
                        ? [
                            'اطلب اجتماعاً مع الخبير',
                            'اقرأ تقييمات حقيقية من مشترين فعليين',
                            'اسأل الخبير مباشرة عبر نافذة الاستفسارات',
                          ]
                        : [
                            'Request a meeting with the expert',
                            'Read authentic buyer reviews',
                            'Ask the expert directly through inquiries',
                          ]
                    ).map((item,index) => (
                      <li key={item} className={`flex gap-2 text-gray-800 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="mt-[0.45rem] h-2 w-2 rounded-full bg-gray-900/70 shrink-0" />
                     <div className="flex flex-col">
                     <div>
                     
                       <span className="leading-relaxed">{item}</span>
                       </div>
                        <div className="mt-4">
                        {index === 1 && (
                          <Image
                            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768903734/New_Project_3_ckdwlg.png"
                            alt={isRTL ? "توضيح تحقق الجودة" : "Verify Quality Before You Buy"}
                            width={600}
                            height={100}
                            className={`block ${imageAlign}`}
                            priority
                          />
                        )}
                        {index === 0 && (
                          <Image
                            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768904159/New_Project_5_eydjdz.png"
                            alt={isRTL ? "توضيح تحقق الجودة" : "Free and Easy Registration"}
                            width={600}
                            height={100}
                            className={`block ${imageAlign}`}
                            priority
                          />
                        )}
                        {index === 2 && (
                          <Image
                            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768904423/Group_13551_jhlfaz.png"
                            alt={isRTL ? "توضيح تحقق الجودة" : "Free and Easy Registration"}
                            width={600}
                            height={100}
                            className={`block ${imageAlign}`}
                            priority
                          />
                        )}
                        </div>
                     </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className="flex flex-col gap-4 group">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[#013175]">{t('Free and Easy Registration', 'تسجيل مجاني')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('Join easily using Gmail or LinkedIn.', 'انضم مجاناً عبر Gmail أو LinkedIn.')}</p>
                </div>
              </li>

              <li className="flex flex-col gap-4 group">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#013175]">{t('Full Flexibility for Publishers', 'مرونة كاملة')}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('Upload, price, and market your content the way that suits you.', 'ارفع، سعّر، وسوّق محتواك بالطريقة التي تناسبك.')}
                    </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768905644/Artboard_1_xajry5.png"
                    alt="Full Flexibility for Publishers"
                    width={700}
                    height={700}
                    className={`block ${imageAlign}`}
                    priority
                  />
                </div>
              </li>
            </ul>

            {/* Tip / CTA */}
            <div>
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
                        هل تريد معرفة المزيد؟ اطلع على{' '}
                        <a
                          href={`/${locale}/resources/first-steps/about-insighta/content-types`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          أنواع المحتوى المتاحة
                        </a>{' '}
                        للتعرّف على ما يمكنك شراؤه على المنصة.
                      </>
                    ) : (
                      <>
                        Want to learn more? Check out the{' '}
                        <a
                          href={`/${locale}/resources/first-steps/about-insighta/content-types`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          Types of Content Available
                        </a>{' '}
                        to see what you can buy on the platform.
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
