'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InlineDateCalendar from './InlineDateCalendar'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function todayString(): string {
  return toLocalIsoDate(new Date())
}

export default function PlannedStartDateQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [dateValue, setDateValue] = useState('')
  const [deadline, setDeadline] = useState('')

  const storageKey = projectWizardStorage.plannedStartDateKey(locale)
  const today = todayString()
  const isBeforeToday = dateValue !== '' && dateValue < today
  const isAfterDeadline = !!deadline && dateValue !== '' && dateValue > deadline
  const invalid = isBeforeToday || isAfterDeadline

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      const stored = window.sessionStorage.getItem(storageKey)
      if (stored) setDateValue(stored)

      setDeadline(
        window.sessionStorage.getItem(projectWizardStorage.deadlineKey(locale)) || ''
      )
    } catch {
      // ignore
    }
  }, [locale, storageKey])

  const saveAndContinue = (value: string) => {
    try {
      window.sessionStorage.setItem(storageKey, value)
    } catch {
      // ignore
    }

    nav.goNext()
  }

  const onContinue = () => {
    if (invalid) return
    saveAndContinue(dateValue)
  }

  const validationError = isBeforeToday
    ? isRTL
      ? 'لا يمكن أن يكون التاريخ في الماضي.'
      : 'Date cannot be in the past.'
    : isAfterDeadline
      ? isRTL
        ? 'يجب أن يكون تاريخ البدء في الموعد النهائي أو قبله.'
        : 'The start date must be on or before the project deadline.'
      : null

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
          className={`mt-2 text-start transition-all duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
            }`}
        >
          {isEnglish ? (
            <style>{`
              #planned-start-date-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="planned-start-date-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {isRTL
              ? 'متى ترغب في بدء المشروع؟'
              : 'When should the project start?'}
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl">
            {isRTL
              ? 'اختياري. اختر تاريخ البدء المخطط له.'
              : 'Optional. Choose your planned start date.'}
          </p>
        </div>

        <div
          className={`mt-8 transition-all duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
            }`}
          style={{ transitionDelay: '160ms' }}
        >
          <div className="max-w-sm">
            <InlineDateCalendar
              value={dateValue}
              min={today}
              max={deadline || undefined}
              onChange={(date) => {
                // The calendar only offers dates within min/max, so a pick is always valid.
                setDateValue(date)
                saveAndContinue(date)
              }}
              locale={locale}
              label={isRTL ? 'تاريخ البدء المخطط له' : 'Planned start date'}
            />
            {deadline ? (
              <p className="mt-3 text-xs font-semibold text-slate-500">
                {isRTL
                  ? `يجب أن يكون في ${deadline} أو قبله.`
                  : `Must be on or before ${deadline}.`}
              </p>
            ) : null}
            {validationError ? (
              <div className="mt-3 text-sm text-rose-700">{validationError}</div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={invalid}
              className={`btn-sm px-6 py-2 rounded-full ${invalid
                  ? 'text-slate-500 bg-slate-200 cursor-not-allowed'
                  : 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                }`}
            >
              {nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
