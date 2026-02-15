import type { ReactNode } from 'react';
import GeographyTabs from './components/GeographyTabs';

export default async function GeographyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-md font-semibold text-slate-900">Geography</h2>
        <p className="text-xs font-light text-slate-500 ps-1">
          Manage countries, regions, and economic blocks.
        </p>
      </div>

      <div className="mt-3">
        <GeographyTabs locale={locale} />
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

