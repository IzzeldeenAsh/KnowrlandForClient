'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { IconCheck, IconLayoutGridAdd } from '@tabler/icons-react'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { dayLabel } from './projectDeliverables'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { toProjectServiceRows, type ProjectServiceRow } from './projectServiceRows'
import { readStoredProjectServiceUuid } from './projectServiceUuid'
import { isServiceAddPending, projectWizardStepIds } from './projectWizardFlow'
import { serviceMetaForSlug } from './serviceMeta'
import {
  isSpecifiedInsighterProject,
  readStoredSpecifiedInsighterDisplay,
} from './specifiedInsighterProject'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

// Specific-insighter projects can bundle several services. While the client
// works on a service, this rail shows each project service as a card: the
// one in progress, the finished ones, and placeholders hinting that more can
// be added. It is an indicator only; services are added and edited from the
// services step.

/** Progress through a service's steps; the services step has no service in progress. */
const SERVICE_STAGES: Record<string, number> = {
  [projectWizardStepIds.service]: 0,
  [projectWizardStepIds.projectScope]: 1,
  [projectWizardStepIds.projectSubscopes]: 2,
  'deliverables-plan': 3,
}
const STAGE_COUNT = 4
const MIN_CARDS = 3

type RailCard =
  | { kind: 'current'; number: number; name: string; slug: string; isOther: boolean; stage: number }
  | { kind: 'done'; number: number; name: string; slug: string; isOther: boolean; complete: boolean; summary: string }
  | { kind: 'placeholder'; number: number; hint: string }

// Last fetched services per project, so the rail paints at once on the next step.
const rowsCache = new Map<string, ProjectServiceRow[]>()

async function fetchProjectServiceRows(locale: WizardLocale, projectUuid: string) {
  const token = getAuthToken()
  if (!token) return null
  const res = await fetch(getApiUrl(`/api/account/project/show/${projectUuid}`), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Accept-Language': locale === 'ar' ? 'ar' : 'en',
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = (await res.json()) as any
  return toProjectServiceRows(json?.data?.project_services)
}

function readActiveServiceLabel(locale: WizardLocale): string {
  try {
    return window.sessionStorage.getItem(projectWizardStorage.serviceLabelKey(locale)) || ''
  } catch {
    return ''
  }
}

function summaryFor(locale: WizardLocale, row: ProjectServiceRow): string {
  const isRTL = locale === 'ar'
  const scopes = row.scopeNames.length
  const deliverables = row.deliverables.length
  const firstDue = deliverables
    ? Math.min(...row.deliverables.map((d) => d.period_days))
    : null
  const parts = [
    scopes ? (isRTL ? `${scopes} نطاقات` : `${scopes} ${scopes === 1 ? 'scope' : 'scopes'}`) : '',
    deliverables
      ? isRTL
        ? `${deliverables} مخرجات`
        : `${deliverables} ${deliverables === 1 ? 'deliverable' : 'deliverables'}`
      : '',
    firstDue !== null ? dayLabel(locale, firstDue) : '',
  ].filter(Boolean)
  return parts.join(' · ')
}

function buildCards(
  locale: WizardLocale,
  step: string,
  rows: ProjectServiceRow[]
): RailCard[] {
  const isRTL = locale === 'ar'
  const stage = SERVICE_STAGES[step]
  const inService = stage !== undefined
  // While another service is being picked, the stored service is still the main one.
  const pendingAdd = isServiceAddPending(locale)
  const activeUuid = inService && !pendingAdd ? readStoredProjectServiceUuid(locale) : ''

  const cards: RailCard[] = rows.map((row, index) =>
    row.uuid === activeUuid
      ? { kind: 'current', number: index + 1, name: row.name, slug: row.slug, isOther: row.isOther, stage }
      : {
          kind: 'done',
          number: index + 1,
          name: row.name,
          slug: row.slug,
          isOther: row.isOther,
          complete: row.scopeNames.length > 0 && row.deliverables.length > 0,
          summary: summaryFor(locale, row),
        }
  )

  // No project service yet (the service is still being chosen).
  if (inService && !cards.some((card) => card.kind === 'current')) {
    cards.push({
      kind: 'current',
      number: cards.length + 1,
      name: pendingAdd ? '' : readActiveServiceLabel(locale),
      slug: '',
      isOther: false,
      stage,
    })
  }

  const current = cards.find((card) => card.kind === 'current')
  const firstPlaceholder = cards.length + 1
  const total = Math.max(MIN_CARDS, firstPlaceholder)
  for (let number = firstPlaceholder; number <= total; number += 1) {
    const first = number === firstPlaceholder
    cards.push({
      kind: 'placeholder',
      number,
      hint:
        first && current
          ? isRTL
            ? `اختيارية · أضفها بعد الخدمة ${current.number}`
            : `Optional · add it after service ${current.number}`
          : isRTL
            ? 'اختيارية'
            : 'Optional',
    })
  }

  return cards
}

function useServicesRail(locale: WizardLocale, step: string) {
  const [enabled, setEnabled] = useState(false)
  const [insighterName, setInsighterName] = useState('')
  const [cards, setCards] = useState<RailCard[]>([])

  useEffect(() => {
    if (!isSpecifiedInsighterProject(locale)) return
    setEnabled(true)
    setInsighterName(readStoredSpecifiedInsighterDisplay(locale)?.name || '')

    const projectUuid = readStoredProjectRequestUuid(locale)
    setCards(buildCards(locale, step, projectUuid ? rowsCache.get(projectUuid) ?? [] : []))
    if (!projectUuid) return

    let cancelled = false
    fetchProjectServiceRows(locale, projectUuid)
      .then((rows) => {
        if (cancelled || !rows) return
        rowsCache.set(projectUuid, rows)
        setCards(buildCards(locale, step, rows))
      })
      .catch(() => {
        // The rail is an indicator; keep what it shows.
      })
    return () => {
      cancelled = true
    }
  }, [locale, step])

  return { enabled, insighterName, cards }
}

function ServiceIconTile({ card, size }: { card: { slug: string; isOther: boolean }; size: 'sm' | 'md' }) {
  const meta = serviceMetaForSlug(card.isOther ? 'other' : card.slug)
  const Icon = meta.Icon
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${
        size === 'md' ? 'h-10 w-10 rounded-xl' : 'h-8 w-8 rounded-[10px]'
      } ${meta.iconClass}`}
    >
      <Icon size={size === 'md' ? 20 : 16} stroke={1.8} />
    </span>
  )
}

function StageBar({ stage, compact = false }: { stage: number; compact?: boolean }) {
  return (
    <div className={`grid grid-cols-4 ${compact ? 'gap-1' : 'gap-1.5'}`} aria-hidden="true">
      {Array.from({ length: STAGE_COUNT }, (_, index) => (
        <span
          key={index}
          className={`block rounded-full ${compact ? 'h-[3px]' : 'h-1'} ${
            index < stage
              ? 'bg-[#1C7CBB]'
              : index === stage
                ? `bg-[#1C7CBB] ${compact ? 'ring-2' : 'ring-[3px]'} ring-sky-100`
                : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

function stageText(locale: WizardLocale, stage: number) {
  const labels =
    locale === 'ar'
      ? ['اختيار الخدمة', 'اختيار النطاقات', 'اختيار النطاقات الفرعية', 'تخطيط المخرجات']
      : ['Picking the service', 'Choosing scopes', 'Choosing sub-scopes', 'Planning deliverables']
  return locale === 'ar'
    ? `الخطوة ${stage + 1} من ${STAGE_COUNT} · ${labels[stage]}`
    : `Step ${stage + 1} of ${STAGE_COUNT} · ${labels[stage]}`
}

function RailCardView({ locale, card }: { locale: WizardLocale; card: RailCard }) {
  const isRTL = locale === 'ar'

  if (card.kind === 'current') {
    return (
      <li
        aria-current="step"
        className="flex flex-col gap-3.5 rounded-2xl border-[1.5px] border-[#1C7CBB] bg-white p-4 shadow-[0_10px_28px_-16px_rgba(28,124,187,0.55)]"
      >
        <div className="flex items-center gap-3">
          {card.name ? (
            <ServiceIconTile card={card} size="md" />
          ) : (
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-dashed border-[#1C7CBB] bg-sky-50 text-[#1C7CBB]">
              <IconLayoutGridAdd size={20} stroke={1.8} />
            </span>
          )}
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1C7CBB]">
              {isRTL ? `الخدمة ${card.number} · قيد الإعداد` : `Service ${card.number} · In progress`}
            </span>
            <span className="truncate text-[15px] font-semibold text-slate-900">
              {card.name || (isRTL ? 'اختر خدمة' : 'Choose a service')}
            </span>
          </div>
        </div>
        <StageBar stage={card.stage} />
        <span className="text-xs text-slate-600">{stageText(locale, card.stage)}</span>
      </li>
    )
  }

  if (card.kind === 'done') {
    return (
      <li className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${
            card.complete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}
        >
          {card.complete ? (
            <IconCheck size={16} stroke={2.5} />
          ) : (
            <span className="text-[13px] font-semibold">{card.number}</span>
          )}
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold text-slate-900">{card.name}</span>
          <span
            className={`text-xs font-semibold ${card.complete ? 'text-emerald-700' : 'text-amber-700'}`}
          >
            {card.complete
              ? isRTL
                ? 'مكتملة'
                : 'Complete'
              : isRTL
                ? 'تحتاج إلى إكمال'
                : 'Needs completion'}
          </span>
          {card.summary ? <span className="text-xs text-slate-500">{card.summary}</span> : null}
        </div>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 rounded-2xl border-[1.5px] border-dashed border-slate-300 bg-white/50 p-3.5">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-slate-400 text-[13px] font-semibold text-slate-600">
        {card.number}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-semibold text-slate-700">
          {isRTL ? `الخدمة ${card.number}` : `Service ${card.number}`}
        </span>
        <span className="text-xs text-slate-500">{card.hint}</span>
      </div>
    </li>
  )
}

function CompactCardView({ locale, card }: { locale: WizardLocale; card: RailCard }) {
  const isRTL = locale === 'ar'

  if (card.kind === 'current') {
    return (
      <li
        aria-current="step"
        className="flex min-w-0 flex-col gap-2 rounded-[14px] border-[1.5px] border-[#1C7CBB] bg-white px-3 py-2.5"
      >
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1C7CBB]">
          {isRTL ? `الخدمة ${card.number}` : `Service ${card.number}`}
        </span>
        <span className="truncate text-[13px] font-semibold text-slate-900">
          {card.name || (isRTL ? 'اختر خدمة' : 'Choose a service')}
        </span>
        <StageBar stage={card.stage} compact />
      </li>
    )
  }

  if (card.kind === 'done') {
    return (
      <li className="flex min-w-0 flex-col justify-center gap-1 rounded-[14px] border border-slate-200 bg-white px-2.5 py-2">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-md ${
            card.complete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}
        >
          {card.complete ? <IconCheck size={12} stroke={2.5} /> : <span className="text-[11px] font-semibold">{card.number}</span>}
        </span>
        <span className="truncate text-[11px] font-semibold text-slate-700">{card.name}</span>
      </li>
    )
  }

  return (
    <li className="flex min-w-0 flex-col justify-center gap-1 rounded-[14px] border-[1.5px] border-dashed border-slate-300 bg-white/50 px-2.5 py-2">
      <span className="text-[13px] font-semibold text-slate-700">{card.number}</span>
      <span className="text-[11px] text-slate-500">{isRTL ? 'اختيارية' : 'Optional'}</span>
    </li>
  )
}

/**
 * Wraps a service step (service, scopes, sub-scopes, deliverables, services)
 * with the services rail for specific-insighter projects; other projects get
 * the step unchanged.
 */
export default function ProjectServicesRailLayout({
  locale,
  step,
  children,
}: {
  locale: WizardLocale
  step: string
  children: ReactNode
}) {
  const isRTL = locale === 'ar'
  const { enabled, insighterName, cards } = useServicesRail(locale, step)

  if (!enabled) return <>{children}</>

  const label = isRTL ? 'خدمات المشروع' : 'Project services'
  const compactColumns = cards
    .map((card) => (card.kind === 'current' ? 'minmax(0,2fr)' : 'minmax(0,1fr)'))
    .join(' ')

  return (
    <div className="mx-auto flex w-full max-w-[1440px] items-start gap-8 xl:gap-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <aside aria-label={label} className="sticky top-0 hidden w-[280px] shrink-0 pt-2 sm:pt-4 lg:block">
        <div className="flex flex-col gap-1 px-1 pb-3">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">{label}</span>
          <span className="text-[13px] leading-snug text-slate-500">
            {insighterName
              ? isRTL
                ? `اجمع خدمات ${insighterName} في مشروع واحد.`
                : `Bundle services from ${insighterName} in one project.`
              : isRTL
                ? 'اجمع عدة خدمات في مشروع واحد.'
                : 'Bundle several services in one project.'}
          </span>
        </div>
        <ol className="flex flex-col gap-3">
          {cards.map((card) => (
            <RailCardView key={`${card.kind}-${card.number}`} locale={locale} card={card} />
          ))}
        </ol>
      </aside>

      <div className="min-w-0 flex-1">
        <ol
          aria-label={label}
          className="mb-4 mt-2 grid gap-2 lg:hidden"
          style={{ gridTemplateColumns: compactColumns }}
        >
          {cards.map((card) => (
            <CompactCardView key={`${card.kind}-${card.number}`} locale={locale} card={card} />
          ))}
        </ol>
        {children}
      </div>
    </div>
  )
}
