import FooterLight from '@/components/ui/footer-light'
import HeaderLight from '@/components/ui/header-light'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import KnowledgeGrid from './KnowledgeGrid'

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
}

interface Props {
  params: Promise<Params>;
}


async function fetchTopicData(id: string, slug: string) {
  const response = await fetch(
    `https://api.foresighta.co/api/industries/topics/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
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
  const { id, slug } = await params

  try {
    const { data } = await fetchTopicData(id, slug)
    
    return {
      title: `${data.name} Topic Analysis | Foresighta`,
      description: `Detailed analysis and insights about ${data.name} topic.`,
      openGraph: {
        title: `${data.name} Topic Analysis | Foresighta`,
        description: `Detailed analysis and insights about ${data.name} topic.`,
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Topic Analysis | Foresighta',
      description: 'Detailed topic analysis and insights'
    }
  }
}

export default async function TopicPage({ params }: Props) {
  const { id, slug } = await params

  try {
    const { data: topic } = await fetchTopicData(id, slug)
    const breadcrumbItems = await fetchBreadcrumb('topic', parseInt(id))

    return (
      <>
        <HeaderLight />
        <div className="min-h-screen bg-gray-50">
          <div className="section-header px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative overflow-hidden rounded-lg">
            <Image
              alt="Section background"
              src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
              fill
              className="object-cover z-0"
              priority
            />
            <div className="relative z-10 max-w-6xl relative mx-auto mt-20 w-full">
              {/* Breadcrumb */}
              <div className="mb-8">
                <Breadcrumb 
                  items={breadcrumbItems.map(item => ({
                    key: item.url,
                    label: item.label,
                    href: item.url
                  }))} 
                />
              </div>
              {/* Header */}
              <div className="text-start mb-4" data-aos="fade-down">
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col items-start">
                    <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase">
                      Topic
                    </span>
                    <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-3xl font-extrabold text-transparent bg-clip-text mb-4">
                      {topic.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
            <KnowledgeGrid knowledge={topic.knowledge} topicName={topic.name} />
          </div>
        </div>
        <FooterLight />
      </>
    )
  } catch (error) {
    console.error('Page render error:', error)
    throw error // Let the error boundary handle it
  }
}
