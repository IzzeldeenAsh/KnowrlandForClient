import { Metadata } from 'next'
import DataIcon from '@/components/icons/DataIcon'
import InsightIcon from '@/components/icons/InsightIcon'
import ManualIcon from '@/components/icons/ManualIcon'
import ReportIcon from '@/components/icons/ReportIcon'
import CourseIcon from '@/components/icons/CourseIcon'
import CaseIcon from '@/components/icons/CaseIcon'
import MediaIcon from '@/components/icons/media'
import BusinessIntelligenceIcon from '@/components/icons/business-intelligence'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'أنواع المحتوى المتاح | إنسايتا' : 'Types of Content Available | Insighta',
    description: isArabic 
      ? 'تعرف على أنواع المحتوى المتاحة على منصة إنسايتا'
      : 'Learn about the types of content available on Insighta platform',
  }
}

export default async function ContentTypesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'

  type ContentTypeIcon = 'report' | 'manual' | 'statistic' | 'data' | 'course' | 'case' | 'visual' | 'business-intelligence'

  const contentTypes = [
    {
      key: 'reports',
      type: 'report' as ContentTypeIcon,
      title: locale === 'ar' ? 'تقارير ودراسات' : 'Reports',
      description:
        locale === 'ar'
          ? 'تقارير ودراسات (سوقية، مالية، استراتيجية، فنية، وغيرها)'
          : 'Market, financial, strategic, and technical reports and studies.',
    },
   
    {
      key: 'statistics',
      type: 'statistic' as ContentTypeIcon,
      title: locale === 'ar' ? 'إحصائيات' : 'Statistics',
      description:
        locale === 'ar'
          ? 'رؤى مُعالجة ونتائج مُلخّصة—محتوى محلّل وجاهز للرؤى.'
          : 'Processed insights and summarized results—analyzed, insight-ready content.',
    },
    {
      key: 'manuals',
      type: 'manual' as ContentTypeIcon,
      title: locale === 'ar' ? 'أدلة أعمال' : 'Business Manuals',
      description:
        locale === 'ar'
          ? 'إرشادات تشغيلية خطوة بخطوة—محتوى يوجّه المستخدم.'
          : 'Step-by-step operational guidance—content that guides users.',
    },
    {
      key: 'data',
      type: 'data' as ContentTypeIcon,
      title: locale === 'ar' ? 'قواعد بيانات ' : 'Data sets',
      description:
        locale === 'ar'
          ? 'معلومات منظمة خام (CSV، Excel، السجلات)—بدون تفسير أو معالجة.'
          : 'Raw structured information (CSV, Excel, logs)—non-interpreted content.',
    },
    {
      key: 'courses',
      type: 'course' as ContentTypeIcon,
      title: locale === 'ar' ? 'مواد تدريبية' : 'Training Materials',
      description:
        locale === 'ar'
          ? 'محتوى تدريبي منظّم للتعلّم وتطوير المهارات.'
          : 'Organized training materials with structured lessons and clear learning objectives for skill development.',
    },
    {
      key: 'case',
      type: 'case' as ContentTypeIcon,
      title: locale === 'ar' ? '	حالات أعمال ' : 'Business case studies',
      description:
        locale === 'ar'
          ? 'حالات أعمال مثالية للتعلم والاستشارات.'
          : 'Business cases for learning and consulting.',
    },
    
    {
      key: 'business-intelligence',
      type: 'business-intelligence' as ContentTypeIcon,
      title:
        locale === 'ar'
          ? 'مؤشرات وبيانات أعمال متنوعة'
          : 'Business intelligence & data',
      description:
        locale === 'ar'
          ? 'مؤشرات وبيانات ولوحات ومحتوى أعمال متنوع لدعم القرار والتحليل.'
          : 'Various forms of business intelligence, data, and indicators.',
    },
    {
      key: 'visual-content',
      type: 'visual' as ContentTypeIcon,
      title: locale === 'ar' ? 'المحتوى المرئي (قريباً)' : 'Visual content (Coming soon)',
      description:
        locale === 'ar'
          ? 'محتوى مرئي مبسّط يشرح الأفكار ويعرض المعلومات بشكل واضح.'
          : 'Visual-first content that explains ideas and presents information clearly.',
    },
  ] as const

  return (
    <div className="relative min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section - same structure as "what-is-insighta" */}
      <div className="relative overflow-hidden pb-16">
        {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
        <div className="relative overflow-hidden px-4 sm:px-12 py-8 md:py-24 mb-6 md:mb-8">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                  "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1770102117/pattern_lj3gmd.png')",
                transform: isRTL ? 'scaleX(-1)' : 'none',
                transformOrigin: 'center',
                backgroundPositionX: isRTL ? '1%' : '1%',
                backgroundSize: isRTL ? '95% 100%' : '100% 95%',
            }}
            aria-hidden="true"
          />
          {/* Brighter/less dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/20" aria-hidden="true" />

          <div className="relative z-10 px-4 sm:px-12">
            {/* Breadcrumbs */}
            <nav className={`mb-6 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-gray-700/80 flex-wrap">
                <li>
                  <a href={`/${locale}/resources/first-steps`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'الخطوات الأولى' : 'First Steps'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <a href={`/${locale}/resources/first-steps/about-insighta`} className="hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? 'حول إنسايتا' : 'About Insighta'}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-[#013175] font-bold" aria-current="page">
                  {locale === 'ar' ? 'أنواع المحتوى المتاح' : 'Types of Content Available'}
                </li>
              </ol>
            </nav>

            {/* Hero Title Section */}
            <div className="text-center ">
              <div
                className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`}
                style={{ lineHeight: '1.3' }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#013175]">
                  {locale === 'ar' ? 'أنواع المحتوى المتاح' : 'Types of Content Available'}
                </h1>
                <h2
                  className={`text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D] `}
                  >
                    {locale === 'ar' ? 'محتوى متنوع' : 'Diverse Content'}
                  </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Main Content */}
          <div className={`max-w-5xl px-8 sm:px-16  space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="prose prose-lg max-w-none">
              <div className={`text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {locale === 'ar' ? (
                  <>
                    <span>لا تقتصر المنصة على أبحاث السوق فقط، بل تشمل:</span>
                  </>
                ) : (
                  <>
                    <span>
                      Insighta is not limited to market research. It includes a wide range of professional knowledge content such as
                      reports, insights, data, guides, and courses for teams and professionals.
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="pb-10 md:pb-14">
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {contentTypes.map((item) => (
                  <div
                    key={item.key}
                    className="group rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm min-h-[170px] px-5 py-5 md:px-6 md:py-6 transition-colors hover:bg-white"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {item.type === 'report' && <ReportIcon width={22} height={22} />}
                        {item.type === 'manual' && <ManualIcon width={22} height={22} />}
                        {item.type === 'statistic' && <InsightIcon width={22} height={22} />}
                        {item.type === 'data' && <DataIcon width={22} height={22} />}
                        {item.type === 'course' && <CourseIcon width={22} height={22} />}
                        {item.type === 'case' && <CaseIcon width={22} height={25} />}
                        {item.type === 'visual' && <MediaIcon width={22} height={22} />}
                        {item.type === 'business-intelligence' && <BusinessIntelligenceIcon width={25} height={25} />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isRTL ? 'bg-gradient-to-l from-blue-500 to-teal-400' : 'bg-gradient-to-r from-blue-500 to-teal-400'
                            }`}
                          />
                          <h3 className="text-base md:text-lg font-semibold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip / Next step */}
              {/* <div className="mt-10 md:mt-12">
                <div
                  className={`bg-white border border-gray-300 rounded-md overflow-hidden relative ${isRTL ? 'pl-0 pr-4' : 'pl-4 pr-0'}`}
                  style={{
                    borderLeft: isRTL ? '1px solid #d1d5db' : '4px solid #2563eb',
                    borderRight: isRTL ? '4px solid #2563eb' : '1px solid #d1d5db',
                    borderTop: '1px solid #d1d5db',
                    borderBottom: '1px solid #d1d5db',
                  }}
                >
                  <div className="p-4 md:p-5">
                    <p className={`text-gray-700 text-sm md:text-base leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                      {locale === 'ar' ? (
                        <>
                          نصيحة: ابدأ بالمحتوى الأقرب لاحتياجك (رؤى سريعة أو دليل تشغيل)، ثم انتقل إلى التقارير والبيانات لتعميق القرار.
                        </>
                      ) : (
                        <>
                          Tip: Start with what matches your need (quick insights or a practical guide), then move to reports and data to go
                          deeper.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
