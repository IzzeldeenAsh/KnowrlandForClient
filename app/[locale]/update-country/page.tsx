import { redirect } from 'next/navigation'

type LegacyCountryPageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ redirect?: string; returnUrl?: string }>
}

export default async function LegacyCountryPage({ params, searchParams }: LegacyCountryPageProps) {
  const { locale } = await params
  const query = await searchParams
  const destination = query.redirect || query.returnUrl
  const onboardingUrl = destination
    ? `/${locale}/onboarding?redirect=${encodeURIComponent(destination)}`
    : `/${locale}/onboarding`

  redirect(onboardingUrl)
}
