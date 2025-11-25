import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import KnowledgeGrid from './KnowledgeGrid'
import StatisticsCards from '@/components/industry/statistics-cards'
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages'
import { getApiUrl } from '@/app/config'
import { TopicDetails } from '@/hooks/industries/types'


interface Params {
  id: string;
  slug: string;
  locale?: string;
}

interface Props {
  params: Promise<Params>;
}


async function fetchTopicData(id: string, slug: string, locale: string = 'en') {
  const apiUrl = getApiUrl(`/api/platform/industries/topics/${id}/${slug}`)
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": locale,
      "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    next: { revalidate: 3600 }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch topic details: ${response.status}`)
  }

  const data = await response.json()
  return data
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug, locale = 'en' } = await params

  try {
    const { data } = await fetchTopicData(id, slug, locale)
    
    return {
      title: `${data.name} Topic Analysis | Insighta`,
      description: `Detailed analysis and insights about ${data.name} topic.`,
      openGraph: {
        title: `${data.name} Topic Analysis | Insighta`,
        description: `Detailed analysis and insights about ${data.name} topic.`,
      }
    }
  } catch (error) {
    return {
      title: 'Topic Analysis | Insighta',
      description: 'Detailed topic analysis and insights'
    }
  }
}

export default async function TopicPage({ params }: Props) {
  const { id, slug, locale = 'en' } = await params
  const isRTL = locale === 'ar';
  
  // Get translations
  const messages = await getMessages(locale);

  try {
    const { data: topic } = await fetchTopicData(id, slug, locale)
    const breadcrumbData = await fetchBreadcrumb('topic', parseInt(id), locale)
    const breadcrumbItems = breadcrumbData.map(item => ({
      label: item.label,
      href: item.url
    }))
    const showStatistics = !!topic?.knowledge?.length;

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
              alt="Topic page header background"
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
                  <div className={`${isRTL ? 'text-right' : 'text-left'} mb-4`} data-aos="fade-down">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-4 leading-[2]">
                      {topic.name}
                    </h1>
                  </div>
                </div>

                {showStatistics && (
                  <aside className="flex-shrink-0">
                    <StatisticsCards type="topic" id={parseInt(id)} entityName={topic.name} />
                  </aside>
                )}
              </div>
            </div>
          </header>


          <section className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text mb-8">
                {messages?.topic?.knowledge || (locale === 'ar' ? 'المعرفة' : 'Knowledge')}
              </h2>
              <KnowledgeGrid knowledge={topic.knowledge} topicName={topic.name} showHeader={false} />
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
