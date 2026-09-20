'use client'

import { IconShare3 } from '@tabler/icons-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ShareSocialActions from './ShareSocialActions'

type FeedShareProps = {
  /** Absolute URL of the content being shared. */
  shareUrl: string
  /** Title used for the LinkedIn share and shown in the preview card. */
  shareTitle: string
  /** Name of the post author, shown in the preview card. */
  authorName: string
  /** Author avatar shown in the preview card. */
  authorPhotoUrl?: string | null
  locale: string
  /** Keeps post sharing as the default while allowing White Paper-specific modal copy. */
  shareKind?: 'post' | 'white-paper'
  /** Optional custom styling for non-feed share triggers. */
  triggerClassName?: string
  triggerIconClassName?: string
  hideTriggerLabel?: boolean
  triggerLabel?: string
  hideTrigger?: boolean
  modalOpened?: boolean
  onModalOpenedChange?: (opened: boolean) => void
}

const FeedShare = ({
  shareUrl,
  shareTitle,
  authorName,
  authorPhotoUrl,
  locale,
  shareKind = 'post',
  triggerClassName,
  triggerIconClassName,
  hideTriggerLabel = false,
  triggerLabel,
  hideTrigger = false,
  modalOpened,
  onModalOpenedChange,
}: FeedShareProps) => {
  const isRTL = locale === 'ar'
  const isWhitePaper = shareKind === 'white-paper'

  const [internalModalOpened, setInternalModalOpened] = useState(false)
  const shareModalOpened = modalOpened ?? internalModalOpened
  const setShareModalOpened = (opened: boolean) => {
    if (modalOpened === undefined) setInternalModalOpened(opened)
    onModalOpenedChange?.(opened)
  }
  const [linkCopied, setLinkCopied] = useState(false)

  const t = {
    share: isRTL ? 'مشاركة' : 'Share',
    sharePost: isWhitePaper
      ? (isRTL ? 'مشاركة الورقة البيضاء' : 'Share White Paper')
      : (isRTL ? 'مشاركة المنشور' : 'Share Post'),
    copyLink: isRTL ? 'نسخ الرابط' : 'Copy Link',
    linkCopied: isRTL ? 'تم نسخ الرابط!' : 'Link Copied!',
    sharedBy: isWhitePaper
      ? (isRTL ? 'ورقة بيضاء بواسطة' : 'White Paper by')
      : (isRTL ? 'منشور بواسطة' : 'Post by'),
    close: isRTL ? 'إغلاق' : 'Close',
  }

  const authorInitials = authorName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const handleShare = () => {
    setShareModalOpened(true)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <>
      {!hideTrigger && (
        <button
          type="button"
          onClick={handleShare}
          aria-label={t.share}
          className={triggerClassName ?? 'inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1 py-2.5 text-[12px] font-medium text-[#5A6B85] transition-colors hover:bg-[#F5F8FC] hover:text-[#101724] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2378E8] sm:gap-2 sm:px-2 sm:text-[14px]'}
        >
          <IconShare3
            aria-hidden
            className={triggerIconClassName ?? 'h-4 w-4 shrink-0 text-[#E0398A] sm:h-[18px] sm:w-[18px]'}
            stroke={1.8}
          />
          {!hideTriggerLabel && <span>{triggerLabel ?? t.share}</span>}
        </button>
      )}

      {shareModalOpened && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShareModalOpened(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-slate-800"
            onClick={(event) => event.stopPropagation()}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.sharePost}</h2>
              <button
                type="button"
                onClick={() => setShareModalOpened(false)}
                aria-label={t.close}
                className="text-2xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            {/* Preview */}
            <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-600">
                  {authorPhotoUrl ? (
                    <img
                      src={authorPhotoUrl}
                      alt={authorName}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-500 text-sm font-semibold text-white">
                      {authorInitials || 'I'}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                    {shareTitle || authorName}
                  </h3>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {t.sharedBy} {authorName}
                  </p>
                </div>
              </div>
            </div>

            <ShareSocialActions
              shareUrl={shareUrl}
              shareTitle={shareTitle}
              authorName={authorName}
              locale={locale}
              shareKind={shareKind}
              active={shareModalOpened}
              autoFocus
            />

            {/* Copy link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`w-full rounded-lg px-4 py-2 font-medium transition-colors ${
                linkCopied
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
              }`}
            >
              {linkCopied ? t.linkCopied : t.copyLink}
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export default FeedShare
