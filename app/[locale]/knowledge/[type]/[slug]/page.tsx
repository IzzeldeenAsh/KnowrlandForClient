import Footer from '@/components/ui/footer'
import Breadcrumb from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import { generateKnowledgeMetadata, generateStructuredData } from '@/utils/seo';
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import CourseIcon from "@/components/icons/CourseIcon";
import { fetchBreadcrumb } from "@/utils/breadcrumb";
import KnowledgeSideBox from './KnowledgeSideBox';
import { StarIcon } from "@heroicons/react/20/solid";
import TabsContent from "./TabsContent";
import Stripes from "@/public/images/stripes-dark.svg";
import { getMessages } from '@/utils/get-messages';
import { publicBaseUrl } from '@/app/config';
import Link from 'next/link';
import { Rating, Text } from "@mantine/core";
import LanguageMismatchNotifier from './LanguageMismatchNotifier';
import RelatedKnowledgeSummarySection, { type RelatedKnowledgeSummaryItem } from './RelatedKnowledgeSummarySection';
import RelatedKnowledgeItemsSection, { type RelatedKnowledgeItems } from './RelatedKnowledgeItemsSection';

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
  cover_start?: number;
  cover_end?: number;
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

  related_knowledge?: {
    summary?: RelatedKnowledgeSummaryItem[];
    items?: RelatedKnowledgeItems;
  };
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
      `https://api.insightabusiness.com/api/platform/industries/knowledge/${slug}`,
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
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response structure');
    }
    
    // Ensure data property exists
    if (!data.data) {
      throw new Error('API response missing data property');
    }
    
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
    const metadata = generateKnowledgeMetadata(data, locale, type, slug) as Metadata;

    // Remove trailing " | Report | Insighta | Insighta" (and similar variants) to shorten title
    if (metadata && typeof metadata.title === 'string') {
      const cleanedTitle = metadata.title.replace(
        /\s*\|\s*(Report|Manual|Course|Data|Statistic|Insight)s?\s*\|\s*Insighta(?:\s*\|\s*Insighta)?$/i,
        ''
      );
      metadata.title = cleanedTitle;

      // Keep social titles in sync
      if (metadata.openGraph && typeof metadata.openGraph === 'object') {
        (metadata.openGraph as any).title = cleanedTitle;
      }
      if (metadata.twitter && typeof metadata.twitter === 'object') {
        (metadata.twitter as any).title = cleanedTitle;
      }
    }

    return metadata;
  } catch (error) {
    const isRTL = locale === 'ar';
    const baseUrl =  'https://insightabusiness.com';
    const defaultSocialImage = 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1769923661/drilldown_1_cjpvli_jprtoi.jpg';
    const pageUrl = `${baseUrl}/${locale}/knowledge/${type}/${slug}`;

    let metadataBase: URL | undefined;
    try {
      metadataBase = new URL(baseUrl);
    } catch {
      metadataBase = new URL('https://insightabusiness.com');
    }

    const title = isRTL ? "الرؤى غير موجودة | Insighta" : "Insights Not Found |Insighta";
    const description = isRTL 
      ? "لم يتم العثور على المورد المعرفي المطلوب. تحقق من الرابط أو ابحث عن محتوى آخر على منصة Insighta."
      : "The requested knowledge resource could not be found. Please check the URL or search for other content on Insighta platform.";

    return {
      metadataBase,
      title,
      description,
      // Do not mark as noindex here. If the page truly doesn't exist,
      // the route component will call notFound() and return a 404.
      robots: { index: true, follow: true },
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        type: 'website',
        url: pageUrl,
        siteName: 'KNOLDG',
        title,
        description,
        locale: isRTL ? 'ar_SA' : 'en_US',
        images: [
          {
            url: defaultSocialImage,
            width: 1200,
            height: 630,
            alt: title,
            type: 'image/jpeg',
          },
        ],
      },
      twitter: {
        card: 'summary',
        site: '@KNOLDG',
        title,
        description,
        images: [defaultSocialImage],
      },
    };
  }
}

export default async function KnowledgePage({ params }: Props) {
  const resolvedParams = await params;
  const { type, slug, locale } = resolvedParams;
  const isRTL = locale === 'ar';
  
  // Get translations
  const messages = await getMessages(locale);
  
  // Translations
  const translations = {
    insighter: isRTL ? 'إنسايتر' : 'Insighter',
    published: isRTL ? 'نُشر في' : 'Published',
    publishedBy: isRTL ? 'نُشر بواسطة' : 'Published By',
    rating: isRTL ? 'التقييم' : 'Rating',
    company: isRTL ? 'الشركة' : 'Company',
  };

  // No try/catch here - let any errors be caught by the not-found page
  const response = await fetchKnowledgeData(type, slug, locale);
  
  // Validate response structure
  if (!response || !response.data) {
    notFound();
  }
  
  const knowledge = response.data;

  const relatedSummary: RelatedKnowledgeSummaryItem[] = Array.isArray(knowledge?.related_knowledge?.summary)
    ? knowledge.related_knowledge.summary
    : [];

  const relatedItems: RelatedKnowledgeItems = (() => {
    const raw = knowledge?.related_knowledge?.items as unknown;
    const obj = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};

    const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

    return {
      industry: asArray(obj?.industry),
      topic: asArray(obj?.topic),
      product: asArray(obj?.product),
      insighter: asArray(obj?.insighter),
    };
  })();

  const hasRelatedItems =
    (relatedItems.industry?.length ?? 0) > 0 ||
    (relatedItems.topic?.length ?? 0) > 0 ||
    (relatedItems.product?.length ?? 0) > 0 ||
    (relatedItems.insighter?.length ?? 0) > 0;
  
  // Validate required knowledge properties
  if (!knowledge || !knowledge.insighter) {
    notFound();
  }
  
  const breadcrumbData = await fetchBreadcrumb("knowledge", slug, locale);
  const breadcrumbItems = breadcrumbData.map((item, index) => ({
    label: index === breadcrumbData.length - 1 ? "" : item.label,
    href: item.url,
  }));

  // Generate structured data
  const structuredData = generateStructuredData(knowledge, locale, type, slug);

  // Filter and organize structured data
  const schemas = [
    structuredData.article,
    structuredData.product,
    structuredData.organization,
    structuredData.breadcrumb,
    structuredData.course,
    structuredData.learningResource,
    structuredData.service,
    structuredData.creativeWork,
    structuredData.howTo
  ].filter(Boolean);

  return (
    <>
      {/* Structured Data - Multiple schemas for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas)
        }}
      />
      
    <div className="min-h-screen bg-gray-50 relative" dir={isRTL ? 'rtl' : 'ltr'} lang={locale === 'ar' ? 'ar' : 'en'}>
      {/* Language mismatch notifier */}
      {knowledge?.language && (
        <LanguageMismatchNotifier 
          knowledgeLanguage={knowledge.language} 
          currentLocale={locale} 
        />
      )}
      
      {/* Background decoration */}
      <div className="pointer-events-none absolute z-10 left-[10%] top-0 hidden md:block" aria-hidden="true">
        <Image
          className="max-w-none opacity-50"
          src={Stripes}
          width={768}
          height={768}
          style={{ width: 'auto', height: 'auto' }}
          alt=""
          aria-hidden="true"
          priority
        />
      </div>
      
      {/* Header Section */}
      <header className="section-header px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative overflow-hidden rounded-lg" role="banner">
        <Image
          alt=""
          src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
          fill
          className="object-cover z-0"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="container mx-auto px-2 sm:px-4 relative z-10 mt-3 sm:mt-5">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          {/* Header */}
          <div className={`${isRTL ? 'text-right' : 'text-start'} mb-4 w-full`}    data-aos="fade-down">
            <div className="flex-row gap-3 sm:gap-4 flex-wrap sm:flex-nowrap sm:flex lg:max-w-80-per px-4" >
              <div className="mb-4 mt-1 hidden sm:block">
                
                {knowledge.type === 'data' && <div className="bg-white p-2 sm:p-3 rounded flex items-center justify-center"><span className="hidden sm:block"><DataIcon width={40} height={40} /></span><span className="sm:hidden"><DataIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'statistic' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><InsightIcon width={50} height={50} /></span><span className="sm:hidden"><InsightIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'manual' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><ManualIcon width={50} height={50} /></span><span className="sm:hidden"><ManualIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'report' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><ReportIcon width={50} height={50} /></span><span className="sm:hidden"><ReportIcon width={30} height={30} /></span></div>}
                {knowledge.type === 'course' && <div className="bg-white p-2 rounded flex items-center justify-center"><span className="hidden sm:block"><CourseIcon width={50} height={50} /></span><span className="sm:hidden"><CourseIcon width={30} height={30} /></span></div>}
                  <div className="text-[10px] font-bold text-center bg-blue-100 uppercase mt-2 text-blue-500 rounded-md">
                    {(() => {
                      const navLabels = messages?.Header?.navigation;
                      switch (knowledge.type) {
                        case 'data':
                          return navLabels?.data || knowledge.type;
                        case 'statistic':
                          return locale === 'ar' ? 'إحصائيات' : navLabels?.statistics || knowledge.type;
                        case 'manual':
                          return navLabels?.manuals || knowledge.type;
                        case 'report':
                          return navLabels?.reports || knowledge.type;
                        case 'course':
                          return navLabels?.courses || knowledge.type;
                        case 'insight':
                          return navLabels?.insights || knowledge.type;
                        default:
                          return knowledge.type;
                      }
                    })()}
                  </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex flex-col items-start mb-6 sm:mb-10">
                  <h1 className={`md:max-w-3xl text-3xl md:text-4xl ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} font-extrabold text-transparent bg-clip-text w-full lg:w-auto`} style={{wordBreak: 'break-word'}}>
                    {knowledge.title}
                  </h1>
                  
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm mt-4">
              {
              (knowledge.insighter?.roles?.includes('company') || knowledge.insighter?.roles?.includes('company-insighter')) ? (
                // Company display
                <>
                  <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                    <Link href={`/${locale}/profile/${knowledge.insighter.company?.uuid || knowledge.insighter.uuid}?entity=company`} className="block h-full">
                      {knowledge.insighter.company?.logo ? (
                        <Image
                          src={knowledge.insighter.company.logo}
                          alt={`${knowledge.insighter.company.legal_name || 'Company'} logo - ${knowledge.title} publisher`}
                          fill={true}
                          sizes="(max-width: 640px) 40px, 50px"
                          className="rounded-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-sm sm:text-lg text-white font-semibold">
                            {(knowledge.insighter.company?.legal_name || 'C')
                              .split(" ")
                              .map((word: string) => word[0])
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
                            alt={`${knowledge.insighter.name} profile photo - ${knowledge.title} author`}
                            fill={true}
                            sizes="20px"
                            className="rounded-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-[6px] sm:text-[8px] text-white font-semibold">
                              {knowledge.insighter.name
                                .split(" ")
                                .map((word: string) => word[0])
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
                    <Link href={`/${locale}/profile/${knowledge.insighter.uuid}?entity=insighter`} className="block h-full">
                      {knowledge.insighter.profile_photo_url ? (
                        <Image
                          src={knowledge.insighter.profile_photo_url}
                          alt={`${knowledge.insighter.name} profile photo - ${knowledge.title} insighter`}
                          fill={true}
                          sizes="(max-width: 640px) 40px, 50px"
                          className="rounded-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-sm sm:text-lg text-white font-semibold">
                            {knowledge.insighter.name
                              .split(" ")
                              .map((word: string) => word[0])
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
                        .map((review: { rate?: number }) => Math.min(5, review.rate || 0))
                        .filter((rate: number) => !isNaN(rate) && rate > 0);
                      
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
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 pb-12 sm:pb-16 md:pb-20" role="main">
        <article itemScope itemType="https://schema.org/Article" className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <TabsContent knowledge={knowledge} knowledgeSlug={slug} />
          </div>
          <aside className="lg:col-span-1">
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
                cover_start={knowledge.cover_start}
                cover_end={knowledge.cover_end}
              />
            </aside>
        </article>
      </main>

   

      {/* Related knowledge (Summary) */}
      {relatedSummary.length > 0 && (
        <RelatedKnowledgeSummarySection locale={locale} isRTL={isRTL} items={relatedSummary} />
      )}

         {/* Related knowledge (Items) */}
         {hasRelatedItems && (
        <RelatedKnowledgeItemsSection
          locale={locale}
          isRTL={isRTL}
          items={relatedItems}
          insighterName={knowledge.insighter?.name}
          breadcrumbLabels={breadcrumbData.map((item) => item.label)}
        />
      )}

      <Footer />
    </div>
    </>
  );
}
