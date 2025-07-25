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
  weight: number
  industry: {
    id: number
    name: string
    slug: string
    weight: number
  }
}

interface IndustryChild {
  id: number
  name: string
  slug: string
  weight: number
  topic: Topic[]
}

interface IndustryDetails {
  id: number
  name: string
  slug: string
  weight: number
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
    `https://api.foresighta.co/api/platform/industries/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
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

  const data = await response.json();
  console.log('API Response Industry:', data.data)

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
                   
                    <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-5xl font-extrabold text-transparent bg-clip-text mb-4">
                      {industry.name}
                    </h3>
                  
                   </div>
                  </div>
                  <div className="flex flex-col items-start justify-between w-50 gap-2">
                    {/* Stats Cards */}
                    <StatisticsCards type="industry" id={parseInt(id)} entityName={industry.name} />
                  </div>
                  
                  </div>
                </div>
        </div>
        
        <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-8 ${isRTL ? 'text-right' : 'text-start'}`}>
              {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {locale === 'ar' ? 'المجالات الفرعية' : 'Sub Industries'}
              </h2> */}
           
            </div>
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text mb-8">
              {locale === 'ar' ? 'الصناعات الفرعية' : 'Sub Industries'}
            </h2>
            {/* Industry Children */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {industry.children.map((child: IndustryChild) => {
                const isDisabled = child.weight === 0;
                
                const cardContent = (
                  <div 
                    className={`relative group bg-gradient-to-br from-white to-slate-50 rounded-sm p-6 shadow-md border border-slate-100 h-full flex flex-col ${!isDisabled ? 'hover:shadow-lg hover:border-blue-100 hover:from-white hover:to-blue-50 transition-all duration-300 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                  >
                    <div className="space-y-2 flex-grow">
                      <h3 className={`text-base font-bold ${!isDisabled ? 'text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text' : 'text-gray-900'}`}>
                        {child.name}
                        {isDisabled && <span className="ml-2 text-xs text-gray-500"></span>}
                      </h3>
                      
                      {child.topic.length > 0 ? (
                        <ul className="space-y-1">
                          {child.topic.map((topic: Topic) => {
                            const isTopicDisabled = topic.weight === 0;
                            
                            return (
                              <li 
                                key={topic.id} 
                                className={`text-sm text-gray-700 ${!isTopicDisabled && !isDisabled ? 'hover:text-blue-600 transition-colors' : ''} flex items-center`}
                              >
                                {(!isDisabled && !isTopicDisabled) ? (
                                  <Link href={`/${locale}/topic/${topic.id}/${topic.slug}`}>
                                    <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                                    {topic.name}
                                  </Link>
                                ) : (
                                  <>
                                    <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                                    <span className={isTopicDisabled ? "opacity-50" : ""}>{topic.name}</span>
                                  </>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="text-xs text-gray-500 italic flex items-center">
                          <span className={isRTL ? "ml-2" : "mr-2"}></span>
                          <p>{locale === 'ar' ? 'لا توجد مواضيع متاحة' : 'No topics available'}</p>
                        </div>
                      )}
                    </div>
                    <div className={`absolute top-6  ${isRTL ? 'left-6' : 'right-6'}`}>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d={isRTL ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} 
                        />
                      </svg>
                    </div>{isDisabled && (<div className={` absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded shadow-md bottom-1/2 mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300`}><div className='min-w-[240px]'>{locale === 'ar' ? 'البيانات غير متوفرة' : 'No Knowledge Available Yet'}</div></div>)}
                  </div>
                );
                
                return isDisabled ? (
                  <div key={child.id} className="h-full">{cardContent}</div>
                ) : (
                  <Link key={child.id} href={`/${locale}/sub-industry/${child.id}/${child.slug}`} className="h-full block">
                    {cardContent}
                  </Link>
                );
              })}
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
