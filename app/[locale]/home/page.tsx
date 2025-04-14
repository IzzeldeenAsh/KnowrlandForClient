'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Footer from '@/components/ui/footer'
import PageIllustration from "@/components/page-illustration";
import { 
  TextInput, 
  Button, 
  Group, 
  Select, 
  Checkbox, 
  Divider,
  Title,
  Stack,
  Text,
  Pagination,
  MultiSelect,
  Chip
} from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons-react';
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation';
import type { KnowledgeItem } from '../topic/[id]/[slug]/KnowledgeGrid';

// Dynamically import KnowledgeGrid with no SSR to avoid hydration issues
const KnowledgeGrid = dynamic(
  () => import('../topic/[id]/[slug]/KnowledgeGrid'),
  { ssr: false }
);

// Add custom scrollbar CSS
const customScrollbarStyle = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 20px;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
`;

function LoadingState() {
  return <div className="text-center py-8">Loading...</div>;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const params = useParams();
  const locale = params.locale as string || 'en';

  useEffect(() => {
    const fetchData = async () => {
      console.log('Starting fetch with loading:', true);
      setLoading(true);
      try {
        console.log('Making API request for locale:', locale);
        const url = new URL('https://api.knoldg.com/api/industries/type/knowledge');
        url.searchParams.append('page', currentPage.toString());
        
        // Update price filtering logic
        if (priceFilter === 'free') {
          url.searchParams.append('filters[total_price]', '0');
        } else if (priceFilter === 'paid') {
          url.searchParams.append('filters[total_price][gt]', '0');
        }
        
        const response = await fetch(url.toString(), {
          headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json",
            "Accept-Language": locale,
          },
          cache: 'no-store'
        });
        
        console.log('API response status:', response.status);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('API response data:', data);
        // Sort the data array by published_at in descending order (newest first)
        const sortedData = data.data.sort((a: KnowledgeItem, b: KnowledgeItem) => 
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );
        console.log('Setting knowledge items:', sortedData.length, 'items');
        setKnowledgeItems(sortedData);
        setTotalPages(data.meta.last_page);
      } catch (error) {
        console.error('API request failed:', error);
        console.log('Setting empty knowledge items due to error');
        setKnowledgeItems([]);
      } finally {
        console.log('Setting loading state to false');
        setLoading(false);
      }
    };

    console.log('useEffect triggered with locale:', locale);
    fetchData();
  }, [locale, currentPage, priceFilter]);

  return (
   <main className='min-h-screen flex flex-col'>
     <style dangerouslySetInnerHTML={{ __html: customScrollbarStyle }} />
     <section className="relative flex-1">
      <PageIllustration />
      
      {/* Top search bar - full width */}
      <div className="w-full border-b border-gray-200 relative z-3">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex gap-2">
            <TextInput
              className="flex-1"
              size="lg"
              radius="md"
              placeholder="Search all assets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              leftSection={<IconSearch size={18} className="text-gray-500" />}
              rightSection={
                <Group gap="xs">
                  <Button 
                    radius="md" 
                    variant="filled" 
                    color="blue"
                  >
                    Search
                  </Button>
                </Group>
              }
              rightSectionWidth={130}
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 relative z-3">
        {/* Filters sidebar - full height with scroll on hover */}
        <div className="w-80 shrink-0 border-r border-gray-200 bg-white sticky top-0 self-start h-screen">
          <div className="p-4 h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar">
            <Group justify="space-between" mb="md">
              <Text fw={500}>Filters</Text>
              <IconFilter size={16} />
            </Group>
            
            <Divider mb="md" />
            
            <Stack gap="md">
              <div >
                <Text size="sm" fw={500} mb="xs">Price</Text>
                <Group gap="xs">
                  <Button
                    variant={priceFilter === 'all' ? 'filled' : 'outline'}
                    size="sm"
                    radius="xl"
                    className={priceFilter === 'all' 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                    }
                    onClick={() => setPriceFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={priceFilter === 'free' ? 'filled' : 'outline'}
                    size="sm"
                    radius="xl"
                    className={priceFilter === 'free' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'border-green-500 text-green-500 hover:bg-green-50'
                    }
                    onClick={() => setPriceFilter('free')}
                  >
                    Free
                  </Button>
                  <Button
                    variant={priceFilter === 'paid' ? 'filled' : 'outline'}
                    size="sm"
                    radius="xl"
                    className={priceFilter === 'paid'
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'border-orange-500 text-orange-500 hover:bg-orange-50'
                    }
                    onClick={() => setPriceFilter('paid')}
                  >
                    Paid
                  </Button>
                </Group>
              </div>

              <div>
                <Text size="sm" fw={500} mb="xs">Industries</Text>
                <MultiSelect
                  data={[
                    { value: 'agriculture', label: 'Agriculture' },
                    { value: 'manufacturing', label: 'Manufacturing' },
                    { value: 'technology', label: 'Information Technology' },
                    { value: 'healthcare', label: 'Healthcare' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'retail', label: 'Retail' },
                    { value: 'energy', label: 'Energy' },
                  ]}
                  placeholder="Select industries"
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">Consulting Field</Text>
                <MultiSelect
                  data={[
                    { value: 'strategy', label: 'Strategy' },
                    { value: 'operations', label: 'Operations' },
                    { value: 'hr', label: 'Human Resources' },
                    { value: 'financial', label: 'Financial Advisory' },
                    { value: 'marketing', label: 'Marketing' },
                    { value: 'it', label: 'IT Consulting' },
                    { value: 'management', label: 'Management' },
                  ]}
                  placeholder="Select consulting fields"
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">Regions</Text>
                <MultiSelect
                  data={[
                    { value: 'europe', label: 'Europe' },
                    { value: 'north_america', label: 'North America' },
                    { value: 'latin_america', label: 'Latin America' },
                    { value: 'asia_pacific', label: 'Asia Pacific' },
                    { value: 'middle_east', label: 'Middle East' },
                    { value: 'africa', label: 'Africa' },
                  ]}
                  placeholder="Select regions"
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">Countries</Text>
                <MultiSelect
                  data={[
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'germany', label: 'Germany' },
                    { value: 'france', label: 'France' },
                    { value: 'china', label: 'China' },
                    { value: 'japan', label: 'Japan' },
                    { value: 'india', label: 'India' },
                    { value: 'brazil', label: 'Brazil' },
                  ]}
                  placeholder="Select countries"
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">Economic Blocks</Text>
                <MultiSelect
                  data={[
                    { value: 'eu', label: 'European Union (EU)' },
                    { value: 'nafta', label: 'NAFTA' },
                    { value: 'asean', label: 'ASEAN' },
                    { value: 'mercosur', label: 'Mercosur' },
                    { value: 'gcc', label: 'Gulf Cooperation Council' },
                  ]}
                  placeholder="Select economic blocks"
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">ISIC Code</Text>
                <MultiSelect
                  data={[
                    { value: 'A', label: 'A - Agriculture, forestry and fishing' },
                    { value: 'B', label: 'B - Mining and quarrying' },
                    { value: 'C', label: 'C - Manufacturing' },
                    { value: 'D', label: 'D - Electricity, gas, steam' },
                    { value: 'E', label: 'E - Water supply' },
                    { value: 'F', label: 'F - Construction' },
                  ]}
                  placeholder="Select ISIC codes"
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">HS Code</Text>
                <MultiSelect
                  data={[
                    { value: '01', label: '01 - Live animals' },
                    { value: '02', label: '02 - Meat and edible meat offal' },
                    { value: '03', label: '03 - Fish and crustaceans' },
                    { value: '04', label: '04 - Dairy produce' },
                    { value: '05', label: '05 - Products of animal origin' },
                  ]}
                  placeholder="Select HS codes"
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">Tags</Text>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'soccer', label: 'Soccer' },
                    { id: 'badminton', label: 'Badminton' },
                    { id: 'boxing', label: 'Boxing' },
                    { id: 'formula1', label: 'Formula 1' },
                    { id: 'cricket', label: 'Cricket' },
                    { id: 'baseball', label: 'Baseball' },
                    { id: 'football', label: 'American football' },
                    { id: 'swimming', label: 'Swimming' }
                  ].map((tag) => (
                    <Chip
                      key={tag.id}
                      value={tag.id}
                      variant="outline"
                      radius="xl"
                      size="sm"
                      color="blue"
                    >
                      {tag.label}
                    </Chip>
                  ))}
                </div>
              </div>
            </Stack>
          </div>
        </div>
        
        {/* Search results - with max width container */}
        <div className="flex-1 p-6">
          <div className="mx-auto max-w-6xl">
            <Group justify="space-between" align="center" mb="md">
              <Title order={3}>Search Results</Title>
            </Group>
            
            <Suspense fallback={<LoadingState />}>
              {loading ? (
                <LoadingState />
              ) : (
                <>
                  <KnowledgeGrid 
                    knowledge={knowledgeItems} 
                    topicName="All Topics"
                    showHeader={false}
                    colNumbers={3}
                    locale={locale}
                  />
                  <div className="flex justify-center mt-8">
                    <Pagination 
                      total={totalPages} 
                      value={currentPage}
                      onChange={setCurrentPage}
                    />
                  </div>
                </>
              )}
            </Suspense>
          </div>
        </div>
      </div>
      </section>
      <Footer/>
   </main>
  )
}
