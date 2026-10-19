'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import {
  readStoredSelectedMatchIds,
  submitProjectProposal,
} from '@/components/project/projectProposalSubmit'
import { isSpecifiedInsighterProject } from '@/components/project/specifiedInsighterProject'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { projectWizardStepIds } from '../projectWizardFlow'
import InlineDateCalendar from './InlineDateCalendar'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { addDaysToIsoDate, readProjectSchedule } from '../projectSchedule'
import type { StepEditBase } from '../edit/stepEditAdapter'

/**
 * Agreement edit: the deadline can only be extended (never before the current one or
 * today) and stays inside the project dates. Keeping the current date is always valid.
 */
export type DeadlineOfferEdit = StepEditBase & {
  value: string
  original: string
  minDate: string
  /** Planned close date of the edited schedule, or '' when unknown. */
  projectEnd: string
  onSave: (date: string) => void
}

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

// ISO dates (YYYY-MM-DD) compare correctly as strings.
function clampIsoDate(value: string, min: string, max: string): string {
  if (min && value < min) return min
  if (max && value > max) return max
  return value
}

function formatIsoDate(value: string, locale: WizardLocale): string {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Date(year, month - 1, day).toLocaleDateString(
    locale === 'ar' ? 'ar-u-nu-latn' : 'en-GB',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
}

export default function DeadlineOfferQuestion({
  locale,
  edit,
}: {
  locale: WizardLocale
  edit?: DeadlineOfferEdit
}) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [dateValue, setDateValue] = useState('')
  const [projectStart, setProjectStart] = useState('')
  const [projectEnd, setProjectEnd] = useState('')
  const [selectedMatchesCount, setSelectedMatchesCount] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const storageKey = projectWizardStorage.deadlineOfferKey(locale)
  const today = todayString()
  const tomorrow = futureDateString(1)
  const isUrgentProject = !edit && normalizeProjectType(projectType) === 'urgent_request'
  // The offer must expire within the project window, and never in the past.
  const minDate = edit ? edit.minDate : projectStart > today ? projectStart : today
  const maxDate =
    [projectEnd, isUrgentProject ? tomorrow : ''].filter(Boolean).sort()[0] || ''
  const hasSelectableDates = !maxDate || minDate <= maxDate
  const keepsCurrentDeadline = !!edit && dateValue === edit.original
  const isPastDate = dateValue !== '' && dateValue < (edit ? edit.minDate : today)
  const isAfterUrgentMaxDate =
    isUrgentProject && dateValue !== '' && dateValue > tomorrow
  const isOutsideProjectDates =
    dateValue !== '' &&
    ((!edit && projectStart !== '' && dateValue < projectStart) ||
      (projectEnd !== '' && dateValue > projectEnd))
  const isInvalidDate =
    !keepsCurrentDeadline &&
    (!hasSelectableDates || isPastDate || isAfterUrgentMaxDate || isOutsideProjectDates)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (edit) {
      setProjectType(edit.projectType)
      setProjectEnd(edit.projectEnd)
      setDateValue(edit.value)
      return
    }
    try {
      const storedProjectType = window.sessionStorage.getItem(
        projectWizardStorage.projectTypeKey(locale)
      )
      setProjectType(storedProjectType)
      const schedule = readProjectSchedule(locale)
      const start = schedule?.plannedStartDate || ''
      const end = schedule ? addDaysToIsoDate(schedule.plannedStartDate, schedule.durationDays) : ''
      setProjectStart(start)
      setProjectEnd(end)

      const now = todayString()
      const urgent = normalizeProjectType(storedProjectType) === 'urgent_request'
      const min = start > now ? start : now
      const max =
        [end, urgent ? futureDateString(1) : ''].filter(Boolean).sort()[0] || ''
      // A stored or default date outside the project window is moved into it.
      const stored = window.sessionStorage.getItem(storageKey)
      setDateValue(
        !max || min <= max
          ? clampIsoDate(stored || defaultOfferExpiryDate(storedProjectType), min, max)
          : stored || ''
      )
      setSelectedMatchesCount(
        isSpecifiedInsighterProject(locale) ? 1 : readStoredSelectedMatchIds(locale).length
      )
    } catch {
      // ignore
    }
    // The edit adapter seeds the step once; later renders keep the local edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      setSelectedMatchesCount(
        isSpecifiedInsighterProject(locale) ? 1 : readStoredSelectedMatchIds(locale).length
      )
      setError(
        message
      )
    } finally {
      setSubmitting(false)
    }
  }

  const onContinue = async () => {
    if (submitting || isInvalidDate) return

    if (!dateValue) {
      setError(
        isRTL
          ? 'يرجى اختيار تاريخ.'
          : 'Please select a date.'
      )
      return
    }

    if (edit) {
      edit.onSave(dateValue)
      return
    }

    try {
      window.sessionStorage.setItem(storageKey, dateValue)
    } catch {
      // ignore
    }

    await submitProposal()
  }

  const validationError = !hasSelectableDates
    ? isRTL
      ? 'لا توجد تواريخ متاحة ضمن مدة المشروع. عدّل تاريخ البدء أو الموعد النهائي.'
      : 'No dates are available within the project dates. Update the start date or delivery deadline.'
    : isPastDate
      ? edit
        ? isRTL
          ? 'لا يمكن أن يكون الموعد قبل الموعد الحالي أو في الماضي.'
          : 'The deadline cannot be earlier than the current one or in the past.'
        : isRTL
          ? 'لا يمكن أن يكون التاريخ في الماضي.'
          : 'Date cannot be in the past.'
      : isAfterUrgentMaxDate
        ? isRTL
          ? 'يجب أن تنتهي صلاحية عرض الطلب العاجل خلال 24 ساعة.'
          : 'Urgent request offer must expire within 24 hours.'
        : isOutsideProjectDates
          ? isRTL
            ? 'اختر تاريخًا ضمن مدة المشروع.'
            : 'Choose a date within the project dates.'
          : null
  const visibleError = (keepsCurrentDeadline ? null : validationError) || error

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
          serviceLabelOverride={edit ? edit.serviceLabel : undefined}
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
          {edit ? (
            <p className="mt-2 text-sm font-semibold text-slate-600 max-w-2xl">
              {isRTL
                ? 'يمكن تمديد الموعد فقط، وينطبق على جميع الخبراء المدعوين لهذا الطلب.'
                : 'The deadline can only be extended, and it applies to every Insighter invited to this request.'}
            </p>
          ) : selectedMatchesCount > 0 ? (
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
              min={minDate}
              max={maxDate || undefined}
              onChange={(date) => {
                setDateValue(date)
                setError(null)
              }}
              locale={locale}
              label={isRTL ? 'تاريخ انتهاء العرض' : 'Offer expiry date'}
            />
            {projectStart || projectEnd ? (
              <p className="mt-3 text-xs font-medium text-slate-500">
                {projectStart && projectEnd
                  ? isRTL
                    ? `مدة المشروع: ${formatIsoDate(projectStart, locale)} – ${formatIsoDate(projectEnd, locale)}`
                    : `Project dates: ${formatIsoDate(projectStart, locale)} – ${formatIsoDate(projectEnd, locale)}`
                  : projectEnd
                    ? isRTL
                      ? `الموعد النهائي للمشروع: ${formatIsoDate(projectEnd, locale)}`
                      : `Project deadline: ${formatIsoDate(projectEnd, locale)}`
                    : isRTL
                      ? `بداية المشروع: ${formatIsoDate(projectStart, locale)}`
                      : `Project start: ${formatIsoDate(projectStart, locale)}`}
              </p>
            ) : null}
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
              href={edit?.backHref ?? nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void onContinue()}
                disabled={submitting || isInvalidDate}
                className={`btn-sm px-6 py-2 rounded-full ${!submitting && !isInvalidDate
                    ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                    : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                  }`}
              >
                {submitting
                  ? isRTL
                    ? 'جاري الإرسال...'
                    : 'Submitting...'
                  : edit
                    ? edit.continueLabel
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
