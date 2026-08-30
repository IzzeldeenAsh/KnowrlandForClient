'use client'

import { IconChevronDown, IconLoader2, IconX } from '@tabler/icons-react'
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useToast } from '@/components/toast/ToastContext'
import {
  createSuggestTag,
  fetchCommonTags,
  searchTags,
  type FeedTag,
} from '@/services/feed.service'

type TagSelectorProps = {
  locale: string
  industryId: number | null
  selectedTags: FeedTag[]
  onChange: (tags: FeedTag[]) => void
  disabled?: boolean
}

const copyByLocale = {
  en: {
    placeholder: 'Search or initiate a new tag',
    add: 'Add',
    choose: 'Choose a tag or create one',
    results: 'Search results',
    empty: 'No matching tags. Press Enter to create it.',
    unavailable: 'No tags available yet.',
    error: 'Unable to add the tag.',
  },
  ar: {
    placeholder: 'ابحث أو أضف وسمًا جديدًا',
    add: 'إضافة',
    choose: 'اختر وسمًا أو أنشئ وسمًا جديدًا',
    results: 'نتائج البحث',
    empty: 'لا توجد نتائج. اضغط Enter لإنشاء الوسم.',
    unavailable: 'لا توجد وسوم متاحة بعد.',
    error: 'تعذر إضافة الوسم.',
  },
} as const

const MAX_COMMON_TAG_SUGGESTIONS = 10

type DropdownPosition = {
  left: number
  width: number
  top?: number
  bottom?: number
}

export default function TagSelector({
  locale,
  industryId,
  selectedTags,
  onChange,
  disabled = false,
}: TagSelectorProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const toast = useToast()
  const listboxId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [commonTags, setCommonTags] = useState<FeedTag[]>([])
  const [searchResults, setSearchResults] = useState<FeedTag[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition | null>(null)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    fetchCommonTags(locale)
      .then((tags) => {
        if (active) setCommonTags(tags)
      })
      .catch(() => {
        if (active) setCommonTags([])
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [locale])

  useEffect(() => {
    const keyword = query.trim()
    if (!keyword) {
      setSearchResults([])
      return
    }

    let active = true
    const timeout = window.setTimeout(() => {
      setIsLoading(true)
      searchTags(keyword, locale)
        .then((tags) => {
          if (active) setSearchResults(tags)
        })
        .catch(() => {
          if (active) setSearchResults([])
        })
        .finally(() => {
          if (active) setIsLoading(false)
        })
    }, 250)

    return () => {
      active = false
      window.clearTimeout(timeout)
    }
  }, [locale, query])

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node
      if (!rootRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  // The composer sits inside a modal, whose ancestors may constrain overflow.
  // Render the listbox in a portal and pin it to the viewport so its options
  // remain visible regardless of the surrounding layout.
  const updateDropdownPosition = useCallback(() => {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return

    const viewportGutter = 8
    const availableBelow = window.innerHeight - rect.bottom
    const availableAbove = rect.top
    const shouldOpenAbove = availableBelow < 260 && availableAbove > availableBelow
    const width = Math.min(rect.width, window.innerWidth - viewportGutter * 2)
    const left = Math.max(viewportGutter, Math.min(rect.left, window.innerWidth - width - viewportGutter))

    setDropdownPosition(
      shouldOpenAbove
        ? { left, width, bottom: window.innerHeight - rect.top + 6 }
        : { left, width, top: rect.bottom + 6 },
    )
  }, [])

  useLayoutEffect(() => {
    if (!isOpen || disabled) return

    updateDropdownPosition()
    window.addEventListener('resize', updateDropdownPosition)
    window.addEventListener('scroll', updateDropdownPosition, true)
    return () => {
      window.removeEventListener('resize', updateDropdownPosition)
      window.removeEventListener('scroll', updateDropdownPosition, true)
    }
  }, [disabled, isOpen, updateDropdownPosition])

  const selectedIds = useMemo(() => new Set(selectedTags.map((tag) => tag.id)), [selectedTags])
  const visibleTags = (query.trim() ? searchResults : commonTags)
    .filter((tag) => !selectedIds.has(tag.id))
    .slice(0, query.trim() ? undefined : MAX_COMMON_TAG_SUGGESTIONS)

  const selectTag = (tag: FeedTag) => {
    if (!selectedIds.has(tag.id)) onChange([...selectedTags, tag])
    setQuery('')
    setIsOpen(true)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  const removeTag = (tagId: number) => {
    onChange(selectedTags.filter((tag) => tag.id !== tagId))
  }

  const addTag = async () => {
    const name = query.trim()
    if (!name || !industryId || isAdding) return

    const normalized = name.toLocaleLowerCase()
    const existing = [...commonTags, ...searchResults].find(
      (tag) => tag.name.trim().toLocaleLowerCase() === normalized,
    )
    if (existing) {
      selectTag(existing)
      return
    }

    setIsAdding(true)
    try {
      const created = await createSuggestTag(industryId, name, locale)
      onChange([...selectedTags, created])
      setQuery('')
      setIsOpen(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div ref={rootRef} className="relative mt-2">
      <div
        className={`flex min-h-11 w-full items-center gap-1.5 rounded-lg border bg-white px-2 py-1.5 transition-[border-color,box-shadow] ${
          isOpen
            ? 'border-[#7EADE8] shadow-[0_0_0_3px_rgba(35,120,232,0.10)]'
            : 'border-[#D6E0EC] hover:border-[#AFC4DE]'
        } ${disabled ? 'cursor-not-allowed bg-[#F5F7F9] opacity-70' : ''}`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(true)
            inputRef.current?.focus()
          }
        }}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {selectedTags.map((tag) => (
            <span key={tag.id} className="inline-flex h-7 max-w-full items-center gap-1 rounded-md bg-[#EEF2F6] px-2.5 text-xs font-medium text-[#26364C]">
              <span className="truncate">{tag.name}</span>
              <button
                type="button"
                aria-label={`Remove ${tag.name}`}
                onClick={(event) => {
                  event.stopPropagation()
                  removeTag(tag.id)
                }}
                className="rounded-sm text-[#6F7D90] transition-colors hover:text-[#26364C]"
              >
                <IconX aria-hidden className="h-3.5 w-3.5" stroke={2} />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isOpen}
            disabled={disabled}
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(event) => {
              setQuery(event.currentTarget.value)
              setIsOpen(true)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                void addTag()
              } else if (event.key === 'Escape') {
                setIsOpen(false)
              } else if (event.key === 'Backspace' && !query && selectedTags.length > 0) {
                removeTag(selectedTags[selectedTags.length - 1].id)
              }
            }}
            placeholder={copy.placeholder}
            className="h-7 min-w-[150px] flex-1 border-0 bg-transparent px-1 text-[13px] text-[#26364C] outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-[#98A4B3]"
          />
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            void addTag()
          }}
          disabled={!query.trim() || !industryId || isAdding}
          className="inline-flex h-7 shrink-0 items-center rounded-md px-2.5 text-xs font-semibold text-[#2378E8] transition-colors hover:bg-[#EDF4FD] disabled:cursor-default disabled:text-[#A7B1BF] disabled:hover:bg-transparent"
        >
          {isAdding ? <IconLoader2 aria-label={copy.add} className="h-3.5 w-3.5 animate-spin" /> : copy.add}
        </button>
        <IconChevronDown aria-hidden className={`h-4 w-4 shrink-0 text-[#7C899A] transition-transform ${isOpen ? 'rotate-180' : ''}`} stroke={1.8} />
      </div>

      {isOpen && !disabled && dropdownPosition && createPortal(
        <div
          ref={dropdownRef}
          id={listboxId}
          role="listbox"
          className="fixed z-[310] overflow-hidden rounded-lg border border-[#DCE3EB] bg-white shadow-[0_12px_28px_rgba(24,39,58,0.14)]"
          style={dropdownPosition}
        >
          <div className="border-b border-[#EDF0F3] px-3 py-2 text-[11px] font-medium text-[#7C899A]">
            {query.trim() ? copy.results : copy.choose}
          </div>
          <div className="max-h-52 overflow-y-auto p-2">
            {isLoading ? (
              <div className="flex h-12 items-center justify-center"><IconLoader2 aria-hidden className="h-4 w-4 animate-spin text-[#7C899A]" /></div>
            ) : visibleTags.length === 0 ? (
              <p className="px-2 py-3 text-xs text-[#8A96A5]">{query.trim() ? copy.empty : copy.unavailable}</p>
            ) : query.trim() ? (
              <div className="space-y-0.5">
                {visibleTags.map((tag) => (
                  <button key={tag.id} type="button" role="option" aria-selected="false" onClick={() => selectTag(tag)} className="flex w-full items-center rounded-md px-2.5 py-2 text-start text-[13px] text-[#26364C] transition-colors hover:bg-[#F1F4F7]">
                    {tag.name}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {visibleTags.map((tag) => (
                  <button key={tag.id} type="button" role="option" aria-selected="false" onClick={() => selectTag(tag)} className="rounded-md bg-[#EEF1F4] px-2.5 py-1.5 text-xs font-medium text-[#344154] transition-colors hover:bg-[#E1E6EB]">
                    {tag.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
