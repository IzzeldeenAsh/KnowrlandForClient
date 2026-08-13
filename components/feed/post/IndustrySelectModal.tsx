'use client'

import { Modal } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { getApiUrl } from '@/app/config'

export interface IndustryOption {
  id: number
  name: string
  parentName?: string
}

interface IndustryNode {
  key: number
  label: string
  children: IndustryNode[]
}

type IndustrySelectModalProps = {
  locale: string
  opened: boolean
  selectedId: number | null
  onClose: () => void
  onSelect: (industry: IndustryOption) => void
}

const copyByLocale = {
  en: {
    title: 'Select industry',
    search: 'Search industries…',
    loading: 'Loading industries…',
    empty: 'No industries match your search.',
    error: 'Could not load industries.',
    retry: 'Try again',
    close: 'Close industry selection',
  },
  ar: {
    title: 'اختر المجال',
    search: 'ابحث في المجالات…',
    loading: 'جارٍ تحميل المجالات…',
    empty: 'لا توجد مجالات مطابقة لبحثك.',
    error: 'تعذر تحميل المجالات.',
    retry: 'حاول مرة أخرى',
    close: 'إغلاق اختيار المجال',
  },
} as const

// Module-level cache: the industry tree rarely changes within a session
const industriesCache: Record<string, IndustryNode[]> = {}
// De-dupe concurrent callers (e.g. IndustryField + IndustrySelectModal open at once)
const pendingFetches: Record<string, Promise<IndustryNode[]> | undefined> = {}

// A stalled connection never rejects on its own, so without a timeout the
// caller's loading state can hang forever. Bound every attempt so it always
// settles and the UI can fall back to a retryable error state.
const FETCH_TIMEOUT_MS = 12000

export async function fetchIndustryTree(locale: string): Promise<IndustryNode[]> {
  if (industriesCache[locale]) return industriesCache[locale]
  if (pendingFetches[locale]) return pendingFetches[locale]!

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  const request = fetch(getApiUrl('/api/common/setting/industry/tree'), {
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  })
    .then(async (response) => {
      if (!response.ok) throw new Error('Failed to fetch industries')
      const data = (await response.json()) as IndustryNode[]
      industriesCache[locale] = data ?? []
      return industriesCache[locale]
    })
    .finally(() => {
      clearTimeout(timeoutId)
      delete pendingFetches[locale]
    })

  pendingFetches[locale] = request
  return request
}

// Single-select radio indicator shown at the start of every selectable row.
function RadioDot({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`me-2.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${
        checked ? 'border-[#1D74E0]' : 'border-[#C2CEDE]'
      }`}
    >
      {checked ? <span className="h-2 w-2 rounded-full bg-[#1D74E0]" /> : null}
    </span>
  )
}

export type IndustryGroup = { parentKey: number; parentLabel: string; children: IndustryNode[] }

export function collectLeafGroups(nodes: IndustryNode[]): IndustryGroup[] {
  const groups: IndustryGroup[] = []

  const collectLeaves = (node: IndustryNode): IndustryNode[] =>
    node.children.length === 0 ? [node] : node.children.flatMap(collectLeaves)

  // The parent (top-level node) is itself selectable, so it is not injected as a
  // child here. A parent with no descendants simply yields an empty child list
  // and is picked via its own header row.
  for (const parent of nodes) {
    const children = parent.children.flatMap(collectLeaves)
    groups.push({ parentKey: parent.key, parentLabel: parent.label, children })
  }

  return groups
}

export default function IndustrySelectModal({
  locale,
  opened,
  selectedId,
  onClose,
  onSelect,
}: IndustrySelectModalProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']
  const [groups, setGroups] = useState<IndustryGroup[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [retryToken, setRetryToken] = useState(0)

  useEffect(() => {
    if (!opened) return

    let cancelled = false
    setSearchTerm('')
    setIsLoading(true)
    setHasError(false)
    fetchIndustryTree(locale)
      .then((tree) => {
        if (!cancelled) setGroups(collectLeafGroups(tree))
      })
      .catch(() => {
        if (!cancelled) {
          setGroups([])
          setHasError(true)
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [opened, locale, retryToken])

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (query === '') return groups

    return groups
      .map((group) => {
        // When the parent itself matches, keep all its children so the whole
        // group stays pickable; otherwise narrow to the matching children.
        if (group.parentLabel.toLowerCase().includes(query)) return group
        return {
          ...group,
          children: group.children.filter((child) => child.label.toLowerCase().includes(query)),
        }
      })
      .filter(
        (group) =>
          group.parentLabel.toLowerCase().includes(query) || group.children.length > 0,
      )
  }, [groups, searchTerm])

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<span className="text-[16px] font-bold text-[#0B1220]">{copy.title}</span>}
      size="md"
      radius={8}
      centered
      zIndex={310}
      closeButtonProps={{
        'aria-label': copy.close,
        className:
          'focus-visible:!outline-[1px] focus-visible:!outline-offset-1 focus-visible:!outline-[#B7D2F4]',
      }}
      styles={{
        content: { boxShadow: 'none', border: '1px solid #DCE4EF' },
      }}
    >
      <div className="relative mb-3">
        <label htmlFor="industry-search" className="sr-only">
          {copy.search}
        </label>
        <input
          id="industry-search"
          name="industry-search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          placeholder={copy.search}
          className="h-10 w-full rounded-md border border-[#D6E0EC] bg-white px-3 text-[13.5px] text-[#1C2433] transition-colors placeholder:text-[#94A3B8] focus-visible:border-[#8FB9EA] focus-visible:outline-none"
        />
      </div>

      <div className="h-[420px] overscroll-contain overflow-y-auto pe-1" aria-busy={isLoading}>
        {isLoading ? (
          <p role="status" className="py-8 text-center text-[13px] text-[#64748B]">
            {copy.loading}
          </p>
        ) : hasError ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-[13px] text-[#94A3B8]">{copy.error}</p>
            <button
              type="button"
              onClick={() => setRetryToken((previous) => previous + 1)}
              className="rounded-md border border-[#D6E0EC] px-4 py-1.5 text-[13px] font-medium text-[#1D74E0] transition-colors hover:bg-[#F3F6FB] focus-visible:outline-[1px] focus-visible:outline-offset-1 focus-visible:outline-[#B7D2F4]"
            >
              {copy.retry}
            </button>
          </div>
        ) : filteredGroups.length === 0 ? (
          <p className="py-8 text-center text-[13px] text-[#94A3B8]">{copy.empty}</p>
        ) : (
          filteredGroups.map((group) => {
            const isParentSelected = group.parentKey === selectedId
            return (
            <section
              key={group.parentKey}
              aria-labelledby={`industry-group-${group.parentKey}`}
              className="mb-4 overflow-hidden rounded-md border border-[#E1E8F1] bg-white"
            >
              <h3 id={`industry-group-${group.parentKey}`} className="m-0">
                <button
                  type="button"
                  aria-pressed={isParentSelected}
                  onClick={() => onSelect({ id: group.parentKey, name: group.parentLabel })}
                  className={`flex w-full items-center px-3 py-2.5 text-start text-[12px] font-bold transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ${
                    group.children.length > 0 ? 'border-b' : ''
                  } ${
                    isParentSelected
                      ? 'border-[#CBE0F8] bg-[#EAF3FE] text-[#1D5FAD]'
                      : 'border-[#DCE6F2] bg-[#F3F7FC] text-[#2168B5] hover:bg-[#EAF1FA]'
                  }`}
                >
                  <RadioDot checked={isParentSelected} />
                  <span className="min-w-0 truncate">{group.parentLabel}</span>
                </button>
              </h3>
              <ul>
                {group.children.map((child) => {
                  const isSelected = child.key === selectedId
                  return (
                    <li key={child.key} className="border-b border-[#E8EDF4] last:border-b-0">
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          onSelect({ id: child.key, name: child.label, parentName: group.parentLabel })
                        }
                        className={`flex min-h-12 w-full items-center px-3 py-2.5 text-start text-[13.5px] transition-colors focus-visible:outline-[1px] focus-visible:outline-offset-[-1px] focus-visible:outline-[#B7D2F4] ${
                          isSelected
                            ? 'bg-[#EAF3FE] font-semibold text-[#1D5FAD]'
                            : 'text-[#1C2433] hover:bg-[#F8FAFD]'
                        }`}
                      >
                        <RadioDot checked={isSelected} />
                        <span className="min-w-0 truncate">{child.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
            )
          })
        )}
      </div>
    </Modal>
  )
}
