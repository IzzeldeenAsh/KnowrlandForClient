'use client';

import { useMemo, useState } from 'react';
import { HelpCenterLinksGroup } from '../HelpCenterLinksGroup/HelpCenterLinksGroup';
import { Box, ScrollArea, Text, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import classes from './InsighterGuideNavbar.module.css';

interface InsighterGuideNavbarProps {
  onLinkClick?: () => void;
}

interface NavItem {
  label: string;
  link: string;
}

export function InsighterGuideNavbar({ onLinkClick }: InsighterGuideNavbarProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const basePath = `/${locale}/resources/first-steps/insighter-guide`;
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const allData: NavItem[] = [
    { label: t('What is an Insighter?', 'ما هو دور الخبير (Insighter)؟'), link: `${basePath}/what-is-an-insighter` },
    { label: t('Becoming an Insighter', 'كيف تصبح خبيرًا على Insighta؟'), link: `${basePath}/becoming-an-insighter` },
    { label: t('Insighter Dashboard', 'لوحة تحكم الخبير — المناطق الأساسية'), link: `${basePath}/insighter-dashboard` },
    { label: t('Publishing Insights', 'نشر المستندات — خطوات الرفع الكاملة'), link: `${basePath}/publishing-insights` },
    { label: t('AI Summaries & Metadata', 'ملخصات الذكاء الاصطناعي'), link: `${basePath}/ai-summaries-and-metadata` },
    { label: t('Pricing & File Strategy', 'التسعير'), link: `${basePath}/pricing-and-file-strategy` },
    { label: t('Consulting Sessions & Meetings', 'الجلسات الاستشارية والاجتماعات'), link: `${basePath}/consulting-sessions-and-meetings` },
    { label: t('Responding to Client Questions', 'الرد على أسئلة العملاء'), link: `${basePath}/responding-to-client-questions` },
    { label: t('Sales, Earnings & Wallet', 'المبيعات والمحفظة'), link: `${basePath}/sales-earnings-and-wallet` },
    { label: t('Company Accounts & Team Activity', 'حسابات الشركات وإدارة النشاط'), link: `${basePath}/company-accounts-and-team-activity` },
    { label: t('Best Practices for Successful Insighters', 'أفضل الممارسات للنجاح'), link: `${basePath}/best-practices` },
    { label: t('Support & Troubleshooting', 'الدعم الفني'), link: `${basePath}/support-and-troubleshooting` },
  ];

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return allData;
    const query = searchQuery.toLowerCase().trim();
    return allData.filter((item) => item.label.toLowerCase().includes(query));
  }, [searchQuery]);

  const handleClearSearch = () => setSearchQuery('');
  const searchPlaceholder = isRtl ? 'البحث في القائمة...' : 'Search menu...';

  return (
    <Box className={classes.navbar} component="nav">
      <Box className={classes.searchContainer}>
        <TextInput
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSearchQuery('');
          }}
          size="sm"
          radius="md"
          className={classes.searchInput}
          dir={isRtl ? 'rtl' : 'ltr'}
          leftSection={isRtl ? undefined : <IconSearch size={16} />}
          rightSection={
            isRtl ? (
              <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {searchQuery.trim().length > 0 && (
                  <IconX
                    size={16}
                    style={{ cursor: 'pointer', color: '#9ca3af' }}
                    onClick={handleClearSearch}
                  />
                )}
                <IconSearch size={16} style={{ color: '#9ca3af' }} />
              </Box>
            ) : (
              searchQuery.trim().length > 0 && (
                <IconX
                  size={16}
                  style={{ cursor: 'pointer', color: '#9ca3af' }}
                  onClick={handleClearSearch}
                />
              )
            )
          }
          styles={{
            input: {
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              '&:focus': {
                borderColor: '#2563eb',
                boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
              },
            },
          }}
        />
      </Box>

      <ScrollArea className={classes.links}>
        {filteredData.length > 0 ? (
          <div className={classes.linksInner} dir={isRtl ? 'rtl' : 'ltr'}>
            {filteredData.map((item) => (
              <HelpCenterLinksGroup
                key={item.link}
                label={item.label}
                link={item.link}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        ) : (
          <div className={classes.emptyState}>
            <Text size="sm" c="dimmed">
              {isRtl ? 'لا توجد نتائج' : 'No results found'}
            </Text>
          </div>
        )}
      </ScrollArea>
    </Box>
  );
}

