'use client'

import { Text, Card, Badge, Group, Avatar } from '@mantine/core';
import Link from 'next/link';
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import { formatDistanceToNow } from 'date-fns';
import cardStyles from './knowledge-card.module.css';

interface Knowledge {
  id: number;
  type: string;
  title: string;
  slug: string;
  insighter: {
    name: string;
    profile_photo_url: string;
    roles: string[];
  };
  published_at: string;
  total_price: string;
}

interface KnowledgeGridProps {
  knowledge: Knowledge[];
  topicName: string;
}

function formatPublishedDate(dateString: string) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export default function KnowledgeGrid({ knowledge, topicName }: KnowledgeGridProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-start">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge</h2>
        <p className="text-gray-600">Explore insights within {topicName}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {knowledge.map((item: Knowledge) => (
          <Card
            key={`${item.type}-${item.slug}`}
            withBorder
            padding="lg"
            radius="md"
            className={cardStyles.card}
            data-aos="fade-up"
          >
            <Link href={`/knowledge/${item.type}/${item.slug}`} className="block">
              <Group gap="xs">
                {item.type === 'report' && <ReportIcon width={24} height={24} />}
                {item.type === 'manual' && <ManualIcon width={24} height={24} />}
                {item.type === 'insight' && <InsightIcon width={24} height={24} />}
                {item.type === 'data' && <DataIcon width={24} height={24} />}
                <Badge w="fit-content" className='capitalize' variant="light">
                  {item.type}
                </Badge>
              </Group>

              <Text fw={700} className={cardStyles.title} mt="xs" fz={'xl'} lineClamp={2}>
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
