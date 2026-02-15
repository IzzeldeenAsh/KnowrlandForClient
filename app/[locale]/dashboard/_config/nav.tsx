import {
  IconBuildingSkyscraper,
  IconClipboardList,
  IconMessages,
  IconWorld,
  IconUserCheck,
  IconUsersGroup,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  iconColor?: string;
  /**
   * When true, item only matches when pathname equals href (ignoring trailing slash).
   * Otherwise it matches on "startsWith" to cover nested pages.
   */
  exact?: boolean;
};

export type DashboardNavGroup = {
  id: string;
  label: string;
  icon: ReactNode;
  items: DashboardNavItem[];
};

export function getDashboardNav(locale: string): DashboardNavGroup[] {
  const prefix = `/${locale}/dashboard`;

  return [
    {
      id: 'users',
      label: 'Users',
      icon: <IconUsersGroup size={16} />,
      items: [
        {
          label: 'Clients',
          href: `${prefix}/users/clients`,
          icon: <IconUsersGroup size={16} />,
          iconColor: '#334155',
        },
        {
          label: 'Insighters',
          href: `${prefix}/users/insighters`,
          icon: <IconUserCheck size={16} />,
          iconColor: '#f43f5e',
        },
        {
          label: 'Companies',
          href: `${prefix}/users/companies`,
          icon: <IconBuildingSkyscraper size={16} />,
          iconColor: '#22c55e',
        },
      ],
    },
    {
      id: 'requests',
      label: 'Requests',
      icon: <IconClipboardList size={16} />,
      items: [
        {
          label: 'Requests',
          href: `${prefix}/requests`,
          icon: <IconClipboardList size={16} />,
          exact: true,
          iconColor: '#f59e0b',
        },
        {
          label: 'Contact Messages',
          href: `${prefix}/contact-messages`,
          icon: <IconMessages size={16} />,
          exact: true,
          iconColor: '#0ea5e9',
        },
      ],
    },
    {
      id: 'content',
      label: 'Content',
      icon: <IconWorld size={16} />,
      items: [
        {
          label: 'Target Market',
          href: `${prefix}/geography/countries`,
          icon: <IconWorld size={16} />,
          iconColor: '#2563eb',
        },
        {
          label: 'Consulting Fields',
          href: `${prefix}/content/consulting-fields`,
          icon: <IconWorld size={16} />,
          iconColor: '#a855f7',
        },
        {
          label: 'Industry Code (ISIC)',
          href: `${prefix}/content/isic-codes`,
          icon: <IconWorld size={16} />,
          iconColor: '#f97316',
        },
        {
          label: 'Products (HS Codes)',
          href: `${prefix}/content/hs-codes`,
          icon: <IconWorld size={16} />,
          iconColor: '#eab308',
        },
      ],
    },
  ];
}
