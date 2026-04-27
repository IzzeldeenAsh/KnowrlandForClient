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
  const isPastDate = dateValue !== '' && dateValue < today

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
            <p className="mt-2 text-sm text-slate-500">
              {isRTL
                ? `سيتم إرسال ${selectedMatchesCount} من الخبراء/الجهات المختارة مع هذا العرض.`
                : `${selectedMatchesCount} selected match${selectedMatchesCount === 1 ? '' : 'es'} will be submitted with this offer.`}
            </p>
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
            <label
              htmlFor="deadline-offer-input"
              className="text-sm text-slate-700"
            >
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-800">
                {isRTL ? 'تاريخ انتهاء العرض' : 'Offer expiry date'}
              </span>
            </label>
            <input
              id="deadline-offer-input"
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
