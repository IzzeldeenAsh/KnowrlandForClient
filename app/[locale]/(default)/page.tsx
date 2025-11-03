export const metadata = {
  title: 'Home - Insighta Business',
  description: 'Insighta Business is a platform for buying and selling insights resources, insights and a platform for experts to monetize their expertise.',
}

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features02 from '@/components/features-02'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import Cta from '@/components/cta'
import { useTranslations } from 'next-intl'
import Features from '@/components/features'

export default function Home() {
  const t = useTranslations()
  return (
    <>
      <Hero />
      <TestimonialsCarousel />
      <Features/>
      <Features02 />
      <Cta />
     </>
  )
}
