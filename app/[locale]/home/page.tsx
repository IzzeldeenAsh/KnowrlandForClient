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
import { useTranslations } from 'next-intl'

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
  const t4 = useTranslations('Features4')
  const feature = t4("Features4", { default: "الميزة ٤ (احتياطي)" });

  const tags = [
    { id: 'industry', en: 'Industry', ar: 'الصناعات' },
    { id: 'report', en: 'Reports', ar: 'التقارير' },
    { id: 'data', en: 'Data', ar: 'البيانات' },
    { id: 'insight', en: 'Insights', ar: 'الرؤى' },
    { id: 'manual', en: 'Manuals', ar: 'الأدلة' },
    { id: 'course', en: 'Courses', ar: 'الدورات' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      console.log('Starting fetch with loading:', true);
      setLoading(true);
      try {
        console.log('Making API request for locale:', locale);
        const url = new URL('https://api.knoldg.com/api/platform/industries/type/knowledge');
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
              placeholder={t4("searchTitle")}
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
                    {t4("searchButton")}
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
              <Text fw={500}>{t4("searchFilters")}</Text>
              <IconFilter size={16} />
            </Group>
            
            <Divider mb="md" />
            
            <Stack gap="md">
              <div >
                <Text size="sm" fw={500} mb="xs">{t4("searchFilterPrice")}</Text>
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
                    {t4("searchFilterAll")}
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
                    {t4("searchFilterFree")}
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
                     {t4("searchFilterPaid")}
                  </Button>
                </Group>
              </div>

              <div>
                <Text size="sm" fw={500} mb="xs"> {t4("searchIndustries")}</Text>
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
                  placeholder={t4("searchIndustriesPlaceHolder")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">{t4("searchCounsulting")}</Text>
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
                  placeholder={t4("searchCounsultingPlaceHolder")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">{t4("searchRegions")}</Text>
                <MultiSelect
                  data={[
                    { value: 'europe', label: 'Europe' },
                    { value: 'north_america', label: 'North America' },
                    { value: 'latin_america', label: 'Latin America' },
                    { value: 'asia_pacific', label: 'Asia Pacific' },
                    { value: 'middle_east', label: 'Middle East' },
                    { value: 'africa', label: 'Africa' },
                  ]}
                  placeholder={t4("searchRegionsPlaceHolder")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">{t4("searchRegions")}</Text>
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
                  placeholder={t4("searchRegionsPlaceHolder")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">{t4("searchEconomicBlocks")}</Text>
                <MultiSelect
                  data={[
                    { value: 'eu', label: 'European Union (EU)' },
                    { value: 'nafta', label: 'NAFTA' },
                    { value: 'asean', label: 'ASEAN' },
                    { value: 'mercosur', label: 'Mercosur' },
                    { value: 'gcc', label: 'Gulf Cooperation Council' },
                  ]}
                  placeholder={t4("searchEconomicBlocksPlaceHolder")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">{t4("searchISIC")}</Text>
                <MultiSelect
                  data={[
                    { value: 'A', label: 'A - Agriculture, forestry and fishing' },
                    { value: 'B', label: 'B - Mining and quarrying' },
                    { value: 'C', label: 'C - Manufacturing' },
                    { value: 'D', label: 'D - Electricity, gas, steam' },
                    { value: 'E', label: 'E - Water supply' },
                    { value: 'F', label: 'F - Construction' },
                  ]}
                  placeholder={t4("searchISICPlaceHolder")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">{t4("searchHSCode")}</Text>
                <MultiSelect
                  data={[
                    { value: '01', label: '01 - Live animals' },
                    { value: '02', label: '02 - Meat and edible meat offal' },
                    { value: '03', label: '03 - Fish and crustaceans' },
                    { value: '04', label: '04 - Dairy produce' },
                    { value: '05', label: '05 - Products of animal origin' },
                  ]}
                  placeholder={t4("searchHSCodePlaceHolder")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  clearable
                />
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">{t4("searchTags")}</Text>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        value={tag.id}
                        variant="outline"
                        radius="xl"
                        size="sm"
                        color="blue"
                      >
                      {locale === 'ar' ? tag.ar : tag.en}
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
               <Title order={3}>{t4("searchResult")}</Title>
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
