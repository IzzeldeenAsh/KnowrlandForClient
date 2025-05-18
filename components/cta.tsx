'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function Cta() {
  const t = useTranslations('Cta')

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="relative px-8 py-12 md:py-20 rounded-[3rem] overflow-hidden">
        <div className="inline-flex md:px-20  me-auto  font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                {t('topTag')} <br />
                {t('topTag2')}
                  </div>
          {/* Radial gradient */}
          <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
            <div className="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-70" />
            <div className="absolute w-1/4 h-1/4 translate-z-0 bg-blue-400 rounded-full blur-[40px]" />
          </div>
          
          {/* Blurred shape */}
          <div className="absolute bottom-0 translate-y-1/2 left-0 blur-2xl opacity-50 pointer-events-none -z-10" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path fill="url(#bs5-a)" fillRule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
            </svg>
          </div>
          {/* Content */}
       
          <div className="max-w-3xl mx-auto text-center">
    
            <div>
              {/*
                Original inline text (4 words): "The security first platform"
                Replacement (4 words): "Lorem ipsum dolor sit"
              */}
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                {t('tagline')}
              </div>
            </div>
            {/*
              Original h2 text (5 words): "Take control of your business"
              Replacement (5 words): "Lorem ipsum dolor sit amet"
            */}
            <h2 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4 leading-[1.5]">
              {t('title')}
            </h2>
            {/*
              Original paragraph (24 words):
              "All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
              
              Replacement (24 words):
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad minim lorem ipsum."
            */}
            <p className="text-lg text-slate-400 mb-8">
              {t('description')}
            </p>
            {/*
              Original link text (2 words): "Get Started"
              Replacement (2 words): "Lorem Ipsum"
            */}
            <div>
              <Link className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group" href={`/${useParams().locale}/insighter`}>
                {t('button')} <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out mx-1">-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
