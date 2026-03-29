import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { type WizardLocale } from './wizardStorage'

function appendText(formData: FormData, key: string, value: string) {
  formData.append(key, value)
}

export function buildProjectDescriptionFormData(params: {
  description: string
  files: File[]
}) {
  const formData = new FormData()

  appendText(formData, 'description', params.description)

  params.files.forEach((file, index) => {
    formData.append(`files[${index}]`, file)
  })

  return formData
}

export async function syncProjectDescription(params: {
  locale: WizardLocale
  description: string
  files: File[]
}) {
  if (typeof window === 'undefined') throw new Error('client_only')

  const token = getAuthToken()
  if (!token) throw new Error('no_token')

  const projectUuid = readStoredProjectRequestUuid(params.locale)
  if (!projectUuid) throw new Error('no_project_uuid')

  const formData = buildProjectDescriptionFormData({
    description: params.description,
    files: params.files,
  })

  const res = await fetch(
    getApiUrl(`/api/account/project/request/description/sync/${projectUuid}`),
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

  await assertProjectApiResponse(res, 'Failed to save your description and attachments.')
}
