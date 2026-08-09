import { getApiUrl } from '@/app/config'

export const SUPPORTED_ONBOARDING_PROMPTS = [
  'country',
  'community_feed_industries',
] as const

export type OnboardingPromptKey = (typeof SUPPORTED_ONBOARDING_PROMPTS)[number]
export type OnboardingPromptStatusValue = 'pending' | 'completed' | 'skipped'

export interface OnboardingPromptStatus {
  prompt_key: string
  status: OnboardingPromptStatusValue
  cannot_skip: boolean
  should_show: boolean
  has_record: boolean
  completed_at: string | null
  skipped_at: string | null
  last_shown_at: string | null
  show_count: number
  metadata: Record<string, unknown> | null
}

export interface IndustryNode {
  key: number
  label: string
  children?: IndustryNode[]
}

type ApiOptions = {
  token: string
  locale: string
}

const onboardingHeaders = ({ token, locale }: ApiOptions): HeadersInit => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': locale,
  'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
})

async function getErrorMessage(response: Response, fallback: string): Promise<string> {
  const payload = await response.json().catch(() => null)
  const validationMessages = payload?.errors
    ? Object.values(payload.errors).flat().filter((message): message is string => typeof message === 'string')
    : []

  return validationMessages[0] || payload?.message || fallback
}

export function isSupportedOnboardingPrompt(promptKey: string): promptKey is OnboardingPromptKey {
  return SUPPORTED_ONBOARDING_PROMPTS.includes(promptKey as OnboardingPromptKey)
}

export function getVisibleSupportedPrompts(
  prompts: OnboardingPromptStatus[],
): OnboardingPromptStatus[] {
  return prompts.filter(
    (prompt) => prompt.should_show && isSupportedOnboardingPrompt(prompt.prompt_key),
  )
}

export async function fetchOnboardingPromptStatuses(
  options: ApiOptions,
): Promise<OnboardingPromptStatus[]> {
  const response = await fetch(getApiUrl('/api/account/profile/onboarding/prompts/status'), {
    method: 'POST',
    headers: onboardingHeaders(options),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Unable to check your onboarding status.'))
  }

  const payload = await response.json()
  return Array.isArray(payload?.data) ? payload.data : []
}

export async function updateOnboardingCountry(
  countryId: number,
  options: ApiOptions,
): Promise<void> {
  const response = await fetch(getApiUrl('/api/account/profile/country'), {
    method: 'POST',
    headers: onboardingHeaders(options),
    body: JSON.stringify({ country_id: countryId }),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Unable to save your country.'))
  }
}

export async function updateFeedIndustryPreferences(
  industryIds: number[],
  options: ApiOptions,
): Promise<void> {
  const response = await fetch(getApiUrl('/api/account/profile/feed/industry-preferences'), {
    method: 'POST',
    headers: onboardingHeaders(options),
    body: JSON.stringify({ industry_ids: industryIds }),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Unable to save your industries.'))
  }
}

export async function skipOnboardingPrompt(
  promptKey: OnboardingPromptKey,
  options: ApiOptions,
): Promise<void> {
  const response = await fetch(getApiUrl('/api/account/profile/onboarding/prompts/skip'), {
    method: 'POST',
    headers: onboardingHeaders(options),
    body: JSON.stringify({ prompt_key: promptKey }),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Unable to skip this step.'))
  }
}

export async function fetchOnboardingIndustryTree(locale: string): Promise<IndustryNode[]> {
  const response = await fetch(getApiUrl('/api/common/setting/industry/tree'), {
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  })

  if (!response.ok) {
    throw new Error('Unable to load industries.')
  }

  const payload = await response.json()
  return Array.isArray(payload) ? payload : []
}
