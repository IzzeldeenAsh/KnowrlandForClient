'use client'

import { useEffect, useRef } from 'react'
import { useToast } from '@/components/toast/ToastContext'
import type { WizardLocale } from './wizardStorage'

export function useProjectStepErrorToast(
  errorMessage: string | null,
  locale: WizardLocale
) {
  const toast = useToast()
  const lastShownErrorRef = useRef<string | null>(null)

  useEffect(() => {
    const normalizedError = String(errorMessage || '').trim()

    if (!normalizedError) {
      lastShownErrorRef.current = null
      return
    }

    if (lastShownErrorRef.current === normalizedError) return

    toast.error(normalizedError, locale === 'ar' ? 'خطأ' : 'Error', 10000)
    lastShownErrorRef.current = normalizedError
  }, [errorMessage, locale, toast])
}
