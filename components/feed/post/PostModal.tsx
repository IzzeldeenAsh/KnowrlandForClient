'use client'

import { Modal, Progress } from '@mantine/core'
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconFileDescription,
  IconFolderOpen,
  IconLoader2,
  IconPhoto,
  IconPlus,
  IconTrash,
  IconVideo,
  IconX,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
// Registers the <mux-player> custom element; self-hosted via npm (no CSP
// script-src change needed, unlike the CDN <script> embed Mux's docs default to).
import '@mux/mux-player'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {
  checkVideoUploadStatus,
  createSuggestTag,
  deleteFeedItem,
  fetchIndustryTags,
  fetchLibraryKnowledgeById,
  getFeedDraft,
  getFeedItem,
  initVideoPost,
  publishImageTextPost,
  publishVideoPost,
  refreshVideoUpload,
  saveImageTextPostDraft,
  saveVideoPostDraft,
  type FeedItem,
  uploadVideoToProvider,
  type FeedTag,
  type LibraryKnowledgeItem,
} from '@/services/feed.service'
import IndustryField from './IndustryField'
import { type IndustryOption } from './IndustrySelectModal'
import KnowledgeLibraryDrawer from './KnowledgeLibraryDrawer'

export type PostModalMode = 'post' | 'video'

type PostModalProps = {
  locale: string
  mode: PostModalMode
  opened: boolean
  draft: FeedItem | null
  onClose: () => void
  onDraftSaved: (draft: FeedItem) => void
  onDraftDiscarded: () => void
  onPublished: () => void
  // When the composer reopens after the user published a new knowledge item,
  // this id is fetched and attached to the post automatically.
  autoAttachKnowledgeId?: number | null
  // Called once the auto-attach id has been handled, so the parent can clear it
  // (and the URL) and avoid re-attaching on the next open.
  onAutoAttachHandled?: () => void
}

// 'stalled' means the bytes reached the provider but Mux has not reported the
// asset as ready within our polling window.
type VideoPhase =
  | 'none'
  | 'initializing'
  | 'uploading'
  | 'processing'
  | 'stalled'
  | 'ready'
  | 'error'
type RequiredFieldState = {
  industry: boolean
  video: boolean
  body: boolean
}

interface SelectedImage {
  file: File | null
  name: string
  previewUrl: string
}

const MAX_IMAGES = 20
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_VIDEO_SECONDS = 10 * 60
const PROCESSING_POLL_MS = 3000
const PROCESSING_TIMEOUT_MS = 2 * 60 * 1000

const copyByLocale = {
  en: {
    titlePost: 'Create a post',
    titleVideo: 'Create a video post',
    close: 'Close post composer',
    selectIndustry: 'Select industry',
    step1Label: 'Step 1 of 2 · Write your post',
    step2Label: 'Step 2 of 2 · Categorize',
    next: 'Next',
    back: 'Back',
    description: 'Post description',
    bodyPlaceholder: 'Share your insights...',
    uploadTitle: 'Upload your video',
    uploadHint: 'MP4 or MOV, up to 10 minutes. The video must finish uploading before you can write a description.',
    selectVideo: 'Select video',
    uploading: 'Uploading…',
    uploadedProcessing: 'Upload finished — preparing your video',
    processingHint: 'This usually takes under a minute. You can write your description now and publish once it finishes.',
    stalled: 'Still preparing your video',
    stalledHint:
      'Your video reached us safely, but it is taking longer than expected to finish preparing. Check again, or come back to this draft later.',
    checkAgain: 'Check again',
    uploadComplete: 'Upload complete',
    cancel: 'Cancel',
    remove: 'Remove',
    addTags: 'Add Tags',
    tagsCount: (count: number) => `Tags · ${count}`,
    suggestedTags: 'Suggested tags',
    optionalBadge: 'Optional',
    tagsHint: 'Tags are optional — they help the right experts find your insight.',
    noTags: 'No tags available for this industry yet.',
    addTagPlaceholder: 'Initiate a new tag…',
    addTag: 'Add',
    addTagHint: 'Type a tag and press Enter, or tap a chip below to select it.',
    addTagError: 'Unable to add the tag.',
    shareFromLibrary: 'Share from Insighta library',
    publish: 'Post',
    publishing: 'Publishing…',
    saveDraft: 'Save draft',
    savingDraft: 'Saving…',
    draftSaved: 'Your draft has been saved.',
    draftSaveFailed: 'Unable to save your draft.',
    draftSavedRedirecting: 'Draft saved. Taking you to publishing…',
    newKnowledgeAttached: 'Your new knowledge item has been attached.',
    newKnowledgeMissing: 'We could not find the item you just published. Try adding it from your library.',
    discardDraft: 'Discard draft',
    discardTitle: 'Discard this draft?',
    discardDescription: 'This permanently removes the draft and its uploaded media.',
    keepEditing: 'Keep editing',
    discarding: 'Discarding…',
    draftDiscarded: 'Your draft has been discarded.',
    draftDiscardFailed: 'Unable to discard your draft.',
    savedVideo: 'Saved video',
    publishedToast: 'Your post has been published.',
    videoTooLong: 'The video must be 10 minutes or shorter.',
    videoWrongType: 'Only MP4 or MOV videos are supported.',
    imageTooLarge: (name: string) => `"${name}" is larger than 5MB and was skipped.`,
    tooManyImages: `You can attach up to ${MAX_IMAGES} images.`,
    replacingSavedImages: 'New images will replace the images saved in this draft.',
    videoUploadFailed: 'Video upload failed. Please try again.',
    industryFirst: 'Select an industry first',
    industryRequired: 'Select an industry.',
    videoRequired: 'Select and finish uploading a video.',
    videoStillProcessing: 'Your video is still being prepared — you can publish as soon as it is ready.',
    bodyRequired: 'Write a description for your post.',
  },
  ar: {
    titlePost: 'إنشاء منشور',
    titleVideo: 'إنشاء منشور فيديو',
    close: 'إغلاق محرر المنشور',
    selectIndustry: 'اختر المجال',
    step1Label: 'الخطوة 1 من 2 · اكتب منشورك',
    step2Label: 'الخطوة 2 من 2 · التصنيف',
    next: 'التالي',
    back: 'رجوع',
    description: 'وصف المنشور',
    bodyPlaceholder: 'شارك معرفة أو رؤية أو فكرة مفيدة',
    uploadTitle: 'ارفع الفيديو',
    uploadHint: 'MP4 أو MOV، بحد أقصى 10 دقائق. يجب اكتمال رفع الفيديو قبل كتابة الوصف.',
    selectVideo: 'اختر فيديو',
    uploading: 'جارٍ الرفع…',
    uploadedProcessing: 'انتهى الرفع — جارٍ تجهيز الفيديو',
    processingHint: 'يستغرق ذلك عادةً أقل من دقيقة. يمكنك كتابة الوصف الآن والنشر بعد اكتمال التجهيز.',
    stalled: 'ما زال تجهيز الفيديو جارياً',
    stalledHint:
      'وصل الفيديو إلينا بنجاح، لكن تجهيزه يستغرق وقتاً أطول من المتوقع. تحقق مرة أخرى، أو عد إلى هذه المسودة لاحقاً.',
    checkAgain: 'تحقق مرة أخرى',
    uploadComplete: 'اكتمل الرفع',
    cancel: 'إلغاء',
    remove: 'إزالة',
    addTags: 'إضافة وسوم',
    tagsCount: (count: number) => `وسوم · ${count}`,
    suggestedTags: 'وسوم مقترحة',
    optionalBadge: 'اختياري',
    tagsHint: 'الوسوم اختيارية — تساعد الخبراء المناسبين في العثور على رؤيتك.',
    noTags: 'لا توجد وسوم متاحة لهذا المجال بعد.',
    addTagPlaceholder: 'أضف وسمًا جديدًا…',
    addTag: 'إضافة',
    addTagHint: 'اكتب وسمًا واضغط Enter، أو اضغط على وسم بالأسفل لتحديده.',
    addTagError: 'تعذر إضافة الوسم.',
    shareFromLibrary: 'مشاركة من المكتبة',
    publish: 'نشر',
    publishing: 'جارٍ النشر…',
    saveDraft: 'حفظ كمسودة',
    savingDraft: 'جارٍ الحفظ…',
    draftSaved: 'تم حفظ المسودة.',
    draftSaveFailed: 'تعذر حفظ المسودة.',
    draftSavedRedirecting: 'تم حفظ المسودة. سيتم نقلك إلى النشر…',
    newKnowledgeAttached: 'تم إرفاق عنصر المعرفة الجديد.',
    newKnowledgeMissing: 'تعذر العثور على العنصر الذي نشرته للتو. حاول إضافته من مكتبتك.',
    discardDraft: 'حذف المسودة',
    discardTitle: 'حذف هذه المسودة؟',
    discardDescription: 'سيؤدي هذا إلى حذف المسودة والوسائط المرفوعة نهائياً.',
    keepEditing: 'متابعة التعديل',
    discarding: 'جارٍ الحذف…',
    draftDiscarded: 'تم حذف المسودة.',
    draftDiscardFailed: 'تعذر حذف المسودة.',
    savedVideo: 'فيديو محفوظ',
    publishedToast: 'تم نشر منشورك.',
    videoTooLong: 'يجب ألا تتجاوز مدة الفيديو 10 دقائق.',
    videoWrongType: 'يدعم النظام فيديوهات MP4 أو MOV فقط.',
    imageTooLarge: (name: string) => `تم تخطي "${name}" لأن حجمه أكبر من 5 ميجابايت.`,
    tooManyImages: `يمكنك إرفاق حتى ${MAX_IMAGES} صورة.`,
    replacingSavedImages: 'ستحل الصور الجديدة محل الصور المحفوظة في هذه المسودة.',
    videoUploadFailed: 'فشل رفع الفيديو. حاول مرة أخرى.',
    industryFirst: 'اختر المجال أولاً',
    industryRequired: 'اختر مجالاً.',
    videoRequired: 'اختر فيديو وانتظر حتى يكتمل رفعه.',
    videoStillProcessing: 'ما زال الفيديو قيد التجهيز — يمكنك النشر بمجرد أن يصبح جاهزاً.',
    bodyRequired: 'اكتب وصفاً للمنشور.',
  },
} as const

function getVideoDurationSeconds(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const element = document.createElement('video')
    const objectUrl = URL.createObjectURL(file)
    element.preload = 'metadata'
    element.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(element.duration)
    }
    element.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Unable to read video metadata'))
    }
    element.src = objectUrl
  })
}

function isSupportedVideoFile(file: File): boolean {
  if (['video/mp4', 'video/quicktime'].includes(file.type)) return true
  return /\.(mp4|mov)$/i.test(file.name)
}

export default function PostModal({
  locale,
  mode,
  opened,
  draft,
  onClose,
  onDraftSaved,
  onDraftDiscarded,
  onPublished,
  autoAttachKnowledgeId,
  onAutoAttachHandled,
}: PostModalProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const toast = useToast()
  const { user } = useUserProfile()

  // --- Post content state ---
  // Two-step flow: 1 = write the post, 2 = categorize (industry + tags)
  const [step, setStep] = useState<1 | 2>(1)
  const [body, setBody] = useState('')
  const [industry, setIndustry] = useState<IndustryOption | null>(null)
  const [selectedTags, setSelectedTags] = useState<FeedTag[]>([])
  const [relatedInsights, setRelatedInsights] = useState<LibraryKnowledgeItem[]>([])
  const [images, setImages] = useState<SelectedImage[]>([])
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [isDiscardingDraft, setIsDiscardingDraft] = useState(false)
  const [discardConfirmOpened, setDiscardConfirmOpened] = useState(false)
  const [touchedFields, setTouchedFields] = useState<RequiredFieldState>({
    industry: false,
    video: false,
    body: false,
  })
  const [dirtyFields, setDirtyFields] = useState<RequiredFieldState>({
    industry: false,
    video: false,
    body: false,
  })

  // --- Sub-panel state ---
  const [libraryDrawerOpened, setLibraryDrawerOpened] = useState(false)
  const [industryTags, setIndustryTags] = useState<FeedTag[]>([])
  const [isLoadingTags, setIsLoadingTags] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)

  // --- Video state ---
  const [videoPhase, setVideoPhase] = useState<VideoPhase>('none')
  const [videoFileName, setVideoFileName] = useState('')
  const [uploadPercent, setUploadPercent] = useState(0)
  // Only available once Mux's webhook has fired (video.asset.ready) and the
  // backend has persisted it — see MuxWebhookService::mergeMuxAssetData.
  const [videoPlaybackId, setVideoPlaybackId] = useState<string | null>(null)
  const videoUuidRef = useRef<string | null>(null)
  const abortUploadRef = useRef<(() => void) | null>(null)
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const videoInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const industryButtonRef = useRef<HTMLButtonElement>(null)
  const videoSelectButtonRef = useRef<HTMLButtonElement>(null)
  const videoFieldRef = useRef<HTMLDivElement>(null)
  const bodyInputRef = useRef<HTMLTextAreaElement>(null)

  const hasVideo = videoPhase !== 'none'
  const hasImages = images.length > 0
  const isVideoFlow = mode === 'video' || hasVideo
  // The description stays editable while the provider finishes preparing the
  // video, so the wait is never dead time.
  const isAwaitingProcessing = videoPhase === 'processing' || videoPhase === 'stalled'
  const bodyLocked = isVideoFlow && !isAwaitingProcessing && videoPhase !== 'ready'
  const industryInvalid = touchedFields.industry && industry === null
  const videoInvalid = touchedFields.video && isVideoFlow && videoPhase !== 'ready'
  // Distinguish "no video yet" from "video uploaded, provider still working":
  // only the first is something the user can act on.
  const videoErrorMessage = isAwaitingProcessing ? copy.videoStillProcessing : copy.videoRequired
  const bodyInvalid = touchedFields.body && body.trim() === ''

  const initials = user
    ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || 'I'
    : 'I'
  const fullName = user
    ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.name
    : ''

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current !== null) {
      clearTimeout(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }, [])

  const resetAll = useCallback(() => {
    abortUploadRef.current?.()
    abortUploadRef.current = null
    stopPolling()
    setStep(1)
    setBody('')
    setIndustry(null)
    setSelectedTags([])
    setNewTagName('')
    setRelatedInsights([])
    setImages((previous) => {
      previous.forEach((image) => {
        if (image.previewUrl.startsWith('blob:')) URL.revokeObjectURL(image.previewUrl)
      })
      return []
    })
    setVideoPhase('none')
    setVideoFileName('')
    setUploadPercent(0)
    setVideoPlaybackId(null)
    videoUuidRef.current = null
    setIsPublishing(false)
    setIsSavingDraft(false)
    setIsDiscardingDraft(false)
    setDiscardConfirmOpened(false)
    setTouchedFields({ industry: false, video: false, body: false })
    setDirtyFields({ industry: false, video: false, body: false })
  }, [stopPolling])

  // Full cleanup when the modal closes
  useEffect(() => {
    if (!opened) resetAll()
  }, [opened, resetAll])

  useEffect(() => () => stopPolling(), [stopPolling])

  // React does not expose the native file-input `cancel` event. Listen for it
  // directly so validation is shown only when the chooser is dismissed.
  useEffect(() => {
    const input = videoInputRef.current
    if (!input) return

    const markVideoSelectionCancelled = () => {
      setTouchedFields((previous) => ({ ...previous, video: true }))
    }

    input.addEventListener('cancel', markVideoSelectionCancelled)
    return () => input.removeEventListener('cancel', markVideoSelectionCancelled)
  }, [opened])

  // --- Video handling ---

  const pollProcessingStatus = useCallback(
    (immediate = false) => {
      const uuid = videoUuidRef.current
      if (!uuid) return

      stopPolling()
      const deadline = Date.now() + PROCESSING_TIMEOUT_MS

      const check = async () => {
        try {
          const isReady = await checkVideoUploadStatus(uuid, locale)
          if (isReady) {
            // Readiness comes from the dedicated status endpoint. The feed
            // request is only needed to populate the optional Mux preview.
            try {
              const feedItem = await getFeedItem(uuid, locale)
              setVideoPlaybackId(feedItem.media?.[0]?.provider_playback_id ?? null)
            } catch {
              setVideoPlaybackId(null)
            }
            setVideoPhase('ready')
            return
          }
        } catch {
          // Transient polling failure: fall through and retry until the deadline
        }

        if (Date.now() >= deadline) {
          setVideoPhase('stalled')
          return
        }

        pollTimerRef.current = setTimeout(check, PROCESSING_POLL_MS)
      }

      if (immediate) {
        void check()
        return
      }

      pollTimerRef.current = setTimeout(check, PROCESSING_POLL_MS)
    },
    [locale, stopPolling],
  )

  useEffect(() => {
    if (!opened || !draft) return

    resetAll()
    setBody(draft.body ?? '')
    setIndustry(
      draft.industry
        ? { id: draft.industry.id, name: draft.industry.name }
        : null,
    )
    setSelectedTags(draft.tags)
    setRelatedInsights(
      draft.related_insights.flatMap((item) =>
        typeof item.id === 'number'
          ? [{
              id: item.id,
              type: item.type,
              title: item.title,
              slug: item.slug,
              status: 'published',
              published_at: null,
            }]
          : [],
      ),
    )
    setImages(
      draft.media
        .filter((item) => item.media_type === 'image' && item.url)
        .map((item) => ({
          file: null,
          name: item.name ?? copy.description,
          previewUrl: item.url as string,
        })),
    )

    if (draft.media_type === 'video') {
      const media = draft.media.find((item) => item.media_type === 'video')
      videoUuidRef.current = draft.uuid
      setVideoFileName(media?.name ?? copy.savedVideo)
      setVideoPlaybackId(media?.provider_playback_id ?? null)

      if (media?.provider_processing_status === 'ready') {
        setVideoPhase('ready')
      } else if (media) {
        setVideoPhase('processing')
        pollProcessingStatus(true)
      } else {
        setVideoPhase('error')
      }
    }
  }, [copy.description, copy.savedVideo, draft, opened, pollProcessingStatus, resetAll])

  const recheckProcessingStatus = () => {
    setVideoPhase('processing')
    pollProcessingStatus(true)
  }

  const startVideoUpload = async (file: File) => {
    setDirtyFields((previous) => ({ ...previous, video: true }))
    setTouchedFields((previous) => ({ ...previous, video: false }))

    if (!isSupportedVideoFile(file)) {
      toast.error(copy.videoWrongType)
      return
    }

    try {
      const duration = await getVideoDurationSeconds(file)
      if (duration > MAX_VIDEO_SECONDS) {
        toast.error(copy.videoTooLong)
        return
      }
    } catch {
      // If metadata can't be read locally, let the provider validate it
    }

    setVideoPhase('initializing')
    setVideoFileName(file.name)
    setUploadPercent(0)

    try {
      // First upload initializes the draft; replacements refresh the upload session
      const session = videoUuidRef.current
        ? await refreshVideoUpload(videoUuidRef.current, locale)
        : await initVideoPost(locale)
      videoUuidRef.current = session.uuid

      setVideoPhase('uploading')
      const { promise, abort } = uploadVideoToProvider(
        session.video_upload.upload_url,
        file,
        setUploadPercent,
      )
      abortUploadRef.current = abort
      await promise
      abortUploadRef.current = null

      setVideoPhase('processing')
      pollProcessingStatus()
    } catch (error) {
      abortUploadRef.current = null
      if (error instanceof DOMException && error.name === 'AbortError') {
        setVideoPhase('none')
        return
      }
      setVideoPhase('error')
      setTouchedFields((previous) => ({ ...previous, video: true }))
      toast.error(error instanceof Error ? error.message : copy.videoUploadFailed)
    }
  }

  const cancelOrRemoveVideo = () => {
    abortUploadRef.current?.()
    abortUploadRef.current = null
    stopPolling()
    // Keep the uuid: the next selected file goes through refresh-upload
    setVideoPhase('none')
    setVideoFileName('')
    setUploadPercent(0)
    setVideoPlaybackId(null)
    setTouchedFields((previous) => ({ ...previous, video: true }))
  }

  // --- Image handling ---

  const addImages = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const accepted: SelectedImage[] = []
    let remaining = MAX_IMAGES - images.length

    for (const file of Array.from(files)) {
      if (remaining <= 0) {
        toast.warning(copy.tooManyImages)
        break
      }
      if (file.size > MAX_IMAGE_BYTES) {
        toast.warning(copy.imageTooLarge(file.name))
        continue
      }
      accepted.push({ file, name: file.name, previewUrl: URL.createObjectURL(file) })
      remaining -= 1
    }

    if (accepted.length > 0) {
      setImages((previous) => {
        const hasSavedImages = previous.some((image) => image.file === null)
        if (hasSavedImages) {
          toast.warning(copy.replacingSavedImages)
          return accepted
        }
        return [...previous, ...accepted]
      })
    }
  }

  const removeImage = (index: number) => {
    setImages((previous) => {
      if (previous[index].previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previous[index].previewUrl)
      }
      return previous.filter((_, i) => i !== index)
    })
  }

  const moveImage = (index: number, direction: -1 | 1) => {
    setImages((previous) => {
      const target = index + direction
      if (target < 0 || target >= previous.length) return previous
      const next = [...previous]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  // --- Tags ---

  const toggleTag = (tag: FeedTag) => {
    setSelectedTags((previous) =>
      previous.some((selected) => selected.id === tag.id)
        ? previous.filter((selected) => selected.id !== tag.id)
        : [...previous, tag],
    )
  }

  // "Add Tag" flow (mirrors Angular add-knowledge step 4): if the typed name
  // already exists in the industry's tags, just select it; otherwise create a
  // custom tag via the API and select it.
  const addNewTag = async () => {
    const name = newTagName.trim()
    if (!name || !industry || isAddingTag) return

    const normalized = name.toLowerCase()
    const existing = industryTags.find((tag) => tag.name.trim().toLowerCase() === normalized)
    if (existing) {
      if (!selectedTags.some((tag) => tag.id === existing.id)) toggleTag(existing)
      setNewTagName('')
      return
    }

    setIsAddingTag(true)
    try {
      const created = await createSuggestTag(industry.id, name, locale)
      setIndustryTags((previous) => [created, ...previous])
      setSelectedTags((previous) => [...previous, created])
      setNewTagName('')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.addTagError)
    } finally {
      setIsAddingTag(false)
    }
  }

  const handleIndustrySelect = (option: IndustryOption) => {
    if (option.id !== industry?.id) {
      // Tags belong to an industry: reset them on change
      setSelectedTags([])
      setIndustryTags([])
      setNewTagName('')
    }
    setIndustry(option)
    setTouchedFields((previous) => ({ ...previous, industry: true }))
    setDirtyFields((previous) => ({ ...previous, industry: true }))
  }

  // Load suggested tags once an industry is chosen on step 2. Tags reset to []
  // on industry change (see handleIndustrySelect), which retriggers this fetch.
  useEffect(() => {
    if (step !== 2 || !industry || industryTags.length > 0) return

    let cancelled = false
    setIsLoadingTags(true)
    fetchIndustryTags(industry.id, locale)
      .then((tags) => {
        if (!cancelled) setIndustryTags(tags)
      })
      .catch(() => {
        if (!cancelled) setIndustryTags([])
      })
      .finally(() => {
        if (!cancelled) setIsLoadingTags(false)
      })

    return () => {
      cancelled = true
    }
  }, [step, industry, industryTags.length, locale])

  // --- Step navigation ---

  // The compose step (step 1) owns the body and media; it must be valid before
  // the author can move on to categorizing the post.
  const focusStep1Field = (missingVideo: boolean) => {
    window.requestAnimationFrame(() => {
      if (missingVideo) {
        ;(videoSelectButtonRef.current ?? videoFieldRef.current)?.focus()
      } else {
        bodyInputRef.current?.focus()
      }
    })
  }

  const handleNext = () => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return

    const missingVideo = isVideoFlow && videoPhase !== 'ready'
    const missingBody = body.trim() === ''

    setTouchedFields((previous) => ({ ...previous, video: isVideoFlow, body: true }))
    setDirtyFields((previous) => ({ ...previous, video: isVideoFlow, body: true }))

    if (missingVideo || missingBody) {
      focusStep1Field(missingVideo)
      return
    }

    setStep(2)
  }

  // --- Publish ---

  const handlePublish = async () => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return

    const missingIndustry = industry === null
    const missingVideo = isVideoFlow && videoPhase !== 'ready'
    const missingBody = body.trim() === ''

    setTouchedFields({ industry: true, video: isVideoFlow, body: true })
    setDirtyFields({ industry: true, video: isVideoFlow, body: true })

    if (missingIndustry || missingVideo || missingBody || !industry) {
      // Body/media live on step 1; industry lives on step 2. Send the author to
      // the step that holds the first missing field.
      if (missingBody || missingVideo) {
        setStep(1)
        focusStep1Field(missingVideo)
      } else {
        setStep(2)
        window.requestAnimationFrame(() => industryButtonRef.current?.focus())
      }
      return
    }

    setIsPublishing(true)
    try {
      const payload = {
        body: body.trim(),
        industryId: industry.id,
        tags: selectedTags.map((tag) => tag.id),
        relatedInsights: relatedInsights.map((item) => item.id),
      }

      if (isVideoFlow && videoUuidRef.current) {
        await publishVideoPost(videoUuidRef.current, payload, locale)
      } else {
        await publishImageTextPost(
          {
            ...payload,
            media: images.flatMap((image, index) =>
              image.file ? [{ file: image.file, sortOrder: index }] : [],
            ),
          },
          locale,
          draft?.media_type === 'video' ? undefined : draft?.uuid,
        )
      }

      toast.success(copy.publishedToast)
      onPublished()
      onClose()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.videoUploadFailed)
    } finally {
      setIsPublishing(false)
    }
  }

  // Validate the required fields and persist the draft. Returns the saved draft,
  // or null if validation failed / the save errored (callers decide what to do
  // next: close the modal, or redirect to publishing). Shared by "Save draft"
  // and the "Save and start publish" empty-state CTA.
  const persistDraft = async (): Promise<FeedItem | null> => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return null

    const missingIndustry = industry === null
    const missingVideo = isVideoFlow && videoUuidRef.current === null
    const missingBody = body.trim() === ''

    setTouchedFields({ industry: true, video: isVideoFlow, body: true })
    setDirtyFields({ industry: true, video: isVideoFlow, body: true })

    if (missingIndustry || missingVideo || missingBody || !industry) {
      if (missingBody || missingVideo) {
        setStep(1)
        focusStep1Field(missingVideo)
      } else {
        setStep(2)
        window.requestAnimationFrame(() => industryButtonRef.current?.focus())
      }
      return null
    }

    setIsSavingDraft(true)
    try {
      const payload = {
        body: body.trim(),
        industryId: industry.id,
        tags: selectedTags.map((tag) => tag.id),
        relatedInsights: relatedInsights.map((item) => item.id),
      }

      if (isVideoFlow && videoUuidRef.current) {
        await saveVideoPostDraft(videoUuidRef.current, payload, locale)
      } else {
        await saveImageTextPostDraft(
          {
            ...payload,
            media: images.flatMap((image, index) =>
              image.file ? [{ file: image.file, sortOrder: index }] : [],
            ),
          },
          locale,
          draft?.media_type === 'video' ? undefined : draft?.uuid,
        )
      }

      const savedDraft = await getFeedDraft(locale)
      if (!savedDraft) throw new Error(copy.draftSaveFailed)
      return savedDraft
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.draftSaveFailed)
      return null
    } finally {
      setIsSavingDraft(false)
    }
  }

  const handleSaveDraft = async () => {
    const savedDraft = await persistDraft()
    if (!savedDraft) return
    toast.success(copy.draftSaved)
    onDraftSaved(savedDraft)
  }

  // Empty-library CTA: save the post as a draft, then send the user to the
  // knowledge stepper. The stepper redirects back to this feed with
  // ?attach_knowledge=<id> so we can reopen the composer and attach the new
  // item automatically (handled in FeedComposer + the auto-attach effect below).
  const handlePublishNewKnowledge = async () => {
    const savedDraft = await persistDraft()
    if (!savedDraft) return

    onDraftSaved(savedDraft)
    toast.success(copy.draftSavedRedirecting)

    // Come back to exactly the page the composer lives on; the stepper appends
    // the published knowledge id to this URL.
    const returnUrl = `${window.location.origin}${window.location.pathname}`
    const stepperUrl =
      `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/app/add-knowledge/stepper` +
      `?return_url=${encodeURIComponent(returnUrl)}`
    window.location.href = stepperUrl
  }

  // On return from publishing a new knowledge item, fetch it and attach it to the
  // post automatically. Guarded by a ref so it runs once per id even before the
  // parent clears it.
  const autoAttachedIdRef = useRef<number | null>(null)
  useEffect(() => {
    if (!opened || !autoAttachKnowledgeId) return
    if (autoAttachedIdRef.current === autoAttachKnowledgeId) return
    autoAttachedIdRef.current = autoAttachKnowledgeId

    let cancelled = false
    void (async () => {
      try {
        const item = await fetchLibraryKnowledgeById(autoAttachKnowledgeId, locale)
        if (cancelled) return
        if (item) {
          setRelatedInsights((previous) =>
            previous.some((entry) => entry.id === item.id) || previous.length >= 3
              ? previous
              : [...previous, item],
          )
          toast.success(copy.newKnowledgeAttached)
        } else {
          toast.error(copy.newKnowledgeMissing)
        }
      } catch {
        if (!cancelled) toast.error(copy.newKnowledgeMissing)
      } finally {
        if (!cancelled) onAutoAttachHandled?.()
      }
    })()

    return () => {
      cancelled = true
    }
  }, [opened, autoAttachKnowledgeId, locale, copy, toast, onAutoAttachHandled])

  const handleDiscardDraft = async () => {
    if (!draft || isPublishing || isSavingDraft || isDiscardingDraft) return

    setIsDiscardingDraft(true)
    try {
      await deleteFeedItem(draft.uuid, locale)
      toast.success(copy.draftDiscarded)
      setDiscardConfirmOpened(false)
      onDraftDiscarded()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.draftDiscardFailed)
    } finally {
      setIsDiscardingDraft(false)
    }
  }

  const footerIconClass =
    'flex h-9 w-9 items-center justify-center rounded-md text-[#5A6B84] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]'

  const title = isVideoFlow ? copy.titleVideo : copy.titlePost

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        size={640}
        radius={8}
        centered
        zIndex={300}
        withCloseButton={false}
        aria-labelledby="feed-post-dialog-title"
        styles={{
          content: { boxShadow: 'none', border: '1px solid #DCE4EF' },
          body: { position: 'relative' },
        }}
      >
        <h2 id="feed-post-dialog-title" className="sr-only">
          {title}
        </h2>
        <button
          type="button"
          aria-label={copy.close}
          onClick={onClose}
          className="absolute end-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-md text-[#5A6472] transition-colors hover:bg-[#F3F6FB] hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
        >
          <IconX aria-hidden className="h-5 w-5" stroke={1.8} />
        </button>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            void handlePublish()
          }}
        >
          {/* Author + step indicator */}
          <div className="flex items-center gap-3 pe-12">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E0ECFB] text-[13px] font-bold text-[#1D74E0]">
              {user?.profile_photo_url ? (
                <Image
                  src={user.profile_photo_url}
                  alt={fullName}
                  width={44}
                  height={44}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-bold text-[#0B1220]">{fullName}</div>
              <div className="mt-0.5 truncate text-[12.5px] font-medium text-[#5A6B84]">
                {step === 1 ? copy.step1Label : copy.step2Label}
              </div>
            </div>
          </div>

        {/* ===== Step 1: write your post ===== */}
        <div className={step === 1 ? undefined : 'hidden'}>
        {/* Body: hidden until video upload allows editing, avoiding an empty locked area */}
        {!bodyLocked && (
          <div className="mt-4">
            <label htmlFor="feed-post-body" className="sr-only">
              {copy.description}
            </label>
            <textarea
              ref={bodyInputRef}
              id="feed-post-body"
              name="body"
              required
              value={body}
              onChange={(event) => {
                setBody(event.currentTarget.value)
                setDirtyFields((previous) => ({ ...previous, body: true }))
              }}
              onBlur={() => setTouchedFields((previous) => ({ ...previous, body: true }))}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              aria-invalid={bodyInvalid || undefined}
              aria-describedby={bodyInvalid ? 'feed-post-body-error' : undefined}
              data-dirty={dirtyFields.body || undefined}
              placeholder={copy.bodyPlaceholder}
              rows={isVideoFlow ? 5 : 7}
              className={`w-full resize-none rounded-md border bg-white px-3 py-2.5 text-[15px] leading-relaxed text-[#1C2433] placeholder:text-[#94A3B8] focus-visible:outline-none ${
                bodyInvalid
                  ? 'border-[#C23B32]'
                  : 'border-[#E5EAF2] focus-visible:border-[#8FB9EA]'
              }`}
            />
            {bodyInvalid && (
              <p id="feed-post-body-error" className="mt-1.5 text-[12px] font-medium text-[#A9322B]">
                {copy.bodyRequired}
              </p>
            )}
          </div>
        )}

        {/* Video area */}
        {isVideoFlow && (
          <div
            ref={videoFieldRef}
            tabIndex={-1}
            aria-invalid={videoInvalid || undefined}
            aria-describedby={videoInvalid ? 'feed-post-video-error' : undefined}
            data-dirty={dirtyFields.video || undefined}
            className="mt-4 focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
          >
            {videoPhase === 'none' || videoPhase === 'error' ? (
              <div className="flex flex-col items-center rounded-md border border-dashed border-[#C9DCF6] bg-[#F8FAFD] px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#EDF3FC]">
                  <IconVideo aria-hidden stroke={1.6} className="h-6 w-6 text-[#1D74E0]" />
                </div>
                <h3 className="mt-4 text-[17px] font-bold text-[#0B1220]">{copy.uploadTitle}</h3>
                <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-6 text-[#64748B]">
                  {copy.uploadHint}
                </p>
                <button
                  ref={videoSelectButtonRef}
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  aria-invalid={videoInvalid || undefined}
                  aria-describedby={videoInvalid ? 'feed-post-video-error' : undefined}
                  data-dirty={dirtyFields.video || undefined}
                  className="mt-5 min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
                >
                  {copy.selectVideo}
                </button>
              </div>
            ) : (
              <div className="rounded-md border border-[#E5EAF2] p-4">
                {videoPhase === 'ready' && videoPlaybackId && (
                  <div className="mb-3 flex max-h-[480px] justify-center overflow-hidden rounded-md bg-black">
                    <mux-player
                      playback-id={videoPlaybackId}
                      stream-type="on-demand"
                      metadata-video-title={videoFileName}
                      accent-color="#1D74E0"
                      disable-tracking=""
                      style={{ width: '100%', maxHeight: '480px', display: 'block' }}
                    />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  {!(videoPhase === 'ready' && videoPlaybackId) && (
                    <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-[#0B1220]">
                      <IconVideo aria-hidden stroke={1.6} className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14.5px] font-semibold text-[#0B1220]">
                      {videoFileName}
                    </div>
                    <div
                      role="status"
                      aria-live="polite"
                      className="mt-0.5 flex items-center gap-1.5 text-[13px] text-[#5A6B84]"
                    >
                      {videoPhase === 'ready' ? (
                        <>
                          <IconCircleCheck aria-hidden stroke={1.8} className="h-4 w-4 text-[#1BC653]" />
                          {copy.uploadComplete}
                        </>
                      ) : videoPhase === 'processing' ? (
                        copy.uploadedProcessing
                      ) : videoPhase === 'stalled' ? (
                        copy.stalled
                      ) : (
                        `${copy.uploading} ${uploadPercent}%`
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={cancelOrRemoveVideo}
                    className="min-h-10 shrink-0 px-1 text-[14px] font-medium text-[#5A6B84] transition-colors hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
                  >
                    {videoPhase === 'uploading' || videoPhase === 'initializing'
                      ? copy.cancel
                      : copy.remove}
                  </button>
                </div>
                {(videoPhase === 'uploading' || videoPhase === 'initializing') && (
                  <Progress value={uploadPercent} size={6} radius="xl" color="#1D74E0" className="mt-3" />
                )}
                {videoPhase === 'processing' && (
                  <>
                    <Progress value={100} size={6} radius="xl" color="#1D74E0" striped animated className="mt-3" />
                    <p className="mt-2.5 text-[12.5px] leading-5 text-[#64748B]">
                      {copy.processingHint}
                    </p>
                  </>
                )}
                {videoPhase === 'stalled' && (
                  <div className="mt-3 rounded-md border border-[#F0DCA8] bg-[#FEFAF0] p-3">
                    <p className="text-[12.5px] leading-5 text-[#7A5B14]">{copy.stalledHint}</p>
                    <button
                      type="button"
                      onClick={recheckProcessingStatus}
                      className="mt-2.5 min-h-10 rounded-md border border-[#C9DCF6] px-4 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
                    >
                      {copy.checkAgain}
                    </button>
                  </div>
                )}
              </div>
            )}
            {videoInvalid && (
              <p id="feed-post-video-error" className="mt-2 text-[12px] font-medium text-[#A9322B]">
                {videoErrorMessage}
              </p>
            )}
          </div>
        )}

        {/* Image previews with sorting */}
        {hasImages && (
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image.previewUrl}
                className="group relative aspect-square overflow-hidden rounded-md border border-[#E5EAF2]"
              >
                <Image
                  src={image.previewUrl}
                  alt={image.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {image.file && (
                <div className="absolute inset-0 hidden items-center justify-center gap-1 bg-black/45 group-hover:flex">
                  <button
                    type="button"
                    aria-label="Move earlier"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#0B1220] disabled:opacity-40"
                  >
                    {isArabic ? '→' : '←'}
                  </button>
                  <button
                    type="button"
                    aria-label="Remove image"
                    onClick={() => removeImage(index)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#E8513E]"
                  >
                    <IconX aria-hidden className="h-4 w-4" stroke={2} />
                  </button>
                  <button
                    type="button"
                    aria-label="Move later"
                    onClick={() => moveImage(index, 1)}
                    disabled={index === images.length - 1}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-[#0B1220] disabled:opacity-40"
                  >
                    {isArabic ? '←' : '→'}
                  </button>
                </div>
                )}
                <span className="absolute bottom-1 start-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Attached library documents */}
        {relatedInsights.length > 0 && (
          <div className="mt-2 space-y-2">
            {relatedInsights.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-md border border-[#E5EAF2] bg-[#FAFCFE] px-3.5 py-2.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EDF3FC]">
                  <IconFileDescription aria-hidden stroke={1.6} className="h-4 w-4 text-[#1D74E0]" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#0B1220]">
                  {item.title}
                </span>
                <button
                  type="button"
                  aria-label={copy.remove}
                  onClick={() =>
                    setRelatedInsights((previous) => previous.filter((i) => i.id !== item.id))
                  }
                  className="shrink-0 text-[#94A3B8] transition-colors hover:text-[#0B1220]"
                >
                  <IconX aria-hidden className="h-4 w-4" stroke={1.8} />
                </button>
              </div>
            ))}
          </div>
        )}
        </div>
        {/* ===== End step 1 ===== */}

        {/* ===== Step 2: categorize (industry + tags) ===== */}
        {step === 2 && (
          <div className="mt-4">
            <IndustryField
              locale={locale}
              value={industry}
              invalid={industryInvalid}
              errorId="feed-post-industry-error"
              buttonRef={industryButtonRef}
              onSelect={handleIndustrySelect}
              onBlur={() =>
                setTouchedFields((previous) => ({ ...previous, industry: true }))
              }
            />
            {industryInvalid && (
              <p id="feed-post-industry-error" className="mt-1.5 text-[12px] font-medium text-[#A9322B]">
                {copy.industryRequired}
              </p>
            )}
          </div>
        )}

        {/* Tags: only surfaced once an industry is chosen */}
        {step === 2 && industry && (
          <>
            {selectedTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF3FC] px-3 py-1.5 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#E0ECFB]"
                  >
                    #{tag.name}
                    <IconX aria-hidden className="h-3.5 w-3.5" stroke={2} />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-3 rounded-md border border-[#E5EAF2] bg-[#FAFCFE] p-4">
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] font-semibold uppercase tracking-wide text-[#5A6B84]">
                  {copy.suggestedTags}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#FF8A3D] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-white">
                  {copy.optionalBadge}
                </span>
              </div>

              {/* Add a custom tag (mirrors Angular add-knowledge step 4) */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(event) => setNewTagName(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      addNewTag()
                    }
                  }}
                  placeholder={copy.addTagPlaceholder}
                  className="h-10 min-w-0 flex-1 rounded-md border border-[#D6E0EC] bg-white px-3 text-[13.5px] text-[#1C2433] transition-colors placeholder:text-[#94A3B8] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
                />
                <button
                  type="button"
                  onClick={addNewTag}
                  disabled={!newTagName.trim() || isAddingTag}
                  className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-[#1D74E0] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1A67C8] disabled:opacity-50"
                >
                  {isAddingTag ? (
                    <IconLoader2 aria-hidden className="h-4 w-4 animate-spin" stroke={2} />
                  ) : (
                    <IconPlus aria-hidden className="h-4 w-4" stroke={2.2} />
                  )}
                  {copy.addTag}
                </button>
              </div>
              <p className="mt-2 text-[12px] text-[#94A3B8]">{copy.addTagHint}</p>

            <div className="mt-3 flex max-h-48 flex-wrap gap-2 overflow-y-auto">
              {isLoadingTags ? (
                <span className="text-[13px] text-[#94A3B8]">…</span>
              ) : industryTags.length === 0 ? (
                <span className="text-[13px] text-[#94A3B8]">{copy.noTags}</span>
              ) : (
                industryTags.map((tag) => {
                  const isSelected = selectedTags.some((selected) => selected.id === tag.id)
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-3.5 py-1.5 text-[13.5px] transition-colors ${
                        isSelected
                          ? 'border-[#1D74E0] font-medium text-[#1D74E0]'
                          : 'border-[#E5EAF2] bg-white text-[#5A6B84] hover:border-[#C9DCF6]'
                      }`}
                    >
                      #{tag.name}
                    </button>
                  )
                })
              )}
            </div>
              <p className="mt-3 text-[12.5px] text-[#94A3B8]">{copy.tagsHint}</p>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF1F7] pt-3.5">
          <div className="flex min-w-0 items-center gap-1">
            {draft && (
              <button
                type="button"
                onClick={() => setDiscardConfirmOpened(true)}
                disabled={isPublishing || isSavingDraft || isDiscardingDraft}
                className="me-1 inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-[#B53B32] transition-colors hover:bg-[#FFF3F1] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#E9A39C] disabled:opacity-50"
              >
                <IconTrash aria-hidden className="h-4 w-4" stroke={1.8} />
                <span className="hidden sm:inline">{copy.discardDraft}</span>
              </button>
            )}
            {step === 1 ? (
              <>
                {!isVideoFlow && !hasVideo && (
                  <button
                    type="button"
                    aria-label="Add images"
                    onClick={() => imageInputRef.current?.click()}
                    className={footerIconClass}
                  >
                    <IconPhoto aria-hidden stroke={1.7} className="h-5 w-5 text-[#1EAB5A]" />
                  </button>
                )}
                {mode === 'post' && !hasImages && !hasVideo && (
                  <button
                    type="button"
                    aria-label="Add video"
                    onClick={() => videoInputRef.current?.click()}
                    className={footerIconClass}
                  >
                    <IconVideo aria-hidden stroke={1.7} className="h-5 w-5 text-[#E8513E]" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setLibraryDrawerOpened(true)}
                  className={`flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[14px] font-medium transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ${
                    relatedInsights.length > 0
                      ? 'bg-[#EDF3FC] text-[#1D74E0]'
                      : 'text-[#5A6B84] hover:bg-[#F3F6FB]'
                  }`}
                >
                  <IconFolderOpen aria-hidden stroke={1.7} className="h-4.5 w-4.5" />
                  <span className="hidden sm:inline">{copy.shareFromLibrary}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isPublishing || isSavingDraft || isDiscardingDraft}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 text-[14px] font-medium text-[#5A6B84] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:opacity-50"
              >
                {isArabic ? (
                  <IconChevronRight aria-hidden className="h-4 w-4" stroke={2} />
                ) : (
                  <IconChevronLeft aria-hidden className="h-4 w-4" stroke={2} />
                )}
                {copy.back}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {step === 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isPublishing || isSavingDraft || isDiscardingDraft}
                className="min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-not-allowed disabled:bg-[#93B9E8]"
              >
                {copy.next}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => void handleSaveDraft()}
                  disabled={isPublishing || isSavingDraft || isDiscardingDraft}
                  aria-busy={isSavingDraft}
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#C9DCF6] bg-white px-4 py-2.5 text-[14px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:opacity-55"
                >
                  {isSavingDraft && (
                    <IconLoader2 aria-hidden className="me-1.5 h-4 w-4 animate-spin" stroke={2} />
                  )}
                  {isSavingDraft ? copy.savingDraft : copy.saveDraft}
                </button>
                <button
                  type="submit"
                  disabled={isPublishing || isSavingDraft || isDiscardingDraft}
                  aria-busy={isPublishing}
                  className="min-h-10 rounded-md bg-[#1D74E0] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:bg-[#93B9E8]"
                >
                  {isPublishing ? copy.publishing : copy.publish}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Hidden inputs */}
        <input
          ref={videoInputRef}
          type="file"
          aria-label={copy.selectVideo}
          accept="video/mp4,video/quicktime,.mp4,.mov"
          className="hidden"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0]
            event.currentTarget.value = ''
            if (file) startVideoUpload(file)
          }}
        />
        <input
          ref={imageInputRef}
          type="file"
          aria-label={isArabic ? 'إضافة صور' : 'Add images'}
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            addImages(event.currentTarget.files)
            event.currentTarget.value = ''
          }}
        />
        </form>
      </Modal>

      <Modal
        opened={discardConfirmOpened}
        onClose={() => {
          if (!isDiscardingDraft) setDiscardConfirmOpened(false)
        }}
        title={copy.discardTitle}
        centered
        size="sm"
        radius={8}
        zIndex={500}
      >
        <p className="text-[14px] leading-6 text-[#5D6D89]">{copy.discardDescription}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setDiscardConfirmOpened(false)}
            disabled={isDiscardingDraft}
            className="min-h-10 rounded-md border border-[#DCE4EF] px-4 text-[14px] font-medium text-[#5D6D89] transition-colors hover:bg-[#F7F9FC] disabled:opacity-50"
          >
            {copy.keepEditing}
          </button>
          <button
            type="button"
            onClick={() => void handleDiscardDraft()}
            disabled={isDiscardingDraft}
            className="inline-flex min-h-10 items-center rounded-md bg-[#C23B32] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#A9322B] disabled:cursor-wait disabled:opacity-60"
          >
            {isDiscardingDraft && (
              <IconLoader2 aria-hidden className="me-1.5 h-4 w-4 animate-spin" stroke={2} />
            )}
            {isDiscardingDraft ? copy.discarding : copy.discardDraft}
          </button>
        </div>
      </Modal>

      <KnowledgeLibraryDrawer
        locale={locale}
        opened={libraryDrawerOpened}
        selected={relatedInsights}
        onClose={() => setLibraryDrawerOpened(false)}
        onConfirm={(items) => {
          setRelatedInsights(items)
          setLibraryDrawerOpened(false)
        }}
        onPublishNew={() => {
          setLibraryDrawerOpened(false)
          void handlePublishNewKnowledge()
        }}
      />
    </>
  )
}
