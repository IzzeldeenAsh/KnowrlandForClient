import { redirect } from 'next/navigation';

export default async function InsighterDashboardIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/insighter-dashboard/my-dashboard`);
}
