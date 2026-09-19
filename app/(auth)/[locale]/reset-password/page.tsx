import { Suspense } from 'react';
import ResetPassword from '@/components/auth/pages/ResetPassword';
export const metadata = { title: 'Reset password | Insighta' };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Suspense fallback={null}><ResetPassword locale={locale}/></Suspense>;
}
