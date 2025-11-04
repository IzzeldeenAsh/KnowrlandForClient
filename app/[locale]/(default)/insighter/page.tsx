export const metadata = {
  title: 'Insighter - Insighta',
  description: 'Page description',
}

import { useTranslations } from 'next-intl'
import HeroInsighter from '@/components/insighter-hero'
import InsighterFeatures from '@/components/insighter-features'

export default function Home() {
  const t = useTranslations()
  return (
    <>
      <InsighterFeatures />
    </>
  )
}
