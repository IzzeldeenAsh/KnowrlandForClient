import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import StatisticsCards from '@/components/industry/statistics-cards'
import SubIndustryCard from '@/components/industry/sub-industry-card'
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages'
import { IndustryChild } from '@/hooks/industries/types'
import { generateIndustryStructuredData } from '@/utils/seo'
import { fetchIndustryDetails, getIndustryMetadata } from './industry.server'

interface Params {
  id: string;
  slug: string;
  locale?: string;
}

interface Props {
  params: Promise<Params>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { id, slug, locale = 'en' } = await params

  return getIndustryMetadata(id, slug, locale)
}

export default async function IndustryPage({ params }: Props) {
  const { id, slug, locale = 'en' } = await params
  const isRTL = locale === 'ar';
  
  // Get translations
  const messages = await getMessages(locale);

  try {
    const { data: industry } = await fetchIndustryDetails(id, slug, locale)
    console.log('industry data', industry);
    const breadcrumbItems = await fetchBreadcrumb('industry', parseInt(id), locale)
    
    // Generate structured data
    const structuredData = generateIndustryStructuredData(
      {
        id: parseInt(id),
        name: industry.name,
        slug: slug,
        children: industry.children
      },
      breadcrumbItems.map(item => ({ label: item.label, url: item.url })),
      locale
    )

    return (
      <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            structuredData.breadcrumb,
            structuredData.collectionPage,
            structuredData.itemList
          ].filter(Boolean))
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
      <div
        className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
        style={{ left: '28%' }}
        aria-hidden="true"
      >
        <Image
          className="max-w-none opacity-50"
          src={Stripes}
          width={768}
          height={768}
          style={{ width: 'auto', height: 'auto' }}
          alt="Stripes"
          priority
        />
      </div>
      </div>
    

      <main className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <header className="section-header px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden rounded-lg">
                <Image
                  alt="Industry page header background"
                  src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
                  fill
                  className="object-cover z-0"
                  priority
                />
                <div className="relative z-10 max-w-6xl mx-auto mt-5 w-full">
                  <nav className="mb-8" aria-label="Breadcrumb">
                    <Breadcrumb items={breadcrumbItems.map(item => ({ ...item, href: item.url }))} />
                  </nav>

                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex-1">
                      <div className={`${isRTL ? 'text-right' : 'text-left'} mb-4 `} data-aos="fade-down">
                        <h1 className={`text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} mb-4`}>
                          {industry.name}
                        </h1>
                      </div>
                    </div>
                    <aside className="flex-shrink-0">
                      <StatisticsCards type="industry" id={parseInt(id)} entityName={industry.name} />
                    </aside>
                  </div>
                </div>
        </header>
        
        <section className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-xl font-bold text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text mb-8`}>
              {messages?.industry?.subIndustries || (locale === 'ar' ? 'المجالات الفرعية' : 'Sub Industries')}
            </h2>
            
            <div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
              role="list"
              aria-label={messages?.industry?.subIndustries || (locale === 'ar' ? 'المجالات الفرعية' : 'Sub Industries')}
            >
              {industry.children.map((child: IndustryChild) => {
                const isDisabled = child.weight === 0;
                
                return isDisabled ? (
                  <div key={child.id} className="h-full" role="listitem">
                    <SubIndustryCard child={child} locale={locale} isRTL={isRTL} />
                  </div>
                ) : (
                  <Link 
                    key={child.id} 
                    href={`/${locale}/sub-industry/${child.id}/${child.slug}`} 
                    className="h-full block"
                    role="listitem"
                    aria-label={`View ${child.name} sub-industry details`}
                  >
                    <SubIndustryCard child={child} locale={locale} isRTL={isRTL} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </>
    )
  } catch (error) {
    throw error
  }
}
