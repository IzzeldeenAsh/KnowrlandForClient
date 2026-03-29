import { projectWizardStorage, type WizardLocale } from './wizardStorage'

export type ProjectScopeSnapshotItem = {
  name: string
  subscopes: string[]
}

export type ProjectAddonsState = {
  kickoffMeeting: {
    enabled: boolean | null
    skipped: boolean
  }
}

export function createDefaultProjectAddonsState(): ProjectAddonsState {
  return {
    kickoffMeeting: {
      enabled: null,
      skipped: false,
    },
  }
}

function sanitizeScopeSnapshot(input: unknown): ProjectScopeSnapshotItem[] {
  if (!Array.isArray(input)) return []

  return input
    .map((item) => {
      const raw = item as Record<string, unknown>
      const name = String(raw.name || '').trim()
      const subscopes = Array.isArray(raw.subscopes)
        ? raw.subscopes
            .map((sub) => String(sub || '').trim())
            .filter(Boolean)
        : []

      if (!name) return null
      return { name, subscopes }
    })
    .filter((item): item is ProjectScopeSnapshotItem => Boolean(item))
}

function sanitizeProjectAddonsState(input: unknown): ProjectAddonsState {
  const defaults = createDefaultProjectAddonsState()
  const raw = input && typeof input === 'object' ? (input as Record<string, unknown>) : {}

  return {
    kickoffMeeting: {
      enabled:
        raw.kickoffMeeting && typeof raw.kickoffMeeting === 'object'
          ? typeof (raw.kickoffMeeting as Record<string, unknown>).enabled === 'boolean'
            ? Boolean((raw.kickoffMeeting as Record<string, unknown>).enabled)
            : defaults.kickoffMeeting.enabled
          : defaults.kickoffMeeting.enabled,
      skipped:
        raw.kickoffMeeting && typeof raw.kickoffMeeting === 'object'
          ? typeof (raw.kickoffMeeting as Record<string, unknown>).skipped === 'boolean'
            ? Boolean((raw.kickoffMeeting as Record<string, unknown>).skipped)
            : defaults.kickoffMeeting.skipped
          : defaults.kickoffMeeting.skipped,
    },
  }
}

export function readProjectAddonsState(locale: WizardLocale): ProjectAddonsState {
  if (typeof window === 'undefined') return createDefaultProjectAddonsState()

  try {
    const raw = window.sessionStorage.getItem(projectWizardStorage.projectAddonsKey(locale))
    if (!raw) return createDefaultProjectAddonsState()
    return sanitizeProjectAddonsState(JSON.parse(raw))
  } catch {
    return createDefaultProjectAddonsState()
  }
}

export function writeProjectAddonsState(
  locale: WizardLocale,
  state: ProjectAddonsState
) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.projectAddonsKey(locale),
      JSON.stringify(state)
    )
  } catch {
    // ignore
  }
}

export function updateProjectAddonsState(
  locale: WizardLocale,
  updater: (current: ProjectAddonsState) => ProjectAddonsState
) {
  const current = readProjectAddonsState(locale)
  writeProjectAddonsState(locale, updater(current))
}

export function readProjectScopeSnapshot(
  locale: WizardLocale
): ProjectScopeSnapshotItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.sessionStorage.getItem(
      projectWizardStorage.projectScopeSnapshotKey(locale)
    )
    if (!raw) return []
    return sanitizeScopeSnapshot(JSON.parse(raw))
  } catch {
    return []
  }
}

export function writeProjectScopeSnapshot(
  locale: WizardLocale,
  scopes: ProjectScopeSnapshotItem[]
) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.projectScopeSnapshotKey(locale),
      JSON.stringify(sanitizeScopeSnapshot(scopes))
    )
  } catch {
    // ignore
  }
}
