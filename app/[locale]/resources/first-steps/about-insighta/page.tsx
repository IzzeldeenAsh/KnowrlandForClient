import { redirect } from 'next/navigation'

export default async function AboutInsightaPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  
  // Redirect to the first page: "What is Insighta"
  redirect(`/${locale}/resources/first-steps/about-insighta/what-is-insighta`)
}
