'use client';

import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [opened, setOpened] = useState(initiallyOpened || false);
  
  const isActive = link ? pathname === link : links?.some(l => pathname === l.link);

  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={`${classes.link} ${pathname === link.link ? classes.linkActive : ''}`}
      href={link.link}
      key={link.label}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      {hasLinks ? (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={`${classes.control} ${isActive ? classes.controlActive : ''}`}
        >
          <Group gap={0} justify="space-between" wrap="nowrap" style={{ width: '100%' }}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30} color="blue.4">
                <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ThemeIcon>
              <Text ml="md" fw={500} c={isActive ? 'white' : 'gray.3'}>
                {label}
              </Text>
            </Box>
            <Box mr={isRtl ? 0 : "md"} ml={isRtl ? "md" : 0}>
              {isRtl ? (
                <IconChevronLeft
                  className={classes.chevron}
                  stroke={1.5}
                  style={{
                    width: rem(16),
                    height: rem(16),
                    transform: opened ? 'rotate(-90deg)' : 'none',
                  }}
                />
              ) : (
                <IconChevronRight
                  className={classes.chevron}
                  stroke={1.5}
                  style={{
                    width: rem(16),
                    height: rem(16),
                    transform: opened ? 'rotate(90deg)' : 'none',
                  }}
                />
              )}
            </Box>
          </Group>
        </UnstyledButton>
      ) : (
        <Link href={link || '#'} style={{ textDecoration: 'none' }}>
          <UnstyledButton className={`${classes.control} ${isActive ? classes.controlActive : ''}`}>
            <Group gap={0} wrap="nowrap">
              <ThemeIcon variant="light" size={30} color="blue.4">
                <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ThemeIcon>
              <Text ml="md" fw={500} c={isActive ? 'white' : 'gray.3'}>
                {label}
              </Text>
            </Group>
          </UnstyledButton>
        </Link>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
