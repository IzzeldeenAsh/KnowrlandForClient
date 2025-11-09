'use client';

import React from 'react';
import { Card, Text, Badge, Group } from '@mantine/core';
import Link from 'next/link';

// A simple test component that always displays search results
export default function TestSearchResults({ locale }: { locale: string }) {
  const sampleData = [
    {
      "searchable_id": 17,
      "searchable_type": "knowledge",
      "title": "She drew her.",
      "description": "Alice began in a low, weak voice. 'Now, I give.",
      "url": `/knowledge/data/she-drew-her`,
      "type": "data",
      "published_at": "2025-05-29T00:00:00.000000Z",
      "insighter": "Karam Salem",
      "total_price": "958"
    },
    {
      "searchable_id": 20,
      "searchable_type": "knowledge",
      "title": "Gryphon; and.",
      "description": "YOU, and no more to come, so she bore it as you.",
      "url": `/knowledge/data/gryphon-and`,
      "type": "data",
      "published_at": "2025-05-29T00:00:00.000000Z",
      "insighter": "Karam Salem",
      "total_price": "1300"
    }
  ];

  
  return (
    <div className="grid grid-cols-3 gap-4">
      {sampleData.map((item) => (
        <Card key={item.searchable_id} shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{item.title}</Text>
            <Badge color="blue">{item.type}</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            {item.description}
          </Text>

          <Text size="sm" mt="md">
            By: {item.insighter}
          </Text>
          
          <Group justify="space-between" mt="md">
            <Text c="blue" fw={500}>
              Price: {item.total_price === "0" ? "Free" : `$${item.total_price}`}
            </Text>
            <Link href={`/${locale}${item.url}`}>
              <Text c="blue">View Details</Text>
            </Link>
          </Group>
        </Card>
      ))}
    </div>
  );
}
