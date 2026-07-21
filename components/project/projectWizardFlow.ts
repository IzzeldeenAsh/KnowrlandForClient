import { projectWizardStorage, type WizardLocale } from './wizardStorage'
import { readProjectAddonsState } from './projectAddonsState'
import { isSpecifiedInsighterProject } from './specifiedInsighterProject'

export const projectWizardStepIds = {
  projectType: 'project-type',
  deliverablesLanguage: 'deliverables-language',
  insighterIndustry: 'insighter-industry',
  insighterSubIndustry: 'insighter-sub-industry',
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
  deadlineOffer: 'deadline-offer',
  projectDeadline: 'project-deadline',
  addonsIntro: 'addons-intro',
  kickoffMeeting: 'kickoff-meeting',
  projectReview: 'project-review',
  projectMatches: 'project-matches',
  projectSubmissionSuccess: 'submission-success',
} as const

export type ProjectWizardStepId = string

export const deliverableStageStepSlugs = [
  'deliverable-first-draft-date',
  'deliverable-first-draft-type',
  'deliverable-first-draft-way',
  'deliverable-final-version-date',
  'deliverable-final-version-type',
  'deliverable-final-version-way',
] as const

const deliverableComponentSlugs = new Set<string>([
  'deliverable-stage',
  'deliverable-type-first-draft',
  'deliverable-type-final-version',
  ...deliverableStageStepSlugs,
])

export function normalizeServiceComponentSlug(value: string): string {
  const normalized = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  const aliases: Record<string, string> = {
    'deliverables-stage': 'deliverable-stage',
    'deliverable-stages': 'deliverable-stage',
    'deliverables-type-first-draft': 'deliverable-type-first-draft',
    'deliverable-types-first-draft': 'deliverable-type-first-draft',
    'deliverables-type-final-version': 'deliverable-type-final-version',
    'deliverable-types-final-version': 'deliverable-type-final-version',
    'data-source-expected': 'data-sources-expected',
    'expected-data-sources': 'data-sources-expected',
  }

  return aliases[normalized] || normalized
}

function isDeliverableComponentSlug(slug: string): boolean {
  if (deliverableComponentSlugs.has(slug)) return true

  const hasDeliverableMarker =
    slug.includes('deliverable') ||
    slug.includes('delivery') ||
    slug.includes('first-draft') ||
    slug.includes('final-version')

  if (!hasDeliverableMarker) return false

  return (
    slug.includes('stage') ||
    slug.includes('date') ||
    slug.includes('type') ||
    slug.includes('report') ||
    slug.includes('way') ||
    slug.includes('draft') ||
    slug.includes('final')
  )
}

export function expandServiceComponentSlugs(slugs: string[]): string[] {
  const expanded: string[] = []
  let addedDeliverableSteps = false

  for (const rawSlug of slugs) {
    const slug = normalizeServiceComponentSlug(rawSlug)
    if (!slug) continue

    if (isDeliverableComponentSlug(slug)) {
      if (!addedDeliverableSteps) {
        expanded.push(...deliverableStageStepSlugs)
        addedDeliverableSteps = true
      }
      continue
    }

    expanded.push(slug)
  }

  return expanded.filter((slug, index, arr) => arr.indexOf(slug) === index)
}

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
    return expandServiceComponentSlugs(
      parsed
        .map((s) => (typeof s === 'string' ? s.trim() : ''))
        .filter(Boolean)
    )
  } catch {
    return []
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

function selectedIndustryParentHasChildren(locale: WizardLocale): boolean {
  if (typeof window === 'undefined') return false

  try {
    return (
      window.sessionStorage.getItem(
        projectWizardStorage.insighterIndustryParentHasChildrenKey(locale)
      ) === '1'
    )
  } catch {
    return false
  }
}

export function getProjectWizardStepOrder(locale: WizardLocale): string[] {
  const serviceComponentSlugs = readServiceComponentSlugs(locale)
  const preferredInsighterType = readPreferredInsighterType(locale)
  const skipKickoffMeeting = readProjectAddonsState(locale).kickoffMeeting.skipped
  const specifiedInsighterProject = isSpecifiedInsighterProject(locale)
  const includeSubIndustryStep = selectedIndustryParentHasChildren(locale)

  const postOriginSteps =
    specifiedInsighterProject
      ? []
      : preferredInsighterType === 'Individual'
        ? [projectWizardStepIds.insighterExperience]
        : preferredInsighterType === 'Company'
          ? [projectWizardStepIds.companyTeamSize]
          : []

  const insighterPreferenceSteps = specifiedInsighterProject
    ? []
    : [
        projectWizardStepIds.preferredInsighterType,
        projectWizardStepIds.insighterOrigin,
        ...postOriginSteps,
      ]

  return [
    projectWizardStepIds.projectType,
    projectWizardStepIds.deliverablesLanguage,
    projectWizardStepIds.insighterIndustry,
    ...(includeSubIndustryStep
      ? [projectWizardStepIds.insighterSubIndustry]
      : []),
    projectWizardStepIds.service,
    projectWizardStepIds.projectScope,
    projectWizardStepIds.projectSubscopes,
    ...serviceComponentSlugs,
    projectWizardStepIds.projectStatus,
    projectWizardStepIds.whoAreYou,
    ...insighterPreferenceSteps,
    projectWizardStepIds.projectDeadline,
    projectWizardStepIds.projectDescription,
    projectWizardStepIds.addonsIntro,
    ...(skipKickoffMeeting ? [] : [projectWizardStepIds.kickoffMeeting]),
    projectWizardStepIds.projectReview,
    ...(specifiedInsighterProject ? [] : [projectWizardStepIds.projectMatches]),
    projectWizardStepIds.deadlineOffer,
  ]
}
