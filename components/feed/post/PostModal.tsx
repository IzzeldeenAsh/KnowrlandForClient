'use client'

import { Modal, Progress } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconFileDescription,
  IconLink,
  IconLoader2,
  IconPhoto,
  IconPlus,
  IconTrash,
  IconVideo,
  IconX,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useEditor } from '@tiptap/react'
// Registers the <mux-player> custom element; self-hosted via npm (no CSP
// script-src change needed, unlike the CDN <script> embed Mux's docs default to).
import '@mux/mux-player'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import PublishAsSelector, { type PublishAuthorType } from '../PublishAsSelector'
import {
  checkVideoUploadStatus,
  deleteFeedItem,
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
import ImageCropEditor from './ImageCropEditor'
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES } from './imageExport'
import { contentFingerprint, richTextToPlainText } from './postContent'
import { type IndustryOption } from './IndustrySelectModal'
import KnowledgeLibraryDrawer from './KnowledgeLibraryDrawer'
import EmojiPicker from './EmojiPicker'
import { AutoDirection } from './autoDirection'
import TextEditIcon from '@/components/icons/TextEditIcon'
import TagSelector from '../TagSelector'
import type { PublishedPostSummary } from '../PublishSuccessModal'

export type PostModalMode = 'post' | 'video' | 'image'

type PostModalProps = {
  locale: string
  mode: PostModalMode
  opened: boolean
  draft: FeedItem | null
  onClose: () => void
  onDraftSaved: (draft: FeedItem) => void
  onDraftDiscarded: () => void
  onPublished: (publication: PublishedPostSummary) => void
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
const MAX_VIDEO_SECONDS = 10 * 60
const PROCESSING_POLL_MS = 3000
const PROCESSING_TIMEOUT_MS = 2 * 60 * 1000

const copyByLocale = {
  en: {
    titlePost: 'Create a post',
    titleVideo: 'Create a video post',
    titleImage: 'Create an image post',
    editPost: 'Edit post',
    close: 'Close post composer',
    selectIndustry: 'Select industry',
    step1Label: 'Step 1 · Write your post',
    step2Label: 'Step 2 · Categorize',
    step3Label: 'Final step · Choose publisher',
    publishAsTitle: 'Post as',
    choosePublisher: 'Choose a publisher before continuing.',
    next: 'Next',
    back: 'Back',
    description: 'Post description',
    bodyPlaceholder: 'Share your insights...',
    uploadTitle: 'Upload your video',
    uploadHint: 'MP4 or MOV · up to 10 minutes · up to 5 GB per video. Videos are processed for playback after upload.',
    selectVideo: 'Select video',
    imageUploadTitle: 'Upload your images',
    imageUploadHint: 'JPG, PNG, or GIF · up to 5 MB per image · up to 20 images. Cropped images are automatically optimized to fit the limit.',
    selectImages: 'Select images',
    addImages: 'Add more images',
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
    suggestedTags: 'Tags',
    optionalBadge: 'Optional',
    tagsHint: 'Tags are optional — they help the right experts find your insight.',
    noTags: 'No tags available yet.',
    addTagPlaceholder: 'Search or initiate a new tag',
    addTag: 'Add',
    addTagHint: 'Press Enter to create a new tag.',
    addTagError: 'Unable to add the tag.',
    shareFromLibrary: 'Attach from Insighta library',
    formatting: 'Formatting options',
    emoji: 'Insert emoji',
    publish: 'Post',
    publishing: 'Publishing…',
    saveChanges: 'Save changes',
    savingChanges: 'Saving…',
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
    exitTitle: 'Save this post as a draft?',
    exitDescription: 'The post you started will be here when you return.',
    exitDiscard: 'Discard',
    exitSaveDraft: 'Save as draft',
    exitSaveBlocked: 'Your draft could not be saved. Please try again.',
    editExitTitle: 'Discard your changes?',
    editExitDescription: 'The edits you made to this post will be lost.',
    discardChanges: 'Discard changes',
    exitUploadingTitle: 'Leave while your video uploads?',
    exitUploadingDescription: 'Your video has not finished uploading. Leaving now cancels it.',
    discarding: 'Discarding…',
    draftDiscarded: 'Your draft has been discarded.',
    draftDiscardFailed: 'Unable to discard your draft.',
    savedVideo: 'Saved video',
    publishedToast: 'Your post has been published.',
    updatedToast: 'Your post has been updated.',
    videoTooLarge: 'This video exceeds 5 GB. Choose a smaller file and try again.',
    imageWrongType: (name: string) => `“${name}” is not a supported image. Choose a JPG, PNG, or GIF file.`,
    emptyDraft: 'Add text, an image, a video, or a library item before saving a draft.',
    uploadBeforeLeaving: 'Wait for the video upload to finish, or remove it before opening publishing.',
    videoTooLong: 'The video must be 10 minutes or shorter.',
    videoWrongType: 'Only MP4 or MOV videos are supported.',
    imageTooLarge: (name: string) => `"${name}" is larger than 5MB and was skipped.`,
    tooManyImages: `You can attach up to ${MAX_IMAGES} images.`,
    replacingSavedImages: 'New images will replace the images saved in this draft.',
    mediaLocked: 'Published media cannot be changed.',
    videoUploadFailed: 'Video upload failed. Please try again.',
    publishFailed: 'Your post could not be published. Please try again.',
    industryFirst: 'Select an industry first',
    industryRequired: 'Select an industry.',
    videoRequired: 'Select and finish uploading a video.',
    videoStillProcessing: 'Your video is still being prepared — you can publish as soon as it is ready.',
    bodyRequired: 'Write a description for your post.',
  },
  ar: {
    titlePost: 'إنشاء منشور',
    titleVideo: 'إنشاء منشور فيديو',
    titleImage: 'إنشاء منشور صور',
    editPost: 'تعديل المنشور',
    close: 'إغلاق محرر المنشور',
    selectIndustry: 'اختر المجال',
    step1Label: 'الخطوة 1 · اكتب منشورك',
    step2Label: 'الخطوة 2 · التصنيف',
    step3Label: 'الخطوة الأخيرة · اختر الناشر',
    publishAsTitle: 'النشر باسم',
    choosePublisher: 'اختر هوية الناشر قبل المتابعة.',
    next: 'التالي',
    back: 'رجوع',
    description: 'وصف المنشور',
    bodyPlaceholder: 'شارك معرفة أو رؤية أو فكرة مفيدة',
    uploadTitle: 'ارفع الفيديو',
    uploadHint: 'MP4 أو MOV · حتى 10 دقائق · حتى 5 جيجابايت للفيديو. نجهّز الفيديو للتشغيل بعد رفعه.',
    selectVideo: 'اختر فيديو',
    imageUploadTitle: 'ارفع الصور',
    imageUploadHint: 'JPG أو PNG أو GIF · حتى 5 ميجابايت للصورة · حتى 20 صورة. نحسّن الصور بعد الاقتصاص تلقائياً لتناسب الحد المسموح.',
    selectImages: 'اختر صوراً',
    addImages: 'إضافة المزيد من الصور',
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
    suggestedTags: 'الوسوم',
    optionalBadge: 'اختياري',
    tagsHint: 'الوسوم اختيارية — تساعد الخبراء المناسبين في العثور على رؤيتك.',
    noTags: 'لا توجد وسوم متاحة بعد.',
    addTagPlaceholder: 'ابحث أو أضف وسمًا جديدًا',
    addTag: 'إضافة',
    addTagHint: 'اضغط Enter لإضافة وسم جديد.',
    addTagError: 'تعذر إضافة الوسم.',
    shareFromLibrary: 'مشاركة من المكتبة',
    formatting: 'خيارات التنسيق',
    emoji: 'إدراج رمز تعبيري',
    publish: 'نشر',
    publishing: 'جارٍ النشر…',
    saveChanges: 'حفظ التعديلات',
    savingChanges: 'جارٍ الحفظ…',
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
    exitTitle: 'حفظ المنشور كمسودة؟',
    exitDescription: 'سيكون المنشور الذي بدأته بانتظارك عند عودتك.',
    exitDiscard: 'تجاهل',
    exitSaveDraft: 'حفظ كمسودة',
    exitSaveBlocked: 'تعذر حفظ المسودة. حاول مجدداً.',
    editExitTitle: 'تجاهل التعديلات؟',
    editExitDescription: 'ستفقد التعديلات التي أجريتها على هذا المنشور.',
    discardChanges: 'تجاهل التعديلات',
    exitUploadingTitle: 'المغادرة أثناء رفع الفيديو؟',
    exitUploadingDescription: 'لم يكتمل رفع الفيديو بعد. المغادرة الآن ستُلغيه.',
    discarding: 'جارٍ الحذف…',
    draftDiscarded: 'تم حذف المسودة.',
    draftDiscardFailed: 'تعذر حذف المسودة.',
    savedVideo: 'فيديو محفوظ',
    publishedToast: 'تم نشر منشورك.',
    updatedToast: 'تم تحديث منشورك.',
    videoTooLarge: 'حجم الفيديو يتجاوز 5 جيجابايت. اختر ملفاً أصغر وحاول مجدداً.',
    imageWrongType: (name: string) => `صيغة الصورة «${name}» غير مدعومة. اختر ملف JPG أو PNG أو GIF.`,
    emptyDraft: 'أضف نصاً أو صورة أو فيديو أو عنصراً من المكتبة قبل حفظ المسودة.',
    uploadBeforeLeaving: 'انتظر اكتمال رفع الفيديو أو أزله قبل الانتقال إلى النشر.',
    videoTooLong: 'يجب ألا تتجاوز مدة الفيديو 10 دقائق.',
    videoWrongType: 'يدعم النظام فيديوهات MP4 أو MOV فقط.',
    imageTooLarge: (name: string) => `تم تخطي "${name}" لأن حجمه أكبر من 5 ميجابايت.`,
    tooManyImages: `يمكنك إرفاق حتى ${MAX_IMAGES} صورة.`,
    replacingSavedImages: 'ستحل الصور الجديدة محل الصور المحفوظة في هذه المسودة.',
    mediaLocked: 'لا يمكن تغيير وسائط المنشور بعد نشره.',
    videoUploadFailed: 'فشل رفع الفيديو. حاول مرة أخرى.',
    publishFailed: 'تعذر نشر المنشور. حاول مجدداً.',
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

const EMPTY_FINGERPRINT = contentFingerprint({
  body: '',
  industryId: null,
  tagIds: [],
  insightIds: [],
  imageKeys: [],
  videoFileName: '',
})

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
  const isEditingPublished = draft?.status === 'published'
  const toast = useToast()
  const { user, roles } = useUserProfile()
  const usesCompanyLibrary = roles.includes('company')

  // --- Post content state ---
  // Two-step flow: 1 = write the post, 2 = categorize (industry + tags)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [authorType, setAuthorType] = useState<PublishAuthorType | null>(null)
  const [body, setBody] = useState('')
  const [industry, setIndustry] = useState<IndustryOption | null>(null)
  const [selectedTags, setSelectedTags] = useState<FeedTag[]>([])
  const [relatedInsights, setRelatedInsights] = useState<LibraryKnowledgeItem[]>([])
  const [images, setImages] = useState<SelectedImage[]>([])
  const [imageCropQueue, setImageCropQueue] = useState<File[]>([])
  const [imageCropBatchTotal, setImageCropBatchTotal] = useState(0)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [isDiscardingDraft, setIsDiscardingDraft] = useState(false)
  const [discardConfirmOpened, setDiscardConfirmOpened] = useState(false)
  const [exitConfirmOpened, setExitConfirmOpened] = useState(false)
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
  const [composerError, setComposerError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<string[]>([])
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null)
  const [formattingOpen, setFormattingOpen] = useState(false)
  const formattingToggledRef = useRef(false)

  // --- Video state ---
  const [videoPhase, setVideoPhase] = useState<VideoPhase>('none')
  const [videoFileName, setVideoFileName] = useState('')
  const [uploadPercent, setUploadPercent] = useState(0)
  // Only available once Mux's webhook has fired (video.asset.ready) and the
  // backend has persisted it — see MuxWebhookService::mergeMuxAssetData.
  const [videoPlaybackId, setVideoPlaybackId] = useState<string | null>(null)
  const videoUuidRef = useRef<string | null>(null)
  // What the composer looked like when it opened — empty for a new post, the
  // saved draft/post for an edit. Anything else means unsaved work.
  const baselineFingerprintRef = useRef<string>(EMPTY_FINGERPRINT)
  const abortUploadRef = useRef<(() => void) | null>(null)
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const replaceSavedImagesRef = useRef(false)

  const videoInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const industryButtonRef = useRef<HTMLButtonElement>(null)
  const videoSelectButtonRef = useRef<HTMLButtonElement>(null)
  const videoFieldRef = useRef<HTMLDivElement>(null)
  const bodyFieldRef = useRef<HTMLDivElement>(null)
  const imageFieldRef = useRef<HTMLDivElement>(null)

  // The toolbar mounts above the content, so a long body can push it out of
  // sight. Bring the editor's top into view whenever it is shown or hidden.
  useEffect(() => {
    if (!formattingToggledRef.current) return
    bodyFieldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [formattingOpen])

  const hasVideo = videoPhase !== 'none'
  const hasImages = images.length > 0
  const isVideoFlow = mode === 'video' || hasVideo
  const isImageFlow = !isVideoFlow && (mode === 'image' || hasImages)
  // The description stays editable while the provider finishes preparing the
  // video, so the wait is never dead time.
  const isAwaitingProcessing = videoPhase === 'processing' || videoPhase === 'stalled'
  const bodyLocked =
    (isVideoFlow && !isAwaitingProcessing && videoPhase !== 'ready') ||
    (isImageFlow && !hasImages)

  const bodyEditor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
      }),
      Underline,
      TextAlign.configure({ types: ['paragraph'] }),
      AutoDirection,
      LinkExtension.configure({ autolink: true, openOnClick: false, defaultProtocol: 'https' }),
      Placeholder.configure({ placeholder: copy.bodyPlaceholder }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML())
      setDirtyFields((previous) => ({ ...previous, body: true }))
    },
  })

  useEffect(() => {
    if (!bodyEditor || bodyEditor.getHTML() === body) return
    bodyEditor.commands.setContent(body, { emitUpdate: false })
  }, [body, bodyEditor])

  useEffect(() => {
    bodyEditor?.setEditable(!bodyLocked)
  }, [bodyEditor, bodyLocked])

  const industryInvalid = touchedFields.industry && industry === null
  const videoInvalid = touchedFields.video && isVideoFlow && videoPhase !== 'ready'
  // Distinguish "no video yet" from "video uploaded, provider still working":
  // only the first is something the user can act on.
  const videoErrorMessage = isAwaitingProcessing ? copy.videoStillProcessing : copy.videoRequired
  const bodyInvalid = touchedFields.body && richTextToPlainText(body) === ''

  const currentFingerprint = useMemo(
    () =>
      contentFingerprint({
        body,
        industryId: industry?.id ?? null,
        tagIds: selectedTags.map((tag) => tag.id),
        insightIds: relatedInsights.map((item) => item.id),
        imageKeys: images.map((image) => image.previewUrl),
        videoFileName: videoPhase === 'error' && !draft ? '' : videoFileName,
      }),
    [body, industry, selectedTags, relatedInsights, images, videoFileName, videoPhase, draft],
  )
  const hasDraftContent =
    richTextToPlainText(body) !== '' ||
    images.length > 0 ||
    relatedInsights.length > 0 ||
    (videoPhase !== 'none' && videoPhase !== 'error')
  const hasUnsavedChanges = currentFingerprint !== baselineFingerprintRef.current && (!!draft || hasDraftContent)
  // Bytes are still in flight: a draft saved now would point at an incomplete
  // upload, so the exit prompt offers only "discard" or "keep editing".
  const isUploadInFlight = videoPhase === 'initializing' || videoPhase === 'uploading'
  const canSaveAsDraftOnExit = !isEditingPublished && !isUploadInFlight

  const initials = user
    ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || 'I'
    : 'I'
  const fullName = user
    ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.name
    : ''
  const companyName = user?.company?.legal_name?.trim() || ''
  const canChoosePublisher =
    !isEditingPublished &&
    !!companyName &&
    // Company-insighters always publish under their own name, so they skip the
    // publisher step; only the company account itself gets the choice.
    roles.some((role) => role === 'company') &&
    !roles.some((role) => role === 'company-insighter')

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
    setComposerError(null)
    setImageErrors([])
    setVideoUploadError(null)
    setAuthorType(null)
    setBody('')
    setIndustry(null)
    setSelectedTags([])
    setRelatedInsights([])
    setImages((previous) => {
      previous.forEach((image) => {
        if (image.previewUrl.startsWith('blob:')) URL.revokeObjectURL(image.previewUrl)
      })
      return []
    })
    setImageCropQueue([])
    setImageCropBatchTotal(0)
    replaceSavedImagesRef.current = false
    setVideoPhase('none')
    setVideoFileName('')
    setUploadPercent(0)
    setVideoPlaybackId(null)
    videoUuidRef.current = null
    setIsPublishing(false)
    setIsSavingDraft(false)
    setIsDiscardingDraft(false)
    setDiscardConfirmOpened(false)
    setExitConfirmOpened(false)
    baselineFingerprintRef.current = EMPTY_FINGERPRINT
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
    const savedInsights = draft.related_insights.flatMap((item) =>
      typeof item.id === 'number'
        ? [{
            id: item.id,
            type: item.type,
            title: item.title,
            slug: item.slug,
            status: 'published' as const,
            published_at: null,
          }]
        : [],
    )
    setRelatedInsights(savedInsights)
    const savedImages = draft.media
      .filter((item) => item.media_type === 'image' && item.url)
      .map((item) => ({
        file: null,
        name: item.name ?? copy.description,
        previewUrl: item.url as string,
      }))
    setImages(savedImages)

    let savedVideoFileName = ''
    if (draft.media_type === 'video') {
      const media = draft.media.find((item) => item.media_type === 'video')
      videoUuidRef.current = draft.uuid
      savedVideoFileName = media?.name ?? copy.savedVideo
      setVideoFileName(savedVideoFileName)
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

    baselineFingerprintRef.current = contentFingerprint({
      body: draft.body ?? '',
      industryId: draft.industry?.id ?? null,
      tagIds: draft.tags.map((tag) => tag.id),
      insightIds: savedInsights.map((item) => item.id),
      imageKeys: savedImages.map((image) => image.previewUrl),
      videoFileName: savedVideoFileName,
    })
  }, [copy.description, copy.savedVideo, draft, opened, pollProcessingStatus, resetAll])

  const recheckProcessingStatus = () => {
    setVideoPhase('processing')
    pollProcessingStatus(true)
  }

  const startVideoUpload = async (file: File) => {
    if (isEditingPublished) return

    setDirtyFields((previous) => ({ ...previous, video: true }))
    setTouchedFields((previous) => ({ ...previous, video: false }))

    setVideoUploadError(null)
    if (file.size > MAX_VIDEO_BYTES) {
      setVideoUploadError(copy.videoTooLarge)
      return
    }
    if (!isSupportedVideoFile(file)) {
      setVideoUploadError(copy.videoWrongType)
      return
    }

    try {
      const duration = await getVideoDurationSeconds(file)
      if (duration > MAX_VIDEO_SECONDS) {
        setVideoUploadError(copy.videoTooLong)
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
      setVideoUploadError(error instanceof Error ? error.message : copy.videoUploadFailed)
    }
  }

  const cancelOrRemoveVideo = () => {
    if (isEditingPublished) return

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

  const beginImageCrop = (files: FileList | null) => {
    if (isEditingPublished) return
    if (!files || files.length === 0) return

    const hasSavedImages = images.some((image) => image.file === null)
    const accepted: File[] = []
    const errors: string[] = []
    setImageErrors([])
    let remaining = MAX_IMAGES - (hasSavedImages ? 0 : images.length)

    for (const file of Array.from(files)) {
      if (remaining <= 0) {
        errors.push(copy.tooManyImages)
        break
      }
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        errors.push(copy.imageWrongType(file.name))
        continue
      }
      if (file.size > MAX_IMAGE_BYTES) {
        errors.push(copy.imageTooLarge(file.name))
        continue
      }
      accepted.push(file)
      remaining -= 1
    }

    setImageErrors(errors)
    if (accepted.length > 0) {
      replaceSavedImagesRef.current = hasSavedImages
      setImageCropBatchTotal(accepted.length)
      setImageCropQueue(accepted)
    }
  }

  const applyCroppedImage = (file: File) => {
    if (file.size > MAX_IMAGE_BYTES) {
      setImageErrors([copy.imageTooLarge(file.name)])
      return false
    } else {
      const selectedImage: SelectedImage = {
        file,
        name: file.name,
        previewUrl: URL.createObjectURL(file),
      }

      setImages((previous) => {
        if (replaceSavedImagesRef.current) {
          previous.forEach((image) => {
            if (image.previewUrl.startsWith('blob:')) URL.revokeObjectURL(image.previewUrl)
          })
          replaceSavedImagesRef.current = false
          toast.warning(copy.replacingSavedImages)
          return [selectedImage]
        }
        return [...previous, selectedImage]
      })
    }

    setImageCropQueue((previous) => previous.slice(1))
    return true
  }

  const cancelImageCrop = () => {
    setImageCropQueue([])
    setImageCropBatchTotal(0)
    replaceSavedImagesRef.current = false
  }

  const removeImage = (index: number) => {
    if (isEditingPublished) return

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

  const handleIndustrySelect = (option: IndustryOption) => {
    setIndustry(option)
    setTouchedFields((previous) => ({ ...previous, industry: true }))
    setDirtyFields((previous) => ({ ...previous, industry: true }))
  }

  // --- Step navigation ---

  // The compose step (step 1) owns the body and media; it must be valid before
  // the author can move on to categorizing the post.
  const focusStep1Field = (missingVideo: boolean) => {
    window.requestAnimationFrame(() => {
      if (missingVideo) {
        ;(videoSelectButtonRef.current ?? videoFieldRef.current)?.focus()
      } else {
        bodyEditor?.commands.focus()
      }
    })
  }

  const handleNext = () => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return

    const missingVideo = isVideoFlow && videoPhase !== 'ready'
    const missingBody = richTextToPlainText(body) === ''

    setTouchedFields((previous) => ({ ...previous, video: isVideoFlow, body: true }))
    setDirtyFields((previous) => ({ ...previous, video: isVideoFlow, body: true }))

    if (missingVideo || missingBody) {
      focusStep1Field(missingVideo)
      return
    }

    setStep(2)
  }

  const continueToPublisher = () => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return

    const missingIndustry = industry === null
    setTouchedFields((previous) => ({ ...previous, industry: true }))
    setDirtyFields((previous) => ({ ...previous, industry: true }))

    if (missingIndustry) {
      window.requestAnimationFrame(() => industryButtonRef.current?.focus())
      return
    }

    if (canChoosePublisher) {
      setStep(3)
      return
    }

    void handlePublish(isEditingPublished ? undefined : 'insighter')
  }

  // --- Publish ---

  const handlePublish = async (selectedAuthorType?: PublishAuthorType) => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return

    if (canChoosePublisher && !selectedAuthorType) {
      setComposerError(copy.choosePublisher)
      setStep(3)
      return
    }

    const missingIndustry = industry === null
    const missingVideo = isVideoFlow && videoPhase !== 'ready'
    const missingBody = richTextToPlainText(body) === ''

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

    setComposerError(null)
    setIsPublishing(true)
    try {
      const payload = {
        body: body.trim(),
        industryId: industry.id,
        tags: selectedTags.map((tag) => tag.id),
        relatedInsights: relatedInsights.map((item) => item.id),
        authorType: selectedAuthorType,
      }

      let publishedUuid: string
      if (isVideoFlow && videoUuidRef.current) {
        await publishVideoPost(videoUuidRef.current, payload, locale)
        publishedUuid = videoUuidRef.current
      } else {
        publishedUuid = await publishImageTextPost(
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

      if (isEditingPublished) toast.success(copy.updatedToast)
      const publishAsCompany = selectedAuthorType === 'company'
      onPublished({
        uuid: publishedUuid,
        title: richTextToPlainText(body).slice(0, 120),
        authorName: publishAsCompany
          ? companyName
          : `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim() || user?.name || '',
        authorPhotoUrl: publishAsCompany ? user?.company?.logo : user?.profile_photo_url,
        kind: 'post',
      })
      onClose()
    } catch (error) {
      setComposerError(error instanceof Error ? error.message : copy.publishFailed)
    } finally {
      setIsPublishing(false)
    }
  }

  // Save unfinished content without imposing publication requirements. The
  // caller either closes the composer or continues to library publishing.
  const persistDraft = async (): Promise<FeedItem | null> => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return null

    setComposerError(null)
    if (isUploadInFlight) {
      setComposerError(copy.uploadBeforeLeaving)
      return null
    }
    if (!hasDraftContent && !draft) {
      setComposerError(copy.emptyDraft)
      return null
    }

    setIsSavingDraft(true)
    try {
      const payload = {
        body: richTextToPlainText(body) ? body.trim() : '',
        industryId: industry?.id ?? null,
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
      setComposerError(error instanceof Error ? error.message : copy.draftSaveFailed)
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

  // Empty-library CTA: preserve any started post, then send the user to the
  // knowledge stepper. The stepper redirects back to this feed with
  // ?attach_knowledge=<id> so we can reopen the composer and attach the new
  // item automatically (handled in FeedComposer + the auto-attach effect below).
  const handlePublishNewKnowledge = async () => {
    if (isUploadInFlight) {
      setComposerError(copy.uploadBeforeLeaving)
      return
    }
    if (hasDraftContent || draft) {
      const savedDraft = await persistDraft()
      if (!savedDraft) return
      onDraftSaved(savedDraft)
      toast.success(copy.draftSavedRedirecting)
    } else if (videoUuidRef.current) {
      // A cancelled/failed new upload must not leave an empty server draft.
      try {
        await deleteFeedItem(videoUuidRef.current, locale)
        videoUuidRef.current = null
      } catch (error) {
        setComposerError(error instanceof Error ? error.message : copy.draftDiscardFailed)
        return
      }
    }

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
        const item = await fetchLibraryKnowledgeById(
          autoAttachKnowledgeId,
          locale,
          5,
          usesCompanyLibrary,
        )
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
  }, [
    opened,
    autoAttachKnowledgeId,
    locale,
    usesCompanyLibrary,
    copy,
    toast,
    onAutoAttachHandled,
  ])

  const handleDiscardDraft = async () => {
    if (isEditingPublished || isPublishing || isSavingDraft || isDiscardingDraft) return
    // A video upload creates the draft server-side before the parent has re-read
    // it, so fall back to the uuid this composer initialized.
    const discardUuid = draft?.uuid ?? videoUuidRef.current
    if (!discardUuid) return

    setIsDiscardingDraft(true)
    try {
      await deleteFeedItem(discardUuid, locale)
      toast.success(copy.draftDiscarded)
      setDiscardConfirmOpened(false)
      onDraftDiscarded()
    } catch (error) {
      setComposerError(error instanceof Error ? error.message : copy.draftDiscardFailed)
    } finally {
      setIsDiscardingDraft(false)
    }
  }

  // Closing the composer (X, overlay click, Escape) must not silently throw away
  // what the author typed: offer to keep it as a draft first.
  const requestClose = () => {
    if (isPublishing || isSavingDraft || isDiscardingDraft) return
    if (exitConfirmOpened || discardConfirmOpened) return
    if (!hasUnsavedChanges) {
      if (!draft && videoUuidRef.current && !hasDraftContent) {
        void handleDiscardDraft()
        return
      }
      onClose()
      return
    }
    setExitConfirmOpened(true)
  }

  const handleExitSaveDraft = async () => {
    const savedDraft = await persistDraft()
    if (!savedDraft) {
      // Close the exit prompt so the persistent save error is visible.
      setExitConfirmOpened(false)
      setComposerError((error) => error || copy.exitSaveBlocked)
      return
    }
    setExitConfirmOpened(false)
    toast.success(copy.draftSaved)
    onDraftSaved(savedDraft)
  }

  // A saved draft lives on the server, so discarding has to delete it; an
  // unsaved composer just closes.
  const handleExitDiscard = async () => {
    // Keep the prompt on screen while the delete runs so the button can show its
    // pending state; handleDiscardDraft closes the composer once it succeeds.
    if (!isEditingPublished && (draft || videoUuidRef.current)) {
      await handleDiscardDraft()
      setExitConfirmOpened(false)
      return
    }
    setExitConfirmOpened(false)
    onClose()
  }

  const footerIconClass =
    'flex h-9 w-9 items-center justify-center rounded-md text-[#5A6B84] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]'

  const title = isEditingPublished
    ? copy.editPost
    : isVideoFlow
      ? copy.titleVideo
      : isImageFlow
        ? copy.titleImage
        : copy.titlePost

  return (
    <>
      <Modal
        opened={opened}
        onClose={requestClose}
        size="min(640px, calc(100vw - 24px))"
        radius={8}
        centered
        zIndex={300}
        withCloseButton={false}
        aria-labelledby="feed-post-dialog-title"
        styles={{
          inner: { padding: 12 },
          content: {
            width: 'min(640px, calc(100vw - 24px))',
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: 'calc(100dvh - 24px)',
            overflowX: 'hidden',
            boxShadow: 'none',
            border: '1px solid #DCE4EF',
          },
          body: {
            position: 'relative',
            minWidth: 0,
            padding: 'clamp(16px, 4vw, 24px)',
            overflowX: 'hidden',
          },
        }}
      >
        <h2 id="feed-post-dialog-title" className="sr-only">
          {title}
        </h2>
        <button
          type="button"
          aria-label={copy.close}
          onClick={requestClose}
          className="absolute end-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-md text-[#5A6472] transition-colors hover:bg-[#F3F6FB] hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
        >
          <IconX aria-hidden className="h-5 w-5" stroke={1.8} />
        </button>

        <form
          className="min-w-0"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            if (step === 1) {
              handleNext()
            } else if (step === 2) {
              continueToPublisher()
            } else {
              void handlePublish(authorType ?? undefined)
            }
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
                {step === 1 ? copy.step1Label : step === 2 ? copy.step2Label : copy.step3Label}
              </div>
            </div>
          </div>

        {composerError && (
          <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-[#A9322B]">{composerError}</p>
        )}

        {/* ===== Step 1: write your post ===== */}
        {imageErrors.length > 0 && (
          <div role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-[#A9322B]">
            {imageErrors.map((message, index) => <p key={index}>{message}</p>)}
          </div>
        )}
        {videoUploadError && (
          <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-[#A9322B]">{videoUploadError}</p>
        )}
        <div className={step === 1 ? undefined : 'hidden'}>
        {/* Body: hidden until video upload allows editing, avoiding an empty locked area */}
        {!bodyLocked && (
          <div ref={bodyFieldRef} className="mt-4 scroll-mt-4">
            <label htmlFor="feed-post-body" className="sr-only">
              {copy.description}
            </label>
            <RichTextEditor
              editor={bodyEditor}
              aria-invalid={bodyInvalid || undefined}
              aria-describedby={bodyInvalid ? 'feed-post-body-error' : undefined}
              data-dirty={dirtyFields.body || undefined}
              onBlurCapture={() => setTouchedFields((previous) => ({ ...previous, body: true }))}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                  event.preventDefault()
                  event.currentTarget.closest('form')?.requestSubmit()
                }
              }}
              className={`overflow-hidden rounded-md border bg-white shadow-none ${
                bodyInvalid
                  ? 'border-[#C23B32]'
                  : 'border-[#E5EAF2] focus-within:border-[#8FB9EA]'
              }`}
            >
              {formattingOpen && (
              <RichTextEditor.Toolbar sticky={false} className="border-b border-[#E5EAF2] bg-[#F8FAFD] px-1 py-1">
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
                <EmojiPicker
                  label={copy.emoji}
                  onSelect={(emoji) => bodyEditor?.chain().focus().insertContent(emoji).run()}
                />
              </RichTextEditor.Toolbar>
              )}
              <RichTextEditor.Content
                id="feed-post-body"
                className={`bg-white px-3 py-2.5 text-[16px] sm:text-[15px] leading-relaxed text-[#1C2433] [&_.ProseMirror]:min-h-[120px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:m-0 [&_.ProseMirror_p+p]:mt-2 [&_.ProseMirror_ul]:my-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ps-5 [&_.ProseMirror_ol]:my-2 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ps-5 [&_.ProseMirror_a]:text-[#2378E8] [&_.ProseMirror_a]:underline [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[#94A3B8] ${
                  isVideoFlow || isImageFlow ? '[&_.ProseMirror]:min-h-[88px]' : ''
                }`}
              />
              <div className="flex items-center bg-white px-1.5 pb-1.5">
                <button
                  type="button"
                  onClick={() => {
                    formattingToggledRef.current = true
                    setFormattingOpen((current) => !current)
                  }}
                  aria-label={copy.formatting}
                  aria-expanded={formattingOpen}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ${
                    formattingOpen
                      ? 'bg-[#EDF3FC] text-[#1D74E0]'
                      : 'text-[#5A6B84] hover:bg-[#F3F6FB]'
                  }`}
                >
                  <TextEditIcon className="h-4 w-4" />
                </button>
              </div>
            </RichTextEditor>
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
                {isEditingPublished ? (
                  <p className="mt-4 text-[12.5px] font-medium text-[#64748B]">{copy.mediaLocked}</p>
                ) : (
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
                )}
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
                      preload="metadata"
                      playsinline
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
                  {!isEditingPublished && (
                    <button
                      type="button"
                      onClick={cancelOrRemoveVideo}
                      className="min-h-10 shrink-0 px-1 text-[14px] font-medium text-[#5A6B84] transition-colors hover:text-[#0B1220] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
                    >
                      {videoPhase === 'uploading' || videoPhase === 'initializing'
                        ? copy.cancel
                        : copy.remove}
                    </button>
                  )}
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

        {/* Image area */}
        {isImageFlow && !hasImages && (
          <div
            ref={imageFieldRef}
            tabIndex={-1}
            className="mt-4 focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
          >
            <div className="flex flex-col items-center rounded-md border border-dashed border-[#C9DCF6] bg-[#F8FAFD] px-6 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#EDF3FC]">
                <IconPhoto aria-hidden stroke={1.6} className="h-6 w-6 text-[#1EAB5A]" />
              </div>
              <h3 className="mt-4 text-[17px] font-bold text-[#0B1220]">{copy.imageUploadTitle}</h3>
              <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-6 text-[#64748B]">
                {copy.imageUploadHint}
              </p>
              {isEditingPublished ? (
                <p className="mt-4 text-[12.5px] font-medium text-[#64748B]">{copy.mediaLocked}</p>
              ) : (
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="mt-5 min-h-10 rounded-md bg-[#1EAB5A] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#178A48] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
                >
                  {copy.selectImages}
                </button>
              )}
            </div>
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
            {!isEditingPublished && images.length < MAX_IMAGES && (
              <button
                type="button"
                aria-label={copy.addImages}
                onClick={() => imageInputRef.current?.click()}
                className="group flex aspect-square items-center justify-center rounded-md border border-dashed border-[#1EAB5A] bg-[#F2FBF6] text-[#1EAB5A] transition-colors hover:border-[#178A48] hover:bg-[#E6F7ED] hover:text-[#178A48] focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-[#8FB9EA]"
              >
                <IconPlus aria-hidden stroke={2.5} className="h-10 w-10 sm:h-12 sm:w-12" />
              </button>
            )}
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

        {/* ===== Step 3: choose the public publisher identity ===== */}
        {step === 3 && canChoosePublisher && (
          <div className="mt-6">
            <h3 className="text-[20px] font-bold tracking-[-0.015em] text-[#101827]">
              {copy.publishAsTitle}
            </h3>
            <div className="mt-3">
              <PublishAsSelector
                locale={locale}
                companyName={companyName}
                companyLogo={user?.company?.logo}
                insighterName={fullName}
                insighterPhoto={user?.profile_photo_url}
                value={authorType}
                onChange={setAuthorType}
              />
            </div>
          </div>
        )}

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
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-semibold uppercase tracking-wide text-[#5A6B84]">{copy.suggestedTags}</span>
              <span className="text-[11px] font-medium text-[#9099A6]">{copy.optionalBadge}</span>
            </div>
            <TagSelector
              locale={locale}
              industryId={industry.id}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 flex min-w-0 flex-col items-stretch gap-3 border-t border-[#EDF1F7] pt-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-1 sm:w-auto">
            {draft && !isEditingPublished && (
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
                {!isEditingPublished && !isVideoFlow && !hasVideo && (hasImages || !isImageFlow) && (
                  <button
                    type="button"
                    aria-label="Add images"
                    onClick={() => imageInputRef.current?.click()}
                    className={footerIconClass}
                  >
                    <IconPhoto aria-hidden stroke={1.7} className="h-5 w-5 text-[#1EAB5A]" />
                  </button>
                )}
                {!isEditingPublished && mode === 'post' && !hasImages && !hasVideo && (
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
                  aria-label={copy.shareFromLibrary}
                  onClick={() => setLibraryDrawerOpened(true)}
                  className={`flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[14px] font-medium transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] ${
                    relatedInsights.length > 0
                      ? 'border-[#8FB9EA] bg-[#EDF3FC] text-[#1D74E0]'
                      : 'border-[#C9DCF6] text-[#5A6B84] hover:bg-[#F3F6FB]'
                  }`}
                >
                  <IconLink aria-hidden stroke={1.7} className="h-4.5 w-4.5" />
                  <span className="hidden sm:inline">{copy.shareFromLibrary}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setStep(step === 3 ? 2 : 1)}
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

          <div className="flex min-w-0 w-full items-center justify-end gap-2 sm:w-auto">
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
                {!isEditingPublished && step === 2 && (
                  <button
                    type="button"
                    onClick={() => void handleSaveDraft()}
                    disabled={isPublishing || isSavingDraft || isDiscardingDraft}
                    aria-busy={isSavingDraft}
                    className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center rounded-md border border-[#C9DCF6] bg-white px-3 py-2.5 text-[14px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:opacity-55 sm:flex-none sm:px-4"
                  >
                    {isSavingDraft && (
                      <IconLoader2 aria-hidden className="me-1.5 h-4 w-4 animate-spin" stroke={2} />
                    )}
                    {isSavingDraft ? copy.savingDraft : copy.saveDraft}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isPublishing || isSavingDraft || isDiscardingDraft || (step === 3 && authorType === null)}
                  aria-busy={isPublishing}
                  className="min-h-10 min-w-0 flex-1 rounded-md bg-[#1D74E0] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:bg-[#93B9E8] sm:flex-none sm:px-6"
                >
                  {step === 2 && canChoosePublisher
                    ? copy.next
                    : isPublishing
                      ? isEditingPublished ? copy.savingChanges : copy.publishing
                      : isEditingPublished ? copy.saveChanges : copy.publish}
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
          disabled={isEditingPublished}
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
          disabled={isEditingPublished}
          className="hidden"
          onChange={(event) => {
            beginImageCrop(event.currentTarget.files)
            event.currentTarget.value = ''
          }}
        />
        </form>
      </Modal>

      <ImageCropEditor
        key={imageCropQueue[0] ? `${imageCropQueue[0].name}-${imageCropQueue[0].lastModified}-${imageCropQueue.length}` : 'closed'}
        file={imageCropQueue[0] ?? null}
        locale={locale}
        opened={imageCropQueue.length > 0}
        position={imageCropBatchTotal - imageCropQueue.length + 1}
        total={imageCropBatchTotal}
        onCancel={cancelImageCrop}
        onApply={applyCroppedImage}
      />

      <Modal
        opened={exitConfirmOpened}
        onClose={() => {
          if (!isSavingDraft && !isDiscardingDraft) setExitConfirmOpened(false)
        }}
        title={
          isUploadInFlight
            ? copy.exitUploadingTitle
            : isEditingPublished
              ? copy.editExitTitle
              : copy.exitTitle
        }
        centered
        size="sm"
        radius={8}
        zIndex={500}
        closeButtonProps={{ 'aria-label': copy.keepEditing }}
        styles={{ title: { fontSize: 17, fontWeight: 700, color: '#0B1220' } }}
      >
        <p className="text-[14px] leading-6 text-[#5D6D89]">
          {isUploadInFlight
            ? copy.exitUploadingDescription
            : isEditingPublished
              ? copy.editExitDescription
              : copy.exitDescription}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => void handleExitDiscard()}
            disabled={isSavingDraft || isDiscardingDraft}
            className="inline-flex min-h-10 items-center rounded-md border border-[#DCE4EF] px-4 text-[14px] font-medium text-[#5D6D89] transition-colors hover:bg-[#F7F9FC] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:opacity-50"
          >
            {isDiscardingDraft && (
              <IconLoader2 aria-hidden className="me-1.5 h-4 w-4 animate-spin" stroke={2} />
            )}
            {isEditingPublished ? copy.discardChanges : copy.exitDiscard}
          </button>
          {canSaveAsDraftOnExit ? (
            <button
              type="button"
              onClick={() => void handleExitSaveDraft()}
              disabled={isSavingDraft || isDiscardingDraft}
              aria-busy={isSavingDraft}
              className="inline-flex min-h-10 items-center rounded-md bg-[#1D74E0] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:cursor-wait disabled:bg-[#93B9E8]"
            >
              {isSavingDraft && (
                <IconLoader2 aria-hidden className="me-1.5 h-4 w-4 animate-spin" stroke={2} />
              )}
              {isSavingDraft ? copy.savingDraft : copy.exitSaveDraft}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setExitConfirmOpened(false)}
              disabled={isDiscardingDraft}
              className="min-h-10 rounded-md bg-[#1D74E0] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4] disabled:opacity-50"
            >
              {copy.keepEditing}
            </button>
          )}
        </div>
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
        isCompany={usesCompanyLibrary}
        selected={relatedInsights}
        hasDraftContent={hasDraftContent || !!draft}
        onClose={() => setLibraryDrawerOpened(false)}
        onSelectionChange={setRelatedInsights}
        onPublishNew={() => {
          setLibraryDrawerOpened(false)
          void handlePublishNewKnowledge()
        }}
      />
    </>
  )
}
