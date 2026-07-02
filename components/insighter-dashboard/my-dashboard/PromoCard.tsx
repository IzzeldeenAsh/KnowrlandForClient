'use client';

/**
 * Promo card used in the dashboard promo grid (project setup, upgrade to
 * company, notification preferences, publish insights). Mirrors the Angular
 * .dashboard-promo-card styles: white card, light border, image + copy + CTA.
 */
export default function PromoCard({
  image,
  imageAlt,
  title,
  text,
  action,
}: {
  image: string;
  imageAlt: string;
  title: string;
  text: string;
  action: React.ReactNode;
}) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt} loading="lazy" className="h-20 w-20 shrink-0 object-contain" />
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{text}</p>
        </div>
      </div>
      <div className="shrink-0">{action}</div>
    </article>
  );
}

export function PromoGrid({ children }: { children: React.ReactNode }) {
  return <section className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-2">{children}</section>;
}

export function PromoButton({
  onClick,
  href,
  disabled,
  children,
}: {
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const className =
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ' +
    (disabled
      ? 'cursor-not-allowed bg-gray-100 text-gray-400'
      : 'bg-sky-500 text-white hover:bg-sky-600');

  if (href && !disabled) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
