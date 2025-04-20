import Footer from '@/components/ui/footer'
import Breadcrumb from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import { use } from "react";
import { notFound } from "next/navigation";
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import KnowledgeIcon from "@/components/icons/knowledge-icon";
import { fetchBreadcrumb } from "@/utils/breadcrumb";
import KnowledgeSideBox from './KnowledgeSideBox';
import { StarIcon } from "@heroicons/react/20/solid";
import TabsContent from "./TabsContent";
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages';
import Link from 'next/link';

interface KnowledgeDetails {
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
  review: any[];
  is_review: boolean;
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

interface Props {
  params: Promise<{
    type: string;
    slug: string;
    locale: string;
  }>;
}

async function fetchKnowledgeData(type: string, slug: string, locale: string = 'en') {
  try {
    const response = await fetch(
      `https://api.foresighta.co/api/platform/industries/knowledge/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": locale,
        },
      }
    );

    if (!response.ok) {
      console.error("API Error:", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      
      if (response.status === 404) {
        notFound();
      }
      
      throw new Error(
        `Failed to fetch knowledge details: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching knowledge data:", error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // We need to await the promise in async context
  const resolvedParams = await params;
  const { type, slug, locale } = resolvedParams;

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
    // Let the not-found page handle this
    return {
      title: "Knowledge Not Found | KNOLDG",
      description: "The requested knowledge resource could not be found",
    };
  }
}

export default function KnowledgePage({ params }: Props) {
  const resolvedParams = use(params);
  const { type, slug, locale } = resolvedParams;
  const isRTL = locale === 'ar';
  
  // Get translations - use the use() hook instead of await since we're in a client component
  const messages = use(getMessages(locale));
  
  // Translations
  const translations = {
    insighter: isRTL ? 'إنسايتر' : 'Insighter',
    published: isRTL ? 'نُشر في' : 'Published',
    rating: isRTL ? 'التقييم' : 'Rating',
  };

  // No try/catch here - let any errors be caught by the not-found page
  // Use the use() hook instead of await since we're in a client component
  const { data: knowledge } = use(fetchKnowledgeData(type, slug, locale));
  const breadcrumbData = use(fetchBreadcrumb("knowledge", slug, locale));
  const breadcrumbItems = breadcrumbData.map((item) => ({
    label: item.label,
    href: item.url,
  }));

  return (
    <div className="min-h-screen bg-gray-50 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background decoration */}
      <div className="pointer-events-none absolute z-10 left-[10%] top-0 hidden md:block" aria-hidden="true">
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
      
      {/* Header Section */}
      <div className="section-header px-4 sm:px-6 lg:px-8 py-8  relative overflow-hidden rounded-lg">
        <Image
          alt="Section background"
          src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="container mx-auto px-4 relative z-10 mt-5">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          {/* Header */}
          <div className={`${isRTL ? 'text-right' : 'text-start'} mb-4`} data-aos="fade-down">
            <div className="flex flex-row gap-4">
              <div className="mb-4 mt-1">
                {knowledge.type === 'data' && <div className="bg-white p-3 rounded flex items-center justify-center"><DataIcon width={40} height={40} /></div>}
                {knowledge.type === 'insight' && <div className="bg-white p-2 rounded flex items-center justify-center"><InsightIcon width={50} height={50} /></div>}
                {knowledge.type === 'manual' && <div className="bg-white p-2 rounded flex items-center justify-center"><ManualIcon width={50} height={50} /></div>}
                {knowledge.type === 'report' && <div className="bg-white p-2 rounded flex items-center justify-center"><ReportIcon width={50} height={50} /></div>}
                {knowledge.type === 'course' && <div className="bg-white p-2 rounded flex items-center justify-center"><KnowledgeIcon width={50} height={50} /></div>}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex flex-col items-start mb-10">
                  <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-4xl font-extrabold text-transparent bg-clip-text lg:max-w-xl">
                    {knowledge.title}
                  </h3>
                  <div className="text-sm font-bold text-gray-700 capitalize">
                    {messages && knowledge.type === 'data' ? messages?.Header?.navigation?.data || knowledge.type : 
                     knowledge.type === 'insight' ? messages?.Header?.navigation?.insights || knowledge.type : 
                     knowledge.type === 'manual' ? messages?.Header?.navigation?.manuals || knowledge.type : 
                     knowledge.type === 'report' ? messages?.Header?.navigation?.reports || knowledge.type : 
                     knowledge.type === 'course' ? messages?.Header?.navigation?.courses || knowledge.type : 
                     knowledge.type}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="relative w-[50px] h-[50px]">
              <Link  href={`/${locale}/profile/${knowledge.insighter.uuid}`}>
                {knowledge.insighter.profile_photo_url ? (
                  <Image
                    src={knowledge.insighter.profile_photo_url}
                    alt={knowledge.insighter.name}
                    fill={true}
                    sizes="50px"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-lg text-white font-semibold">
                      {knowledge.insighter.name
                        .split(" ")
                        .map((word:any) => word[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                )}
                </Link>
              </div>
              <span className="flex flex-col">
              
                <span className="text-sm text-gray-500">{translations.insighter}</span>
                <span className="text-sm font-bold text-gray-700">
                <Link className="hover:text-blue-600" href={`/${locale}/profile/${knowledge.insighter.uuid}`}>
                  {knowledge.insighter.name}
                </Link>
                </span>
                
              </span>
              <div className="flex flex-col ps-8">
                <span className="text-gray-500 text-sm">{translations.published}</span>
                <span className="text-sm font-bold text-gray-700">
                  {knowledge.published_at === null
                    ? "N/A"
                    : new Date(
                        knowledge.published_at
                      ).toLocaleDateString(isRTL ? 'en-US' : undefined)}
                </span>
              </div>
              {/* <div className="flex flex-col ps-8">
                <span className="text-gray-500 text-sm">{translations.rating}</span>
                <span className="text-sm font-bold text-gray-700 flex items-center">
                  4.8
                  <StarIcon className="h-4 w-4 text-yellow-400 ml-1" />
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TabsContent knowledge={knowledge} />
          </div>
          <div className="lg:col-span-1">
            <KnowledgeSideBox
              total_price={knowledge.total_price}
              documents={knowledge.documents}
              language={knowledge.language}
              isic_code={knowledge.isic_code ? knowledge.isic_code : null}
              hs_code={knowledge.hs_code ? knowledge.hs_code : null}
              published_at={knowledge.published_at}
              economic_blocs={knowledge.economic_blocs}
              regions={knowledge.regions}
              countries={knowledge.countries}
              locale={locale}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
