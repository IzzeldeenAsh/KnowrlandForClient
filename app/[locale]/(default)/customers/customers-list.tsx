'use client'

import Link from 'next/link'
import Image from 'next/image'
import CustomerBg01 from '@/public/images/customer-bg-01.png'
import CustomerBg02 from '@/public/images/customer-bg-02.png'
import CustomerBg03 from '@/public/images/customer-bg-03.png'
import { useParams } from 'next/navigation'

import Particles from '@/components/particles'
import Highlighter, { HighlighterItem02 } from '@/components/highlighter'

export default function CustomersList() {
  const { locale } = useParams()

  const items = [
    {
      text: {
        en: 'On-Demand insights Production',
        ar: 'إنتاج معرفي قائم على الطلب'
      },
      bg: CustomerBg01,
      link: '/customers/single-post',
    },
    {
      text: {
        en: 'Smart Alerts for You & Your Clients',
        ar: 'نظام تنبيهات متطور لك وللعميل'
      },
      bg: CustomerBg02,
      link: '/customers/single-post',
    },
    {
      text: {
        en: 'Work Anytime, Anywhere',
        ar: 'أينما كنت وفي الوقت الذي تريد'
      },
      bg: CustomerBg03,
      link: '/customers/single-post',
    }
  ]

  return (
  <div className="max-w-[352px] mx-auto sm:max-w-[728px] lg:max-w-none pb-12 md:pb-20">
    <Highlighter className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 group [&_*:nth-child(n+5):not(:nth-child(n+12))]:order-1 [&_*:nth-child(n+10):not(:nth-child(n+11))]:!order-2">

      {items.map((item, index) => (
        <div key={index}>
            <HighlighterItem02>
              <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                {/* Particles animation */}
                <Particles className="absolute inset-0 -z-10" quantity={3} />
                <div className="flex items-center justify-center relative">
                  <Image className="w-full h-full aspect-video object-cover" src={item.bg} width={352} height={198} alt="Customer Background" aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className={`text-xl font-semibold text-white text-center px-6 ${locale === 'ar' ? 'dir-rtl' : ''}`}>
                      {item.text[locale as keyof typeof item.text]}
                    </p>
                  </div>
                </div>
              </div>
            </HighlighterItem02>
        </div>
      ))}

    </Highlighter>
  </div>
  )
}
