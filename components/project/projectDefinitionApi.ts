import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { requireProjectServiceUuid } from './projectServicesState'
import type { WizardLocale } from './wizardStorage'

export type DefinitionOption = {
  id: number
  slug: string
  name: string
  ownership_level?: string
  is_required?: boolean
}
export async function definitionRequest<T = unknown>(
  locale: WizardLocale,
  path: string,
  method = 'GET',
  body?: unknown,
): Promise<T> {
  const token = getAuthToken()
  if (!token)
    throw new Error(
      locale === 'ar' ? 'يرجى تسجيل الدخول.' : 'Please sign in to continue.',
    )
  const res = await fetch(
    getApiUrl(`/api/account/project/definition/${path}`),
    {
      method,
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...(body === undefined || body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
      },
      ...(body === undefined
        ? {}
        : { body: body instanceof FormData ? body : JSON.stringify(body) }),
    },
  )
  await assertProjectApiResponse(res, 'Unable to save the project request.')
  if (res.status === 204) return undefined as T
  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as T
}
export function projectDefinitionIds(locale: WizardLocale, service = false) {
  const project = readStoredProjectRequestUuid(locale)
  if (!project)
    throw new Error(
      locale === 'ar'
        ? 'يرجى اختيار الخدمة أولاً.'
        : 'Please select a service first.',
    )
  return service ? `${project}/${requireProjectServiceUuid(locale)}` : project
}
export async function loadDefinitionAddons(
  locale: WizardLocale,
  service = false,
): Promise<DefinitionOption[]> {
  const ids = projectDefinitionIds(locale, service)
  const lists = await Promise.all(
    ['during', 'after'].map((phase) =>
      definitionRequest<{ data: DefinitionOption[] }>(
        locale,
        `addon/${phase}/${ids}`,
      ),
    ),
  )
  return Array.from(
    new Map(
      lists.flatMap((r) => r.data || []).map((item) => [item.slug, item]),
    ).values(),
  )
}
