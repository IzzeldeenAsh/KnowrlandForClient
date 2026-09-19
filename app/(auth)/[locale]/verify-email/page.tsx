import { Suspense } from 'react';
import VerifyEmail from '@/components/auth/pages/VerifyEmail';
export const metadata = { title: 'Verify email | Insighta' };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Suspense fallback={null}><VerifyEmail locale={locale}/></Suspense>;
}
