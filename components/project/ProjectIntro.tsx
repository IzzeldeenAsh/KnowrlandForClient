'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { getAngularAppOrigin } from '@/lib/authRedirect'
import { publicBaseUrl } from '@/app/config'
import ProjectWizardShell from './ProjectWizardShell'
import { clearProjectWizardStorage } from './wizardStorage'

type ProjectIntroProps = {
  locale: string
}

export default function ProjectIntro({ locale }: ProjectIntroProps) {
  const isRTL = locale === 'ar'
  const { isLoggedIn, isLoading } = useAuth()


  useEffect(() => {
    clearProjectWizardStorage(locale)
  }, [locale])

  const copy = isRTL
    ? {
      title: 'ابدأ مشروعك ',
      eyebrow: 'اطلب خدمة مخصصة',
      line1: 'ابدأ مشروعك مع خبراء متخصصين',
      line2: 'لتمكين عملك من النجاح',
      cta: 'ابدأ',
    }
    : {
      title: 'Start a project',
      eyebrow: 'Request a Custom Service',
      line1: 'Start your project with subject matter experts',
      line2: 'that lead your business to success',
      cta: 'Start',
    }

  const returnUrl = encodeURIComponent(`${publicBaseUrl}/${locale}/project`)
  const loginUrl = `${getAngularAppOrigin()}/auth/login?returnUrl=${returnUrl}`
  const shouldShowLoginCta = !isLoading && !isLoggedIn
  const ctaHref = shouldShowLoginCta ? loginUrl : `/${locale}/project/wizard/project-type`
  const ctaLabel = shouldShowLoginCta ? 'Login to Start' : copy.cta

  return (
    <ProjectWizardShell align="center">
      <>
        {/* <div aria-hidden className="hidden md:block pointer-events-none absolute inset-x-0 -bottom-10 z-0">
          <div className="relative h-[720px] sm:h-[390px] lg:h-[430px]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="projectIntroCurve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#a5f3fc" stopOpacity="0.82" />
                  <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M0,235 C360,135 1080,135 1440,235 L1440,320 L0,320 Z"
                fill="url(#projectIntroCurve)"
              />
            </svg>


          </div>
        </div> */}

        {/* <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block">
          <div className="mx-auto w-full max-w-2xl px-8">
            <Image
              src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1775661658/Artboard_1_qjuru0.png"
              alt=""
              width={1602}
              height={718}
              priority
              sizes="(min-width: 1280px) 672px, calc(100vw - 64px)"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div> */}

        <div
          className="relative z-20 max-w-2xl pt-12 pb-[100px] text-center sm:pt-16 sm:pb-[300px] lg:pt-32 lg:pb-[360px]"
          dir={isRTL ? 'rtl' : 'ltr'}
          lang={isRTL ? 'ar' : 'en'}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent" style={{ lineHeight: 1.5 }}>
            {copy.title}
          </h1>

          <div className="mt-5 text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
            {copy.eyebrow}
          </div>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
            {copy.line1}
            <br />
            {copy.line2}
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href={ctaHref}
              className="btn text-white bg-[#1C7CBB] hover:bg-opacity-90 active:bg-opacity-100 px-7 py-3 rounded-full shadow-[0_18px_50px_rgba(28,124,187,0.35)]"
            >
              {ctaLabel}
            </Link>
          </div>
          {/* <div className="mt-10 flex items-center justify-center">
            <div

              className="btn text-white bg-[#1C7CBB] hover:bg-opacity-90 active:bg-opacity-100 px-7 py-3 rounded-full shadow-[0_18px_50px_rgba(28,124,187,0.35)]"
            >
              {locale == 'ar' ? 'قريبا' : 'Coming Soon'}
            </div>
          </div> */}
        </div>
      </>
    </ProjectWizardShell>
  )
}
