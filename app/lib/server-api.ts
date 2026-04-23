import 'server-only'

type JsonHeaders = Record<string, string>

type PostJsonWithRetryOptions = {
  locale?: string
  body?: unknown
  retries?: number
  timeoutMs?: number
  headers?: JsonHeaders
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildHeaders(locale: string, headers: JsonHeaders = {}): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': locale,
    'X-Timezone': 'UTC',
    ...headers,
  }
}

export async function postJsonWithRetry<T>(
  url: string,
  options: PostJsonWithRetryOptions = {}
): Promise<T> {
  const {
    locale = 'en',
    body,
    retries = 2,
    timeoutMs = 10000,
    headers,
  } = options

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: buildHeaders(locale, headers),
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      return (await response.json()) as T
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Request failed')

      if (attempt < retries) {
        await delay(250 * (attempt + 1))
        continue
      }
    } finally {
      clearTimeout(timeout)
    }
  }

  throw lastError ?? new Error('Request failed')
}
