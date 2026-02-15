'use client';

import Link from 'next/link';
import { cloneElement, isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Collapse,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronLeft,
  IconAdjustmentsHorizontal,
  IconLogout2,
  IconSearch,
} from '@tabler/icons-react';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import { getDashboardNav } from '../_config/nav';

type DashboardSidebarProps = {
  locale: string;
  pathname: string;
  onNavigate?: () => void;
  onToggleCollapse?: () => void;
};

function normalizePath(path: string): string {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

function renderMenuIcon(icon: ReactNode, color: string): ReactNode {
  if (!isValidElement<{ size?: number; stroke?: number; color?: string }>(icon)) {
    return icon;
  }

  return cloneElement(icon, { size: 18, stroke: 1.8, color });
}

function renderItemIcon(icon: ReactNode, color: string): ReactNode {
  if (!isValidElement<{ size?: number; stroke?: number; color?: string }>(icon)) {
    return icon;
  }

  return cloneElement(icon, { size: 18, stroke: 1.8, color });
}

function getInitials(name?: string, firstName?: string, lastName?: string): string {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  if (name) {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
  }

  return 'U';
}

export default function DashboardSidebar({ locale, pathname, onNavigate, onToggleCollapse }: DashboardSidebarProps) {
  const { user, signOut } = useGlobalProfile();
  const [menuQuery, setMenuQuery] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const nav = useMemo(() => getDashboardNav(locale), [locale]);
  const current = normalizePath(pathname);

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      for (const group of nav) {
        if (!(group.id in next)) {
          next[group.id] = true;
        }
      }
      for (const key of Object.keys(next)) {
        if (!nav.some((group) => group.id === key)) {
          delete next[key];
        }
      }
      return next;
    });
  }, [nav]);

  const filteredNav = useMemo(() => {
    const query = menuQuery.trim().toLowerCase();

    if (!query) {
      return nav;
    }

    return nav
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0);
  }, [menuQuery, nav]);

  const activeGroupIds = useMemo(() => {
    return nav
      .filter((group) =>
        group.items.some((item) => {
          const href = normalizePath(item.href);
          return item.exact ? current === href : current.startsWith(href);
        }),
      )
      .map((group) => group.id);
  }, [current, nav]);

  useEffect(() => {
    if (menuQuery.trim()) {
      setOpenGroups((prev) => {
        const next = { ...prev };
        for (const group of filteredNav) {
          next[group.id] = true;
        }
        return next;
      });
      return;
    }

    if (activeGroupIds.length > 0) {
      setOpenGroups((prev) => {
        const next = { ...prev };
        for (const id of activeGroupIds) {
          next[id] = true;
        }
        return next;
      });
    }
  }, [activeGroupIds, filteredNav, menuQuery]);

  const fontFamily = 'Inter, -apple-system, "system-ui"';
  const navTextColor = '#181818';
  const sectionHeaderColor = '#5C5C5C';
  const activeText = '#2563eb';
  const activeBg = '#eef2ff';

  return (
    <Stack h="100%" gap={0} style={{ background: '#ffffff' }} p="md">
      <Box px={6} pb={8} pt={4}>
        <TextInput
          placeholder="Find a view"
          value={menuQuery}
          onChange={(event) => setMenuQuery(event.currentTarget.value)}
          leftSection={<IconSearch size={16} stroke={1.8} color="#94a3b8" />}
          size="xs"
          radius="md"
          styles={{
            input: {
              height: 36,
              border: '1px solid transparent',
              background: '#f3f4f6',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'Inter, -apple-system, "system-ui"',
              color: '#475569',
              paddingLeft: 40,
              paddingRight: 40,
            },
          }}
        />
      </Box>

      <Divider color="#cbd5e1" variant="dashed" />

      <Box style={{ flex: 1, minHeight: 0 }}>
        <ScrollArea h="100%" type="hover" scrollbarSize={3}>
          <Stack gap={14} px={6} py={14}>
            {filteredNav.length > 0 ? (
              filteredNav.map((group) => {
                const groupOpen = openGroups[group.id] ?? true;
                return (
                  <Box key={group.id}>
                    <UnstyledButton
                      onClick={() => setOpenGroups((prev) => ({ ...prev, [group.id]: !groupOpen }))}
                      style={{
                        width: '100%',
                        padding: '4px 4px',
                        borderRadius: 10,
                      }}
                    >
                      <Group justify="space-between" gap={10} wrap="nowrap">
                        <Text size="14px" fw={600} c="#334155" style={{ fontFamily }}>
                          {group.label}
                        </Text>
                        <Box
                          style={{
                            transform: groupOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 120ms',
                          }}
                        >
                          <IconChevronDown size={18} color="#334155" />
                        </Box>
                      </Group>
                    </UnstyledButton>

                    <Collapse in={groupOpen} transitionDuration={120}>
                      <Stack gap={8} mt={10}>
                        {group.items.map((item) => {
                          const href = normalizePath(item.href);
                          const active = item.exact ? current === href : current.startsWith(href);
                          const iconColor = item.iconColor ?? '#64748b';

                          return (
                            <UnstyledButton
                              key={item.href}
                              component={Link}
                              href={item.href}
                              onClick={() => onNavigate?.()}
                              style={{
                                width: '100%',
                                padding: '7px 8px',
                                borderRadius: 10,
                                background: active ? activeBg : 'transparent',
                              }}
                            >
                              <Group gap={10} wrap="nowrap">
                                <Box style={{ width: 22, display: 'flex', justifyContent: 'center' }}>
                                  {renderItemIcon(item.icon, iconColor)}
                                </Box>
                                <Text
                                  size="14px"
                                  fw={500}
                                  c={active ? activeText : '#475569'}
                                  style={{ fontFamily }}
                                >
                                  {item.label}
                                </Text>
                              </Group>
                            </UnstyledButton>
                          );
                        })}
                      </Stack>
                    </Collapse>

                    <Divider mt={12} color="#cbd5e1" variant="dashed" />
                  </Box>
                );
              })
            ) : (
              <Text size="14px" fw={400} c={navTextColor} style={{ fontFamily }}>
                No menu items match your search.
              </Text>
            )}
          </Stack>
        </ScrollArea>
      </Box>

      <Divider color="#eef2f7" />

      <Box px={6} py={6}>
        <Group justify="space-between" wrap="nowrap" mb={4}>
          <Group gap={6} wrap="nowrap" style={{ minWidth: 0 }}>
            <Avatar
              size={24}
              radius="xl"
              src={user?.profile_photo_url ?? undefined}
              color="blue"
            >
              {getInitials(user?.name, user?.first_name, user?.last_name)}
            </Avatar>
            <Box style={{ minWidth: 0 }}>
              <Text size="13px" fw={500} c={navTextColor} lineClamp={1} style={{ fontFamily }}>
                {user?.name ?? 'User'}
              </Text>
              <Text size="12px" fw={400} c={sectionHeaderColor} lineClamp={1} style={{ fontFamily }}>
                {user?.email ?? ''}
              </Text>
            </Box>
          </Group>

        </Group>

        <UnstyledButton
          onClick={signOut}
          style={{
            width: '100%',
            borderRadius: 10,
            padding: '6px 8px',
          }}
        >
          <Group gap={6} wrap="nowrap">
            <IconLogout2 size={14} color="#dc2626" />
            <Text size="13px" fw={500} c={navTextColor} style={{ fontFamily }}>
              Sign out
            </Text>
          </Group>
        </UnstyledButton>
      </Box>
    </Stack>
  );
}
