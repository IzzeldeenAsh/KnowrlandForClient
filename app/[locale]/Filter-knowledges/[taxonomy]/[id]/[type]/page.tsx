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

  // Extract and default the route parameters
  const taxonomyParam = Array.isArray(params.taxonomy)
    ? params.taxonomy[0]
    : params.taxonomy;
  // Default taxonomy to 'industry' if not provided
  const taxonomy = (taxonomyParam ?? 'industry') as 'industry' | 'sub_industry' | 'topic';

  // The id from the URL will be the industry id if taxonomy is 'industry'
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0], 10)
    : parseInt(params.id ?? '0', 10);

  // Get the initial knowledge type from the URL parameters, defaulting to 'report'
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialKnowledgeType = typeParam ?? 'report';

  // State for the selected knowledge type (for the side filter)
  const [selectedKnowledgeType, setSelectedKnowledgeType] = useState<string>(initialKnowledgeType);

  // State for pagination
  const [page, setPage] = useState(1);

  // View mode state for grid vs list view
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  // State for the selected industry dropdown value (holds the industry slug)
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  // Fetch industries using custom hook for the "Industry" dropdown
  const { industries, isLoading: isIndustriesLoading } = useAllIndustries();

  // When taxonomy is 'industry', auto-select the industry from the URL id
  useEffect(() => {
    if (taxonomy === 'industry' && industries.length > 0) {
      const matchedIndustry = industries.find((industry) => industry.id === id);
      if (matchedIndustry) {
        setSelectedIndustry(matchedIndustry.slug);
      }
    }
  }, [taxonomy, id, industries]);

  // Call hook using the selected knowledge type from the dropdown
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
                  value={selectedIndustry}
                  onChange={(value) => {
                    if (value) {
                      setSelectedIndustry(value);
                      if (taxonomy === 'industry') {
                        const selected = industries.find((industry) => industry.slug === value);
                        if (selected) {
                          // Determine the URL part for knowledge type.
                          const redirectKnowledgeType =
                            selectedKnowledgeType === 'subIndustry'
                              ? 'sub_industry'
                              : selectedKnowledgeType;
                          // Redirect to the new URL with the selected knowledge type, taxonomy, industry id and slug.
                          router.push(
                            `/en/filter-knowledges/${taxonomy}/${selected.id}/${redirectKnowledgeType}`
                          );
                        }
                      }
                    }
                  }}
                />
                <Select
                  label="Sub Industry"
                  placeholder="Select sub industry"
                  data={[
                    { value: 'sub1', label: 'Sub Industry 1' },
                    { value: 'sub2', label: 'Sub Industry 2' },
                    { value: 'sub3', label: 'Sub Industry 3' },
                  ]}
                  mt="md"
                />
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

            {/* Pagination Component */}
            <div className="flex justify-center mt-8">
              <Pagination value={page} onChange={setPage} total={totalPages} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
