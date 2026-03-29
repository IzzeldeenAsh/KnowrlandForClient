import type { WizardLocale } from './wizardStorage'

export function projectTypeLabel(locale: WizardLocale, projectTypeId: string | null) {
  const isArabic = locale === 'ar'
  if (!projectTypeId) return null

  const normalized =
    projectTypeId === 'framework'
      ? 'frame_work_agreement'
      : projectTypeId === 'urgent'
        ? 'urgent_request'
        : projectTypeId

  const map: Record<string, { en: string; ar: string }> = {
    ad_hoc: { en: 'Ad hoc', ar: 'Ad hoc' },
    frame_work_agreement: { en: 'Framework agreement', ar: 'Framework agreement' },
    urgent_request: { en: 'Urgent request', ar: 'Urgent request' },
  }

  const label = map[normalized]
  if (!label) return projectTypeId
  return isArabic ? label.ar : label.en
}
