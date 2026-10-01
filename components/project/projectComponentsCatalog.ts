import { getApiUrl } from '@/app/config'
import { assertProjectApiResponse } from './projectApiError'
import { expandServiceComponentSlugs } from './projectWizardFlow'
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

async function fetchComponentSlugs(url: string, locale: WizardLocale, token: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: headers(locale, token),
    cache: 'no-store',
  })
  await assertProjectApiResponse(res, 'Failed to load service components.')

  const json = (await res.json()) as {
    data?: Array<{ id?: number; name?: string; slug?: string }>
  }

  return (json.data || [])
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
}): Promise<string[]> {
  const url = params.isOther
    ? getApiUrl(
        `/api/account/project/definition/service-prompt/component/${params.projectUuid}/${params.projectServiceUuid}`
      )
    : getApiUrl(`/api/common/setting/service/component/${params.serviceId}`)

  return fetchComponentSlugs(url, params.locale, params.token)
}

export async function fetchProjectLevelComponentSlugs(params: {
  locale: WizardLocale
  token: string
  projectUuid: string
}): Promise<string[]> {
  return fetchComponentSlugs(
    getApiUrl(`/api/account/project/definition/component/${params.projectUuid}`),
    params.locale,
    params.token
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
  const serviceSteps = expandServiceComponentSlugs(params.projectServiceSlugs)
  const projectSlugs = params.projectSlugs.filter(
    (slug) => !params.projectServiceSlugs.includes(slug)
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
      ? parsed.filter((slug): slug is string => typeof slug === 'string' && Boolean(slug))
      : []
  } catch {
    return []
  }
}
