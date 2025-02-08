import FooterLight from '@/components/ui/footer-light'
import HeaderLight from '@/components/ui/header-light'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import IndustryIcon from "@/components/icons/industry-icon";
import Link from 'next/link';
import FolderIcon from '@/components/icons/folder-icon'
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

async function fetchSubIndustryData(id: string, slug: string) {
  const response = await fetch(
    `https://api.foresighta.co/api/industries/sub/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({ top_knowledge: 10 }),
      next: { revalidate: 3600 } // Cache for 1 hour
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
    throw new Error(`Failed to fetch sub-industry details: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params

  try {
    const { data } = await fetchSubIndustryData(id, slug)
    
    return {
      title: `${data.name} Sub-Industry Analysis | Foresighta`,
      description: `Detailed analysis and insights about ${data.name} sub-industry, including ${data.topic.map((topic: Topic) => topic.name).join(', ')}`,
      openGraph: {
        title: `${data.name} Sub-Industry Analysis | Foresighta`,
        description: `Detailed analysis and insights about ${data.name} sub-industry, including ${data.topic.map((topic: Topic) => topic.name).join(', ')}`,
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Sub-Industry Analysis | Foresighta',
      description: 'Detailed sub-industry analysis and insights'
    }
  }
}

export default async function SubIndustryPage({ params }: Props) {
  const { id, slug } = await params

  try {
    const { data: subIndustry } = await fetchSubIndustryData(id, slug)
    const breadcrumbData = await fetchBreadcrumb('sub-industry', parseInt(id))
    const breadcrumbItems = breadcrumbData.map(item => ({
      label: item.label,
      href: item.url
    }))

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
                <Breadcrumb items={breadcrumbItems} />
              </div>
              {/* Header */}
              <div className="text-start mb-4" data-aos="fade-down">
                <div className="flex flex-row gap-4">
                <div className="mb-4 mt-1">
                <IndustryIcon width={32} height={32}/>
                </div>
                 <div className="flex flex-col items-start ">
                 <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-3xl font-extrabold text-transparent bg-clip-text mb-4">
                    {subIndustry.name}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Topics & Knowledge</h2>
                <p className="text-gray-600">Explore topics and insights within {subIndustry.name}</p>
              </div>

              {/* Topics Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto">
                {subIndustry.topic.map((topic: Topic) => (
                  <div
                    key={topic.id}
                    className="relative bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    data-aos="fade-up"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FolderIcon width={20} height={20} />
                        <Link href={`/topic/${topic.id}/${topic.slug}`}>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {topic.name}
                          </h3>
                        </Link>
                      </div>

                      {topic.knowledge.length > 0 ? (
                        <ul className="space-y-1">
                          {topic.knowledge.map((item: Knowledge, index: number) => (
                            <li
                              key={`${item.id}-${index}`}
                              className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                            >
                              <span className="mr-2">•</span>
                              <Link href={`/knowledge/${item.type}/${item.slug}`}>
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-xs text-gray-500 italic flex items-center">
                          <span className="mr-2">•</span>
                          <p>No knowledge items available</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
