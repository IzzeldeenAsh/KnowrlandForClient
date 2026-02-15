'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Group,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import DashboardSidebar from './DashboardSidebar';
import NotificationBell from '@/components/ui/header/components/NotificationBell';

type DashboardShellProps = {
  children: ReactNode;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 55 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={10}
      styles={{
        header: {
          background: '#ffffff',
          borderBottom: '1px solid #eef2f7',
        },
        main: {
          background: '#f8fafc',
        },
        navbar: {
          background: '#ffffff',
          borderInlineEnd: '1px solid #eef2f7',
        },
      }}
    >
      <AppShell.Header px="lg">
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group gap={6} wrap="nowrap">
            <Burger
              hiddenFrom="md"
              opened={mobileOpened}
              onClick={toggleMobile}
              size="sm"
              aria-label="Toggle sidebar"
            />
          
            <Text size="sm" className='flex items-center gap-2' fw={600} c="#334155">
            <img
              src="/images/smallLogo.png"
              alt="Insighta Business Logo"
              style={{ height: 40, width: 'auto', objectFit: 'contain', marginRight: 8 }}
            />
            <Text size="sm" className='text-base' fw={500} c="#334155">Insighta cPanel</Text>
            </Text>
          </Group>

          <NotificationBell parent="app" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <DashboardSidebar
          locale={locale}
          pathname={pathname}
          onNavigate={closeMobile}
          onToggleCollapse={toggleDesktop}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p="sm">
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
