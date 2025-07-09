import { Metadata } from 'next'
import PageIllustration from "@/components/page-illustration"
import IndustriesGrid from '@/components/industries-grid'

import Footer from '@/components/ui/footer'
import Breadcrumb from '@/components/ui/breadcrumb'

// Import translation utilities
import { getMessages } from '@/app/utils/get-messages'
import { getApiUrl } from '@/app/config'

interface Params {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export const metadata: Metadata = {
  title: 'Industries - KNOLDG',
  description: 'Explore all industries and their sub-categories.',
}

async function getAllIndustries(locale: string) {
  
  const apiUrl = getApiUrl('/api/platform/industries')
  
  try {
    console.log('Fetching industries from:', apiUrl)
    console.log('Request params:', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json",
        "Accept-Language": locale
      },
      body: JSON.stringify({
        top_sub_industry: 3,
      })
    })

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({
        top_sub_industry: 3,
      }),
      next: {
        revalidate: 0
      }
    })

    if (!res.ok) {
      const error = `Failed to fetch industries: ${res.status} ${res.statusText}`
      console.error(error)
      throw new Error(error)
    }

    const data = await res.json()
    console.log('API Response All Industries:', data.data)
    console.log('API Response All Industries:', data)
    return { data, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch industries'
    console.error('Error fetching industries:', errorMessage)
    return { 
      data: null, 
      error: errorMessage
    }
  }
}

export default async function AllIndustries({ params }: Props) {
  const { locale = 'en' } = await params;
  const { data, error } = await getAllIndustries(locale)
  
  // Get translations
  const messages = await getMessages(locale);
  const isRTL = locale === 'ar';
  
  const mockIndustries = [
    {
      id: 1,
      name: "Technology",
      slug: "technology",
      icon: "https://4sighta-common.s3.eu-north-1.amazonaws.com/industry/1/technology.svg",
      weight: 1,
      children: [
        { id: 1, name: "Software Development", slug: "software-development" },
        { id: 2, name: "Cloud Computing", slug: "cloud-computing" },
        { id: 3, name: "Artificial Intelligence", slug: "artificial-intelligence" },
      ]
    },
    {
      id: 2,
      name: "Healthcare",
      slug: "healthcare",
      icon: "https://4sighta-common.s3.eu-north-1.amazonaws.com/industry/2/healthcare.svg",
      weight: 2,
      children: [
        { id: 4, name: "Medical Devices", slug: "medical-devices" },
        { id: 5, name: "Pharmaceuticals", slug: "pharmaceuticals" },
        { id: 6, name: "Healthcare IT", slug: "healthcare-it" },
      ]
    },
  ]

  const industries = data?.data || mockIndustries

  const breadcrumbItems = [
    { label: messages?.Header?.navigation?.industries || 'Industries', href: `/${locale}/all-industries` }
  ]

  return (
    <>
  
    <div className="flex flex-col min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
     
      <main className="grow">
           <PageIllustration />
                {/* Section header */}
              <div className="section-header px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative overflow-hidden rounded-lg">
                  <div className="relative z-10 max-w-6xl relative mx-auto mt-5 w-full ">
                   <Breadcrumb items={breadcrumbItems} />
                  <div className="mx-auto max-w-3xl text-center pb-12 ">
                    <h2 
                      className="h2 font-bold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 " 
                      data-aos="zoom-y-out"
                      style={{lineHeight: '1.2'}}
                    >
                      {messages?.Header?.navigation?.industries || 'Industries'}
                    </h2>
                    
                  
                    {error && (
                      <div className="mt-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                        {locale === 'ar' ? 'حدث خطأ أثناء تحميل البيانات' : error}
                      </div>
                    )}
                  </div>
                  </div>
               </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pb-12 ">
            <section className="relative">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className=" pb-12 md:pb-20">
                  {/* Industries grid */}
                  <IndustriesGrid industries={industries} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
     
    </div>
     <Footer />
     </>
  )
}
