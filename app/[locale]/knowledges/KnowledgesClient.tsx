'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
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
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

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

  const response = await fetch(`https://api.knoldg.com/api/platform/industries/type/knowledge?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": locale,
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
    resetFilters: isRTL ? 'إعادة ضبط المرشحات' : 'Reset Filters',
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
    knowledgeType: isRTL ? 'نوع المعرفة' : 'Knowledge Type',
    selectType: isRTL ? 'حدد النوع' : 'Select type',
    data: isRTL ? 'بيانات' : 'Data',
    insight: isRTL ? 'رؤى' : 'Insight',
    manual: isRTL ? 'أدلة' : 'Manual',
    course: isRTL ? 'دورات' : 'Course',
    report: isRTL ? 'تقارير' : 'Report',
    filteredResults: isRTL ? 'نتائج المرشحات' : 'Filtered Results'
  };

  // Get filter values from URL query parameters
  const taxonomyParam = searchParams.get('taxonomy') || 'industry';
  const idParam = searchParams.get('id') || '';
  const typeParam = searchParams.get('type') || 'data';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  // State for filters
  const [taxonomy, setTaxonomy] = useState<string>(taxonomyParam);
  const [selectedId, setSelectedId] = useState<string>(idParam);
  const [selectedType, setSelectedType] = useState<string>(typeParam);
  const [page, setPage] = useState<number>(pageParam);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // State for data
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
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

  // Fetch sub-industries when industry changes
  useEffect(() => {
    if (selectedId && taxonomy === 'industry') {
      // Fetch sub-industries for the selected industry
      fetch(`https://api.knoldg.com/api/platform/industries/${selectedId}/subindustries`, {
        headers: {
          "Accept-Language": locale,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSubIndustries(data.data || []);
        })
        .catch(() => {
          setSubIndustries([]);
        });
    }
  }, [selectedId, taxonomy, locale]);

  // Fetch topics when sub-industry changes
  useEffect(() => {
    if (selectedId && taxonomy === 'sub_industry') {
      // Fetch topics for the selected sub-industry
      fetch(`https://api.knoldg.com/api/subindustries/${selectedId}/topics`, {
        headers: {
          "Accept-Language": locale,
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
    if (page > 1) params.set('page', page.toString());

    router.push(`/${locale}/knowledges?${params.toString()}`);
  }, [taxonomy, selectedId, selectedType, page, locale, router]);

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
       <div className='container mx-auto px-3 sm:px-4 pb-12 sm:pb-16 md:pb-20'  style={{position: 'relative', zIndex: 1}} >
   
      
   <Title order={1} mb="xl"></Title>
   
   {/* Filters Section */}
   {/* <Box mb="xl" >
     <Grid >
       <Grid.Col span={{ base: 12, md: 4 }}>
         <Select
           label={translations.filterBy}
           placeholder={translations.selectCategory}
           data={[
             { value: 'industry', label: translations.industry },
             { value: 'sub_industry', label: translations.subIndustry },
             { value: 'topic', label: translations.topic }
           ]}
           value={taxonomy}
           onChange={(value) => handleTaxonomyChange(value || 'industry')}
           mb="md"
         />
       </Grid.Col>
       
       <Grid.Col span={{ base: 12, md: 4 }}>
         {taxonomy === 'industry' && (
           <Select
             label={translations.industry}
             placeholder={translations.selectIndustry}
             data={industries.map(i => ({ value: i.id.toString(), label: i.name }))}
             value={selectedId}
             onChange={handleIdChange}
             mb="md"
             searchable
           />
         )}
         
         {taxonomy === 'sub_industry' && (
           <Select
             label={translations.subIndustry}
             placeholder={translations.selectSubIndustry}
             data={subIndustries.map(i => ({ value: i.id.toString(), label: i.name }))}
             value={selectedId}
             onChange={handleIdChange}
             mb="md"
             searchable
           />
         )}
         
         {taxonomy === 'topic' && (
           <Select
             label={translations.topic}
             placeholder={translations.selectTopic}
             data={topics.map(i => ({ value: i.id.toString(), label: i.name }))}
             value={selectedId}
             onChange={handleIdChange}
             mb="md"
             searchable
           />
         )}
       </Grid.Col>
       
       <Grid.Col span={{ base: 12, md: 4 }}>
         <Select
           label={translations.knowledgeType}
           placeholder={translations.selectType}
           data={knowledgeTypes}
           value={selectedType}
           onChange={(value) => handleTypeChange(value || 'data')}
           mb="md"
         />
       </Grid.Col>
     </Grid>
   </Box> */}
   
   {/* Results Controls */}
   <Flex justify="space-between" align="center" mb="md" style={{paddingInlineStart: '3rem'}}>
     <Text>
       {pagination && pagination.total > 0 
         ? `${translations.showing} ${pagination.from}-${pagination.to} ${translations.of} ${pagination.total} ${translations.items}` 
         : translations.noItems}
     </Text>
     
  
   </Flex>
   
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
 </div></>

  );
} 