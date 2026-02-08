export default async function BecomingAnInsighterGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

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
    <div
      className={`mx-auto max-w-5xl px-4 sm:px-6 py-10 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav className={`mb-6 text-xs md:text-sm ps-6 md:ps-0 ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-gray-700/80 flex-wrap">
          <li>
            <a
              href={`/${locale}/resources/first-steps`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('First Steps', 'الخطوات الأولى')}
            </a>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <a
              href={`/${locale}/resources/first-steps/insighter-guide`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('Insighter Guide', 'دليل الخبير')}
            </a>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-900 font-bold" aria-current="page">
            {t('Becoming an Insighter', 'كيف تصبح خبيرًا')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Becoming an Insighter', 'كيف تصبح خبيرًا على Insighta؟')}
      </h1>

      <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
        {t('How to Become an Insighter', 'طرق الترقية إلى خبير')}
      </h2>
      <p className="mt-3 text-gray-700">{t('You can start the Insighter registration from:', 'يمكنك بدء التسجيل كخبير من أي من الطرق التالية:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {startFrom.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
        {t('Choose Your Insighter Type', 'اختيار نوع حساب الخبير')}
      </h2>
      <p className="mt-3 text-gray-700">{t('During registration, choose one of the following:', 'أثناء التسجيل، اختر أحد الخيارين:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {types.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="mt-6 text-gray-700">{t('Once completed, your Insighter Dashboard becomes available.', 'بعد الإكمال، ستصبح لوحة تحكم الخبير متاحة لك.')}</p>
    </div>
  )
}

