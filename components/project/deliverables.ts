import { BACKEND_STRING_MAX } from './backendLimits'
export type Deliverable = {
  title: string
  date: string
  report_type: string[]
  way: {
    selected: 'on_platform' | 'session' | 'physical_workshop'
    address: string
  }
}
// project_service_deliverables.title and delivery_address are string() columns.
export const DELIVERABLE_TITLE_MAX = BACKEND_STRING_MAX
export const DELIVERABLE_ADDRESS_MAX = BACKEND_STRING_MAX

export type DeliveryMethodOption = {
  value: Deliverable['way']['selected']
  label: string
  bg: string
  fg: string
}
export function deliveryMethodOptions(ar: boolean): DeliveryMethodOption[] {
  return [
    { value: 'on_platform', label: ar ? 'على المنصة' : 'On the platform', bg: '#E5F5EE', fg: '#0E7A4E' },
    { value: 'session', label: ar ? 'جلسة' : 'Session', bg: '#E6F1FA', fg: '#1C6FA8' },
    { value: 'physical_workshop', label: ar ? 'ورشة حضورية' : 'In-person workshop', bg: '#FDF1E3', fg: '#A85A0C' },
  ]
}
export function emptyDeliverable(): Deliverable {
  return {
    title: '',
    date: '',
    report_type: [],
    way: { selected: 'on_platform', address: '' },
  }
}
export type DeliverableIssue =
  | 'title'
  | 'title_too_long'
  | 'date_missing'
  | 'date_before_start'
  | 'date_after_deadline'
  | 'formats'
  | 'method'
  | 'address'
  | 'address_too_long'

export function deliverableIssues(
  item: Deliverable,
  start: string,
  deadline: string,
): DeliverableIssue[] {
  const issues: DeliverableIssue[] = []
  if (!item.title.trim()) issues.push('title')
  else if (item.title.trim().length > DELIVERABLE_TITLE_MAX) issues.push('title_too_long')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date)) issues.push('date_missing')
  else if (start && item.date < start) issues.push('date_before_start')
  else if (deadline && item.date > deadline) issues.push('date_after_deadline')
  if (
    !Array.isArray(item.report_type) ||
    item.report_type.length === 0 ||
    !item.report_type.every((t) => ['pdf', 'docx', 'xlsx', 'pptx'].includes(t))
  )
    issues.push('formats')
  if (!['on_platform', 'session', 'physical_workshop'].includes(item.way.selected))
    issues.push('method')
  else if (
    item.way.selected === 'physical_workshop' &&
    !item.way.address.trim()
  )
    issues.push('address')
  else if (
    item.way.selected === 'physical_workshop' &&
    item.way.address.trim().length > DELIVERABLE_ADDRESS_MAX
  )
    issues.push('address_too_long')
  return issues
}

export function validateDeliverables(
  items: Deliverable[],
  start: string,
  deadline: string,
): boolean {
  return (
    items.length > 0 &&
    items.every((item) => deliverableIssues(item, start, deadline).length === 0)
  )
}
