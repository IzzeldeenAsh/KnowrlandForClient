'use client'

import { RichTextEditor } from '@mantine/tiptap'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'
import {
  IconArticle,
  IconChevronDown,
  IconFileDescription,
  IconHash,
  IconLoader2,
  IconPhoto,
  IconPlus,
  IconX,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '@/components/toast/ToastContext'
import { useUserProfile } from '@/components/ui/header/hooks/useUserProfile'
import {
  createSuggestTag,
  fetchIndustryTags,
  fetchLibraryKnowledgeById,
  getFeedDraft,
  publishArticle,
  saveArticleDraft,
  type FeedItem,
  type FeedTag,
  type LibraryKnowledgeItem,
} from '@/services/feed.service'
import IndustrySelectModal, { type IndustryOption } from '../post/IndustrySelectModal'
import KnowledgeLibraryDrawer from '../post/KnowledgeLibraryDrawer'
import styles from './ArticleEditor.module.css'

type ArticleEditorProps = { locale: string }

const ARTICLE_BODY_LIMIT = 20000
const COVER_MAX_BYTES = 5 * 1024 * 1024

const copyByLocale = {
  en: {
    individualArticle: 'Individual White Paper',
    loading: 'Loading…',
    publish: 'Publish',
    publishing: 'Publishing…',
    cover: 'Add a cover image',
    coverHint: 'Recommended 1920 × 1080 · JPG, PNG or WebP · 5 MB max',
    replaceCover: 'Replace cover image',
    removeCover: 'Remove cover',
    title: 'Title',
    titlePlaceholder: 'Title',
    bodyPlaceholder: 'Write here. Share the expertise only you can bring…',
    settings: 'White Paper settings',
    settingsHint: 'Help the right people discover this White Paper.',
    industry: 'Industry',
    selectIndustry: 'Select an industry',
    tags: 'Tags',
    addTags: 'Select Tag',
    addTagPlaceholder: 'Add suggested',
    addTagError: 'Unable to add the tag.',
    noTags: 'No suggested tags are available for this industry.',
    industryFirst: 'Select an industry first',
    related: 'Related insights',
    relatedHint: 'Connect published work from your library.',
    chooseInsights: 'Choose from library',
    titleRequired: 'Add a title before continuing.',
    bodyRequired: 'Write some White Paper content before continuing.',
    industryRequired: 'Select an industry before continuing.',
    coverRequired: 'Add a cover image before continuing.',
    bodyTooLong: `The formatted White Paper must be ${ARTICLE_BODY_LIMIT.toLocaleString()} characters or fewer.`,
    wrongCover: 'Choose a JPG, PNG, or WebP image.',
    largeCover: 'The cover image must be 5 MB or smaller.',
    smallCover: 'The cover image must be at least 552 × 276 pixels.',
    published: 'Your White Paper has been published.',
    loadFailed: 'Unable to load your White Paper draft.',
    draftSavedRedirecting: 'Draft saved. Taking you to publishing…',
    newKnowledgeAttached: 'Your new knowledge item has been attached.',
    newKnowledgeMissing: 'We could not find the item you just published. Try adding it from your library.',
    existingPost: 'You already have a post draft in progress.',
    continuePost: 'Continue editing it from the feed before starting a White Paper.',
    returnToFeed: 'Return to feed',
    accessTitle: 'White Paper publishing is available to Insighters.',
    accessBody: 'Sign in with an Insighter or company account to write a White Paper.',
  },
  ar: {
    individualArticle: 'ورقة بيضاء فردية',
    loading: 'جارٍ التحميل…',
    publish: 'نشر',
    publishing: 'جارٍ النشر…',
    cover: 'أضف صورة غلاف',
    coverHint: 'المقاس المقترح 1920 × 1080 · JPG أو PNG أو WebP · بحد أقصى 5 م.ب',
    replaceCover: 'استبدال صورة الغلاف',
    removeCover: 'إزالة الغلاف',
    title: 'العنوان',
    titlePlaceholder: 'العنوان',
    bodyPlaceholder: 'اكتب هنا وشارك الخبرة التي تميزك…',
    settings: 'إعدادات الورقة البيضاء',
    settingsHint: 'ساعد الأشخاص المناسبين في اكتشاف هذه الورقة البيضاء.',
    industry: 'المجال',
    selectIndustry: 'اختر مجالاً',
    tags: 'الوسوم',
    addTags: 'أضف وسوماً مقترحة',
    addTagPlaceholder: 'اكتب وسماً واضغط Enter',
    addTagError: 'تعذر إضافة الوسم.',
    noTags: 'لا توجد وسوم مقترحة لهذا المجال.',
    industryFirst: 'اختر المجال أولاً',
    related: 'الرؤى المرتبطة',
    relatedHint: 'اربط أعمالاً منشورة من مكتبتك.',
    chooseInsights: 'اختر من المكتبة',
    titleRequired: 'أضف عنواناً قبل المتابعة.',
    bodyRequired: 'اكتب محتوى الورقة البيضاء قبل المتابعة.',
    industryRequired: 'اختر مجالاً قبل المتابعة.',
    coverRequired: 'أضف صورة غلاف قبل المتابعة.',
    bodyTooLong: `يجب ألا تتجاوز الورقة البيضاء المنسقة ${ARTICLE_BODY_LIMIT.toLocaleString()} حرفاً.`,
    wrongCover: 'اختر صورة بصيغة JPG أو PNG أو WebP.',
    largeCover: 'يجب ألا يزيد حجم صورة الغلاف على 5 ميجابايت.',
    smallCover: 'يجب ألا تقل أبعاد صورة الغلاف عن 552 × 276 بكسل.',
    published: 'تم نشر ورقتك البيضاء.',
    loadFailed: 'تعذر تحميل مسودة الورقة البيضاء.',
    draftSavedRedirecting: 'تم حفظ المسودة. سيتم نقلك إلى النشر…',
    newKnowledgeAttached: 'تم إرفاق عنصر المعرفة الجديد.',
    newKnowledgeMissing: 'تعذر العثور على العنصر الذي نشرته للتو. حاول إضافته من مكتبتك.',
    existingPost: 'لديك مسودة منشور قيد التحرير.',
    continuePost: 'أكمل تحريرها من صفحة الخلاصة قبل بدء ورقة بيضاء.',
    returnToFeed: 'العودة إلى الخلاصة',
    accessTitle: 'نشر الأوراق البيضاء متاح للمستشارين.',
    accessBody: 'سجّل الدخول بحساب مستشار أو شركة لكتابة ورقة بيضاء.',
  },
} as const

function richTextToPlainText(html: string): string {
  if (!html) return ''
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
  }
  const container = document.createElement('div')
  container.innerHTML = html
  return (container.textContent ?? '').replace(/\s+/g, ' ').trim()
}

function imageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const url = URL.createObjectURL(file)
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
      URL.revokeObjectURL(url)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Unable to read image dimensions'))
    }
    image.src = url
  })
}

export default function ArticleEditor({ locale }: ArticleEditorProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const router = useRouter()
  const toast = useToast()
  const { user, roles, isAuthResolved } = useUserProfile()
  const coverInputRef = useRef<HTMLInputElement>(null)
  const coverObjectUrlRef = useRef<string | null>(null)

  const [draftUuid, setDraftUuid] = useState<string | null>(null)
  const [blockingDraft, setBlockingDraft] = useState<FeedItem | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [industry, setIndustry] = useState<IndustryOption | null>(null)
  const [selectedTags, setSelectedTags] = useState<FeedTag[]>([])
  const [industryTags, setIndustryTags] = useState<FeedTag[]>([])
  const [relatedInsights, setRelatedInsights] = useState<LibraryKnowledgeItem[]>([])
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [removeCover, setRemoveCover] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPublishing, setIsPublishing] = useState(false)
  const [industryModalOpened, setIndustryModalOpened] = useState(false)
  const [libraryDrawerOpened, setLibraryDrawerOpened] = useState(false)
  const [tagsOpened, setTagsOpened] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)

  const canPublish = !!user && roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      LinkExtension.configure({ autolink: true, openOnClick: false, defaultProtocol: 'https' }),
      Placeholder.configure({ placeholder: copy.bodyPlaceholder }),
    ],
    content: '',
    onUpdate: ({ editor: currentEditor }) => setBody(currentEditor.getHTML()),
  })

  useEffect(() => {
    if (!editor || editor.getHTML() === body) return
    editor.commands.setContent(body, { emitUpdate: false })
  }, [body, editor])

  useEffect(() => {
    if (!isAuthResolved) return
    if (!canPublish) {
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    getFeedDraft(locale, controller.signal)
      .then((draft) => {
        if (!draft) return
        if (draft.content_type !== 'article') {
          setBlockingDraft(draft)
          return
        }

        setDraftUuid(draft.uuid)
        setTitle(draft.title ?? '')
        setBody(draft.body ?? '')
        setIndustry(draft.industry ? { id: draft.industry.id, name: draft.industry.name } : null)
        setSelectedTags(draft.tags)
        setRelatedInsights(
          draft.related_insights.flatMap((item) =>
            typeof item.id === 'number'
              ? [{ id: item.id, type: item.type, title: item.title, slug: item.slug, status: 'published', published_at: null }]
              : [],
          ),
        )
        setCoverPreview(draft.media.find((media) => media.media_type === 'image')?.url ?? null)
      })
      .catch((error) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          toast.error(error instanceof Error ? error.message : copy.loadFailed)
        }
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [canPublish, copy.loadFailed, isAuthResolved, locale, toast])

  useEffect(() => () => {
    if (coverObjectUrlRef.current) URL.revokeObjectURL(coverObjectUrlRef.current)
  }, [])

  const payload = useMemo(() => ({
    title: title.trim(),
    body,
    industryId: industry?.id ?? null,
    tags: selectedTags.map((tag) => tag.id),
    relatedInsights: relatedInsights.map((item) => item.id),
    coverImage: coverFile,
    removeCover,
  }), [body, coverFile, industry?.id, relatedInsights, removeCover, selectedTags, title])

  const validateForPublish = () => {
    if (!title.trim()) {
      toast.error(copy.titleRequired)
      return false
    }
    if (!richTextToPlainText(body)) {
      toast.error(copy.bodyRequired)
      return false
    }
    if (body.length > ARTICLE_BODY_LIMIT) {
      toast.error(copy.bodyTooLong)
      return false
    }
    if (!industry) {
      toast.error(copy.industryRequired)
      return false
    }
    if (!coverPreview || removeCover) {
      toast.error(copy.coverRequired)
      return false
    }
    return true
  }

  const handlePublish = async () => {
    if (isPublishing || !validateForPublish()) return
    setIsPublishing(true)
    try {
      await publishArticle(payload, locale, draftUuid ?? undefined)
      toast.success(copy.published)
      router.push(`/${locale}?view=my-feeds`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.loadFailed)
    } finally {
      setIsPublishing(false)
    }
  }

  // Empty-library CTA: save the article as a draft, then head to the knowledge
  // stepper. It redirects back here with ?attach_knowledge=<id> so we can attach
  // the new item automatically (handled by the return effect below).
  const handlePublishNewKnowledge = async () => {
    if (isPublishing) return
    if (!title.trim()) {
      toast.error(copy.titleRequired)
      return
    }
    setLibraryDrawerOpened(false)
    try {
      const uuid = await saveArticleDraft(payload, locale, draftUuid ?? undefined)
      setDraftUuid(uuid)
      toast.success(copy.draftSavedRedirecting)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.loadFailed)
      return
    }

    const returnUrl = `${window.location.origin}${window.location.pathname}`
    window.location.href =
      `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/app/add-knowledge/stepper` +
      `?return_url=${encodeURIComponent(returnUrl)}`
  }

  // On return from publishing, fetch the new item and attach it to the article.
  const autoAttachedIdRef = useRef<number | null>(null)
  useEffect(() => {
    if (!isAuthResolved || !canPublish) return

    const params = new URLSearchParams(window.location.search)
    const raw = params.get('attach_knowledge')
    if (!raw) return

    params.delete('attach_knowledge')
    const query = params.toString()
    router.replace(`${window.location.pathname}${query ? `?${query}` : ''}`, { scroll: false })

    const id = Number(raw)
    if (!Number.isInteger(id) || id <= 0) return
    if (autoAttachedIdRef.current === id) return
    autoAttachedIdRef.current = id

    let cancelled = false
    void (async () => {
      try {
        const item = await fetchLibraryKnowledgeById(id, locale)
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
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isAuthResolved, canPublish, locale, copy, toast, router])

  const handleCoverChange = async (file: File | undefined) => {
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error(copy.wrongCover)
      return
    }
    if (file.size > COVER_MAX_BYTES) {
      toast.error(copy.largeCover)
      return
    }
    try {
      const dimensions = await imageDimensions(file)
      if (dimensions.width < 552 || dimensions.height < 276) {
        toast.error(copy.smallCover)
        return
      }
    } catch {
      toast.error(copy.wrongCover)
      return
    }

    if (coverObjectUrlRef.current) URL.revokeObjectURL(coverObjectUrlRef.current)
    const nextUrl = URL.createObjectURL(file)
    coverObjectUrlRef.current = nextUrl
    setCoverFile(file)
    setCoverPreview(nextUrl)
    setRemoveCover(false)
  }

  const openTags = async () => {
    setTagsOpened((current) => !current)
    if (!industry || industryTags.length > 0) return
    setIndustryTags(await fetchIndustryTags(industry.id, locale))
  }

  const addNewTag = async () => {
    const name = newTagName.trim()
    if (!name || !industry || isAddingTag) return

    const normalized = name.toLowerCase()
    const existing = industryTags.find((tag) => tag.name.trim().toLowerCase() === normalized)
    if (existing) {
      if (!selectedTags.some((tag) => tag.id === existing.id)) setSelectedTags((current) => [...current, existing])
      setNewTagName('')
      return
    }

    setIsAddingTag(true)
    try {
      const created = await createSuggestTag(industry.id, name, locale)
      setIndustryTags((current) => [created, ...current])
      setSelectedTags((current) => [...current, created])
      setNewTagName('')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.addTagError)
    } finally {
      setIsAddingTag(false)
    }
  }

  if (isLoading || !isAuthResolved) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F3F5F8]">
        <IconLoader2 aria-label={copy.loading} className="h-7 w-7 animate-spin text-[#2378E8]" />
      </div>
    )
  }

  if (!canPublish || blockingDraft) {
    return (
      <div dir={isArabic ? 'rtl' : 'ltr'} className="min-h-[calc(100vh-var(--app-header-height,88px))] bg-[#F3F5F8] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-xl border border-[#DCE4EF] bg-white p-8 text-center shadow-sm">
          <IconArticle className="mx-auto h-10 w-10 text-[#C8780A]" stroke={1.5} />
          <h1 className="mt-5 text-2xl font-semibold text-[#101827]">
            {blockingDraft ? copy.existingPost : copy.accessTitle}
          </h1>
          <p className="mt-3 text-[15px] leading-7 text-[#66758B]">
            {blockingDraft ? copy.continuePost : copy.accessBody}
          </p>
          <button type="button" onClick={() => router.push(`/${locale}`)} className="mt-7 rounded-full bg-[#2378E8] px-6 py-3 text-sm font-medium text-white hover:bg-[#1769C2]">
            {copy.returnToFeed}
          </button>
        </div>
      </div>
    )
  }

  const initials = `${user?.first_name?.[0] ?? ''}${user?.last_name?.[0] ?? ''}`.toUpperCase() || 'I'

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="min-h-[calc(100vh-var(--app-header-height,88px))] bg-[#F3F5F8] text-[#101827]">
      <div className="sticky top-[var(--app-header-height,88px)] z-40 border-b border-[#DCE3EC] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[70px] max-w-[1180px] items-center gap-3 px-4 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#E7F0FD]">
              {user?.profile_photo_url ? <img src={user.profile_photo_url} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs font-medium text-[#2378E8]">{initials}</span>}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-[#1B2638]">{user?.name}</p>
              <p className="flex items-center gap-1 text-[11.5px] text-[#718198]">
                {copy.individualArticle}
              </p>
            </div>
          </div>

          <button type="button" onClick={() => void handlePublish()} disabled={isPublishing} className="inline-flex min-h-10 items-center rounded-full bg-[#2378E8] px-5 text-[13px] font-medium text-white hover:bg-[#1769C2] disabled:opacity-55">
            {isPublishing && <IconLoader2 className="me-2 h-4 w-4 animate-spin" />}{isPublishing ? copy.publishing : copy.publish}
          </button>
        </div>
      </div>

      <main className="mx-auto grid max-w-[1180px] gap-7 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-10">
          <section className="overflow-hidden rounded-xl border border-[#DCE4EF] bg-white shadow-[0_14px_38px_rgba(29,48,75,0.06)]">
            <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => void handleCoverChange(event.currentTarget.files?.[0])} />
            {coverPreview ? (
              <div className="group relative h-[clamp(150px,20vw,240px)] overflow-hidden bg-[#E9EEF5]">
                <img src={coverPreview} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/65 to-transparent p-4 pt-16 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                  <button type="button" onClick={() => coverInputRef.current?.click()} className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1E2A3D]">{copy.replaceCover}</button>
                  <button type="button" onClick={() => { setCoverFile(null); setCoverPreview(null); setRemoveCover(true) }} className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-[#A9322B]">{copy.removeCover}</button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => coverInputRef.current?.click()} className="flex min-h-[174px] w-full flex-col items-center justify-center border-b border-dashed border-[#CBD7E5] bg-[#F8FAFC] px-6 text-center transition-colors hover:bg-[#F2F6FA]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#2378E8] shadow-sm"><IconPhoto className="h-5 w-5" /></span>
                <span className="mt-3 text-sm font-medium text-[#26364C]">{copy.cover}</span>
                <span className="mt-1 text-xs text-[#8291A5]">{copy.coverHint}</span>
              </button>
            )}

            <div className="px-6 sm:px-10 lg:px-14">
              <label htmlFor="article-title" className="sr-only">{copy.title}</label>
              <textarea id="article-title" rows={2} maxLength={255} value={title} onChange={(event) => setTitle(event.currentTarget.value)} placeholder={copy.titlePlaceholder} className="mt-10 w-full resize-none overflow-hidden border-0 bg-transparent text-2xl font-medium leading-tight tracking-[-0.015em] text-[#101827] outline-none placeholder:font-normal placeholder:text-[#A5B0BF] sm:text-[32px]" />
              <div className={`${styles.editorShell} mt-4 border-t border-[#E5EAF1]`}>
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar sticky={false}>
                    <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /><RichTextEditor.Strikethrough /></RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup><RichTextEditor.H1 /><RichTextEditor.H2 /><RichTextEditor.H3 /></RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /><RichTextEditor.Blockquote /><RichTextEditor.Hr /></RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup><RichTextEditor.Link /><RichTextEditor.Unlink /><RichTextEditor.Code /><RichTextEditor.CodeBlock /></RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup><RichTextEditor.Undo /><RichTextEditor.Redo /></RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </div>
              <div className={`border-t py-4 text-end text-xs ${body.length > ARTICLE_BODY_LIMIT ? 'border-[#E5B7B2] text-[#B53B32]' : 'border-[#E8EDF3] text-[#8A98AA]'}`}>{body.length.toLocaleString()} / {ARTICLE_BODY_LIMIT.toLocaleString()}</div>
            </div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-[calc(var(--app-header-height,88px)+94px)] lg:self-start">
            <section className="rounded-xl border border-[#DCE4EF] bg-white p-5 shadow-sm">
              <h2 className="text-[15px] font-semibold text-[#172236]">{copy.settings}</h2>
              <p className="mt-1 text-xs leading-5 text-[#7A899D]">{copy.settingsHint}</p>

              <div className="mt-5">
                <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#64758C]">{copy.industry}</label>
                <button type="button" onClick={() => setIndustryModalOpened(true)} className="mt-2 flex min-h-11 w-full items-center justify-between rounded-lg border border-[#D6E0EC] px-3 text-start text-sm text-[#26364C] hover:border-[#9EBBDE]">
                  <span className="truncate">{industry?.name ?? copy.selectIndustry}</span><IconChevronDown className="h-4 w-4 text-[#8291A5]" />
                </button>
              </div>

              <div className="mt-5 border-t border-[#EDF1F5] pt-5">
                <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#64758C]">{copy.tags}</label>
                <div className="mt-2 flex flex-wrap gap-1.5">{selectedTags.map((tag) => <button key={tag.id} type="button" onClick={() => setSelectedTags((current) => current.filter((item) => item.id !== tag.id))} className="inline-flex items-center gap-1 rounded-full bg-[#EDF4FD] px-2.5 py-1 text-xs font-medium text-[#2378E8]">#{tag.name}<IconX className="h-3 w-3" /></button>)}</div>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(event) => setNewTagName(event.currentTarget.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault()
                        void addNewTag()
                      }
                    }}
                    disabled={!industry}
                    placeholder={industry ? copy.addTagPlaceholder : copy.industryFirst}
                    className="h-9 min-w-0 flex-1 rounded-md border border-[#D6E0EC] bg-white px-3 text-xs text-[#26364C] outline-none placeholder:text-[#A5B0BF] disabled:cursor-not-allowed disabled:bg-[#F3F5F8]"
                  />
                  <button type="button" onClick={() => void addNewTag()} disabled={!industry || !newTagName.trim() || isAddingTag} className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-[#2378E8] px-3 text-white disabled:opacity-50">
                    {isAddingTag ? <IconLoader2 className="h-3.5 w-3.5 animate-spin" /> : <IconPlus className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <button type="button" onClick={() => void openTags()} disabled={!industry} className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#2378E8] disabled:cursor-not-allowed disabled:text-[#9AA7B7]"><IconHash className="h-4 w-4" />{industry ? copy.addTags : copy.industryFirst}</button>
                {tagsOpened && <div className="mt-3 flex max-h-44 flex-wrap gap-2 overflow-y-auto rounded-lg bg-[#F7F9FC] p-3">{!industry ? copy.industryFirst : industryTags.length === 0 ? copy.noTags : industryTags.map((tag) => <button key={tag.id} type="button" onClick={() => setSelectedTags((current) => current.some((item) => item.id === tag.id) ? current.filter((item) => item.id !== tag.id) : [...current, tag])} className={`rounded-full border px-2.5 py-1 text-xs ${selectedTags.some((item) => item.id === tag.id) ? 'border-[#2378E8] text-[#2378E8]' : 'border-[#D6E0EC] bg-white text-[#65758A]'}`}>#{tag.name}</button>)}</div>}
              </div>

              <div className="mt-5 border-t border-[#EDF1F5] pt-5">
                <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#64758C]">{copy.related}</label>
                <p className="mt-1 text-xs leading-5 text-[#8492A5]">{copy.relatedHint}</p>
                {relatedInsights.map((item) => <div key={item.id} className="mt-2 flex items-center gap-2 rounded-lg bg-[#F6F9FC] px-3 py-2"><IconFileDescription className="h-4 w-4 shrink-0 text-[#2378E8]" /><span className="min-w-0 flex-1 truncate text-xs font-medium text-[#35445A]">{item.title}</span><button type="button" onClick={() => setRelatedInsights((current) => current.filter((related) => related.id !== item.id))}><IconX className="h-3.5 w-3.5 text-[#8997A9]" /></button></div>)}
                <button type="button" onClick={() => setLibraryDrawerOpened(true)} className="mt-3 text-xs font-medium text-[#2378E8]">{copy.chooseInsights}</button>
              </div>
            </section>

          </aside>
      </main>

      <IndustrySelectModal locale={locale} opened={industryModalOpened} selectedId={industry?.id ?? null} onClose={() => setIndustryModalOpened(false)} onSelect={(option) => { if (option.id !== industry?.id) { setSelectedTags([]); setIndustryTags([]) }; setIndustry(option); setIndustryModalOpened(false) }} />
      <KnowledgeLibraryDrawer locale={locale} opened={libraryDrawerOpened} selected={relatedInsights} onClose={() => setLibraryDrawerOpened(false)} onConfirm={(items) => { setRelatedInsights(items); setLibraryDrawerOpened(false) }} onPublishNew={() => { void handlePublishNewKnowledge() }} />
    </div>
  )
}
