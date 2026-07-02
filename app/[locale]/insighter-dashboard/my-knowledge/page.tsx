import { redirect } from 'next/navigation';

export default async function MyKnowledgeIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/insighter-dashboard/my-knowledge/general`);
}
