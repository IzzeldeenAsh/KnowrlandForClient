import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

// A project owns one or more project services; service-level definition
// endpoints (scope, components, AI intake) are addressed by the project
// service, not by the project.

function normalizeProjectServiceUuid(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

type ProjectServiceLike = { uuid?: unknown; id?: unknown; position?: unknown }

function firstProjectService(list: unknown): ProjectServiceLike | null {
  if (!Array.isArray(list) || list.length === 0) return null

  const sorted = [...(list as ProjectServiceLike[])].sort(
    (a, b) => Number(a?.position ?? 0) - Number(b?.position ?? 0)
  )

  return sorted[0] ?? null
}

export function extractProjectServiceUuid(payload: unknown): string {
  const data = (payload as any)?.data ?? payload
  const service = firstProjectService((data as any)?.project_services)
  return normalizeProjectServiceUuid(service?.uuid ?? service?.id)
}

/** Picks the given project service (or the first one) out of a project show payload. */
export function pickProjectServiceFromProject(
  payload: unknown,
  projectServiceUuid: string
): Record<string, unknown> | null {
  const data = (payload as any)?.data ?? payload
  const list = (data as any)?.project_services
  if (!Array.isArray(list) || list.length === 0) return null

  const match = list.find(
    (item: any) =>
      normalizeProjectServiceUuid(item?.uuid) === projectServiceUuid ||
      normalizeProjectServiceUuid(item?.id) === projectServiceUuid
  )

  return (match ?? firstProjectService(list)) as Record<string, unknown> | null
}

export function readStoredProjectServiceUuid(locale: WizardLocale): string {
  if (typeof window === 'undefined') return ''

  try {
    return normalizeProjectServiceUuid(
      window.sessionStorage.getItem(projectWizardStorage.projectServiceUuidKey(locale))
    )
  } catch {
    return ''
  }
}

export function writeStoredProjectServiceUuid(locale: WizardLocale, uuid: string) {
  if (typeof window === 'undefined') return

  const normalized = normalizeProjectServiceUuid(uuid)
  if (!normalized) return

  try {
    window.sessionStorage.setItem(projectWizardStorage.projectServiceUuidKey(locale), normalized)
  } catch {
    // ignore storage access errors
  }
}

export function clearStoredProjectServiceUuid(locale: WizardLocale) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.removeItem(projectWizardStorage.projectServiceUuidKey(locale))
  } catch {
    // ignore storage access errors
  }
}

/**
 * Returns the active project service UUID, recovering it from the project
 * when the wizard was started before it was stored (e.g. an older session).
 */
export async function ensureProjectServiceUuid(locale: WizardLocale): Promise<string> {
  const stored = readStoredProjectServiceUuid(locale)
  if (stored) return stored

  const token = getAuthToken()
  if (!token) throw new Error('no_token')

  const projectUuid = readStoredProjectRequestUuid(locale)
  if (!projectUuid) throw new Error('no_project_uuid')

  const res = await fetch(getApiUrl(`/api/account/project/show/${projectUuid}`), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Accept-Language': locale === 'ar' ? 'ar' : 'en',
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    cache: 'no-store',
  })

  await assertProjectApiResponse(res, 'Failed to load the project.')

  const uuid = extractProjectServiceUuid(await res.json())
  if (!uuid) throw new Error('no_project_service_uuid')

  writeStoredProjectServiceUuid(locale, uuid)
  return uuid
}
