import {
  IconBuildingSkyscraper,
  IconClipboardList,
  IconFileText,
  IconMessages,
  IconMessageCircle,
  IconTag,
  IconWorld,
  IconUserCheck,
  IconUsersGroup,
  IconCurrencyDollar,
  IconChartLine,
  IconShoppingCart,
  IconArrowsExchange,
  IconWallet,
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
        {
          label: 'Staff',
          href: `${prefix}/users/staff`,
          icon: <IconUsersGroup size={16} />,
          iconColor: '#0ea5e9',
        },
        {
          label: 'Roles & Permissions',
          href: `${prefix}/users/roles-permissions`,
          icon: <IconFileText size={16} />,
          exact: true,
          iconColor: '#6366f1',
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
        {
          label: 'Tags',
          href: `${prefix}/content/tags`,
          icon: <IconTag size={16} />,
          iconColor: '#14b8a6',
        },
        {
          label: 'Topics',
          href: `${prefix}/content/topics`,
          icon: <IconMessageCircle size={16} />,
          iconColor: '#6366f1',
        },
        {
          label: 'Guidelines',
          href: `${prefix}/content/guidelines`,
          icon: <IconFileText size={16} />,
          iconColor: '#0ea5e9',
        },
      ],
    },
    {
      id: 'financial',
      label: 'Finance',
      icon: <IconCurrencyDollar size={16} />,
      items: [
        {
          label: 'Admin Sales',
          href: `${prefix}/finance/admin-sales`,
          icon: <IconChartLine size={16} />,
          exact: true,
          iconColor: '#2563eb',
        },
        {
          label: 'Orders',
          href: `${prefix}/finance/orders`,
          icon: <IconShoppingCart size={16} />,
          exact: true,
          iconColor: '#0ea5e9',
        },
        {
          label: 'Transactions',
          href: `${prefix}/finance/transactions`,
          icon: <IconArrowsExchange size={16} />,
          exact: true,
          iconColor: '#10b981',
        },
        {
          label: 'Insighters Wallets',
          href: `${prefix}/finance/insighters-wallets`,
          icon: <IconWallet size={16} />,
          exact: true,
          iconColor: '#a855f7',
        },
      ],
    }
  ];
}
