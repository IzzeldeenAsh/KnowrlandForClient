import { Metadata } from 'next'
import PageIllustration from "@/components/page-illustration"
import IndustriesGrid from '@/components/industries-grid'
import HeaderLight from '@/components/ui/header-light'
import FooterLight from '@/components/ui/footer-light'

export const metadata: Metadata = {
  title: 'All Industries - ForesightA',
  description: 'Explore all industries and their sub-categories.',
}

async function getAllIndustries() {
  
  const apiUrl = 'https://api.foresighta.co/api/industries'
  
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
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

export default async function AllIndustries() {
  const { data, error } = await getAllIndustries()
  
  const mockIndustries = [
    {
      id: 1,
      name: "Technology",
      children: [
        { id: 1, name: "Software Development" },
        { id: 2, name: "Cloud Computing" },
        { id: 3, name: "Artificial Intelligence" },
      ]
    },
    {
      id: 2,
      name: "Healthcare",
      children: [
        { id: 4, name: "Medical Devices" },
        { id: 5, name: "Pharmaceuticals" },
        { id: 6, name: "Healthcare IT" },
      ]
    },
  ]

  const industries = data?.data || mockIndustries

  return (
    <>
    <HeaderLight />
      <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl text-center pb-12 md:pb-16">
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

          {/* Industries grid */}
          <IndustriesGrid industries={industries} />
        </div>
      </div>
    </section>
    <FooterLight />
    </>
  
  )
}
