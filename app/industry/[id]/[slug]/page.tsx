import FooterLight from '@/components/ui/footer-light'
import HeaderLight from '@/components/ui/header-light'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import IndustryIcon from "@/components/icons/industry-icon";
import Link from 'next/link'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import styles from './industry.module.css'

interface Topic {
  id: number
  name: string
  slug: string
}

interface IndustryChild {
  id: number
  name: string
  slug: string
  topic: Topic[]
}

interface IndustryDetails {
  id: number
  name: string
  slug: string
  children: IndustryChild[]
}

interface Params {
  id: string;
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

async function fetchIndustryData(id: string, slug: string) {
  const response = await fetch(
    `https://api.foresighta.co/api/industries/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({ top_topic: 2 }),
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
    throw new Error(`Failed to fetch industry details: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { id, slug } = await params

  try {
    const { data } = await fetchIndustryData(id, slug)
    
    return {
      title: `${data.name} Industry Analysis | Foresighta`,
      description: `Detailed analysis and insights about ${data.name} industry, including ${data.children.map((child: IndustryChild) => child.name).join(', ')}`,
      openGraph: {
        title: `${data.name} Industry Analysis | Foresighta`,
        description: `Detailed analysis and insights about ${data.name} industry, including ${data.children.map((child: IndustryChild) => child.name).join(', ')}`,
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Industry Analysis | Foresighta',
      description: 'Detailed industry analysis and insights'
    }
  }
}

export default async function IndustryPage({ params }: Props) {
const { id, slug } = await params

  try {
    const { data: industry } = await fetchIndustryData(id, slug)
    const breadcrumbItems = await fetchBreadcrumb('industry', parseInt(id))

    return (
      <>
      <HeaderLight />
      <div className="min-h-screen bg-gray-50  ">
        <div className="section-header px-4 sm:px-6 lg:px-8 py-8  relative overflow-hidden rounded-lg">
                <Image
                  alt="Section background"
                  src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
                  fill
                  className="object-cover z-0"
                  priority
                />
                <div className="relative z-10 max-w-6xl relative mx-auto mt-20 w-full ">
                  {/* Breadcrumb */}
                  <div className="mb-8">
                    <Breadcrumb items={breadcrumbItems.map(item => ({ ...item, href: item.url }))} />
                  </div>
                
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start justify-between">
                  <div className="text-start mb-4" data-aos="fade-down">
                    <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase">
                      Industry
                    </span>
                    <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-3xl font-extrabold text-transparent bg-clip-text mb-4">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                      {/* Stats Cards */}
                  <div className={`${styles.statsContainer} flex-row md:flex-col`}>
                    <div className={`${styles.statsCard}`}>
                      <div className={styles.statsNumber}>20</div>
                      <div className={styles.statsLabel}>Reports</div>
                    </div>
                    <div className={styles.statsCard}>
                      <div className={styles.statsNumber}>10</div>
                      <div className={styles.statsLabel}>Data</div>
                    </div>
                    <div className={styles.statsCard}>
                      <div className={styles.statsNumber}>4</div>
                      <div className={styles.statsLabel}>Insights</div>
                    </div>
                  </div>
                  </div>
                 
                </div>
        </div>
        
        <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-start">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sub Industries</h2>
              <p className="text-gray-600">Explore specialized sectors within {industry.name}</p>
            </div>
            
            {/* Industry Children */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto ">
              {industry.children.map((child: IndustryChild) => (
                <div
                  key={child.id}
                  className="relative bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  data-aos="fade-up"
                >
                    <div className="space-y-2">
                  <Link href={`/sub-industry/${child.id}/${child.slug}`} className="block">
                      <div className="flex items-center gap-2">
                        <IndustryIcon />
                        <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                          {child.name}
                        </h3>
                      </div>
                      </Link>
                      {child.topic.length > 0 ? (
                        <ul className="space-y-1">
                          {child.topic.map((topic: Topic) => (
                            <Link href={`/topic/${topic.id}/${topic.slug}`} key={topic.id} className="block">
                            <li
                              key={topic.id}
                              className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                            >
                              <span className="mr-2">•</span>
                              {topic.name}
                            </li>
                            </Link>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-xs text-gray-500 italic flex items-center">
                          <span className="mr-2">•</span>
                          <p>No topics available</p>
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
