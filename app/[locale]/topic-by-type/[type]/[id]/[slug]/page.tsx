'use client';

import { IndustryType } from '@/hooks/industries';
import { Container, Text, Skeleton } from '@mantine/core';
import Footer from '@/components/ui/footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';
import styles from './topic-by-type.module.css';
import { safeAOSInit } from '@/components/aos-provider';
import { useTopicsByType } from '@/hooks/industries/useTopicsByType';
import KnowledgeGrid from '../../../../topic/[id]/[slug]/KnowledgeGrid';

const validTypes: IndustryType[] = ['report', 'insight', 'data', 'manual', 'course', 'statistic'];

interface Props {
  params: Promise<{
    type: string;
    id: string;
    slug: string;
    locale?: string;
  }>;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function TopicByTypePage({ params }: Props) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as IndustryType;
  const id = parseInt(resolvedParams.id, 10);
  const slug = resolvedParams.slug;
  const locale = resolvedParams.locale || 'en';
  const isRTL = locale === 'ar';

  useEffect(() => {
    safeAOSInit({
      duration: 800,
      once: true,
    });
  }, []);

  // Validate type parameter
  if (!validTypes.includes(type)) {
    notFound();
  }

  const { subIndustry, knowledge, isLoading, error } = useTopicsByType({
    type,
    id,
    slug,
    topKnowledge: 10,
  });

  if (error) {
    return (
      <>
        <Container className={styles.container}>
          <Text color="red">{error}</Text>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <Image
            alt="Section background"
            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
            fill
            className="object-cover z-0"
            priority
          />
          <div className={styles.headerContent}>
            <div data-aos="fade-down">
              <span className={styles.typeLabel}>
                {capitalizeFirstLetter(type)}
              </span>
              <h3  className={` text-transparent font-extrabold text-3xl ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text`}>
                {subIndustry?.name || 'Loading...'}
              </h3>
             
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} height={200} radius="md" />
              ))}
            </div>
          ) : (
            <>
              <h2 className={`text-xl font-bold text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text mb-8`}>
                {locale === 'ar' ? 'الرؤى' : 'Insights'}
            </h2>
            <KnowledgeGrid
              knowledge={(knowledge || []).map(item => ({
                ...item,
                language: item.language === 'arabic' ? 'arabic' as const : item.language === 'english' ? 'english' as const : undefined,
                review: Array.isArray(item.review) && item.review.length > 0
                  ? (item.review.every((r: any) => typeof r === 'number')
                      ? (item.review.reduce((sum: number, r: number) => sum + r, 0) / item.review.length).toFixed(1)
                      : undefined)
                  : typeof item.review === 'string' ? item.review : undefined
              }))}
              topicName={subIndustry?.name || ''}
              locale={locale}
              showHeader={true}
              colNumbers={3}
            />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
