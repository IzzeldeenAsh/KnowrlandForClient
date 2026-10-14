import { readDefinitionMode } from './projectDefinitionMode'
import { getApiUrl } from '@/app/config'
import { assertProjectApiResponse } from './projectApiError'
import { clientComponentIsVisible, expandServiceComponentSlugs } from './projectWizardFlow'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

// Components come in two ownership levels:
// - project service level (e.g. deliverable-stage): synced per project service
//   via component/sync/{project}/{project_service}
// - project level (e.g. target-market, data-sources-expected): sent with the
//   project properties sync under `components`

function headers(locale: WizardLocale, token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Accept-Language': locale === 'ar' ? 'ar' : 'en',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

export type ProjectComponentCatalogItem = { id: number; name: string; slug: string; ownership_level?: string; is_required?: boolean; definition_mode_visibility?: string; fillable_by_insighter?: boolean }
export function readComponentCatalog(locale: WizardLocale): ProjectComponentCatalogItem[] {
  if (typeof window === 'undefined') return []
  try {
    const items = JSON.parse(window.sessionStorage.getItem(projectWizardStorage.componentCatalogKey(locale)) || '[]')
    return Array.isArray(items) ? items : []
  } catch { return [] }
}
async function fetchComponentSlugs(url: string, locale: WizardLocale, token: string, ownershipLevel: 'project' | 'project_service', signal?: AbortSignal) {
  const res = await fetch(url, {
    method: 'GET',
    headers: headers(locale, token),
    cache: 'no-store',
    signal,
  })
  await assertProjectApiResponse(res, 'Failed to load service components.')

  const json = (await res.json()) as {
    data?: ProjectComponentCatalogItem[]
  }

  const mode = readDefinitionMode(locale)
  const items = (json.data || []).filter(item =>
    clientComponentIsVisible(locale, item.slug || item.name) &&
    (!item.definition_mode_visibility || item.definition_mode_visibility === 'both' || item.definition_mode_visibility === mode)
  ).map(item => ({ ...item, ownership_level: ownershipLevel }))
  window.sessionStorage.setItem(projectWizardStorage.componentCatalogKey(locale), JSON.stringify([
    ...readComponentCatalog(locale).filter(item => item.ownership_level !== ownershipLevel && clientComponentIsVisible(locale, item.slug || item.name)),
    ...items,
  ]))
  return items
    .map((item) => item.slug || item.name)
    .filter((slug): slug is string => Boolean(slug && slug.trim()))
}

export async function fetchProjectServiceComponentSlugs(params: {
  locale: WizardLocale
  token: string
  serviceId: number
  isOther: boolean
  projectUuid: string
  projectServiceUuid: string
  signal?: AbortSignal
}): Promise<string[]> {
  const url = params.isOther
    ? getApiUrl(
        `/api/account/project/definition/service-prompt/component/${params.projectUuid}/${params.projectServiceUuid}`
      )
    : getApiUrl(`/api/common/setting/service/component/${params.serviceId}?definition_mode=${readDefinitionMode(params.locale)}`)

  return fetchComponentSlugs(url, params.locale, params.token, 'project_service', params.signal)
}

export async function fetchProjectLevelComponentSlugs(params: {
  locale: WizardLocale
  token: string
  projectUuid: string
  signal?: AbortSignal
}): Promise<string[]> {
  return fetchComponentSlugs(
    getApiUrl(`/api/account/project/definition/component/${params.projectUuid}`),
    params.locale,
    params.token,
    'project',
    params.signal
  )
}

/**
 * Stores component steps: the active project service's own steps (saved per
 * service session) and the project-level steps, which the API returns for all
 * of the project's services at once.
 */
export function storeComponentSlugs(
  locale: WizardLocale,
  params: { projectServiceSlugs: string[]; projectSlugs: string[] }
) {
  const serviceSteps = expandServiceComponentSlugs(params.projectServiceSlugs).filter(slug => clientComponentIsVisible(locale, slug))
  const projectSlugs = params.projectSlugs.filter(
    (slug) => !params.projectServiceSlugs.includes(slug) && clientComponentIsVisible(locale, slug)
  )

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.serviceComponentSlugsKey(locale),
      JSON.stringify(serviceSteps)
    )
    window.sessionStorage.setItem(
      projectWizardStorage.projectComponentSlugsKey(locale),
      JSON.stringify(projectSlugs)
    )
  } catch {
    // ignore
  }
}

export function readProjectComponentSlugs(locale: WizardLocale): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.sessionStorage.getItem(
      projectWizardStorage.projectComponentSlugsKey(locale)
    )
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(parsed)
      ? parsed.filter((slug): slug is string => typeof slug === 'string' && Boolean(slug) && clientComponentIsVisible(locale, slug))
      : []
  } catch {
    return []
  }
}
