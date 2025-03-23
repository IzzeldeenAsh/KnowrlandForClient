export const metadata = {
  title: 'About - Knoldg',
  description: 'Learn about Knoldg - the digital platform where knowledge meets opportunity.',
}

import Hero from '@/components/hero-about'
import AboutContent from '@/components/about-content'
import Cta from '@/components/cta-02'

export default function About() {
  return (
    <>
      {/* <Hero /> */}
      <AboutContent />
      <Cta />
    </>
  )
}
