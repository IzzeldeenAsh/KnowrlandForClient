/**
 * Routing for KNOLDG project notifications.
 *
 * These events are broadcast by the same Laravel backend that the Angular app
 * (KNOLDG-APP) listens to. On click we navigate to the Angular dashboard pages
 * (same tab), on the dashboard host for the current environment.
 *
 * Routing is keyed on `event_name` first (the most reliable signal — some events
 * share a `sub_type`). For REST history, which carries no `event_name`, we fall
 * back to `sub_type` + the user's role.
 *
 * `param` carries the routing id, and every details route below expects the
 * *project* UUID — the pages resolve it against Project (GET
 * /insighter/project/show/{project} and /account/project/show/{project}), so a
 * match / proposal / offer UUID there 404s. `order.project` is the exception:
 * it wants the *order* UUID, matched against the sales list.
 *
 * DEPLOY ORDER: `project.match.invited`, `project.proposal.offer`,
 * `project.insighter.offer.technical-decision` and
 * `project.insighter.offer.not-selected` only resolve once the backend sends
 * the project UUID in `param`. Ship this after that backend change.
 * `project.service.started` and `order.project` already work — their numeric
 * ids resolve through the backend's route binding.
 */

import type { Notification } from '@/services/notifications.service'
import { dashboardUrl } from '@/app/config'

// Env-driven (.env.development / .env.staging / .env.production), with the
// production dashboard as a fail-safe fallback — never hardcode a host here, or
// production notifications leak users onto the staging domain.
export const DASHBOARD = dashboardUrl

// Dashboard list pages (used as guards when `param` is missing).
const INSIGHTER_ON_WORK = `${DASHBOARD}/app/insighter-dashboard/on-work-projects`
const CLIENT_PROJECTS = `${DASHBOARD}/app/insighter-dashboard/projects-created`
const PROJECT_OFFERS = `${DASHBOARD}/app/insighter-dashboard/project-offers`
// tab=4 is the sales page's `sold-projects` tab; tab=2 is `sold-details`
// (knowledge sales). `order.project` is a project-service sale, so it belongs
// on tab 4 — it was landing on the knowledge tab.
const PROJECT_SALES = `${DASHBOARD}/app/insighter-dashboard/sales?tab=4`

/**
 * Project sale → sold-projects tab, deep-linked to the order's details dialog
 * via `?order=`. `param` is the *order* reference, not a project one; the
 * dashboard fetches that single order, and the backend route binding takes
 * either its UUID or its numeric id.
 */
function projectSaleUrl(param: unknown): string {
  return hasParam(param) ? `${PROJECT_SALES}&order=${encodeURIComponent(String(param))}` : PROJECT_SALES
}

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

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Path + query of a backend-supplied `url` (absolute or relative). Returns an
 * empty path when there is nothing usable.
 */
function partsFromBackendUrl(rawUrl: unknown): { path: string; search: string } {
  if (!hasParam(rawUrl)) return { path: '', search: '' }

  const raw = String(rawUrl).trim()
  try {
    // Usually absolute, on whichever host the backend was configured with.
    const parsed = new URL(raw)
    return { path: parsed.pathname === '/' ? '' : parsed.pathname, search: parsed.search }
  } catch {
    const [path = '', search = ''] = raw.split('#')[0].split('?')
    const normalized = path.startsWith('/') ? path : `/${path}`
    return {
      path: !path || normalized === '/' ? '' : normalized,
      search: search ? `?${search}` : '',
    }
  }
}

/**
 * The backend's `url` names the right *page* (proposal vs project stage, client
 * vs insighter side) but can end in the wrong id — a proposal-match UUID on a
 * page that resolves its id against Project. `param` carries the correct
 * project UUID on these events, so keep the path and swap the trailing id.
 */
function pathWithParamId(path: string, param: unknown): string {
  if (!hasParam(param)) return path

  const segments = path.split('/').filter(Boolean)
  const last = segments[segments.length - 1]
  // Only drop a trailing *id*; a path that ends on the page itself (no id) keeps
  // all of its segments.
  if (last && (UUID_PATTERN.test(last) || /^\d+$/.test(last))) segments.pop()
  segments.push(String(param))

  return `/${segments.join('/')}`
}

/**
 * `project.discussion.message` is special: the backend resolves the exact
 * destination and ships the full URL in `url`. We don't re-derive the route —
 * we take its path, swap in `param` as the id, pin it to this environment's
 * dashboard host, and force the discussion tab.
 *
 * Falls back to the role-based project route for notifications predating the
 * backend `url` field.
 */
function discussionUrl(notification: Pick<Notification, 'param' | 'url'>, roles: string[]): string {
  const { path } = partsFromBackendUrl(notification.url)
  if (!path) {
    return roleBasedProjectUrl(notification.param, roles)
  }

  return `${DASHBOARD}${pathWithParamId(path, notification.param)}?tab=discussion`
}

/** insighter → on-work details, client → projects-created details (role-based events). */
function roleBasedProjectUrl(param: unknown, roles: string[]): string {
  if (isInsighterSide(roles)) {
    return hasParam(param) ? `${INSIGHTER_ON_WORK}/details/${param}` : INSIGHTER_ON_WORK
  }
  return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
}

/**
 * `project.insighter.cancelled` also ships a full URL whose trailing id may be a
 * proposal-match UUID — same treatment as the discussion route: keep the page,
 * use `param` as the id.
 */
function cancelledProjectUrl(notification: Pick<Notification, 'param' | 'url'>): string {
  const { path, search } = partsFromBackendUrl(notification.url)
  if (!path) {
    return hasParam(notification.param)
      ? `${INSIGHTER_ON_WORK}/details/${notification.param}`
      : INSIGHTER_ON_WORK
  }

  return `${DASHBOARD}${pathWithParamId(path, notification.param)}${search}`
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
      return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
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
      return hasParam(param) ? `${INSIGHTER_ON_WORK}/details/${param}` : INSIGHTER_ON_WORK
    case 'order.project':
      return projectSaleUrl(param)
    case 'project.file.uploaded':
      return roleBasedProjectUrl(param, roles)
    case 'project.discussion.message':
      return discussionUrl(notification, roles)
    case 'project.insighter.offer.technical-decision':
    case 'project.insighter.offer.not-selected':
      return hasParam(param) ? `${PROJECT_OFFERS}/details/${param}` : PROJECT_OFFERS
    case 'project.insighter.cancelled':
      return cancelledProjectUrl(notification)
  }

  // 2) REST-history fallback (no event_name): route by sub_type + role.
  switch (notification.sub_type) {
    case 'project_proposal':
      return hasParam(param) ? `${PROJECT_OFFERS}/details/${param}` : PROJECT_OFFERS
    case 'project_proposal_offer':
      return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
    case 'project_review_submission_reviewed':
      return hasParam(param) ? `${INSIGHTER_ON_WORK}/details/${param}` : INSIGHTER_ON_WORK
    case 'project_review_submission':
      return hasParam(param) ? `${CLIENT_PROJECTS}/${param}` : CLIENT_PROJECTS
    case 'project_offer_technical_decision':
    case 'project_offer_not_selected':
      return hasParam(param) ? `${PROJECT_OFFERS}/details/${param}` : PROJECT_OFFERS
    case 'project_cancelled':
      return cancelledProjectUrl(notification)
    case 'project_service':
      return hasParam(param) ? `${INSIGHTER_ON_WORK}/details/${param}` : INSIGHTER_ON_WORK
    case 'project_file_uploaded':
    // `project_closed` and `project` are ambiguous (client vs insighter) — role decides.
    case 'project_closed':
    case 'project':
      return roleBasedProjectUrl(param, roles)
    case 'project_discussion':
      return discussionUrl(notification, roles)
  }

  return null
}
