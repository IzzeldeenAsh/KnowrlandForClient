import './auth.css';
import { notFound } from 'next/navigation';
export const metadata = { robots: { index: false, follow: false }, referrer: 'no-referrer' as const };
export default async function AuthLayout({ children, params }: { children: React.ReactNode; params: Promise<{locale: string}> }) {
  const {locale} = await params;
  if (locale !== 'en' && locale !== 'ar') notFound();
  return children;
}
