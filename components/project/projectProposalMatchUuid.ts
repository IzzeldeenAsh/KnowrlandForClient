import { projectWizardStorage, type WizardLocale } from './wizardStorage'

function normalizeProposalMatchUuid(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

export function readStoredProposalMatchUuid(locale: WizardLocale): string {
  if (typeof window === 'undefined') return ''

  try {
    return normalizeProposalMatchUuid(
      window.sessionStorage.getItem(projectWizardStorage.proposalMatchUuidKey(locale))
    )
  } catch {
    return ''
  }
}

export function writeStoredProposalMatchUuid(
  locale: WizardLocale,
  proposalMatchUuid: string
) {
  if (typeof window === 'undefined') return

  const normalizedProposalMatchUuid = normalizeProposalMatchUuid(proposalMatchUuid)
  if (!normalizedProposalMatchUuid) return

  try {
    window.sessionStorage.setItem(
      projectWizardStorage.proposalMatchUuidKey(locale),
      normalizedProposalMatchUuid
    )
  } catch {
    // ignore storage access errors
  }
}

export function clearStoredProposalMatchUuid(locale: WizardLocale) {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.removeItem(projectWizardStorage.proposalMatchUuidKey(locale))
  } catch {
    // ignore storage access errors
  }
}
