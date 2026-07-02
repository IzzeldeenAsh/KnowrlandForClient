/**
 * Navigation config for the insighter dashboard sidebar.
 * Mirrors the Angular InsighterDashboardComponent navigation
 * (KNOLDG-APP insighter-dashboard.component.html).
 *
 * Visibility semantics (from Angular ProfileService):
 * - "client-only" user = roles === ['client'] (no other role)
 * - hideForClient: hidden when the user is a client-only user
 * - roles: shown only when the user has at least one of these roles
 */

export interface DashboardNavItem {
  /** translation key under InsighterDashboard.nav */
  labelKey: string;
  /** path relative to /insighter-dashboard, or absolute when starting with / */
  href: string;
  icon: string;
  hideForClient?: boolean;
  roles?: string[];
  /** match the active state exactly instead of by prefix */
  exact?: boolean;
}

export interface DashboardNavGroup {
  /** translation key under InsighterDashboard.nav */
  titleKey: string;
  items: DashboardNavItem[];
}

export const DASHBOARD_BASE = '/insighter-dashboard';

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    titleKey: 'menu',
    items: [
      { labelKey: 'overview', href: 'my-dashboard', icon: 'layout-dashboard' },
      { labelKey: 'myRequests', href: 'my-requests', icon: 'file-text', hideForClient: true },
      { labelKey: 'myCompany', href: 'my-company-settings', icon: 'users', roles: ['company'] },
    ],
  },
  {
    titleKey: 'insights',
    items: [
      { labelKey: 'myKnowledge', href: 'my-knowledge', icon: 'book', hideForClient: true },
      { labelKey: 'myDownloads', href: 'my-downloads', icon: 'download' },
      { labelKey: 'readLater', href: 'read-later', icon: 'bookmark' },
    ],
  },
  {
    titleKey: 'meetings',
    items: [
      { labelKey: 'meetings', href: 'my-meetings', icon: 'calendar' },
      {
        labelKey: 'consultingSchedule',
        href: 'account-settings/consulting-schedule',
        icon: 'settings',
        hideForClient: true,
      },
    ],
  },
  {
    titleKey: 'projects',
    items: [
      { labelKey: 'clientProjects', href: 'project-offers', icon: 'briefcase', hideForClient: true },
      { labelKey: 'myProjects', href: 'projects-created', icon: 'folder' },
      {
        labelKey: 'projectSettings',
        href: 'account-settings/project-settings',
        icon: 'adjustments',
        hideForClient: true,
      },
    ],
  },
  {
    titleKey: 'marketplace',
    items: [
      { labelKey: 'myOrders', href: 'my-orders', icon: 'shopping-bag' },
      {
        labelKey: 'sales',
        href: 'sales',
        icon: 'chart-line',
        roles: ['insighter', 'company', 'company-insighter'],
      },
      { labelKey: 'wallet', href: 'wallet', icon: 'wallet', roles: ['insighter', 'company'], exact: true },
    ],
  },
  {
    titleKey: 'settings',
    items: [
      {
        labelKey: 'accountSettings',
        href: 'account-settings/general-settings',
        icon: 'user-edit',
        exact: true,
      },
      {
        labelKey: 'notificationSettings',
        href: 'account-settings/notification-settings',
        icon: 'bell',
        exact: true,
      },
      {
        labelKey: 'paymentSettings',
        href: 'account-settings/payment-settings',
        icon: 'credit-card',
        roles: ['insighter', 'company'],
        exact: true,
      },
    ],
  },
];

/** A user is a "client-only" user when client is their single role. */
export function isClientOnly(roles: string[]): boolean {
  return roles.includes('client') && roles.length === 1;
}

export function isNavItemVisible(item: DashboardNavItem, roles: string[]): boolean {
  if (item.hideForClient && isClientOnly(roles)) return false;
  if (item.roles && !item.roles.some((r) => roles.includes(r))) return false;
  return true;
}

export function visibleGroups(roles: string[]): DashboardNavGroup[] {
  return dashboardNavGroups
    .map((group) => ({ ...group, items: group.items.filter((i) => isNavItemVisible(i, roles)) }))
    .filter((group) => group.items.length > 0);
}
