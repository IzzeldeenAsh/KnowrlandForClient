import { projectWizardStorage, type WizardLocale } from './wizardStorage'

export const specifiedInsighterQueryParam = 'specified_insighter'
export const specifiedInsighterRoleQueryParam = 'specified_insighter_role'
export const specifiedInsighterProfileUuidQueryParam = 'specified_insighter_profile_uuid'

export type SpecifiedInsighterRole = 'insighter' | 'company'

export type SpecifiedInsighterDisplay = {
  role: SpecifiedInsighterRole
  uuid: string
  name: string
  imageUrl: string | null
}

export const specifiedInsighterDisplayUpdatedEvent = 'specified-insighter-display-updated'

function normalizeSpecifiedInsighterUuid(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

export function normalizeSpecifiedInsighterRole(value: unknown): SpecifiedInsighterRole {
  return value === 'company' ? 'company' : 'insighter'
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
    window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent))
  } catch {
    // ignore storage access errors
  }
}

export function readStoredSpecifiedInsighterRole(locale: WizardLocale): SpecifiedInsighterRole {
  if (typeof window === 'undefined') return 'insighter'

  try {
    return normalizeSpecifiedInsighterRole(
      window.sessionStorage.getItem(projectWizardStorage.specifiedInsighterRoleKey(locale))
    )
  } catch {
    return 'insighter'
  }
}

export function writeStoredSpecifiedInsighterRole(
  locale: WizardLocale,
  role: SpecifiedInsighterRole
) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.specifiedInsighterRoleKey(locale),
      normalizeSpecifiedInsighterRole(role)
    )
  } catch {
    // ignore storage access errors
  }
}

export function readStoredSpecifiedInsighterProfileUuid(locale: WizardLocale): string {
  if (typeof window === 'undefined') return ''

  try {
    return normalizeSpecifiedInsighterUuid(
      window.sessionStorage.getItem(projectWizardStorage.specifiedInsighterProfileUuidKey(locale))
    )
  } catch {
    return ''
  }
}

export function writeStoredSpecifiedInsighterProfileUuid(
  locale: WizardLocale,
  profileUuid: string
) {
  if (typeof window === 'undefined') return

  const normalizedProfileUuid = normalizeSpecifiedInsighterUuid(profileUuid)
  if (!normalizedProfileUuid) return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.specifiedInsighterProfileUuidKey(locale),
      normalizedProfileUuid
    )
  } catch {
    // ignore storage access errors
  }
}

export function readStoredSpecifiedInsighterDisplay(
  locale: WizardLocale
): SpecifiedInsighterDisplay | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.sessionStorage.getItem(
      projectWizardStorage.specifiedInsighterDisplayKey(locale)
    )
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<SpecifiedInsighterDisplay>
    const role = normalizeSpecifiedInsighterRole(parsed.role)
    const uuid = normalizeSpecifiedInsighterUuid(parsed.uuid)
    const name = typeof parsed.name === 'string' ? parsed.name.trim() : ''
    const imageUrl = typeof parsed.imageUrl === 'string' && parsed.imageUrl.trim()
      ? parsed.imageUrl.trim()
      : null

    if (!uuid || !name) return null
    return { role, uuid, name, imageUrl }
  } catch {
    return null
  }
}

export function writeStoredSpecifiedInsighterDisplay(
  locale: WizardLocale,
  display: SpecifiedInsighterDisplay
) {
  if (typeof window === 'undefined') return

  const uuid = normalizeSpecifiedInsighterUuid(display.uuid)
  const name = display.name.trim()
  if (!uuid || !name) return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.specifiedInsighterDisplayKey(locale),
      JSON.stringify({
        role: normalizeSpecifiedInsighterRole(display.role),
        uuid,
        name,
        imageUrl: display.imageUrl?.trim() || null,
      })
    )
    window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent))
  } catch {
    // ignore storage access errors
  }
}

export function clearStoredSpecifiedInsighterDisplay(locale: WizardLocale) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.removeItem(projectWizardStorage.specifiedInsighterDisplayKey(locale))
    window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent))
  } catch {
    // ignore storage access errors
  }
}

export function clearStoredSpecifiedInsighterUuid(locale: WizardLocale) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.removeItem(projectWizardStorage.specifiedInsighterUuidKey(locale))
    window.sessionStorage.removeItem(projectWizardStorage.specifiedInsighterRoleKey(locale))
    window.sessionStorage.removeItem(projectWizardStorage.specifiedInsighterProfileUuidKey(locale))
    window.sessionStorage.removeItem(projectWizardStorage.specifiedInsighterDisplayKey(locale))
    window.dispatchEvent(new CustomEvent(specifiedInsighterDisplayUpdatedEvent))
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
