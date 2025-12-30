'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Container,
  Text,
  SegmentedControl,
  Loader,
  Pagination,
  Select,
  Grid,
  Title,
  Box,
  Flex,
  Badge,
  Button,
} from '@mantine/core';
import { useAllIndustries } from '@/hooks/industries/useAllIndustries';
import KnowledgeGrid from '@/app/[locale]/topic/[id]/[slug]/KnowledgeGrid';
import KnowledgeList from '@/components/knowledge-list/KnowledgeList';
import PageIllustration from '@/components/page-illustration';
import Breadcrumb from '@/components/ui/breadcrumb';
import { fetchBreadcrumb } from '@/utils/breadcrumb';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import Stripes from "@/public/images/stripes-dark.svg";
interface FetchKnowledgeProps {
  taxonomy?: string;
  id?: string;
  type?: string;
  page: number;
  locale: string;
}

interface KnowledgeItem {
  id: number;
  type: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  total_price: string;
  published_at: string;
  review_summary?: {
    count: number;
    average: number;
  };
  insighter: {
    name: string;
    profile_photo_url: string | null;
    roles: string[];
  };
  // Add other fields as needed
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface KnowledgeResponse {
  data: KnowledgeItem[];
  meta: PaginationMeta;
}

// Function to fetch knowledge items based on filters
async function fetchKnowledgeItems({ taxonomy, id, type, page, locale }: FetchKnowledgeProps): Promise<KnowledgeResponse> {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (taxonomy && id) params.append(taxonomy, id);
  params.append('page', page.toString());

  const response = await fetch(`https://api.insightabusiness.com/api/platform/industries/type/knowledge?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch knowledge items');
  }

  return response.json();
}

export default function KnowledgesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const isRTL = locale === 'ar';
  
  // Translations
  const translations = {
    loading: isRTL ? 'جاري تحميل عناصر المعرفة...' : 'Loading knowledge items...',
    noItemsFound: isRTL ? 'لم يتم العثور على عناصر للمرشحات المحددة.' : 'No knowledge items found for the selected filters.',
    resetFilters: isRTL ? 'إعادة ضبط الفلاتر' : 'Reset Filters',
    showing: isRTL ? 'عرض' : 'Showing',
    of: isRTL ? 'من' : 'of',
    items: isRTL ? 'عنصر' : 'items',
    noItems: isRTL ? 'لم يتم العثور على عناصر' : 'No items found',
    grid: isRTL ? 'شبكة' : 'Grid',
    list: isRTL ? 'قائمة' : 'List',
    filterBy: isRTL ? 'تصفية حسب' : 'Filter By',
    selectCategory: isRTL ? 'حدد الفئة' : 'Select category',
    industry: isRTL ? 'الصناعة' : 'Industry',
    subIndustry: isRTL ? 'الصناعة الفرعية' : 'Sub-Industry',
    topic: isRTL ? 'الموضوع' : 'Topic',
    selectIndustry: isRTL ? 'حدد صناعة' : 'Select an industry',
    selectSubIndustry: isRTL ? 'حدد صناعة فرعية' : 'Select a sub-industry',
    selectTopic: isRTL ? 'حدد موضوعًا' : 'Select a topic',
    knowledgeType: isRTL ? 'نوع الرؤى' : 'Insights Type',
    selectType: isRTL ? 'حدد النوع' : 'Select type',
    data: isRTL ? 'بيانات' : 'Data',
    insight: isRTL ? 'رؤى' : 'Insight',
    manual: isRTL ? 'أدلة' : 'Manual',
    course: isRTL ? 'دورات' : 'Course',
    report: isRTL ? 'تقارير' : 'Report',
    filteredResults: isRTL ? 'نتائج الفلاتر' : 'Filtered Results',
    knowledge: isRTL ? 'رؤى' : 'Insights'
  };  

  // Get filter values from URL query parameters
  const taxonomyParam = searchParams.get('taxonomy') || 'industry';
  const idParam = searchParams.get('id') || '';
  const typeParam = searchParams.get('type') || 'data';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const entityNameParam = searchParams.get('entityName') || '';

  // State for filters
  const [taxonomy, setTaxonomy] = useState<string>(taxonomyParam);
  const [selectedId, setSelectedId] = useState<string>(idParam);
  const [selectedType, setSelectedType] = useState<string>(typeParam);
  const [page, setPage] = useState<number>(pageParam);
  const [entityName, setEntityName] = useState<string>(entityNameParam);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // State for data
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{label: string, href: string}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch industries for dropdowns
  const { industries, isLoading: industriesLoading } = useAllIndustries();
  const [subIndustries, setSubIndustries] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  // Knowledge type options
  const knowledgeTypes = [
    { value: 'data', label: translations.data },
    { value: 'insight', label: translations.insight },
    { value: 'manual', label: translations.manual },
    { value: 'course', label: translations.course },
    { value: 'report', label: translations.report },
  ];

  // Get the current knowledge type label for header
  const getCurrentTypeLabel = () => {
    const typeObj = knowledgeTypes.find(type => type.value === selectedType);
    return typeObj ? typeObj.label : translations.data;
  };

  // Fetch sub-industries when industry changes
  useEffect(() => {
    if (selectedId && taxonomy === 'industry') {
      const fetchSubIndustries = async () => {
        try {
          const response = await fetch(`https://api.insightabusiness.com/api/platform/industries/${selectedId}/subindustries`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch sub-industries');
          }
          const data = await response.json();
          setSubIndustries(data.data || []);
        } catch (error) {
          console.error('Error fetching sub-industries:', error);
          setSubIndustries([]);
        }
      };

      fetchSubIndustries();
    }
  }, [selectedId, taxonomy, locale]);

  // Fetch topics when sub-industry changes
  useEffect(() => {
    if (selectedId && taxonomy === 'sub_industry') {
      // Fetch topics for the selected sub-industry
      fetch(`https://api.insightabusiness.com/api/subindustries/${selectedId}/topics`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTopics(data.data || []);
        })
        .catch(() => {
          setTopics([]);
        });
    }
  }, [selectedId, taxonomy, locale]);

  // Fetch breadcrumb data when taxonomy/id changes
  useEffect(() => {
    if (selectedId && taxonomy) {
      const breadcrumbType = taxonomy === 'sub_industry' ? 'sub-industry' : taxonomy;
      fetchBreadcrumb(breadcrumbType as 'industry' | 'sub-industry' | 'topic', parseInt(selectedId), locale)
        .then((breadcrumbData) => {
          const items = breadcrumbData.map((item, index) => {
            // If this is the last item, modify the href to point to the original entity page
            if (index === breadcrumbData.length - 1) {
              let entityUrl = '';
              switch (taxonomy) {
                case 'industry':
                  // For industry, we need the slug from the entity name
                  const industrySlug = entityName ? entityName.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--+/g, '-') : 'slug';
                  entityUrl = `industry/${selectedId}/${industrySlug}`;
                  break;
                case 'sub_industry':
                  // For sub-industry, we need the slug from the URL or entity name
                  const slug = entityName ? entityName.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--+/g, '-') : 'slug';
                  entityUrl = `sub-industry/${selectedId}/${slug}`;
                  break;
                case 'topic':
                  // For topic, we need the slug from the entity name
                  const topicSlug = entityName ? entityName.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--+/g, '-') : 'slug';
                  entityUrl = `topic/${selectedId}/${topicSlug}`;
                  break;
              }
              return {
                label: item.label,
                href: entityUrl
              };
            }
            return {
              label: item.label,
              href: item.url
            };
          });
          setBreadcrumbItems(items);
        })
        .catch((error) => {
          console.error('Error fetching breadcrumb:', error);
          setBreadcrumbItems([]);
        });
    } else {
      setBreadcrumbItems([]);
    }
  }, [taxonomy, selectedId, entityName, locale]);

  // Fetch knowledge items when filters change
  useEffect(() => {
    if (selectedId) {
      setIsLoading(true);
      fetchKnowledgeItems({
        taxonomy,
        id: selectedId,
        type: selectedType,
        page,
        locale,
      })
        .then((data) => {
          setKnowledgeItems(data.data || []);
          setPagination(data.meta);
          setIsLoading(false);
        })
        .catch((err) => {
          setError('Failed to load knowledge items');
          setIsLoading(false);
        });
    } else {
      setKnowledgeItems([]);
      setPagination(null);
      setIsLoading(false);
    }
  }, [taxonomy, selectedId, selectedType, page, locale]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (taxonomy) params.set('taxonomy', taxonomy);
    if (selectedId) params.set('id', selectedId);
    if (selectedType) params.set('type', selectedType);
    if (entityName) params.set('entityName', entityName);
    if (page > 1) params.set('page', page.toString());

    router.push(`/${locale}/knowledges?${params.toString()}`);
  }, [taxonomy, selectedId, selectedType, entityName, page, locale, router]);

  // Handle filter changes
  const handleTaxonomyChange = (value: string) => {
    setTaxonomy(value);
    setSelectedId('');
    setPage(1);
  };

  const handleIdChange = (value: string | null) => {
    if (value) {
      setSelectedId(value);
      setPage(1);
    }
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setPage(1);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  // Render loading state
  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Flex justify="center" align="center" direction="column" h={400}>
          <Loader size="lg" />
          <Text mt="md">{translations.loading}</Text>
        </Flex>
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container size="xl" py="xl">
        <Text color="red" ta="center">{error}</Text>
      </Container>
    );
  }

  return (
    <>
       <PageIllustration />
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
       {/* Header Section */}
       <div className="section-header px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden rounded-lg">
          <Image
                   alt="Section background"
                   src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
                   fill
                   className="object-cover z-0"
                   priority
                 />
         <div className="relative z-10 max-w-6xl relative mx-auto mt-5 w-full">
           {/* Breadcrumb */}
           {breadcrumbItems.length > 0 && (
             <div className="mb-8">
               <Breadcrumb items={breadcrumbItems} makeLastItemClickable={true} />
             </div>
           )}
           
           <div className="text-start" data-aos="fade-down">
             <h3 className={`text-md ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} md:text-3xl font-extrabold text-transparent bg-clip-text mb-4 `} style={{'lineHeight': '2.2'}}>
               {getCurrentTypeLabel()} 
               {entityName && ` ${isRTL ? 'في' : 'in'} ${entityName}`}
             </h3>
           </div>
         </div>
       </div>

       <div className='container mx-auto px-3 sm:px-4 pb-12 sm:pb-16 md:pb-20'  style={{position: 'relative', zIndex: 1}} >
   
      
   <Title order={1} mb="xl"></Title>
   
  
 
   
   {/* Results Display */}
   {knowledgeItems.length > 0 ? (
     <>
       {view === 'grid' ? (
         <KnowledgeGrid 
           knowledge={knowledgeItems} 
           topicName={translations.filteredResults}
           locale={locale}
         />
       ) : (
         <KnowledgeList
           knowledge={knowledgeItems}
           locale={locale}
         />
       )}
       
       {/* Pagination */}
       {pagination && pagination.last_page > 1 && (
         <Flex justify="center" mt="xl">
           <Pagination
             total={pagination.last_page}
             value={page}
             onChange={handlePageChange}
           />
         </Flex>
       )}
     </>
   ) : (
     <Flex justify="center" align="center" direction="column" h={200} mt="xl">
       <Text size="lg" mb="md">{translations.noItemsFound}</Text>
       <Button variant="outline" onClick={() => {
         setTaxonomy('industry');
         setSelectedId('');
         setSelectedType('data');
         setPage(1);
       }}>
         {translations.resetFilters}
       </Button>
     </Flex>
   )}
     {/* Results Controls */}
     <Text className='text-center w-100 d-block ' pt={20} >
       {pagination && pagination.total > 0 
         ? `${translations.showing} ${pagination.from}-${pagination.to} ${translations.of} ${pagination.total} ${translations.items}` 
         : translations.noItems}
     </Text>
     
  
 </div></>

  );
} 