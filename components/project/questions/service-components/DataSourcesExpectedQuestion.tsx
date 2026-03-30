'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
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

type Payload = {
  primary_data: { required: 0 | 1 }
  secondary_data: { required: 0 | 1 }
}

export default function DataSourcesExpectedQuestion({ locale }: { locale: WizardLocale }) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const nav = useProjectWizardNavigation(locale)

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useProjectStepErrorToast(error, locale)

  const [primary, setPrimary] = useState(false)
  const [secondary, setSecondary] = useState(false)
  const [both, setBoth] = useState(false)
  const [doesntMatter, setDoesntMatter] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )

      const saved = readServiceComponentPayloadValue<Payload>(
        locale,
        'data-sources-expected'
      )

      if (saved) {
        const p = saved.primary_data?.required === 1
        const s = saved.secondary_data?.required === 1
        if (p && s) {
          setBoth(true)
          setDoesntMatter(false)
          setPrimary(false)
          setSecondary(false)
        } else if (!p && !s) {
          setDoesntMatter(true)
          setBoth(false)
          setPrimary(false)
          setSecondary(false)
        } else {
          setPrimary(p)
          setSecondary(s)
          setBoth(false)
          setDoesntMatter(false)
        }
      }
    } catch {
      // ignore
    }
  }, [locale])

  const canContinue = useMemo(() => {
    const any = doesntMatter || both || primary || secondary
    return any && !submitting
  }, [both, doesntMatter, primary, secondary, submitting])

  const togglePrimary = () => {
    setError(null)
    setDoesntMatter(false)
    setBoth(false)
    setPrimary((v) => !v)
  }

  const toggleSecondary = () => {
    setError(null)
    setDoesntMatter(false)
    setBoth(false)
    setSecondary((v) => !v)
  }

  const toggleBoth = () => {
    setError(null)
    setDoesntMatter(false)
    setBoth((v) => {
      const next = !v
      if (next) {
        setPrimary(false)
        setSecondary(false)
      }
      return next
    })
  }

  const toggleDoesntMatter = () => {
    setError(null)
    setDoesntMatter((v) => {
      const next = !v
      if (next) {
        setPrimary(false)
        setSecondary(false)
        setBoth(false)
      }
      return next
    })
  }

  const onContinue = async () => {
    if (!canContinue) return
    setError(null)

    const requiredPrimary = doesntMatter ? 0 : both ? 1 : primary ? 1 : 0
    const requiredSecondary = doesntMatter ? 0 : both ? 1 : secondary ? 1 : 0

    const payload: Payload = {
      primary_data: { required: requiredPrimary as 0 | 1 },
      secondary_data: { required: requiredSecondary as 0 | 1 },
    }

    updateServiceComponentPayload(locale, 'data-sources-expected', payload)

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

  const title = isRTL ? 'مصادر البيانات المتوقعة' : 'Expected data sources'
  const subtitle = isRTL
    ? 'يمكنك اختيار أكثر من خيار.'
    : 'You can select multiple options.'

  const OptionRow = ({
    checked,
    label,
    onClick,
  }: {
    checked: boolean
    label: string
    onClick: () => void
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-start transition-colors ${
        checked
          ? 'border-blue-300 bg-white/70'
          : 'border-white/30 bg-white/40 hover:bg-white/55'
      }`}
    >
      <span className="text-sm sm:text-base font-semibold text-slate-900">{label}</span>
      <span
        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
          checked ? 'border-blue-600' : 'border-slate-300'
        } bg-white/80`}
        aria-hidden="true"
      >
        <span className={`h-2.5 w-2.5 rounded-sm ${checked ? 'bg-blue-600' : 'bg-transparent'}`} />
      </span>
    </button>
  )

  return (
    <div className="w-full max-w-5xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
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
            #data-sources-expected-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="data-sources-expected-title"
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

      <div className="mt-6 space-y-2 pb-28">
        <OptionRow
          checked={primary}
          label={isRTL ? 'بيانات أولية' : 'Primary Data'}
          onClick={togglePrimary}
        />
        <OptionRow
          checked={secondary}
          label={isRTL ? 'بيانات ثانوية' : 'Secondary Data'}
          onClick={toggleSecondary}
        />
        <OptionRow
          checked={both}
          label={isRTL ? 'كلاهما' : 'Both'}
          onClick={toggleBoth}
        />
        <OptionRow
          checked={doesntMatter}
          label={isRTL ? 'لا يهم' : "Doesn't matter"}
          onClick={toggleDoesntMatter}
        />
      </div>

        <div className="fixed bottom-0 left-0 right-0 sm:static border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="mt-2 sm:mt-8 flex items-center justify-between gap-3">
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
