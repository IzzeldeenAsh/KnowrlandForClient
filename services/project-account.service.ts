import { getApiUrl } from '@/app/config'

/**
 * `/api/account/profile` does not expose `receive_project_services_active`, so the
 * sidebar cannot tell from the profile payload whether the insighter has already
 * activated project services. This reads the flag from the project account
 * settings endpoint instead, memoised per token so repeated sidebar mounts share
 * a single request.
 */

export interface ProjectAccountSettings {
  receive_project_services?: string | null
}

let cachedToken: string | null = null
let cachedRequest: Promise<boolean> | null = null

export function clearReceiveProjectServicesCache(): void {
  cachedToken = null
  cachedRequest = null
}

export function fetchReceiveProjectServicesActive(
  token: string,
  locale: string,
): Promise<boolean> {
  if (cachedRequest && cachedToken === token) {
    return cachedRequest
  }

  const request = (async () => {
    const response = await fetch(getApiUrl('/api/insighter/project/account/settings'), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Accept-Language': locale,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Unable to read project account settings (${response.status}).`)
    }

    const payload = await response.json()
    const settings: ProjectAccountSettings = payload?.data ?? {}
    return settings.receive_project_services === 'active'
  })()

  cachedToken = token
  cachedRequest = request

  // Don't cache a rejected request - let the next mount retry.
  request.catch(() => {
    if (cachedRequest === request) {
      clearReceiveProjectServicesCache()
    }
  })

  return request
}
