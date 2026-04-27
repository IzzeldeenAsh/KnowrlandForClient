import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { readStoredProposalMatchUuid } from './projectProposalMatchUuid'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

function readStorageValue(locale: WizardLocale, key: string): string {
  if (typeof window === 'undefined') return ''

  try {
    return window.sessionStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

export function readStoredSelectedMatchIds(locale: WizardLocale): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.sessionStorage.getItem(projectWizardStorage.selectedMatchIdsKey(locale))
    if (!raw) return []

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((value) => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean)
  } catch {
    return []
  }
}

export function writeStoredSelectedMatchIds(locale: WizardLocale, matchIds: string[]) {
  if (typeof window === 'undefined') return

  const normalizedMatchIds = Array.from(
    new Set(matchIds.map((value) => String(value || '').trim()).filter(Boolean))
  )

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.selectedMatchIdsKey(locale),
      JSON.stringify(normalizedMatchIds)
    )
  } catch {
    // ignore storage access errors
  }
}

export function formatProposalDeadlineOffer(value: string): string {
  const normalizedValue = String(value || '').trim()
  if (!normalizedValue) return ''

  const [year = '', month = '', day = ''] = normalizedValue.split('-')
  if (!year || !month || !day) return ''

  return `${day}-${month}-${year} 23:59:59`
}

export async function submitProjectProposal(locale: WizardLocale) {
  if (typeof window === 'undefined') throw new Error('client_only')

  const token = getAuthToken()
  if (!token) throw new Error('no_token')

  const proposalMatchUuid = readStoredProposalMatchUuid(locale)
  if (!proposalMatchUuid) throw new Error('no_match_request_uuid')

  const matches = readStoredSelectedMatchIds(locale)
  if (matches.length === 0) throw new Error('no_matches')

  const deadlineOffer = formatProposalDeadlineOffer(
    readStorageValue(locale, projectWizardStorage.deadlineOfferKey(locale))
  )

  const res = await fetch(
    getApiUrl(`/api/account/project/proposal/submit/${proposalMatchUuid}`),
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({
        deadline_offer: deadlineOffer,
        matches,
      }),
    }
  )

  await assertProjectApiResponse(res, 'Failed to submit project proposal.')
}
