import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import KnowledgeGrid from './KnowledgeGrid'
import StatisticsCards from '@/components/industry/statistics-cards'
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages'
import { IntlMessageFormat } from 'intl-messageformat';

interface Knowledge {
  id: number
  type: string
  title: string 
  slug: string
  insighter: {
    name: string
    profile_photo_url: string
  }
  published_at: string
  total_price: string
}

interface Topic {
  id: number
  name: string
  slug: string
  knowledge: Knowledge[]
}

interface SubIndustryDetails {
  id: number
  name: string
  slug: string
  topic: Topic[]
}

interface Params {
  id: string;
  slug: string;
  locale?: string;
}

interface Props {
  params: Promise<Params>;
}


async function fetchTopicData(id: string, slug: string, locale: string = 'en') {
  const response = await fetch(
    `https://api.knoldg.com/api/platform/industries/topics/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    }
  )

  if (!response.ok) {
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url
    })
    const errorText = await response.text()
    console.error('Error response:', errorText)
    throw new Error(`Failed to fetch topic details: ${response.status} ${response.statusText}`)
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
      title: `${data.name} Topic Analysis | KNOLDG`,
      description: `Detailed analysis and insights about ${data.name} topic.`,
      openGraph: {
        title: `${data.name} Topic Analysis | KNOLDG`,
        description: `Detailed analysis and insights about ${data.name} topic.`,
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Topic Analysis | KNOLDG',
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
    
        <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="section-header px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden rounded-lg">
            <Image
              alt="Section background"
              src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
              fill
              className="object-cover z-0"
              priority
            />

            <div className="relative z-10 max-w-6xl mx-auto mt-5 w-full">
              {/* Breadcrumb */}
                 <div className="mb-8">
                    <Breadcrumb items={breadcrumbItems} />
                  </div>

              {/* Header Wrapper Split */}
              <div className="flex flex-row w-full justify-between">
                
                {/* Left Side: Title */}
                <div className="min-h-[100px] flex flex-col md:flex-row items-start justify-between w-50">
                  <div className={`${isRTL ? 'text-right' : 'text-start'} mb-4`} data-aos="fade-down">
               
                    <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-5xl font-extrabold text-transparent bg-clip-text mb-4">
                      {topic.name}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Stats */}
                {showStatistics && (
                  <div className="flex flex-col items-start justify-between w-50 gap-2">
                    <StatisticsCards type="topic" id={parseInt(id)} entityName={topic.name} />
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
              <div className={`mb-8 ${isRTL ? 'text-right' : 'text-start'}`}>
                 <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text mb-8">
              {locale === 'ar' ? 'المعرفة' : 'Knowledge'}
            </h2>
              </div>
              <KnowledgeGrid knowledge={topic.knowledge} topicName={topic.name} showHeader={false} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  } catch (error) {
    console.error('Page render error:', error)
    throw error // Let the error boundary handle it
  }
}
