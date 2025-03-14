'use client'

import { Text, Card, Badge, Group, Avatar } from '@mantine/core';
import Link from 'next/link';
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import { formatDistanceToNow } from 'date-fns';
import cardStyles from './knowledge-card.module.css';
import { useParams } from 'next/navigation';

interface KnowledgeGridProps {
  knowledge: KnowledgeItem[];
  topicName: string;
  showHeader?: boolean;
  colNumbers?: number;
  locale?: string;
}
export interface KnowledgeItem {
  slug: string;
  type: string;
  title: string;
  description: string;
  total_price: string;
  published_at: string;
  insighter: {
    name: string;
    profile_photo_url: string | null;
    roles: string[];
  };
}



function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function formatPublishedDate(dateString: string) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export default function KnowledgeGrid({ knowledge, topicName, showHeader=true, colNumbers=3, locale }: KnowledgeGridProps) {
  const params = useParams();
  const currentLocale = locale || params.locale || 'en';
  
  return (
    <div className="max-w-6xl mx-auto">
      {showHeader && (
        <div className="mb-8 text-start">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge</h2>
          <p className="text-gray-600">Explore insights within {topicName}</p>
        </div>
      )}

      <div className={`grid sm:grid-cols-2 lg:grid-cols-${colNumbers} gap-4 max-w-7xl mx-auto`}>
        {knowledge.map((item: KnowledgeItem) => (
          <Card
            key={`${item.type}-${item.slug}`}
            withBorder
            padding="lg"
            radius="md"
            className={cardStyles.card}
            data-aos="fade-up"
          >
            <Link href={`/${currentLocale}/knowledge/${item.type}/${item.slug}`} className="block">
              <Group gap="xs">
                {item.type === 'report' && <ReportIcon width={24} height={24} />}
                {item.type === 'manual' && <ManualIcon width={24} height={24} />}
                {item.type === 'insight' && <InsightIcon width={24} height={24} />}
                {item.type === 'data' && <DataIcon width={24} height={24} />}
                <Badge w="fit-content" className='capitalize' variant="light">
                  {item.type}
                </Badge>
              </Group>
              <div className="flex flex-col ">
              <Text fw={700} className={cardStyles.title} mt="xs" lineClamp={2}>
                {item.title}
              </Text>
              <Text className={`${cardStyles.description} text-gray-500`} lineClamp={3} dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
              <Group mt="lg">
              <Avatar
  src={item.insighter.profile_photo_url}
  radius="lg"
  alt={item.insighter.name}
  size="sm"
>
  {!item.insighter.profile_photo_url && getInitials(item.insighter.name)}
</Avatar>

                <div>
                <Text  c="dimmed" size='xs'>
               {item.insighter.roles.includes('insighter') && ('Insighter')}
               {item.insighter.roles.includes('company') && ('Company')}
                  </Text> 
                  <Text fw={500} size='xs'>{item.insighter.name}</Text>
                </div>
              </Group>

         
            </Link>
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
          </Card>
        ))}
        {knowledge.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
            <div className="rounded-full bg-gray-50 p-4 mb-3"></div>
            <p className="text-gray-500 text-sm">No knowledge items available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
