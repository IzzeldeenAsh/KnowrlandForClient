'use client';

import { useState } from 'react';
import {
  Box,
  Collapse,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import classes from './HelpCenterLinksGroup.module.css';

interface LinkItem {
  label: string;
  link?: string;
  links?: LinkItem[];
}

interface NestedLinkItemProps {
  item: LinkItem;
  initiallyOpened?: boolean;
  onLinkClick?: () => void;
}

function NestedLinkItem({ item, initiallyOpened, onLinkClick }: NestedLinkItemProps) {
  const pathname = usePathname();
  const hasNestedLinks = Array.isArray(item.links) && item.links.length > 0;
  const checkIsActive = (linkItem: LinkItem): boolean => {
    if (linkItem.link && pathname === linkItem.link) return true;
    if (linkItem.links) {
      return linkItem.links.some(checkIsActive);
    }
    return false;
  };
  const isItemActive = checkIsActive(item);
  const [itemOpened, setItemOpened] = useState(
    isItemActive || (initiallyOpened && hasNestedLinks)
  );

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  if (hasNestedLinks) {
    return (
      <Box style={{ marginLeft: rem(16) }}>
        <UnstyledButton
          onClick={() => setItemOpened((o) => !o)}
          className={`${classes.control} ${isItemActive ? classes.controlActive : ''}`}
          style={{ padding: rem(8) }}
        >
          <Box style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box className={classes.chevronContainer}>
              <IconChevronRight
                className={classes.chevron}
                stroke={2.5}
                style={{
                  width: rem(12),
                  height: rem(12),
                  transform: itemOpened ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              />
            </Box>
            <Text size="sm" fw={500} className={isItemActive ? classes.textActive : classes.text}>
              {item.label}
            </Text>
          </Box>
        </UnstyledButton>
        <Collapse in={itemOpened}>
          <Box style={{ marginLeft: rem(16) }}>
            {item.links!.map((nestedLink) => (
              <Link
                className={`${classes.link} ${pathname === nestedLink.link ? classes.linkActive : ''}`}
                href={nestedLink.link || '#'}
                key={nestedLink.label}
                onClick={handleLinkClick}
              >
                {nestedLink.label}
              </Link>
            ))}
          </Box>
        </Collapse>
      </Box>
    );
  }

  return (
    <Link
      key={item.label}
      className={`${classes.link} ${pathname === item.link ? classes.linkActive : ''}`}
      href={item.link || '#'}
      onClick={handleLinkClick}
    >
      {item.label}
    </Link>
  );
}

interface HelpCenterLinksGroupProps {
  label: string;
  initiallyOpened?: boolean;
  links?: LinkItem[];
  link?: string;
  onLinkClick?: () => void;
}

export function HelpCenterLinksGroup({
  label,
  initiallyOpened,
  links,
  link,
  onLinkClick,
}: HelpCenterLinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [opened, setOpened] = useState(initiallyOpened || false);
  
  const checkIsActiveRecursive = (items: LinkItem[]): boolean => {
    return items.some(item => {
      if (item.link && pathname === item.link) return true;
      if (item.links) return checkIsActiveRecursive(item.links);
      return false;
    });
  };

  const isActive = link ? pathname === link : (links ? checkIsActiveRecursive(links) : false);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const items = (hasLinks ? links : []).map((linkItem) => (
    <NestedLinkItem
      key={linkItem.label}
      item={linkItem}
      initiallyOpened={initiallyOpened}
      onLinkClick={handleLinkClick}
    />
  ));

  return (
    <>
      {hasLinks ? (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={`${classes.control} ${isActive ? classes.controlActive : ''}`}
        >
          <Box style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box className={classes.chevronContainer}>
              <IconChevronRight
                className={classes.chevron}
                stroke={2.5}
                style={{
                  width: rem(14),
                  height: rem(14),
                  transform: opened ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              />
            </Box>
            <Text fw={500} className={isActive ? classes.textActive : classes.text}>
              {label}
            </Text>
          </Box>
        </UnstyledButton>
      ) : (
        <Link href={link || '#'} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
          <UnstyledButton className={`${classes.control} ${isActive ? classes.controlActive : ''}`}>
            <Text fw={500} className={isActive ? classes.textActive : classes.text}>
              {label}
            </Text>
          </UnstyledButton>
        </Link>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
