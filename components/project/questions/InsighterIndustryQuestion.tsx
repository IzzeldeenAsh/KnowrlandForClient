'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { IconCheck, IconSearch } from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { getApiUrl } from '@/app/config'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'

type IndustryNode = {
  key: number
  label: string
  children?: IndustryNode[]
}

type IndustryLeaf = {
  id: number
  name: string
}

type IndustryGroup = {
  parentKey: number
  parentLabel: string
  children: IndustryLeaf[]
}

function collectLeaves(node: IndustryNode, acc: IndustryLeaf[]) {
  const children = node.children || []
  if (children.length === 0) {
    acc.push({ id: node.key, name: node.label })
    return
  }
  for (const child of children) collectLeaves(child, acc)
}

function buildIndustryGroups(tree: IndustryNode[]): IndustryGroup[] {
  const groups: IndustryGroup[] = []
  for (const parent of tree) {
    const leaves: IndustryLeaf[] = []
    collectLeaves(parent, leaves)
    if (leaves.length > 0) {
      groups.push({ parentKey: parent.key, parentLabel: parent.label, children: leaves })
    }
  }
  return groups
}

function safeParseSelectedIndustryId(value: string | null): number | null {
  if (!value) return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase()
}

export default function InsighterIndustryQuestion({ locale }: { locale: WizardLocale }) {
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [groups, setGroups] = useState<IndustryGroup[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useProjectStepErrorToast(error, locale)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      setSelectedId(
        safeParseSelectedIndustryId(
          window.sessionStorage.getItem(
            projectWizardStorage.insighterIndustryIdKey(locale)
          )
        )
      )
    } catch {
      // ignore
    }
  }, [locale])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setError(null)
      setLoading(true)
      try {
        const res = await fetch(getApiUrl('/api/common/setting/industry/tree'), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
          },
          cache: 'no-store',
        })
        await assertProjectApiResponse(res)
        const json = (await res.json()) as { data?: IndustryNode[] } | IndustryNode[]
        const tree = Array.isArray(json) ? json : json.data || []
        if (!cancelled) setGroups(buildIndustryGroups(tree))
      } catch (err) {
        if (!cancelled) {
          setError(
            getProjectApiErrorMessage(
              err,
              isRTL ? 'تعذر تحميل الصناعات.' : 'Failed to load industries.'
            )
          )
          setGroups([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [isRTL, locale])

  const title = isRTL
    ? 'ما هي الصناعة التي يعمل بها مشروعك؟'
    : 'Which industry does your project belong to?'

  const filteredGroups = useMemo(() => {
    const list = groups || []
    const q = normalizeSearchText(searchTerm)
    if (!q) return list
    return list
      .map((group) => ({
        ...group,
        children: group.children.filter((leaf) =>
          normalizeSearchText(leaf.name).includes(q)
        ),
      }))
      .filter((group) => group.children.length > 0)
  }, [groups, searchTerm])

  const selectedLeaf = useMemo(() => {
    for (const group of groups || []) {
      const match = group.children.find((leaf) => leaf.id === selectedId)
      if (match) return match
    }
    return null
  }, [groups, selectedId])

  const canContinue = selectedId != null && groups != null

  const persistSelection = (leaf: IndustryLeaf) => {
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.insighterIndustryIdKey(locale),
        String(leaf.id)
      )
      window.sessionStorage.setItem(
        projectWizardStorage.insighterIndustryLabelKey(locale),
        leaf.name
      )
    } catch {
      // ignore
    }
  }

  const onSelect = (leaf: IndustryLeaf) => {
    if (isAdvancing) return
    if (leaf.id === selectedId) {
      setIsAdvancing(true)
      nav.goNext()
      return
    }
    setError(null)
    setSelectedId(leaf.id)
    persistSelection(leaf)
    setIsAdvancing(true)
    nav.goNext()
  }

  const onContinue = () => {
    if (!canContinue || isAdvancing) return
    if (selectedLeaf) persistSelection(selectedLeaf)
    setIsAdvancing(true)
    nav.goNext()
  }

  let leafIndex = 0

  return (
    <div className="w-full max-w-6xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
      />

      <div
        className={`mt-2 text-start transition-all duration-700 ${
          entered
            ? 'opacity-100 translate-x-0'
            : isRTL
              ? 'opacity-0 translate-x-4'
              : 'opacity-0 -translate-x-4'
        }`}
      >
        {isEnglish ? (
          <style>{`
            #insighter-industry-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="insighter-industry-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {title}
        </h2>
      </div>

      {error ? (
        <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
      ) : null}

      <div className="mt-6 sm:mt-8 pb-[100px] lg:pb-0">
        {loading ? (
          <div className="text-sm font-semibold text-slate-600">
            {isRTL ? 'جاري التحميل…' : 'Loading…'}
          </div>
        ) : (
          <>
            <div className="relative mb-6 max-w-md">
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                  isRTL ? 'right-3' : 'left-3'
                }`}
              >
                <IconSearch size={18} />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                dir={isRTL ? 'rtl' : 'ltr'}
                placeholder={isRTL ? 'ابحث عن صناعة…' : 'Search for an industry…'}
                className={`w-full rounded-xl border border-slate-200/80 bg-white/85 py-2.5 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-[#1C7CBB] focus:ring-1 focus:ring-[#1C7CBB] ${
                  isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                }`}
              />
            </div>

            {filteredGroups.length > 0 ? (
              <div className="space-y-7">
                {filteredGroups.map((group) => (
                  <section key={group.parentKey}>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#1C7CBB]">
                      {group.parentLabel}
                    </h3>
                    <div
                      className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                      role="radiogroup"
                      aria-label={group.parentLabel}
                    >
                      {group.children.map((leaf) => {
                        const checked = selectedId === leaf.id
                        const delay = 90 + Math.min(leafIndex, 16) * 25
                        leafIndex += 1
                        return (
                          <button
                            key={leaf.id}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            disabled={isAdvancing}
                            onClick={() => onSelect(leaf)}
                            style={{ transitionDelay: `${delay}ms` }}
                            className={`group relative flex min-h-[60px] items-center gap-3 rounded-2xl border p-3.5 text-start transition-all duration-300 disabled:cursor-not-allowed ${
                              checked
                                ? 'border-[#1C7CBB] bg-white shadow-sm ring-1 ring-[#1C7CBB]'
                                : 'border-slate-200/70 bg-white/70 hover:border-slate-300 hover:bg-white'
                            } ${
                              entered
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-2 opacity-0'
                            }`}
                          >
                            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-900">
                              {leaf.name}
                            </span>
                            {checked ? (
                              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1C7CBB] text-white">
                                <IconCheck size={12} stroke={3} />
                              </span>
                            ) : null}
                          </button>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="text-sm font-semibold text-slate-500">
                {isRTL ? 'لا توجد نتائج مطابقة.' : 'No matching industries.'}
              </div>
            )}
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue || isAdvancing}
              className={`btn-sm px-6 py-2 rounded-full ${
                canContinue && !isAdvancing
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
              }`}
            >
              {nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
