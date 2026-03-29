import { projectWizardStorage, type WizardLocale } from './wizardStorage'

function normalizeProjectRequestUuid(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

export function extractProjectRequestUuid(payload: unknown): string {
  const data = (payload as any)?.data ?? payload
  return normalizeProjectRequestUuid((data as any)?.uuid ?? (data as any)?.id)
}

export function readStoredProjectRequestUuid(locale: WizardLocale): string {
  if (typeof window === 'undefined') return ''

  try {
    return (
      normalizeProjectRequestUuid(
        window.sessionStorage.getItem(projectWizardStorage.projectUuidKey(locale))
      ) ||
      normalizeProjectRequestUuid(
        window.sessionStorage.getItem(projectWizardStorage.legacyProjectIdKey(locale))
      )
    )
  } catch {
    return ''
  }
}

export function writeStoredProjectRequestUuid(
  locale: WizardLocale,
  projectUuid: string
) {
  if (typeof window === 'undefined') return

  const normalizedProjectUuid = normalizeProjectRequestUuid(projectUuid)
  if (!normalizedProjectUuid) return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.projectUuidKey(locale),
      normalizedProjectUuid
    )
    window.sessionStorage.removeItem(projectWizardStorage.legacyProjectIdKey(locale))
  } catch {
    // ignore storage access errors
  }
}

export function clearStoredProjectRequestUuid(locale: WizardLocale) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.removeItem(projectWizardStorage.projectUuidKey(locale))
    window.sessionStorage.removeItem(projectWizardStorage.legacyProjectIdKey(locale))
  } catch {
    // ignore storage access errors
  }
}
