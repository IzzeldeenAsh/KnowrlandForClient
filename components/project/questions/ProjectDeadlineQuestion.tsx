'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import { syncProjectProperties } from '@/components/project/projectPropertiesSync'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

function todayString(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function ProjectDeadlineQuestion({
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
  const [projectType, setProjectType] = useState<string | null>(null)
  const [dateValue, setDateValue] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const storageKey = projectWizardStorage.deadlineKey(locale)
  const today = todayString()
  const isPastDate = dateValue !== '' && dateValue < today

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      const stored = window.sessionStorage.getItem(storageKey)
      if (stored) setDateValue(stored)
    } catch {
      // ignore
    }
  }, [locale, storageKey])

  const finishSync = async () => {
    setSubmitting(true)
    setError(null)

    try {
      await syncProjectProperties(locale)
      if (nav.nextHref) {
        nav.goNext()
        return
      }
      router.push(`/${locale}/project`)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  const onContinue = async () => {
    if (submitting || isPastDate) return

    if (!dateValue) {
      setError(
        isRTL
          ? 'يرجى اختيار تاريخ أو استخدام التخطي.'
          : 'Please select a date or use skip.'
      )
      return
    }

    try {
      window.sessionStorage.setItem(storageKey, dateValue)
    } catch {
      // ignore
    }

    await finishSync()
  }

  const onSkip = async () => {
    if (submitting) return

    try {
      window.sessionStorage.setItem(storageKey, '')
    } catch {
      // ignore
    }

    await finishSync()
  }

  const validationError = isPastDate
    ? isRTL
      ? 'لا يمكن أن يكون التاريخ في الماضي.'
      : 'Date cannot be in the past.'
    : null
  const visibleError = validationError || error

  return (
    <div
      className="w-full max-w-4xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 pb-32">
        <ProjectSelectedTypeHeader
          locale={locale}
          entered={entered}
          projectTypeId={projectType}
        />

        <div
          className={`mt-2 text-start transition-all duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
            }`}
        >
          {isEnglish ? (
            <style>{`
              #project-deadline-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="project-deadline-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {isRTL
              ? 'ما هو الموعد النهائي لتسليم المشروع؟'
              : 'What is the project delivery deadline?'}
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl">
            {isRTL
              ? 'هذا هو الموعد النهائي الذي يجب على الخبير تسليم كامل العمل فيه.'
              : 'This is the deadline by which the insighter must submit all project work.'}
          </p>
        </div>

        <div
          className={`mt-8 transition-all duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
            }`}
          style={{ transitionDelay: '160ms' }}
        >
          <div className="max-w-sm">
            <label
              htmlFor="project-deadline-input"
              className="text-sm text-slate-700"
            >
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-800">
                {isRTL ? 'الموعد النهائي للتسليم' : 'Delivery deadline'}
              </span>
            </label>
            <input
              id="project-deadline-input"
              type="date"
              min={today}
              value={dateValue}
              onChange={(e) => {
                setDateValue(e.target.value)
                setError(null)
              }}
              className="mt-3 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {visibleError ? (
            <div className="mt-4 text-sm text-rose-700">{visibleError}</div>
          ) : null}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:static border-t rounded-lg border-slate-200/70 bg-white/80 backdrop-blur-md lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className=" lg:mt-8 flex  items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void onSkip()}
                disabled={submitting}
                className="btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRTL ? 'تخطي' : 'Skip'}
              </button>

              <button
                type="button"
                onClick={() => void onContinue()}
                disabled={submitting || isPastDate}
                className={`btn-sm px-6 py-2 rounded-full ${!submitting && !isPastDate
                    ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                    : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                  }`}
              >
                {submitting
                  ? isRTL
                    ? 'جاري الحفظ...'
                    : 'Saving...'
                  : isRTL
                    ? 'متابعة'
                    : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
