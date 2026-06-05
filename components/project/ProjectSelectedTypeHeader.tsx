'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'
import { projectTypeLabel } from './projectLabels'
import {
  getSpecifiedInsighterLabel,
  isSpecifiedInsighterProject,
} from './specifiedInsighterProject'

type Props = {
  locale: WizardLocale
  entered: boolean
  projectTypeId: string | null
  status?: ReactNode
}

export default function ProjectSelectedTypeHeader({
  locale,
  entered,
  projectTypeId,
  status,
}: Props) {
  const isRTL = locale === 'ar'
  const typeLabel = projectTypeLabel(locale, projectTypeId)
  const [serviceLabel, setServiceLabel] = useState<string | null>(null)
  const [isSpecifiedInsighter, setIsSpecifiedInsighter] = useState(false)

  useEffect(() => {
    try {
      const storedServiceLabel = window.sessionStorage.getItem(
        projectWizardStorage.serviceLabelKey(locale)
      )
      setServiceLabel(storedServiceLabel?.trim() || null)
      setIsSpecifiedInsighter(isSpecifiedInsighterProject(locale))
    } catch {
      setServiceLabel(null)
      setIsSpecifiedInsighter(false)
    }
  }, [locale])

  if (!typeLabel) return null

  const headerLabel = serviceLabel ? `${typeLabel} - ${serviceLabel}` : typeLabel
  const statusLabel =
    status || (isSpecifiedInsighter ? getSpecifiedInsighterLabel(locale) : null)

  return (
    <div
      className={`text-start transition-all duration-700 pb-3 ${
        entered
          ? 'opacity-100 translate-x-0'
          : isRTL
            ? 'opacity-0 translate-x-4'
            : 'opacity-0 -translate-x-4'
      }`}
    >
      <div className="mt-1 inline-flex items-center gap-2">
        <span className="text-sm bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent rounded-full px-3 py-.5 border border-blue-400">
          {headerLabel}
        </span>
        {statusLabel ? <span className="text-xs font-semibold text-slate-600 rounded-full px-3 py-1 border border-slate-400">{statusLabel}</span> : null}
      </div>
    </div>
  )
}
