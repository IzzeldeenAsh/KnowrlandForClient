import { redirect } from 'next/navigation';

export default async function GeographyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/dashboard/geography/countries`);
}

