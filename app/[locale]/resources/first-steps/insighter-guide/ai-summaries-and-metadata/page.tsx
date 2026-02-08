export default async function AiSummariesAndMetadataGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const tips = [
    t('Review and edit the summary for accuracy', 'مراجعة الملخص وتعديله لضمان الدقة'),
    t('Keep it concise and informative', 'جعله واضحًا ومباشرًا'),
    t('Highlight what the client will gain', 'توضيح القيمة العملية التي سيحصل عليها العميل'),
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
            {t('AI Summaries & Metadata', 'ملخصات الذكاء الاصطناعي')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('AI Summaries & Metadata', 'ملخصات الذكاء الاصطناعي')}
      </h1>

      <p className="mt-4 text-gray-700">
        {t(
          'Insighta automatically generates a summary for each uploaded Insight.',
          'تقوم المنصة تلقائيًا بإنشاء ملخص لكل مستند.'
        )}
      </p>

      <p className="mt-6 text-gray-700">{t('You should:', 'ننصحك بـ:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {tips.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="mt-6 text-gray-700">
        {t(
          'Strong metadata (industry, tags, codes, target market) improves search visibility and conversion.',
          'البيانات الوصفية الدقيقة تُحسّن ظهور الرؤية في البحث وتزيد فرص البيع.'
        )}
      </p>
    </div>
  )
}

