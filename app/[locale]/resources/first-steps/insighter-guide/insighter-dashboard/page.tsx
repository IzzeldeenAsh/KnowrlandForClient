export default async function InsighterDashboardGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const items = [
    t('Add and manage Insights', 'إضافة وإدارة المستندات'),
    t('View sales and earnings', 'متابعة المبيعات والأرباح'),
    t('Manage meetings', 'إدارة الجلسات الاستشارية'),
    t('Access your Wallet', 'الوصول إلى المحفظة'),
    t('(For companies) manage team activity', '(لحسابات الشركات) متابعة نشاط الفريق'),
  ]

  return (
    <div
      className={`mx-auto max-w-5xl px-4 sm:px-6 py-10 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Insighter Dashboard', 'لوحة تحكم الخبير — المناطق الأساسية')}
      </h1>

      <p className="mt-4 text-gray-700">{t('Your dashboard is your operational center.', 'لوحة التحكم هي مركز إدارتك اليومي.')}</p>

      <p className="mt-6 text-gray-700">{t('From here, you can:', 'من خلالها يمكنك:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

