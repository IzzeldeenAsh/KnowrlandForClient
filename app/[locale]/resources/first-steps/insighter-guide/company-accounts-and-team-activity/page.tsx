export default async function CompanyAccountsAndTeamActivityGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

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
            {t('Company Accounts & Team Activity', 'حسابات الشركات')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Company Accounts & Team Activity', 'حسابات الشركات وإدارة النشاط')}
      </h1>

      <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
        {t('Publishing as a Company', 'النشر باسم الشركة')}
      </h2>
      <p className="mt-3 text-gray-700">
        {t(
          'Company Insighter accounts allow insights to appear under the company name.',
          'في حسابات الشركات:'
        )}
      </p>
      {locale === 'ar' && (
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
      <p className="mt-3 text-gray-700">{t('When a team member submits content:', 'عند قيام أحد أعضاء الفريق بإرسال محتوى:')}</p>
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
  )
}

