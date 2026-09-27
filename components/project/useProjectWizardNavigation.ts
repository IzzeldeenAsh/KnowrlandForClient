'use client'
import { readProjectServices } from './projectServicesState'
import { isSpecifiedInsighterProject } from './specifiedInsighterProject'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  ensureProjectWizardStorageForLocale,
  type WizardLocale,
} from './wizardStorage'
import {
  getNextProjectWizardStepId,
  getProjectWizardStepOrder,
  normalizeProjectWizardStepId,
  passThroughStepIds,
  projectWizardStepIds,
} from './projectWizardFlow'

const reviewReturnParam = 'returnTo'

export function useProjectWizardNavigation(locale: WizardLocale) {
  ensureProjectWizardStorageForLocale(locale)

  const params = useParams<{ step?: string }>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentStep = normalizeProjectWizardStepId(String(params?.step || ''))
  const isRTL = locale === 'ar'
  const isReviewEditMode =
    currentStep !== projectWizardStepIds.projectReview &&
    searchParams?.get(reviewReturnParam) === projectWizardStepIds.projectReview

  const [stepOrder, setStepOrder] = useState<string[]>(() =>
    getProjectWizardStepOrder(locale)
  )

  useEffect(() => {
    setStepOrder(getProjectWizardStepOrder(locale))
  }, [currentStep, locale])

  const index = useMemo(() => stepOrder.indexOf(currentStep), [currentStep, stepOrder])

  const prevStepId =
    index > 0
      ? stepOrder
          .slice(0, index)
          .reverse()
          .find((step) => !passThroughStepIds.has(step)) || null
      : null
  const nextStepId =
    index >= 0 && index < stepOrder.length - 1 ? stepOrder[index + 1] : null

  const baseHrefFor = (stepId: string) => `/${locale}/project/wizard/${stepId}`
  const reviewHref = baseHrefFor(projectWizardStepIds.projectReview)
  const withReviewReturn = (href: string) =>
    `${href}${href.includes('?') ? '&' : '?'}${reviewReturnParam}=${projectWizardStepIds.projectReview}`

  const hrefFor = (stepId: string) => {
    const href = baseHrefFor(stepId)

    if (isReviewEditMode && stepId !== projectWizardStepIds.projectReview) {
      return withReviewReturn(href)
    }

    return href
  }

  const editHrefFor = (stepId: string) => withReviewReturn(baseHrefFor(stepId))

  const backHref = currentStep === 'service' && isSpecifiedInsighterProject(locale) && readProjectServices(locale).length > 0
    ? baseHrefFor('services-summary')
    : isReviewEditMode
    ? reviewHref
    : prevStepId
      ? hrefFor(prevStepId)
      : `/${locale}/project`
  const nextHref = isReviewEditMode
    ? reviewHref
    : nextStepId
      ? hrefFor(nextStepId)
      : null
  const continueLabel = isReviewEditMode
    ? isRTL
      ? 'العودة إلى الملخص'
      : 'Return to summary'
    : isRTL
      ? 'متابعة'
      : 'Continue'

  const goNext = () => {
    if (isReviewEditMode) {
      router.push(reviewHref)
      return
    }

    const freshNextStepId = getNextProjectWizardStepId(locale, currentStep)

    if (!freshNextStepId) return
    setStepOrder(getProjectWizardStepOrder(locale))
    router.push(hrefFor(freshNextStepId))
  }

  const goBack = () => {
    router.push(backHref)
  }

  return {
    currentStep,
    isReviewEditMode,
    stepOrder,
    prevStepId,
    nextStepId,
    backHref,
    nextHref,
    continueLabel,
    goNext,
    goBack,
    hrefFor,
    editHrefFor,
  }
}
