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
import { useLocale, useTranslations } from 'next-intl';

export function UserGuideNavbar() {
  const t = useTranslations('Resources');
  const locale = useLocale();
  const basePath = `/${locale}/resources/user-guide`;

  const data = [
    { label: t('getting-started'), icon: IconRocket, link: `${basePath}/getting-started` },
    {
      label: t('account-management'),
      icon: IconUserCircle,
      initiallyOpened: false,
      links: [
        { label: t('profile-setup'), link: `${basePath}/account/profile` },
        { label: t('security'), link: `${basePath}/account/security` },
        { label: t('subscriptions'), link: `${basePath}/account/subscriptions` },
      ],
    },
    {
      label: t('content-features'),
      icon: IconBook,
      links: [
        { label: t('browsing-content'), link: `${basePath}/content/browsing` },
        { label: t('saving-content'), link: `${basePath}/content/saving` },
        { label: t('sharing'), link: `${basePath}/content/sharing` },
      ],
    },
    { label: t('search-tips'), icon: IconNotebook, link: `${basePath}/search-tips` },
    { label: t('faqs'), icon: IconHelp, link: `${basePath}/faqs` },
    { label: t('troubleshooting'), icon: IconSettings, link: `${basePath}/troubleshooting` },
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
