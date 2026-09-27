import {
  activeServiceStorageKey,
  projectWizardStorage,
  type WizardLocale,
} from './wizardStorage'

export type WizardService = {
  uuid: string
  serviceId: number
  label: string
  slug?: string
  isOther: boolean
  complete: boolean
}
const key = (locale: WizardLocale) => `project:wizard:${locale}:services`
export function readProjectServices(locale: WizardLocale): WizardService[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(sessionStorage.getItem(key(locale)) || '[]')
  } catch {
    return []
  }
}
export function activeProjectServiceUuid(locale: WizardLocale): string {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(`project:wizard:${locale}:activeService`) || ''
}
export function requireProjectServiceUuid(locale: WizardLocale): string {
  const uuid = activeProjectServiceUuid(locale)
  if (!uuid)
    throw new Error(
      locale === 'ar'
        ? 'يرجى اختيار الخدمة أولاً.'
        : 'Please select a service first.',
    )
  return uuid
}
export function selectProjectService(locale: WizardLocale, uuid: string) {
  sessionStorage.setItem(`project:wizard:${locale}:activeService`, uuid)
}
export function beginProjectService(locale: WizardLocale) {
  selectProjectService(locale, '')
  const prefix = `project:wizard:${locale}:services:pending:`
  Object.keys(sessionStorage)
    .filter((k) => k.startsWith(prefix))
    .forEach((k) => sessionStorage.removeItem(k))
}
export function registerProjectService(
  locale: WizardLocale,
  service: WizardService,
) {
  const oldPrefix = activeServiceStorageKey(locale, '')
  selectProjectService(locale, service.uuid)
  const newPrefix = activeServiceStorageKey(locale, '')
  if (oldPrefix !== newPrefix) {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith(oldPrefix))
      .forEach((k) => {
        sessionStorage.setItem(
          newPrefix + k.slice(oldPrefix.length),
          sessionStorage.getItem(k)!,
        )
        sessionStorage.removeItem(k)
      })
  }
  sessionStorage.setItem(
    key(locale),
    JSON.stringify([
      ...readProjectServices(locale).filter((s) => s.uuid !== service.uuid),
      service,
    ]),
  )
  sessionStorage.setItem(
    projectWizardStorage.serviceLabelKey(locale),
    service.label,
  )
}
export function markServiceComplete(locale: WizardLocale, complete: boolean) {
  const uuid = requireProjectServiceUuid(locale)
  sessionStorage.setItem(
    key(locale),
    JSON.stringify(
      readProjectServices(locale).map((s) =>
        s.uuid === uuid ? { ...s, complete } : s,
      ),
    ),
  )
}
export function forgetProjectService(locale: WizardLocale, uuid: string) {
  const remaining = readProjectServices(locale).filter((s) => s.uuid !== uuid)
  sessionStorage.setItem(key(locale), JSON.stringify(remaining))
  const prefix = `project:wizard:${locale}:services:${uuid}:`
  Object.keys(sessionStorage)
    .filter((k) => k.startsWith(prefix))
    .forEach((k) => sessionStorage.removeItem(k))
  if (activeProjectServiceUuid(locale) === uuid)
    selectProjectService(locale, remaining[0]?.uuid || '')
}
/** Scope the project-show response before passing it to the existing intake parsers. */
export function activeServiceResponse(
  input: unknown,
  locale: WizardLocale,
): unknown {
  const root = input as {
    data?: { project_services?: Array<{ uuid?: string }> }
  }
  const services = root?.data?.project_services
  if (!Array.isArray(services)) return input
  return {
    data:
      services.find((s) => s.uuid === activeProjectServiceUuid(locale)) || {},
  }
}
