import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { readProjectAddonsState } from './projectAddonsState'
import { assertProjectApiResponse } from './projectApiError'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { type WizardLocale } from './wizardStorage'

function appendText(formData: FormData, key: string, value: string) {
  formData.append(key, value)
}

export function buildProjectAddonsFormData(locale: WizardLocale) {
  const state = readProjectAddonsState(locale)
  const formData = new FormData()

  if (state.kickoffMeeting.enabled) {
    appendText(formData, 'addons[kickoff-meeting][date]', '')
  }

  return formData
}

export async function syncProjectAddons(params: { locale: WizardLocale }) {
  if (typeof window === 'undefined') throw new Error('client_only')

  const token = getAuthToken()
  if (!token) throw new Error('no_token')

  const projectUuid = readStoredProjectRequestUuid(params.locale)
  if (!projectUuid) throw new Error('no_project_uuid')

  const formData = buildProjectAddonsFormData(params.locale)

  const res = await fetch(
    getApiUrl(`/api/account/project/request/addon/sync/${projectUuid}`),
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Accept-Language': params.locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: formData,
    }
  )

  await assertProjectApiResponse(res, 'Failed to save project addons.')
}
