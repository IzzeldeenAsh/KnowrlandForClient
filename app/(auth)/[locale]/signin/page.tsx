import { Suspense } from 'react';
import SignIn from '@/components/auth/pages/SignIn';
export const metadata = { title: 'Sign in | Insighta' };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Suspense fallback={null}><SignIn locale={locale}/></Suspense>;
}
