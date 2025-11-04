export const metadata = {
  title: 'About - Insighta',
  description: 'Learn about Insighta - the digital platform where insights meets opportunity.',
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
