'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/toast/ToastContext'

const TOAST_QUERY_KEY = 'toast'
const TOAST_QUERY_VALUE = 'draft_saved'

export default function DraftSavedToast({ locale }: { locale: string }) {
  const toast = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    const toastParam = searchParams.get(TOAST_QUERY_KEY)
    if (toastParam !== TOAST_QUERY_VALUE) return

    firedRef.current = true

    const message = locale === 'ar' ? 'تم حفظ المعرفة كمسودة' : 'InsightSaved as Draft'
    toast.info(message, '')

    // Remove the query param so it won't re-fire on refresh/back
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete(TOAST_QUERY_KEY)
    const nextUrl = nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    router.replace(nextUrl)
  }, [locale, pathname, router, searchParams, toast])

  return null
}

