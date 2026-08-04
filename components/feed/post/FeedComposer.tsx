'use client'

import { IconArticle, IconFileText, IconLoader2, IconPhoto, IconVideo } from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import { getFeedDraft, type FeedItem } from '@/services/feed.service'
import PostModal, { type PostModalMode } from './PostModal'

type FeedComposerProps = {
  locale: string
}

const copyByLocale = {
  en: {
    placeholder: 'Share knowledge, an insight, or a useful idea',
    video: 'Video',
    image: 'Image',
    article: 'Article',
    savedDraft: 'You have a saved draft',
    continueDraft: 'Continue editing',
    checkingDraft: 'Checking your draft…',
  },
  ar: {
    placeholder: 'شارك معرفة أو رؤية أو فكرة مفيدة',
    video: 'فيديو',
    image: 'صورة',
    article: 'مقال',
    savedDraft: 'لديك مسودة محفوظة',
    continueDraft: 'متابعة التعديل',
    checkingDraft: 'جارٍ التحقق من المسودة…',
  },
} as const

export default function FeedComposer({ locale }: FeedComposerProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const toast = useToast()
  const { user, roles, isAuthResolved } = useUserProfile()
  const [modalMode, setModalMode] = useState<PostModalMode | null>(null)
  const [draft, setDraft] = useState<FeedItem | null>(null)
  const [isCheckingDraft, setIsCheckingDraft] = useState(false)

  // The feed post endpoints are gated to insighter/company roles server-side
  // (routes/api/insighter.php: role:insighter|company-insighter). Guests and
  // plain clients can't publish, so don't render a composer that will 401/403.
  const canPost = !!user && roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))

  const refreshDraft = useCallback(async (signal?: AbortSignal) => {
    if (!canPost) {
      setDraft(null)
      return null
    }

    try {
      const currentDraft = await getFeedDraft(locale, signal)
      setDraft(currentDraft)
      return currentDraft
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return null
      throw error
    }
  }, [canPost, locale])

  useEffect(() => {
    if (!isAuthResolved || !canPost) return
    const controller = new AbortController()
    void refreshDraft(controller.signal).catch(() => undefined)
    return () => controller.abort()
  }, [canPost, isAuthResolved, refreshDraft])

  const openComposer = async (requestedMode: PostModalMode) => {
    if (isCheckingDraft) return
    setIsCheckingDraft(true)
    try {
      const currentDraft = await refreshDraft()
      setModalMode(
        currentDraft
          ? currentDraft.media_type === 'video' ? 'video' : 'post'
          : requestedMode,
      )
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.checkingDraft)
    } finally {
      setIsCheckingDraft(false)
    }
  }

  const initials = user
    ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || 'I'
    : 'I'

  if (!isAuthResolved) {
    return <div className="h-[128px] animate-pulse rounded-lg border border-[#DCE4EF] bg-[#F8FAFD]" />
  }

  if (!canPost) {
    return null
  }

  const composerActions = [
    {
      label: copy.video,
      icon: IconVideo,
      color: '#E8513E',
      onClick: () => void openComposer('video'),
    },
    {
      label: copy.image,
      icon: IconPhoto,
      color: '#1EAB5A',
      onClick: () => void openComposer('post'),
    },
    {
      label: copy.article,
      icon: IconArticle,
      color: '#C8780A',
      // Article composer is a separate upcoming flow
      onClick: undefined,
    },
  ]

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-[#DCE4EF] bg-white">
        {draft && (
          <button
            type="button"
            onClick={() => void openComposer(draft.media_type === 'video' ? 'video' : 'post')}
            disabled={isCheckingDraft}
            className="flex w-full items-center gap-3 border-b border-[#F0DCA8] bg-[#FFFBF1] px-4 py-3 text-start transition-colors hover:bg-[#FFF7E2] disabled:cursor-wait"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0C7] text-[#A96710]">
              {isCheckingDraft ? (
                <IconLoader2 aria-hidden className="h-4 w-4 animate-spin" stroke={2} />
              ) : (
                <IconFileText aria-hidden className="h-4 w-4" stroke={1.8} />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] font-semibold text-[#8A5A10]">{copy.savedDraft}</span>
              <span className="mt-0.5 block truncate text-[13px] text-[#5D6D89]">
                {draft.title || draft.body || copy.continueDraft}
              </span>
            </span>
            <span className="shrink-0 text-[12px] font-semibold text-[#1D74E0]">
              {copy.continueDraft}
            </span>
          </button>
        )}
        <div className="flex min-h-[68px] items-center gap-4 px-4">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#E7F0FD]">
            {user?.profile_photo_url ? (
              <img
                src={user.profile_photo_url}
                alt={initials}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[13px] font-bold text-[#2378E8]">
                {initials}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => void openComposer('post')}
            disabled={isCheckingDraft}
            className="min-w-0 flex-1 py-3 text-start text-[14px] font-normal text-[#8A99B1] transition-colors hover:text-[#667791] focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4]"
          >
            {copy.placeholder}
          </button>
        </div>
        <div className="grid min-h-[60px] grid-cols-3 border-t border-[#E4EAF2] px-2">
          {composerActions.map(({ label, icon: ActionIcon, color, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              disabled={!onClick}
              className="flex min-w-0 items-center justify-center gap-2 px-2 text-[14px] font-normal text-[#5D6D89] transition-colors hover:bg-[#F7F9FC] focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] disabled:cursor-default disabled:hover:bg-transparent"
            >
              <ActionIcon aria-hidden className="h-5 w-5 shrink-0" stroke={1.9} style={{ color }} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <PostModal
        locale={locale}
        mode={modalMode ?? 'post'}
        opened={modalMode !== null}
        draft={draft}
        onClose={() => setModalMode(null)}
        onDraftSaved={(savedDraft) => {
          setDraft(savedDraft)
          setModalMode(null)
        }}
        onDraftDiscarded={() => {
          setDraft(null)
          setModalMode(null)
          window.dispatchEvent(new Event('feed:published'))
        }}
        onPublished={() => {
          setDraft(null)
          window.dispatchEvent(new Event('feed:published'))
        }}
      />
    </>
  )
}
