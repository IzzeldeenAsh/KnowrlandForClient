'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { IconChartBar } from '@tabler/icons-react';
import PageHeader from '@/components/insighter-dashboard/PageHeader';

const TABS = ['general', 'posted', 'scheduled', 'unpublished', 'packages'] as const;

/** Header + tab navigation for /insighter-dashboard/my-knowledge/*. */
export default function MyKnowledgeTabs() {
  const t = useTranslations('InsighterDashboard.myKnowledge');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <PageHeader
      icon={<IconChartBar size={22} />}
      title={t('title')}
      tabs={
        <>
          {TABS.map((tab) => {
            const href = `/${locale}/insighter-dashboard/my-knowledge/${tab}`;
            const active = pathname.startsWith(href);
            return (
              <Link
                key={tab}
                href={href}
                className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {t(`tabs.${tab}`)}
              </Link>
            );
          })}
        </>
      }
    />
  );
}
