export type ApiErrorPayload = {
  type?: string;
  message?: string;
  errors?: Record<string, unknown>;
};

export function buildAuthHeaders(token: string, locale: string = 'en') {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale || 'en',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    Authorization: `Bearer ${token}`,
  };
}

export async function parseApiError(response: Response): Promise<ApiErrorPayload & { status: number }> {
  const status = response.status;
  const contentType = response.headers.get('content-type') ?? '';

  let body: unknown = null;
  if (contentType.toLowerCase().includes('application/json')) {
    try {
      body = await response.json();
    } catch {
      body = null;
    }
  } else {
    try {
      const text = await response.text();
      body = text && text.trim() ? text : null;
    } catch {
      body = null;
    }
  }

  if (body && typeof body === 'object') {
    return {
      status,
      ...(body as ApiErrorPayload),
    };
  }

  if (typeof body === 'string' && body.trim()) {
    return { status, message: body.trim() };
  }

  return { status, message: `Request failed (${status})` };
}
