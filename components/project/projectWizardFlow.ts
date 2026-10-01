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
  projectSchedule: 'project-schedule',
  addonsIntro: 'addons-intro',
  kickoffMeeting: 'kickoff-meeting',
  projectReview: 'project-review',
  projectMatches: 'project-matches',
  projectSubmissionSuccess: 'submission-success',
} as const

export type ProjectWizardStepId = string

export const deliverableStageStepSlugs = ['deliverables-plan', 'deliverables-format'] as const

/** Retired deliverable step slugs (pre-phase-2), redirected to the plan step. */
export const legacyDeliverableStepSlugs = [
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
  ...legacyDeliverableStepSlugs,
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

function readSlugList(key: string): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.sessionStorage.getItem(key)
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

/** Component steps of the active project service only. */
export function readProjectServiceStepSlugs(locale: WizardLocale): string[] {
  return readSlugList(projectWizardStorage.serviceComponentSlugsKey(locale))
}

/** True when continuing from a component step moves past the last component step. */
export function isLeavingComponentSteps(
  locale: WizardLocale,
  nextStepId: string | null,
  isReviewEditMode: boolean
): boolean {
  return isReviewEditMode || !nextStepId || !readServiceComponentSlugs(locale).includes(nextStepId)
}

/** All component steps: the active project service's, then the project-level ones. */
export function readServiceComponentSlugs(locale: WizardLocale): string[] {
  return expandServiceComponentSlugs([
    ...readProjectServiceStepSlugs(locale),
    ...readSlugList(projectWizardStorage.projectComponentSlugsKey(locale)),
  ])
}

export function isServiceFlowActive(locale: WizardLocale): boolean {
  if (typeof window === 'undefined') return false
  try {
    return Boolean(window.sessionStorage.getItem(projectWizardStorage.serviceFlowKey(locale)))
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
  // Adding/editing an additional service from the review: only that service's steps.
  if (isServiceFlowActive(locale)) {
    return [
      projectWizardStepIds.projectScope,
      projectWizardStepIds.projectSubscopes,
      ...readProjectServiceStepSlugs(locale),
      projectWizardStepIds.projectReview,
    ]
  }

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
    // Project questions first…
    projectWizardStepIds.projectStatus,
    projectWizardStepIds.whoAreYou,
    ...insighterPreferenceSteps,
    projectWizardStepIds.projectSchedule,
    // …then the service and its questions (the project is created at the service step)…
    projectWizardStepIds.service,
    projectWizardStepIds.projectScope,
    projectWizardStepIds.projectSubscopes,
    ...serviceComponentSlugs,
    // …then description and add-ons, the summary, and insighter selection.
    projectWizardStepIds.projectDescription,
    projectWizardStepIds.addonsIntro,
    ...(skipKickoffMeeting ? [] : [projectWizardStepIds.kickoffMeeting]),
    projectWizardStepIds.projectReview,
    ...(specifiedInsighterProject ? [] : [projectWizardStepIds.projectMatches]),
    projectWizardStepIds.deadlineOffer,
  ]
}
