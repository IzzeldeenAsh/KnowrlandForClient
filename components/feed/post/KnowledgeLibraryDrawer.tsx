'use client'

import { Drawer } from '@mantine/core'
import { useCallback, useEffect, useState, type SVGProps } from 'react'
import {
  fetchPublishedLibraryKnowledge,
  type LibraryKnowledgeItem,
} from '@/services/feed.service'

// A post can attach at most this many knowledge items from the library.
const MAX_LIBRARY_ATTACHMENTS = 3

type KnowledgeLibraryDrawerProps = {
  locale: string
  opened: boolean
  selected: LibraryKnowledgeItem[]
  onClose: () => void
  onConfirm: (items: LibraryKnowledgeItem[]) => void
  // Empty-state CTA: save the post as a draft and send the user off to publish a
  // new knowledge item, then return here to attach it automatically.
  onPublishNew: () => void
}

const copyByLocale = {
  en: {
    title: 'Share from your library',
    subtitle: `Attach up to ${MAX_LIBRARY_ATTACHMENTS} published knowledge items to your post.`,
    loading: 'Loading your library…',
    empty: 'No published knowledge in your library yet.',
    emptyTitle: 'Start building your library',
    emptyBody:
      'Publish documents, reports, or data to your library, then attach them to your posts. Save a draft and continue to publishing whenever you are ready.',
    emptyCta: 'Save and start publish',
    loadMore: 'Load more',
    attach: 'Attach',
    selectedCount: (count: number) => `${count} of ${MAX_LIBRARY_ATTACHMENTS} selected`,
    limitReached: `You can attach up to ${MAX_LIBRARY_ATTACHMENTS} items. Unselect one to choose another.`,
    error: 'Unable to load your library.',
    close: 'Close library drawer',
  },
  ar: {
    title: 'شارك من مكتبتك',
    subtitle: `أرفق حتى ${MAX_LIBRARY_ATTACHMENTS} عناصر معرفة منشورة بمنشورك.`,
    loading: 'جارٍ تحميل مكتبتك…',
    empty: 'لا توجد معرفة منشورة في مكتبتك بعد.',
    emptyTitle: 'ابدأ ببناء مكتبتك',
    emptyBody:
      'انشر المستندات أو التقارير أو البيانات في مكتبتك، ثم أرفقها بمنشوراتك. احفظ مسودة وتابع النشر متى كنت جاهزًا.',
    emptyCta: 'احفظ وابدأ النشر',
    loadMore: 'تحميل المزيد',
    attach: 'إرفاق',
    selectedCount: (count: number) => `${count} من ${MAX_LIBRARY_ATTACHMENTS} محدد`,
    limitReached: `يمكنك إرفاق حتى ${MAX_LIBRARY_ATTACHMENTS} عناصر. ألغِ تحديد أحدها لاختيار غيره.`,
    error: 'تعذر تحميل مكتبتك.',
    close: 'إغلاق مكتبة المستندات',
  },
} as const

export default function KnowledgeLibraryDrawer({
  locale,
  opened,
  selected,
  onClose,
  onConfirm,
  onPublishNew,
}: KnowledgeLibraryDrawerProps) {
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']

  const [items, setItems] = useState<LibraryKnowledgeItem[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [pendingSelection, setPendingSelection] = useState<Map<number, LibraryKnowledgeItem>>(
    new Map(),
  )

  const loadPage = useCallback(
    async (pageToLoad: number, append: boolean) => {
      setIsLoading(true)
      setLoadError(false)
      try {
        const result = await fetchPublishedLibraryKnowledge(pageToLoad, locale)
        setItems((previous) => (append ? [...previous, ...result.data] : result.data))
        setPage(result.meta.current_page)
        setLastPage(result.meta.last_page)
      } catch {
        setLoadError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [locale],
  )

  // Reset to the parent's confirmed selection each time the drawer opens
  useEffect(() => {
    if (!opened) return
    setPendingSelection(new Map(selected.map((item) => [item.id, item])))
    loadPage(1, false)
  }, [opened, selected, loadPage])

  const toggleItem = (item: LibraryKnowledgeItem) => {
    setPendingSelection((previous) => {
      // Deselecting is always allowed; adding is capped at the max.
      if (!previous.has(item.id) && previous.size >= MAX_LIBRARY_ATTACHMENTS) {
        return previous
      }
      const next = new Map(previous)
      if (next.has(item.id)) {
        next.delete(item.id)
      } else {
        next.set(item.id, item)
      }
      return next
    })
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position={isArabic ? 'left' : 'right'}
      size={420}
      zIndex={310}
      closeButtonProps={{
        'aria-label': copy.close,
        className:
          'focus-visible:!outline-[1px] focus-visible:!outline-offset-1 focus-visible:!outline-[#B7D2F4]',
      }}
      styles={{
        content: {
          boxShadow: 'none',
          borderInlineStart: '1px solid #DCE4EF',
        },
        header: {
          borderBottom: '1px solid #E5EAF2',
        },
      }}
      title={
        <span>
          <span className="block text-[16px] font-bold text-[#0B1220]">{copy.title}</span>
          <span className="mt-0.5 block text-[12.5px] font-normal text-[#5A6B84]">
            {copy.subtitle}
          </span>
        </span>
      }
    >
      <div className="flex h-[calc(100vh-120px)] flex-col">
        <div
          className="flex-1 overscroll-contain overflow-y-auto pe-1"
          aria-busy={isLoading}
        >
          {loadError ? (
            <p className="py-8 text-center text-[13px] text-[#94A3B8]">{copy.error}</p>
          ) : items.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <LibraryEmptyIllustration className="h-28 w-28" aria-hidden />
              <h3 className="mt-5 text-[15.5px] font-bold text-[#0B1220]">
                {copy.emptyTitle}
              </h3>
              <p className="mt-2 max-w-[19rem] text-[13px] leading-6 text-[#5A6B84]">
                {copy.emptyBody}
              </p>
              <button
                type="button"
                onClick={onPublishNew}
                className="mt-5 inline-flex min-h-10 items-center rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
              >
                {copy.emptyCta}
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const isChecked = pendingSelection.has(item.id)
                const isDisabled =
                  !isChecked && pendingSelection.size >= MAX_LIBRARY_ATTACHMENTS
                return (
                  <li key={item.id}>
                    <label
                      className={`relative flex min-h-[116px] items-end overflow-hidden rounded-md border bg-[#061326] p-4 transition-colors focus-within:border-[#8FB9EA] ${
                        isChecked
                          ? 'border-[#5EA5FF]'
                          : 'border-[#18304F] hover:border-[#315C8E]'
                      } ${isDisabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`}
                      style={{
                        backgroundImage: 'url("https://foresighta.co/images/test2.png")',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => toggleItem(item)}
                        className="absolute end-3 top-3 h-5 w-5 shrink-0 accent-[#2378E8] disabled:cursor-not-allowed"
                      />
                      <span className="min-w-0 flex-1 pe-7">
                        <span className="mb-2 inline-flex rounded bg-[#0B2545] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#74C0FF]">
                          {item.type}
                        </span>
                        <span className="block line-clamp-2 text-[15px] font-semibold leading-6 text-white">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[11.5px] text-[#AAC5E5]">
                          {item.published_at ? item.published_at.slice(0, 10) : ''}
                        </span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          )}

          {isLoading && (
            <p role="status" className="py-4 text-center text-[13px] text-[#64748B]">
              {copy.loading}
            </p>
          )}

          {!isLoading && !loadError && page < lastPage && (
            <button
              type="button"
              onClick={() => loadPage(page + 1, true)}
              className="mt-3 min-h-10 w-full rounded border border-[#C9DCF6] py-2 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
            >
              {copy.loadMore}
            </button>
          )}
        </div>

        {/* Selection footer is only meaningful when there is something to attach. */}
        {items.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#DCE4EF] bg-white pt-3">
            <span className="min-w-0 pe-3 text-[12.5px] text-[#5A6B84]">
              {pendingSelection.size >= MAX_LIBRARY_ATTACHMENTS ? (
                <span className="font-medium text-[#B26A00]">{copy.limitReached}</span>
              ) : (
                copy.selectedCount(pendingSelection.size)
              )}
            </span>
            <button
              type="button"
              onClick={() => onConfirm(Array.from(pendingSelection.values()))}
              className="min-h-10 rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
            >
              {copy.attach}
            </button>
          </div>
        )}
      </div>
    </Drawer>
  )
}

// Stacked-documents illustration for the empty library state. Self-contained
// SVG so it stays crisp at any size and follows the feed's blue palette.
function LibraryEmptyIllustration({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      className={className}
      role="img"
      {...props}
    >
      <circle cx="48" cy="48" r="48" fill="#EAF2FD" />
      {/* back document */}
      <rect
        x="28"
        y="24"
        width="34"
        height="44"
        rx="4"
        fill="#C9DEF9"
        transform="rotate(-8 45 46)"
      />
      {/* front document */}
      <rect x="34" y="26" width="34" height="44" rx="4" fill="#fff" stroke="#B7D2F4" />
      <rect x="40" y="34" width="22" height="3.5" rx="1.75" fill="#DCE7F6" />
      <rect x="40" y="42" width="22" height="3.5" rx="1.75" fill="#DCE7F6" />
      <rect x="40" y="50" width="14" height="3.5" rx="1.75" fill="#DCE7F6" />
      {/* plus badge */}
      <circle cx="66" cy="64" r="12" fill="#1D74E0" />
      <path
        d="M66 59v10M61 64h10"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
