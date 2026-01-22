'use client';

import { useMemo, useState } from 'react';
import { HelpCenterLinksGroup } from '../HelpCenterLinksGroup/HelpCenterLinksGroup';
import { Box, ScrollArea, Text, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import classes from './ClientGuideNavbar.module.css';

interface ClientGuideNavbarProps {
  onLinkClick?: () => void;
}

interface NavItem {
  label: string;
  link: string;
}

export function ClientGuideNavbar({ onLinkClick }: ClientGuideNavbarProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const basePath = `/${locale}/resources/first-steps/client-guide`;
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const allData: NavItem[] = [
    { label: t('What is Insighta?', 'ما هي إنسايتا؟'), link: `${basePath}/what-is-insighta` },
    { label: t('Registration & Account Basics', 'التسجيل وإعداد الحساب'), link: `${basePath}/registration-account-basics` },
    { label: t('Searching for Insights and Experts', 'البحث'), link: `${basePath}/searching-for-insights-and-experts` },
    { label: t('Search Results & Insight Page', 'نتائج البحث وصفحة الرؤية'), link: `${basePath}/search-results-and-insight-page` },
    { label: t('Buying Insights & Multi-File Documents', 'شراء الرؤى والمستندات متعددة الملفات'), link: `${basePath}/buying-insights-and-multi-file-documents` },
    { label: t('Booking Consulting Sessions', 'حجز الجلسات الاستشارية'), link: `${basePath}/booking-consulting-sessions` },
    { label: t('Checkout & Payment', 'الدفع'), link: `${basePath}/checkout-and-payment` },
    { label: t('Client Dashboard — What Each Section Does', 'لوحة العميل — مكونات كل قسم'), link: `${basePath}/client-dashboard` },
    { label: t('Support', 'الدعم الفني'), link: `${basePath}/support` },
    { label: t('Becoming an Insighter', 'الترقية إلى Insighter'), link: `${basePath}/becoming-an-insighter` },
    { label: t('FAQ', 'الأسئلة الشائعة'), link: `${basePath}/faq` },
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

