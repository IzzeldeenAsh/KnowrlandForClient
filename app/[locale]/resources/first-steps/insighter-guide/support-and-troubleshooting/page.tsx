import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function SupportAndTroubleshootingGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  return (
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <InsighterGuideHero
          isRTL={isRTL}
          breadcrumbs={[
            { label: t('First Steps', 'الخطوات الأولى'), href: `/${locale}/resources/first-steps` },
            { label: t('Insighter Guide', 'دليل الخبير'), href: `/${locale}/resources/first-steps/insighter-guide` },
            { label: t('Support & Troubleshooting', 'الدعم الفني') },
          ]}
          title={t('Support & Troubleshooting', 'الدعم الفني')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
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
        </div>
      </div>
    </div>
  )
}
