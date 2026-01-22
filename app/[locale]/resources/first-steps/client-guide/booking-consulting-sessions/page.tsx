export default async function BookingConsultingSessionsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {locale === 'ar' ? 'حجز الجلسات الاستشارية' : 'Booking Consulting Sessions'}
      </h1>
      <p className="mt-3 text-gray-600">{locale === 'ar' ? 'قريباً' : 'Coming soon.'}</p>
    </div>
  )
}

