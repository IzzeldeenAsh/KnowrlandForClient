'use client';

import {
  IconBook,
  IconBookmark,
  IconSettings,
  IconNotebook,
  IconHelp,
  IconInfoCircle,
  IconRocket,
  IconUserCircle,
} from '@tabler/icons-react';
import { Group, ScrollArea, Box, Text } from '@mantine/core';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import classes from './UserGuideNavbar.module.css';
import { useTranslations } from 'next-intl';

export function UserGuideNavbar() {
  const t = useTranslations('Resources');

  const data = [
    { label: t('getting-started'), icon: IconRocket, link: '/resources/user-guide/getting-started' },
    {
      label: t('account-management'),
      icon: IconUserCircle,
      initiallyOpened: false,
      links: [
        { label: t('profile-setup'), link: '/resources/user-guide/account/profile' },
        { label: t('security'), link: '/resources/user-guide/account/security' },
        { label: t('subscriptions'), link: '/resources/user-guide/account/subscriptions' },
      ],
    },
    {
      label: t('content-features'),
      icon: IconBook,
      links: [
        { label: t('browsing-content'), link: '/resources/user-guide/content/browsing' },
        { label: t('saving-content'), link: '/resources/user-guide/content/saving' },
        { label: t('sharing'), link: '/resources/user-guide/content/sharing' },
      ],
    },
    { label: t('search-tips'), icon: IconNotebook, link: '/resources/user-guide/search-tips' },
    { label: t('faqs'), icon: IconHelp, link: '/resources/user-guide/faqs' },
    { label: t('troubleshooting'), icon: IconSettings, link: '/resources/user-guide/troubleshooting' },
  ];

  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Box className={classes.navbar} component="nav">
  

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </Box>
  );
}
