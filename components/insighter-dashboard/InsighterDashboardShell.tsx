'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { IconMenu2, IconX } from '@tabler/icons-react';
import DashboardGuard from './DashboardGuard';
import DashboardSidebar from './DashboardSidebar';

/**
 * Shell for all /insighter-dashboard routes. Mirrors the Angular
 * InsighterDashboardComponent: desktop sidebar (auto-collapses <= 1230px),
 * mobile drawer (<= 575px), content area beside it.
 */
export default function InsighterDashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 575;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
        setCollapsed(window.innerWidth <= 1230);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close the mobile drawer after navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <DashboardGuard roles={['insighter', 'company', 'company-insighter', 'client']}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50 pt-20 sm:pt-24">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6">
          {/* Mobile menu toggle */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="mb-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-sky-600"
            >
              <IconMenu2 size={20} />
            </button>
          )}

          <div className="flex flex-col gap-6 pb-16 sm:flex-row">
            {/* Desktop sidebar */}
            {!isMobile && (
              <aside className="shrink-0">
                <DashboardSidebar
                  collapsed={collapsed}
                  onToggleCollapse={() => setCollapsed((c) => !c)}
                />
              </aside>
            )}

            {/* Mobile drawer */}
            {isMobile && mobileOpen && (
              <div className="fixed inset-0 z-50">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setMobileOpen(false)}
                  aria-hidden
                />
                <div
                  className={`absolute top-0 h-full w-[300px] overflow-y-auto bg-gray-50 p-4 shadow-xl ${
                    isRTL ? 'right-0' : 'left-0'
                  }`}
                >
                  <div className="mb-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                      <IconX size={20} />
                    </button>
                  </div>
                  <DashboardSidebar
                    mobile
                    collapsed={false}
                    onToggleCollapse={() => {}}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </div>
              </div>
            )}

            {/* Main content */}
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        </div>
      </div>
    </DashboardGuard>
  );
}
