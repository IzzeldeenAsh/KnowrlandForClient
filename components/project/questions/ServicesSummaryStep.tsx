'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { readStoredProjectRequestUuid } from '../projectRequestUuid'
import { finishServiceFlow } from '../projectServiceSessions'
import { isServiceFlowActive } from '../projectWizardFlow'
import { readStoredSpecifiedInsighterUuid } from '../specifiedInsighterProject'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import ProjectServicesPanel from './ProjectServicesPanel'

/**
 * Specific-insighter projects: lists the project's services after the main
 * service's questions and lets the client add another one before describing
 * the project.
 */
export default function ServicesSummaryStep({ locale }: { locale: WizardLocale }) {
  // Back from adding/editing a service: restore the main service's answers
  // before the step order (and the back link) is computed.
  // Once per visit, so a re-render while leaving to add a service keeps that flow.
  useState(() => {
    if (typeof window !== 'undefined' && isServiceFlowActive(locale)) finishServiceFlow(locale)
    return true
  })

  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [ids, setIds] = useState<{ projectUuid: string; insighterUuid: string } | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale)))
    } catch {
      // ignore
    }
    const projectUuid = readStoredProjectRequestUuid(locale)
    const insighterUuid = readStoredSpecifiedInsighterUuid(locale)
    setIds(projectUuid && insighterUuid ? { projectUuid, insighterUuid } : null)
  }, [locale])

  return (
    <div className="w-full max-w-4xl mx-auto min-h-full flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex-1 pb-28">
        <ProjectSelectedTypeHeader locale={locale} entered={entered} projectTypeId={projectType} />

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
              #services-summary-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="services-summary-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {isRTL ? 'خدمات المشروع' : 'Your project services'}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            {isRTL
              ? 'كل خدمة لها نطاقاتها ومخرجاتها الخاصة. أضف خدمة أخرى أو تابع.'
              : 'Each service keeps its own scopes and deliverables. Add another service or continue.'}
          </p>
        </div>

        <div className="mt-6 sm:mt-10">
          {ids ? (
            <ProjectServicesPanel
              locale={locale}
              projectUuid={ids.projectUuid}
              variant="step"
            />
          ) : null}
        </div>
      </div>

      <div className="fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
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
              onClick={nav.goNext}
              className="btn-sm px-6 py-2 rounded-full text-white bg-[#1C7CBB] hover:bg-opacity-90"
            >
              {nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
