import { Suspense } from 'react';
import SignOut from '@/components/auth/pages/SignOut';
export const metadata = { title: 'Signing out | Insighta' };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Suspense fallback={null}><SignOut locale={locale}/></Suspense>;
}
