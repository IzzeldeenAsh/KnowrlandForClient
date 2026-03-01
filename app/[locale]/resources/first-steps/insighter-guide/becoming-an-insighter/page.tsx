import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function BecomingAnInsighterGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  const startFrom = [
    t('Home page → Become an Insighter', 'الصفحة الرئيسية → كن خبيرًا (Become an Insighter)'),
    t('Profile menu → Become an Insighter', 'قائمة الملف الشخصي → كن خبيرًا'),
    t('Dashboard → Add Insight', 'لوحة التحكم → إضافة مستند (Add Insight)'),
  ]

  const types = [
    t('Individual Insighter — for solo professionals', 'خبير فردي — للمحترفين المستقلين'),
    t('Company Insighter — for organizations publishing under a company name', 'خبير شركة — للمؤسسات التي تنشر المحتوى باسم الشركة'),
  ]

  return (
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <InsighterGuideHero
          isRTL={isRTL}
          breadcrumbs={[
            { label: t('First Steps', 'الخطوات الأولى'), href: `/${locale}/resources/first-steps` },
            { label: t('Insighter Guide', 'دليل الخبير'), href: `/${locale}/resources/first-steps/insighter-guide` },
            { label: t('Becoming an Insighter', 'كيف تصبح خبيرًا') },
          ]}
          title={t('Becoming an Insighter', 'كيف تصبح خبيرًا على Insighta؟')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
              {t('How to Become an Insighter', 'طرق الترقية إلى خبير')}
            </h2>
            <p className="mt-3 text-gray-700">
              {t('You can start the Insighter registration from:', 'يمكنك بدء التسجيل كخبير من أي من الطرق التالية:')}
            </p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {startFrom.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
              {t('Choose Your Insighter Type', 'اختيار نوع حساب الخبير')}
            </h2>
            <p className="mt-3 text-gray-700">
              {t('During registration, choose one of the following:', 'أثناء التسجيل، اختر أحد الخيارين:')}
            </p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {types.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-6 text-gray-700">
              {t('Once completed, your Insighter Dashboard becomes available.', 'بعد الإكمال، ستصبح لوحة تحكم الخبير متاحة لك.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
