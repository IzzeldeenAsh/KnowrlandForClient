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
    close: 'Close industry selection',
  },
  ar: {
    title: 'اختر المجال',
    search: 'ابحث في المجالات…',
    loading: 'جارٍ تحميل المجالات…',
    empty: 'لا توجد مجالات مطابقة لبحثك.',
    close: 'إغلاق اختيار المجال',
  },
} as const

// Module-level cache: the industry tree rarely changes within a session
const industriesCache: Record<string, IndustryNode[]> = {}

async function fetchIndustryTree(locale: string): Promise<IndustryNode[]> {
  if (industriesCache[locale]) return industriesCache[locale]

  const response = await fetch(getApiUrl('/api/common/setting/industry/tree'), {
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch industries')

  const data = (await response.json()) as IndustryNode[]
  industriesCache[locale] = data ?? []
  return industriesCache[locale]
}

type IndustryGroup = { parentKey: number; parentLabel: string; children: IndustryNode[] }

function collectLeafGroups(nodes: IndustryNode[]): IndustryGroup[] {
  const groups: IndustryGroup[] = []

  const collectLeaves = (node: IndustryNode): IndustryNode[] =>
    node.children.length === 0 ? [node] : node.children.flatMap(collectLeaves)

  for (const parent of nodes) {
    const children = parent.children.length === 0 ? [parent] : parent.children.flatMap(collectLeaves)
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
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!opened) return

    let cancelled = false
    setSearchTerm('')
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
  }, [opened, locale])

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
        ) : filteredGroups.length === 0 ? (
          <p className="py-8 text-center text-[13px] text-[#94A3B8]">{copy.empty}</p>
        ) : (
          filteredGroups.map((group) => (
            <section
              key={group.parentKey}
              aria-labelledby={`industry-group-${group.parentKey}`}
              className="mb-4 overflow-hidden rounded-md border border-[#E1E8F1] bg-white"
            >
              <h3
                id={`industry-group-${group.parentKey}`}
                className="border-b border-[#DCE6F2] bg-[#F3F7FC] px-3 py-2.5 text-[12px] font-bold text-[#2168B5]"
              >
                {group.parentLabel}
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
    </Modal>
  )
}
