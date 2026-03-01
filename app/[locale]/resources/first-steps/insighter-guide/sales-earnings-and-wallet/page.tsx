import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function SalesEarningsAndWalletGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

  const salesItems = [
    t('Earnings from documents', 'أرباح المستندات'),
    t('Earnings from meetings', 'أرباح الجلسات'),
    t('Transaction history', 'سجل المعاملات'),
  ]

  const walletItems = [
    t('View available balance', 'عرض الرصيد المتاح'),
    t(
      'Withdraw via a third-party payment processing service provider (instant transfer)',
      'تحويل فوري عبر مزود خدمة المدفوعات'
    ),
    t('Request a manual bank transfer from platform admin', 'طلب تحويل بنكي يدوي من إدارة المنصة'),
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
            { label: t('Sales, Earnings & Wallet', 'المبيعات والمحفظة') },
          ]}
          title={t('Sales, Earnings & Wallet', 'المبيعات والمحفظة')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">{t('Viewing Sales', 'متابعة المبيعات')}</h2>
            <p className="mt-3 text-gray-700">{t('From the Sales section, you can view:', 'من قسم المبيعات يمكنك الاطلاع على:')}</p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {salesItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">{t('Wallet & Withdrawals', 'المحفظة وسحب الأرباح')}</h2>
            <p className="mt-3 text-gray-700">{t('All earnings are credited to your Wallet.', 'تُضاف جميع الأرباح إلى محفظتك.')}</p>
            <p className="mt-4 text-gray-700">{t('You can:', 'يمكنك:')}</p>
            <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
              {walletItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-gray-700">
              {t('Withdrawals may require account or identity verification.', 'قد يُطلب منك إكمال إجراءات التحقق قبل السحب.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
