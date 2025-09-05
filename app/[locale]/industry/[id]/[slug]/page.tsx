import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import IndustryIcon from "@/components/icons/industry-icon";
import Link from 'next/link'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import StatisticsCards from '@/components/industry/statistics-cards'
import SubIndustryCard from '@/components/industry/sub-industry-card'
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages'
import { getApiUrl } from '@/app/config'
import { IndustryDetails, IndustryChild } from '@/hooks/industries/types'

interface Params {
  id: string;
  slug: string;
  locale?: string;
}

interface Props {
  params: Promise<Params>;
}

async function fetchIndustryData(id: string, slug: string, locale: string = 'en') {
  const apiUrl = getApiUrl(`/api/platform/industries/${id}/${slug}`)
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": locale,
      "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    body: JSON.stringify({ top_topic: 2 }),
    next: { revalidate: 3600 }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch industry details: ${response.status}`)
  }

  const data = await response.json();
  return data
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { id, slug, locale = 'en' } = await params

  try {
    const { data } = await fetchIndustryData(id, slug, locale)
    
    return {
      title: `${data.name} Industry Analysis | KNOLDG`,
      description: `Detailed analysis and insights about ${data.name} industry, including ${data.children.map((child: IndustryChild) => child.name).join(', ')}`,
      openGraph: {
        title: `${data.name} Industry Analysis | KNOLDG`,
        description: `Detailed analysis and insights about ${data.name} industry, including ${data.children.map((child: IndustryChild) => child.name).join(', ')}`,
      }
    }
  } catch (error) {
    return {
      title: 'Industry Analysis | KNOLDG',
      description: 'Detailed industry analysis and insights'
    }
  }
}

export default async function IndustryPage({ params }: Props) {
  const { id, slug, locale = 'en' } = await params
  const isRTL = locale === 'ar';
  
  // Get translations
  const messages = await getMessages(locale);

  try {
    const { data: industry } = await fetchIndustryData(id, slug, locale)
    const breadcrumbItems = await fetchBreadcrumb('industry', parseInt(id), locale)

    return (
      <>
      <div className="relative z-10 max-w-6xl relative mx-auto  w-full ">
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
                      <div className={`${isRTL ? 'text-right' : 'text-left'} mb-4`} data-aos="fade-down">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-4">
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
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text mb-8">
              {messages?.industry?.subIndustries || (locale === 'ar' ? 'الصناعات الفرعية' : 'Sub Industries')}
            </h2>
            
            <div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
              role="list"
              aria-label={messages?.industry?.subIndustries || (locale === 'ar' ? 'الصناعات الفرعية' : 'Sub Industries')}
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
