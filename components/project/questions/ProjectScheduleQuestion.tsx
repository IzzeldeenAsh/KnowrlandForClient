'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconInfoCircle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import {
  dayLabel,
  durationLabel,
  latestDeliverableDay,
  readDeliverables,
  type ProjectDeliverable,
} from '@/components/project/projectDeliverables'
import { syncProjectPropertiesIfReady } from '@/components/project/projectPropertiesSync'
import {
  URGENT_MAX_DURATION_DAYS,
  addDaysToIsoDate,
  diffIsoDays,
  formatIsoDate,
  isUrgentProjectType,
  readProjectSchedule,
  todayIsoDate,
  writeProjectSchedule,
  type ProjectSchedule,
} from '@/components/project/projectSchedule'
import type { StepEditBase } from '@/components/project/edit/stepEditAdapter'
import { latestSavedSessionDeliverableDay } from '@/components/project/projectServiceSessions'
import { readServiceComponentSlugs } from '@/components/project/projectWizardFlow'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import InlineDateCalendar from './InlineDateCalendar'
import UrgentDateNotice from './UrgentDateNotice'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

const DEFAULT_LEAD_DAYS = 7

/**
 * Agreement edit: the schedule can only move forward. The start never goes before
 * the agreed start (or today) and the duration never drops below the agreed one.
 */
export type ProjectScheduleEdit = StepEditBase & {
  value: ProjectSchedule
  original: ProjectSchedule
  minStartDate: string
  /** Latest deliverable day across all services. */
  latestDeliverableDay: number
  onSave: (schedule: ProjectSchedule) => void
}

// Duration is stored in days; weeks and months only change how it is shown and typed.
type DurationUnit = 'days' | 'weeks' | 'months'
const UNIT_DAYS: Record<DurationUnit, number> = { days: 1, weeks: 7, months: 30 }
const UNITS: DurationUnit[] = ['days', 'weeks', 'months']

function unitButtonLabel(locale: WizardLocale, unit: DurationUnit) {
  if (locale === 'ar') return { days: 'أيام', weeks: 'أسابيع', months: 'أشهر' }[unit]
  return { days: 'Days', weeks: 'Weeks', months: 'Months' }[unit]
}

function durationUnit(locale: WizardLocale, unit: DurationUnit, value: number) {
  if (locale === 'ar') {
    const forms = {
      days: ['يوم', 'أيام', 'يومًا'],
      weeks: ['أسبوع', 'أسابيع', 'أسبوعًا'],
      months: ['شهر', 'أشهر', 'شهرًا'],
    }[unit]
    if (value === 1) return forms[0]
    return Number.isInteger(value) && value > 10 ? forms[2] : forms[1]
  }
  const singular = { days: 'Day', weeks: 'Week', months: 'Month' }[unit]
  return value === 1 ? singular : `${singular}s`
}

/** Days shown in the chosen unit, to one decimal place. */
function durationInUnit(days: number, unit: DurationUnit) {
  return Math.round((days / UNIT_DAYS[unit]) * 10) / 10
}

export default function ProjectScheduleQuestion({ locale, edit }: { locale: WizardLocale; edit?: ProjectScheduleEdit }) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [ready, setReady] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [deliverables, setDeliverables] = useState<ProjectDeliverable[]>([])
  const [startDate, setStartDate] = useState('')
  const [durationDays, setDurationDays] = useState(30)
  const [durationDraft, setDurationDraft] = useState<string | null>(null)
  const [unit, setUnit] = useState<DurationUnit>('days')
  const [showUrgentWarning, setShowUrgentWarning] = useState(false)
  const [urgentAcknowledged, setUrgentAcknowledged] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Set when an in-range close day before the minimum duration is clicked.
  const [closeDayLocked, setCloseDayLocked] = useState(false)

  useProjectStepErrorToast(error, locale)

  const today = todayIsoDate()
  const isUrgent = !edit && isUrgentProjectType(projectType)
  const hasDeliverables =
    !edit && readServiceComponentSlugs(locale).includes('deliverables-plan') && deliverables.length > 0
  // Other services' deliverables (specific-insighter projects) must fit in the duration too.
  const [otherServicesLatestDay, setOtherServicesLatestDay] = useState(0)
  const minDuration = edit
    ? Math.max(edit.original.durationDays, edit.latestDeliverableDay)
    : Math.max(hasDeliverables ? latestDeliverableDay(deliverables) : 0, otherServicesLatestDay)
  const maxDuration = isUrgent ? URGENT_MAX_DURATION_DAYS : Number.MAX_SAFE_INTEGER
  // A project lasts at least a day, so the close date is never the start date.
  const minCloseDays = Math.min(maxDuration, Math.max(minDuration, 1))
  const plannedCloseDate = startDate ? addDaysToIsoDate(startDate, durationDays) : ''
  const durationValue = durationInUnit(durationDays, unit)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (edit) {
      setProjectType(edit.projectType)
      setStartDate(edit.value.plannedStartDate)
      setDurationDays(edit.value.durationDays)
      setReady(true)
      return
    }
    let storedProjectType: string | null = null
    try {
      storedProjectType = window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
    } catch {
      // ignore
    }
    const urgent = isUrgentProjectType(storedProjectType)
    const storedDeliverables = readDeliverables(locale)
    const otherLatest = latestSavedSessionDeliverableDay(locale)
    const latest = Math.max(latestDeliverableDay(storedDeliverables), otherLatest)
    const stored = readProjectSchedule(locale)
    const todayValue = todayIsoDate()

    const initialStart = urgent
      ? todayValue
      : stored && stored.plannedStartDate >= todayValue
        ? stored.plannedStartDate
        : addDaysToIsoDate(todayValue, DEFAULT_LEAD_DAYS)
    // At least one day: older drafts could save a same-day close.
    const initialDuration = urgent
      ? Math.min(URGENT_MAX_DURATION_DAYS, Math.max(stored?.durationDays ?? 1, latest, 1))
      : Math.max(stored?.durationDays ?? Math.max(latest, 30), latest, 1)

    setProjectType(storedProjectType)
    setOtherServicesLatestDay(otherLatest)
    setDeliverables(storedDeliverables)
    setStartDate(initialStart)
    setDurationDays(initialDuration)
    setReady(true)
    // The edit adapter seeds the step once; later renders keep the local edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const updateDuration = (value: number) => {
    const next = Math.min(maxDuration, Math.max(minCloseDays, Math.round(value) || 0))
    setDurationDays(next)
    setCloseDayLocked(false)
    setUrgentAcknowledged(false)
    setError(null)
  }

  // Typed values below the minimum stay a draft until blur, so "45" can be typed past a minimum of 10.
  const commitDurationDraft = () => {
    if (durationDraft === null) return
    if (durationDraft) updateDuration(Number(durationDraft) * UNIT_DAYS[unit])
    setDurationDraft(null)
  }

  // Finishing by tomorrow turns a normal request into an urgent one.
  const becomesUrgent =
    !edit && !isUrgent && Boolean(plannedCloseDate) && plannedCloseDate <= addDaysToIsoDate(today, 1)
  const minStartDate = edit ? edit.minStartDate : today
  // Keeping the agreed start is always allowed, even once it has passed.
  const startInPast =
    Boolean(startDate) && startDate < minStartDate && startDate !== edit?.original.plannedStartDate
  const canContinue = ready && Boolean(startDate) && !startInPast && !submitting

  const submit = async () => {
    if (edit) {
      edit.onSave({ plannedStartDate: startDate, durationDays })
      return
    }
    writeProjectSchedule(locale, { plannedStartDate: startDate, durationDays })
    setSubmitting(true)
    setError(null)

    try {
      await syncProjectPropertiesIfReady(locale)
      if (nav.nextHref) {
        nav.goNext()
        return
      }
      router.push(`/${locale}/project`)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ جدول المشروع.' : 'Failed to save the project schedule.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  const onContinue = async () => {
    if (!canContinue) return
    if (becomesUrgent && !urgentAcknowledged) {
      setShowUrgentWarning(true)
      return
    }
    await submit()
  }

  // Fixed to a six-week month so both calendars match and never jump when paging months.
  const calendarClassName = 'mt-3 h-[334px]'
  const fullDateFormat: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  const shortDateFormat: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

  const fadeIn = entered
    ? 'opacity-100 translate-x-0'
    : isRTL
      ? 'opacity-0 translate-x-4'
      : 'opacity-0 -translate-x-4'

  return (
    <div className="w-full max-w-5xl mx-auto min-h-full flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex-1 pb-32">
        <ProjectSelectedTypeHeader
          locale={locale}
          entered={entered}
          projectTypeId={projectType}
          serviceLabelOverride={edit ? edit.serviceLabel : undefined}
        />

        <div className={`mt-2 text-start transition-all duration-700 ${fadeIn}`}>
          {isEnglish ? (
            <style>{`
              #project-schedule-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="project-schedule-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {isRTL ? 'متى يبدأ المشروع وكم يستغرق؟' : 'When should the project start, and how long will it take?'}
          </h2>
        </div>

        <div
          className={`mt-8 flex flex-col items-center gap-8 transition-all duration-700 lg:flex-row lg:items-start lg:justify-between lg:gap-6 ${fadeIn}`}
          style={{ transitionDelay: '160ms' }}
        >
          <div className="w-fit">
            <h3 className="text-sm font-bold text-slate-800">
              {isRTL ? 'تاريخ البدء المتوقع' : 'Expected start date'}
            </h3>
            <p className="mt-0.5 text-base font-bold text-slate-900">
              {startDate ? formatIsoDate(startDate, locale, fullDateFormat) : '—'}
            </p>
            <InlineDateCalendar
              className={calendarClassName}
              value={startDate}
              min={minStartDate}
              max={isUrgent ? today : undefined}
              rangeStart={startDate}
              rangeEnd={plannedCloseDate}
              onChange={(date) => {
                setStartDate(date)
                setCloseDayLocked(false)
                setUrgentAcknowledged(false)
                setError(null)
              }}
              locale={locale}
              label={isRTL ? 'تاريخ البدء المتوقع' : 'Expected start date'}
            />
            {isUrgent ? <UrgentDateNotice locale={locale} /> : null}
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-center gap-4 lg:self-stretch lg:justify-center lg:pt-12">
            <div className="relative flex w-full justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 hidden border-t-2 border-dashed border-slate-300 lg:block"
              />
              <label className="relative flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-[#1C7CBB] bg-white text-center shadow-[0_0_0_10px_rgba(28,124,187,0.08),0_8px_24px_rgba(15,23,42,0.08)]">
                <span className="sr-only">
                  {isRTL ? 'مدة المشروع' : 'Project duration'} ({unitButtonLabel(locale, unit)})
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={durationDraft ?? String(durationValue)}
                  onChange={(event) => {
                    const digits = event.target.value.replace(/\D/g, '').slice(0, 4)
                    setDurationDraft(digits)
                    const typedDays = Number(digits) * UNIT_DAYS[unit]
                    if (digits && typedDays >= minCloseDays && typedDays <= maxDuration) updateDuration(typedDays)
                  }}
                  onFocus={(event) => event.target.select()}
                  onBlur={commitDurationDraft}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') event.currentTarget.blur()
                  }}
                  disabled={isUrgent}
                  style={{ width: `${Math.max(2, (durationDraft ?? String(durationValue)).length) + 0.25}ch` }}
                  className="border-0 border-b-2 border-transparent bg-transparent p-0 text-center text-5xl font-semibold leading-none tracking-tight tabular-nums text-slate-900 transition-colors hover:border-slate-200 focus:border-[#1C7CBB] focus:outline-none focus:ring-0 disabled:hover:border-transparent"
                />
                <span className="mt-1.5 text-[15px] font-medium text-slate-500">
                  {durationUnit(locale, unit, durationValue)}
                </span>
                <span className="mt-1.5 text-xs font-semibold text-[#1C7CBB]">
                  {unit === 'days'
                    ? startDate
                      ? `${formatIsoDate(startDate, locale, shortDateFormat)} ${isRTL ? '←' : '→'} ${formatIsoDate(plannedCloseDate, locale, shortDateFormat)}`
                      : ''
                    : durationLabel(locale, durationDays)}
                </span>
              </label>
            </div>

            <div
              role="group"
              aria-label={isRTL ? 'عرض المدة بـ' : 'Show duration in'}
              className="inline-flex gap-0.5 rounded-full bg-slate-200/70 p-[3px]"
            >
              {UNITS.map((option) => {
                const active = option === unit
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setDurationDraft(null)
                      setUnit(option)
                    }}
                    className={`min-h-10 rounded-full px-[18px] text-sm transition-colors ${
                      active
                        ? 'bg-white font-bold text-[#1C7CBB] shadow-sm'
                        : 'font-medium text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {unitButtonLabel(locale, option)}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="w-fit">
            <h3 className="text-sm font-bold text-slate-800">
              {isRTL ? 'تاريخ الإغلاق المتوقع' : 'Expected close date'}
            </h3>
            <p className="mt-0.5 text-base font-bold text-slate-900">
              {plannedCloseDate ? formatIsoDate(plannedCloseDate, locale, fullDateFormat) : '—'}
            </p>
            <InlineDateCalendar
              className={calendarClassName}
              value={plannedCloseDate}
              min={startDate ? addDaysToIsoDate(startDate, minCloseDays) : undefined}
              max={startDate && isUrgent ? addDaysToIsoDate(startDate, maxDuration) : undefined}
              rangeStart={startDate}
              rangeEnd={plannedCloseDate}
              onChange={(date) => {
                setDurationDraft(null)
                updateDuration(diffIsoDays(startDate, date))
              }}
              onLockedDayClick={() => setCloseDayLocked(true)}
              locale={locale}
              label={isRTL ? 'تاريخ الإغلاق المتوقع' : 'Expected close date'}
            />
            {closeDayLocked && startDate ? (
              <p role="status" className="mt-2 w-0 min-w-full text-xs font-semibold leading-5 text-amber-700">
                {isRTL
                  ? `لا يمكن أن يكون تاريخ الإغلاق قبل ${formatIsoDate(addDaysToIsoDate(startDate, minCloseDays), locale, fullDateFormat)}، لأن المدة لا تقل عن ${durationLabel(locale, minCloseDays)}. اختر تاريخًا لاحقًا (انتقل للشهر التالي بالسهم) أو اكتب مدة أطول في الدائرة.`
                  : `The close date can't be before ${formatIsoDate(addDaysToIsoDate(startDate, minCloseDays), locale, fullDateFormat)}, since the duration can't be shorter than ${durationLabel(locale, minCloseDays)}. Pick a later date (use the arrow for the next month) or type a longer duration in the circle.`}
              </p>
            ) : null}
          </div>
        </div>

        {hasDeliverables && minDuration > 0 ? (
          <p className="mt-4 text-center text-xs font-semibold text-slate-500">
            {isRTL
              ? `يجب أن تشمل المدة آخر مخرج (${dayLabel(locale, minDuration)}).`
              : `The duration has to cover your last deliverable (${dayLabel(locale, minDuration)}).`}
          </p>
        ) : null}
        {edit ? (
          <p className="mt-4 text-center text-xs font-semibold text-slate-500">
            {isRTL
              ? `يمكن تأجيل تاريخ البدء وتمديد المدة فقط، ولا يمكن أن تقل عن ${durationLabel(locale, minDuration)}.`
              : `The start can only move later and the duration can only be extended; it cannot go below ${durationLabel(locale, minDuration)}.`}
          </p>
        ) : null}
        {startInPast ? (
          <p className="mt-3 text-center text-sm text-rose-700">
            {edit
              ? isRTL
                ? 'لا يمكن أن يكون تاريخ البدء قبل التاريخ المتفق عليه أو في الماضي.'
                : 'The start date cannot be earlier than the agreed start or in the past.'
              : isRTL
                ? 'لا يمكن أن يكون تاريخ البدء في الماضي.'
                : 'The start date cannot be in the past.'}
          </p>
        ) : null}
        {error ? <p className="mt-3 text-center text-sm text-rose-700">{error}</p> : null}

        <div
          className={`mt-6 flex items-start gap-3 rounded-[10px] border border-[#1C7CBB]/25 bg-[#1C7CBB]/[0.07] px-4 py-3 text-start transition-all duration-700 ${fadeIn}`}
          style={{ transitionDelay: '200ms' }}
        >
          <IconInfoCircle size={20} className="mt-0.5 shrink-0 text-[#1C7CBB]" aria-hidden="true" />
          <p className="text-sm font-medium leading-6 text-[#155E8E] sm:text-[15px]">
            {isRTL
              ? 'يُرجى العلم أن تاريخي البدء والإغلاق المتوقعين تقديريان. يبدأ المشروع رسميًا في تاريخ توقيع العقد، سواء كان قبل التاريخ المحدد أو بعده، ويُعدَّل تاريخ الإغلاق ومواعيد جميع المخرجات تبعًا لذلك مع الحفاظ على المدة المتفق عليها.'
              : 'Please note that the expected start and close dates are indicative. The project officially commences on the date the contract is signed, whether earlier or later than the date selected, and the close date and all deliverable dates will be adjusted accordingly, keeping the agreed duration.'}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto px-4 lg:px-0 w-full max-w-5xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={edit?.backHref ?? nav.backHref}
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
              {submitting ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : edit?.continueLabel ?? nav.continueLabel}
            </button>
          </div>
        </div>
      </div>

      {showUrgentWarning ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="schedule-urgent-title"
            className="w-full max-w-md rounded-2xl border border-white/60 bg-white p-5 text-start shadow-xl"
          >
            <h3 id="schedule-urgent-title" className="text-lg font-bold text-slate-900">
              {isRTL ? 'طلب عاجل' : 'Urgent project request'}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {isRTL
                ? 'إنهاء المشروع بهذه السرعة سيجعل طلبك عاجلًا، وقد يؤثر على عدد الخبراء المقترحين المتاحين. هل تريد المتابعة؟'
                : 'Finishing this soon will make this an urgent project request, which may affect the number of suggested available insighters. Do you want to continue?'}
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
                  void submit()
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
