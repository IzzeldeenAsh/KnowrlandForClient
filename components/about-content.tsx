import Image from 'next/image'
import Particles from './particles'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function AboutContent() {
  const t = useTranslations('aboutUsPage');

  return (
    <section className="relative pt-20 border-bottom-[1px] border-slate-800 border">
      {/* Radial gradient */}
      <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
        <div className="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-50"></div>
      </div>

      {/* Particles animation */}
      <Particles className="absolute inset-0 h-96 -z-10" quantity={8} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">{t("mainTitle")}</h2>
            <p className="text-lg text-slate-400">{t("mainSubTitle")}</p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="text-slate-400 space-y-6 text-lg">
              <p>
              {t("firstParagraph")}
              </p>
              <p>
              {t("firstParagraphPartTwo")}
              </p>
              
              <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4">{t("ourVision")}</h3>
              <p>
              {t("ourVisionPart1")} <strong className="text-slate-50 font-medium">{t("ourVisionPart2")}</strong>{t("ourVisionPart3")}
              </p>

              <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4">{t("whatOffer")}</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 me-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">{t("whatOffer1")}</strong> {t("whatOffer1P")}
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 me-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">{t("whatOffer2")}</strong>{t("whatOffer2P")}
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 me-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">{t("whatOffer3")}</strong>{t("whatOffer3P")}
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 me-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">{t("whatOffer4")}</strong>{t("whatOffer4P")}
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 me-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">{t("whatOffer5")}</strong>{t("whatOffer5P")}
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 me-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">{t("whatOffer6")}</strong>{t("whatOffer6P")}
                  </div>
                </li>
              </ul>
              
              {/* Who Can Benefit section */}
              <div className="mt-10">
                <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4 pb-3">{t("benefitKnoldg")}</h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                    <div>
                      <strong className="text-slate-50 font-medium">{t("benefitKnoldg1")}</strong>{t("benefitKnoldgp1")}
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                    <div>
                      <strong className="text-slate-50 font-medium">{t("benefitKnoldg2")}</strong>{t("benefitKnoldgp2")}
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0 "></div>
                    <div>
                      <strong className="text-slate-50 font-medium">{t("benefitKnoldg3")}</strong>{t("benefitKnoldgp3")}
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 me-3 shrink-0"></div>
                    <div>
                      <strong className="text-slate-50 font-medium">{t("benefitKnoldg4")}</strong>{t("benefitKnoldgp4")}
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Our Parent Company section */}
              {/* <div className="mt-10 pt-2">
                <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pb-3">{t("parentCompanyTitle")}</h3>
                <p className="text-slate-400">
                {t("parentCompanyParagraph")}
                </p>
              </div>
               */}
             
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
