import { readProjectComponentSlugs } from './projectComponentsCatalog'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

export type ServiceComponentsPayload = {
  components: Record<string, unknown>
}

export function readServiceComponentsPayload(locale: WizardLocale): ServiceComponentsPayload {
  if (typeof window === 'undefined') return { components: {} }

  try {
    const raw = window.sessionStorage.getItem(
      projectWizardStorage.serviceComponentsPayloadKey(locale)
    )
    if (!raw) return { components: {} }
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return { components: {} }
    const obj = parsed as ServiceComponentsPayload
    if (!obj.components || typeof obj.components !== 'object') return { components: {} }
    return obj
  } catch {
    return { components: {} }
  }
}

export function writeServiceComponentsPayload(
  locale: WizardLocale,
  payload: ServiceComponentsPayload
) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(
      projectWizardStorage.serviceComponentsPayloadKey(locale),
      JSON.stringify(payload)
    )
  } catch {
    // ignore
  }
}

/** Clears service answers while preserving applicable project-level answers. */
export function resetServiceComponentsPayload(locale: WizardLocale, preserveProjectAnswers = true) {
  const projectSlugs = new Set(preserveProjectAnswers ? readProjectComponentSlugs(locale) : [])
  const { components } = readServiceComponentsPayload(locale)
  writeServiceComponentsPayload(locale, {
    components: Object.fromEntries(
      Object.entries(components || {}).filter(([slug]) => projectSlugs.has(slug))
    ),
  })
}

export function updateServiceComponentPayload(
  locale: WizardLocale,
  slug: string,
  value: unknown
) {
  const current = readServiceComponentsPayload(locale)
  writeServiceComponentsPayload(locale, {
    components: {
      ...(current.components || {}),
      [slug]: value,
    },
  })
}

export function readServiceComponentPayloadValue<T = unknown>(
  locale: WizardLocale,
  slug: string
): T | null {
  const current = readServiceComponentsPayload(locale)
  return (current.components?.[slug] as T) ?? null
}
