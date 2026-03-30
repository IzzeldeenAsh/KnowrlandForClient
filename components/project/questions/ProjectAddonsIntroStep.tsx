'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { syncProjectAddons } from '../projectAddonsSync'
import { getProjectApiErrorMessage } from '../projectApiError'
import { readProjectAddonsState, updateProjectAddonsState } from '../projectAddonsState'
import { projectWizardStepIds } from '../projectWizardFlow'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import type { WizardLocale } from '../wizardStorage'

export default function ProjectAddonsIntroStep({
  locale,
}: {
  locale: WizardLocale
}) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [skipping, setSkipping] = useState(false)

  useProjectStepErrorToast(error, locale)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 40)
    return () => window.clearTimeout(timer)
  }, [])

  const stacked = isRTL
    ? ['تبقى القليل']
    : ['We Are Almost', 'There']
  const body = isRTL
    ? 'تبقّى خيار إضافي واحد فقط قبل عرض ملخص المشروع النهائي: هل تريد اجتماع انطلاقة يضبط التوقعات، النطاق، وآلية التنفيذ منذ البداية؟'
    : 'There is one optional finishing touch before your final project brief: a kickoff meeting to align expectations, scope, and momentum from day one.'
  const illustrationUrl =
    'https://res.cloudinary.com/dsiku9ipv/image/upload/v1774335409/Artboard_4_2x_ek6pka.png'

  const goToKickoffQuestion = () => {
    setError(null)
    updateProjectAddonsState(locale, (current) => ({
      ...current,
      kickoffMeeting: {
        ...current.kickoffMeeting,
        skipped: false,
      },
    }))
    router.push(nav.hrefFor(projectWizardStepIds.kickoffMeeting))
  }

  const skipKickoffQuestion = async () => {
    if (skipping) return

    setSkipping(true)
    setError(null)

    const previousKickoffMeeting = readProjectAddonsState(locale).kickoffMeeting

    updateProjectAddonsState(locale, (current) => ({
      ...current,
      kickoffMeeting: {
        enabled: null,
        skipped: true,
      },
    }))

    try {
      await syncProjectAddons({ locale })
      router.push(nav.hrefFor(projectWizardStepIds.projectReview))
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ إعدادات الإضافات.' : 'Failed to save addon settings.'
        )
      )
      updateProjectAddonsState(locale, (current) => ({
        ...current,
        kickoffMeeting: previousKickoffMeeting,
      }))
    } finally {
      setSkipping(false)
    }
  }

  return (
    <div
      className="w-full max-w-6xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 flex items-center justify-center pb-28">
        <div
         
        >
          <div className="mx-auto max-w-4xl text-center">

            {isEnglish ? (
              <style>{`
                #addons-intro-headline,
                #addons-intro-headline * {
                  font-family: "IBM Plex Serif", serif !important;
                }
              `}</style>
            ) : null}

            <div
              id="addons-intro-headline"
              className="
              mt-8 
              space-y-1 
              ps-4
              md:ps-0
              text-[clamp(2rem,5vw,4.2rem)] 
              md:text-[clamp(3rem,9vw,4.2rem)] 
              font-black 
              text-start
              leading-[0.9] 
              tracking-[-0.08em] 
              text-slate-950"
            >
              {stacked.map((line) => (
                <div key={line}>{line}</div>
              ))}
             
            </div>
    <div
              className={`mx-auto mt-10 w-full max-w-3xl transition-all duration-700 ease-out ${
                entered
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="overflow-hidden ">
                <img
                  src={illustrationUrl}
                  alt={
                    isRTL
                      ? 'رسم توضيحي لاجتماع انطلاقة المشروع'
                      : 'Kickoff meeting illustration'
                  }
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-auto w-[400px] max-w-2xl object-contain"
                />
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              {body}
            </p>

         
            {error ? (
              <div className="mx-auto mt-6 max-w-3xl text-sm font-semibold text-rose-700">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void skipKickoffQuestion()}
                disabled={skipping}
                className={`btn-sm rounded-full border px-6 py-2 ${
                  skipping
                    ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {skipping
                  ? isRTL
                    ? 'جاري التخطي...'
                    : 'Skipping...'
                  : isRTL
                    ? 'تخطي'
                    : 'Skip'}
              </button>

              <button
                type="button"
                onClick={goToKickoffQuestion}
                disabled={skipping}
                className={`btn-sm rounded-full px-6 py-2 ${
                  skipping
                    ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                    : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'
                }`}
              >
                {isRTL ? 'عرض الإضافة' : 'Show the add-on'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
