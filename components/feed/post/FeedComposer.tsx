'use client'

import { IconFileDescription, IconPhoto, IconVideo } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import { getFeedDraft, type FeedItem } from '@/services/feed.service'
import BecomeInsighterCard from './BecomeInsighterCard'
import PostModal, { type PostModalMode } from './PostModal'

type FeedComposerProps = {
  locale: string
}

const copyByLocale = {
  en: {
    placeholder: 'Share your insights...',
    video: 'Video',
    image: 'Image',
    article: 'White Paper',
    checkingDraft: 'Checking your draft…',
  },
  ar: {
    placeholder: 'شارك رؤاك...',
    video: 'فيديو',
    image: 'صورة',
    article: 'ورقة بيضاء',
    checkingDraft: 'جارٍ التحقق من المسودة…',
  },
} as const

export default function FeedComposer({ locale }: FeedComposerProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const router = useRouter()
  const toast = useToast()
  const { user, roles, isAuthResolved } = useUserProfile()
  const [modalMode, setModalMode] = useState<PostModalMode | null>(null)
  const [draft, setDraft] = useState<FeedItem | null>(null)
  const [isCheckingDraft, setIsCheckingDraft] = useState(false)
  const [autoAttachKnowledgeId, setAutoAttachKnowledgeId] = useState<number | null>(null)
  const [isUpgradeCardOpen, setIsUpgradeCardOpen] = useState(false)

  // The feed post endpoints are gated to insighter/company roles server-side
  // (routes/api/insighter.php: role:insighter|company-insighter). Guests and
  // plain clients can't publish, so their composer opens the role-upgrade card
  // without touching a gated endpoint.
  const canPost = !!user && roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))
  const isClientOnly =
    !!user &&
    roles.includes('client') &&
    !roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))

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

  // Returning from the knowledge stepper: the dashboard redirects back with
  // ?attach_knowledge=<id>. Reopen the composer on the saved draft and let
  // PostModal attach the freshly published item automatically.
  useEffect(() => {
    if (!isAuthResolved || !canPost) return

    const params = new URLSearchParams(window.location.search)
    const raw = params.get('attach_knowledge')
    if (!raw) return

    // Strip the param first so a refresh can't re-trigger the flow.
    params.delete('attach_knowledge')
    const query = params.toString()
    router.replace(`${window.location.pathname}${query ? `?${query}` : ''}`, { scroll: false })

    const id = Number(raw)
    if (!Number.isInteger(id) || id <= 0) return

    void (async () => {
      const currentDraft = await refreshDraft().catch(() => null)
      setAutoAttachKnowledgeId(id)
      setModalMode(currentDraft?.media_type === 'video' ? 'video' : 'post')
    })()
  }, [isAuthResolved, canPost, refreshDraft, router])

  const openComposer = async (requestedMode: PostModalMode | 'article') => {
    if (isClientOnly) {
      setIsUpgradeCardOpen(true)
      return
    }

    if (isCheckingDraft) return
    setIsCheckingDraft(true)
    try {
      const currentDraft = await refreshDraft()
      if (currentDraft?.content_type === 'article' || (!currentDraft && requestedMode === 'article')) {
        router.push(`/${locale}/article/write`)
        return
      }

      setModalMode(
        currentDraft
          ? currentDraft.media_type === 'video' ? 'video' : 'post'
          : requestedMode as PostModalMode,
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
    return (
      <div className="px-4 sm:px-6 xl:px-0">
        <div className="h-[128px] animate-pulse rounded-lg border border-[#DCE4EF] bg-[#F8FAFD]" />
      </div>
    )
  }

  if (!canPost && !isClientOnly) {
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
      icon: IconFileDescription,
      color: '#8B5CF6',
      onClick: () => void openComposer('article'),
    },
  ]

  return (
    <>
      <div className="px-4 sm:px-6 xl:px-0">
        <div className="overflow-hidden rounded-lg border border-[#DCE4EF] bg-white">
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
      </div>

      <PostModal
        locale={locale}
        mode={modalMode ?? 'post'}
        opened={modalMode !== null}
        draft={draft}
        autoAttachKnowledgeId={autoAttachKnowledgeId}
        onAutoAttachHandled={() => setAutoAttachKnowledgeId(null)}
        onClose={() => {
          setModalMode(null)
          setAutoAttachKnowledgeId(null)
        }}
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

      <BecomeInsighterCard
        locale={locale}
        opened={isUpgradeCardOpen}
        onClose={() => setIsUpgradeCardOpen(false)}
      />
    </>
  )
}
