import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function RespondingToClientQuestionsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  const points = [
    t('Questions are visible to other clients', 'الأسئلة والإجابات مرئية للجميع'),
    t('Your responses help build credibility', 'الردود الواضحة تعزز الثقة والمصداقية'),
    t('Clear answers often lead to purchases or bookings', 'كثيرًا ما تؤدي الإجابات الجيدة إلى عمليات شراء أو حجز جلسات'),
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
            { label: t('Responding to Client Questions', 'الرد على أسئلة العملاء') },
          ]}
          title={t('Responding to Client Questions', 'الرد على أسئلة العملاء')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="mt-4 text-gray-700">
              {t('Clients may ask public questions on Insight pages.', 'يمكن للعملاء طرح أسئلة عامة عند معاينة المستند.')}
            </p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
