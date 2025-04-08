'use client'

import Footer from '@/components/ui/footer'
import { useTranslations } from 'next-intl'

export default function FAQs() {
  const t = useTranslations('Resources')
  
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 " style={{minHeight: '1000px'}}>
    </div>
        <Footer/>
        </>
  )
}
