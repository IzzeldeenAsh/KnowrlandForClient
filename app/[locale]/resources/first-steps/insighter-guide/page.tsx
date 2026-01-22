import { redirect } from 'next/navigation'

export default async function InsighterGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale

  redirect(`/${locale}/resources/first-steps/insighter-guide/what-is-an-insighter`)
}

