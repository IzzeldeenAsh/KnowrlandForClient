import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from './projectApiError'
import { extractProjectRequestUuid, readStoredProjectRequestUuid, writeStoredProjectRequestUuid } from './projectRequestUuid'
import { clearStoredProposalMatchUuid, extractProjectProposalMatchUuid, writeStoredProposalMatchUuid } from './projectProposalMatchUuid'
import { extractProjectServiceUuid, writeStoredProjectServiceUuid } from './projectServiceUuid'
import { writePrimaryProjectServiceUuid } from './projectServiceSessions'
import { readStoredSpecifiedInsighterUuid } from './specifiedInsighterProject'
import { storeDefinitionMode, type ProjectDefinitionMode } from './projectDefinitionMode'
import { resetServiceComponentsPayload } from './serviceComponentsPayload'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'

function parseStoredId(value: string | null): number | null {
  if (!value) return null
  try {
    const parsed: unknown = JSON.parse(value)
    const number = Number(Array.isArray(parsed) ? parsed[0] : parsed)
    return Number.isFinite(number) && number > 0 ? number : null
  } catch { return null }
}
function toApiLanguage(value: string | null, locale: WizardLocale) {
  const language = (value || '').toLowerCase()
  if (language.includes('arab')) return 'arabic'
  if (language.includes('english')) return 'english'
  return locale === 'ar' ? 'arabic' : 'english'
}
function toApiProjectType(value: string | null) {
  if (value === 'frame_work_agreement' || value === 'framework') return 'frame_work_agreement'
  if (value === 'urgent_request' || value === 'urgent') return 'urgent_request'
  return 'ad_hoc'
}

/** General answers stay local until the client chooses who defines the requirements. */
export async function initiateProjectDraft(locale: WizardLocale, mode: ProjectDefinitionMode) {
  if (readStoredProjectRequestUuid(locale)) return
  const token = getAuthToken()
  if (!token) throw new Error(locale === 'ar' ? 'يرجى تسجيل الدخول للمتابعة.' : 'Please sign in to continue.')
  const serviceId = parseStoredId(window.sessionStorage.getItem(projectWizardStorage.serviceIdsKey(locale)))
  if (!serviceId) throw new Error(locale === 'ar' ? 'اختر الخدمة أولًا.' : 'Choose a service first.')
  const isOtherSelected = window.sessionStorage.getItem(projectWizardStorage.serviceIsOtherKey(locale)) === '1'
  const servicePrompt = window.sessionStorage.getItem(projectWizardStorage.servicePromptKey(locale)) || ''
  if (isOtherSelected && !servicePrompt.trim()) throw new Error(locale === 'ar' ? 'اكتب وصفًا للخدمة أولًا.' : 'Describe the service first.')
  storeDefinitionMode(locale, mode)
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale === 'ar' ? 'ar' : 'en',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  const prompt = isOtherSelected ? servicePrompt.trim() : ''
  const apiServiceId = serviceId
  const insighterIndustryId = parseStoredId(
    window.sessionStorage.getItem(
      projectWizardStorage.insighterIndustryIdKey(locale)
    )
  )
  const specifiedInsighterUuid = readStoredSpecifiedInsighterUuid(locale)
  const initiatePath = specifiedInsighterUuid
    ? `/api/account/project/definition/initiate-specific/${encodeURIComponent(
        specifiedInsighterUuid
      )}`
    : '/api/account/project/definition/initiate'

  const initRes = await fetch(getApiUrl(initiatePath), {
    method: 'POST',
    headers,
    body: JSON.stringify({
      language: toApiLanguage(window.sessionStorage.getItem(projectWizardStorage.deliverablesLanguageKey(locale)), locale),
      type: toApiProjectType(window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))),
      definition_mode: mode,
      service_id: apiServiceId,
      ...(insighterIndustryId != null
        ? { insighter_industry_id: insighterIndustryId }
        : {}),
      service_prompt: prompt,
      prompt_ai: prompt,
    }),
  })

  await assertProjectApiResponse(initRes, 'Failed to create the project.')

  const initJson = (await initRes.json()) as unknown
  const returnedMode = (initJson as { data?: { definition_mode?: string } })?.data?.definition_mode
  if (returnedMode === 'simple' || returnedMode === 'advanced') storeDefinitionMode(locale, returnedMode)
  const projectUuid = extractProjectRequestUuid(initJson)
  if (!projectUuid) throw new Error('init_bad_response')

  const projectServiceUuid = extractProjectServiceUuid(initJson)
  if (!projectServiceUuid) throw new Error('init_bad_response')

  const proposalMatchUuid = specifiedInsighterUuid ? extractProjectProposalMatchUuid(initJson) : ''
  if (specifiedInsighterUuid && !proposalMatchUuid) throw new Error('init_bad_response')

  writeStoredProjectRequestUuid(locale, projectUuid)
  writeStoredProjectServiceUuid(locale, projectServiceUuid)
  writePrimaryProjectServiceUuid(locale, projectServiceUuid)
  if (specifiedInsighterUuid) {
    writeStoredProposalMatchUuid(locale, proposalMatchUuid)
  } else {
    clearStoredProposalMatchUuid(locale)
  }
  try {
    resetServiceComponentsPayload(locale, false)
    window.sessionStorage.removeItem(projectWizardStorage.serviceScopeDeferredKey(locale))
    window.sessionStorage.removeItem(projectWizardStorage.componentCatalogKey(locale))
  } catch {
    // ignore
  }

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.serviceComponentSlugsKey(locale),
      JSON.stringify([])
    )
    window.sessionStorage.setItem(
      projectWizardStorage.projectComponentSlugsKey(locale),
      JSON.stringify([])
    )
    window.sessionStorage.setItem(
      projectWizardStorage.serviceScopeHasChildrenKey(locale),
      '0'
    )
    window.sessionStorage.setItem(
      projectWizardStorage.serviceScopeParentIdsKey(locale),
      JSON.stringify([])
    )
    window.sessionStorage.setItem(
      projectWizardStorage.serviceScopeChildIdsByParentKey(locale),
      JSON.stringify({})
    )
    window.sessionStorage.removeItem(projectWizardStorage.serviceManualScopesKey(locale))
    window.sessionStorage.removeItem(
      projectWizardStorage.serviceAiSuggestedScopesKey(locale)
    )
    window.sessionStorage.removeItem(
      projectWizardStorage.serviceManualSubscopesByScopeKey(locale)
    )
  } catch {
    // ignore
  }
}
