export default async function PricingAndFileStrategyGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const strategies = [
    t('Upload a single complete document', 'رفع مستند واحد كامل'),
    t('Split one Insight into multiple files', 'أو تقسيم الرؤية إلى عدة ملفات مستقلة'),
  ]

  const whySplit = [
    t('Clients may need only a specific section (e.g., charts or datasets)', 'قد يحتاج العميل إلى جزء محدد فقط (مثل الجداول أو الرسوم)'),
    t('Lower entry price improves accessibility', 'تخفيض سعر الدخول يزيد عدد المشترين المحتملين'),
    t('Increases purchase flexibility', 'يمنح العملاء حرية أكبر في الشراء'),
  ]

  return (
    <div
      className={`mx-auto max-w-5xl px-4 sm:px-6 py-10 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav className={`mb-6 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
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
            {t('Pricing & File Strategy', 'التسعير')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Pricing & File Strategy', 'التسعير')}
      </h1>

      <p className="mt-4 text-gray-700">
        {t(
          'Insighta gives you full control over how you package your knowledge.',
          'توفر Insighta مرونة كاملة في كيفية نشر وتسعير المعرفة.'
        )}
      </p>

      <p className="mt-6 text-gray-700">{t('You may:', 'يمكنك:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {strategies.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
        {t('Why Split Files?', 'لماذا تقسيم الملفات؟')}
      </h2>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {whySplit.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="mt-6 text-gray-700">
        {t(
          'This is a tool, not a requirement — the publishing strategy is entirely yours.',
          'هذا خيار استراتيجي متروك لك بالكامل.'
        )}
      </p>
    </div>
  )
}

