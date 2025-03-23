import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom-blue.svg'
import LogoIcon from '@/public/images/SVG/Logo-icon-white.svg'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-32 pb-16  md:pb-32" >

          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center" >
            <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-blue-500 before:blur-md">
                {/* <Link href='/' className="btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.blue.500),_theme(colors.blue.500))_padding-box,_linear-gradient(theme(colors.blue.500),_theme(colors.blue.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow">
                  <span className="relative inline-flex items-center">
                    {t('tagline')}
                  </span>
                </Link> */}
              </div>
            </div>
            <div className="flex justify-center mb-6" data-aos="fade-down" data-aos-delay="100">
              <Image src={LogoIcon} width={80} height={80} alt="Logo" priority />
            </div>
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-5 leading-[1.2]" data-aos="fade-down">{t('title')}</h2>
            <p className="text-lg text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              {t('description')}
            </p>
            <div className="max-w-3xl mx-auto w-full pb-4" data-aos="fade-down" data-aos-delay="300">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full px-6 py-4 text-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 border border-gray-300 rounded-md placeholder-gray-500 text-gray-800 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 shadow-lg transition duration-300"
                />
                <button className={`absolute ${t('direction') === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200/50 rounded-full transition duration-300`}>
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}