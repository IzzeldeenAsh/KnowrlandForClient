'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  IconCalendarDue,
  IconCloudUpload,
  IconDeviceDesktopUp,
  IconFileSpreadsheet,
  IconFileTextFilled,
  IconFileTypeDocx,
  IconFileTypePdf,
  IconMapPinFilled,
  IconPresentationFilled,
} from '@tabler/icons-react'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import {
  readServiceComponentPayloadValue,
  updateServiceComponentPayload,
} from '@/components/project/serviceComponentsPayload'
import { syncServiceComponents } from '@/components/project/serviceComponentsSync'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'
import {
  getReportTypeOptions,
  normalizeReportTypes,
} from './deliverableReportTypes'

type DeliverableStageKey = 'first_draft' | 'final_version'
type DeliverableStepKind = 'date' | 'report_type' | 'way'
type DeliverableWay = 'on_platform' | 'session' | 'physical_workshop'

type DeliverableStageDraft = {
  date: string
  reportTypes: string[]
  deliverableWay: DeliverableWay
  physicalWorkshopAddress: string
}

type DeliverableStageValue = {
  date: string
  report_type: string[]
  way: {
    on_platform: { selected: 0 | 1 }
    session: { selected: 0 | 1 }
    physical_workshop: { selected: 0 | 1; address: string }
  }
}

type DeliverableStagePayload = {
  first_draft: DeliverableStageValue
  final_version: DeliverableStageValue
}

type LegacyDeliverableStageValue = {
  date?: string
  type?: {
    report?: { type?: unknown; selected?: 0 | 1 }
    session?: { selected?: 0 | 1 }
    physical_workshop?: { selected?: 0 | 1; address?: string }
    online_workshop?: { selected?: 0 | 1 }
  }
}

type DraftsState = Record<DeliverableStageKey, DeliverableStageDraft>

type DeliverableStageQuestionProps = {
  locale: WizardLocale
  stage: DeliverableStageKey
  stepKind: DeliverableStepKind
}

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function todayIsoDate(): string {
  try {
    return toLocalIsoDate(new Date())
  } catch {
    return ''
  }
}

function addDaysIsoDate(days: number): string {
  try {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return toLocalIsoDate(date)
  } catch {
    return ''
  }
}

function addDaysToIsoDate(value: string, days: number): string {
  if (!value) return ''

  const [year, month, day] = value.split('-').map((part) => Number(part))
  if (!year || !month || !day) return ''

  try {
    const date = new Date(year, month - 1, day)
    date.setDate(date.getDate() + days)
    return toLocalIsoDate(date)
  } catch {
    return ''
  }
}

function normalizeProjectType(value: string | null): string | null {
  if (!value) return null
  if (value === 'urgent' || value === 'urgent_request') return 'urgent_request'
  return value
}

function isUrgentProjectType(value: string | null): boolean {
  return normalizeProjectType(value) === 'urgent_request'
}

function defaultDraft(date = addDaysIsoDate(1)): DeliverableStageDraft {
  return {
    date,
    reportTypes: ['pdf'],
    deliverableWay: 'on_platform',
    physicalWorkshopAddress: '',
  }
}

function defaultDrafts(projectType: string | null = null): DraftsState {
  const firstDraftDate = addDaysIsoDate(1)
  const finalVersionDate = isUrgentProjectType(projectType)
    ? firstDraftDate
    : addDaysToIsoDate(firstDraftDate, 7)

  return {
    first_draft: defaultDraft(firstDraftDate),
    final_version: defaultDraft(finalVersionDate),
  }
}

function draftToPayload(draft: DeliverableStageDraft): DeliverableStageValue {
  return {
    date: draft.date,
    report_type: draft.reportTypes,
    way: {
      on_platform: {
        selected: (draft.deliverableWay === 'on_platform' ? 1 : 0) as 0 | 1,
      },
      session: {
        selected: (draft.deliverableWay === 'session' ? 1 : 0) as 0 | 1,
      },
      physical_workshop: {
        selected: (draft.deliverableWay === 'physical_workshop' ? 1 : 0) as 0 | 1,
        address:
          draft.deliverableWay === 'physical_workshop'
            ? draft.physicalWorkshopAddress
            : '',
      },
    },
  }
}

function getLegacyWay(value: LegacyDeliverableStageValue | null | undefined): DeliverableWay {
  if (Number(value?.type?.physical_workshop?.selected ?? 0) > 0) {
    return 'physical_workshop'
  }

  if (Number(value?.type?.session?.selected ?? 0) > 0) {
    return 'session'
  }

  if (Number(value?.type?.online_workshop?.selected ?? 0) > 0) {
    return 'session'
  }

  return 'on_platform'
}

function payloadToDraft(
  value: DeliverableStageValue | LegacyDeliverableStageValue | null | undefined,
  fallback: DeliverableStageDraft
): DeliverableStageDraft {
  if (!value) return fallback

  const isNewShape = Array.isArray((value as DeliverableStageValue).report_type)

  if (isNewShape) {
    const nextValue = value as DeliverableStageValue
    const way =
      Number(nextValue.way?.physical_workshop?.selected ?? 0) > 0
        ? 'physical_workshop'
        : Number(nextValue.way?.session?.selected ?? 0) > 0
          ? 'session'
          : 'on_platform'

    return {
      ...fallback,
      date: nextValue.date || fallback.date,
      reportTypes: normalizeReportTypes(nextValue.report_type),
      deliverableWay: way,
      physicalWorkshopAddress: nextValue.way?.physical_workshop?.address || '',
    }
  }

  const legacyValue = value as LegacyDeliverableStageValue

  return {
    ...fallback,
    date: legacyValue.date || fallback.date,
    reportTypes: normalizeReportTypes(legacyValue.type?.report?.type),
    deliverableWay: getLegacyWay(legacyValue),
    physicalWorkshopAddress: legacyValue.type?.physical_workshop?.address || '',
  }
}

function isFutureDate(date: string): boolean {
  return Boolean(date) && date > todayIsoDate()
}

function isAfterDate(date: string, previousDate: string): boolean {
  return Boolean(date) && Boolean(previousDate) && date > previousDate
}

function isSameOrAfterDate(date: string, previousDate: string): boolean {
  return Boolean(date) && Boolean(previousDate) && date >= previousDate
}

function isStepValid(params: {
  stepKind: DeliverableStepKind
  stage: DeliverableStageKey
  drafts: DraftsState
  isUrgentProject: boolean
}): boolean {
  const { stepKind, stage, drafts, isUrgentProject } = params
  const draft = drafts[stage]

  if (stepKind === 'date') {
    if (isUrgentProject && draft.date > addDaysIsoDate(1)) return false
    if (stage === 'first_draft') return isFutureDate(draft.date)
    return (
      isFutureDate(draft.date) &&
      (isUrgentProject
        ? isSameOrAfterDate(draft.date, drafts.first_draft.date)
        : isAfterDate(draft.date, drafts.first_draft.date))
    )
  }

  if (stepKind === 'report_type') return draft.reportTypes.length > 0
  if (draft.deliverableWay !== 'physical_workshop') return true
  return Boolean(draft.physicalWorkshopAddress.trim())
}

function getDateValidationMessage(params: {
  isRTL: boolean
  stage: DeliverableStageKey
  drafts: DraftsState
  isUrgentProject: boolean
}): string | null {
  const { isRTL, stage, drafts, isUrgentProject } = params
  const draft = drafts[stage]

  if (isUrgentProject && draft.date > addDaysIsoDate(1)) {
    return isRTL
      ? 'يجب أن يكون تاريخ تسليم الطلب العاجل خلال 24 ساعة.'
      : 'Urgent request delivery date must be within 24 hours.'
  }

  if (stage === 'first_draft') {
    if (isFutureDate(draft.date)) return null
    return isRTL
      ? 'اختر تاريخاً مستقبلياً للمسودة الأولى.'
      : 'Choose a future date for the first draft.'
  }

  if (!isFutureDate(draft.date)) {
    return isRTL
      ? 'اختر تاريخاً مستقبلياً للنسخة النهائية.'
      : 'Choose a future date for the final version.'
  }

  const hasValidSequence = isUrgentProject
    ? isSameOrAfterDate(draft.date, drafts.first_draft.date)
    : isAfterDate(draft.date, drafts.first_draft.date)

  if (!hasValidSequence) {
    return isRTL
      ? isUrgentProject
        ? 'يجب أن يكون تاريخ النسخة النهائية في نفس يوم المسودة الأولى أو بعده.'
        : 'يجب أن يكون تاريخ النسخة النهائية بعد تاريخ المسودة الأولى.'
      : isUrgentProject
        ? 'Final version date must be the same day as the first draft or after it.'
        : 'Final version date must be after the first draft date.'
  }

  return null
}

function ReportTypeIcon({ value }: { value: string }) {
  if (value === 'pdf') return <IconFileTypePdf className="h-6 w-6" stroke={1.4} />
  if (value === 'docx') return <IconFileTypeDocx className="h-6 w-6" stroke={1.4} />
  if (value === 'xlsx') return <IconFileSpreadsheet className="h-6 w-6" stroke={1.4} />
  if (value === 'pptx') return <IconPresentationFilled className="h-6 w-6" />

  return <IconFileTextFilled className="h-6 w-6" />
}

function reportTypeTone(value: string): string {
  if (value === 'pdf') return 'bg-rose-50 ring-rose-200/70 text-rose-700'
  if (value === 'docx') return 'bg-blue-50 ring-blue-200/70 text-blue-700'
  if (value === 'xlsx') return 'bg-emerald-50 ring-emerald-200/70 text-emerald-700'
  if (value === 'pptx') return 'bg-orange-50 ring-orange-200/70 text-orange-700'

  return 'bg-slate-50 ring-slate-200/70 text-slate-700'
}

function getStepCopy(params: {
  isRTL: boolean
  stage: DeliverableStageKey
  stepKind: DeliverableStepKind
}) {
  const { isRTL, stage, stepKind } = params
  const stageLabel = isRTL
    ? stage === 'first_draft'
      ? 'المسودة الأولى'
      : 'النسخة النهائية'
    : stage === 'first_draft'
      ? 'first draft'
      : 'final version'

  if (stepKind === 'date') {
    return {
      title: isRTL
        ? `تاريخ ${stageLabel}`
        : `${stage === 'first_draft' ? 'First draft' : 'Final version'} date`,
      subtitle: isRTL
        ? stage === 'first_draft'
          ? 'حدد الموعد الذي تريد فيه استلام المسودة الأولى للمراجعة.'
          : 'حدد الموعد النهائي لتسليم النسخة المعتمدة بعد الملاحظات.'
        : stage === 'first_draft'
          ? 'Choose when the first draft should be ready for review.'
          : 'Choose when the final version should be delivered after revisions.',
    }
  }

  if (stepKind === 'report_type') {
    return {
      title: isRTL
        ? `نوع التقرير المطلوب (${stageLabel})`
        : `Type of report wanted (${stageLabel})`,
      subtitle: isRTL
        ? stage === 'first_draft'
          ? 'اختر صيغ الملفات التي تريد استخدامها لمراجعة المسودة الأولى.'
          : 'اختر صيغ الملفات المطلوبة للتسليم النهائي.'
        : stage === 'first_draft'
          ? 'Select the file formats you want to use for reviewing the first draft.'
          : 'Select the file formats required for the final handoff.',
    }
  }

  return {
    title: isRTL ? `طريقة تسليم ${stageLabel}` : `Deliverable way (${stageLabel})`,
    subtitle: isRTL
      ? stage === 'first_draft'
        ? 'اختر كيف تريد مشاركة المسودة الأولى ومناقشتها.'
        : 'اختر طريقة تسليم النسخة النهائية.'
      : stage === 'first_draft'
        ? 'Choose how the first draft should be shared and discussed.'
        : 'Choose how the final version should be delivered.',
  }
}

export default function DeliverableStageQuestion({
  locale,
  stage,
  stepKind,
}: DeliverableStageQuestionProps) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')
  const nav = useProjectWizardNavigation(locale)
  const copy = getStepCopy({ isRTL, stage, stepKind })

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<DraftsState>(() => defaultDrafts())
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useProjectStepErrorToast(error, locale)

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
      const isUrgentProject = isUrgentProjectType(storedProjectType)

      const saved = readServiceComponentPayloadValue<DeliverableStagePayload>(
        locale,
        'deliverable-stage'
      )

      setDrafts((prev) => {
        const firstDraft = payloadToDraft(saved?.first_draft, prev.first_draft)
        const fallbackFinalDraft = defaultDraft(
          isUrgentProject
            ? firstDraft.date
            : addDaysToIsoDate(firstDraft.date, 7)
        )

        return {
          first_draft: firstDraft,
          final_version: payloadToDraft(saved?.final_version, fallbackFinalDraft),
        }
      })
    } catch {
      // ignore
    }
  }, [locale])

  const currentDraft = drafts[stage]
  const isUrgentProject = isUrgentProjectType(projectType)
  const canContinue =
    isStepValid({ stepKind, stage, drafts, isUrgentProject }) && !submitting
  const dateValidationMessage =
    stepKind === 'date'
      ? getDateValidationMessage({ isRTL, stage, drafts, isUrgentProject })
      : null
  const reportTypeOptions = useMemo(() => getReportTypeOptions(locale), [locale])

  const updateCurrentDraft = (next: DeliverableStageDraft) => {
    setDrafts((prev) => {
      if (stage !== 'first_draft') return { ...prev, [stage]: next }

      const nextFinalDate =
        !prev.final_version.date || prev.final_version.date <= next.date
          ? isUrgentProject
            ? next.date
            : addDaysToIsoDate(next.date, 7)
          : prev.final_version.date

      return {
        ...prev,
        first_draft: next,
        final_version: {
          ...prev.final_version,
          date: nextFinalDate,
        },
      }
    })
  }

  const persistPayload = (nextDrafts: DraftsState) => {
    updateServiceComponentPayload(locale, 'deliverable-stage', {
      first_draft: draftToPayload(nextDrafts.first_draft),
      final_version: draftToPayload(nextDrafts.final_version),
    } satisfies DeliverableStagePayload)
  }

  const onContinue = async () => {
    if (!canContinue) return
    setError(null)
    persistPayload(drafts)

    const leavingComponents = nav.nextStepId === 'project-status' || nav.isReviewEditMode
    if (!leavingComponents) {
      nav.goNext()
      return
    }

    setSubmitting(true)
    try {
      await syncServiceComponents(locale)
      nav.goNext()
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL
            ? 'تعذر حفظ مكوّنات الخدمة.'
            : 'Failed to save service components.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  const selectWay = (deliverableWay: DeliverableWay) => {
    updateCurrentDraft({
      ...currentDraft,
      deliverableWay,
      physicalWorkshopAddress:
        deliverableWay === 'physical_workshop'
          ? currentDraft.physicalWorkshopAddress
          : '',
    })
  }

  const optionCardClass = (selected: boolean) =>
    `rounded-[10px] border px-4 py-3 transition-colors ${selected
      ? 'border-blue-300 bg-blue-50/80 shadow-sm'
      : 'border-white/35 bg-white/65 hover:bg-white/80'
    }`
  const iconBadgeBase =
    'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1'

  return (
    <div className="w-full max-w-5xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
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
            #deliverable-stage-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="deliverable-stage-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {copy.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
          {copy.subtitle}
        </p>
      </div>

      {error ? (
        <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
      ) : null}

      <div
        className={`mt-6 rounded-[10px] border border-white/30 bg-white/45 p-5 shadow-sm backdrop-blur-md sm:p-6 ${
          stepKind === 'report_type' ? 'pb-32 sm:pb-6' : ''
        }`}
      >
        {stepKind === 'date' ? (
          <label className="block max-w-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600 text-start">
              <IconCalendarDue className="h-4 w-4 text-sky-600" stroke={2.4} aria-hidden="true" />
              <span>{isRTL ? 'تاريخ التسليم' : 'Delivery date'}</span>
            </div>
            <input
              type="date"
              value={currentDraft.date}
              min={
                stage === 'first_draft'
                  ? addDaysIsoDate(1)
                  : isUrgentProject
                    ? drafts.first_draft.date || addDaysIsoDate(1)
                    : addDaysToIsoDate(drafts.first_draft.date, 1) || addDaysIsoDate(1)
              }
              max={isUrgentProject ? addDaysIsoDate(1) : undefined}
              onChange={(e) =>
                updateCurrentDraft({ ...currentDraft, date: e.target.value })
              }
              className="mt-2 w-full rounded-[10px] border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {dateValidationMessage ? (
              <p className="mt-2 text-xs font-semibold text-rose-600">
                {dateValidationMessage}
              </p>
            ) : null}
          </label>
        ) : null}

        {stepKind === 'report_type' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reportTypeOptions.map((reportType) => {
              const checked = currentDraft.reportTypes.includes(reportType.value)
              return (
                <button
                  key={reportType.value}
                  type="button"
                  aria-pressed={checked}
                  onClick={() =>
                    updateCurrentDraft({
                      ...currentDraft,
                      reportTypes: checked
                        ? currentDraft.reportTypes.filter((item) => item !== reportType.value)
                        : [...currentDraft.reportTypes, reportType.value],
                    })
                  }
                  className={`flex min-h-[88px] items-center gap-3 rounded-[10px] border px-4 py-3 text-start transition-colors ${checked
                    ? 'border-blue-300 bg-blue-50/80 text-blue-800 shadow-sm'
                    : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    tabIndex={-1}
                    className="h-5 w-5 shrink-0 rounded border-slate-300 text-[#1C7CBB] accent-[#1C7CBB]"
                    aria-hidden="true"
                  />
                  <span
                    className={`${iconBadgeBase} ${reportTypeTone(reportType.value)}`}
                    aria-hidden="true"
                  >
                    <ReportTypeIcon value={reportType.value} />
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {reportType.label}
                  </span>
                </button>
              )
            })}
          </div>
        ) : null}

        {stepKind === 'way' ? (
          <div className="space-y-3">
            <div className={optionCardClass(currentDraft.deliverableWay === 'on_platform')}>
              <button
                type="button"
                onClick={() => selectWay('on_platform')}
                className="flex w-full items-center justify-start gap-3 text-start"
              >
                <span
                  className={`${iconBadgeBase} bg-sky-50 ring-sky-200/60 text-sky-700`}
                  aria-hidden="true"
                >
                  <IconCloudUpload className="h-6 w-6" stroke={2.2} />
                </span>
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${currentDraft.deliverableWay === 'on_platform'
                    ? 'border-blue-600'
                    : 'border-slate-300'
                  } bg-white/80`}
                  aria-hidden="true"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${currentDraft.deliverableWay === 'on_platform'
                      ? 'bg-blue-600'
                      : 'bg-transparent'
                    }`}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {isRTL ? 'على المنصة' : 'On Platform'}
                  </span>
                  <span className="block text-xs font-medium text-slate-500">
                    {isRTL
                      ? 'يتم رفع الملفات ومشاركتها داخل المنصة.'
                      : 'Files are uploaded and shared inside the platform.'}
                  </span>
                </span>
              </button>
            </div>

            <div className={optionCardClass(currentDraft.deliverableWay === 'session')}>
              <button
                type="button"
                onClick={() => selectWay('session')}
                className="flex w-full items-center justify-start gap-3 text-start"
              >
                <span
                  className={`${iconBadgeBase} bg-violet-50 ring-violet-200/60 text-violet-700`}
                  aria-hidden="true"
                >
                  <IconDeviceDesktopUp className="h-6 w-6" stroke={2.2} />
                </span>
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${currentDraft.deliverableWay === 'session'
                    ? 'border-blue-600'
                    : 'border-slate-300'
                  } bg-white/80`}
                  aria-hidden="true"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${currentDraft.deliverableWay === 'session'
                      ? 'bg-blue-600'
                      : 'bg-transparent'
                    }`}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {isRTL ? 'جلسة' : 'Session'}
                  </span>
                  <span className="block text-xs font-medium text-slate-500">
                    {isRTL
                      ? 'تتم مراجعة المخرجات وتسليمها ضمن جلسة.'
                      : 'Deliverables are reviewed and handed over in a session.'}
                  </span>
                </span>
              </button>
            </div>

            <div className={optionCardClass(currentDraft.deliverableWay === 'physical_workshop')}>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => selectWay('physical_workshop')}
                  className="flex w-full items-center justify-start gap-3 text-start"
                >
                  <span
                    className={`${iconBadgeBase} bg-amber-50 ring-amber-200/70 text-amber-800`}
                    aria-hidden="true"
                  >
                    <IconMapPinFilled className="h-6 w-6" />
                  </span>
                  <span
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${currentDraft.deliverableWay === 'physical_workshop'
                      ? 'border-blue-600'
                      : 'border-slate-300'
                    } bg-white/80`}
                    aria-hidden="true"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${currentDraft.deliverableWay === 'physical_workshop'
                        ? 'bg-blue-600'
                        : 'bg-transparent'
                      }`}
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      {isRTL ? 'ورشة عمل حضورية' : 'Physical workshop'}
                    </span>
                    <span className="block text-xs font-medium text-slate-500">
                      {isRTL
                        ? 'يتم التسليم والمناقشة في موقع محدد.'
                        : 'Delivery and discussion happen at a specific location.'}
                    </span>
                  </span>
                </button>

                {currentDraft.deliverableWay === 'physical_workshop' ? (
                  <label className="block">
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-600 text-start">
                      {isRTL ? 'العنوان' : 'Address'}
                    </div>
                    <input
                      value={currentDraft.physicalWorkshopAddress}
                      onChange={(e) =>
                        updateCurrentDraft({
                          ...currentDraft,
                          physicalWorkshopAddress: e.target.value,
                        })
                      }
                      placeholder={isRTL ? 'مثال: عمّان' : 'e.g. Amman'}
                      className="mt-2 w-full rounded-[10px] border border-slate-200 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 text-start"
                    />
                  </label>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue}
              className={`btn-sm px-6 py-2 rounded-full ${canContinue
                ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                : 'text-slate-500 bg-slate-200 cursor-not-allowed'
              }`}
            >
              {submitting ? (isRTL ? 'جاري الحفظ…' : 'Saving…') : nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
