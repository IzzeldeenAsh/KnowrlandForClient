export class ProjectApiError extends Error {
  status: number
  hasServerMessage: boolean

  constructor(message: string, status = 0, hasServerMessage = false) {
    super(message)
    this.name = 'ProjectApiError'
    this.status = status
    this.hasServerMessage = hasServerMessage
  }
}

function normalizeErrorMessages(input: unknown): string[] {
  if (!input) return []

  if (typeof input === 'string') {
    const value = input.trim()
    return value ? [value] : []
  }

  if (Array.isArray(input)) {
    return input.flatMap((item) => normalizeErrorMessages(item))
  }

  if (typeof input !== 'object') return []

  const raw = input as {
    message?: unknown
    errors?: Record<string, unknown>
  }

  const messages: string[] = []

  if (typeof raw.message === 'string' && raw.message.trim()) {
    messages.push(raw.message.trim())
  }

  if (raw.errors && typeof raw.errors === 'object') {
    Object.values(raw.errors).forEach((value) => {
      messages.push(...normalizeErrorMessages(value))
    })
  }

  return Array.from(new Set(messages))
}

async function readProjectApiErrorMessage(response: Response): Promise<string | null> {
  try {
    const payload = (await response.clone().json()) as unknown
    const messages = normalizeErrorMessages(payload)
    return messages.length > 0 ? messages.join('\n') : null
  } catch {
    try {
      const text = (await response.clone().text()).trim()
      return text || null
    } catch {
      return null
    }
  }
}

export async function assertProjectApiResponse(
  response: Response,
  fallbackMessage = 'Request failed.'
) {
  if (response.ok) return response

  const message = await readProjectApiErrorMessage(response)
  throw new ProjectApiError(
    message || fallbackMessage,
    response.status,
    Boolean(message)
  )
}

export function getProjectApiErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (error instanceof ProjectApiError) {
    return error.hasServerMessage && error.message.trim()
      ? error.message.trim()
      : fallbackMessage
  }

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    const message = (error as { message: string }).message.trim()
    if (message) return message
  }

  return fallbackMessage
}
