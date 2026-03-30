import type { WizardLocale } from '@/components/project/wizardStorage'

export type ReportTypeOption = {
  value: string
  label: string
}

const ALLOWED_REPORT_TYPES = ['pdf', 'docx', 'xlsx', 'pptx'] as const

export function getReportTypeOptions(_locale: WizardLocale): ReportTypeOption[] {
  return [
    { value: 'pdf', label: 'PDF' },
    { value: 'docx', label: 'DOCX' },
    { value: 'xlsx', label: 'XLSX' },
    { value: 'pptx', label: 'PPTX' },
  ]
}

export function normalizeReportTypes(value: unknown): string[] {
  const allowed = new Set<string>(ALLOWED_REPORT_TYPES)

  const sanitize = (items: unknown[]): string[] =>
    items
      .map((item) => String(item || '').trim().toLowerCase())
      .filter((item): item is string => Boolean(item) && allowed.has(item))
      .filter((item, index, arr) => arr.indexOf(item) === index)

  if (Array.isArray(value)) return sanitize(value)

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return []

    try {
      const parsed = JSON.parse(trimmed) as unknown
      if (Array.isArray(parsed)) return sanitize(parsed)
      if (typeof parsed === 'string') return sanitize([parsed])
    } catch {
      return sanitize([trimmed])
    }
  }

  return []
}
