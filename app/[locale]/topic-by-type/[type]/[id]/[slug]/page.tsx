'use client';

import {  IndustryType } from '@/hooks/industries';
import { Container, Text, Skeleton, Card, Badge, Group, Avatar } from '@mantine/core';
import HeaderLight from '@/components/ui/header-light';
import FooterLight from '@/components/ui/footer-light';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';
import styles from './topic-by-type.module.css';
import cardStyles from './knowledge-card.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { formatDistanceToNow } from 'date-fns';
import { useTopicsByType } from '@/hooks/industries/useTopicsByType';
import ReportIcon from '@/components/icons/ReportIcon';
import InsightIcon from '@/components/icons/InsightIcon';
import ManualIcon from '@/components/icons/ManualIcon';
import DataIcon from '@/components/icons/DataIcon';

const validTypes: IndustryType[] = ['report', 'insight', 'data', 'manual', 'course'];

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

function formatPublishedDate(dateString: string) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export default function TopicByTypePage({ params }: Props) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as IndustryType;
  const id = parseInt(resolvedParams.id, 10);
  const slug = resolvedParams.slug;
  const locale = resolvedParams.locale || 'en';

  useEffect(() => {
    AOS.init({
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
        <HeaderLight />
        <Container className={styles.container}>
          <Text color="red">{error}</Text>
        </Container>
        <FooterLight />
      </>
    );
  }

  return (
    <>
      <HeaderLight />
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
                {capitalizeFirstLetter(type)}s
              </span>
              <h3 className={styles.headerTitle}>
                {subIndustry?.name || 'Loading...'}
              </h3>
              <p className={styles.description}>
                Explore our comprehensive collection of {type}s for {subIndustry?.name}. Get detailed insights and analysis to support your business decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} height={200} radius="md" />
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Knowledge</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {knowledge?.map((item) => (
                   <Card
                   key={`${item.type}-${item.slug}`}
                   withBorder
                   padding="lg"
                   radius="md"
                   className={cardStyles.card}
                   data-aos="fade-up"
                 >
                   <Link href={`/${locale}/knowledge/${item.type}/${item.slug}`} className="block">
                     <Group gap="xs">
                       {item.type === 'report' && <ReportIcon width={24} height={24} />}
                       {item.type === 'manual' && <ManualIcon width={24} height={24} />}
                       {item.type === 'insight' && <InsightIcon width={24} height={24} />}
                       {item.type === 'data' && <DataIcon width={24} height={24} />}
                       <Badge w="fit-content" className='capitalize' variant="light">
                         {item.type}
                       </Badge>
                     </Group>
       
                     <Text fw={700} className={cardStyles.title} mt="xs" lineClamp={2}>
                       {item.title}
                     </Text>
       
                     <Group mt="lg">
                       <Avatar
                         src={item.insighter.profile_photo_url}
                         radius="sm"
                         alt={item.insighter.name}
                         size={'sm'}
                       />
                       <div>
                       <Text  c="dimmed" size='xs'>
                      {item.insighter.roles.includes('insighter') && ('Insighter')}
                      {item.insighter.roles.includes('company') && ('Company')}
                         </Text> 
                       
                         <Text fw={500} size='xs'>{item.insighter.name}</Text>
                       </div>
                     </Group>
       
                     <Card.Section className={cardStyles.footer}>
                       <Group justify="space-between">
                       <Text  c="dimmed" size='xs'>
                           Posted {formatPublishedDate(item.published_at)}
                         </Text>
                         <Badge 
                           color={item.total_price === "0" ? "green" : "yellow"}
                           variant="light"
                         >
                           {item.total_price === "0" ? "FREE" : "PAID"}
                         </Badge>
                       </Group>
                     </Card.Section>
                   </Link>
                 </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterLight />
    </>
  );
}
