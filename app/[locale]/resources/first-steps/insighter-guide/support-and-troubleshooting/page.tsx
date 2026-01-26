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

