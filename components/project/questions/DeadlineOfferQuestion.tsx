'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import {
  readStoredSelectedMatchIds,
  submitProjectProposal,
} from '@/components/project/projectProposalSubmit'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { projectWizardStepIds } from '../projectWizardFlow'
import InlineDateCalendar from './InlineDateCalendar'
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

function normalizeProjectType(value: string | null): string | null {
  if (!value) return null
  if (value === 'urgent' || value === 'urgent_request') return 'urgent_request'
  return value
}

function futureDateString(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)

  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function defaultOfferExpiryDate(projectType: string | null): string {
  return normalizeProjectType(projectType) === 'urgent_request'
    ? futureDateString(1)
    : futureDateString(7)
}

export default function DeadlineOfferQuestion({
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
  const [selectedMatchesCount, setSelectedMatchesCount] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const storageKey = projectWizardStorage.deadlineOfferKey(locale)
  const today = todayString()
  const tomorrow = futureDateString(1)
  const isUrgentProject = normalizeProjectType(projectType) === 'urgent_request'
  const isPastDate = dateValue !== '' && dateValue < today
  const isAfterUrgentMaxDate =
    isUrgentProject && dateValue !== '' && dateValue > tomorrow

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      const storedProjectType = window.sessionStorage.getItem(
        projectWizardStorage.projectTypeKey(locale)
      )
      setProjectType(storedProjectType)
      const stored = window.sessionStorage.getItem(storageKey)
      setDateValue(stored || defaultOfferExpiryDate(storedProjectType))
      setSelectedMatchesCount(readStoredSelectedMatchIds(locale).length)
    } catch {
      // ignore
    }
  }, [locale, storageKey])

  const submitProposal = async () => {
    setSubmitting(true)
    setError(null)

    try {
      await submitProjectProposal(locale)
      router.push(nav.hrefFor(projectWizardStepIds.projectSubmissionSuccess))
    } catch (err) {
      const message =
        err instanceof Error && err.message === 'no_matches'
          ? isRTL
            ? 'يرجى اختيار خبير واحد على الأقل قبل إرسال الطلب.'
            : 'Please select at least one matched insighter before submitting.'
          : err instanceof Error && err.message === 'no_match_request_uuid'
            ? isRTL
              ? 'تعذر العثور على بيانات المطابقة الخاصة بالإرسال. أعد تحميل نتائج المطابقة ثم حاول مرة أخرى.'
              : 'The proposal match identifier is missing. Reload the match results and try again.'
          : getProjectApiErrorMessage(
              err,
              isRTL ? 'تعذر إرسال الطلب.' : 'Failed to submit project proposal.'
            )

      setSelectedMatchesCount(readStoredSelectedMatchIds(locale).length)
      setError(
        message
      )
    } finally {
      setSubmitting(false)
    }
  }

  const onContinue = async () => {
    if (submitting || isPastDate || isAfterUrgentMaxDate) return

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

    await submitProposal()
  }

  const onSkip = async () => {
    if (submitting) return

    try {
      window.sessionStorage.setItem(storageKey, '')
    } catch {
      // ignore
    }

    await submitProposal()
  }

  const validationError = isPastDate
    ? isRTL
      ? 'لا يمكن أن يكون التاريخ في الماضي.'
      : 'Date cannot be in the past.'
    : isAfterUrgentMaxDate
      ? isRTL
        ? 'يجب أن تنتهي صلاحية عرض الطلب العاجل خلال 24 ساعة.'
        : 'Urgent request offer must expire within 24 hours.'
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
              #deadline-offer-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="deadline-offer-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {isRTL
              ? 'متى تنتهي صلاحية هذا العرض؟'
              : 'When should this offer expire?'}
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl">
            {isRTL
              ? 'إذا لم يتم التعاقد قبل هذا التاريخ، سيتم إزالة العرض تلقائيًا.'
              : 'If no contract is made by this date, the offer will be automatically removed.'}
          </p>
          {selectedMatchesCount > 0 ? (
            <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-2 text-sm font-semibold text-sky-800 shadow-sm">
              <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#1C7CBB] px-2 text-xs font-bold text-white">
                {selectedMatchesCount}
              </span>
              <span className="min-w-0">
                {isRTL
                  ? 'من الخبراء/الجهات المختارة سيتم إرسالهم مع هذا العرض'
                  : `selected match${selectedMatchesCount === 1 ? '' : 'es'} will be submitted with this offer`}
              </span>
            </div>
          ) : null}
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
            <InlineDateCalendar
              value={dateValue}
              min={today}
              max={isUrgentProject ? tomorrow : undefined}
              onChange={(date) => {
                setDateValue(date)
                setError(null)
              }}
              locale={locale}
              label={isRTL ? 'تاريخ انتهاء العرض' : 'Offer expiry date'}
            />
            {visibleError ? (
              <div className="mt-3 text-sm text-rose-700">{visibleError}</div>
            ) : null}
          </div>
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
                disabled={submitting || isPastDate || isAfterUrgentMaxDate}
                className={`btn-sm px-6 py-2 rounded-full ${!submitting && !isPastDate && !isAfterUrgentMaxDate
                    ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                    : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                  }`}
              >
                {submitting
                  ? isRTL
                    ? 'جاري الإرسال...'
                    : 'Submitting...'
                  : isRTL
                    ? 'إرسال الطلب'
                    : 'Submit proposal'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
