'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import { readServiceComponentPayloadValue } from '@/components/project/serviceComponentsPayload'
import { syncProjectProperties } from '@/components/project/projectPropertiesSync'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

type DeliverableStagePayload = {
  final_version?: {
    date?: string
  }
}

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function todayString(): string {
  return toLocalIsoDate(new Date())
}

function addDaysString(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toLocalIsoDate(date)
}

function normalizeProjectType(value: string | null): string | null {
  if (!value) return null
  if (value === 'urgent' || value === 'urgent_request') return 'urgent_request'
  return value
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
  const [finalDraftDate, setFinalDraftDate] = useState('')
  const [showUrgentWarning, setShowUrgentWarning] = useState(false)
  const [urgentAcknowledged, setUrgentAcknowledged] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const storageKey = projectWizardStorage.deadlineKey(locale)
  const today = todayString()
  const tomorrow = addDaysString(1)
  const minimumDeadline = finalDraftDate || today
  const isUrgentProject = normalizeProjectType(projectType) === 'urgent_request'
  const isBeforeMinimumDate = dateValue !== '' && dateValue < minimumDeadline
  const isAfterUrgentMaxDate =
    isUrgentProject && dateValue !== '' && dateValue > tomorrow
  const isUrgentDeadline = dateValue === tomorrow && dateValue >= minimumDeadline

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

      const deliverableStage =
        readServiceComponentPayloadValue<DeliverableStagePayload>(
          locale,
          'deliverable-stage'
        )
      setFinalDraftDate(String(deliverableStage?.final_version?.date || ''))
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

  const submitDeadline = async () => {
    try {
      window.sessionStorage.setItem(storageKey, dateValue)
    } catch {
      // ignore
    }

    await finishSync()
  }

  const onContinue = async () => {
    if (submitting || isBeforeMinimumDate || isAfterUrgentMaxDate) return

    if (!dateValue) {
      setError(
        isRTL
          ? 'يرجى اختيار الموعد النهائي لتسليم المشروع.'
          : 'Please select the project delivery deadline.'
      )
      return
    }

    if (isUrgentDeadline && !urgentAcknowledged) {
      setShowUrgentWarning(true)
      return
    }

    await submitDeadline()
  }

  const validationError = !dateValue
    ? null
    : isBeforeMinimumDate
      ? finalDraftDate
        ? isRTL
          ? 'يجب أن يكون موعد تسليم المشروع في نفس يوم النسخة النهائية أو بعدها.'
          : 'Project deadline must be the same day as the final draft or after it.'
        : isRTL
          ? 'لا يمكن أن يكون التاريخ في الماضي.'
          : 'Date cannot be in the past.'
      : isAfterUrgentMaxDate
        ? isRTL
          ? 'يجب أن يكون موعد الطلب العاجل خلال 24 ساعة.'
          : 'Urgent request deadline must be within 24 hours.'
      : null
  const visibleError = validationError || error
  const canContinue =
    Boolean(dateValue) &&
    !isBeforeMinimumDate &&
    !isAfterUrgentMaxDate &&
    !submitting

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
              min={minimumDeadline}
              max={isUrgentProject ? tomorrow : undefined}
              value={dateValue}
              onChange={(e) => {
                setDateValue(e.target.value)
                setError(null)
                setUrgentAcknowledged(false)
              }}
              className="mt-3 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {finalDraftDate ? (
              <p className="mt-2 text-xs font-semibold text-slate-500">
                {isRTL
                  ? `يجب أن يكون في ${finalDraftDate} أو بعده.`
                  : `Must be on or after ${finalDraftDate}.`}
              </p>
            ) : null}
          </div>

          {visibleError ? (
            <div className="mt-4 text-sm text-rose-700">{visibleError}</div>
          ) : null}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={() => void onContinue()}
              disabled={!canContinue}
              className={`btn-sm px-6 py-2 rounded-full ${canContinue
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                }`}
            >
              {submitting
                ? isRTL
                  ? 'جاري الحفظ...'
                  : 'Saving...'
                : nav.continueLabel}
            </button>
          </div>
        </div>
      </div>

      {showUrgentWarning ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white p-5 text-start shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              {isRTL ? 'طلب عاجل' : 'Urgent project request'}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {isRTL
                ? 'اختيار موعد قريب جدًا سيجعل طلبك عاجلًا، وقد يؤثر على عدد الخبراء المقترحين المتاحين. هل تريد المتابعة؟'
                : 'Choosing such a close deadline will make this an urgent project request, which may affect the number of suggested available insighters. Do you want to continue?'}
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUrgentWarning(false)}
                className="btn-sm rounded-full border border-slate-200 bg-white px-5 py-2 text-slate-700 hover:bg-slate-50"
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setUrgentAcknowledged(true)
                  setShowUrgentWarning(false)
                  void submitDeadline()
                }}
                className="btn-sm rounded-full bg-[#1C7CBB] px-5 py-2 text-white hover:bg-opacity-90"
              >
                {isRTL ? 'نعم، متابعة' : 'Yes, continue'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
