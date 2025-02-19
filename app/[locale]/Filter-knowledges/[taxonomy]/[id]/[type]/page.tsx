'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Text,
  SegmentedControl,
  Loader,
  Pagination,
  Select,
  Grid,
} from '@mantine/core';
import { useKnowledge } from '@/hooks/knowledgs/useKnowledge';
import KnowledgeGrid from '@/app/[locale]/topic/[id]/[slug]/KnowledgeGrid';
import KnowledgeList from '@/components/knowledge-list/KnowledgeList';
import PageIllustration from '@/components/page-illustration';
import HeaderLight from '@/components/ui/header-light';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useAllIndustries } from '@/hooks/industries/useAllIndustries';

export default function FilterKnowledgesPage() {
  const params = useParams();
  const router = useRouter();

  // Extract route parameters
  const taxonomyParam = Array.isArray(params.taxonomy)
    ? params.taxonomy[0]
    : params.taxonomy;
  // taxonomy can be 'industry', 'sub_industry', or 'topic'
  const taxonomy = (taxonomyParam ?? 'industry') as 'industry' | 'sub_industry' | 'topic';

  // The "id" in the URL is interpreted as:
  // - the industry id when taxonomy is 'industry'
  // - the sub-industry id when taxonomy is 'sub_industry' or 'topic'
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0], 10)
    : parseInt(params.id ?? '0', 10);

  // Get the initial knowledge type from the URL (default: 'report')
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialKnowledgeType = typeParam ?? 'report';

  // States
  const [selectedKnowledgeType, setSelectedKnowledgeType] = useState<string>(initialKnowledgeType);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  
  // The industry dropdown holds the industry slug
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  // For sub-industry filtering:
  const [subIndustries, setSubIndustries] = useState<
    { id: number; name: string; slug: string }[]
  >([]);
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<string>('');
  // For sub_industry (or topic) pages, we fetch the sub-industry details (which include parent info)
  const [parentIndustry, setParentIndustry] = useState<
    { id: number; name: string; slug: string } | null
  >(null);

  // Fetch the list of industries
  const { industries, isLoading: isIndustriesLoading } = useAllIndustries();


  useEffect(() => {
    if (taxonomy === 'industry' && industries.length > 0) {
      const matchedIndustry = industries.find((industry) => industry.id === id);
      if (matchedIndustry) {
        setSelectedIndustry(matchedIndustry.slug);
      }
    }
  }, [taxonomy, id, industries]);

  useEffect(() => {
    if ((taxonomy === 'sub_industry' || taxonomy === 'topic') && id) {
      const fetchSubIndustryDetails = async () => {
        try {
          const res = await fetch(`https://api.foresighta.co/api/common/industry/details/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": "en",
            },
          });
          const data = await res.json();
          if (data && data.data) {
            const subIndustryDetails = data.data;
            setSelectedSubIndustry(subIndustryDetails.slug);
            if (subIndustryDetails.parent) {
              setParentIndustry(subIndustryDetails.parent);
              setSelectedIndustry(subIndustryDetails.parent.slug);
            }
          }
        } catch (error) {
          console.error('Error fetching sub industry details:', error);
        }
      };
      fetchSubIndustryDetails();
    }
  }, [taxonomy, id]);

  // --- Fetch the list of sub industries ---  
  // For industry mode: use the current industry id.
  // For sub_industry (or topic) mode: use the parent industry id.
  useEffect(() => {
    const fetchSubIndustries = async () => {
      try {
        let fetchId: number;
        if (taxonomy === 'industry' && id) {
          fetchId = id;
        } else if ((taxonomy === 'sub_industry' || taxonomy === 'topic') && parentIndustry) {
          fetchId = parentIndustry.id;
        } else {
          return;
        }
        const res = await fetch(
          `https://api.foresighta.co/api/common/setting/industry/sub/list/${fetchId}`, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Accept-Language": "en",
            },
          }
        );
        
        const data = await res.json();
        if (data && data.data) {
          setSubIndustries(data.data);
        }
      } catch (error) {
        console.error('Error fetching sub industries:', error);
      }
    };
    fetchSubIndustries();
  }, [taxonomy, id, parentIndustry]);

  // --- Knowledge items fetching ---
  const { response, isLoading, error } = useKnowledge({
    taxonomy,
    id,
    knowledgeType: selectedKnowledgeType,
    page,
  });

  // Reset page when knowledge type changes
  const handleKnowledgeTypeChange = (value: string) => {
    setSelectedKnowledgeType(value);
    setPage(1);
  };

  // --- Handle dropdown changes ---

  // When the Industry dropdown changes:
  // - Always reset any sub-industry selection.
  // - Redirect to the **industry** route.
  const handleIndustryChange = (value: string | null) => {
    if (value) {
      setSelectedIndustry(value);
      // Reset sub-industry state
      setSelectedSubIndustry('');
      setSubIndustries([]);
      const selected = industries.find((industry) => industry.slug === value);
      if (selected) {
        router.push(`/en/filter-knowledges/industry/${selected.id}/${selectedKnowledgeType}`);
      }
    }
  };

  // When the Sub Industry dropdown changes:
  // - Always redirect to a sub_industry URL.
  const handleSubIndustryChange = (value: string | null) => {
    if (value) {
      setSelectedSubIndustry(value);
      const selectedSub = subIndustries.find((sub) => sub.slug === value);
      if (selectedSub) {
        router.push(`/en/filter-knowledges/sub_industry/${selectedSub.id}/${selectedKnowledgeType}`);
      }
    }
  };

  if (error) {
    return (
      <Container py="xl">
        <Text color="red">Error loading knowledge items.</Text>
      </Container>
    );
  }

  if (isLoading || !response) {
    return (
      <Container py="xl" style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader />
      </Container>
    );
  }

  const { data: knowledge } = response;
  const totalPages = response.meta.last_page;

  return (
    <>
      <HeaderLight />
      <PageIllustration />

      {/* Header Section */}
      <div className="section-header px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden rounded-lg">
        <div className="relative z-10 max-w-6xl mx-auto mt-20 w-full">
          <div className="text-start" data-aos="fade-down">
            <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase">
              Filtered Knowledge
            </span>
            <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-3xl font-extrabold text-transparent bg-clip-text mb-4">
              {selectedKnowledgeType.charAt(0).toUpperCase() + selectedKnowledgeType.slice(1)} Knowledges
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
              Explore our comprehensive list of knowledge items across various industries and topics.
            </p>
          </div>
        </div>
      </div>
      <Container py="sm" w="100%" size="lg">
        <Grid gutter="xl">
          {/* Side Filters */}
          <Grid.Col span={3}>
            <div className="mt-14">
              <div className="p-4 border rounded-md shadow-sm">
                <Text fw={500} mb="sm">
                  Filters
                </Text>
                <Select
                  label="Knowledge Type"
                  placeholder="Select type"
                  data={[
                    { value: 'data', label: 'Data' },
                    { value: 'insight', label: 'Insight' },
                    { value: 'manual', label: 'Manual' },
                    { value: 'course', label: 'Course' },
                    { value: 'report', label: 'Report' },
                  ]}
                  value={selectedKnowledgeType}
                  onChange={(value) => {
                    if (value) handleKnowledgeTypeChange(value);
                  }}
                />
                <Select
                  label="Industry"
                  placeholder="Select industry"
                  data={industries.map((industry) => ({
                    value: industry.slug,
                    label: industry.name,
                  }))}
                  mt="md"
                  disabled={isIndustriesLoading}
                  value={selectedIndustry || null}
                  onChange={handleIndustryChange}
                />
                {/* Render the Sub Industry dropdown if there are items available */}
                {subIndustries.length > 0 && (
                  <Select
                    label="Sub Industry"
                    placeholder="Select sub industry"
                    data={subIndustries.map((sub) => ({
                      value: sub.slug,
                      label: sub.name,
                    }))}
                    mt="md"
                    value={selectedSubIndustry || null}
                    onChange={handleSubIndustryChange}
                  />
                )}
                <Select
                  label="Topic"
                  placeholder="Select topic"
                  data={[
                    { value: 'topic1', label: 'Topic 1' },
                    { value: 'topic2', label: 'Topic 2' },
                    { value: 'topic3', label: 'Topic 3' },
                  ]}
                  mt="md"
                />
              </div>
            </div>
          </Grid.Col>

          {/* Main Content */}
          <Grid.Col span={9}>
            <div className="flex justify-end mb-4">
              <SegmentedControl
                value={viewMode}
                onChange={(value) => setViewMode(value as 'cards' | 'list')}
                data={[
                  { label: <Squares2X2Icon color="gray" className="w-5 h-5" />, value: 'cards' },
                  { label: <ListBulletIcon color="gray" className="w-5 h-5" />, value: 'list' },
                ]}
              />
            </div>

            {viewMode === 'cards' ? (
              <KnowledgeGrid
                knowledge={knowledge}
                topicName={taxonomy}
                showHeader={false}
                colNumbers={2}
              />
            ) : (
              <KnowledgeList knowledge={knowledge} />
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination value={page} onChange={setPage} total={totalPages} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
