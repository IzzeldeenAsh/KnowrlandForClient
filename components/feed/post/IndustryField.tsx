'use client'

import { IconChevronDown, IconHash, IconSearch } from '@tabler/icons-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  collectLeafGroups,
  fetchIndustryTree,
  type IndustryGroup,
  type IndustryOption,
} from './IndustrySelectModal'

const copyByLocale = {
  en: {
    label: 'Industry',
    placeholder: 'Select an industry',
    search: 'Search industries…',
    loading: 'Loading industries…',
    empty: 'No industries match your search.',
  },
  ar: {
    label: 'المجال',
    placeholder: 'اختر المجال',
    search: 'ابحث في المجالات…',
    loading: 'جارٍ تحميل المجالات…',
    empty: 'لا توجد مجالات مطابقة لبحثك.',
  },
} as const

type IndustryFieldProps = {
  locale: string
  value: IndustryOption | null
  invalid?: boolean
  errorId?: string
  buttonRef?: React.RefObject<HTMLButtonElement | null>
  onSelect: (option: IndustryOption) => void
  onBlur?: () => void
}

// Inline industry picker: renders as a normal form field that expands into a
// searchable, grouped list within the current modal — no nested dialog.
export default function IndustryField({
  locale,
  value,
  invalid,
  errorId,
  buttonRef,
  onSelect,
  onBlur,
}: IndustryFieldProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const [open, setOpen] = useState(false)
  const [groups, setGroups] = useState<IndustryGroup[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || groups.length > 0) return

    let cancelled = false
    setIsLoading(true)
    fetchIndustryTree(locale)
      .then((tree) => {
        if (!cancelled) setGroups(collectLeafGroups(tree))
      })
      .catch(() => {
        if (!cancelled) setGroups([])
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [open, groups.length, locale])

  // Collapse when clicking outside the field
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (query === '') return groups

    return groups
      .map((group) => ({
        ...group,
        children: group.children.filter((child) => child.label.toLowerCase().includes(query)),
      }))
      .filter((group) => group.children.length > 0)
  }, [groups, searchTerm])

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor="feed-post-industry-field" className="mb-1.5 block text-[13px] font-semibold text-[#0B1220]">
        {copy.label}
      </label>
      <button
        id="feed-post-industry-field"
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        onBlur={onBlur}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        className={`flex min-h-11 w-full items-center gap-2 rounded-md border bg-white px-3 py-2 text-[14px] transition-colors focus-visible:outline-none ${
          invalid
            ? 'border-[#C23B32] bg-[#FFF8F7]'
            : 'border-[#D6E0EC] focus-visible:border-[#8FB9EA]'
        }`}
      >
        <IconHash aria-hidden className="h-4 w-4 shrink-0 text-[#1D74E0]" stroke={2} />
        <span
          className={`min-w-0 flex-1 truncate text-start ${
            value ? 'font-medium text-[#1C2433]' : 'text-[#94A3B8]'
          }`}
        >
          {value?.name ?? copy.placeholder}
        </span>
        <IconChevronDown
          aria-hidden
          className={`h-4 w-4 shrink-0 text-[#5A6B84] transition-transform ${open ? 'rotate-180' : ''}`}
          stroke={2}
        />
      </button>

      {open && (
        <div className="mt-1.5 w-full rounded-md border border-[#DCE4EF] bg-white p-2 shadow-sm">
          <div className="relative mb-2">
            <IconSearch
              aria-hidden
              className="pointer-events-none absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]"
              stroke={2}
            />
            <label htmlFor="feed-post-industry-search" className="sr-only">
              {copy.search}
            </label>
            <input
              id="feed-post-industry-search"
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              placeholder={copy.search}
              className="h-9 w-full rounded-md border border-[#D6E0EC] bg-white pe-3 ps-8 text-[13.5px] text-[#1C2433] placeholder:text-[#94A3B8] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
            />
          </div>
          <div className="max-h-64 overflow-y-auto overscroll-contain pe-1" aria-busy={isLoading}>
            {isLoading ? (
              <p role="status" className="py-6 text-center text-[13px] text-[#64748B]">
                {copy.loading}
              </p>
            ) : filteredGroups.length === 0 ? (
              <p className="py-6 text-center text-[13px] text-[#94A3B8]">{copy.empty}</p>
            ) : (
              filteredGroups.map((group) => (
                <section key={group.parentKey} className="mb-2 last:mb-0">
                  <h3 className="px-2 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-[#2168B5]">
                    {group.parentLabel}
                  </h3>
                  <ul>
                    {group.children.map((child) => {
                      const isSelected = child.key === value?.id
                      return (
                        <li key={child.key}>
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => {
                              onSelect({ id: child.key, name: child.label, parentName: group.parentLabel })
                              setSearchTerm('')
                              setOpen(false)
                            }}
                            className={`flex min-h-10 w-full items-center rounded-md px-2 py-2 text-start text-[13.5px] transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ${
                              isSelected
                                ? 'bg-[#EAF3FE] font-semibold text-[#1D5FAD]'
                                : 'text-[#1C2433] hover:bg-[#F8FAFD]'
                            }`}
                          >
                            <span className="min-w-0 truncate">{child.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
