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
      className={`  ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >

     
 {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
 <div className="relative overflow-hidden px-4 sm:px-12 py-8 md:py-24 mb-6 md:mb-8">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1769497015/Group_13553_2_dpi0pz.png')",
              transform: isRTL ? 'scaleX(-1)' : 'none',
              transformOrigin: 'center',
            }}
            aria-hidden="true"
          />
          {/* Brighter/less dark overlay */}
          <div className="absolute inset-0 " aria-hidden="true" />

          <div className="relative z-10 px-4 sm:px-12">
            {/* Breadcrumbs */}
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
            {t('Insighter Dashboard', 'لوحة تحكم الخبير')}
          </li>
        </ol>
      </nav>

            {/* Hero Title Section */}
            <div className="text-center">
              <div
                className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`}
                style={{ lineHeight: '1.3' }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
                {t('Insighter Dashboard', 'لوحة تحكم الخبير — المناطق الأساسية')}
                </h1>
               
              </div>
            </div>
          </div>
        </div>
            <div  className={`max-w-5xl px-8 sm:px-16 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      <p className="mt-4 text-base md:text-lg lg:text-xl leading-relaxed font-bold text-gray-700">{t('Your dashboard is your operational center.', 'لوحة التحكم هي مركز إدارتك اليومي.')}</p>
      <p className="mt-6 text-gray-700">{t('From here, you can:', 'من خلالها يمكنك:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      </div>
    </div>
  )
}

