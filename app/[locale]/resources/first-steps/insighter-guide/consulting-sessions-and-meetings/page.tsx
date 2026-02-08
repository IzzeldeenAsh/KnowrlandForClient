export default async function ConsultingSessionsAndMeetingsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const meetingSettings = [
    t('Set available days and time slots', 'تحديد أيام وساعات التوفر'),
    t('Define session duration and pricing', 'تحديد مدة الجلسة وسعرها'),
    t('Add exception days (unavailable dates)', 'إضافة أيام استثناء (غير متاحة)'),
  ]

  const bookingPlaces = [
    t('Your Insight pages', 'صفحة الرؤية'),
    t('Your profile page', 'صفحة الملف الشخصي'),
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
            {t('Consulting Sessions & Meetings', 'الجلسات الاستشارية')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Consulting Sessions & Meetings', 'الجلسات الاستشارية والاجتماعات')}
      </h1>

      <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
        {t('Offering Sessions', 'تفعيل الجلسات')}
      </h2>
      <p className="mt-3 text-gray-700">
        {t('You can offer paid consulting sessions alongside your Insights.', 'يمكنك تقديم جلسات استشارية مدفوعة إضافةً إلى مستنداتك.')}
      </p>
      <p className="mt-4 text-gray-700">{t('From Meeting Settings, you can:', 'من خلال إعدادات الجلسات يمكنك:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {meetingSettings.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
        {t('Client Booking', 'حجز العملاء')}
      </h2>
      <p className="mt-3 text-gray-700">
        {t(
          'Clients book sessions by clicking Meet [Your Name] on:',
          'يقوم العملاء بالحجز عبر زر احجز جلسة مع [اسمك] في:'
        )}
      </p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {bookingPlaces.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 text-gray-700">{t('All bookings appear in My Meetings.', 'تظهر جميع الطلبات في اجتماعاتي.')}</p>
    </div>
  )
}

