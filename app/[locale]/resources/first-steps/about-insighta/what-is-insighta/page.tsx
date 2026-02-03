import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isArabic = locale === 'ar'

  return {
    title: isArabic ? 'ما هي إنسايتا' : 'What is Insighta ',
    description: isArabic 
      ? 'إنسايتا هي منصة رائدة في السوق الرقمي لاقتصاد المعرفة—حيث المعرفة هي الأصول الأكثر قيمة.'
      : 'Insighta is a leading digital marketplace in the knowledge economy—where knowledge is the most valuable asset.',
  }
}

export default async function WhatIsInsightaPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const isRTL = locale === 'ar'

  return (
    <div className="relative min-h-screen">
      {/* Hero Section - Similar to home page */}
      <div className="relative overflow-hidden pb-16">
           {/* Breadcrumbs + Hero Title Section (with bg + overlay) */}
           <div className="relative overflow-hidden px-4 sm:px-12 py-8 md:py-24 mb-6 md:mb-8">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dsiku9ipv/image/upload/v1770103627/patternfore-1_qeawih.png')",
                transform: isRTL ? 'scaleX(-1)' : 'none',
                transformOrigin: 'center',
                backgroundPositionX: isRTL ? '1%' : '1%',
                backgroundSize: isRTL ? '95% 100%' : '100% 95%',
              }}
              aria-hidden="true"
            />
            {/* Brighter/less dark overlay */}
            <div
              className="absolute inset-0 "
              aria-hidden="true"
            />

            <div className="relative z-10 px-4 sm:px-12">
              {/* Breadcrumbs */}
              <nav
                className={`mb-6 text-xs md:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
                aria-label="Breadcrumb"
              >
                <ol className="flex items-center gap-2 text-gray-700/80 flex-wrap">
                  <li>
                    <a
                      href={`/${locale}/resources/first-steps`}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {locale === 'ar' ? 'الخطوات الأولى' : 'First Steps'}
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400">/</span>
                  </li>
                  <li>
                    <a
                      href={`/${locale}/resources/first-steps/about-insighta`}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {locale === 'ar' ? 'حول إنسايتا' : 'About Insighta'}
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400">/</span>
                  </li>
                  <li className="text-[#013175] font-bold" aria-current="page">
                    {locale === 'ar' ? 'ما هي إنسايتا' : 'What is Insighta'}
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
                    {locale === 'ar' ? 'ما هي إنسايتا' : 'What is Insighta'}
                  </h1>
                  <h2
                    className={`text-3xl sm:text-4xl md:text-4xl font-medium text-[#7D7D7D]` }
                  >
                    {locale === 'ar' ? 'منصة المعرفة الرائدة' : 'Leading Knowledge Platform'}
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
                    <span>
                      <b>إنسايتا</b> هي منصة متخصصة ورائدة في <b>اقتصاد المعرفة</b>، حيث تعد المعرفة الأصل الأكثر قيمة.
                      <br />
                      توفر إنسايتا <b>سوقًا رقمية متقدمة</b> لشراء وبيع محتوى الأعمال عالي القيمة مثل التقارير، المؤشرات، الدراسات، التحليلات، ورؤى الخبراء.
                      <br />
                      كما تربط المنصة <b>منشئي المعرفة</b> بمن يحتاج إليها في بيئة <b>آمنة</b> و<b>موثوقة</b> و<b>فعالة</b>.
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <b>Insighta</b> is a leading digital marketplace in the <b>knowledge economy</b>—where knowledge is the most valuable asset.
                      <br />
                      It is a <b>specialized platform</b> for buying and selling <b>high-value business content</b> including reports, indicators, studies, analytics, and expert insights.
                      <br />
                      The platform connects <b>knowledge creators</b> with those who need that knowledge, in a <b>trusted</b> and <b>efficient</b> environment.
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Additional Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-[#fafafc]  rounded-lg p-6  border border-gray-200 hover:shadow-lg transition-shadow">
               <div className="flex gap-6">
               <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_646_165)">
<path d="M115.266 68.712C118.159 72.4599 119.728 77.0614 119.726 81.796C119.705 85.9823 118.471 90.0728 116.174 93.5726C113.877 97.0724 110.614 99.8315 106.782 101.516C101.716 113.106 91.676 120 79.726 120V115C90.256 115.076 99.116 108.25 102.966 97.646C106.364 96.6125 109.341 94.5152 111.458 91.6629C113.575 88.8107 114.721 85.3541 114.726 81.802C114.666 79.2598 114.065 76.7596 112.961 74.4687C111.857 72.1778 110.277 70.149 108.326 68.518C110.425 66.9052 112.12 64.8258 113.277 62.4444C114.434 60.0631 115.02 57.4452 114.99 54.798C115.17 48.348 110.856 43.048 104.086 39.668V32.748C104.066 23.988 95.036 21.098 87.732 21.624C88.682 13.424 82.952 4.974 74.968 5.004C69.124 5.204 62.698 8.298 62.218 15.004V40H57.218V15C57.218 9.106 50.774 5 44.988 5C37.018 4.9 31.288 13.384 32.244 21.62C20.844 20.08 13.754 28.6 15.89 39.66C9.126 43.044 4.81 48.34 4.99 54.79C4.97098 57.4351 5.56302 60.0489 6.71995 62.4276C7.87689 64.8064 9.56749 66.8859 11.66 68.504C9.70837 70.1357 8.12779 72.1655 7.02405 74.4575C5.92031 76.7495 5.31888 79.2508 5.26 81.794C5.26427 85.3463 6.40935 88.8034 8.52654 91.6558C10.6437 94.5083 13.6211 96.6053 17.02 97.638C19.74 104.512 25.39 114.788 39.724 114.992V120C27.924 120 18.304 113.28 13.206 101.526C9.37327 99.8399 6.11099 97.0797 3.81354 93.579C1.5161 90.0784 0.281848 85.9872 0.26 81.8C0.258321 77.0541 1.83428 72.4423 4.74 68.69C1.67814 64.7058 0.0124695 59.8248 0 54.8C0 47.31 3.664 41.25 10.9 36.78V32.744C10.9 24.09 17.7 17.634 27.394 16.73C28.528 7.45 36.128 0 44.998 0C47.8657 0.00602483 50.6923 0.682248 53.2522 1.97471C55.8121 3.26717 58.0345 5.14008 59.742 7.444C61.5764 5.14805 63.8987 3.28896 66.5405 2.00146C69.1822 0.713953 72.0773 0.0302865 75.016 0C83.87 0.074 91.456 7.514 92.596 16.73C102.286 17.63 109.096 24.09 109.096 32.744V36.774C116.33 41.248 120 47.298 120 54.794C119.996 59.8268 118.336 64.7186 115.276 68.714L115.266 68.712ZM87.226 77.496C87.2113 82.345 85.9116 87.1035 83.4594 91.2867C81.0071 95.4699 77.4899 98.9285 73.266 101.31C72.1487 101.995 71.2327 102.964 70.611 104.118C69.9893 105.272 69.6839 106.57 69.726 107.88V120H49.726V108C49.7676 106.663 49.4569 105.339 48.825 104.161C48.1931 102.982 47.2623 101.991 46.126 101.286C41.3 98.5493 37.4174 94.4132 34.991 89.424C32.5645 84.4347 31.7082 78.8269 32.5352 73.3409C33.3622 67.8549 35.8336 62.7486 39.623 58.6964C43.4124 54.6442 48.3417 51.8365 53.76 50.644C57.8038 49.763 61.9937 49.7998 66.0214 50.7516C70.0492 51.7034 73.8123 53.5461 77.034 56.144C80.2202 58.7154 82.7897 61.9682 84.5534 65.6632C86.3172 69.3583 87.2304 73.4016 87.226 77.496ZM64.728 107.88C64.7425 106.909 64.8646 105.944 65.092 105H54.352C54.5883 105.98 54.7137 106.982 54.726 107.99V114.99H64.726L64.728 107.88ZM82.228 77.496C82.2342 74.1439 81.4886 70.833 80.0459 67.8071C78.6033 64.7813 76.5004 62.1176 73.892 60.012C71.2475 57.885 68.1601 56.3776 64.8565 55.6006C61.553 54.8236 58.1173 54.7968 54.802 55.522C50.377 56.5049 46.3537 58.8055 43.2625 62.1208C40.1713 65.436 38.1573 69.6102 37.486 74.093C36.8146 78.5759 37.5175 83.1569 39.5019 87.2323C41.4863 91.3076 44.6591 94.686 48.602 96.922C50.0458 97.791 51.2842 98.9626 52.232 100.356V100H57.232V84.652C55.0918 84.0994 53.195 82.8533 51.8381 81.1085C50.4811 79.3636 49.7405 77.2184 49.732 75.008H54.732C54.732 76.3341 55.2588 77.6059 56.1965 78.5435C57.1341 79.4812 58.4059 80.008 59.732 80.008C61.0581 80.008 62.3299 79.4812 63.2675 78.5435C64.2052 77.6059 64.732 76.3341 64.732 75.008H69.732C69.7235 77.2184 68.9829 79.3636 67.6259 81.1085C66.269 82.8533 64.3722 84.0994 62.232 84.652V100H67.232V100.314C68.168 98.9497 69.3896 97.8052 70.812 96.96C74.2655 95.015 77.1418 92.1894 79.1479 88.771C81.154 85.3526 82.2181 81.4635 82.232 77.5L82.228 77.496Z" fill="#013175"/>
</g>
<defs>
<clipPath id="clip0_646_165">
<rect width="120" height="119.994" fill="white"/>
</clipPath>
</defs>
</svg>

               <div>
               <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'اقتصاد المعرفة' : 'Knowledge Economy'}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' 
                    ? 'في عالم اليوم، أصبحت المعرفة والرؤى الأصول الأكثر قيمة للشركات والمهنيين.'
                    : 'Today, knowledge and insights are the top assets for businesses and professionals.'
                  }
                </p>
               </div>
               </div>
              </div>

              <div className="bg-[#fafafc]  rounded-lg p-6  border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-6">
              <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.75 63C16.3467 63 16.919 63.2371 17.341 63.659C17.7629 64.081 18 64.6533 18 65.25V83.25C18 83.8467 17.7629 84.419 17.341 84.841C16.919 85.263 16.3467 85.5 15.75 85.5C15.1533 85.5 14.581 85.263 14.159 84.841C13.7371 84.419 13.5 83.8467 13.5 83.25V65.25C13.5 64.6533 13.7371 64.081 14.159 63.659C14.581 63.2371 15.1533 63 15.75 63ZM27 47.25V83.25C27 83.8467 27.2371 84.419 27.659 84.841C28.081 85.263 28.6533 85.5 29.25 85.5C29.8467 85.5 30.419 85.263 30.841 84.841C31.2629 84.419 31.5 83.8467 31.5 83.25V47.25C31.5 46.6533 31.2629 46.081 30.841 45.659C30.419 45.2371 29.8467 45 29.25 45C28.6533 45 28.081 45.2371 27.659 45.659C27.2371 46.081 27 46.6533 27 47.25ZM107.341 104.155C107.743 104.581 107.962 105.147 107.954 105.732C107.945 106.317 107.709 106.876 107.295 107.29C106.881 107.703 106.322 107.94 105.737 107.948C105.152 107.957 104.586 107.737 104.161 107.336L86.8212 90C83.2691 92.8917 78.8339 94.4798 74.2536 94.5C70.2484 94.5007 66.3329 93.3137 63.0023 91.089C59.6718 88.8644 57.0757 85.702 55.5425 82.0018C54.0092 78.3017 53.6077 74.23 54.3887 70.3016C55.1696 66.3733 57.0979 62.7647 59.9298 59.9324C62.7617 57.1 66.3699 55.171 70.2981 54.3894C74.2263 53.6077 78.2981 54.0085 81.9985 55.5411C85.6989 57.0737 88.8617 59.6692 91.087 62.9993C93.3123 66.3295 94.5 70.2448 94.5 74.25C94.4798 78.8303 92.8917 83.2655 90 86.8176L107.341 104.155ZM90 74.25C90 71.1349 89.0763 68.0898 87.3456 65.4998C85.615 62.9097 83.1552 60.891 80.2773 59.6989C77.3993 58.5068 74.2325 58.1949 71.1773 58.8026C68.1221 59.4104 65.3157 60.9104 63.1131 63.1131C60.9104 65.3157 59.4103 68.1221 58.8026 71.1773C58.1949 74.2325 58.5068 77.3993 59.6989 80.2773C60.891 83.1552 62.9097 85.615 65.4998 87.3457C68.0898 89.0763 71.1349 90 74.25 90C78.4257 89.9952 82.429 88.3343 85.3817 85.3817C88.3343 82.429 89.9952 78.4257 90 74.25ZM108 20.25V78.75C107.969 81.3025 107.522 83.8328 106.677 86.2416C106.586 86.5282 106.438 86.7936 106.243 87.0221C106.048 87.2507 105.808 87.4378 105.54 87.5723C105.271 87.7069 104.978 87.7862 104.677 87.8055C104.377 87.8249 104.077 87.7839 103.793 87.685C103.509 87.5861 103.247 87.4313 103.024 87.2297C102.801 87.0281 102.621 86.7839 102.494 86.5114C102.367 86.2389 102.295 85.9437 102.284 85.6432C102.273 85.3428 102.322 85.0431 102.429 84.762C103.101 82.8292 103.461 80.8015 103.495 78.7554V36H4.5V78.75C4.50476 82.9257 6.16566 86.929 9.11833 89.8817C12.071 92.8343 16.0743 94.4952 20.25 94.5H51.75C52.3467 94.5 52.919 94.7371 53.341 95.159C53.7629 95.581 54 96.1533 54 96.75C54 97.3467 53.7629 97.919 53.341 98.341C52.919 98.763 52.3467 99 51.75 99H20.25C14.8814 98.9933 9.73462 96.8577 5.93845 93.0616C2.14229 89.2654 0.00666847 84.1186 0 78.75L0 20.25C0.00666847 14.8814 2.14229 9.73462 5.93845 5.93845C9.73462 2.14229 14.8814 0.00666847 20.25 0L87.75 0C93.1186 0.00666847 98.2654 2.14229 102.062 5.93845C105.858 9.73462 107.993 14.8814 108 20.25ZM103.5 31.5V20.25C103.495 16.0743 101.834 12.071 98.8817 9.11833C95.929 6.16566 91.9257 4.50476 87.75 4.5H20.25C16.0743 4.50476 12.071 6.16566 9.11833 9.11833C6.16566 12.071 4.50476 16.0743 4.5 20.25V31.5H103.5ZM18 13.5C17.11 13.5 16.24 13.7639 15.4999 14.2584C14.7599 14.7529 14.1831 15.4557 13.8425 16.2779C13.5019 17.1002 13.4128 18.005 13.5865 18.8779C13.7601 19.7508 14.1887 20.5526 14.818 21.182C15.4474 21.8113 16.2492 22.2399 17.1221 22.4135C17.995 22.5872 18.8998 22.4981 19.7221 22.1575C20.5443 21.8169 21.2471 21.2401 21.7416 20.5001C22.2361 19.76 22.5 18.89 22.5 18C22.5 16.8065 22.0259 15.6619 21.182 14.818C20.3381 13.9741 19.1935 13.5 18 13.5ZM31.5 13.5C30.61 13.5 29.74 13.7639 28.9999 14.2584C28.2599 14.7529 27.6831 15.4557 27.3425 16.2779C27.0019 17.1002 26.9128 18.005 27.0865 18.8779C27.2601 19.7508 27.6887 20.5526 28.318 21.182C28.9474 21.8113 29.7492 22.2399 30.6221 22.4135C31.495 22.5872 32.3998 22.4981 33.2221 22.1575C34.0443 21.8169 34.7471 21.2401 35.2416 20.5001C35.7361 19.76 36 18.89 36 18C36 16.8065 35.5259 15.6619 34.682 14.818C33.8381 13.9741 32.6935 13.5 31.5 13.5ZM45 13.5C44.11 13.5 43.24 13.7639 42.4999 14.2584C41.7599 14.7529 41.1831 15.4557 40.8425 16.2779C40.5019 17.1002 40.4128 18.005 40.5865 18.8779C40.7601 19.7508 41.1887 20.5526 41.818 21.182C42.4474 21.8113 43.2492 22.2399 44.1221 22.4135C44.995 22.5872 45.8998 22.4981 46.7221 22.1575C47.5443 21.8169 48.2471 21.2401 48.7416 20.5001C49.2361 19.76 49.5 18.89 49.5 18C49.5 16.8065 49.0259 15.6619 48.182 14.818C47.3381 13.9741 46.1935 13.5 45 13.5ZM40.5 56.25V83.25C40.5 83.8467 40.7371 84.419 41.159 84.841C41.581 85.263 42.1533 85.5 42.75 85.5C43.3467 85.5 43.919 85.263 44.341 84.841C44.7629 84.419 45 83.8467 45 83.25V56.25C45 55.6533 44.7629 55.081 44.341 54.659C43.919 54.2371 43.3467 54 42.75 54C42.1533 54 41.581 54.2371 41.159 54.659C40.7371 55.081 40.5 55.6533 40.5 56.25Z" fill="#013175"/>
</svg>

              <div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'منصة متخصصة' : 'Specialized Platform'}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' 
                    ? 'نحن نربط بين منشئي المعرفة والمحتاجين إليها في بيئة آمنة وموثوقة.'
                    : 'We connect knowledge creators with those who need it in a secure and trusted environment.'
                  }
                </p>
                </div>
              </div>
              </div>
            </div>

            {/* TIP Box - Encourage user to go to next link */}
            <div className="mt-12">
              <div className={`bg-white border border-gray-300 rounded-md overflow-hidden relative ${isRTL ? 'pl-0 pr-4' : 'pl-4 pr-0'}`} style={{ 
                borderLeft: isRTL ? '1px solid #d1d5db' : '4px solid #2563eb',
                borderRight: isRTL ? '4px solid #2563eb' : '1px solid #d1d5db',
                borderTop: '1px solid #d1d5db',
                borderBottom: '1px solid #d1d5db'
              }}>
                <div className="p-4 md:p-5">
                  <p className={`text-gray-700 text-sm md:text-base leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {locale === 'ar' ? (
                      <>هل تريد معرفة المزيد؟ يمكنك الاطلاع على{' '}
                        <a 
                          href={`/${locale}/resources/first-steps/about-insighta/content-types`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          أنواع المحتوى المتاحة
                        </a>
                        {' '}للتعرف على المحتوى المتوفر على المنصة.</>
                    ) : (
                      <>Want to learn more? Check out the{' '}
                        <a 
                          href={`/${locale}/resources/first-steps/about-insighta/content-types`}
                          className="text-blue-600 hover:text-blue-700 underline transition-colors"
                        >
                          Types of Content Available
                        </a>
                        {' '}to learn about the content available on the platform.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
