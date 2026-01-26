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

