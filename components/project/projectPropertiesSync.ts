import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

function normalizeValue(value: string | null): string {
  return String(value || '')
    .trim()
    .toLowerCase()
}

function readStorageValue(locale: WizardLocale, key: string): string {
  if (typeof window === 'undefined') return ''

  try {
    return window.sessionStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

function mapPhase(value: string): string {
  const normalized = normalizeValue(value)

  if (normalized === 'idea stage' || normalized === 'idea' || normalized === 'مرحلة الفكرة') {
    return 'idea stage'
  }

  if (normalized === 'expansion' || normalized === 'التوسع') {
    return 'expansion'
  }

  if (normalized === 'implementation' || normalized === 'التنفيذ') {
    return 'implementation'
  }

  return normalized
}

function mapBusinessType(value: string): string {
  const normalized = normalizeValue(value)

  if (normalized === 'entrepreneur' || normalized === 'رائد أعمال') return 'entrepreneur'
  if (normalized === 'startup' || normalized === 'شركة ناشئة') return 'startup'
  if (normalized === 'sme' || normalized === 'شركة صغيرة/متوسطة') return 'sme'
  if (normalized === 'company' || normalized === 'شركة') return 'company'
  if (normalized === 'organization' || normalized === 'منظمة') return 'organization'
  if (normalized === 'government' || normalized === 'حكومة') return 'government'

  return normalized
}

function mapPreferredInsighterType(value: string): 'individual' | 'company' | 'either' | '' {
  const normalized = normalizeValue(value)

  if (normalized === 'individual' || normalized === 'فرد') return 'individual'
  if (normalized === 'company' || normalized === 'شركة') return 'company'
  if (
    normalized === 'either' ||
    normalized === 'أيهما' ||
    normalized === 'كلاهما' ||
    normalized === 'لا مانع'
  ) {
    return 'either'
  }

  return ''
}

export type ProjectPropertiesPayload = {
  phase: string
  business_type: string
  insighter_preferred_type: 'individual' | 'company' | 'either' | ''
  insighter_origin_id: string
  insighter_origin_type: string
  insighter_min_years_experience: string
  insighter_max_years_experience: string
  company_min_team_size: string
  company_max_team_size: string
  deadline: string
}

export function buildProjectPropertiesPayload(
  locale: WizardLocale
): ProjectPropertiesPayload {
  const preferredInsighterType = mapPreferredInsighterType(
    readStorageValue(locale, projectWizardStorage.preferredInsighterTypeKey(locale))
  )

  const insighterOriginType = normalizeValue(
    readStorageValue(locale, projectWizardStorage.insighterOriginTypeKey(locale))
  )
  const insighterOriginId = readStorageValue(
    locale,
    projectWizardStorage.insighterOriginIdKey(locale)
  ).trim()
  const hasOrigin = Boolean(insighterOriginType && insighterOriginId)

  return {
    phase: mapPhase(readStorageValue(locale, projectWizardStorage.projectStatusKey(locale))),
    business_type: mapBusinessType(
      readStorageValue(locale, projectWizardStorage.whoAreYouKey(locale))
    ),
    insighter_preferred_type: preferredInsighterType,
    insighter_origin_id: hasOrigin ? insighterOriginId : '',
    insighter_origin_type: hasOrigin ? insighterOriginType : '',
    insighter_min_years_experience:
      preferredInsighterType === 'individual'
        ? readStorageValue(
            locale,
            projectWizardStorage.insighterMinYearsExperienceKey(locale)
          ).trim()
        : '',
    insighter_max_years_experience:
      preferredInsighterType === 'individual'
        ? readStorageValue(
            locale,
            projectWizardStorage.insighterMaxYearsExperienceKey(locale)
          ).trim()
        : '',
    company_min_team_size:
      preferredInsighterType === 'company'
        ? readStorageValue(locale, projectWizardStorage.companyMinTeamSizeKey(locale)).trim()
        : '',
    company_max_team_size:
      preferredInsighterType === 'company'
        ? readStorageValue(locale, projectWizardStorage.companyMaxTeamSizeKey(locale)).trim()
        : '',
    deadline: readStorageValue(locale, projectWizardStorage.deadlineKey(locale)).trim(),
  }
}

export async function syncProjectProperties(locale: WizardLocale) {
  if (typeof window === 'undefined') throw new Error('client_only')

  const token = getAuthToken()
  if (!token) throw new Error('no_token')

  const projectUuid = readStoredProjectRequestUuid(locale)
  if (!projectUuid) throw new Error('no_project_uuid')

  const payload = buildProjectPropertiesPayload(locale)

  const res = await fetch(
    getApiUrl(`/api/account/project/definition/properties/sync/${projectUuid}`),
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify(payload),
    }
  )

  await assertProjectApiResponse(res, 'Failed to save project properties.')
}
