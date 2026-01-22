'use client';

import { useState, useMemo } from 'react';
import { HelpCenterLinksGroup } from '../HelpCenterLinksGroup/HelpCenterLinksGroup';
import { ScrollArea, Box, TextInput, Text } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import classes from './AboutInsightaNavbar.module.css';
import { useLocale } from 'next-intl';

interface AboutInsightaNavbarProps {
  onLinkClick?: () => void;
}

interface LinkItem {
  label: string;
  link?: string;
  links?: LinkItem[];
}

interface NavItem {
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: LinkItem[];
}

export function AboutInsightaNavbar({ onLinkClick }: AboutInsightaNavbarProps) {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const isRtl = locale === 'ar';
  
  const basePath = `/${locale}/resources/first-steps/about-insighta`;

  // Translation helper function
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const allData: NavItem[] = [
    { 
      label: t('What is Insighta', 'ما هي إنسايتا'), 
      link: `${basePath}/what-is-insighta`,
    },
    { 
      label: t('Types of Content Available', 'أنواع المحتوى المتاح'), 
      link: `${basePath}/content-types`,
    },
    { 
      label: t('Why Insighta', 'لماذا إنسايتا'), 
      link: `${basePath}/why-insighta`,
    },
    {
      label: t('Client Account', 'حساب العميل'),
      links: [
        { 
          label: t('What you can do', 'ما يمكنك فعله'), 
          link: `${basePath}/account-types/client-account/what-you-can-do` 
        },
        { 
          label: t('Why Insighta is different', 'لماذا إنسايتا مميزة'), 
          link: `${basePath}/account-types/client-account/why-insighta-is` 
        },
        { 
          label: t('Insighta\'s Transparent', 'شفافية إنسايتا'), 
          link: `${basePath}/account-types/client-account/insightas-transparent` 
        },
        { 
          label: t('Pillars of Trust in Insighta', 'ركائز الثقة في إنسايتا'), 
          link: `${basePath}/account-types/client-account/pillars-of-trust` 
        }
      ]
    },
    {
      label: t('The Insighter Account', 'حساب الإنسايتر'),
      links: [
        { 
          label: t('Who Can Become an Insighter', 'من يمكنه أن ينضم كـ إنسايتر ( خبير)'), 
          link: `${basePath}/account-types/insighter-account/who-can-become-an-insighter` 
        },
        { 
          label: t('Your Digital Knowledge Base', 'قاعدتك المعرفية الرقمية  '), 
          link: `${basePath}/account-types/insighter-account/your-digital-knowledge-base` 
        },
        { 
          label: t('How Do Clients Reach', 'كيف يصل العملاء'), 
          link: `${basePath}/account-types/insighter-account/how-do-clients-reach` 
        },
      ]
    },
    {
      label: t('Company Accounts', 'حسابات الشركات'),
      links: [
        { 
          label: t('Why a Company', 'لماذا شركة'), 
          link: `${basePath}/account-types/company-accounts/why-a-company` 
        },
      ]
    },
    {
      label: t('Getting Started', 'البدء'),
      link: `${basePath}/getting-started`,
    },
    // {
    //   label: t('For Experts', 'للخبراء'),
    //   initiallyOpened: pathname.includes('/for-experts'),
    //   links: [
    //     { label: t('Publishing and Content', 'النشر والمحتوى'), link: `${basePath}/for-experts/publishing-and-content` },
    //     { label: t('After Publishing', 'بعد النشر'), link: `${basePath}/for-experts/after-publishing` },
    //     { label: t('Online Consulting', 'الاستشارة عبر الإنترنت'), link: `${basePath}/for-experts/online-consulting` },
    //     { label: t('Strategies to Increase', 'استراتيجيات لزيادة'), link: `${basePath}/for-experts/strategies-to-increase` },
    //     { label: t('The Real Value of', 'القيمة الحقيقية لـ'), link: `${basePath}/for-experts/real-value` },
    //     { label: t('Golden Tips for', 'نصائح ذهبية لـ'), link: `${basePath}/for-experts/golden-tips` },
    //   ]
    // },
  ];

  // Helper function to recursively filter links
  const filterLinksRecursive = (links: LinkItem[], query: string): LinkItem[] => {
    return links
      .map((linkItem) => {
        const labelMatch = linkItem.label.toLowerCase().includes(query);
        
        if (linkItem.links) {
          // Recursively filter nested links
          const filteredNestedLinks = filterLinksRecursive(linkItem.links, query);
          
          // Include if label matches or has matching nested links
          if (labelMatch || filteredNestedLinks.length > 0) {
            return {
              ...linkItem,
              links: filteredNestedLinks,
            };
          }
          return null;
        } else {
          // Simple link item
          return labelMatch ? linkItem : null;
        }
      })
      .filter((item): item is LinkItem => item !== null);
  };

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return allData;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return allData
      .map((item) => {
        const labelMatch = item.label.toLowerCase().includes(query);
        
        if (item.links) {
          // Filter child links recursively
          const filteredLinks = filterLinksRecursive(item.links, query);
          
          // Include parent if label matches or if it has matching children
          if (labelMatch || filteredLinks.length > 0) {
            return {
              ...item,
              links: filteredLinks,
              initiallyOpened: true, // Auto-open when searching
            };
          }
          
          return null;
        } else {
          // Simple link item
          return labelMatch ? item : null;
        }
      })
      .filter((item): item is NavItem => item !== null);
  }, [searchQuery, allData]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const searchPlaceholder = isRtl ? 'البحث في القائمة...' : 'Search menu...';

  return (
    <Box className={classes.navbar} component="nav">
      <Box className={classes.searchContainer}>
        <TextInput
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSearchQuery('');
            }
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
          <div className={classes.linksInner}>
            {filteredData.map((item) => (
              <HelpCenterLinksGroup 
                {...item} 
                key={item.label}
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
