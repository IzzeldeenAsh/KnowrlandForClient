import { redirect } from 'next/navigation';

export default async function DashboardUsersIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/dashboard/users/clients`);
}

