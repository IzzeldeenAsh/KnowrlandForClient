import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import StatisticsCards from '@/components/industry/statistics-cards'
import TopicCard from '@/components/industry/topic-card'
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages'
import { getApiUrl } from '@/app/config'
import { SubIndustryDetails, TopicWithKnowledge } from '@/hooks/industries/types'
import { generateTopicStructuredData } from '@/utils/seo'

interface Params {
  id: string;
  slug: string;
  locale?: string;
}

interface Props {
  params: Promise<Params>;
}

async function fetchSubIndustryData(id: string, slug: string, locale: string = 'en') {
  const apiUrl = getApiUrl(`/api/platform/industries/sub/${id}/${slug}`)
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": locale,
      "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    body: JSON.stringify({ top_knowledge: 10 })
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch sub-industry details: ${response.status}`)
  }

  const data = await response.json();
  return data
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug, locale = 'en' } = await params

  try {
    const { data } = await fetchSubIndustryData(id, slug, locale)

    console.log('sub-industry data', data);
    
    return {
      title: `${data.name} Sub-Industry Analysis | Insighta`,
      description: `Detailed analysis and insights about ${data.name} sub-industry, including ${data.topic.map((topic: TopicWithKnowledge) => topic.name).join(', ')}`,
      openGraph: {
        title: `${data.name} Sub-Industry Analysis | Insighta`,
        description: `Detailed analysis and insights about ${data.name} sub-industry, including ${data.topic.map((topic: TopicWithKnowledge) => topic.name).join(', ')}`,
      }
    }
  } catch (error) {
    return {
      title: 'Sub-Industry Analysis | Insighta',
      description: 'Detailed sub-industry analysis and insights'
    }
  }
}

export default async function SubIndustryPage({ params }: Props) {
  const { id, slug, locale = 'en' } = await params
  const isRTL = locale === 'ar';
  
  // Get translations
  const messages = await getMessages(locale);

  try {
    const { data: subIndustry } = await fetchSubIndustryData(id, slug, locale)
    const breadcrumbData = await fetchBreadcrumb('sub-industry', parseInt(id), locale)
    const breadcrumbItems = breadcrumbData.map(item => ({
      label: item.label,
      href: item.url
    }))
    
    // Generate structured data
    const structuredData = generateTopicStructuredData(
      {
        id: parseInt(id),
        name: subIndustry.name,
        slug: slug,
        description: `Detailed analysis and insights about ${subIndustry.name} sub-industry`
      },
      breadcrumbData.map(item => ({ label: item.label, url: item.url })),
      locale,
      'sub-industry'
    )

    return (
      <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([structuredData.breadcrumb, structuredData.webPage])
        }}
      />
      
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
              alt="Sub-industry page header background"
              src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
              fill
              className="object-cover z-0"
              priority
            />

            <div className="relative z-10 max-w-6xl mx-auto mt-5 w-full">
              <nav className="mb-8" aria-label="Breadcrumb">
                <Breadcrumb items={breadcrumbItems} />
              </nav>

              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-1">
                  <div className={`${isRTL ? 'text-right' : 'text-left'} mb-4 `} data-aos="fade-down">
                    <h1 className={`text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} mb-4 leading-[2]`}>
                      {subIndustry.name}
                    </h1>
                  </div>
                </div>
                <aside className="flex-shrink-0">
                  <StatisticsCards type="subIndustry" id={parseInt(id)} entityName={subIndustry.name} />
                </aside>
              </div>
            </div>
          </header>


          <section className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-xl font-bold text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text mb-8`}>
                {messages?.subIndustry?.topics || (locale === 'ar' ? 'المواضيع' : 'Topics')}
              </h2>

              <div 
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
                role="list"
                aria-label={messages?.subIndustry?.topics || (locale === 'ar' ? 'المواضيع' : 'Topics')}
              >
                {subIndustry.topic.map((topic: TopicWithKnowledge) => {
                  const isDisabled = topic.weight === 0;
                  
                  return isDisabled ? (
                    <div key={topic.id} className="h-full block max-w-[320px] sm:max-w-[100%]" role="listitem">
                      <TopicCard topic={topic} locale={locale} isRTL={isRTL} />
                    </div>
                  ) : (
                    <Link 
                      key={topic.id} 
                      href={`/${locale}/topic/${topic.id}/${topic.slug}`} 
                      className="h-full block max-w-[320px] sm:max-w-[100%]"
                      role="listitem"
                      aria-label={`View ${topic.name} topic details`}
                    >
                      <TopicCard topic={topic} locale={locale} isRTL={isRTL} />
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
