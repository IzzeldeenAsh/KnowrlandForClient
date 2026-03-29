'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  IconFileText,
  IconMapPin,
  IconPresentation,
  IconUsers,
} from '@tabler/icons-react'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import type { WizardLocale } from '@/components/project/wizardStorage'
import { projectWizardStorage } from '@/components/project/wizardStorage'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import {
  readServiceComponentPayloadValue,
  updateServiceComponentPayload,
} from '@/components/project/serviceComponentsPayload'
import { syncServiceComponents } from '@/components/project/serviceComponentsSync'
import {
  getReportTypeOptions,
  normalizeReportTypes,
} from './deliverableReportTypes'

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

function todayIsoDate(): string {
  try {
    return new Date().toISOString().slice(0, 10)
  } catch {
    return ''
  }
}

function defaultDraft(): DeliverableStageDraft {
  return {
    date: todayIsoDate(),
    reportTypes: ['pdf'],
    deliverableWay: 'on_platform',
    physicalWorkshopAddress: '',
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

function isDraftValid(draft: DeliverableStageDraft): boolean {
  if (!draft.date) return false
  if (draft.reportTypes.length === 0) return false
  if (draft.deliverableWay === 'physical_workshop') {
    if (!draft.physicalWorkshopAddress.trim()) return false
  }

  return true
}

function Section({
  locale,
  stage,
  title,
  value,
  onChange,
}: {
  locale: WizardLocale
  stage: 'first_draft' | 'final_version'
  title: string
  value: DeliverableStageDraft
  onChange: (next: DeliverableStageDraft) => void
}) {
  const isRTL = locale === 'ar'
  const headerTone =
    stage === 'first_draft'
      ? {
          bg: 'bg-sky-50/80',
          ring: 'ring-sky-200/70',
          icon: 'text-sky-700',
        }
      : {
          bg: 'bg-violet-50/80',
          ring: 'ring-violet-200/70',
          icon: 'text-violet-700',
        }

  const HeaderIcon = stage === 'first_draft' ? IconPresentation : IconFileText

  const optionCardClass = (selected: boolean) =>
    `rounded-2xl border px-4 py-3 transition-colors ${
      selected
        ? 'border-slate-200/80 bg-white/80 shadow-sm'
        : 'border-white/35 bg-white/55 hover:bg-white/70'
    }`

  const selectWay = (way: DeliverableWay) =>
    onChange({
      ...value,
      deliverableWay: way,
      physicalWorkshopAddress:
        way === 'physical_workshop' ? value.physicalWorkshopAddress : '',
    })

  const reportSummaryClass = 'flex w-full items-center justify-start gap-3 text-start'
  const optionButtonClass = 'flex w-full items-center justify-start gap-3 text-start'
  const optionTextClass = 'text-start'

  const iconBadgeBase =
    'inline-flex h-10 w-10 items-center justify-center rounded-full ring-1'

  const reportTypeOptions = getReportTypeOptions(locale)

  return (
    <div className="rounded-[10px] border border-white/30 bg-white/45 backdrop-blur-md shadow-sm px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`${iconBadgeBase} ${headerTone.bg} ${headerTone.ring} ${headerTone.icon}`}
            aria-hidden="true"
          >
            <HeaderIcon className="h-5 w-5" stroke={1.6} />
          </span>
          <div className="text-lg font-bold text-slate-900">{title}</div>
        </div>

        <label className="block w-full sm:w-auto">
          <div
            className="text-xs font-bold uppercase tracking-wide text-slate-600 text-start"
          >
            {isRTL ? 'التاريخ' : 'Date'}
          </div>
          <input
            type="date"
            value={value.date}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
            className="mt-2 w-full sm:w-[220px] rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>

      <div className="mt-5 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
          {isRTL ? 'أنواع التقرير' : 'Report types'}
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 shadow-sm">
          <div className={reportSummaryClass}>
            <span
              className={`${iconBadgeBase} bg-sky-50 ring-sky-200/60 text-sky-700`}
              aria-hidden="true"
            >
              <IconFileText className="h-5 w-5" stroke={1.6} />
            </span>
            <div className={optionTextClass}>
              <div className="text-sm font-semibold text-slate-900">
                {isRTL ? 'تقرير' : 'Report'}
              </div>
              <div className="text-xs font-medium text-slate-500">
                {isRTL
                  ? 'اختر الصيغ المطلوبة.'
                  : ' Select the required formats.'}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {reportTypeOptions.map((reportType) => {
              const checked = value.reportTypes.includes(reportType.value)
              return (
                <button
                  key={reportType.value}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      reportTypes: checked
                        ? value.reportTypes.filter((item) => item !== reportType.value)
                        : [...value.reportTypes, reportType.value],
                    })
                  }
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    checked
                      ? 'border-blue-300 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'
                  }`}
                >
                  {reportType.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="pt-1 text-xs font-bold uppercase tracking-wide text-slate-600">
          {isRTL ? 'طريقة التسليم' : 'Deliverable way'}
        </div>

        <div className="space-y-2">
          <div className={optionCardClass(value.deliverableWay === 'on_platform')}>
            <button
              type="button"
              onClick={() => selectWay('on_platform')}
              className={optionButtonClass}
            >
              <span
                className={`${iconBadgeBase} bg-sky-50 ring-sky-200/60 text-sky-700`}
                aria-hidden="true"
              >
                <IconFileText className="h-5 w-5" stroke={1.6} />
              </span>
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                  value.deliverableWay === 'on_platform'
                    ? 'border-blue-600'
                    : 'border-slate-300'
                } bg-white/80`}
                aria-hidden="true"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    value.deliverableWay === 'on_platform'
                      ? 'bg-blue-600'
                      : 'bg-transparent'
                  }`}
                />
              </span>
              <div className={optionTextClass}>
                <div className="text-sm font-semibold text-slate-900">
                  {isRTL ? 'على المنصة' : 'On Platform'}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  {isRTL ? 'تسليم التقرير فقط عبر المنصة.' : 'Report only.'}
                </div>
              </div>
            </button>
          </div>

          <div className={optionCardClass(value.deliverableWay === 'session')}>
            <button
              type="button"
              onClick={() => selectWay('session')}
              className={optionButtonClass}
            >
              <span
                className={`${iconBadgeBase} bg-violet-50 ring-violet-200/60 text-violet-700`}
                aria-hidden="true"
              >
                <IconUsers className="h-5 w-5" stroke={1.6} />
              </span>
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                  value.deliverableWay === 'session'
                    ? 'border-blue-600'
                    : 'border-slate-300'
                } bg-white/80`}
                aria-hidden="true"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    value.deliverableWay === 'session'
                      ? 'bg-blue-600'
                      : 'bg-transparent'
                  }`}
                />
              </span>
              <div className={optionTextClass}>
                <div className="text-sm font-semibold text-slate-900">
                  {isRTL ? 'جلسة' : 'Session'}
                </div>
              </div>
            </button>
          </div>

          <div className={optionCardClass(value.deliverableWay === 'physical_workshop')}>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => selectWay('physical_workshop')}
                className={optionButtonClass}
              >
                <span
                  className={`${iconBadgeBase} bg-amber-50 ring-amber-200/70 text-amber-800`}
                  aria-hidden="true"
                >
                  <IconMapPin className="h-5 w-5" stroke={1.6} />
                </span>
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    value.deliverableWay === 'physical_workshop'
                      ? 'border-blue-600'
                      : 'border-slate-300'
                  } bg-white/80`}
                  aria-hidden="true"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      value.deliverableWay === 'physical_workshop'
                        ? 'bg-blue-600'
                        : 'bg-transparent'
                    }`}
                  />
                </span>
                <div className={optionTextClass}>
                  <div className="text-sm font-semibold text-slate-900">
                    {isRTL ? 'ورشة عمل حضورية' : 'Physical workshop'}
                  </div>
                </div>
              </button>

              {value.deliverableWay === 'physical_workshop' ? (
                <label className="block">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-600 text-start">
                    {isRTL ? 'العنوان' : 'Address'}
                  </div>
                  <input
                    value={value.physicalWorkshopAddress}
                    onChange={(e) =>
                      onChange({ ...value, physicalWorkshopAddress: e.target.value })
                    }
                    placeholder={isRTL ? 'مثال: عمّان' : 'e.g. Amman'}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 text-start"
                  />
                </label>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DeliverableStageQuestion({ locale }: { locale: WizardLocale }) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const nav = useProjectWizardNavigation(locale)

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useProjectStepErrorToast(error, locale)

  const [firstDraft, setFirstDraft] = useState<DeliverableStageDraft>(() =>
    defaultDraft()
  )
  const [finalVersion, setFinalVersion] = useState<DeliverableStageDraft>(() =>
    defaultDraft()
  )

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )

      const saved = readServiceComponentPayloadValue<DeliverableStagePayload>(
        locale,
        'deliverable-stage'
      )

      if (saved?.first_draft) {
        setFirstDraft((prev) => payloadToDraft(saved.first_draft, prev))
      }

      if (saved?.final_version) {
        setFinalVersion((prev) => payloadToDraft(saved.final_version, prev))
      }
    } catch {
      // ignore
    }
  }, [locale])

  const canContinue = useMemo(() => {
    return isDraftValid(firstDraft) && isDraftValid(finalVersion) && !submitting
  }, [firstDraft, finalVersion, submitting])

  const onContinue = async () => {
    if (!canContinue) return
    setError(null)

    const payload: DeliverableStagePayload = {
      first_draft: draftToPayload(firstDraft),
      final_version: draftToPayload(finalVersion),
    }

    updateServiceComponentPayload(locale, 'deliverable-stage', payload)

    const leavingComponents = nav.nextStepId === 'project-status'
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

  const title = isRTL ? 'مرحلة المخرجات' : 'Deliverable stage'
  const subtitle = isRTL
    ? 'حدد التاريخ وصيغ التقرير وطريقة التسليم للمسودة الأولى والنسخة النهائية.'
    : 'Set the date, report formats, and deliverable way for the first draft and final version.'

  return (
    <div className="w-full max-w-6xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
      />

      <div
        className={`mt-2 text-start transition-all duration-700 ${
          entered
            ? 'opacity-100 translate-x-0'
            : isRTL
              ? 'opacity-0 translate-x-4'
              : 'opacity-0 -translate-x-4'
        }`}
      >
        {isEnglish ? (
          <style>{`
            #deliverable-stage-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="deliverable-stage-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
          {subtitle}
        </p>
      </div>

      {error ? (
        <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start pb-[100px] md:pb-0">
        <Section
          locale={locale}
          stage="first_draft"
          title={isRTL ? 'المسودة الأولى' : 'First draft'}
          value={firstDraft}
          onChange={setFirstDraft}
        />
        <Section
          locale={locale}
          stage="final_version"
          title={isRTL ? 'النسخة النهائية' : 'Final version'}
          value={finalVersion}
          onChange={setFinalVersion}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 sm:static border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="mt-2 md:mt-8 flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue}
              className={`btn-sm px-6 py-2 rounded-full ${
                canContinue
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
              }`}
            >
              {submitting ? (isRTL ? 'جاري الحفظ…' : 'Saving…') : isRTL ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
