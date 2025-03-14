import { Metadata } from 'next';
;
import FooterLight from '@/components/ui/footer-light';
import Breadcrumb from '@/components/ui/breadcrumb';
import { notFound } from 'next/navigation';
import { fetchBreadcrumb } from '@/utils/breadcrumb';
import Stripes from "@/public/images/stripes-dark.svg";
import { cookies } from "next/headers";
import Image from "next/image";
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import KnowledgeIcon from "@/components/icons/knowledge-icon";
import IndustryIcon from "@/components/icons/industry-icon";
import { getTranslations } from 'next-intl/server';
import KnowledgeSideBox from './KnowledgeSideBox';
import { StarIcon } from "@heroicons/react/20/solid";
import TabsContent from "./TabsContent";

interface Params {
  type: string;
  slug: string;
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export interface KnowledgeDetails {
  type: string;
  title: string;
  slug: string;
  description: string;
  isic_code: {
    id: number;
    key: number;
    name: string;
  };
  hs_code: any;
  language: string;
  total_price: string;
  countries: Array<{
    id: number;
    name: string;
    flag: string;
  }>;
  regions: any[];
  economic_blocs: any[];
  status: string;
  published_at: string;
  review: Array<{
    id: number;
    rate: number;
    comment: string;
    user_name: string;
    created_date: string;
  }>;
  is_review?: boolean;
  insighter: {
    name: string;
    profile_photo_url: string;
  };
  documents: Array<{
    id: number;
    file_name: string;
    file_size: number;
    file_extension: string;
    price: string;
    description: string | null;
    table_of_content: {
      chapter: {
        title: string;
        page: number;
        sub_child: {
          title: string;
          page: number;
        };
      };
    };
  }>;
}

async function fetchKnowledgeData(type: string, slug: string, locale: string = 'en') {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;
  
  try {
    const response = await fetch(
      `https://api.foresighta.co/api/industries/knowledge/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": locale,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch knowledge details: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Knowledge data fetch error:", error instanceof Error ? error.message : String(error));
    throw error; // Re-throw to be handled by the calling function
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug, locale = 'en' } = await params;

  try {
    const { data } = await fetchKnowledgeData(type, slug, locale);

    return {
      title: `${data.title} | KNOLDG Knowledge`,
      description: `Detailed knowledge and insights about ${data.title}`,
      openGraph: {
        title: `${data.title} | KNOLDG Knowledge`,
        description: `Detailed knowledge and insights about ${data.title}`,
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Knowledge | KNOLDG",
      description: "Detailed knowledge and insights",
    };
  }
}

export default async function KnowledgePage({ params }: Props) {
  const { type, slug, locale = 'en' } = await params;

  try {
    const { data: knowledge } = await fetchKnowledgeData(type, slug, locale);
    const breadcrumbData = await fetchBreadcrumb("knowledge", slug);
    const breadcrumbItems = breadcrumbData.map((item) => ({
      label: item.label,
      href: item.url,
    }));

    return (
      <>
      
        <div className="relative z-10 max-w-6xl relative mx-auto  w-full ">
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
            style={{ left: '10%' }}
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
      
        <div className="min-h-screen bg-gray-50">
          <div className="section-header px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative overflow-hidden rounded-lg">
            <Image
              alt="Section background"
              src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
              fill
              className="object-cover z-0"
              priority
            />
            <div className="relative z-10 container mx-auto px-4 relative mt-20 w-full">
              {/* Breadcrumb */}
              <div className="mb-8">
                <Breadcrumb items={breadcrumbItems} />
              </div>
              {/* Header */}
              <div className="text-start mb-4" data-aos="fade-down">
                <div className="flex flex-row gap-4">
                  <div className="mb-4 mt-1">
                    {knowledge.type === 'data' &&<div className="bg-white p-3 rounded  flex items-center justify-center"> <DataIcon width={40} height={40} /> </div>}
                    {knowledge.type === 'insight' && <div className="bg-white p-2 rounded  flex items-center justify-center"> <InsightIcon width={50} height={50} /> </div>}
                    {knowledge.type === 'manual' && <div className="bg-white p-2 rounded  flex items-center justify-center"> <ManualIcon width={50} height={50} /> </div>}
                    {knowledge.type === 'report' && <div className="bg-white p-2 rounded  flex items-center justify-center"> <ReportIcon width={50} height={50} /> </div>}
                    {knowledge.type === 'course' && <div className="bg-white p-2 rounded  flex items-center justify-center"> <KnowledgeIcon width={50} height={50} /> </div>}
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="flex flex-col items-start mb-10">
                      <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-4xl font-extrabold text-transparent bg-clip-text max-w-3xl">
                        {knowledge.title}
                      </h3>
                      <div className="text-sm font-bold text-gray-700 capitalize">
                        {knowledge.type}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Rest of the component... */}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <TabsContent knowledge={knowledge} />
              </div>
              <div className="md:col-span-1">
                <KnowledgeSideBox 
                  total_price={knowledge.total_price}
                  documents={knowledge.documents}
                  language={knowledge.language}
                  isic_code={knowledge.isic_code}
                  hs_code={knowledge.hs_code}
                  published_at={knowledge.published_at}
                  economic_blocs={knowledge.economic_blocs}
                  regions={knowledge.regions}
                  countries={knowledge.countries}
                />
              </div>
            </div>
          </div>
        </div>
        <FooterLight />
      </>
    );
  } catch (error) {
    console.error("Error in KnowledgePage:", error);
    return notFound();
  }
} 