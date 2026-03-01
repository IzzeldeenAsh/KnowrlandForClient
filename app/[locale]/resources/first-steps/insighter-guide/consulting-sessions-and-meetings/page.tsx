import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function ConsultingSessionsAndMeetingsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

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
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <InsighterGuideHero
          isRTL={isRTL}
          breadcrumbs={[
            { label: t('First Steps', 'الخطوات الأولى'), href: `/${locale}/resources/first-steps` },
            { label: t('Insighter Guide', 'دليل الخبير'), href: `/${locale}/resources/first-steps/insighter-guide` },
            { label: t('Consulting Sessions & Meetings', 'الجلسات الاستشارية') },
          ]}
          title={t('Consulting Sessions & Meetings', 'الجلسات الاستشارية والاجتماعات')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
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

            <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">{t('Client Booking', 'حجز العملاء')}</h2>
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
        </div>
      </div>
    </div>
  )
}
