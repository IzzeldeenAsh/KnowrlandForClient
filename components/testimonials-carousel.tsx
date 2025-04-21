'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Particles from './particles'
import Highlighter, { HighlighterItem } from './highlighter'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import CarouselImg01 from '@/public/images/carousel-icon-01.svg'
import CarouselImg02 from '@/public/images/carousel-icon-02.svg'
import CarouselImg03 from '@/public/images/carousel-icon-03.svg'
import CarouselImg04 from '@/public/images/carousel-icon-04.svg'
import CarouselImg05 from '@/public/images/carousel-icon-05.svg'

/* ــــــــ Swiper v11+ ــــــــ */
import Swiper, { Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'

export default function TestimonialsCarousel() {
  const t = useTranslations('Testimonials')
  const [swiperReady, setSwiperReady] = useState(false)
  const locale = useLocale()
  useEffect(() => {
    /* تمرير الموديولات عبر الخاصيّة modules */
    new Swiper('.Knoldg-carousel', {
      modules: [Navigation, Autoplay],

      breakpoints: {
        320:  { slidesPerView: 1 },
        640:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },

      loop: true,               // دوران لا نهائي
      spaceBetween: 24,
      grabCursor: true,

      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },

      autoplay: {
        delay: 2000,            // ٤ ثوانٍ بين كل انزلاق
        disableOnInteraction: false,
      },
    })

    setSwiperReady(true)
  }, [])

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* ===== السلايدر ===== */}
          <div className="relative before:absolute before:inset-0 before:-translate-x-full before:z-20 before:bg-gradient-to-l before:from-transparent before:to-slate-900 before:to-20% after:absolute after:inset-0 after:translate-x-full after:z-20 after:bg-gradient-to-r after:from-transparent after:to-slate-900 after:to-20%">
            {/* لاحظ استعمال .swiper بدل .swiper-container مع v11 */}
            <div className="Knoldg-carousel swiper group">
              <Highlighter className="swiper-wrapper" refresh={swiperReady}>

                {/* الشريحة 1 */}
                <HighlighterItem className="swiper-slide h-auto group/slide">
                <Link href={`/${locale}/industries/insight`}>
                  <Card
                    img={CarouselImg01}
                    alt={t('insights.alt')}
                    title={t('insights.title')}
                    desc={t('insights.description')}
                    learnMore={t('common.learnMore')}
                  />
                  </Link>
                </HighlighterItem>

                {/* الشريحة 2 */}
                <HighlighterItem className="swiper-slide h-auto group/slide">
                  <Link href={`/${locale}/industries/report`}>
                  <Card
                    img={CarouselImg02}
                    alt={t('reports.alt')}
                    title={t('reports.title')}
                    desc={t('reports.description')}
                    learnMore={t('common.learnMore')}
                  />
                  </Link>
                </HighlighterItem>

                {/* الشريحة 3 */}
                <HighlighterItem className="swiper-slide h-auto group/slide">
                  <Link href={`/${locale}/industries/manual`}>
                  <Card
                    img={CarouselImg03}
                    alt={t('manuals.alt')}
                    title={t('manuals.title')}
                    desc={t('manuals.description')}
                    learnMore={t('common.learnMore')}
                  />
                  </Link>
                </HighlighterItem>

                {/* الشريحة 4 */}
                <HighlighterItem className="swiper-slide h-auto group/slide">
                  <Link href={`/${locale}/industries/data`}>
                  <Card
                    img={CarouselImg04}
                    alt={t('data.alt')}
                    title={t('data.title')}
                    desc={t('data.description')}
                    learnMore={t('common.learnMore')}
                  />
                  </Link>
                </HighlighterItem>

                {/* الشريحة 5 */}
                <HighlighterItem className="swiper-slide h-auto group/slide">
                  <Link href={`/${locale}/industries/course`}>
                  <Card
                    img={CarouselImg05}
                    alt={t('courses.alt')}
                    title={t('courses.title')}
                    desc={t('courses.description')}
                    learnMore={t('common.learnMore')}
                    />
                  </Link>
                </HighlighterItem>

              </Highlighter>
            </div>
          </div>

          {/* الأسهم */}
          <div className="flex mt-8 justify-end">
            <Arrow dir="prev" label={t('navigation.previous')} />
            <Arrow dir="next" label={t('navigation.next')} />
          </div>

        </div>
      </div>
    </section>
  )
}

/* ========== بطاقة داخل السلايدر ========== */
type CardProps = {
  img: any; alt: string; title: string; desc: string; learnMore: string
}
function Card({ img, alt, title, desc, learnMore }: CardProps) {
  return (
    <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
      <Particles className="absolute inset-0 -z-10 opacity-0 group-[.swiper-slide-active]/slide:opacity-100 group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" quantity={3} />
      <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
        <div className="absolute inset-0 translate-z-0 rounded-full bg-slate-800 group-[.swiper-slide-active]/slide:bg-blue-500 transition-colors duration-500 ease-in-out blur-[60px]" />
      </div>
      <div className="flex flex-col p-6 h-full">
        <Image className="mb-3" src={img} width={56} height={56} alt={alt} />
        <div className="grow">
          <div className="font-bold text-lg mb-1">{title}</div>
          <div className="text-slate-400 mb-3">{desc}</div>
        </div>
        <div className="text-right">
          <a className="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="#0">
            {learnMore}
            <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out mx-1">-&gt;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ========== زر السهم ========== */
type ArrowProps = { dir: 'prev' | 'next'; label: string }
function Arrow({ dir, label }: ArrowProps) {
  const isPrev = dir === 'prev'
  return (
    <button className={`carousel-${dir} relative z-20 w-12 h-12 flex items-center justify-center group`}>
      <span className="sr-only">{label}</span>
      {isPrev ? (
        <svg className="w-4 h-4 fill-slate-500 group-hover:fill-blue-500 transition" viewBox="0 0 16 16">
          <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 fill-slate-500 group-hover:fill-blue-500 transition" viewBox="0 0 16 16">
          <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
        </svg>
      )}
    </button>
  )
}
