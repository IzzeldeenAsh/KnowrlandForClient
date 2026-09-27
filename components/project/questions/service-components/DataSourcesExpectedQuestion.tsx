'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import { getProjectApiErrorMessage } from '@/components/project/projectApiError'
import {
  readServiceComponentPayloadValue,
  updateServiceComponentPayload,
} from '@/components/project/serviceComponentsPayload'
import { syncProjectProperties } from '@/components/project/projectPropertiesSync'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'

type DataSourceId = 'primary_data' | 'secondary_data' | 'both' | 'does_not_matter'

const dataSourceIds: DataSourceId[] = [
  'primary_data',
  'secondary_data',
  'both',
  'does_not_matter',
]

type Option = {
  id: DataSourceId
  label: string
}

function getOptions(locale: WizardLocale): Option[] {
  const isRTL = locale === 'ar'
  if (isRTL) {
    return [
      { id: 'primary_data', label: 'بيانات أولية' },
      { id: 'secondary_data', label: 'بيانات ثانوية' },
      { id: 'both', label: 'كلاهما' },
      { id: 'does_not_matter', label: 'لا يهم' },
    ]
  }
  return [
    { id: 'primary_data', label: 'Primary data' },
    { id: 'secondary_data', label: 'Secondary data' },
    { id: 'both', label: 'Both' },
    { id: 'does_not_matter', label: "Doesn't matter" },
  ]
}

export default function DataSourcesExpectedQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const nav = useProjectWizardNavigation(locale)
  const options = useMemo(() => getOptions(locale), [locale])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [selected, setSelected] = useState<DataSourceId | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
    } catch {
      // ignore
    }

    const saved = readServiceComponentPayloadValue<string>(
      locale,
      'data-sources-expected'
    )
    if (saved && dataSourceIds.includes(saved as DataSourceId)) {
      setSelected(saved as DataSourceId)
    }
  }, [locale])

  const title = isRTL ? 'مصادر البيانات المتوقعة' : 'Expected data sources'

  const canContinue = selected !== null

  const persist = async (value: DataSourceId) => {
    setBusy(true)
    setError(null)
    try {
      updateServiceComponentPayload(locale, 'data-sources-expected', value)
      if (nav.isReviewEditMode) await syncProjectProperties(locale)
      nav.goNext()
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ الاختيار.' : 'Unable to save your selection.'
        )
      )
    } finally {
      setBusy(false)
    }
  }

  const onSelect = (id: DataSourceId) => {
    setSelected(id)
    void persist(id)
  }

  const onContinue = () => {
    if (!selected) return
    void persist(selected)
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 pb-28">
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
              #data-sources-expected-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="data-sources-expected-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {title}
          </h2>
        </div>

        <div
          className={`mt-8 space-y-3 max-w-xl transition-all duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
            }`}
          style={{ transitionDelay: '160ms' }}
          role="radiogroup"
          aria-label={title}
        >
          {options.map((opt) => {
            const isSelected = selected === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(opt.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-5 text-start transition-colors ${isSelected
                    ? 'border-blue-400 bg-white/80 shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white/80'
                  }`}
              >
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                    }`}
                  aria-hidden="true"
                >
                  {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                </span>
                <span className="text-base font-medium text-slate-900">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              aria-disabled={busy}
              onClick={(e) => {
                if (busy) e.preventDefault()
              }}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue || busy}
              className={`btn-sm px-6 py-2 rounded-full ${canContinue && !busy
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                }`}
            >
              {busy
                ? isRTL
                  ? 'جاري الحفظ...'
                  : 'Saving...'
                : nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
