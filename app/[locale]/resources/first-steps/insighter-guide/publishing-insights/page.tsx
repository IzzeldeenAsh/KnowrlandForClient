export default async function PublishingInsightsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  const publishTypes = [
    t('Data', 'بيانات'),
    t('Reports', 'تقارير'),
    t('Statistics', 'إحصائيات'),
    t('Manuals', 'أدلة'),
    t('Courses', 'دورات تدريبية'),
  ]

  const formats = t(
    'PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX.',
    'PDF، DOC/DOCX، XLS/XLSX، PPT/PPTX.'
  )

  return (
    <div
      className={`mx-auto max-w-5xl px-4 sm:px-6 py-10 ${isRTL ? 'text-right' : 'text-left'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav className={`mb-6 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
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
            {t('Publishing Insights', 'نشر المستندات')}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {t('Publishing Insights', 'نشر المستندات — خطوات الرفع الكاملة')}
      </h1>

      <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
        {t('What You Can Publish', 'أنواع المحتوى المدعومة')}
      </h2>
      <p className="mt-3 text-gray-700">{t('You can upload:', 'يمكنك رفع:')}</p>
      <ul className={`mt-3 space-y-2 list-disc ${listPad} text-gray-700`}>
        {publishTypes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 text-gray-700">
        {t('Accepted file formats typically include:', 'صيغ الملفات المدعومة عادةً:')} <span className="font-medium">{formats}</span>
      </p>

      <h2 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
        {t('Step-by-Step: Add Insight', 'خطوات إضافة المستندات (Add Insight)')}
      </h2>
      <ol className={`mt-3 space-y-3 list-decimal ${listPad} text-gray-700`}>
        <li>{t('Go to Dashboard → Add Insight', 'انتقل إلى لوحة التحكم → إضافة رؤية')}</li>
        <li>{t('Select the Insight Type', 'اختر نوع الرؤية')}</li>
        <li>{t('Upload one or more files', 'ارفع ملفًا واحدًا أو عدة ملفات')}</li>
        <li>{t('Enter the Insight title (preferably in the document’s language)', 'أدخل عنوان الرؤية (بلغة المستند)')}</li>
        <li>
          {t('Add metadata:', 'أضف البيانات الوصفية:')}
          <ul className={`mt-2 space-y-2 list-disc ${listPad}`}>
            <li>{t('Industry', 'القطاع')}</li>
            <li>{t('Target market (economic block / region / country)', 'السوق المستهدف (كتلة اقتصادية / منطقة / دولة)')}</li>
            <li>{t('Tags', 'الوسوم')}</li>
            <li>{t('ISIC / Products (if applicable)', 'رموز ISIC / HS (إن وُجدت)')}</li>
          </ul>
        </li>
        <li>{t('Wait for AI-generated summary to appear', 'انتظر توليد ملخص الذكاء الاصطناعي')}</li>
        <li>
          {t(
            'Click Edit Summary and refine it (2–6 lines recommended)',
            'اضغط تحرير الملخص وقم بمراجعته (يُوصى بـ 2–6 أسطر)'
          )}
        </li>
        <li>
          {t('Set pricing:', 'حدّد الأسعار:')}
          <ul className={`mt-2 space-y-2 list-disc ${listPad}`}>
            <li>{t('Per file', 'لكل ملف')}</li>
            <li>{t('Or full package', 'أو كباقة كاملة')}</li>
          </ul>
        </li>
        <li>{t('Choose Publish Now, Schedule, or Save as Draft', 'اختر نشر الآن، أو جدولة أو حفظ كمسودة')}</li>
      </ol>
    </div>
  )
}

