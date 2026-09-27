import { projectWizardStorage, type WizardLocale } from './wizardStorage'

export const projectComponentSlugs = ['target-market', 'data-sources-expected']
export function readProjectComponents(locale: WizardLocale): Record<string, unknown> {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(sessionStorage.getItem(projectWizardStorage.projectComponentsKey(locale)) || '{}') } catch { return {} }
}

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

export function updateServiceComponentPayload(
  locale: WizardLocale,
  slug: string,
  value: unknown
) {
  if (projectComponentSlugs.includes(slug)) {
    sessionStorage.setItem(projectWizardStorage.projectComponentsKey(locale), JSON.stringify({ ...readProjectComponents(locale), [slug]: value }))
    return
  }
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
  if (projectComponentSlugs.includes(slug)) return (readProjectComponents(locale)[slug] as T) ?? null
  const current = readServiceComponentsPayload(locale)
  return (current.components?.[slug] as T) ?? null
}

