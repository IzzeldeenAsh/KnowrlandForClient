import { diffIsoDays, todayIsoDate } from './projectSchedule'
import {
  readServiceComponentPayloadValue,
  updateServiceComponentPayload,
} from './serviceComponentsPayload'
import { type WizardLocale } from './wizardStorage'

// `deliverable-stage` component payload. Each deliverable is scheduled
// relative to the project start: `period_days = 0` means the start date.

export type DeliverableWay = 'on_platform' | 'session' | 'physical_workshop'

export type ProjectDeliverable = {
  title: string
  period_days: number
  report_type: string[]
  way: { selected: DeliverableWay; address: string | null }
}

/** A deliverable being edited: due day, formats and delivery method start unset. */
export type DeliverableDraft = Omit<ProjectDeliverable, 'period_days' | 'way'> & {
  period_days: number | null
  way: { selected: DeliverableWay | null; address: string | null }
}

export type DeliverableStagePayload = {
  deliverables: ProjectDeliverable[]
}

export const DELIVERABLE_STAGE_SLUG = 'deliverable-stage'
export const MAX_DELIVERABLES = 10

const WAYS: DeliverableWay[] = ['on_platform', 'session', 'physical_workshop']

function toWay(value: unknown): DeliverableWay {
  return WAYS.includes(value as DeliverableWay) ? (value as DeliverableWay) : 'on_platform'
}

function toPeriodDays(value: unknown): number {
  const days = Math.round(Number(value))
  return Number.isFinite(days) && days >= 0 ? days : 0
}

function toReportTypes(value: unknown): string[] {
  if (!Array.isArray(value)) return ['pdf']
  const types = value.map((item) => String(item || '').trim().toLowerCase()).filter(Boolean)
  return types.length > 0 ? Array.from(new Set(types)) : ['pdf']
}

export function defaultDeliverableTitle(locale: WizardLocale, index: number): string {
  if (locale === 'ar') {
    if (index === 0) return 'المسودة الأولى'
    if (index === 1) return 'النسخة النهائية'
    return `المخرج ${index + 1}`
  }

  if (index === 0) return 'First draft'
  if (index === 1) return 'Final version'
  return `Deliverable ${index + 1}`
}

/** New deliverables start empty — the client names it and picks its due day, format and delivery method. */
export function createDeliverable(): DeliverableDraft {
  return {
    title: '',
    period_days: null,
    report_type: [],
    way: { selected: null, address: null },
  }
}

function normalizeDeliverable(value: unknown, locale: WizardLocale, index: number) {
  const raw = (value && typeof value === 'object' ? value : {}) as Record<string, any>
  const way = (raw.way && typeof raw.way === 'object' ? raw.way : {}) as Record<string, any>
  const selected = toWay(way.selected)

  return {
    title: String(raw.title || '').trim() || defaultDeliverableTitle(locale, index),
    period_days: toPeriodDays(raw.period_days),
    report_type: toReportTypes(raw.report_type),
    way: {
      selected,
      address: selected === 'physical_workshop' ? String(way.address || '') : null,
    },
  } satisfies ProjectDeliverable
}

/** Converts the pre-phase-2 `{ first_draft, final_version }` shape (absolute dates). */
function fromLegacyStages(raw: Record<string, any>, locale: WizardLocale) {
  const stages = [raw.first_draft, raw.final_version]
  const today = todayIsoDate()

  return stages
    .map((stage, index) => {
      if (!stage || typeof stage !== 'object') return null
      const legacyWay = stage.way || {}
      const selected: DeliverableWay =
        Number(legacyWay.physical_workshop?.selected) > 0
          ? 'physical_workshop'
          : Number(legacyWay.session?.selected) > 0
            ? 'session'
            : 'on_platform'

      return {
        title: defaultDeliverableTitle(locale, index),
        period_days: stage.date ? Math.max(0, diffIsoDays(today, String(stage.date))) : 0,
        report_type: toReportTypes(stage.report_type),
        way: {
          selected,
          address:
            selected === 'physical_workshop'
              ? String(legacyWay.physical_workshop?.address || '')
              : null,
        },
      } satisfies ProjectDeliverable
    })
    .filter((item): item is ProjectDeliverable => Boolean(item))
}

/** Saved deliverables; empty until the client completes the deliverables step. */
export function readDeliverables(locale: WizardLocale): ProjectDeliverable[] {
  const raw = readServiceComponentPayloadValue<Record<string, any>>(locale, DELIVERABLE_STAGE_SLUG)

  if (raw && Array.isArray(raw.deliverables) && raw.deliverables.length > 0) {
    return raw.deliverables.map((item: unknown, index: number) =>
      normalizeDeliverable(item, locale, index)
    )
  }

  if (raw && (raw.first_draft || raw.final_version)) {
    const legacy = fromLegacyStages(raw, locale)
    if (legacy.length > 0) return legacy
  }

  return []
}

export function writeDeliverables(locale: WizardLocale, deliverables: ProjectDeliverable[]) {
  updateServiceComponentPayload(locale, DELIVERABLE_STAGE_SLUG, {
    deliverables: deliverables.map((item, index) => normalizeDeliverable(item, locale, index)),
  } satisfies DeliverableStagePayload)
}

/** Latest deliverable day — the project duration must cover it. */
export function latestDeliverableDay(deliverables: ProjectDeliverable[]): number {
  return deliverables.reduce((max, item) => Math.max(max, item.period_days), 0)
}

export function deliverableWayLabel(locale: WizardLocale, way: string): string {
  const labels: Record<string, { en: string; ar: string }> = {
    on_platform: { en: 'On platform', ar: 'على المنصة' },
    session: { en: 'Online session', ar: 'جلسة أونلاين' },
    physical_workshop: { en: 'In-person workshop', ar: 'ورشة حضورية' },
  }
  const label = labels[way]
  if (!label) return way
  return locale === 'ar' ? label.ar : label.en
}

export function dayLabel(locale: WizardLocale, days: number): string {
  if (locale === 'ar') {
    if (days === 0) return 'يوم البدء'
    if (days === 1) return 'بعد يوم'
    if (days === 2) return 'بعد يومين'
    return days <= 10 ? `بعد ${days} أيام` : `بعد ${days} يومًا`
  }

  if (days === 0) return 'Start day'
  return days === 1 ? '1 Day' : `${days} Days`
}

/** A due date is entered in days, weeks or months and always saved as days (a month counts as 30). */
export type DueUnit = 'days' | 'weeks' | 'months'
export const DUE_UNITS: DueUnit[] = ['days', 'weeks', 'months']
export const DUE_UNIT_DAYS: Record<DueUnit, number> = { days: 1, weeks: 7, months: 30 }

/** The largest whole unit that fits a saved due day. */
export function inferDueUnit(days: number | null): DueUnit {
  if (days !== null && days > 0 && days % DUE_UNIT_DAYS.months === 0) return 'months'
  if (days !== null && days > 0 && days % DUE_UNIT_DAYS.weeks === 0) return 'weeks'
  return 'days'
}

export function dueUnitLabel(locale: WizardLocale, unit: DueUnit): string {
  const labels = { days: ['Days', 'أيام'], weeks: ['Weeks', 'أسابيع'], months: ['Months', 'أشهر'] }[unit]
  return locale === 'ar' ? labels[1] : labels[0]
}

export function dueUnitHint(locale: WizardLocale, unit: DueUnit): string {
  if (locale === 'ar') return { days: 'يوم بعد البدء', weeks: 'أسبوع بعد البدء', months: 'شهر بعد البدء' }[unit]
  return `${unit} after start`
}

/** Pill text in the row's own unit, e.g. "2 Weeks"; falls back to days when the day count is not a whole unit. */
export function dueLabel(locale: WizardLocale, days: number, unit: DueUnit): string {
  const size = DUE_UNIT_DAYS[unit]
  if (unit === 'days' || days === 0 || days % size !== 0) return dayLabel(locale, days)
  const count = days / size
  if (locale === 'ar') {
    const [one, two, few, many] = unit === 'weeks' ? ['أسبوع', 'أسبوعين', 'أسابيع', 'أسبوعًا'] : ['شهر', 'شهرين', 'أشهر', 'شهرًا']
    if (count === 1) return `بعد ${one}`
    if (count === 2) return `بعد ${two}`
    return count <= 10 ? `بعد ${count} ${few}` : `بعد ${count} ${many}`
  }
  if (unit === 'weeks') return count === 1 ? '1 Week' : `${count} Weeks`
  return count === 1 ? '1 Month' : `${count} Months`
}

export function durationLabel(locale: WizardLocale, days: number): string {
  if (locale === 'ar') {
    if (days === 0) return 'نفس اليوم'
    if (days === 1) return 'يوم واحد'
    if (days === 2) return 'يومان'
    return days <= 10 ? `${days} أيام` : `${days} يومًا`
  }

  return days === 1 ? '1 Day' : `${days} Days`
}
