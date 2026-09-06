import { getApiUrl } from '@/app/config'

/**
 * The sidebar nudges insighters who have never published an insight. The profile
 * payload carries no knowledge counters, so read them from the knowledge status
 * statistics endpoint, memoised per token so repeated sidebar mounts share a
 * single request.
 */

interface KnowledgeStatusStatistic {
  status?: string | null
  count?: number | string | null
}

let cachedToken: string | null = null
let cachedRequest: Promise<boolean> | null = null

export function clearHasPublishedKnowledgeCache(): void {
  cachedToken = null
  cachedRequest = null
}

export function fetchHasPublishedKnowledge(token: string, locale: string): Promise<boolean> {
  if (cachedRequest && cachedToken === token) {
    return cachedRequest
  }

  const request = (async () => {
    const response = await fetch(getApiUrl('/api/insighter/library/knowledge/status/statistics'), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Accept-Language': locale,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Unable to read knowledge status statistics (${response.status}).`)
    }

    const payload = await response.json()
    const statistics: KnowledgeStatusStatistic[] = Array.isArray(payload?.data) ? payload.data : []

    return statistics.some(
      (statistic) => statistic?.status === 'published' && Number(statistic?.count ?? 0) > 0,
    )
  })()

  cachedToken = token
  cachedRequest = request

  // Don't cache a rejected request - let the next mount retry.
  request.catch(() => {
    if (cachedRequest === request) {
      clearHasPublishedKnowledgeCache()
    }
  })

  return request
}
