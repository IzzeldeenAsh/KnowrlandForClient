export const metadata = {
  title: 'Home - Insighta Business',
  description: 'Insighta Business is a platform for buying and selling insights resources, insights and a platform for experts to monetize their expertise.',
}

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features02 from '@/components/features-02'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import Cta from '@/components/cta'
import Features from '@/components/features'
import FloatingPublishButton from '@/components/floating-publish-button'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/seo'
import DraftSavedToast from './DraftSavedToast'

type HomeProps = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: HomeProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale || 'en'
  
  const organizationSchema = generateOrganizationSchema(locale)
  const webSiteSchema = generateWebSiteSchema(locale)
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, webSiteSchema])
        }}
      />
      <DraftSavedToast locale={locale} />
      <Hero />
      <TestimonialsCarousel />
      <Features/>
      <Cta />
      <Features02 />
      <FloatingPublishButton />
     </>
  )
}
