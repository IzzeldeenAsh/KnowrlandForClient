import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { readProjectComponentSlugs } from './projectComponentsCatalog'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { ensureProjectServiceUuid } from './projectServiceUuid'
import { type WizardLocale } from './wizardStorage'
import { readServiceComponentsPayload } from './serviceComponentsPayload'

/** Components owned by the project (sent with the properties sync, not per service). */
export function readProjectLevelComponents(locale: WizardLocale): Record<string, unknown> {
  const projectSlugs = new Set(readProjectComponentSlugs(locale))
  const { components } = readServiceComponentsPayload(locale)

  return Object.fromEntries(
    Object.entries(components || {}).filter(([slug]) => projectSlugs.has(slug))
  )
}

function readProjectServiceComponents(locale: WizardLocale): Record<string, unknown> {
  const projectSlugs = new Set(readProjectComponentSlugs(locale))
  const { components } = readServiceComponentsPayload(locale)

  return Object.fromEntries(
    Object.entries(components || {}).filter(([slug]) => !projectSlugs.has(slug))
  )
}

export async function syncServiceComponents(locale: WizardLocale) {
  if (typeof window === 'undefined') throw new Error('client_only')

  const token = getAuthToken()
  if (!token) throw new Error('no_token')

  const projectUuid = readStoredProjectRequestUuid(locale)
  if (!projectUuid) throw new Error('no_project_uuid')

  const projectServiceUuid = await ensureProjectServiceUuid(locale)

  const res = await fetch(
    getApiUrl(
      `/api/account/project/definition/component/sync/${projectUuid}/${projectServiceUuid}`
    ),
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({ components: readProjectServiceComponents(locale) }),
    }
  )

  await assertProjectApiResponse(res, 'Failed to save service components.')
}
