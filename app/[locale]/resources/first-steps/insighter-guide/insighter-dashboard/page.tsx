import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function InsighterDashboardGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  const items = [
    t('Add and manage Insights', 'إضافة وإدارة المستندات'),
    t('View sales and earnings', 'متابعة المبيعات والأرباح'),
    t('Manage meetings', 'إدارة الجلسات الاستشارية'),
    t('Access your Wallet', 'الوصول إلى المحفظة'),
    t('(For companies) manage team activity', '(لحسابات الشركات) متابعة نشاط الفريق'),
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
            { label: t('Insighter Dashboard', 'لوحة تحكم الخبير') },
          ]}
          title={t('Insighter Dashboard', 'لوحة تحكم الخبير — المناطق الأساسية')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="mt-4 text-base md:text-lg lg:text-xl leading-relaxed font-bold text-gray-700">
              {t('Your dashboard is your operational center.', 'لوحة التحكم هي مركز إدارتك اليومي.')}
            </p>
            <p className="mt-6 text-gray-700">{t('From here, you can:', 'من خلالها يمكنك:')}</p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
