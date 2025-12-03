'use client';

import { useParams } from 'next/navigation';
import PageIllustration from "@/components/page-illustration"
import IndustriesGrid from '@/components/industries-grid'
import IndustriesGridSkeleton from '@/components/industries-grid-skeleton'
import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'
import { useAllIndustries } from '@/hooks/industries/useAllIndustries'
import { useTranslations } from 'next-intl';

export default function AllIndustries() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = useTranslations();
  const isRTL = locale === 'ar';
  
  const { industries, isLoading, error } = useAllIndustries({ 
    locale, 
    topSubIndustry: 3 
  });

  const breadcrumbItems = [
    { label: t('Header.navigation.industries') || 'Industries', href: `/${locale}/all-industries` }
  ]

  return (
    <>
      <div className="flex flex-col min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
        <main className="grow">
          <PageIllustration />
          <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative overflow-hidden rounded-lg">
            <div className="relative z-10 max-w-6xl mx-auto mt-5 w-full">
              <Breadcrumb items={breadcrumbItems} />
              <div className="mx-auto max-w-3xl text-center pb-12">
                <h2 
                  className={`h2 font-bold text-4xl md:text-6xl bg-clip-text text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`} 
                  data-aos="zoom-y-out"
                  style={{lineHeight: '1.2'}}
                >
                  {t('Header.navigation.industries') || 'Industries'}
                </h2>
                
                {error && (
                  <div className="mt-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                    {t('errors.loadingError') || error}
                  </div>
                )}
              </div>
            </div>
          </section>
          
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-20">
            {isLoading ? (
              <IndustriesGridSkeleton />
            ) : (
              <IndustriesGrid industries={industries} />
            )}
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}