'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import ChoiceCard from './ChoiceCard'

type Option = { value: 'Arabic' | 'English'; label: string }

function getOptions(locale: WizardLocale): Option[] {
  const isRTL = locale === 'ar'
  if (isRTL) {
    return [
      { value: 'Arabic', label: 'العربية' },
      { value: 'English', label: 'الإنجليزية' },
    ]
  }
  return [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ]
}

export default function DeliverablesLanguageQuestion({ locale }: { locale: WizardLocale }) {
  const router = useRouter()
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const options = useMemo(() => getOptions(locale), [locale])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [selected, setSelected] = useState<Option['value'] | null>(null)
  const [isAdvancing, setIsAdvancing] = useState(false)

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
        projectWizardStorage.deliverablesLanguageKey(locale)
      ) as Option['value'] | null
      if (saved && (saved === 'Arabic' || saved === 'English')) {
        setSelected(saved)
      }
    } catch {
      // ignore
    }
  }, [locale])

  const title = isRTL
    ? 'اختر اللغة التي<br> سيتم استخدامها للمخرجات؟'
    : 'Select the language <br> to be used for the deliverables ?'

  const canContinue = selected !== null

  const onSelect = (value: Option['value']) => {
    if (isAdvancing) return
    setSelected(value)
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.deliverablesLanguageKey(locale),
        value
      )
    } catch {
      // ignore
    }
    setIsAdvancing(true)
    router.push(`/${locale}/project/wizard/service`)
  }

  const onContinue = () => {
    if (!selected || isAdvancing) return
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.deliverablesLanguageKey(locale),
        selected
      )
    } catch {
      // ignore
    }
    setIsAdvancing(true)
    router.push(`/${locale}/project/wizard/service`)
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
              #deliverables-language-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
         <h2
            id="deliverables-language-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>

        <div className="mt-6 sm:mt-20" role="radiogroup" aria-label={title}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt, index) => (
              <ChoiceCard
                key={opt.value}
                checked={selected === opt.value}
                title={opt.label}
                onSelect={() => onSelect(opt.value)}
                entered={entered}
                isRTL={isRTL}
                delayMs={110 + index * 70}
                align="center"
                size="sm"
                className="min-h-[92px]"
                contentClassName="px-5 py-4 gap-2"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={`/${locale}/project/wizard/project-type`}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue || isAdvancing}
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
