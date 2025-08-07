import Footer from '@/components/ui/footer'

import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Metadata } from 'next'
import IndustryIcon from "@/components/icons/industry-icon";
import Link from 'next/link';
import FolderIcon from '@/components/icons/folder-icon'
import { fetchBreadcrumb } from '@/utils/breadcrumb'
import StatisticsCards from '@/components/industry/statistics-cards'
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages'
import { IntlMessageFormat } from 'intl-messageformat';
import {  Text } from '@mantine/core';
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
  weight: number
  knowledge: Knowledge[]
}

interface SubIndustryDetails {
  id: number
  name: string
  slug: string
  weight: number
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

async function fetchSubIndustryData(id: string, slug: string, locale: string = 'en') {
  const response = await fetch(
    `https://api.knoldg.com/api/platform/industries/sub/${id}/${slug}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({ top_knowledge: 10 }),
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

  const data = await response.json();
  console.log(data);
  return data
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug, locale = 'en' } = await params

  try {
    const { data } = await fetchSubIndustryData(id, slug, locale)
    
    return {
      title: `${data.name} Sub-Industry Analysis | KNOLDG`,
      description: `Detailed analysis and insights about ${data.name} sub-industry, including ${data.topic.map((topic: Topic) => topic.name).join(', ')}`,
      openGraph: {
        title: `${data.name} Sub-Industry Analysis | KNOLDG`,
        description: `Detailed analysis and insights about ${data.name} sub-industry, including ${data.topic.map((topic: Topic) => topic.name).join(', ')}`,
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Sub-Industry Analysis | KNOLDG',
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
              <div className="flex row w-100 justify-between">
                
                {/* Left Side: Title */}
                <div className="min-h-[100px] flex flex-col md:flex-row items-start justify-between w-50">
                  <div className={`${isRTL ? 'text-right' : 'text-start'} mb-4`} data-aos="fade-down">
               
                    <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-5xl font-extrabold text-transparent bg-clip-text mb-4">
                      {subIndustry.name}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Interpolated message + Stats */}
                <div className="flex flex-col items-start justify-between w-50 gap-2">
                  <StatisticsCards type="subIndustry" id={parseInt(id)} entityName={subIndustry.name} />
                </div>
              </div>
            </div>
          </div>


          <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
              <div className={`mb-8 ${isRTL ? 'text-right' : 'text-start'}`}>
                {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {locale === 'ar' ? 'المواضيع' : 'Topics'}
                </h2> */}
                 <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text mb-8">
              {locale === 'ar' ? 'المواضيع' : 'Topics'}
            </h2>
              </div>

              {/* Topics Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {subIndustry.topic.map((topic: Topic) => {
                  const isDisabled = topic.weight === 0;
                  
                  const cardContent = (
                    <div 
                      className={`relative group bg-gradient-to-br from-white to-slate-50 rounded-sm p-6 shadow-md border border-slate-100 h-full flex flex-col ${!isDisabled ? 'hover:shadow-lg hover:border-blue-100 hover:from-white hover:to-blue-50 transition-all duration-300 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    >
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-center gap-2">
                          <FolderIcon width={20} height={20} className={`${!isDisabled ? 'text-blue-500' : 'text-gray-400'}`} />
                          <h3 className={`text-base font-bold ${!isDisabled ? 'text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text' : 'text-gray-900'}`}>
                            {topic.name}
                            {isDisabled && <span className="ml-2 text-xs text-gray-500"></span>}
                          </h3>
                        </div>
                        
                        {topic.knowledge.length > 0 ? (
                      <>
                          <Text size="xs" color="gray" fw={500} pb={5}>
                          {locale === 'ar' ? 'المعرفة:' : 'Knowledge:'}
                        </Text>
                          <ul className="space-y-1">
                            {topic.knowledge.map((item: Knowledge, index: number) => (
                              <li
                                key={`${item.id}-${index}`}
                                className="text-sm text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                              >
                                <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                                <Link href={`/${locale}/knowledge/${item.type}/${item.slug}`}>
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul></>
                        ) : (
                          <div className="text-xs text-gray-500 italic flex items-center">
                            <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
                            <p>{locale === 'ar' ? 'لا توجد عناصر معرفية متاحة' : 'No knowledge items available'}</p>
                          </div>
                        )}
                      </div>
                      <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'}`}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d={isRTL ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} 
                          />
                        </svg>
                      </div>
                      {isDisabled && (
                        <div className="min-w-[250px] absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded shadow-md bottom-1/2 mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                          {locale === 'ar' ? 'البيانات غير متوفرة' : 'No Knowledge Available Yet'}
                        </div>
                      )}
                    </div>
                  );
                  
                  return isDisabled ? (
                    <div key={topic.id} className="h-full">{cardContent}</div>
                  ) : (
                    <Link key={topic.id} href={`/${locale}/topic/${topic.id}/${topic.slug}`} className="h-full block">
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
