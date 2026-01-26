export default async function BestPracticesGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const tips = [
    t('Write clear, outcome-focused summaries', 'اكتب ملخصات واضحة تركز على النتائج'),
    t('Use accurate industries and tags', 'تأكد من دقة المجالات والوسوم'),
    t('Price files strategically', 'فكّر استراتيجيًا في تسعير الملفات'),
    t('Answer questions promptly', 'أجب على الأسئلة بسرعة واحترافية'),
    t('Offer meetings for deeper engagement', 'فعّل الجلسات للتفاعل المباشر'),
    t('Keep insights updated when possible', 'حدّث المحتوى عند الحاجة'),
  ]

  return (
    <div
      className={`mx-auto max-w-5xl px-4 sm:px-6 py-10 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Best Practices for Successful Insighters', 'أفضل الممارسات للنجاح')}
      </h1>

      <ul className={`mt-6 space-y-2 list-disc ${listPad} text-gray-700`}>
        {tips.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

