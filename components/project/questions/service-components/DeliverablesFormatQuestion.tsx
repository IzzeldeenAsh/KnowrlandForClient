'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { IconCloudUpload, IconDeviceDesktopUp, IconMapPinFilled } from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import {
  dayLabel,
  readDeliverables,
  writeDeliverables,
  type DeliverableWay,
  type ProjectDeliverable,
} from '@/components/project/projectDeliverables'
import { isLeavingComponentSteps } from '@/components/project/projectWizardFlow'
import { syncServiceComponents } from '@/components/project/serviceComponentsSync'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'
import { getReportTypeOptions } from './deliverableReportTypes'

const WAY_OPTIONS: Array<{
  value: DeliverableWay
  Icon: typeof IconCloudUpload
  iconClass: string
  label: { en: string; ar: string }
}> = [
  {
    value: 'on_platform',
    Icon: IconCloudUpload,
    iconClass: 'bg-sky-50 text-sky-700 ring-sky-200/60',
    label: { en: 'On platform', ar: 'على المنصة' },
  },
  {
    value: 'session',
    Icon: IconDeviceDesktopUp,
    iconClass: 'bg-violet-50 text-violet-700 ring-violet-200/60',
    label: { en: 'Session', ar: 'جلسة' },
  },
  {
    value: 'physical_workshop',
    Icon: IconMapPinFilled,
    iconClass: 'bg-amber-50 text-amber-800 ring-amber-200/70',
    label: { en: 'Physical workshop', ar: 'ورشة حضورية' },
  },
]

function isDeliverableComplete(item: ProjectDeliverable) {
  if (item.report_type.length === 0) return false
  if (item.way.selected === 'physical_workshop') return Boolean(item.way.address?.trim())
  return true
}

export default function DeliverablesFormatQuestion({ locale }: { locale: WizardLocale }) {
  const isRTL = locale === 'ar'
  const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en')
  const nav = useProjectWizardNavigation(locale)
  const reportTypeOptions = useMemo(() => getReportTypeOptions(locale), [locale])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [deliverables, setDeliverables] = useState<ProjectDeliverable[]>([])
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useProjectStepErrorToast(error, locale)

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
    setProjectType(storedProjectType)
    setDeliverables(readDeliverables(locale, storedProjectType))
  }, [locale])

  const update = (index: number, patch: Partial<ProjectDeliverable>) => {
    setDeliverables((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)))
  }

  const toggleReportType = (index: number, value: string) => {
    const item = deliverables[index]
    const next = item.report_type.includes(value)
      ? item.report_type.filter((type) => type !== value)
      : [...item.report_type, value]
    update(index, { report_type: next })
  }

  const selectWay = (index: number, selected: DeliverableWay) => {
    const item = deliverables[index]
    update(index, {
      way: {
        selected,
        address: selected === 'physical_workshop' ? item.way.address || '' : null,
      },
    })
  }

  const canContinue =
    deliverables.length > 0 && deliverables.every(isDeliverableComplete) && !submitting

  const onContinue = async () => {
    if (!canContinue) return
    setError(null)
    writeDeliverables(locale, deliverables)

    const leavingComponents = isLeavingComponentSteps(
      locale,
      nav.nextStepId,
      nav.isReviewEditMode,
    )
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
          isRTL ? 'تعذر حفظ المخرجات.' : 'Failed to save deliverables.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader locale={locale} entered={entered} projectTypeId={projectType} />

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
            #deliverables-format-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="deliverables-format-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {isRTL ? 'كيف تريد استلام كل مخرج؟' : 'How should each deliverable arrive?'}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
          {isRTL
            ? 'اختر صيغ الملفات وطريقة التسليم لكل مخرج.'
            : 'Choose the file formats and the delivery method for each deliverable.'}
        </p>
      </div>

      <div className="mt-6 space-y-4 pb-36 sm:pb-28">
        {deliverables.map((item, index) => {
          const missingTypes = item.report_type.length === 0
          const missingAddress =
            item.way.selected === 'physical_workshop' && !item.way.address?.trim()

          return (
            <section
              key={index}
              aria-labelledby={`deliverable-format-${index}`}
              className="rounded-[10px] border border-slate-200 bg-white/85 p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3
                  id={`deliverable-format-${index}`}
                  className="text-base font-bold text-slate-900"
                >
                  {item.title}
                </h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                  {dayLabel(locale, item.period_days)}
                </span>
              </div>

              <fieldset className="mt-4">
                <legend className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {isRTL ? 'صيغ الملفات' : 'File formats'}
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {reportTypeOptions.map((option) => {
                    const checked = item.report_type.includes(option.value)
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={checked}
                        onClick={() => toggleReportType(index, option.value)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${checked
                          ? 'border-blue-300 bg-blue-50 text-blue-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {option.iconSrc ? (
                          <img src={option.iconSrc} alt="" className="h-5 w-5 object-contain" />
                        ) : null}
                        {option.label}
                      </button>
                    )
                  })}
                </div>
                {missingTypes ? (
                  <p className="mt-2 text-xs font-semibold text-rose-600">
                    {isRTL ? 'اختر صيغة واحدة على الأقل.' : 'Pick at least one format.'}
                  </p>
                ) : null}
              </fieldset>

              <fieldset className="mt-4">
                <legend className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {isRTL ? 'طريقة التسليم' : 'Delivery method'}
                </legend>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {WAY_OPTIONS.map((option) => {
                    const selected = item.way.selected === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => selectWay(index, option.value)}
                        className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-start transition-colors ${selected
                          ? 'border-blue-300 bg-blue-50/80'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ${option.iconClass}`}
                          aria-hidden="true"
                        >
                          <option.Icon className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {isRTL ? option.label.ar : option.label.en}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {item.way.selected === 'physical_workshop' ? (
                  <label className="mt-3 block">
                    <span className="text-xs font-bold text-slate-600">
                      {isRTL ? 'العنوان' : 'Address'}
                    </span>
                    <input
                      value={item.way.address || ''}
                      onChange={(event) =>
                        update(index, {
                          way: { selected: 'physical_workshop', address: event.target.value },
                        })
                      }
                      placeholder={isRTL ? 'مثال: عمّان' : 'e.g. Amman'}
                      className={`mt-1 w-full rounded-[10px] border bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${missingAddress ? 'border-rose-300' : 'border-slate-200'}`}
                    />
                  </label>
                ) : null}
              </fieldset>
            </section>
          )
        })}
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
              onClick={() => void onContinue()}
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
