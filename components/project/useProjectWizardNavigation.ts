'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import type { WizardLocale } from './wizardStorage'
import {
  getProjectWizardStepOrder,
  normalizeProjectWizardStepId,
} from './projectWizardFlow'

export function useProjectWizardNavigation(locale: WizardLocale) {
  const params = useParams<{ step?: string }>()
  const router = useRouter()

  const currentStep = normalizeProjectWizardStepId(String(params?.step || ''))

  const [stepOrder, setStepOrder] = useState<string[]>(() =>
    getProjectWizardStepOrder(locale)
  )

  useEffect(() => {
    setStepOrder(getProjectWizardStepOrder(locale))
  }, [currentStep, locale])

  const index = useMemo(() => stepOrder.indexOf(currentStep), [currentStep, stepOrder])

  const prevStepId = index > 0 ? stepOrder[index - 1] : null
  const nextStepId =
    index >= 0 && index < stepOrder.length - 1 ? stepOrder[index + 1] : null

  const hrefFor = (stepId: string) => `/${locale}/project/wizard/${stepId}`

  const backHref = prevStepId ? hrefFor(prevStepId) : `/${locale}/project`
  const nextHref = nextStepId ? hrefFor(nextStepId) : null

  const goNext = () => {
    if (!nextHref) return
    router.push(nextHref)
  }

  const goBack = () => {
    router.push(backHref)
  }

  return {
    currentStep,
    stepOrder,
    prevStepId,
    nextStepId,
    backHref,
    nextHref,
    goNext,
    goBack,
    hrefFor,
  }
}

