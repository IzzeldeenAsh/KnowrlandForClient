import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import { assertProjectApiResponse } from '../projectApiError'
import type { DeliverableWay } from '../projectDeliverables'
import { isUrgentProjectType, todayIsoDate, type ProjectSchedule } from '../projectSchedule'
import type { WizardLocale } from '../wizardStorage'

// Client-side agreement editing (before the first signature). The client edits a
// local draft across the edit pages, then saves everything as one revision through
// POST (`_method: PATCH`) account/project/agreement/client-requirements/{project}.
// The backend applies it project-wide and notifies every eligible Insighter.
// Ownership rules mirror the Angular agreement-revisions model.

export type EditScope = { id?: number; scope: string; description: string | null; subscopes: EditScope[] }

export type EditDeliverable = {
  id?: number
  title: string
  period_days: number
  report_type: string[]
  way: { selected: DeliverableWay | null; address: string | null }
}

export type EditableComponentSlug = 'target-market' | 'data-sources-expected'

export type TargetMarketValue = { type: 'country' | 'region' | 'economic'; ids: number[] }

export type EditComponent = {
  /** Pivot row id (not component_id). */
  id: number
  level: 'project' | 'service'
  projectServiceId: number | null
  slug: EditableComponentSlug
  name: string
  /** target-market: TargetMarketValue; data-sources-expected: option string. */
  value: TargetMarketValue | string
  /** Display only, never sent. */
  labels?: string[]
}

export type EditService = {
  id: number
  uuid: string
  serviceId: number | null
  title: string
  editScopes: boolean
  editDeliverables: boolean
  scopes: EditScope[]
  deliverables: EditDeliverable[]
}

export type EditState = {
  components: EditComponent[]
  services: EditService[]
  /** Planned start + duration; null when the project has none to edit. */
  schedule: ProjectSchedule | null
  /** Proposal-level offer deadline as a local ISO date; null when it cannot be edited. */
  deadlineOffer: string | null
}

export type EditContext = {
  title: string
  type: string | null
  plannedStartDate: string | null
  durationDays: number | null
  linkedDeliverableIds: number[]
}

export type EditDraft = {
  projectUuid: string
  fingerprint: string
  context: EditContext
  original: EditState
  current: EditState
  note: string
}

type RawProject = Record<string, any>

const EDITABLE_SLUGS: EditableComponentSlug[] = ['target-market', 'data-sources-expected']

function headers(locale: WizardLocale): HeadersInit {
  const token = getAuthToken()
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale === 'ar' ? 'ar' : 'en',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

export async function fetchClientProject(locale: WizardLocale, projectUuid: string): Promise<RawProject> {
  const res = await fetch(getApiUrl(`/api/account/project/show/${encodeURIComponent(projectUuid)}`), {
    headers: headers(locale),
    cache: 'no-store',
  })
  await assertProjectApiResponse(res, locale === 'ar' ? 'تعذر تحميل المشروع.' : 'Could not load the project.')
  const json = await res.json()
  return (json?.data ?? json) as RawProject
}

export type AgreementPatch = {
  user_note?: string
  scopes?: Array<{ project_service_id: number; items: EditScope[] }>
  deliverables?: Array<{ project_service_id: number; items: EditDeliverable[] }>
  project_components?: Array<{ id: number; value: unknown }>
  service_components?: Array<{ id: number; value: unknown }>
  planned_start_date?: string
  duration_days?: number
  deadline_offer?: string
}

export async function saveClientAgreement(locale: WizardLocale, projectUuid: string, patch: AgreementPatch) {
  const res = await fetch(getApiUrl(`/api/account/project/agreement/client-requirements/${encodeURIComponent(projectUuid)}`), {
    // POST with Laravel's method override: a real PATCH fails the CORS preflight.
    method: 'POST',
    headers: headers(locale),
    body: JSON.stringify({ ...patch, _method: 'PATCH' }),
  })
  await assertProjectApiResponse(res, locale === 'ar' ? 'تعذر حفظ التعديلات.' : 'Could not save your changes.')
  const json = await res.json()
  return (json?.data ?? json) as { id: number; revision_number: number }
}

const signed = (v: unknown) => !!v && v !== '0' && v !== 'false'

export function agreementLocked(project: RawProject): boolean {
  const contract = project?.contract
  return signed(contract?.user_sign_at) || signed(contract?.insighter_sign_at) ||
    ['payment', 'in_progress', 'in_review', 'closed', 'cancelled', 'completed'].includes(project?.status || '') ||
    (!!project?.contract_uuid && !contract)
}

/**
 * The offer deadline is proposal-level: it applies to every invited Insighter and
 * stops changing once any offer under the proposal is awarded.
 */
export function deadlineOfferLocked(project: RawProject): boolean {
  const invited: any[] = Array.isArray(project?.invited) ? project.invited : []
  return agreementLocked(project) || !!project?.offer?.uuid || project?.status === 'contracting' ||
    invited.some(match => match?.offer?.status === 'awarded')
}

/**
 * The backend stores the deadline as the wall-clock "Y-m-d 23:59:59" it was sent, in
 * the app timezone (UTC), so `last_proposal_deadline` ("…T23:59:59.000000Z") keeps the
 * chosen date in its date part. Converting to local time would shift it a day east of UTC.
 */
export function localDeadlineDate(value: unknown): string | null {
  const raw = String(value ?? '').trim()
  return /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : null
}

function scheduleOf(project: RawProject): ProjectSchedule | null {
  const start = String(project?.planned_start_date ?? '').slice(0, 10)
  const duration = Number(project?.duration_days)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || project?.duration_days === null || project?.duration_days === '' ||
    !Number.isInteger(duration) || duration < 0) return null
  return { plannedStartDate: start, durationDays: duration }
}

const ownedByClient = (row: any) => row?.filled_by_role === 'client'

/** Unknown or mixed ownership stays read-only, including an empty group. */
function ownsGroup(rows: any[]): boolean {
  return rows.length > 0 && rows.every(ownedByClient)
}

function scopeRows(service: any): any[] {
  const scopes: any[] = Array.isArray(service?.scopes) ? service.scopes : []
  return scopes.reduce<any[]>((all, row) => all.concat(row, row?.children ?? row?.subscopes ?? []), [])
}

function rawDeliverables(service: any): any[] {
  const blocks: any[] = Array.isArray(service?.components) ? service.components : []
  return blocks.reduce<any[]>((all, block) => all.concat(block?.['deliverable-stage']?.deliverables ?? []), [])
}

function toScope(row: any): EditScope {
  return {
    ...(row?.id ? { id: Number(row.id) } : {}),
    scope: String(row?.scope ?? ''),
    description: row?.description ?? null,
    subscopes: (row?.children ?? row?.subscopes ?? []).map(toScope),
  }
}

const WAYS: DeliverableWay[] = ['on_platform', 'session', 'physical_workshop']

function toDeliverable(row: any): EditDeliverable {
  const selected = row?.way?.selected
  return {
    ...(row?.id ? { id: Number(row.id) } : {}),
    title: String(row?.title ?? ''),
    period_days: Math.max(0, Number(row?.period_days) || 0),
    report_type: Array.isArray(row?.report_type) ? row.report_type.map((t: unknown) => String(t).toLowerCase()) : [],
    way: { selected: WAYS.includes(selected) ? selected : null, address: row?.way?.address ?? null },
  }
}

/** Deliverables are kept in timeline order, like the wizard saves them. */
export function orderDeliverables(items: EditDeliverable[]): EditDeliverable[] {
  return items.map((item, index) => ({ item, index }))
    .sort((a, b) => a.item.period_days - b.item.period_days || a.index - b.index)
    .map(({ item }) => item)
}

function nameOf(value: any): string {
  if (!value) return ''
  if (typeof value.name === 'string') return value.name
  return String(value.name?.en ?? value.names?.en ?? value.title ?? '')
}

function toComponent(block: any, level: EditComponent['level'], projectServiceId: number | null): EditComponent | null {
  const slug = block?.component_slug as EditableComponentSlug
  const id = Number(block?.id)
  if (!EDITABLE_SLUGS.includes(slug) || !(id > 0)) return null
  const raw = block[slug]
  if (slug === 'target-market') {
    const objects: any[] = Array.isArray(raw?.objects) ? raw.objects : []
    const type = ['country', 'region', 'economic'].includes(raw?.type) ? raw.type : 'country'
    return {
      id, level, projectServiceId, slug, name: block.component_name || slug,
      value: { type, ids: objects.map(row => Number(row?.id)).filter(rowId => rowId > 0).sort((x, y) => x - y) },
      labels: objects.map(nameOf).filter(Boolean),
    }
  }
  return { id, level, projectServiceId, slug, name: block.component_name || slug, value: typeof raw === 'string' ? raw : '' }
}

export function buildEditState(project: RawProject): EditState {
  const services: any[] = Array.isArray(project?.project_services) ? [...project.project_services] : []
  services.sort((a, b) => (Number(a?.position) || 0) - (Number(b?.position) || 0))
  const serviceBlockIds = new Set<number>(services.reduce<number[]>((all, s) =>
    all.concat((s?.components ?? []).map((b: any) => Number(b?.id)).filter(Boolean)), []))

  const projectComponents = (Array.isArray(project?.components) ? project.components : [])
    .filter((block: any) => !serviceBlockIds.has(Number(block?.id)) && ownedByClient(block))
    .map((block: any) => toComponent(block, 'project', null))
  const serviceComponents = services.reduce<Array<EditComponent | null>>((all, s) =>
    all.concat((s?.components ?? []).filter(ownedByClient).map((block: any) => toComponent(block, 'service', Number(s.id) || null))), [])

  return {
    // Urgent requests are fixed to start today and finish within a day.
    schedule: isUrgentProjectType(project?.type ?? null) ? null : scheduleOf(project),
    deadlineOffer: deadlineOfferLocked(project) ? null : localDeadlineDate(project?.last_proposal_deadline),
    components: [...projectComponents, ...serviceComponents].filter((c): c is EditComponent => !!c),
    services: services.filter(s => Number(s?.id) > 0).map(s => ({
      id: Number(s.id),
      uuid: String(s.uuid ?? ''),
      serviceId: s?.service?.id ? Number(s.service.id) : null,
      title: String(s.title || s.service?.name || ''),
      editScopes: ownsGroup(scopeRows(s)),
      editDeliverables: ownsGroup(rawDeliverables(s)),
      scopes: (s.scopes ?? []).map(toScope),
      deliverables: orderDeliverables(rawDeliverables(s).map(toDeliverable)),
    })),
  }
}

export function hasEditableContent(state: EditState): boolean {
  return !!state.schedule || !!state.deadlineOffer || state.components.length > 0 ||
    state.services.some(s => s.editScopes || s.editDeliverables)
}

/** Latest deliverable day across every service: the duration must still cover it. */
export function latestEditDeliverableDay(state: EditState): number {
  return state.services.reduce((max, s) => s.deliverables.reduce((m, d) => Math.max(m, d.period_days), max), 0)
}

/** Earliest start the client may pick: never before the agreed start, never in the past. */
export function minEditStartDate(original: ProjectSchedule): string {
  const today = todayIsoDate()
  return original.plannedStartDate > today ? original.plannedStartDate : today
}

/** Earliest offer deadline: never before the current one, never in the past. */
export function minEditDeadline(original: string): string {
  const today = todayIsoDate()
  return original > today ? original : today
}

export function buildEditContext(project: RawProject): EditContext {
  const installments: any[] = [
    ...(project?.offer?.installments ?? []),
    ...(project?.order?.installments ?? []),
    ...((project?.invited ?? []) as any[]).reduce<any[]>((all, m) => all.concat(m?.offer?.installments ?? []), []),
  ]
  const linked = installments
    .map(row => Number(row?.project_service_deliverable_id ?? (row?.project_proposal_offer_deliverable_id ? null : row?.deliverable?.id)))
    .filter(id => id > 0)
  const duration = project?.duration_days
  return {
    title: String(project?.title ?? ''),
    type: project?.type ? String(project.type) : null,
    plannedStartDate: project?.planned_start_date ? String(project.planned_start_date).slice(0, 10) : null,
    durationDays: duration === null || duration === undefined || duration === '' ? null : Number(duration),
    linkedDeliverableIds: Array.from(new Set(linked)),
  }
}

export function projectFingerprint(project: RawProject): string {
  return JSON.stringify([
    project?.project_services, project?.components, project?.contract, project?.order, project?.status,
    project?.planned_start_date, project?.duration_days, project?.last_proposal_deadline, project?.offer?.uuid,
  ])
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

export function buildPatch(draft: EditDraft): AgreementPatch {
  const patch: AgreementPatch = {}
  draft.current.services.forEach(service => {
    const before = draft.original.services.find(s => s.id === service.id)
    if (!before) return
    if (service.editScopes && !same(service.scopes, before.scopes))
      (patch.scopes ??= []).push({ project_service_id: service.id, items: service.scopes })
    if (service.editDeliverables && !same(service.deliverables, before.deliverables))
      (patch.deliverables ??= []).push({ project_service_id: service.id, items: service.deliverables })
  })
  draft.current.components.forEach(component => {
    const before = draft.original.components.find(c => c.id === component.id)
    if (!before || same(component.value, before.value)) return
    const list = component.level === 'project' ? (patch.project_components ??= []) : (patch.service_components ??= [])
    list.push({ id: component.id, value: component.value })
  })
  const { schedule, deadlineOffer } = draft.current
  const before = draft.original
  // Only changed properties are sent; the backend treats a repeated value as unchanged.
  if (schedule && before.schedule) {
    if (schedule.plannedStartDate !== before.schedule.plannedStartDate) patch.planned_start_date = schedule.plannedStartDate
    if (schedule.durationDays !== before.schedule.durationDays) patch.duration_days = schedule.durationDays
  }
  if (deadlineOffer && before.deadlineOffer && deadlineOffer !== before.deadlineOffer)
    patch.deadline_offer = `${deadlineOffer} 23:59:59`
  return patch
}

/** Which parts of the draft differ from the saved agreement, for "Edited" badges. */
export function changedKeys(draft: EditDraft): Set<string> {
  const keys = new Set<string>()
  draft.current.services.forEach(service => {
    const before = draft.original.services.find(s => s.id === service.id)
    if (!before) return
    if (!same(service.scopes, before.scopes)) keys.add(`scopes:${service.id}`)
    if (!same(service.deliverables, before.deliverables)) keys.add(`deliverables:${service.id}`)
  })
  draft.current.components.forEach(component => {
    const before = draft.original.components.find(c => c.id === component.id)
    if (before && !same(component.value, before.value)) keys.add(`component:${component.id}`)
  })
  if (!same(draft.current.schedule, draft.original.schedule)) keys.add('schedule')
  if (draft.current.deadlineOffer !== draft.original.deadlineOffer) keys.add('deadline')
  return keys
}

// The draft lives in sessionStorage so it survives moving between the review and
// the section pages, and is dropped after saving or when the agreement changes.
const draftKey = (projectUuid: string) => `projectAgreementEdit:${projectUuid}`

export function readDraft(projectUuid: string): EditDraft | null {
  try {
    const raw = window.sessionStorage.getItem(draftKey(projectUuid))
    const draft = raw ? (JSON.parse(raw) as EditDraft) : null
    return draft?.projectUuid === projectUuid ? draft : null
  } catch {
    return null
  }
}

export function writeDraft(draft: EditDraft) {
  try {
    window.sessionStorage.setItem(draftKey(draft.projectUuid), JSON.stringify(draft))
  } catch {
    // ignore
  }
}

export function clearDraft(projectUuid: string) {
  try {
    window.sessionStorage.removeItem(draftKey(projectUuid))
  } catch {
    // ignore
  }
}

export function updateDraft(projectUuid: string, change: (state: EditState) => EditState): EditDraft | null {
  const draft = readDraft(projectUuid)
  if (!draft) return null
  const next = { ...draft, current: change(draft.current) }
  writeDraft(next)
  return next
}

export function editReviewHref(locale: WizardLocale, projectUuid: string) {
  return `/${locale}/project/edit/${projectUuid}`
}

export function editStepHref(locale: WizardLocale, projectUuid: string, step: string, params: Record<string, string | number>) {
  const query = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
  return `/${locale}/project/edit/${projectUuid}/${step}${query ? `?${query}` : ''}`
}
