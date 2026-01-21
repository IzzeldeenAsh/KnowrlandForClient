import { Metadata } from 'next'
import Image from 'next/image'
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'ما يمكنك فعله | إنسايتا' : 'What you can do | Insighta',
    description: isArabic 
      ? 'تعرف على ما يمكنك فعله مع حساب العميل'
      : 'Learn what you can do with a Client Account',
  }
}

export default async function WhatYouCanDoPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'

  return (
    <div className="relative min-h-screen">
      <div className="relative overflow-hidden pt-5 pb-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <nav className={`mb-6 md:mb-8 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
            <ol className={`flex items-center gap-2 text-gray-500 flex-wrap`}>
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
            </ol>
          </nav>

          <div className="text-center mb-12 md:mb-16">
            <div className={`flex flex-col align-center justify-center gap-2 ${isRTL ? 'text-right' : 'text-left'} text-left`} style={{lineHeight: '1.3'}}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {locale === 'ar' ? 'ما يمكنك فعله' : 'What you can do'}
              </h1>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-500 to-teal-400' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}>
                {locale === 'ar' ? 'اكتشف الإمكانيات' : 'Discover the Possibilities'}
              </h2>
            </div>
          </div>

          <div className={` ${isRTL ? 'text-right' : 'text-left'}`}>
            <ul className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <li className="flex flex-col gap-4 group">
                  <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5 `}></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? (
                      <>
                        <strong>اشترِ ونزّل</strong> التقارير والدراسات والملفات
                      </>
                    ) : (
                      <>
                        <strong>Purchase and download</strong> reports and studies
                      </>
                    )}
                  </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768978995/Group_13523_f0siph.png"
                    alt="Download Content"
                    width={500 }
                    height={300}
                    priority
                  />
                </li>
                
                <li className="flex flex-col gap-4 group">
                  <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5 `}></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? (
                      <>
                        <strong>احجز اجتماعات</strong> مع الخبراء والمستشارين
                      </>
                    ) : (
                      <>
                        <strong>Book meetings</strong> with experts
                      </>
                    )}
                  </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768979425/New_Project_6_zjqs5n.png"
                    alt="Book Meetings"
                    width={500 }
                    height={300}
                    priority
                  />
                </li>
                
                <li className="flex flex-col gap-4 group">
                  <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5 `}></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? (
                      <>
                        <strong>قيّم</strong> المحتوى والخبراء بعد الشراء
                      </>
                    ) : (
                      <>
                        <strong>Rate</strong> purchased content and authors
                      </>
                    )}
                  </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768979825/Group_13552_pj0acd.png"
                    alt="Rate Content"
                    width={500 }
                    height={300}
                    priority
                  />
                </li>
                
                <li className="flex flex-col gap-4 group">
                  <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5 `}></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? (
                      <>
                        <strong>احتفظ</strong> بجميع مشترياتك وتنزيلاتك المجانية وارجع إليها في أي وقت
                      </>
                    ) : (
                      <>
                        <strong>Store</strong> all your purchases and free downloads
                      </>
                    )}
                  </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768980195/New_Project_7_pfyj9c.png"
                    alt="Store Purchases"
                    width={800 }
                    height={700}
                    priority
                  />
                </li>
                
                <li className="flex flex-col gap-4 group">
                  <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5 `}></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? (
                      <>
                        <strong>ضع علامات</strong> على المحتوى الذي تريد مراجعته لاحقاً
                      </>
                    ) : (
                      <>
                        <strong>Bookmark</strong> content for later
                      </>
                    )}
                  </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768980851/New_Project_9_ovq3w7.png"
                    alt="Bookmark Content"
                    width={800 }
                    height={700}
                    priority
                  />
                </li>
                
                <li className="flex flex-col gap-4 group">
                  <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2.5 `}></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {locale === 'ar' ? (
                      <>
                        <strong>التحويل بسهولة</strong> من حساب عميل إلى حساب Insighter متى أردت
                      </>
                    ) : (
                      <>
                        <strong>Easily upgrade</strong> to an Insighter account anytime
                      </>
                    )}
                  </p>
                  </div>
                  <Image
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1768981098/New_Project_10_c7gqor.png"
                    alt="Upgrade to Insighter"
                    width={800 }
                    height={700}
                    priority
                  />
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
