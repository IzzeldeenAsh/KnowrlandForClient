'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type GeographyTabsProps = {
  locale: string;
};

function normalizePath(path: string): string {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

export default function GeographyTabs({ locale }: GeographyTabsProps) {
  const pathname = usePathname();
  const current = normalizePath(pathname);

  const tabs = useMemo(() => {
    const prefix = `/${locale}/dashboard/geography`;
    return [
      { label: 'Countries', href: `${prefix}/countries` },
      { label: 'Regions', href: `${prefix}/regions` },
      { label: 'Economic Block', href: `${prefix}/economic-block` },
    ];
  }, [locale]);

  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
      {tabs.map((tab) => {
        const href = normalizePath(tab.href);
        const active = current === href || current.startsWith(`${href}/`);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              'inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium shadow-sm',
              active
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
            ].join(' ')}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

