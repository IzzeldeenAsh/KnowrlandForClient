import { projectWizardStorage, type WizardLocale } from './wizardStorage'
export type ProjectDefinitionMode = 'simple' | 'advanced'
export function readDefinitionMode(locale: WizardLocale): ProjectDefinitionMode {
  if (typeof window === 'undefined') return 'simple'
  try {
    const saved = window.sessionStorage.getItem(projectWizardStorage.definitionModeKey(locale))
    if (saved === 'simple' || saved === 'advanced') return saved
    // Existing project drafts used the full definition flow.
    return window.sessionStorage.getItem(projectWizardStorage.projectUuidKey(locale)) ? 'advanced' : 'simple'
  } catch { return 'simple' }
}
export function storeDefinitionMode(locale: WizardLocale, mode: ProjectDefinitionMode) {
  window.sessionStorage.setItem(projectWizardStorage.definitionModeKey(locale), mode)
}
