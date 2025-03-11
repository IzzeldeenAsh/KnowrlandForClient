import { Metadata } from 'next'
import PageIllustration from "@/components/page-illustration"
import IndustriesGrid from '@/components/industries-grid'
import HeaderLight from '@/components/ui/header-light'
import FooterLight from '@/components/ui/footer-light'
import Breadcrumb from '@/components/ui/breadcrumb'

interface Params {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export const metadata: Metadata = {
  title: 'All Industries - KNOLDG',
  description: 'Explore all industries and their sub-categories.',
}

async function getAllIndustries(locale: string) {
  
  const apiUrl = 'https://api.foresighta.co/api/industries'
  
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify({
        top_sub_industry: 10,
      }),
      next: {
        revalidate: 0
      }
    })


    if (!res.ok) {
      throw new Error(`Failed to fetch industries: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return { data, error: null }
  } catch (error) {
    
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to fetch industries' 
    }
  }
}

export default async function AllIndustries({ params }: Props) {
  const { locale = 'en' } = await params;
  const { data, error } = await getAllIndustries(locale)
  
  const mockIndustries = [
    {
      id: 1,
      name: "Technology",
      slug: "technology",
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
      children: [
        { id: 4, name: "Medical Devices", slug: "medical-devices" },
        { id: 5, name: "Pharmaceuticals", slug: "pharmaceuticals" },
        { id: 6, name: "Healthcare IT", slug: "healthcare-it" },
      ]
    },
  ]

  const industries = data?.data || mockIndustries

  const breadcrumbItems = [
    { label: 'Industries', href: `/${locale}/all-industries` }
  ]

  return (
    <>
    <HeaderLight />
    <div className="flex flex-col min-h-screen">
     
      <main className="grow">
           <PageIllustration />
                {/* Section header */}
              <div className="section-header   px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative overflow-hidden rounded-lg">
                  <div className="relative z-10 max-w-6xl relative mx-auto mt-20 w-full ">
                   <Breadcrumb items={breadcrumbItems} />
                  <div className="mx-auto  max-w-3xl text-center pb-12 md:pb-16">
                    <h1 
                      className="h1 mb-4 font-bold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400" 
                      data-aos="zoom-y-out"
                    >
                      All Industries
                    </h1>
                    <p 
                      className="text-xl text-gray-600"
                      data-aos="zoom-y-out" 
                      data-aos-delay="150"
                    >
                      Explore our comprehensive list of industries and their sub-categories.
                    </p>
                    {error && (
                      <div className="mt-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                        {error}
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
     <FooterLight />
     </>
  )
}
