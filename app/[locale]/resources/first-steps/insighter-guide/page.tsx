import { InsighterGuideHero } from './_components/InsighterGuideHero'

export default async function InsighterGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  const capabilities = [
    t('Upload and sell documents (Insights)', 'رفع وبيع مستندات احترافية (Insights)'),
    t('Split insights into multiple priced files', 'تقسيم المستندات إلى عدة ملفات مُسعّرة'),
    t('Offer paid consulting sessions', 'تقديم جلسات استشارية مدفوعة'),
    t('Respond to client questions', 'الرد على أسئلة العملاء العامة'),
    t('Track sales and earnings', 'متابعة المبيعات والأرباح'),
    t('Withdraw earnings through your Wallet', 'سحب الأرباح عبر محفظة المنصة'),
  ]

  return (
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <InsighterGuideHero
          isRTL={isRTL}
          breadcrumbs={[
            { label: t('First Steps', 'الخطوات الأولى'), href: `/${locale}/resources/first-steps` },
            { label: t('Insighter Guide', 'دليل الخبير') },
          ]}
          title={t('Insighter Guide', 'دليل الخبير')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
              {t(
                'An Insighter is a subject matter expert that publishes knowledge on the platform, answers clients’ published insight-related questions, and offers paid consulting sessions.',
                'الخبير (Insighter) هو خبير متخصص يعمل على نشر معرفة متخصصة عبر منصة Insighta، وبيع مستندات احترافية، إضافةً إلى تقديم جلسات استشارية مدفوعة.'
              )}
            </p>

            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {t('As an Insighter, you can:', 'بصفتك خبيرًا، يمكنك:')}
              </h2>
              <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700 text-base md:text-lg`}>
                {capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {t('Insighters can operate as individual experts or as company accounts.', 'يمكن التسجيل كخبير فردي أو كـ حساب شركة.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
