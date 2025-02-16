'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
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
import KnowledgeGrid from '@/app/topic/[id]/[slug]/KnowledgeGrid';
import KnowledgeList from '@/components/knowledge-list/KnowledgeList';
import PageIllustration from '@/components/page-illustration';
import HeaderLight from '@/components/ui/header-light';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

export default function FilterKnowledgesPage() {
  const params = useParams();

  // Extract and default the route parameters
  const taxonomyParam = Array.isArray(params.taxonomy)
    ? params.taxonomy[0]
    : params.taxonomy;
  // Default taxonomy to 'industry' if not provided
  const taxonomy = (taxonomyParam ?? 'industry') as 'industry' | 'sub_industry' | 'topic';

  const id = Array.isArray(params.id)
    ? parseInt(params.id[0], 10)
    : parseInt(params.id ?? '0', 10);

  // Get the initial knowledge type from the URL parameters, defaulting to 'report'
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialKnowledgeType = typeParam ?? 'report';

  // Create state for selected knowledge type (for the side filter)
  const [selectedKnowledgeType, setSelectedKnowledgeType] = useState<string>(initialKnowledgeType);

  // Page state for pagination
  const [page, setPage] = useState(1);

  // View mode state for grid vs list view
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

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

      {/* Section header */}
      <div className="section-header px-4 sm:px-6 lg:px-12 py-8 relative overflow-hidden rounded-lg">
        <div className="relative z-10 max-w-6xl mx-auto mt-20 w-full">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="h2 mb-4 font-bold text-5xl md:text-6xl py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
              data-aos="zoom-y-out"
            >
              Filtered Knowledge - {selectedKnowledgeType}
            </h2>
            <p
              className="text-xl text-gray-600"
              data-aos="zoom-y-out"
              data-aos-delay="150"
            >
              Explore our comprehensive list of industries and their sub-categories.
            </p>
          </div>
        </div>
      </div>

      <Container py="sm" w="100%" size={'lg'}>
        <Grid gutter="xl">
          {/* Side Filters */}
          <Grid.Col span={3} >
            <div className='mt-14'>
            <div className="p-4  border rounded-md shadow-sm ">
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
              {/* Other filters can be added here later */}
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
