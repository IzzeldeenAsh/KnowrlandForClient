export const metadata = {
  title: 'Home - Knoldg',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'
import { useTranslations } from 'next-intl'
import TimeLineFeatures from '@/components/timeline-features'
import Features from '@/components/features'

export default function Home() {
  const t = useTranslations()
  return (
    <>
      <Hero />
      <Clients />
      <Features/>
      {/* <TimeLineFeatures/> */}
      <TestimonialsCarousel />
      <Features02 />
      {/* <Testimonials /> */}
      {/* <Features03 /> */}
       {/* <Features04 /> */}
      {/* <Pricing /> */}
      <Cta />
    </>
  )
}
