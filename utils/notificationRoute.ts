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

// `project.discussion.message` always lands on the production dashboard host,
// regardless of the host the backend baked into `param` (it may be localhost in
// dev). See `discussionUrlFromParam`.
const PROD_DASHBOARD = 'https://app.foresighta.co'

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

/**
 * `project.discussion.message` is special: the backend resolves the exact
 * destination (proposal vs project stage, client vs insighter side) and ships
 * the full URL in `param`. We don't re-derive the route here — we just take its
 * path, pin it to the production dashboard host, and force the discussion tab.
 */
function discussionUrlFromParam(param: unknown): string {
  const raw = hasParam(param) ? String(param).trim() : ''

  let path = ''
  try {
    // `param` is usually a full URL (localhost or prod) — keep only its path.
    path = new URL(raw).pathname
  } catch {
    // Not an absolute URL: treat as a path and drop any existing query/hash.
    path = raw.split(/[?#]/)[0]
    if (path && !path.startsWith('/')) path = `/${path}`
  }

  return `${PROD_DASHBOARD}${path}?tab=discussion`
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
function dashboardUrlFromBackendUrl(rawUrl: unknown): string | null {
  if (!hasParam(rawUrl)) return null

  const raw = String(rawUrl).trim()
  try {
    const parsed = new URL(raw)
    return `${DASHBOARD}${parsed.pathname}${parsed.search}`
  } catch {
    const path = raw.startsWith('/') ? raw : `/${raw}`
    return `${DASHBOARD}${path}`
  }
}

export function routeForNotification(
  notification: Pick<Notification, 'event_name' | 'type' | 'sub_type' | 'param' | 'url'>,
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
    case 'project.client.started':
    case 'project.review.submission':
      return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
    case 'project.service.started':
      return INSIGHTER_ON_WORK
    case 'order.project':
      return SALES
    case 'project.file.uploaded':
      return roleBasedProjectUrl(param, roles)
    case 'project.discussion.message':
      return discussionUrlFromParam(param)
    case 'project.insighter.offer.technical-decision':
    case 'project.insighter.offer.not-selected':
      return PROJECT_OFFERS
    case 'project.insighter.cancelled':
      return dashboardUrlFromBackendUrl(notification.url) ?? INSIGHTER_ON_WORK
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
    case 'project_offer_technical_decision':
    case 'project_offer_not_selected':
      return PROJECT_OFFERS
    case 'project_cancelled':
      return dashboardUrlFromBackendUrl(notification.url) ?? INSIGHTER_ON_WORK
    case 'project_service':
      return INSIGHTER_ON_WORK
    case 'project_file_uploaded':
    // `project_closed` and `project` are ambiguous (client vs insighter) — role decides.
    case 'project_closed':
    case 'project':
      return roleBasedProjectUrl(param, roles)
    case 'project_discussion':
      return discussionUrlFromParam(param)
  }

  return null
}
