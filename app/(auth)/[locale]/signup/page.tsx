import { Suspense } from 'react';
import SignUp from '@/components/auth/pages/SignUp';
export const metadata = { title: 'Create account | Insighta' };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Suspense fallback={null}><SignUp locale={locale}/></Suspense>;
}
