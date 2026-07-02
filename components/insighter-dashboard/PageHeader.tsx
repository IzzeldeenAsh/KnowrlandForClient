'use client';

/**
 * Shared page header for insighter dashboard pages. Mirrors the Angular
 * app-page-header: icon in a dashed circle, title, optional subtitle and
 * an optional tab row.
 */
export default function PageHeader({
  icon,
  title,
  subtitle,
  tabs,
  actions,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  tabs?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-4 px-6 pt-6 pb-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 text-sky-600">
            {icon}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="text-xl font-bold text-sky-600">{title}</h2>
          {subtitle && <div className="text-sm font-medium text-gray-500">{subtitle}</div>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {tabs && (
        <div className="overflow-x-auto px-6">
          <div className="flex gap-6 border-t border-gray-100 pt-1">{tabs}</div>
        </div>
      )}
    </div>
  );
}

export function PageHeaderTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold transition-colors ${
        active
          ? 'border-sky-500 text-sky-600'
          : 'border-transparent text-gray-500 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  );
}
