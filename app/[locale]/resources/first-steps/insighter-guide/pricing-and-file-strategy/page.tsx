import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function PricingAndFileStrategyGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

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
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <InsighterGuideHero
          isRTL={isRTL}
          breadcrumbs={[
            { label: t('First Steps', 'الخطوات الأولى'), href: `/${locale}/resources/first-steps` },
            { label: t('Insighter Guide', 'دليل الخبير'), href: `/${locale}/resources/first-steps/insighter-guide` },
            { label: t('Pricing & File Strategy', 'التسعير') },
          ]}
          title={t('Pricing & File Strategy', 'التسعير')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
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
              {t('This is a tool, not a requirement — the publishing strategy is entirely yours.', 'هذا خيار استراتيجي متروك لك بالكامل.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
