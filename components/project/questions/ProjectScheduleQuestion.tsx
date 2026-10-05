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
  formatIsoDate,
  isUrgentProjectType,
  readProjectSchedule,
  todayIsoDate,
  writeProjectSchedule,
} from '@/components/project/projectSchedule'
import { latestSavedSessionDeliverableDay } from '@/components/project/projectServiceSessions'
import { readServiceComponentSlugs } from '@/components/project/projectWizardFlow'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import InlineDateCalendar from './InlineDateCalendar'
import TimelineSlider from './TimelineSlider'
import UrgentDateNotice from './UrgentDateNotice'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

const DEFAULT_LEAD_DAYS = 7
const MIN_RANGE_DAYS = 60

function rangeFor(durationDays: number) {
  return Math.max(MIN_RANGE_DAYS, Math.ceil((durationDays + 30) / 30) * 30)
}

function durationUnit(locale: WizardLocale, days: number) {
  if (locale === 'ar') return days >= 3 && days <= 10 ? 'أيام' : days > 10 ? 'يومًا' : 'يوم'
  return days === 1 ? 'Day' : 'Days'
}

export default function ProjectScheduleQuestion({ locale }: { locale: WizardLocale }) {
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
  const [rangeMax, setRangeMax] = useState(MIN_RANGE_DAYS)
  const [showUrgentWarning, setShowUrgentWarning] = useState(false)
  const [urgentAcknowledged, setUrgentAcknowledged] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const today = todayIsoDate()
  const isUrgent = isUrgentProjectType(projectType)
  const hasDeliverables =
    readServiceComponentSlugs(locale).includes('deliverables-plan') && deliverables.length > 0
  // Other services' deliverables (specific-insighter projects) must fit in the duration too.
  const [otherServicesLatestDay, setOtherServicesLatestDay] = useState(0)
  const minDuration = Math.max(
    hasDeliverables ? latestDeliverableDay(deliverables) : 0,
    otherServicesLatestDay
  )
  const maxDuration = isUrgent ? URGENT_MAX_DURATION_DAYS : Number.MAX_SAFE_INTEGER
  const plannedCloseDate = startDate ? addDaysToIsoDate(startDate, durationDays) : ''

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    let storedProjectType: string | null = null
    try {
      storedProjectType = window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
    } catch {
      // ignore
    }
    const urgent = isUrgentProjectType(storedProjectType)
    const storedDeliverables = readDeliverables(locale, storedProjectType)
    const otherLatest = latestSavedSessionDeliverableDay(locale)
    const latest = Math.max(latestDeliverableDay(storedDeliverables), otherLatest)
    const stored = readProjectSchedule(locale)
    const todayValue = todayIsoDate()

    const initialStart = urgent
      ? todayValue
      : stored && stored.plannedStartDate >= todayValue
        ? stored.plannedStartDate
        : addDaysToIsoDate(todayValue, DEFAULT_LEAD_DAYS)
    const initialDuration = urgent
      ? Math.min(URGENT_MAX_DURATION_DAYS, Math.max(stored?.durationDays ?? 1, latest))
      : Math.max(stored?.durationDays ?? Math.max(latest, 30), latest)

    setProjectType(storedProjectType)
    setOtherServicesLatestDay(otherLatest)
    setDeliverables(storedDeliverables)
    setStartDate(initialStart)
    setDurationDays(initialDuration)
    setRangeMax(urgent ? URGENT_MAX_DURATION_DAYS : rangeFor(initialDuration))
    setReady(true)
  }, [locale])

  // The range only grows outside a drag, so the handle never jumps under the pointer.
  const updateDuration = (value: number, growRange = true) => {
    const next = Math.min(maxDuration, Math.max(minDuration, Math.round(value) || 0))
    setDurationDays(next)
    setUrgentAcknowledged(false)
    setError(null)
    if (growRange && !isUrgent && next + 14 > rangeMax) setRangeMax(rangeFor(next))
  }

  // Typed values below the minimum stay a draft until blur, so "45" can be typed past a minimum of 10.
  const commitDurationDraft = () => {
    if (durationDraft === null) return
    updateDuration(durationDraft ? Number(durationDraft) : durationDays)
    setDurationDraft(null)
  }

  // Finishing by tomorrow turns a normal request into an urgent one.
  const becomesUrgent =
    !isUrgent && Boolean(plannedCloseDate) && plannedCloseDate <= addDaysToIsoDate(today, 1)
  const startInPast = Boolean(startDate) && startDate < today
  const canContinue = ready && Boolean(startDate) && !startInPast && !submitting

  const submit = async () => {
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

  const fadeIn = entered
    ? 'opacity-100 translate-x-0'
    : isRTL
      ? 'opacity-0 translate-x-4'
      : 'opacity-0 -translate-x-4'

  return (
    <div className="w-full max-w-5xl mx-auto min-h-full flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex-1 pb-32">
        <ProjectSelectedTypeHeader locale={locale} entered={entered} projectTypeId={projectType} />

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
          className={`mt-8 grid gap-6 transition-all duration-700 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] ${fadeIn}`}
          style={{ transitionDelay: '160ms' }}
        >
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {isRTL ? 'تاريخ البدء المتوقع' : 'Expected start date'}
            </h3>
            <InlineDateCalendar
              className="mt-3"
              value={startDate}
              min={today}
              max={isUrgent ? today : undefined}
              onChange={(date) => {
                setStartDate(date)
                setUrgentAcknowledged(false)
                setError(null)
              }}
              locale={locale}
              label={isRTL ? 'تاريخ البدء المتوقع' : 'Expected start date'}
            />
            {isUrgent ? <UrgentDateNotice locale={locale} /> : null}
          </div>

          <div className="flex min-w-0 flex-col">
            <h3 className="text-sm font-bold text-slate-800">
              {isRTL ? 'مدة المشروع' : 'Project duration'}
            </h3>
            <label className="mt-1 inline-flex items-baseline gap-2 self-start lg:mb-4">
              <span className="sr-only">{isRTL ? 'المدة بالأيام' : 'Duration in days'}</span>
              <input
                type="text"
                inputMode="numeric"
                value={durationDraft ?? String(durationDays)}
                onChange={(event) => {
                  const digits = event.target.value.replace(/\D/g, '').slice(0, 4)
                  setDurationDraft(digits)
                  const typed = Number(digits)
                  if (digits && typed >= minDuration && typed <= maxDuration) updateDuration(typed, false)
                }}
                onFocus={(event) => event.target.select()}
                onBlur={commitDurationDraft}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') event.currentTarget.blur()
                }}
                style={{ width: `${Math.max(2, (durationDraft ?? String(durationDays)).length) + 0.25}ch` }}
                className="border-0 border-b-2 border-transparent bg-transparent p-0 text-6xl font-semibold leading-none tracking-tight tabular-nums text-slate-900 transition-colors hover:border-slate-200 focus:border-[#1C7CBB] focus:outline-none focus:ring-0"
              />
              <span className="text-2xl font-medium text-slate-500">{durationUnit(locale, durationDays)}</span>
            </label>

            <div className="mt-4 rounded-[10px] border border-slate-200 bg-white/80 px-2 sm:px-4 lg:mt-auto">
              <TimelineSlider
                min={0}
                max={rangeMax}
                isRTL={isRTL}
                fillTo={durationDays}
                tickEvery={isUrgent ? undefined : rangeMax > 120 ? 30 : 7}
                startLabel={startDate ? formatIsoDate(startDate, locale) : ''}
                endLabel={startDate ? formatIsoDate(addDaysToIsoDate(startDate, rangeMax), locale) : ''}
                onChange={(_, value) => updateDuration(value, false)}
                onCommit={(_, value) => updateDuration(value)}
                points={[
                  ...(hasDeliverables
                    ? deliverables.map((item, index) => ({
                        id: `deliverable-${index}`,
                        value: item.period_days,
                        label: item.title.length > 16 ? `${item.title.slice(0, 15)}…` : item.title,
                        ariaLabel: item.title,
                        valueText: dayLabel(locale, item.period_days),
                        tone: 'muted' as const,
                        draggable: false,
                      }))
                    : []),
                  {
                    id: 'close',
                    value: durationDays,
                    min: minDuration,
                    label: plannedCloseDate
                      ? `${isRTL ? 'الإغلاق' : 'Close'} · ${formatIsoDate(plannedCloseDate, locale, { month: 'short', day: 'numeric' })}`
                      : isRTL
                        ? 'الإغلاق'
                        : 'Close',
                    ariaLabel: isRTL ? 'مدة المشروع' : 'Project duration',
                    valueText: durationLabel(locale, durationDays),
                    tone: 'primary' as const,
                    draggable: !isUrgent || URGENT_MAX_DURATION_DAYS > minDuration,
                  },
                ]}
              />
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  term: isRTL ? 'البدء المتوقع' : 'Expected start',
                  value: startDate ? formatIsoDate(startDate, locale) : '—',
                },
                {
                  term: isRTL ? 'الإغلاق المتوقع' : 'Expected close',
                  value: plannedCloseDate ? formatIsoDate(plannedCloseDate, locale) : '—',
                },
              ].map((item) => (
                <div key={item.term} className="rounded-[10px] border border-slate-200 bg-white/85 px-3 py-2.5">
                  <dt className="text-xs font-semibold text-slate-500">{item.term}</dt>
                  <dd className="mt-0.5 text-sm font-bold text-slate-900">{item.value}</dd>
                </div>
              ))}
            </dl>

            {hasDeliverables && minDuration > 0 ? (
              <p className="mt-3 text-xs font-semibold text-slate-500">
                {isRTL
                  ? `يجب أن تشمل المدة آخر مخرج (${dayLabel(locale, minDuration)}).`
                  : `The duration has to cover your last deliverable (${dayLabel(locale, minDuration)}).`}
              </p>
            ) : null}
            {startInPast ? (
              <p className="mt-3 text-sm text-rose-700">
                {isRTL ? 'لا يمكن أن يكون تاريخ البدء في الماضي.' : 'The start date cannot be in the past.'}
              </p>
            ) : null}
            {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
          </div>
        </div>

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
              {submitting ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : nav.continueLabel}
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
