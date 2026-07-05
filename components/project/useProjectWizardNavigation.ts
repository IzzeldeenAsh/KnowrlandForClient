'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  ensureProjectWizardStorageForLocale,
  type WizardLocale,
} from './wizardStorage'
import {
  getProjectWizardStepOrder,
  normalizeProjectWizardStepId,
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

  const prevStepId = index > 0 ? stepOrder[index - 1] : null
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

  const backHref = isReviewEditMode
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

    const freshStepOrder = getProjectWizardStepOrder(locale)
    const freshIndex = freshStepOrder.indexOf(currentStep)
    const freshNextStepId =
      freshIndex >= 0 && freshIndex < freshStepOrder.length - 1
        ? freshStepOrder[freshIndex + 1]
        : null

    if (!freshNextStepId) return
    setStepOrder(freshStepOrder)
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
