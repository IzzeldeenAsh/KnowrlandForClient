import { projectWizardStorage, type WizardLocale } from './wizardStorage'

export const specifiedInsighterQueryParam = 'specified_insighter'

function normalizeSpecifiedInsighterUuid(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

export function readStoredSpecifiedInsighterUuid(locale: WizardLocale): string {
  if (typeof window === 'undefined') return ''

  try {
    return normalizeSpecifiedInsighterUuid(
      window.sessionStorage.getItem(projectWizardStorage.specifiedInsighterUuidKey(locale))
    )
  } catch {
    return ''
  }
}

export function writeStoredSpecifiedInsighterUuid(
  locale: WizardLocale,
  insighterUuid: string
) {
  if (typeof window === 'undefined') return

  const normalizedInsighterUuid = normalizeSpecifiedInsighterUuid(insighterUuid)
  if (!normalizedInsighterUuid) return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.specifiedInsighterUuidKey(locale),
      normalizedInsighterUuid
    )
  } catch {
    // ignore storage access errors
  }
}

export function clearStoredSpecifiedInsighterUuid(locale: WizardLocale) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.removeItem(projectWizardStorage.specifiedInsighterUuidKey(locale))
  } catch {
    // ignore storage access errors
  }
}

export function isSpecifiedInsighterProject(locale: WizardLocale): boolean {
  return Boolean(readStoredSpecifiedInsighterUuid(locale))
}

export function getSpecifiedInsighterLabel(locale: WizardLocale): string {
  return locale === 'ar' ? 'خبير محدد' : 'Specified Insighter'
}
