export default async function ClientDashboardGuidePage({
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
        {locale === 'ar'
          ? 'لوحة العميل — مكونات كل قسم'
          : 'Client Dashboard — What Each Section Does'}
      </h1>
      <p className="mt-3 text-gray-600">{locale === 'ar' ? 'قريباً' : 'Coming soon.'}</p>
    </div>
  )
}

