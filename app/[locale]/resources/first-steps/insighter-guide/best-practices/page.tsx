import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function BestPracticesGuidePage({
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
    t('Write clear, outcome-focused summaries', 'اكتب ملخصات واضحة تركز على النتائج'),
    t('Use accurate industries and tags', 'تأكد من دقة المجالات والوسوم'),
    t('Price files strategically', 'فكّر استراتيجيًا في تسعير الملفات'),
    t('Answer questions promptly', 'أجب على الأسئلة بسرعة واحترافية'),
    t('Offer meetings for deeper engagement', 'فعّل الجلسات للتفاعل المباشر'),
    t('Keep insights updated when possible', 'حدّث المحتوى عند الحاجة'),
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
            { label: t('Best Practices', 'أفضل الممارسات') },
          ]}
          title={t('Best Practices for Successful Insighters', 'أفضل الممارسات للنجاح')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <ul className={`mt-6 space-y-2 list-disc ${listPad} text-gray-700`}>
              {tips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
