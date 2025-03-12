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
;
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useAllIndustries } from '@/hooks/industries/useAllIndustries';

export default function FilterKnowledgesPage() {
  const params = useParams();
  const router = useRouter();

  // Get the current locale from params
  const locale = params.locale as string || 'en';

  // Extract route parameters
  const taxonomyParam = Array.isArray(params.taxonomy)
    ? params.taxonomy[0]
    : params.taxonomy;
  // taxonomy can be 'industry', 'sub_industry', or 'topic'
  const taxonomy = (taxonomyParam ?? 'industry') as 'industry' | 'sub_industry' | 'topic';

  // The URL "id" represents:
  // - industry id if taxonomy is "industry"
  // - sub‑industry id if taxonomy is "sub_industry"
  // - topic id if taxonomy is "topic"
  const id = Array.isArray(params.id)
    ? parseInt(params.id[0], 10)
    : parseInt(params.id ?? '0', 10);

  // Get initial knowledge type (default: 'report')
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialKnowledgeType = typeParam ?? 'report';

  // ---------------- States ----------------
  const [selectedKnowledgeType, setSelectedKnowledgeType] = useState<string>(initialKnowledgeType);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  // For the Industry dropdown (holds industry slug)
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  // For Sub‑Industry filtering (applies to both sub_industry and topic pages)
  const [subIndustries, setSubIndustries] = useState<
    { id: number; name: string; slug: string }[]
  >([]);
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<string>('');
  // For sub_industry pages, we fetch details to get the main industry.
  const [parentIndustry, setParentIndustry] = useState<
    { id: number; name: string; slug: string } | null
  >(null);

  // For taxonomy "topic" we add additional states:
  const [topics, setTopics] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  // This holds the sub‑industry that is the parent for topics.
  // For taxonomy "topic", it comes from the topic details;
  // for taxonomy "sub_industry", it will be the sub-industry selected.
  const [parentSubIndustry, setParentSubIndustry] = useState<
    { id: number; name: string; slug: string } | null
  >(null);

  // ---------------- Fetch Industries ----------------
  const { industries, isLoading: isIndustriesLoading } = useAllIndustries();

  // Auto‑select Industry when taxonomy is "industry"
  useEffect(() => {
    if (taxonomy === 'industry' && industries.length > 0) {
      const matchedIndustry = industries.find((industry) => industry.id === id);
      if (matchedIndustry) {
        setSelectedIndustry(matchedIndustry.slug);
      }
    }
  }, [taxonomy, id, industries]);

  // ---------------- Fetch Details ----------------
  // For taxonomy "sub_industry": fetch sub‑industry details (and its parent) using:
  // GET https://api.foresighta.co/api/common/industry/details/{subIndustryId}
  useEffect(() => {
    if (taxonomy === 'sub_industry' && id) {
      const fetchSubIndustryDetails = async () => {
        try {
          const res = await fetch(`https://api.foresighta.co/api/common/industry/details/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Language": locale,
              },
            }
          );
          const data = await res.json();
          if (data && data.data) {
            const subIndustryDetails = data.data;
            setSelectedSubIndustry(subIndustryDetails.slug);
            // For sub_industry taxonomy, we want to show the Topic dropdown with no value selected.
            // We do NOT pre-select a topic.
            if (subIndustryDetails.parent) {
              setParentIndustry(subIndustryDetails.parent);
              setSelectedIndustry(subIndustryDetails.parent.slug);
            }
            // Also, for sub_industry taxonomy, set parentSubIndustry to the current sub-industry.
            setParentSubIndustry({
              id: subIndustryDetails.id,
              name: subIndustryDetails.name,
              slug: subIndustryDetails.slug,
            });
          }
        } catch (error) {
          console.error('Error fetching sub industry details:', error);
        }
      };
      fetchSubIndustryDetails();
    }
  }, [taxonomy, id, locale]);

  // For taxonomy "topic": fetch topic details using the dedicated endpoint.
  // This returns topic details along with its parent sub‑industry.
  useEffect(() => {
    if (taxonomy === 'topic' && id) {
      const fetchTopicDetails = async () => {
        try {
          const res = await fetch(
            `https://api.foresighta.co/api/common/industry/details/topic/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Language': locale,
              },
            }
          );
          const data = await res.json();
          if (data && data.data) {
            const topicDetails = data.data;
            setSelectedTopic(topicDetails.slug);
            // The topic's "industry" field represents its parent sub‑industry.
            setSelectedSubIndustry(topicDetails.industry.slug);
            setParentSubIndustry(topicDetails.industry);
            // Now, fetch the sub‑industry details to get the main industry.
            const res2 = await fetch(
              `https://api.foresighta.co/api/common/industry/details/${topicDetails.industry.id}`, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Accept-Language": locale,
                },
              }
            );
            const data2 = await res2.json();
            if (data2 && data2.data) {
              const subIndustryDetails = data2.data;
              if (subIndustryDetails.parent) {
                setParentIndustry(subIndustryDetails.parent);
                setSelectedIndustry(subIndustryDetails.parent.slug);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching topic details:', error);
        }
      };
      fetchTopicDetails();
    }
  }, [taxonomy, id, locale]);

  // ---------------- Fetch Sub‑Industries List ----------------
  // For "industry" mode, use the current industry id.
  // For "sub_industry" or "topic", use the main industry id (from parentIndustry).
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
          `https://api.foresighta.co/api/common/setting/industry/sub/list/${fetchId}`,{
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": locale,
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
  }, [taxonomy, id, parentIndustry, locale]);

  // ---------------- Fetch Topic List ----------------
  // For both "sub_industry" and "topic" taxonomies, fetch topics from the sub‑industry.
  useEffect(() => {
    if ((taxonomy === 'sub_industry' || taxonomy === 'topic')) {
      let fetchId: number | null = null;
      if (taxonomy === 'sub_industry') {
        // Use the sub‑industry id from the URL.
        fetchId = id;
      } else if (taxonomy === 'topic' && parentSubIndustry) {
        fetchId = parentSubIndustry.id;
      }
      if (fetchId) {
        const fetchTopics = async () => {
          try {
            const res = await fetch(
              `https://api.foresighta.co/api/common/setting/topic/industry/${fetchId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Accept-Language': locale,
                },
              }
            );
            const data = await res.json();
            if (data && data.data) {
              setTopics(data.data);
            }
          } catch (error) {
            console.error('Error fetching topics:', error);
          }
        };
        fetchTopics();
      }
    }
  }, [taxonomy, id, parentSubIndustry, locale]);

  // ---------------- Fetch Knowledge Items ----------------
  const { response, isLoading, error: knowledgeError } = useKnowledge({
    taxonomy,
    id,
    knowledgeType: selectedKnowledgeType,
    page,
  });

  const handleKnowledgeTypeChange = (value: string) => {
    setSelectedKnowledgeType(value);
    setPage(1);
  };

  // -------------- Dropdown Change Handlers --------------

  // When the Industry dropdown changes:
  // - Reset Sub‑Industry, Topic selections.
  // - Always redirect to the industry URL.
  const handleIndustryChange = (value: string | null) => {
    if (value) {
      setSelectedIndustry(value);
      setSelectedSubIndustry('');
      setTopics([]);
      setSelectedTopic('');
      const selected = industries.find((industry) => industry.slug === value);
      if (selected) {
        router.push(`/${locale}/filter-knowledges/industry/${selected.id}/${selectedKnowledgeType}`);
      }
    }
  };

  // When the Sub‑Industry dropdown changes:
  // For taxonomy "sub_industry" and "topic": update state to show topics for the selected sub‑industry,
  // but do not redirect.
  const handleSubIndustryChange = (value: string | null) => {
    if (value) {
      setSelectedSubIndustry(value);
      setTopics([]);
      setSelectedTopic('');
      const selectedSub = subIndustries.find((sub) => sub.slug === value);
      if (taxonomy === 'sub_industry' || taxonomy === 'topic') {
        if (selectedSub) {
          // Update parentSubIndustry to trigger topic fetching.
          setParentSubIndustry(selectedSub);
        }
      } else {
        if (selectedSub) {
          router.push(`/${locale}/filter-knowledges/sub_industry/${selectedSub.id}/${selectedKnowledgeType}`);
        }
      }
    }
  };

  // When the Topic dropdown changes (applies when taxonomy is "sub_industry" or "topic"):
  const handleTopicChange = (value: string | null) => {
    if (value) {
      setSelectedTopic(value);
      const selectedT = topics.find((t) => t.slug === value);
      if (selectedT) {
        router.push(`/${locale}/filter-knowledges/topic/${selectedT.id}/${selectedKnowledgeType}`);
      }
    }
  };

  // ---------------- UI Rendering ----------------
  if (knowledgeError) {
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
    
      <PageIllustration />

      {/* Header Section */}
      <div className="section-header px-4 sm:px-6 lg:px-8 pt-8 relative overflow-hidden rounded-lg">
        <div className="relative z-10 max-w-6xl mx-auto mt-20 w-full">
          <div className="text-start" data-aos="fade-down">
            <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase">
              Filtered Knowledge
            </span>
            <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-3xl font-extrabold text-transparent bg-clip-text mb-4">
              {selectedKnowledgeType.charAt(0).toUpperCase() +
                selectedKnowledgeType.slice(1)}{' '}
              Knowledges
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
                {/* Show Topic dropdown only for sub_industry and topic taxonomies */}
                {(taxonomy === 'sub_industry' || taxonomy === 'topic') &&
                  topics.length > 0 && (
                    <Select
                      label="Topic"
                      placeholder="Select topic"
                      data={topics.map((t) => ({
                        value: t.slug,
                        label: t.name,
                      }))}
                      mt="md"
                      value={selectedTopic || null}
                      onChange={handleTopicChange}
                    />
                  )}
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
                  { label: <Squares2X2Icon color="gray"  className="w-5 h-5" />, value: 'cards' },
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

            <div className="flex justify-center mt-8">
              <Pagination value={page} onChange={setPage} total={totalPages} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
