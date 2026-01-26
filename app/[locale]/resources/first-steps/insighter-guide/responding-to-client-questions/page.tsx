export default async function RespondingToClientQuestionsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const points = [
    t('Questions are visible to other clients', 'الأسئلة والإجابات مرئية للجميع'),
    t('Your responses help build credibility', 'الردود الواضحة تعزز الثقة والمصداقية'),
    t('Clear answers often lead to purchases or bookings', 'كثيرًا ما تؤدي الإجابات الجيدة إلى عمليات شراء أو حجز جلسات'),
  ]

  return (
    <div
      className={`mx-auto max-w-5xl px-4 sm:px-6 py-10 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Responding to Client Questions', 'الرد على أسئلة العملاء')}
      </h1>

      <p className="mt-4 text-gray-700">
        {t(
          'Clients may ask public questions on Insight pages.',
          'يمكن للعملاء طرح أسئلة عامة عند معاينة المستند.'
        )}
      </p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {points.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

