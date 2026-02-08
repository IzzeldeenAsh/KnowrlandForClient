export default async function SalesEarningsAndWalletGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

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
            {t('Sales, Earnings & Wallet', 'المبيعات والمحفظة')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Sales, Earnings & Wallet', 'المبيعات والمحفظة')}
      </h1>

      <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
        {t('Viewing Sales', 'متابعة المبيعات')}
      </h2>
      <p className="mt-3 text-gray-700">{t('From the Sales section, you can view:', 'من قسم المبيعات يمكنك الاطلاع على:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {salesItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
        {t('Wallet & Withdrawals', 'المحفظة وسحب الأرباح')}
      </h2>
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
  )
}

