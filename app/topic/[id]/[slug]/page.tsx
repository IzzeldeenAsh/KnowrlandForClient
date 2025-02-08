import FooterLight from '@/components/ui/footer-light'
import HeaderLight from '@/components/ui/header-light'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import IndustryIcon from "@/components/icons/industry-icon";
import Link from 'next/link';
import FolderIcon from '@/components/icons/folder-icon'
import KnowledgeIcon from '@/components/icons/knowledge-icon'
import { fetchBreadcrumb } from '@/utils/breadcrumb'

interface Knowledge {
  id: number
  type: string
  title: string
  slug: string
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
                    label: item.label,
                    href: item.url
                  }))} 
                />
              </div>
              {/* Header */}
              <div className="text-start mb-4" data-aos="fade-down">
                <div className="flex flex-row gap-4">
                <div className="mb-4 mt-1">
                <FolderIcon width={32} height={32} />
                </div>
                 <div className="flex flex-col items-start ">
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
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-start">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge</h2>
                <p className="text-gray-600">Explore insights within {topic.name}</p>
              </div>

              {/* Topics Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
  {topic.knowledge.map((item: Knowledge) => (
    <div
      key={item.id}
      className="bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300"
      data-aos="fade-up"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <KnowledgeIcon width={20} height={20} />
          <h3 className="text-sm font-semibold text-gray-900">
            {item.title}
          </h3>
        </div>
        <p className="text-xs text-gray-600">
          {item.type}
        </p>
        <Link 
          href={`/knowledge/${item.type}/${item.slug}`}
          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          Learn more →
        </Link>
      </div>
    </div>
  ))}
  {topic.knowledge.length === 0 && (
    <div className="col-span-full text-center py-8">
      <p className="text-gray-500 italic">No knowledge items available</p>
    </div>
  )}
</div>
            </div>
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
