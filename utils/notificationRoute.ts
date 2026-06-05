/**
 * Routing for KNOLDG project notifications.
 *
 * These events are broadcast by the same Laravel backend that the Angular app
 * (KNOLDG-APP) listens to. On click we navigate to the Angular dashboard pages
 * (same tab), so the base URL is hardcoded to localhost:4200.
 *
 * Routing is keyed on `event_name` first (the most reliable signal — some events
 * share a `sub_type`). For REST history, which carries no `event_name`, we fall
 * back to `sub_type` + the user's role.
 *
 * `param` carries the routing id: a UUID for most events, an integer id for
 * `order.project` and `project.service.started`.
 */

import type { Notification } from '@/services/notifications.service'

export const DASHBOARD = 'https://app.insightabusiness.com'

// Dashboard list pages (used as guards when `param` is missing).
const INSIGHTER_ON_WORK = `${DASHBOARD}/app/insighter-dashboard/on-work-projects`
const CLIENT_PROJECTS = `${DASHBOARD}/app/insighter-dashboard/projects-created`
const PROJECT_OFFERS = `${DASHBOARD}/app/insighter-dashboard/project-offers`
const SALES = `${DASHBOARD}/app/insighter-dashboard/sales?tab=2`

/**
 * Roles that view a project from the insighter (worker) side. Everyone else is
 * treated as the client side.
 */
const INSIGHTER_ROLES = new Set(['insighter', 'company', 'company-insighter'])

function isInsighterSide(roles: string[] = []): boolean {
  return roles.some((role) => INSIGHTER_ROLES.has(role))
}

function hasParam(param: unknown): boolean {
  return param !== undefined && param !== null && param !== ''
}

/** insighter → on-work details, client → projects-created details (role-based events). */
function roleBasedProjectUrl(param: unknown, roles: string[]): string {
  if (isInsighterSide(roles)) {
    return hasParam(param) ? `${INSIGHTER_ON_WORK}/details/${param}` : INSIGHTER_ON_WORK
  }
  return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
}

/**
 * Returns the target dashboard URL for a project notification, or `null` if the
 * notification isn't one of the project events (caller should fall back to its
 * existing routing).
 */
export function routeForNotification(
  notification: Pick<Notification, 'event_name' | 'type' | 'sub_type' | 'param'>,
  roles: string[] = []
): string | null {
  const param = notification.param

  // 1) Route by event_name (realtime broadcasts) — most reliable.
  switch (notification.event_name) {
    case 'project.match.invited':
      return hasParam(param) ? `${PROJECT_OFFERS}/details/${param}` : PROJECT_OFFERS
    case 'project.proposal.offer':
      return CLIENT_PROJECTS
    case 'project.insighter.closed':
    case 'project.insighter.contract':
    case 'project.review.submission.reviewed':
      return hasParam(param) ? `${INSIGHTER_ON_WORK}/details/${param}` : INSIGHTER_ON_WORK
    case 'project.client.closed':
    case 'project.client.contract':
    case 'project.review.submission':
      return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
    case 'project.service.started':
      return INSIGHTER_ON_WORK
    case 'order.project':
      return SALES
    case 'project.file.uploaded':
      return roleBasedProjectUrl(param, roles)
  }

  // 2) REST-history fallback (no event_name): route by sub_type + role.
  switch (notification.sub_type) {
    case 'project_proposal':
      return hasParam(param) ? `${PROJECT_OFFERS}/details/${param}` : PROJECT_OFFERS
    case 'project_proposal_offer':
      return CLIENT_PROJECTS
    case 'project_review_submission_reviewed':
      return hasParam(param) ? `${INSIGHTER_ON_WORK}/details/${param}` : INSIGHTER_ON_WORK
    case 'project_review_submission':
      return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
    case 'project_service':
      return INSIGHTER_ON_WORK
    case 'project_file_uploaded':
    // `project_closed` and `project` are ambiguous (client vs insighter) — role decides.
    case 'project_closed':
    case 'project':
      return roleBasedProjectUrl(param, roles)
  }

  return null
}
