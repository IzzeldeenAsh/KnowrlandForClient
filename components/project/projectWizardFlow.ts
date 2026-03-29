import { projectWizardStorage, type WizardLocale } from './wizardStorage'
import { readProjectAddonsState } from './projectAddonsState'

export const projectWizardStepIds = {
  projectType: 'project-type',
  deliverablesLanguage: 'deliverables-language',
  service: 'service',
  projectScope: 'project-scope',
  projectSubscopes: 'project-subscopes',
  projectStatus: 'project-status',
  whoAreYou: 'who-are-you',
  preferredInsighterType: 'preferred-insighter-type',
  insighterOrigin: 'insighter-origin',
  insighterExperience: 'insighter-experience',
  companyTeamSize: 'company-team-size',
  projectDescription: 'project-description',
  addonsIntro: 'addons-intro',
  kickoffMeeting: 'kickoff-meeting',
  projectReview: 'project-review',
} as const

export type ProjectWizardStepId = string

export function normalizeProjectWizardStepId(step: string): string {
  if (!step) return projectWizardStepIds.projectType

  const trimmed = String(step).trim()

  if (trimmed === '1') return projectWizardStepIds.projectType
  if (trimmed === '2') return projectWizardStepIds.deliverablesLanguage
  if (trimmed === '3') return projectWizardStepIds.service

  if (trimmed === '5') return projectWizardStepIds.projectStatus
  if (trimmed === '6') return 'target-market'
  if (trimmed === '7') return projectWizardStepIds.service

  return trimmed
}

export function readServiceComponentSlugs(locale: WizardLocale): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.sessionStorage.getItem(
      projectWizardStorage.serviceComponentSlugsKey(locale)
    )
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((s) => (typeof s === 'string' ? s.trim() : ''))
      .filter(Boolean)
  } catch {
    return []
  }
}

function readScopeHasChildren(locale: WizardLocale): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = window.sessionStorage.getItem(
      projectWizardStorage.serviceScopeHasChildrenKey(locale)
    )
    return raw === '1' || raw === 'true'
  } catch {
    return false
  }
}

function readPreferredInsighterType(
  locale: WizardLocale
): 'Individual' | 'Company' | 'Either' | null {
  if (typeof window === 'undefined') return null

  try {
    const value = window.sessionStorage.getItem(
      projectWizardStorage.preferredInsighterTypeKey(locale)
    )

    if (value === 'Individual' || value === 'Company' || value === 'Either') {
      return value
    }
  } catch {
    // ignore
  }

  return null
}

export function getProjectWizardStepOrder(locale: WizardLocale): string[] {
  const serviceComponentSlugs = readServiceComponentSlugs(locale)
  const preferredInsighterType = readPreferredInsighterType(locale)
  const skipKickoffMeeting = readProjectAddonsState(locale).kickoffMeeting.skipped

  const postOriginSteps =
    preferredInsighterType === 'Individual'
      ? [projectWizardStepIds.insighterExperience]
      : preferredInsighterType === 'Company'
        ? [projectWizardStepIds.companyTeamSize]
        : []

  return [
    projectWizardStepIds.projectType,
    projectWizardStepIds.deliverablesLanguage,
    projectWizardStepIds.service,
    projectWizardStepIds.projectScope,
    projectWizardStepIds.projectSubscopes,
    ...serviceComponentSlugs,
    projectWizardStepIds.projectStatus,
    projectWizardStepIds.whoAreYou,
    projectWizardStepIds.preferredInsighterType,
    projectWizardStepIds.insighterOrigin,
    ...postOriginSteps,
    projectWizardStepIds.projectDescription,
    projectWizardStepIds.addonsIntro,
    ...(skipKickoffMeeting ? [] : [projectWizardStepIds.kickoffMeeting]),
    projectWizardStepIds.projectReview,
  ]
}
