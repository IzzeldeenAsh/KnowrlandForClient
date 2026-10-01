import { readProjectComponentSlugs } from './projectComponentsCatalog'
import {
  readStoredProjectServiceUuid,
  writeStoredProjectServiceUuid,
} from './projectServiceUuid'
import {
  readServiceComponentsPayload,
  writeServiceComponentsPayload,
} from './serviceComponentsPayload'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

// Specific-insighter projects can hold several project services. The wizard
// steps for scopes and service components read one set of storage keys, so
// each project service keeps its answers in a saved "session" that is swapped
// in when the client works on that service.

type ServiceSession = {
  values: Record<string, string>
  components: Record<string, unknown>
}

export type ServiceFlow = {
  mode: 'add' | 'edit'
  projectServiceUuid: string
}

function scopedKeys(locale: WizardLocale): string[] {
  return [
    projectWizardStorage.serviceIdsKey(locale),
    projectWizardStorage.serviceLabelKey(locale),
    projectWizardStorage.servicePromptKey(locale),
    projectWizardStorage.serviceIsOtherKey(locale),
    projectWizardStorage.serviceScopeParentIdsKey(locale),
    projectWizardStorage.serviceScopeChildIdsByParentKey(locale),
    projectWizardStorage.serviceScopeHasChildrenKey(locale),
    projectWizardStorage.serviceManualScopesKey(locale),
    projectWizardStorage.serviceManualSubscopesByScopeKey(locale),
    projectWizardStorage.serviceAiSuggestedScopesKey(locale),
    projectWizardStorage.projectScopeSnapshotKey(locale),
    projectWizardStorage.serviceComponentSlugsKey(locale),
  ]
}

function readJson<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function splitComponents(locale: WizardLocale) {
  const projectSlugs = new Set(readProjectComponentSlugs(locale))
  const { components } = readServiceComponentsPayload(locale)
  const projectLevel: Record<string, unknown> = {}
  const serviceLevel: Record<string, unknown> = {}

  for (const [slug, value] of Object.entries(components || {})) {
    if (projectSlugs.has(slug)) projectLevel[slug] = value
    else serviceLevel[slug] = value
  }

  return { projectLevel, serviceLevel }
}

/** Saves the active service's answers under its project service UUID. */
export function saveActiveServiceSession(locale: WizardLocale) {
  if (typeof window === 'undefined') return
  const uuid = readStoredProjectServiceUuid(locale)
  if (!uuid) return

  const values: Record<string, string> = {}
  for (const key of scopedKeys(locale)) {
    const value = window.sessionStorage.getItem(key)
    if (value !== null) values[key] = value
  }

  const session: ServiceSession = { values, components: splitComponents(locale).serviceLevel }
  try {
    window.sessionStorage.setItem(
      projectWizardStorage.serviceSessionKey(locale, uuid),
      JSON.stringify(session)
    )
  } catch {
    // ignore
  }
}

/**
 * Makes `projectServiceUuid` the active service: saves the current one, then
 * restores the target's saved answers (or starts it blank with `seed`).
 */
export function activateServiceSession(
  locale: WizardLocale,
  projectServiceUuid: string,
  seed: Record<string, string> = {}
) {
  if (typeof window === 'undefined') return
  saveActiveServiceSession(locale)

  const saved = readJson<ServiceSession>(
    projectWizardStorage.serviceSessionKey(locale, projectServiceUuid)
  )
  const { projectLevel } = splitComponents(locale)

  try {
    for (const key of scopedKeys(locale)) window.sessionStorage.removeItem(key)
    const values = saved?.values ?? seed
    for (const [key, value] of Object.entries(values)) window.sessionStorage.setItem(key, value)
  } catch {
    // ignore
  }

  writeServiceComponentsPayload(locale, {
    components: { ...(saved?.components ?? {}), ...projectLevel },
  })
  writeStoredProjectServiceUuid(locale, projectServiceUuid)
}

export function readPrimaryProjectServiceUuid(locale: WizardLocale): string {
  if (typeof window === 'undefined') return ''
  try {
    return window.sessionStorage.getItem(projectWizardStorage.primaryProjectServiceUuidKey(locale)) || ''
  } catch {
    return ''
  }
}

export function writePrimaryProjectServiceUuid(locale: WizardLocale, uuid: string) {
  if (typeof window === 'undefined' || !uuid) return
  try {
    window.sessionStorage.setItem(projectWizardStorage.primaryProjectServiceUuidKey(locale), uuid)
  } catch {
    // ignore
  }
}

export function readServiceFlow(locale: WizardLocale): ServiceFlow | null {
  if (typeof window === 'undefined') return null
  const flow = readJson<ServiceFlow>(projectWizardStorage.serviceFlowKey(locale))
  return flow?.projectServiceUuid ? flow : null
}

/** Starts the add/edit sub-flow for an additional service (scopes → components → review). */
export function startServiceFlow(
  locale: WizardLocale,
  flow: ServiceFlow,
  seed: Record<string, string> = {}
) {
  if (typeof window === 'undefined') return
  if (!readPrimaryProjectServiceUuid(locale)) {
    writePrimaryProjectServiceUuid(locale, readStoredProjectServiceUuid(locale))
  }

  activateServiceSession(locale, flow.projectServiceUuid, seed)
  try {
    window.sessionStorage.setItem(projectWizardStorage.serviceFlowKey(locale), JSON.stringify(flow))
  } catch {
    // ignore
  }
}

/** Ends the sub-flow and switches the wizard back to the primary service. */
export function finishServiceFlow(locale: WizardLocale) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(projectWizardStorage.serviceFlowKey(locale))
  } catch {
    // ignore
  }

  const primary = readPrimaryProjectServiceUuid(locale)
  if (primary && primary !== readStoredProjectServiceUuid(locale)) {
    activateServiceSession(locale, primary)
  }
}

export function forgetServiceSession(locale: WizardLocale, projectServiceUuid: string) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(projectWizardStorage.serviceSessionKey(locale, projectServiceUuid))
  } catch {
    // ignore
  }
}

/** Latest deliverable day across the saved sessions of the other project services. */
export function latestSavedSessionDeliverableDay(locale: WizardLocale): number {
  if (typeof window === 'undefined') return 0
  const prefix = projectWizardStorage.serviceSessionKey(locale, '')
  const active = readStoredProjectServiceUuid(locale)
  let latest = 0

  try {
    for (let index = 0; index < window.sessionStorage.length; index += 1) {
      const key = window.sessionStorage.key(index)
      if (!key?.startsWith(prefix) || key === prefix + active) continue
      const session = readJson<ServiceSession>(key)
      const deliverables = (session?.components?.['deliverable-stage'] as any)?.deliverables
      if (!Array.isArray(deliverables)) continue
      for (const item of deliverables) {
        latest = Math.max(latest, Math.round(Number(item?.period_days)) || 0)
      }
    }
  } catch {
    return latest
  }

  return latest
}
