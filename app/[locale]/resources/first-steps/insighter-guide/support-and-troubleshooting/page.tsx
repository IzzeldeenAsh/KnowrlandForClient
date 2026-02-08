export default async function SupportAndTroubleshootingGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

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
            {t('Support & Troubleshooting', 'الدعم الفني')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Support & Troubleshooting', 'الدعم الفني')}
      </h1>

      <p className="mt-6 text-gray-700">
        {t(
          'Support contact: If you encounter any issues or have any questions, you may contact the Support Team via email at',
          'في حال واجهت أي مشكلة أو كان لديك أي استفسار، يمكنك التواصل مع فريق الدعم عبر البريد الإلكتروني:'
        )}{' '}
        <a className="text-blue-600 hover:text-blue-700 underline" href="mailto:support@yourplatform.com">
          support@yourplatform.com
        </a>
        .
      </p>

      <p className="mt-10 text-sm text-gray-500">{t('End of Insighter Manual', 'نهاية دليل الخبير')}</p>
    </div>
  )
}

