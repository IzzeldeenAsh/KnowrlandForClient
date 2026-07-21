'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  IconBallFootball,
  IconBolt,
  IconBriefcase,
  IconBuilding,
  IconBuildingBank,
  IconBuildingMonument,
  IconCheck,
  IconCpu,
  IconDeviceMobile,
  IconDots,
  IconFlask2,
  IconHeartbeat,
  IconHome,
  IconLeaf,
  IconPackage,
  IconPlane,
  IconSearch,
  IconShoppingCart,
  IconSpeakerphone,
  IconTools,
  IconTruck,
  IconUsers,
  IconWorld,
  IconX,
} from '@tabler/icons-react'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { projectWizardStepIds } from '../projectWizardFlow'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { getApiUrl } from '@/app/config'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'

export type IndustryNode = {
  key: number
  label: string
  children?: IndustryNode[]
}

type TablerIcon = ComponentType<{ size?: number; stroke?: number; className?: string }>

type IndustryMeta = {
  Icon: TablerIcon
  iconClass: string
}

const INDUSTRY_META: Array<{
  words: string[]
  meta: IndustryMeta
}> = [
  { words: ['chemical', 'resource'], meta: { Icon: IconFlask2, iconClass: 'bg-blue-50 text-blue-600' } },
  { words: ['construction'], meta: { Icon: IconBuilding, iconClass: 'bg-amber-50 text-amber-600' } },
  { words: ['commerce', 'retail', 'trade'], meta: { Icon: IconShoppingCart, iconClass: 'bg-emerald-50 text-emerald-600' } },
  { words: ['economy', 'politic'], meta: { Icon: IconBuildingMonument, iconClass: 'bg-violet-50 text-violet-600' } },
  { words: ['energy', 'environment'], meta: { Icon: IconBolt, iconClass: 'bg-yellow-50 text-yellow-700' } },
  { words: ['health', 'pharma', 'medtech'], meta: { Icon: IconHeartbeat, iconClass: 'bg-rose-50 text-rose-600' } },
  { words: ['internet'], meta: { Icon: IconWorld, iconClass: 'bg-cyan-50 text-cyan-600' } },
  { words: ['life', 'society'], meta: { Icon: IconUsers, iconClass: 'bg-pink-50 text-pink-600' } },
  { words: ['real estate'], meta: { Icon: IconHome, iconClass: 'bg-teal-50 text-teal-600' } },
  { words: ['sport', 'recreation'], meta: { Icon: IconBallFootball, iconClass: 'bg-orange-50 text-orange-600' } },
  { words: ['management', 'professional', 'service'], meta: { Icon: IconBriefcase, iconClass: 'bg-indigo-50 text-indigo-600' } },
  { words: ['travel', 'tourism', 'hospitality'], meta: { Icon: IconPlane, iconClass: 'bg-sky-50 text-sky-600' } },
  { words: ['agriculture'], meta: { Icon: IconLeaf, iconClass: 'bg-lime-50 text-lime-700' } },
  { words: ['finance', 'insurance'], meta: { Icon: IconBuildingBank, iconClass: 'bg-cyan-50 text-cyan-700' } },
  { words: ['advertising', 'marketing', 'media'], meta: { Icon: IconSpeakerphone, iconClass: 'bg-fuchsia-50 text-fuchsia-600' } },
  { words: ['consumer', 'fmcg'], meta: { Icon: IconPackage, iconClass: 'bg-orange-50 text-orange-700' } },
  { words: ['technology', 'telecommunication'], meta: { Icon: IconDeviceMobile, iconClass: 'bg-violet-50 text-violet-600' } },
  { words: ['metal', 'electronic', 'mining', 'material'], meta: { Icon: IconCpu, iconClass: 'bg-slate-200 text-slate-700' } },
  { words: ['transportation', 'logistics'], meta: { Icon: IconTruck, iconClass: 'bg-blue-50 text-blue-700' } },
]

const FALLBACK_META: IndustryMeta = {
  Icon: IconTools,
  iconClass: 'bg-slate-100 text-slate-600',
}

function getIndustryMeta(industry: IndustryNode): IndustryMeta {
  const label = industry.label.trim().toLowerCase()
  return (
    INDUSTRY_META.find(({ words }) => words.some((word) => label.includes(word)))
      ?.meta || FALLBACK_META
  )
}

function safeParseId(value: string | null): number | null {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase()
}

function findSelectedParent(
  parents: IndustryNode[],
  storedParentId: number | null,
  storedIndustryId: number | null
): IndustryNode | null {
  if (storedParentId != null) {
    const storedParent = parents.find((parent) => parent.key === storedParentId)
    if (storedParent) return storedParent
  }

  if (storedIndustryId == null) return null
  return (
    parents.find(
      (parent) =>
        parent.key === storedIndustryId ||
        (parent.children || []).some((child) => child.key === storedIndustryId)
    ) || null
  )
}

export function IndustryCard({
  industry,
  checked,
  entered,
  index,
  disabled,
  onClick,
  isRTL,
  showIcon = true,
  compact = false,
}: {
  industry: IndustryNode
  checked: boolean
  entered: boolean
  index: number
  disabled: boolean
  onClick: () => void
  isRTL: boolean
  showIcon?: boolean
  compact?: boolean
}) {
  const meta = getIndustryMeta(industry)
  const IndustryIcon = meta.Icon

  if (compact) {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={onClick}
        className={`group flex min-h-14 items-center gap-3 px-4 py-3 text-start transition-colors disabled:cursor-not-allowed ${
          checked
            ? 'bg-sky-50 text-[#176a9f]'
            : 'bg-white text-slate-800 hover:bg-slate-50'
        }`}
      >
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.iconClass}`}
        >
          <IndustryIcon size={18} stroke={1.8} />
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">
          {industry.label}
        </span>
        <span
          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
            checked
              ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white'
              : 'border-slate-300 bg-white text-transparent group-hover:border-slate-400'
          }`}
          aria-hidden="true"
        >
          <IconCheck size={12} stroke={3} />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={onClick}
      style={{ transitionDelay: `${110 + Math.min(index, 16) * 35}ms` }}
      className={`group relative flex rounded-2xl border text-start transition-all duration-300 disabled:cursor-not-allowed ${
        showIcon
          ? 'min-h-[116px] items-center gap-3 p-3.5'
          : 'min-h-[72px] items-center p-4'
      } ${
        checked
          ? 'border-[#1C7CBB] bg-white shadow-sm ring-1 ring-[#1C7CBB]'
          : 'border-transparent bg-slate-100/80 hover:bg-slate-100'
      } ${entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      {showIcon ? (
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${meta.iconClass}`}
        >
          <IndustryIcon size={26} stroke={1.7} />
        </span>
      ) : null}
      <span
        className={`min-w-0 flex-1 text-base font-semibold leading-snug text-slate-900 ${
          !showIcon ? (isRTL ? 'pl-8' : 'pr-8') : ''
        }`}
      >
        {industry.label}
      </span>
      {checked ? (
        <span
          className={`absolute inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1C7CBB] text-white ${
            showIcon ? 'top-2.5' : 'top-1/2 -translate-y-1/2'
          } ${
            isRTL ? 'left-2.5' : 'right-2.5'
          }`}
        >
          <IconCheck size={12} stroke={3} />
        </span>
      ) : null}
    </button>
  )
}

export default function InsighterIndustryQuestion({ locale }: { locale: WizardLocale }) {
  const nav = useProjectWizardNavigation(locale)
  const router = useRouter()
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [parents, setParents] = useState<IndustryNode[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [showAllParents, setShowAllParents] = useState(false)
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

        if (!cancelled) {
          setParents(tree)
          try {
            const selectedParent = findSelectedParent(
              tree,
              safeParseId(
                window.sessionStorage.getItem(
                  projectWizardStorage.insighterIndustryParentIdKey(locale)
                )
              ),
              safeParseId(
                window.sessionStorage.getItem(
                  projectWizardStorage.insighterIndustryIdKey(locale)
                )
              )
            )
            setSelectedParentId(selectedParent?.key ?? null)
          } catch {
            setSelectedParentId(null)
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            getProjectApiErrorMessage(
              err,
              isRTL ? 'تعذر تحميل الصناعات.' : 'Failed to load industries.'
            )
          )
          setParents([])
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

  useEffect(() => {
    if (!showAllParents) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowAllParents(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showAllParents])

  const featuredParents = useMemo(() => (parents || []).slice(0, 11), [parents])
  const filteredParents = useMemo(() => {
    const query = normalizeSearchText(searchTerm)
    if (!query) return parents || []
    return (parents || []).filter((parent) =>
      normalizeSearchText(parent.label).includes(query)
    )
  }, [parents, searchTerm])
  const selectedParent = useMemo(
    () => (parents || []).find((parent) => parent.key === selectedParentId) || null,
    [parents, selectedParentId]
  )

  const persistParent = (parent: IndustryNode) => {
    const hasChildren = (parent.children || []).length > 0
    try {
      const previousParentId = safeParseId(
        window.sessionStorage.getItem(
          projectWizardStorage.insighterIndustryParentIdKey(locale)
        )
      )

      window.sessionStorage.setItem(
        projectWizardStorage.insighterIndustryParentIdKey(locale),
        String(parent.key)
      )
      window.sessionStorage.setItem(
        projectWizardStorage.insighterIndustryParentLabelKey(locale),
        parent.label
      )
      window.sessionStorage.setItem(
        projectWizardStorage.insighterIndustryParentHasChildrenKey(locale),
        hasChildren ? '1' : '0'
      )

      if (!hasChildren) {
        window.sessionStorage.setItem(
          projectWizardStorage.insighterIndustryIdKey(locale),
          String(parent.key)
        )
        window.sessionStorage.setItem(
          projectWizardStorage.insighterIndustryLabelKey(locale),
          parent.label
        )
      } else if (previousParentId !== parent.key) {
        window.sessionStorage.removeItem(
          projectWizardStorage.insighterIndustryIdKey(locale)
        )
        window.sessionStorage.removeItem(
          projectWizardStorage.insighterIndustryLabelKey(locale)
        )
      }
    } catch {
      // ignore
    }
    return hasChildren
  }

  const advanceFromParent = (parent: IndustryNode) => {
    if (isAdvancing) return
    setError(null)
    setSelectedParentId(parent.key)
    setShowAllParents(false)
    setIsAdvancing(true)

    const hasChildren = persistParent(parent)
    if (hasChildren) {
      router.push(nav.hrefFor(projectWizardStepIds.insighterSubIndustry))
      return
    }
    nav.goNext()
  }

  const onContinue = () => {
    if (!selectedParent || isAdvancing) return
    advanceFromParent(selectedParent)
  }

  const title = isRTL
    ? 'ما هي الصناعة الرئيسية لمشروعك؟'
    : 'What is your project\'s main industry?'

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
        ) : featuredParents.length > 0 ? (
          <div
            className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            role="radiogroup"
            aria-label={isRTL ? 'الصناعات الرئيسية' : 'Parent industries'}
          >
            {featuredParents.map((parent, index) => (
              <IndustryCard
                key={parent.key}
                industry={parent}
                checked={selectedParentId === parent.key}
                entered={entered}
                index={index}
                disabled={isAdvancing}
                onClick={() => advanceFromParent(parent)}
                isRTL={isRTL}
              />
            ))}

            <button
              type="button"
              disabled={isAdvancing}
              onClick={() => {
                setSearchTerm('')
                setShowAllParents(true)
              }}
              style={{ transitionDelay: '495ms' }}
              className={`group relative flex min-h-[116px] items-center gap-3 rounded-2xl border border-transparent bg-slate-100/80 p-3.5 text-start transition-all duration-300 hover:bg-slate-100 disabled:cursor-not-allowed ${
                entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <IconDots size={27} stroke={1.8} />
              </span>
              <span className="min-w-0 flex-1 text-base font-semibold leading-snug text-slate-900">
                {isRTL ? 'أخرى' : 'Other'}
              </span>
            </button>
          </div>
        ) : (
          <div className="text-sm font-semibold text-slate-500">
            {isRTL ? 'لا توجد صناعات متاحة.' : 'No industries available.'}
          </div>
        )}
      </div>

      {showAllParents ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowAllParents(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-industries-title"
            className="flex max-h-[min(720px,calc(100vh-2rem))] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl shadow-slate-900/20"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-5 py-4 sm:px-6">
              <div className="text-start">
                <h3 id="all-industries-title" className="text-xl font-bold text-slate-900">
                  {isRTL ? 'جميع الصناعات الرئيسية' : 'All parent industries'}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {isRTL
                    ? 'اختر صناعة رئيسية واحدة للمتابعة.'
                    : 'Choose one parent industry to continue.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllParents(false)}
                aria-label={isRTL ? 'إغلاق' : 'Close'}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="border-b border-slate-100 px-5 py-3.5 sm:px-6">
              <div className="relative">
                <span
                  className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                    isRTL ? 'right-3' : 'left-3'
                  }`}
                >
                  <IconSearch size={18} />
                </span>
                <input
                  autoFocus
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={isRTL ? 'ابحث عن صناعة رئيسية…' : 'Search parent industries…'}
                  className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-[#1C7CBB] focus:bg-white focus:ring-1 focus:ring-[#1C7CBB] ${
                    isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                  }`}
                />
              </div>
            </div>

            <div className="overflow-y-auto bg-slate-50/70 px-5 py-4 sm:px-6 sm:py-5">
              {filteredParents.length > 0 ? (
                <div
                  className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2"
                  role="radiogroup"
                  aria-label={isRTL ? 'جميع الصناعات الرئيسية' : 'All parent industries'}
                >
                  {filteredParents.map((parent, index) => (
                    <IndustryCard
                      key={parent.key}
                      industry={parent}
                      checked={selectedParentId === parent.key}
                      entered
                      index={index}
                      disabled={isAdvancing}
                      onClick={() => advanceFromParent(parent)}
                      isRTL={isRTL}
                      compact
                    />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-sm font-semibold text-slate-500">
                  {isRTL ? 'لا توجد نتائج مطابقة.' : 'No matching industries.'}
                </div>
              )}
            </div>
          </section>
        </div>,
        document.body
      ) : null}

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
              disabled={!selectedParent || isAdvancing}
              className={`btn-sm px-6 py-2 rounded-full ${
                selectedParent && !isAdvancing
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
