'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ProjectSelectedTypeHeader from '@/components/project/ProjectSelectedTypeHeader'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import ChoiceCard from '@/components/project/questions/ChoiceCard'

type Option = { value: string; label: string }

type SingleChoiceServiceComponentQuestionProps = {
  locale: WizardLocale
  title: string
  subtitle?: string
  slug: string
  options: Option[]
}

export default function SingleChoiceServiceComponentQuestion({
  locale,
  title,
  subtitle,
  slug,
  options,
}: SingleChoiceServiceComponentQuestionProps) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const nav = useProjectWizardNavigation(locale)

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      const saved = window.sessionStorage.getItem(
        projectWizardStorage.serviceComponentAnswerKey(locale, slug)
      )
      if (saved) setSelected(saved)
    } catch {
      // ignore
    }
  }, [locale, slug])

  const canContinue = selected != null && selected.trim().length > 0

  const onContinue = () => {
    if (!canContinue || !selected) return
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.serviceComponentAnswerKey(locale, slug),
        selected
      )
    } catch {
      // ignore
    }
    nav.goNext()
  }

  const cards = useMemo(() => options, [options])

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
            #service-component-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="service-component-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-6" role="radiogroup" aria-label={title}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map((opt, index) => (
            <ChoiceCard
              key={opt.value}
              role="radio"
              checked={selected === opt.value}
              title={opt.label}
              align="start"
              size="sm"
              isRTL={isRTL}
              entered={entered}
              delayMs={110 + index * 50}
              onSelect={() => setSelected(opt.value)}
              className="min-h-[110px]"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="mt-8 flex items-center justify-between gap-3">
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
              {isRTL ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

