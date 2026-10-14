 'use client'
import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { readDefinitionMode } from './projectDefinitionMode'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { readComponentCatalog } from './projectComponentsCatalog'
import { deliverableStageStepSlugs, expandServiceComponentSlugs, getProjectWizardStepOrder, projectWizardStepIds } from './projectWizardFlow'
import { readServiceComponentsPayload, writeServiceComponentsPayload } from './serviceComponentsPayload'
import { syncServiceComponents } from './serviceComponentsSync'
import { syncProjectProperties } from './projectPropertiesSync'
import { useProjectWizardNavigation } from './useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from './wizardStorage'
// Advanced mode: the client must define scope and deliverables, so these steps cannot be left to the Insighter.
const ADVANCED_REQUIRED_STEPS = new Set<string>([projectWizardStepIds.projectScope, projectWizardStepIds.projectSubscopes, ...deliverableStageStepSlugs])
export default function ComponentQuestionFrame({ locale, step, children }: { locale: WizardLocale; step: string; children: ReactNode }) {
 const nav = useProjectWizardNavigation(locale), router = useRouter()
 const [ready, setReady] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('')
 const items = readComponentCatalog(locale).filter(item => expandServiceComponentSlugs([item.slug]).includes(step))
 const optional = items.length > 0 && items.every(item => item.is_required === false)
 const deferred = items.some(item => item.fillable_by_insighter) && !(readDefinitionMode(locale) === 'advanced' && ADVANCED_REQUIRED_STEPS.has(step))
 useEffect(() => {
   const order = getProjectWizardStepOrder(locale)
   if (!order.includes(step)) { router.replace(`/${locale}/project/wizard/${readStoredProjectRequestUuid(locale) ? 'component-setup' : 'service'}`); return }
   setReady(true)
 }, [locale, step, router])
 async function skip() {
   setBusy(true)
   try {
     const payload = readServiceComponentsPayload(locale)
     items.forEach(item => {
       delete payload.components[item.slug]
       if (item.slug === 'target-market') [projectWizardStorage.targetMarketModeKey(locale), projectWizardStorage.targetMarketCountryIdsKey(locale), projectWizardStorage.targetMarketRegionIdsKey(locale), projectWizardStorage.targetMarketEconomicBlocIdsKey(locale)].forEach(key => window.sessionStorage.removeItem(key))
     })
     writeServiceComponentsPayload(locale, payload)
     await syncServiceComponents(locale)
     await syncProjectProperties(locale)
     nav.goNext()
   } catch { setError(locale === 'ar' ? 'تعذر حفظ التغييرات.' : 'Could not save changes.') } finally { setBusy(false) }
 }
 if (!ready || !getProjectWizardStepOrder(locale).includes(step)) return null
 return <>{optional && deferred && <div className="max-w-5xl mx-auto mb-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
   <p>{locale === 'ar' ? 'يمكن للإنسايتر إكمال هذا المتطلب ضمن عرضه.' : 'An Insighter can complete this requirement in their offer.'}</p>
   <button type="button" className="mt-2 font-semibold text-[#1C7CBB] underline" disabled={busy} onClick={() => void skip()}>{locale === 'ar' ? 'اتركه للإنسايتر' : 'Let the Insighter define this'}</button>
   {error && <p role="alert" className="text-rose-700 mt-2">{error}</p>}
 </div>}{children}</>
}
