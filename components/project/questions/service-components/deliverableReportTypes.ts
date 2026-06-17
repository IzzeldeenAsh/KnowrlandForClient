import type { WizardLocale } from '@/components/project/wizardStorage'

export type ReportTypeOption = {
  value: string
  label: string
  iconSrc?: string
}

const ALLOWED_REPORT_TYPES = ['pdf', 'docx', 'xlsx', 'pptx'] as const

const REPORT_TYPE_ICONS: Record<string, string> = {
  pdf: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781525110/pdf_136522_urotaw.png',
  docx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104177/Microsoft_Office_Word__2025_present_1_sywxfd.png',
  xlsx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104176/Microsoft_Office_Excel__2025_present_1_scjtip.png',
  pptx: 'https://res.cloudinary.com/dsiku9ipv/image/upload/v1781104175/Microsoft_Office_PowerPoint__2025_present_1_ofrkfx.png',
}

export function getReportTypeOptions(_locale: WizardLocale): ReportTypeOption[] {
  const isRTL = _locale === 'ar'

  return [
    { value: 'pdf', label: isRTL ? 'ملف PDF' : 'PDF Report', iconSrc: REPORT_TYPE_ICONS.pdf },
    { value: 'docx', label: isRTL ? 'مستند Word' : 'Word Document', iconSrc: REPORT_TYPE_ICONS.docx },
    { value: 'xlsx', label: isRTL ? 'جدول Excel' : 'Excel Sheet', iconSrc: REPORT_TYPE_ICONS.xlsx },
    { value: 'pptx', label: isRTL ? 'عرض Power Point' : 'Power Point', iconSrc: REPORT_TYPE_ICONS.pptx },
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
