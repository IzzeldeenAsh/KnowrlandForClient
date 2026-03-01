import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function AiSummariesAndMetadataGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  const tips = [
    t('Review and edit the summary for accuracy', 'مراجعة الملخص وتعديله لضمان الدقة'),
    t('Keep it concise and informative', 'جعله واضحًا ومباشرًا'),
    t('Highlight what the client will gain', 'توضيح القيمة العملية التي سيحصل عليها العميل'),
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
            { label: t('AI Summaries & Metadata', 'ملخصات الذكاء الاصطناعي') },
          ]}
          title={t('AI Summaries & Metadata', 'ملخصات الذكاء الاصطناعي')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
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
        </div>
      </div>
    </div>
  )
}
