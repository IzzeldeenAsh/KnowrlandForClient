import { projectWizardStorage, type WizardLocale } from './wizardStorage'

// Project schedule is relative: a planned start date plus a duration in days.
// The planned close date is never stored — it is start + duration (before the
// contract is signed) or started_at + duration (after).

export type ProjectSchedule = {
  plannedStartDate: string
  durationDays: number
}

export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseIsoDate(value: string): Date | null {
  const [year, month, day] = String(value || '')
    .slice(0, 10)
    .split('-')
    .map((part) => Number(part))
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

export function todayIsoDate(): string {
  return toLocalIsoDate(new Date())
}

export function addDaysToIsoDate(value: string, days: number): string {
  const date = parseIsoDate(value)
  if (!date) return ''
  date.setDate(date.getDate() + days)
  return toLocalIsoDate(date)
}

/** Whole days from `from` to `to` (ISO dates); negative when `to` is earlier. */
export function diffIsoDays(from: string, to: string): number {
  const a = parseIsoDate(from)
  const b = parseIsoDate(to)
  if (!a || !b) return 0
  return Math.round((b.getTime() - a.getTime()) / 86_400_000)
}

export function formatIsoDate(
  value: string,
  locale: WizardLocale,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string {
  const date = parseIsoDate(value)
  if (!date) return value

  try {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', options).format(date)
  } catch {
    return value
  }
}

export function normalizeProjectType(value: string | null): string | null {
  if (!value) return null
  if (value === 'urgent' || value === 'urgent_request') return 'urgent_request'
  return value
}

export function isUrgentProjectType(value: string | null): boolean {
  return normalizeProjectType(value) === 'urgent_request'
}

/** Urgent requests must start today and finish within 24 hours. */
export const URGENT_MAX_DURATION_DAYS = 1

export function readProjectSchedule(locale: WizardLocale): ProjectSchedule | null {
  if (typeof window === 'undefined') return null

  try {
    const plannedStartDate = (
      window.sessionStorage.getItem(projectWizardStorage.plannedStartDateKey(locale)) || ''
    ).trim()
    const rawDuration = window.sessionStorage.getItem(
      projectWizardStorage.durationDaysKey(locale)
    )
    const durationDays = Number(rawDuration)

    if (!parseIsoDate(plannedStartDate) || rawDuration === null) return null
    if (!Number.isInteger(durationDays) || durationDays < 0) return null

    return { plannedStartDate, durationDays }
  } catch {
    return null
  }
}

export function writeProjectSchedule(locale: WizardLocale, schedule: ProjectSchedule) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.plannedStartDateKey(locale),
      schedule.plannedStartDate
    )
    window.sessionStorage.setItem(
      projectWizardStorage.durationDaysKey(locale),
      String(Math.max(0, Math.round(schedule.durationDays)))
    )
  } catch {
    // ignore
  }
}
