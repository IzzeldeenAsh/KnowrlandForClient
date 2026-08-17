'use client'

import { Tooltip } from '@mantine/core'
import { IconBookmark, IconLoader2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { dashboardUrl } from '@/app/config'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {
  getCommunityFeedArticle,
  getCommunityFeedPost,
  setCommunityFeedItemSaved,
} from '@/services/feed.service'

export const feedSaveChangedEvent = 'feed:save-changed'

type FeedSaveButtonProps = {
  uuid: string
  identifier?: string
  contentType: 'post' | 'article'
  initialIsSaved?: boolean
  locale: string
  tone?: 'card' | 'hero'
  layout?: 'icon' | 'action'
  onChange?: (isSaved: boolean) => void
}

const copyByLocale = {
  en: {
    save: 'Save post',
    unsave: 'Remove from saved posts',
    saveAction: 'Save',
    savedAction: 'Saved',
    updating: 'Updating saved post…',
    saved: 'Post saved.',
    removed: 'Post removed from saved posts.',
    failed: 'Unable to update your saved posts.',
  },
  ar: {
    save: 'حفظ المنشور',
    unsave: 'إزالة من المنشورات المحفوظة',
    saveAction: 'حفظ',
    savedAction: 'محفوظ',
    updating: 'جارٍ تحديث المنشورات المحفوظة…',
    saved: 'تم حفظ المنشور.',
    removed: 'تمت إزالة المنشور من المحفوظات.',
    failed: 'تعذر تحديث المنشورات المحفوظة.',
  },
} as const

export default function FeedSaveButton({
  uuid,
  identifier,
  contentType,
  initialIsSaved,
  locale,
  tone = 'card',
  layout = 'icon',
  onChange,
}: FeedSaveButtonProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const toast = useToast()
  const { user, isAuthResolved } = useUserProfile()
  const [isSaved, setIsSaved] = useState(initialIsSaved === true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (typeof initialIsSaved === 'boolean') setIsSaved(initialIsSaved)
  }, [initialIsSaved, uuid])

  useEffect(() => {
    const syncSavedState = (event: Event) => {
      const detail = (event as CustomEvent<{ uuid: string; isSaved: boolean }>).detail
      if (detail?.uuid === uuid) setIsSaved(detail.isSaved)
    }

    window.addEventListener(feedSaveChangedEvent, syncSavedState)
    return () => window.removeEventListener(feedSaveChangedEvent, syncSavedState)
  }, [uuid])

  useEffect(() => {
    if (!isAuthResolved || !user || typeof initialIsSaved === 'boolean' || !identifier) return

    const controller = new AbortController()
    const request = contentType === 'article'
      ? getCommunityFeedArticle(identifier, locale, controller.signal)
      : getCommunityFeedPost(identifier, locale, controller.signal)

    request
      .then((item) => setIsSaved(item.is_saved === true))
      .catch((error) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // The button remains usable even if its initial state cannot be refreshed.
        }
      })

    return () => controller.abort()
  }, [contentType, identifier, initialIsSaved, isAuthResolved, locale, user, uuid])

  const updateSavedState = async () => {
    if (isUpdating) return

    if (!user) {
      const returnUrl = encodeURIComponent(window.location.href)
      window.location.assign(`${dashboardUrl}/auth/login?returnUrl=${returnUrl}`)
      return
    }

    const nextIsSaved = !isSaved
    setIsUpdating(true)

    try {
      const result = await setCommunityFeedItemSaved(uuid, nextIsSaved, locale)
      setIsSaved(result.is_saved)
      onChange?.(result.is_saved)
      window.dispatchEvent(new CustomEvent(feedSaveChangedEvent, {
        detail: { uuid, isSaved: result.is_saved },
      }))
      toast.success(result.is_saved ? copy.saved : copy.removed)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.failed)
    } finally {
      setIsUpdating(false)
    }
  }

  const label = isUpdating ? copy.updating : isSaved ? copy.unsave : copy.save
  const toneClasses = tone === 'hero'
    ? isSaved
      ? 'border-white/50 bg-white text-[#155FBB] shadow-sm hover:bg-[#F3F8FF]'
      : 'border-white/35 bg-[#071426]/35 text-white backdrop-blur-sm hover:bg-[#071426]/55'
    : isSaved
      ? 'border-[#BBD5F5] bg-[#EAF3FF] text-[#2378E8] hover:bg-[#DDEBFD]'
      : 'border-transparent bg-[#F2F7FF] text-[#5B6F8A] hover:bg-[#E6F0FD] hover:text-[#2378E8]'
  const buttonClasses = layout === 'action'
    ? `inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md px-2 py-2.5 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] disabled:cursor-wait disabled:opacity-65 ${
        isSaved
          ? 'bg-[#EDF4FD] text-[#2378E8] hover:bg-[#E2EEFC]'
          : 'text-[#5A6B85] hover:bg-[#F5F8FC] hover:text-[#101724]'
      }`
    : `inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-65 ${toneClasses}`

  return (
    <Tooltip label={label} position="bottom" openDelay={300} withArrow>
      <button
        type="button"
        onClick={() => void updateSavedState()}
        disabled={isUpdating}
        aria-label={label}
        aria-pressed={isSaved}
        className={buttonClasses}
      >
        {isUpdating ? (
          <IconLoader2 aria-hidden className="h-[18px] w-[18px] animate-spin" stroke={2} />
        ) : (
          <IconBookmark
            aria-hidden
            className="h-[18px] w-[18px] text-[#C77D10]"
            stroke={isSaved ? 2 : 1.8}
            fill={isSaved ? 'currentColor' : 'none'}
          />
        )}
        {layout === 'action' && (
          <span>{isSaved ? copy.savedAction : copy.saveAction}</span>
        )}
      </button>
    </Tooltip>
  )
}
