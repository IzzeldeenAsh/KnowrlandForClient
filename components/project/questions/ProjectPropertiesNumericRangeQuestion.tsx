'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { Slider } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import { syncProjectProperties } from '@/components/project/projectPropertiesSync'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

type ProjectPropertiesNumericRangeQuestionProps = {
  locale: WizardLocale
  title: string
  titleId: string
  subtitle?: string
  minLabel: string
  maxLabel: string
  minPlaceholder?: string
  maxPlaceholder?: string
  minStorageKey: string
  maxStorageKey: string
  emptyErrorText?: string
  invalidRangeText: string
  saveErrorText: string
  sliderMin: number
  sliderMax: number
  sliderStep?: number
  sliderMarks?: number[]
}

function sanitizeNumericInput(value: string): string {
  return value.replace(/[^\d]/g, '')
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function parseStoredNumber(value: string | null): number | null {
  if (!value) return null

  const digits = sanitizeNumericInput(value)
  if (!digits) return null

  const parsed = Number(digits)
  return Number.isFinite(parsed) ? parsed : null
}

export default function ProjectPropertiesNumericRangeQuestion({
  locale,
  title,
  titleId,
  minLabel,
  maxLabel,
  minStorageKey,
  maxStorageKey,
  invalidRangeText,
  saveErrorText,
  sliderMin,
  sliderMax,
  sliderStep = 1,
  sliderMarks,
}: ProjectPropertiesNumericRangeQuestionProps) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(isRTL ? 'ar' : 'en'),
    [isRTL]
  )

  const marks = useMemo(() => {
    const values =
      sliderMarks && sliderMarks.length > 0
        ? sliderMarks
        : [sliderMin, Math.round((sliderMin + sliderMax) / 2), sliderMax]

    return values.map((value) => ({
      value,
      label: numberFormatter.format(value),
    }))
  }, [numberFormatter, sliderMarks, sliderMax, sliderMin])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [minValue, setMinValue] = useState(sliderMin)
  const [maxValue, setMaxValue] = useState(sliderMax)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const minSliderMarks = useMemo(
    () => marks.filter((mark) => mark.value >= sliderMin && mark.value <= maxValue),
    [marks, maxValue, sliderMin]
  )

  const maxSliderMarks = useMemo(
    () => marks.filter((mark) => mark.value >= minValue && mark.value <= sliderMax),
    [marks, minValue, sliderMax]
  )

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      const storedMin = parseStoredNumber(window.sessionStorage.getItem(minStorageKey))
      const storedMax = parseStoredNumber(window.sessionStorage.getItem(maxStorageKey))
      const resolvedMin = clampNumber(storedMin ?? sliderMin, sliderMin, sliderMax)
      const resolvedMax = clampNumber(storedMax ?? sliderMax, sliderMin, sliderMax)

      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      setMinValue(Math.min(resolvedMin, resolvedMax))
      setMaxValue(Math.max(resolvedMin, resolvedMax))
    } catch {
      // ignore
    }
  }, [locale, maxStorageKey, minStorageKey, sliderMax, sliderMin])

  const invalidRange = minValue > maxValue
  const visibleError = invalidRange ? invalidRangeText : error

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
      setError(getProjectApiErrorMessage(err, saveErrorText))
    } finally {
      setSubmitting(false)
    }
  }

  const onContinue = async () => {
    if (submitting || invalidRange) return

    try {
      window.sessionStorage.setItem(minStorageKey, String(minValue))
      window.sessionStorage.setItem(maxStorageKey, String(maxValue))
    } catch {
      // ignore
    }

    await finishSync()
  }

  const onSkip = async () => {
    if (submitting) return

    try {
      window.sessionStorage.setItem(minStorageKey, '')
      window.sessionStorage.setItem(maxStorageKey, '')
    } catch {
      // ignore
    }

    await finishSync()
  }

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
              #${titleId} {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id={titleId}
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900" dangerouslySetInnerHTML={{__html:title}}
          />
          
         
        </div>

        <div
          className={`mt-8  transition-all duration-700 ${
            entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
          }`}
          style={{ transitionDelay: '160ms' }}
        >
          

          <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
                <div className="text-sm text-slate-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-800">
                    {minLabel}
                  </span>
                </div>
              <div className="mt-2 text-start text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {numberFormatter.format(minValue)}
              </div>
              <Slider
                className="mt-5"
                min={sliderMin}
                max={maxValue}
                step={sliderStep}
                value={minValue}
                onChange={(value) => {
                  setMinValue(value)
                  setError(null)
                }}
                marks={minSliderMarks}
                color="#2563eb"
                size="md"
                thumbSize={18}
                label={(value) => numberFormatter.format(value)}
                styles={{
                  root: { '--slider-track-bg': '#ffffff' } as CSSProperties,
                  bar: { backgroundColor: '#2563eb' },
                  thumb: {
                    backgroundColor: '#ffffff',
                    border: '2px solid #2563eb',
                    boxShadow: 'none',
                  },
                  mark: { borderColor: '#cbd5e1' },
                  markLabel: {
                    fontSize: '0.75rem',
                    color: '#64748b',
                  },
                }}
              />
            </div>

            <div>
               <div className="text-sm text-slate-700">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-800">
                  {maxLabel}
                </span>
              </div>
            <div className="mt-2 text-start text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {numberFormatter.format(maxValue)}
              </div>
              <Slider
                className="mt-5"
                min={minValue}
                max={sliderMax}
                step={sliderStep}
                value={maxValue}
                onChange={(value) => {
                  setMaxValue(value)
                  setError(null)
                }}
                marks={maxSliderMarks}
                color="#2563eb"
                size="md"
                thumbSize={18}
                label={(value) => numberFormatter.format(value)}
                styles={{
                  root: { '--slider-track-bg': '#ffffff' } as CSSProperties,
                  bar: { backgroundColor: '#2563eb' },
                  thumb: {
                    backgroundColor: '#ffffff',
                    border: '2px solid #2563eb',
                    boxShadow: 'none',
                  },
                  mark: { borderColor: '#cbd5e1' },
                  markLabel: {
                    fontSize: '0.75rem',
                    color: '#64748b',
                  },
                }}
              />
            </div>
          </div>

          {visibleError ? (
            <div className="mt-4 text-sm text-rose-700">{visibleError}</div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
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
                disabled={submitting || invalidRange}
                className={`btn-sm px-6 py-2 rounded-full ${
                  !submitting && !invalidRange
                    ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                    : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                }`}
              >
                {submitting ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : isRTL ? 'متابعة' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
