'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  IconBulb,
  IconDots,
  IconTool,
  IconTrendingUp,
} from '@tabler/icons-react'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import ChoiceCard from './ChoiceCard'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'

type StatusId = 'idea_stage' | 'expansion' | 'implementation' | 'other'

type StatusOption = {
  id: Exclude<StatusId, 'other'>
  label: string
}

function getStatusOptions(locale: WizardLocale): StatusOption[] {
  const isArabic = locale === 'ar'
  if (isArabic) {
    return [
      { id: 'idea_stage', label: 'مرحلة الفكرة' },
      { id: 'expansion', label: 'التوسع' },
      { id: 'implementation', label: 'التنفيذ' },
    ]
  }
  return [
    { id: 'idea_stage', label: 'Idea stage' },
    { id: 'expansion', label: 'Expansion' },
    { id: 'implementation', label: 'Implementation' },
  ]
}

export default function ProjectStatusQuestion({ locale }: { locale: WizardLocale }) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const nav = useProjectWizardNavigation(locale)

  const options = useMemo(() => getStatusOptions(locale), [locale])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)

  const [selectedId, setSelectedId] = useState<StatusId | null>(null)
  const [otherValue, setOtherValue] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      const savedType = window.sessionStorage.getItem(
        projectWizardStorage.projectTypeKey(locale)
      )
      setProjectType(savedType)

      const savedStatus = window.sessionStorage.getItem(
        projectWizardStorage.projectStatusKey(locale)
      )

      if (savedStatus) {
        const match = options.find((o) => o.label === savedStatus)
        if (match) {
          setSelectedId(match.id)
        } else {
          setSelectedId('other')
          setOtherValue(savedStatus)
        }
      }
    } catch {
      // ignore
    }
  }, [locale, options])

  const selectedValue =
    selectedId === 'other'
      ? otherValue.trim()
      : selectedId
        ? options.find((o) => o.id === selectedId)?.label ?? ''
        : ''

  const canContinue = selectedId !== null && selectedValue.length > 0

  const title = isRTL ? 'ما هي حالة مشروعك الحالية؟' : 'What is your current <br> project status ?'

  const persistAndContinue = (value: string) => {
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.projectStatusKey(locale),
        value
      )
    } catch {
      // ignore
    }
    nav.goNext()
  }

  const onSelect = (id: StatusId) => {
    setSelectedId(id)
    if (id !== 'other') setOtherValue('')
    if (id !== 'other') {
      const nextValue = options.find((o) => o.id === id)?.label
      if (nextValue) persistAndContinue(nextValue)
    }
  }

  const onContinue = () => {
    if (!canContinue) return
    persistAndContinue(selectedValue)
  }

  const iconSize = 56
  const iconStroke = 1.6
  const iconBadgeBase =
    'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm'
  const optionIcons: Record<
    StatusId,
    ({
      size,
      stroke,
    }: {
      size: number
      stroke: number
      className?: string
    }) => ReactNode
  > = {
    idea_stage: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-amber-200/80 bg-amber-50/90 text-amber-700`}
      >
        <IconBulb size={size * 0.55} stroke={stroke} />
      </span>
    ),
    expansion: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-emerald-200/80 bg-emerald-50/90 text-emerald-700`}
      >
        <IconTrendingUp size={size * 0.55} stroke={stroke} />
      </span>
    ),
    implementation: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-sky-200/80 bg-sky-50/90 text-sky-700`}
      >
        <IconTool size={size * 0.55} stroke={stroke} />
      </span>
    ),
    other: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-slate-200/80 bg-slate-100/90 text-slate-600`}
      >
        <IconDots size={size * 0.55} stroke={stroke} />
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
              #project-status-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="project-status-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>

        <div className="mt-6 sm:mt-20" role="radiogroup" aria-label={title}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {options.map((opt, index) => {
              const isSelected = selectedId === opt.id
              return (
                <ChoiceCard
                  key={opt.id}
                  checked={isSelected}
                  title={opt.label}
                  renderIcon={optionIcons[opt.id]}
                  onSelect={() => onSelect(opt.id)}
                  entered={entered}
                  isRTL={isRTL}
                  delayMs={110 + index * 70}
                  align="center"
                  className="min-h-[170px]"
                  iconSize={iconSize}
                  iconStroke={iconStroke}
                />
              )
            })}

            <ChoiceCard
              checked={selectedId === 'other'}
              title={isRTL ? 'أخرى' : 'Other'}
              renderIcon={optionIcons.other}
              onSelect={() => onSelect('other')}
              entered={entered}
              isRTL={isRTL}
              delayMs={110 + options.length * 70}
              align="center"
              className="min-h-[170px]"
              iconSize={iconSize}
              iconStroke={iconStroke}
            />
          </div>

          <div
            className={`mt-3 rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-500 overflow-hidden ${
              selectedId === 'other'
                ? 'border-blue-300 bg-white/60 max-h-32 opacity-100'
                : 'border-white/30 bg-white/35 max-h-0 opacity-0'
            }`}
          >
            <div className="px-5 py-4">
              <input
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                placeholder={isRTL ? 'اكتب الحالة هنا…' : 'Type your status…'}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
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
