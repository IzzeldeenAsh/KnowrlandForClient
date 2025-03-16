import { Locale } from '@/i18n/routing';

export default function CallbackLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <div className="callback-container">
      {children}
    </div>
  );
} 