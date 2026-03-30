'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  IconBuildingBank,
  IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconDots,
  IconRocket,
  IconUser,
} from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import ChoiceCard from './ChoiceCard'

type Option = { value: string; label: string }

function getOptions(locale: WizardLocale): Option[] {
  const isRTL = locale === 'ar'
  if (isRTL) {
    return [
      { value: 'Entrepreneur', label: 'رائد أعمال' },
      { value: 'Startup', label: 'شركة ناشئة' },
      { value: 'SME', label: 'شركة صغيرة/متوسطة' },
      { value: 'Company', label: 'شركة' },
      { value: 'Organization', label: 'منظمة' },
      { value: 'Government', label: 'حكومة' },
    ]
  }
  return [
    { value: 'Entrepreneur', label: 'Entrepreneur' },
    { value: 'Startup', label: 'Startup' },
    { value: 'SME', label: 'SME' },
    { value: 'Company', label: 'Company' },
    { value: 'Organization', label: 'Organization' },
    { value: 'Government', label: 'Government' },
  ]
}

export default function WhoAreYouQuestion({ locale }: { locale: WizardLocale }) {
  const router = useRouter()
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const nav = useProjectWizardNavigation(locale)

  const options = useMemo(() => getOptions(locale), [locale])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)

  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [otherValue, setOtherValue] = useState('')

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
        projectWizardStorage.whoAreYouKey(locale)
      )

      if (!saved) return
      const match = options.find((o) => o.value === saved)
      if (match) {
        setSelectedValue(match.value)
      } else {
        setSelectedValue('Other')
        setOtherValue(saved)
      }
    } catch {
      // ignore
    }
  }, [locale, options])

  const title = isRTL ? 'من أنت؟' : 'Who are you ?'
  const otherLabel = isRTL ? 'أخرى' : 'Other'

  const finalValue =
    selectedValue === 'Other' ? otherValue.trim() : selectedValue ?? ''

  const canContinue = finalValue.length > 0

  const persistAndContinue = (value: string) => {
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.whoAreYouKey(locale),
        value
      )
    } catch {
      // ignore
    }
    if (nav.nextHref) {
      router.push(nav.nextHref)
    } else {
      router.push(`/${locale}/project`)
    }
  }

  const onContinue = () => {
    if (!canContinue) return
    persistAndContinue(finalValue)
  }

  const onSelect = (value: string) => {
    setSelectedValue(value)
    if (value !== 'Other') setOtherValue('')
    if (value !== 'Other') {
      persistAndContinue(value)
    }
  }

  const iconSize = 44
  const iconStroke = 1.6
  const iconBadgeBase =
    'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm'
  const optionIcons: Record<
    string,
    ({
      size,
      stroke,
    }: {
      size: number
      stroke: number
      className?: string
    }) => ReactNode
  > = {
    Entrepreneur: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-amber-200/80 bg-amber-50/90 text-amber-700`}
      >
        <IconUser size={size * 0.58} stroke={stroke} />
      </span>
    ),
    Startup: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-sky-200/80 bg-sky-50/90 text-sky-700`}
      >
        <IconRocket size={size * 0.58} stroke={stroke} />
      </span>
    ),
    SME: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-emerald-200/80 bg-emerald-50/90 text-emerald-700`}
      >
        <IconBuildingStore size={size * 0.58} stroke={stroke} />
      </span>
    ),
    Company: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-violet-200/80 bg-violet-50/90 text-violet-700`}
      >
        <IconBuildingSkyscraper size={size * 0.58} stroke={stroke} />
      </span>
    ),
    Organization: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-cyan-200/80 bg-cyan-50/90 text-cyan-700`}
      >
        <IconBuildingCommunity size={size * 0.58} stroke={stroke} />
      </span>
    ),
    Government: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-slate-200/80 bg-slate-100/90 text-slate-700`}
      >
        <IconBuildingBank size={size * 0.58} stroke={stroke} />
      </span>
    ),
    Other: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-slate-200/80 bg-slate-100/90 text-slate-600`}
      >
        <IconDots size={size * 0.58} stroke={stroke} />
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
              #who-are-you-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="who-are-you-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {title}
          </h2>
        </div>

        <div className="mt-6 sm:mt-20" role="radiogroup" aria-label={title}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {options.map((opt, index) => {
              const isSelected = selectedValue === opt.value
              return (
                <ChoiceCard
                  key={opt.value}
                  size="sm"
                  checked={isSelected}
                  title={opt.label}
                  renderIcon={optionIcons[opt.value]}
                  onSelect={() => onSelect(opt.value)}
                  entered={entered}
                  isRTL={isRTL}
                  delayMs={110 + index * 55}
                  align="center"
                  className="min-h-[140px]"
                  iconSize={iconSize}
                  iconStroke={iconStroke}
                />
              )
            })}

            <ChoiceCard
              checked={selectedValue === 'Other'}
              title={otherLabel}
              renderIcon={optionIcons.Other}
              onSelect={() => onSelect('Other')}
              entered={entered}
              isRTL={isRTL}
              delayMs={110 + options.length * 55}
              align="center"
              size="sm"
              className="min-h-[140px]"
              iconSize={iconSize}
              iconStroke={iconStroke}
            />
          </div>

          <div
            className={`mt-3 rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-500 overflow-hidden ${
              selectedValue === 'Other'
                ? 'border-blue-300 bg-white/60 max-h-32 opacity-100'
                : 'border-white/30 bg-white/35 max-h-0 opacity-0'
            }`}
          >
            <div className="px-5 py-4">
              <input
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                placeholder={isRTL ? 'اكتب هنا…' : 'Type here…'}
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
