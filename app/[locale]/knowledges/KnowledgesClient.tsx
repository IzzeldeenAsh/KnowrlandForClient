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

  const response = await fetch(`https://api.foresighta.co/api/industries/type/knowledge?${params.toString()}`, {
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
    { value: 'data', label: 'Data' },
    { value: 'insight', label: 'Insight' },
    { value: 'manual', label: 'Manual' },
    { value: 'course', label: 'Course' },
    { value: 'report', label: 'Report' },
  ];

  // Fetch sub-industries when industry changes
  useEffect(() => {
    if (selectedId && taxonomy === 'industry') {
      // Fetch sub-industries for the selected industry
      fetch(`https://api.foresighta.co/api/industries/${selectedId}/subindustries`, {
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
      fetch(`https://api.foresighta.co/api/subindustries/${selectedId}/topics`, {
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
          <Text mt="md">Loading knowledge items...</Text>
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
       <Container size="xl" py="xl" style={{position: 'relative', zIndex: 1}}>
   
      
   <Title order={1} mb="xl"></Title>
   
   {/* Filters Section */}
   <Box mb="xl" >
     <Grid >
       {/* Taxonomy Filter */}
       <Grid.Col span={{ base: 12, md: 4 }}>
         <Select
           label="Filter By"
           placeholder="Select category"
           data={[
             { value: 'industry', label: 'Industry' },
             { value: 'sub_industry', label: 'Sub-Industry' },
             { value: 'topic', label: 'Topic' }
           ]}
           value={taxonomy}
           onChange={(value) => handleTaxonomyChange(value || 'industry')}
           mb="md"
         />
       </Grid.Col>
       
       {/* ID Filter (dynamic based on taxonomy) */}
       <Grid.Col span={{ base: 12, md: 4 }}>
         {taxonomy === 'industry' && (
           <Select
             label="Industry"
             placeholder="Select an industry"
             data={industries.map(i => ({ value: i.id.toString(), label: i.name }))}
             value={selectedId}
             onChange={handleIdChange}
             mb="md"
             searchable
           />
         )}
         
         {taxonomy === 'sub_industry' && (
           <Select
             label="Sub-Industry"
             placeholder="Select a sub-industry"
             data={subIndustries.map(i => ({ value: i.id.toString(), label: i.name }))}
             value={selectedId}
             onChange={handleIdChange}
             mb="md"
             searchable
           />
         )}
         
         {taxonomy === 'topic' && (
           <Select
             label="Topic"
             placeholder="Select a topic"
             data={topics.map(i => ({ value: i.id.toString(), label: i.name }))}
             value={selectedId}
             onChange={handleIdChange}
             mb="md"
             searchable
           />
         )}
       </Grid.Col>
       
       {/* Knowledge Type Filter */}
       <Grid.Col span={{ base: 12, md: 4 }}>
         <Select
           label="Knowledge Type"
           placeholder="Select type"
           data={knowledgeTypes}
           value={selectedType}
           onChange={(value) => handleTypeChange(value || 'data')}
           mb="md"
         />
       </Grid.Col>
     </Grid>
   </Box>
   
   {/* Results Controls */}
   <Flex justify="space-between" align="center" mb="md">
     <Text>
       {pagination && pagination.total > 0 
         ? `Showing ${pagination.from}-${pagination.to} of ${pagination.total} items` 
         : 'No items found'}
     </Text>
     
     <SegmentedControl
       value={view}
       onChange={(value) => setView(value as 'grid' | 'list')}
       data={[
         {
           value: 'grid',
           label: (
             <Flex align="center" gap={8}>
               <Squares2X2Icon width={18} height={18} />
               <span>Grid</span>
             </Flex>
           ),
         },
         {
           value: 'list',
           label: (
             <Flex align="center" gap={8}>
               <ListBulletIcon width={18} height={18} />
               <span>List</span>
             </Flex>
           ),
         },
       ]}
     />
   </Flex>
   
   {/* Results Display */}
   {knowledgeItems.length > 0 ? (
     <>
       {view === 'grid' ? (
         <KnowledgeGrid 
           knowledge={knowledgeItems} 
           topicName="Filtered Results" 
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
       <Text size="lg" mb="md">No knowledge items found for the selected filters.</Text>
       <Button variant="outline" onClick={() => {
         setTaxonomy('industry');
         setSelectedId('');
         setSelectedType('data');
         setPage(1);
       }}>
         Reset Filters
       </Button>
     </Flex>
   )}
 </Container></>

  );
} 