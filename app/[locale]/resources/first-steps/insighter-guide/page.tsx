export default async function InsighterGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const capabilities = [
    t('Upload and sell documents (Insights)', 'رفع وبيع مستندات احترافية (Insights)'),
    t('Split insights into multiple priced files', 'تقسيم المستندات إلى عدة ملفات مُسعّرة'),
    t('Offer paid consulting sessions', 'تقديم جلسات استشارية مدفوعة'),
    t('Respond to client questions', 'الرد على أسئلة العملاء العامة'),
    t('Track sales and earnings', 'متابعة المبيعات والأرباح'),
    t('Withdraw earnings through your Wallet', 'سحب الأرباح عبر محفظة المنصة'),
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
          <li className="text-gray-900 font-bold" aria-current="page">
            {t('Insighter Guide', 'دليل الخبير')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('What is an Insighter?', 'ما هو دور الخبير (Insighter)؟')}
      </h1>

      <p className="mt-4 text-gray-700">
        {t(
          'An Insighter is a subject matter expert that publishes knowledge on the platform, answers clients’ published insight-related questions, and offers paid consulting sessions.',
          'الخبير (Insighter) هو خبير متخصص يعمل على نشر معرفة متخصصة عبر منصة Insighta، وبيع مستندات احترافية، إضافةً إلى تقديم جلسات استشارية مدفوعة.'
        )}
      </p>

      <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
        {t('As an Insighter, you can:', 'بصفتك خبيرًا، يمكنك:')}
      </h2>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {capabilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="mt-6 text-gray-700">
        {t(
          'Insighters can operate as individual experts or as company accounts.',
          'يمكن التسجيل كخبير فردي أو كـ حساب شركة.'
        )}
      </p>
    </div>
  )
}

