'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'
import { projectTypeLabel } from './projectLabels'
import SpecifiedInsighterBadge from './SpecifiedInsighterBadge'

type Props = {
  locale: WizardLocale
  entered: boolean
  projectTypeId: string | null
  status?: ReactNode
  /** Set outside the wizard (agreement edit): skips the wizard storage and the insighter badge. */
  serviceLabelOverride?: string | null
}

export default function ProjectSelectedTypeHeader({
  locale,
  entered,
  projectTypeId,
  status,
  serviceLabelOverride,
}: Props) {
  const isRTL = locale === 'ar'
  const typeLabel = projectTypeLabel(locale, projectTypeId)
  const [serviceLabel, setServiceLabel] = useState<string | null>(null)

  const outsideWizard = serviceLabelOverride !== undefined

  useEffect(() => {
    if (outsideWizard) {
      setServiceLabel(serviceLabelOverride?.trim() || null)
      return
    }
    try {
      const storedServiceLabel = window.sessionStorage.getItem(
        projectWizardStorage.serviceLabelKey(locale)
      )
      setServiceLabel(storedServiceLabel?.trim() || null)
    } catch {
      setServiceLabel(null)
    }
  }, [locale, outsideWizard, serviceLabelOverride])

  if (!typeLabel) return null

  const headerLabel = serviceLabel ? `${typeLabel} - ${serviceLabel}` : typeLabel

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
      <div className="mt-1 flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-sm bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent rounded-full px-3 py-1 border border-blue-400">
            {headerLabel}
          </span>
          {status ? <span className="text-xs font-semibold text-slate-600 rounded-full px-3 py-1 border border-slate-400">{status}</span> : null}
        </div>
        {outsideWizard ? null : <SpecifiedInsighterBadge locale={locale} className="max-w-full sm:max-w-[45%]" />}
      </div>
    </div>
  )
}
