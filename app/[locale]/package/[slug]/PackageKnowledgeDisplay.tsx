'use client';

import React, { useState } from 'react';
import { Grid, SegmentedControl, Pagination } from '@mantine/core';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import KnowledgeGrid from '../../topic/[id]/[slug]/KnowledgeGrid';
import KnowledgeList from '@/components/knowledge-list/KnowledgeList';

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

interface PackageKnowledgeDisplayProps {
  knowledge: KnowledgeItem[];
  taxonomy?: string;
  totalPages: number;
}

const PackageKnowledgeDisplay: React.FC<PackageKnowledgeDisplayProps> = ({ knowledge, taxonomy = '', totalPages }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [page, setPage] = useState<number>(1);

  return (
    <Grid>
      <Grid.Col span={12}>
        <div className="flex justify-end mb-4">
        <SegmentedControl
                value={viewMode}
                onChange={(value) => setViewMode(value as 'cards' | 'list')}
                data={[
                  { label: <Squares2X2Icon  className="w-5 h-5 text-gray-400" />, value: 'cards' },
                  { label: <ListBulletIcon className="w-5 h-5 text-gray-400" />, value: 'list' },
                ]}
              />
        </div>
      </Grid.Col>
      <Grid.Col span={12}>
        {viewMode === 'cards' ? (
          <KnowledgeGrid knowledge={knowledge} topicName={taxonomy} showHeader={false} colNumbers={2} />
        ) : (
          <KnowledgeList knowledge={knowledge} />
        )}
      </Grid.Col>
      <Grid.Col span={12}>
        <div className="flex justify-center mt-8">
          <Pagination value={page} onChange={setPage} total={totalPages} />
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default PackageKnowledgeDisplay;
