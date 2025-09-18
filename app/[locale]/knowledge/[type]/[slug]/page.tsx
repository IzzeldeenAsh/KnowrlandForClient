import Footer from '@/components/ui/footer'
import Breadcrumb from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import { generateKnowledgeMetadata, generateStructuredData } from '@/utils/seo';
import { use } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import CourseIcon from "@/components/icons/CourseIcon";
import KnowledgeIcon from "@/components/icons/knowledge-icon";
import { fetchBreadcrumb } from "@/utils/breadcrumb";
import KnowledgeSideBox from './KnowledgeSideBox';
import { StarIcon } from "@heroicons/react/20/solid";
import TabsContent from "./TabsContent";
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages';
import Link from 'next/link';
import { Rating, Text } from "@mantine/core";
import LanguageMismatchNotifier from './LanguageMismatchNotifier';

interface KnowledgeDetails {
  id: number;
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
  is_read_later?: boolean;
  purchased_status: 'non-purchased' | 'purchased' | 'partial-purchased';
  insighter: {
    name: string;
    profile_photo_url: string;
    uuid: string;
    roles: string[];
    company?: {
      legal_name: string;
      logo: string;
      uuid: string;
    };
  };
  documents: Array<{
    id: number;
    file_name: string;
    file_size: number;
    file_extension: string;
    price: string;
    description: string | null;
    is_purchased?: boolean;
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
    // Get auth token from cookies for server-side requests
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    // Prepare headers with auth token if available
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": locale,
      "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    
    // Add Authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    // Note: localStorage cleanup is handled by AuthHandler component
    
    const response = await fetch(
      `https://api.foresighta.co/api/platform/industries/knowledge/${slug}`,
      {
        method: "GET",
        headers,
        cache: "no-store", // Disable caching to always get fresh data
        next: { revalidate: 0 }, // Force revalidation on each request
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
    console.log('Knowledge Data' , data)  
    return data;
  } catch (error) {
    console.error("Error fetching knowledge data:", error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { type, slug, locale } = resolvedParams;

  try {
    const { data } = await fetchKnowledgeData(type, slug, locale);
    return generateKnowledgeMetadata(data, locale, type, slug);
  } catch (error) {
    const isRTL = locale === 'ar';
    return {
      title: isRTL ? "المعرفة غير موجودة | KNOLDG" : "Knowledge Not Found | KNOLDG",
      description: isRTL 
        ? "لم يتم العثور على المورد المعرفي المطلوب. تحقق من الرابط أو ابحث عن محتوى آخر على منصة KNOLDG."
        : "The requested knowledge resource could not be found. Please check the URL or search for other content on KNOLDG platform.",
      robots: { index: false, follow: false },
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
    publishedBy: isRTL ? 'نُشر بواسطة' : 'Published By',
    rating: isRTL ? 'التقييم' : 'Rating',
    company: isRTL ? 'الشركة' : 'Company',
  };

  // No try/catch here - let any errors be caught by the not-found page
  // Use the use() hook instead of await since we're in a client component
  const { data: knowledge } = use(fetchKnowledgeData(type, slug, locale));
  const breadcrumbData = use(fetchBreadcrumb("knowledge", slug, locale));
  const breadcrumbItems = breadcrumbData.map((item, index) => ({
    label: index === breadcrumbData.length - 1 ? "" : item.label,
    href: item.url,
  }));

  // Generate structured data
  const structuredData = generateStructuredData(knowledge, locale, type, slug);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            structuredData.article,
            structuredData.product,
            structuredData.organization,
            structuredData.breadcrumb
          ].filter(Boolean))
        }}
      />
      
    <div className="min-h-screen bg-gray-50 relative" dir={isRTL ? 'rtl' : 'ltr'} style={knowledge.language === 'arabic' ? { direction: 'rtl', textAlign: 'right' } : {}}>
      {/* Language mismatch notifier */}
      <LanguageMismatchNotifier 
        knowledgeLanguage={knowledge.language} 
        currentLocale={locale} 
      />
      
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
      <div className="section-header px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative overflow-hidden rounded-lg">
        <Image
          alt="Section background"
          src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
          fill
          className="object-cover z-0"
          priority
          sizes="100vw"
        />
        <div className="container mx-auto px-2 sm:px-4 relative z-10 mt-3 sm:mt-5">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          {/* Header */}
          <div className={`${isRTL ? 'text-right' : 'text-start'} mb-4 w-full`}    data-aos="fade-down">
            <div className="flex-row gap-3 sm:gap-4 flex-wrap sm:flex-nowrap sm:flex max-w-80-per">
              <div className="mb-4 mt-1 hidden sm:block">
                
                {knowledge.type === 'data' && <div className="bg-white p-2 sm:p-3 rounded flex items-center justify-center"><span className="hidden sm:block"><DataIcon width={40} height={40} /></span><span className="sm:hidden"><DataIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'insight' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><InsightIcon width={50} height={50} /></span><span className="sm:hidden"><InsightIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'manual' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><ManualIcon width={50} height={50} /></span><span className="sm:hidden"><ManualIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'report' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><ReportIcon width={50} height={50} /></span><span className="sm:hidden"><ReportIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'course' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><CourseIcon width={50} height={50} /></span><span className="sm:hidden"><CourseIcon width={30} height={30} /></span></div>}
                <div className="text-xs font-bold text-center bg-blue-100 uppercase mt-2 text-blue-500 rounded-md">
                    {messages && knowledge.type === 'data' ? messages?.Header?.navigation?.data || knowledge.type : 
                     knowledge.type === 'insight' ? messages?.Header?.navigation?.insight || knowledge.type : 
                     knowledge.type === 'manual' ? messages?.Header?.navigation?.manual || knowledge.type : 
                     knowledge.type === 'report' ? messages?.Header?.navigation?.report || knowledge.type : 
                     knowledge.type === 'course' ? messages?.Header?.navigation?.course || knowledge.type : 
                     knowledge.type}
                  </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex flex-col items-start mb-6 sm:mb-10">
                  <h3 className="text-3xl  md:text-4xl bg-gradient-to-r from-blue-500 to-teal-400 font-extrabold text-transparent bg-clip-text ">
                    {knowledge.title}
                  </h3>
                  
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm mt-4">
              {(knowledge.insighter.roles?.includes('company') || knowledge.insighter.roles?.includes('company-insighter')) ? (
                // Company display
                <>
                  <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                    <Link href={`/${locale}/profile/${knowledge.insighter.company?.uuid || knowledge.insighter.uuid}`} className="block h-full">
                      {knowledge.insighter.company?.logo ? (
                        <Image
                          src={knowledge.insighter.company.logo}
                          alt={knowledge.insighter.company.legal_name || 'Company'}
                          fill={true}
                          sizes="(max-width: 640px) 40px, 50px"
                          className="rounded-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-sm sm:text-lg text-white font-semibold">
                            {(knowledge.insighter.company?.legal_name || 'C')
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
                    <span className="text-sm text-gray-500">{translations.company}</span>
                    <span className="text-sm font-bold text-gray-700">
                      <Link className="hover:text-blue-600" href={`/${locale}/profile/${knowledge.insighter.company?.uuid || knowledge.insighter.uuid}`}>
                        {knowledge.insighter.company?.legal_name || knowledge.insighter.name}
                      </Link>
                    </span>
                  </span>
                  <div className="flex flex-col ps-4 sm:ps-8">
                    <span className="text-gray-500 text-sm">{translations.publishedBy}</span>
                    <div className="flex items-center gap-2">
                      <div className="relative w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]">
                        {knowledge.insighter.profile_photo_url ? (
                          <Image
                            src={knowledge.insighter.profile_photo_url}
                            alt={knowledge.insighter.name}
                            fill={true}
                            sizes="20px"
                            className="rounded-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-[6px] sm:text-[8px] text-white font-semibold">
                              {knowledge.insighter.name
                                .split(" ")
                                .map((word:any) => word[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <Link className="hover:text-blue-600 text-sm capitalize" href={`/${locale}/profile/${knowledge.insighter.uuid}?entity=insighter`}>
                        {knowledge.insighter.name.toLowerCase()}
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                // Original insighter display
                <>
                  <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                    <Link href={`/${locale}/profile/${knowledge.insighter.uuid}`} className="block h-full">
                      {knowledge.insighter.profile_photo_url ? (
                        <Image
                          src={knowledge.insighter.profile_photo_url}
                          alt={knowledge.insighter.name}
                          fill={true}
                          sizes="(max-width: 640px) 40px, 50px"
                          className="rounded-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-sm sm:text-lg text-white font-semibold">
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
                      <Link className="hover:text-blue-600" href={`/${locale}/profile/${knowledge.insighter.uuid}?entity=insighter`}>
                        {knowledge.insighter.name}
                      </Link>
                    </span>
                  </span>
                </>
              )}
              <div className="flex flex-col ps-4 sm:ps-8 mt-2 sm:mt-0">
                <span className="text-gray-500 text-sm">{translations.published}</span>
                <span className="text-sm font-bold text-gray-700">
                  {knowledge.published_at === null
                    ? "N/A"
                    : new Date(
                        knowledge.published_at
                      ).toLocaleDateString(isRTL ? 'en-US' : undefined)}
                </span>
              </div>
              {knowledge.review && knowledge.review.length > 0 && (
                <div className="flex flex-col ps-4 sm:ps-8 mt-2 sm:mt-0">
                  <span className="text-gray-500 text-sm">{translations.rating}</span>
                  <div className="flex items-center">
                    {(() => {
                      // Calculate average rating, capping individual ratings at 5
                      const validRatings = knowledge.review
                        .map((review: any) => Math.min(5, review.rate))
                        .filter((rate: number) => !isNaN(rate));
                      
                      const avgRating = validRatings.length > 0
                        ? validRatings.reduce((sum: number, rate: number) => sum + rate, 0) / validRatings.length
                        : 0;
                      
                      return (
                        <>
                          <Rating value={avgRating} fractions={2} readOnly size="sm" />
                          <span className="text-xs text-gray-500 ml-1">{avgRating.toFixed(1)} ({knowledge.review.length})</span>
                        </>
                      );
                    })()} 
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <TabsContent knowledge={knowledge} knowledgeSlug={slug} />
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
              knowledgeSlug={slug}
              purchased_status={knowledge.purchased_status}
              is_read_later={knowledge.is_read_later}
              knowledgeUUID={knowledge.id}
              insighterUUID={knowledge.insighter.uuid}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
}
