import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function CompanyAccountsAndTeamActivityGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  const teamVisibility = [
    t('View team members', 'عرض أعضاء الفريق'),
    t('See published insights per Insighter', 'الاطلاع على المستندات المنشورة حسب كل خبير'),
    t('See meetings held by each team member', 'مراجعة الجلسات التي تم تنفيذها'),
  ]

  const publishingRequests = [
    t('A request appears under My Requests', 'يظهر الطلب في طلباتي'),
    t('The company reviews and approves before publication', 'تتم مراجعته والموافقة عليه قبل النشر'),
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
            { label: t('Company Accounts & Team Activity', 'حسابات الشركات') },
          ]}
          title={t('Company Accounts & Team Activity', 'حسابات الشركات وإدارة النشاط')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
              {t('Publishing as a Company', 'النشر باسم الشركة')}
            </h2>
            <p className="mt-3 text-gray-700">
              {t('Company Insighter accounts allow insights to appear under the company name.', 'في حسابات الشركات:')}
            </p>
            {isRTL && (
              <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
                <li>تظهر المستندات باسم الشركة</li>
                <li>يكون مصدر المعرفة واضحًا للعملاء</li>
              </ul>
            )}

            <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
              {t('Team Visibility', 'فريق العمل')}
            </h2>
            <p className="mt-3 text-gray-700">{t('In My Team, companies can:', 'في قسم فريقي يمكن للشركة:')}</p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {teamVisibility.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
              {t('Publishing Requests', 'طلبات النشر')}
            </h2>
            <p className="mt-3 text-gray-700">
              {t('When a team member submits content:', 'عند قيام أحد أعضاء الفريق بإرسال محتوى:')}
            </p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {publishingRequests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-6 text-gray-700">
              {t(
                'This ensures consistency and quality without turning Insighta into an internal collaboration system.',
                'يضمن هذا جودة المحتوى دون تحويل المنصة إلى أداة تعاون داخلي.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
