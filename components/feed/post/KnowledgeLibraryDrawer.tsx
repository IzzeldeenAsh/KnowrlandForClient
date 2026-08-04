'use client'

import { Drawer } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import {
  fetchPublishedLibraryKnowledge,
  type LibraryKnowledgeItem,
} from '@/services/feed.service'

type KnowledgeLibraryDrawerProps = {
  locale: string
  opened: boolean
  selected: LibraryKnowledgeItem[]
  onClose: () => void
  onConfirm: (items: LibraryKnowledgeItem[]) => void
}

const copyByLocale = {
  en: {
    title: 'Share from your library',
    subtitle: 'Attach published knowledge to your post.',
    loading: 'Loading your library…',
    empty: 'No published knowledge in your library yet.',
    loadMore: 'Load more',
    attach: 'Attach',
    selectedCount: (count: number) => `${count} selected`,
    error: 'Unable to load your library.',
    close: 'Close library drawer',
  },
  ar: {
    title: 'شارك من مكتبتك',
    subtitle: 'أرفق معرفة منشورة بمنشورك.',
    loading: 'جارٍ تحميل مكتبتك…',
    empty: 'لا توجد معرفة منشورة في مكتبتك بعد.',
    loadMore: 'تحميل المزيد',
    attach: 'إرفاق',
    selectedCount: (count: number) => `${count} محدد`,
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
            <p className="py-8 text-center text-[13px] text-[#94A3B8]">{copy.empty}</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const isChecked = pendingSelection.has(item.id)
                return (
                  <li key={item.id}>
                    <label
                      className={`relative flex min-h-[116px] cursor-pointer items-end overflow-hidden rounded-md border bg-[#061326] p-4 transition-colors focus-within:border-[#8FB9EA] ${
                        isChecked
                          ? 'border-[#5EA5FF]'
                          : 'border-[#18304F] hover:border-[#315C8E]'
                      }`}
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
                        onChange={() => toggleItem(item)}
                        className="absolute end-3 top-3 h-5 w-5 shrink-0 accent-[#2378E8]"
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

        <div className="flex items-center justify-between border-t border-[#DCE4EF] bg-white pt-3">
          <span className="text-[12.5px] text-[#5A6B84]">
            {copy.selectedCount(pendingSelection.size)}
          </span>
          <button
            type="button"
            onClick={() => onConfirm(Array.from(pendingSelection.values()))}
            className="min-h-10 rounded-md bg-[#1D74E0] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[#155CB8] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
          >
            {copy.attach}
          </button>
        </div>
      </div>
    </Drawer>
  )
}
