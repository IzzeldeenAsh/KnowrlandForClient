export const metadata = {
  title: 'Home - Knoldg',
  description: 'Page description',
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
