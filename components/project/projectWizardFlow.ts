import { projectWizardStorage, type WizardLocale } from './wizardStorage'
import { readDefinitionMode } from './projectDefinitionMode'
import { readProjectAddonsState } from './projectAddonsState'
import { isSpecifiedInsighterProject } from './specifiedInsighterProject'
import { readStoredProjectServiceUuid } from './projectServiceUuid'

export const projectWizardStepIds = {
  projectType: 'project-type',
  definitionMode: 'definition-mode',
  componentSetup: 'component-setup',
  aiIntake: 'ai-intake',
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
  servicesSummary: 'services-summary',
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

export const deliverableStageStepSlugs = ['deliverables-plan'] as const

/** Retired deliverable step slugs, redirected to the plan step. */
export const legacyDeliverableStepSlugs = [
  'deliverables-format',
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

/** Expert-led requests delegate deliverables, including catalogs predating the visibility update. */
export function clientComponentIsVisible(locale: WizardLocale, slug: string): boolean {
  return readDefinitionMode(locale) === 'advanced' || !isDeliverableComponentSlug(normalizeServiceComponentSlug(slug))
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

function readSlugList(key: string, locale: WizardLocale): string[] {
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
    ).filter(slug => clientComponentIsVisible(locale, slug))
  } catch {
    return []
  }
}

/** Component steps of the active project service only. */
export function readProjectServiceStepSlugs(locale: WizardLocale): string[] {
  return readSlugList(projectWizardStorage.serviceComponentSlugsKey(locale), locale)
}

/** Project-level component steps (e.g. data sources, target market), answered once for all services. */
export function readProjectLevelStepSlugs(locale: WizardLocale): string[] {
  const serviceSteps = new Set(readProjectServiceStepSlugs(locale))
  return readSlugList(projectWizardStorage.projectComponentSlugsKey(locale), locale).filter(
    (slug) => !serviceSteps.has(slug)
  )
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
    ...readSlugList(projectWizardStorage.projectComponentSlugsKey(locale), locale),
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

/** True while the client is choosing another service to add (it has no project service yet). */
export function isServiceAddPending(locale: WizardLocale): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = window.sessionStorage.getItem(projectWizardStorage.serviceFlowKey(locale))
    const flow = raw ? (JSON.parse(raw) as { projectServiceUuid?: unknown }) : null
    return Boolean(flow) && !flow?.projectServiceUuid
  } catch {
    return false
  }
}

/** Step the add/edit-service sub-flow returns to: the services step, or the review it was started from. */
export function readServiceFlowReturnStepId(locale: WizardLocale): string {
  if (typeof window === 'undefined') return projectWizardStepIds.servicesSummary
  try {
    const raw = window.sessionStorage.getItem(projectWizardStorage.serviceFlowKey(locale))
    const flow = raw ? (JSON.parse(raw) as { returnStepId?: unknown }) : null
    return flow?.returnStepId === projectWizardStepIds.projectReview
      ? projectWizardStepIds.projectReview
      : projectWizardStepIds.servicesSummary
  } catch {
    return projectWizardStepIds.servicesSummary
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

/** AI intake with no questions left for the active service; its step is skipped, also on Back. */
export function isAiIntakeReady(locale: WizardLocale): boolean {
  if (typeof window === 'undefined') return false
  try {
    const uuid = readStoredProjectServiceUuid(locale)
    return Boolean(uuid) && window.sessionStorage.getItem(projectWizardStorage.aiIntakeReadyKey(locale)) === uuid
  } catch {
    return false
  }
}

export function markAiIntakeReady(locale: WizardLocale) {
  try {
    window.sessionStorage.setItem(projectWizardStorage.aiIntakeReadyKey(locale), readStoredProjectServiceUuid(locale))
  } catch {
    // ignore
  }
}

export function getProjectWizardStepOrder(locale: WizardLocale): string[] {
  const advanced = readDefinitionMode(locale) === 'advanced'
  const scopeDeferred = typeof window !== 'undefined' && window.sessionStorage.getItem(projectWizardStorage.serviceScopeDeferredKey(locale)) === '1'
  const other = typeof window !== 'undefined' && window.sessionStorage.getItem(projectWizardStorage.serviceIsOtherKey(locale)) === '1'
  const requirementSteps = advanced
    ? [projectWizardStepIds.projectScope, ...(!scopeDeferred ? [projectWizardStepIds.projectSubscopes] : []), projectWizardStepIds.componentSetup]
    : [...(other && !isAiIntakeReady(locale) ? [projectWizardStepIds.aiIntake] : []), projectWizardStepIds.componentSetup]
  if (isServiceFlowActive(locale)) {
    const returnStepId = readServiceFlowReturnStepId(locale)
    return [
      ...(isServiceAddPending(locale) ? [projectWizardStepIds.service] : []),
      ...requirementSteps,
      ...readProjectServiceStepSlugs(locale),
      // Project-level steps follow the services step in the main flow. A service added from the
      // review returns straight there, so ask any project-level requirement it introduced here.
      ...(returnStepId === projectWizardStepIds.projectReview ? readProjectLevelStepSlugs(locale) : []),
      returnStepId,
    ]
  }

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
        // "Any" means worldwide, so the origin question is skipped.
        ...(preferredInsighterType === 'Either' ? [] : [projectWizardStepIds.insighterOrigin]),
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
    // Choose a service, then decide who defines the details before creating the project.
    projectWizardStepIds.service,
    projectWizardStepIds.definitionMode,
    ...requirementSteps,
    ...readProjectServiceStepSlugs(locale),
    // Specific-insighter projects can bundle more services before moving on.
    ...(specifiedInsighterProject ? [projectWizardStepIds.servicesSummary] : []),
    // Project-level requirements are asked once, after all services.
    ...readProjectLevelStepSlugs(locale),
    // …then description and add-ons, the summary, and insighter selection.
    projectWizardStepIds.projectDescription,
    projectWizardStepIds.addonsIntro,
    ...(skipKickoffMeeting ? [] : [projectWizardStepIds.kickoffMeeting]),
    projectWizardStepIds.projectReview,
    ...(specifiedInsighterProject ? [] : [projectWizardStepIds.projectMatches]),
    projectWizardStepIds.deadlineOffer,
  ]
}
