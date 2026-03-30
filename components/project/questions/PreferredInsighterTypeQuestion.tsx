'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconArrowsLeftRight, IconBuilding, IconUser } from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { projectWizardStepIds } from '../projectWizardFlow'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import ChoiceCard from './ChoiceCard'

type PreferredInsighterType = 'Individual' | 'Company' | 'Either'

type Option = {
  value: PreferredInsighterType
  label: string
}

function getOptions(locale: WizardLocale): Option[] {
  const isRTL = locale === 'ar'
  if (isRTL) {
    return [
      { value: 'Individual', label: 'فرد' },
      { value: 'Company', label: 'شركة' },
      { value: 'Either', label:'كلاهما' },
    ]
  }

  return [
    { value: 'Individual', label: 'Individual' },
    { value: 'Company', label: 'Company' },
    { value: 'Either', label: 'Any' },
  ]
}

export default function PreferredInsighterTypeQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const options = useMemo(() => getOptions(locale), [locale])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [selected, setSelected] = useState<PreferredInsighterType | null>(null)

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
        projectWizardStorage.preferredInsighterTypeKey(locale)
      ) as PreferredInsighterType | null

      if (saved === 'Individual' || saved === 'Company' || saved === 'Either') {
        setSelected(saved)
      }
    } catch {
      // ignore
    }
  }, [locale])

  const title = isRTL
    ? 'ما نوع الخبير الذي تفضله لتنفيذ هذا المشروع؟'
    : 'What type of expert (insighter) do you prefer to conduct this project?'

  const canContinue = selected !== null

  const persistAndContinue = (value: PreferredInsighterType) => {
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.preferredInsighterTypeKey(locale),
        value
      )
    } catch {
      // ignore
    }

    router.push(`/${locale}/project/wizard/${projectWizardStepIds.insighterOrigin}`)
  }

  const onContinue = () => {
    if (!selected) return
    persistAndContinue(selected)
  }

  const onSelect = (value: PreferredInsighterType) => {
    setSelected(value)
    persistAndContinue(value)
  }

  const iconBadgeBase =
    'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm'
  const optionIcons: Record<
    PreferredInsighterType,
    ({
      size,
      stroke,
    }: {
      size: number
      stroke: number
      className?: string
    }) => ReactNode
  > = {
    Individual: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-amber-200/80 bg-amber-50/90 text-amber-700`}
      >
        <IconUser size={size * 0.58} stroke={stroke} />
      </span>
    ),
    Company: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-sky-200/80 bg-sky-50/90 text-sky-700`}
      >
        <IconBuilding size={size * 0.58} stroke={stroke} />
      </span>
    ),
    Either: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-emerald-200/80 bg-emerald-50/90 text-emerald-700`}
      >
        <IconArrowsLeftRight size={size * 0.58} stroke={stroke} />
      </span>
    ),
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
              #preferred-insighter-type-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="preferred-insighter-type-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {title}
          </h2>
        </div>

        <div className="mt-6 sm:mt-20" role="radiogroup" aria-label={title}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt, index) => (
              <ChoiceCard
                key={opt.value}
                checked={selected === opt.value}
                title={opt.label}
                renderIcon={optionIcons[opt.value]}
                iconSize={56}
                iconStroke={1.6}
                onSelect={() => onSelect(opt.value)}
                entered={entered}
                isRTL={isRTL}
                delayMs={110 + index * 70}
                align="center"
                size="sm"
                className="min-h-[170px]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
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
