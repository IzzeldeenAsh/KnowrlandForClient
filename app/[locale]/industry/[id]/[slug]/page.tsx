import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import IndustryIcon from "@/components/icons/industry-icon";
import Link from 'next/link'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import StatisticsCards from '@/components/industry/statistics-cards'
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages'
import { IntlMessageFormat } from 'intl-messageformat';

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
  locale?: string;
}

interface Props {
  params: Promise<Params>;
}

async function fetchIndustryData(id: string, slug: string, locale: string = 'en') {
  const response = await fetch(
    `https://api.knoldg.com/api/platform/industries/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,
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
    console.error('Metadata generation error:', error)
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
    

      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="section-header px-4 sm:px-6 lg:px-8 py-8  relative overflow-hidden rounded-lg">
                <Image
                  alt="Section background"
                  src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
                  fill
                  className="object-cover z-0"
                  priority
                />
                <div className="relative z-10 max-w-6xl relative mx-auto mt-5 w-full ">
                  {/* Breadcrumb */}
                  <div className="mb-8">
                    <Breadcrumb items={breadcrumbItems.map(item => ({ ...item, href: item.url }))} />
                  </div>

                  <div className='flex row w-100 justify-between'>

                  {/* Header */}
                  <div className="min-h-[100px] flex flex-col md:flex-row items-start justify-between w-50">
                  <div className={`${isRTL ? 'text-right' : 'text-start'} mb-4`} data-aos="fade-down">
                    <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase">
                      {messages?.Header?.navigation?.industries || 'Industry'}
                    </span>
                    <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-5xl font-extrabold text-transparent bg-clip-text mb-4">
                      {industry.name}
                    </h3>
                  
                   </div>
                  </div>
                  <div className="flex flex-col items-start justify-between w-50">
                  <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 capitalize w-100">
                    {
                      new IntlMessageFormat(
                        messages?.industryKnowledge || 'Type of knowledge available in {industry}',
                        locale
                      ).format({ industry: industry.name })
                    }
                  </span>
                    {/* Stats Cards */}
                    <StatisticsCards type="industry" id={parseInt(id)}  />
                  </div>
                  
                  </div>
                </div>
        </div>
        
        <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-8 ${isRTL ? 'text-right' : 'text-start'}`}>
              {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {locale === 'ar' ? 'الصناعات الفرعية' : 'Sub Industries'}
              </h2> */}
           
            </div>
            
            {/* Industry Children */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto ">
              {industry.children.map((child: IndustryChild) => (
                 <Link key={child.id} href={`/${locale}/sub-industry/${child.id}/${child.slug}`} className="block">
                <div
                  className="relative min-h-[140px] bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  data-aos="fade-up"
                >
                    <div className="space-y-2">
                 
                      <div className="flex items-center gap-2">
                        <IndustryIcon />
                        <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                          {child.name}
                        </h3>
                      </div>
                     
                      {child.topic.length > 0 ? (
                        <ul className="space-y-1">
                          {child.topic.map((topic: Topic) => (
                            <Link href={`/${locale}/topic/${topic.id}/${topic.slug}`} key={topic.id} className="block">
                            <li
                              key={topic.id}
                              className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                            >
                              <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                              {topic.name}
                            </li>
                            </Link>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-xs text-gray-500 italic flex items-center">
                          <span className={isRTL ? "ml-2" : "mr-2"}></span>
                          <p>{locale === 'ar' ? 'لا توجد مواضيع متاحة' : 'No topics available'}</p>
                        </div>
                      )}
                    </div>
                
                </div>
                </Link>
              ))}
            </div>
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
