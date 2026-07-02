'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  IconLayoutDashboard,
  IconFileText,
  IconUsers,
  IconBook,
  IconDownload,
  IconBookmark,
  IconCalendar,
  IconSettings,
  IconBriefcase,
  IconFolder,
  IconAdjustmentsHorizontal,
  IconShoppingBag,
  IconChartLine,
  IconWallet,
  IconUserEdit,
  IconBell,
  IconCreditCard,
  IconMenu2,
  type Icon,
} from '@tabler/icons-react';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';
import { visibleGroups, DASHBOARD_BASE, type DashboardNavItem } from './nav-config';

const ICONS: Record<string, Icon> = {
  'layout-dashboard': IconLayoutDashboard,
  'file-text': IconFileText,
  users: IconUsers,
  book: IconBook,
  download: IconDownload,
  bookmark: IconBookmark,
  calendar: IconCalendar,
  settings: IconSettings,
  briefcase: IconBriefcase,
  folder: IconFolder,
  adjustments: IconAdjustmentsHorizontal,
  'shopping-bag': IconShoppingBag,
  'chart-line': IconChartLine,
  wallet: IconWallet,
  'user-edit': IconUserEdit,
  bell: IconBell,
  'credit-card': IconCreditCard,
};

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  /** Called after a nav item is clicked (used to close the mobile drawer). */
  onNavigate?: () => void;
  /** Mobile drawer rendering: always expanded, no collapse toggle. */
  mobile?: boolean;
}

export default function DashboardSidebar({
  collapsed,
  onToggleCollapse,
  onNavigate,
  mobile = false,
}: DashboardSidebarProps) {
  const t = useTranslations('InsighterDashboard.nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { roles } = useGlobalProfile();

  const groups = visibleGroups(roles);
  const isCollapsed = mobile ? false : collapsed;

  const hrefFor = (item: DashboardNavItem) => `/${locale}${DASHBOARD_BASE}/${item.href}`;

  const isActive = (item: DashboardNavItem) => {
    const full = `${DASHBOARD_BASE}/${item.href}`;
    // pathname includes the locale prefix; strip it for comparison
    const path = pathname.replace(/^\/(en|ar)(?=\/|$)/, '');
    if (item.exact) return path === full;
    // Prefix routes (e.g. my-dashboard) must not match settings sub-pages of
    // account-settings when the item itself is a sub-page of another item.
    return path === full || path.startsWith(`${full}/`);
  };

  return (
    <nav
      className={`flex flex-col gap-4 transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${mobile ? 'w-full' : ''}`}
      aria-label={t('menu')}
    >
      {groups.map((group, groupIndex) => (
        <div
          key={group.titleKey}
          className="rounded-xl border border-gray-200 bg-white"
        >
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            {!isCollapsed && (
              <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400">
                {t(group.titleKey)}
              </h3>
            )}
            {!mobile && groupIndex === 0 && (
              <button
                type="button"
                onClick={onToggleCollapse}
                title={isCollapsed ? t('expandMenu') : t('collapseMenu')}
                className="rounded-md p-1 text-sky-600 hover:bg-sky-50"
              >
                <IconMenu2 size={18} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-0.5 p-2">
            {group.items.map((item) => {
              const ItemIcon = ICONS[item.icon] ?? IconFileText;
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={hrefFor(item)}
                  onClick={onNavigate}
                  title={isCollapsed ? t(item.labelKey) : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-sky-50 text-sky-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                  <ItemIcon size={18} className="shrink-0" />
                  {!isCollapsed && <span className="truncate">{t(item.labelKey)}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
