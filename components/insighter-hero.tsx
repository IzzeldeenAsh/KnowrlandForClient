import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom-blue.svg'
import LogoIcon from '@/public/images/SVG/Logo-icon-white.svg'
import { useTranslations } from 'next-intl'

export default function HeroInsighter() {
  const t = useTranslations('HeroInsighter')

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />
        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>
        <div className="pt-14 pb-16  md:pb-32" >
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center" >
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-5 leading-[1.2]" data-aos="fade-down">{t('title')}</h2>
            <p className="text-xl text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}