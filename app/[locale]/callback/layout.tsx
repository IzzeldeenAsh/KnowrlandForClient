import { Locale } from '@/i18n/routing';

export default function CallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="callback-container">
      {children}
    </div>
  );
} 