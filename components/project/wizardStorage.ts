export type WizardLocale = 'en' | 'ar' | string

function projectWizardStoragePrefix(locale: WizardLocale) {
  return `project:wizard:${locale}:`
}

export const projectWizardStorage = {
  projectTypeKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectType`
  },
  projectUuidKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectUuid`
  },
  legacyProjectIdKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectId`
  },
  projectStatusKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectStatus`
  },
  whoAreYouKey(locale: WizardLocale) {
    return `project:wizard:${locale}:whoAreYou`
  },
  deliverablesLanguageKey(locale: WizardLocale) {
    return `project:wizard:${locale}:deliverablesLanguage`
  },
  preferredInsighterTypeKey(locale: WizardLocale) {
    return `project:wizard:${locale}:preferredInsighterType`
  },
  insighterOriginTypeKey(locale: WizardLocale) {
    return `project:wizard:${locale}:insighterOriginType`
  },
  insighterOriginIdKey(locale: WizardLocale) {
    return `project:wizard:${locale}:insighterOriginId`
  },
  insighterMinYearsExperienceKey(locale: WizardLocale) {
    return `project:wizard:${locale}:insighterMinYearsExperience`
  },
  insighterMaxYearsExperienceKey(locale: WizardLocale) {
    return `project:wizard:${locale}:insighterMaxYearsExperience`
  },
  companyMinTeamSizeKey(locale: WizardLocale) {
    return `project:wizard:${locale}:companyMinTeamSize`
  },
  companyMaxTeamSizeKey(locale: WizardLocale) {
    return `project:wizard:${locale}:companyMaxTeamSize`
  },
  projectScopeSnapshotKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectScopeSnapshot`
  },
  projectAddonsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectAddons`
  },
  projectDescriptionTextKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectDescriptionText`
  },
  projectDescriptionFilesMetaKey(locale: WizardLocale) {
    return `project:wizard:${locale}:projectDescriptionFilesMeta`
  },
  targetMarketModeKey(locale: WizardLocale) {
    return `project:wizard:${locale}:targetMarketMode`
  },
  targetMarketCountryIdsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:targetMarketCountryIds`
  },
  targetMarketRegionIdsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:targetMarketRegionIds`
  },
  targetMarketEconomicBlocIdsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:targetMarketEconomicBlocIds`
  },
  serviceIdsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceIds`
  },
  serviceLabelKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceLabel`
  },
  servicePromptKey(locale: WizardLocale) {
    return `project:wizard:${locale}:servicePrompt`
  },
  serviceIsOtherKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceIsOther`
  },
  serviceScopeParentIdsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceScopeParentIds`
  },
  serviceScopeChildIdsByParentKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceScopeChildIdsByParent`
  },
  serviceScopeHasChildrenKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceScopeHasChildren`
  },
  serviceManualScopesKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceManualScopes`
  },
  serviceManualSubscopesByScopeKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceManualSubscopesByScope`
  },
  serviceComponentsPayloadKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceComponentsPayload`
  },
  serviceComponentSlugsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:serviceComponentSlugs`
  },
  serviceComponentAnswerKey(locale: WizardLocale, slug: string) {
    return `project:wizard:${locale}:serviceComponent:${slug}`
  },
  deadlineOfferKey(locale: WizardLocale) {
    return `project:wizard:${locale}:deadlineOffer`
  },
  selectedMatchIdsKey(locale: WizardLocale) {
    return `project:wizard:${locale}:selectedMatchIds`
  },
  proposalMatchUuidKey(locale: WizardLocale) {
    return `project:wizard:${locale}:proposalMatchUuid`
  },
  deadlineKey(locale: WizardLocale) {
    return `project:wizard:${locale}:deadline`
  },
} as const

export function clearProjectWizardStorage(locale: WizardLocale) {
  if (typeof window === 'undefined') return

  try {
    const prefix = projectWizardStoragePrefix(locale)
    const keysToRemove: string[] = []

    for (let index = 0; index < window.sessionStorage.length; index += 1) {
      const key = window.sessionStorage.key(index)
      if (key?.startsWith(prefix)) keysToRemove.push(key)
    }

    for (const key of keysToRemove) {
      window.sessionStorage.removeItem(key)
    }
  } catch {
    // ignore storage access errors
  }
}
