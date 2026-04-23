import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { type WizardLocale } from './wizardStorage'
import { readServiceComponentsPayload } from './serviceComponentsPayload'

export async function syncServiceComponents(locale: WizardLocale) {
  if (typeof window === 'undefined') throw new Error('client_only')

  const token = getAuthToken()
  if (!token) throw new Error('no_token')

  const projectUuid = readStoredProjectRequestUuid(locale)
  if (!projectUuid) throw new Error('no_project_uuid')

  const payload = readServiceComponentsPayload(locale)

  const res = await fetch(
    getApiUrl(`/api/account/project/definition/component/sync/${projectUuid}`),
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify(payload),
    }
  )

  await assertProjectApiResponse(res, 'Failed to save service components.')
}
