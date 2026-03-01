import { InsighterGuideHero } from '../_components/InsighterGuideHero'

export default async function PublishingInsightsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar' || locale.startsWith('ar-')
  const listPad = isRTL ? 'pr-6' : 'pl-6'
  const t = (en: string, ar: string) => (isRTL ? ar : en)

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
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <InsighterGuideHero
          isRTL={isRTL}
          breadcrumbs={[
            { label: t('First Steps', 'الخطوات الأولى'), href: `/${locale}/resources/first-steps` },
            { label: t('Insighter Guide', 'دليل الخبير'), href: `/${locale}/resources/first-steps/insighter-guide` },
            { label: t('Publishing Insights', 'نشر المستندات') },
          ]}
          title={t('Publishing Insights', 'نشر المستندات — خطوات الرفع الكاملة')}
          subtitle={t('Start Your Journey', 'ابدأ رحلتك')}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`max-w-5xl px-8 sm:px-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">{t('What You Can Publish', 'أنواع المحتوى المدعومة')}</h2>
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
              <li>{t('Click Edit Summary and refine it (2–6 lines recommended)', 'اضغط تحرير الملخص وقم بمراجعته (يُوصى بـ 2–6 أسطر)')}</li>
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
        </div>
      </div>
    </div>
  )
}
