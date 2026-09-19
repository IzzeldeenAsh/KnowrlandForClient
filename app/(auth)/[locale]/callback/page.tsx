import { Suspense } from 'react';
import Callback from '@/components/auth/pages/Callback';
export const metadata = { title: 'Signing in | Insighta' };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Suspense fallback={null}><Callback locale={locale}/></Suspense>;
}
