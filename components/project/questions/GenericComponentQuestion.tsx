'use client'
import { useState } from 'react'
import Link from 'next/link'
import { readComponentCatalog } from '../projectComponentsCatalog'
import { readServiceComponentPayloadValue, updateServiceComponentPayload } from '../serviceComponentsPayload'
import { syncServiceComponents } from '../serviceComponentsSync'
import { syncProjectProperties } from '../projectPropertiesSync'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import type { WizardLocale } from '../wizardStorage'
export default function GenericComponentQuestion({ locale, step }: { locale: WizardLocale; step: string }) {
  const component = readComponentCatalog(locale).find(item => item.slug === step)
  const nav = useProjectWizardNavigation(locale), ar = locale === 'ar'
  const [value, setValue] = useState(() => readServiceComponentPayloadValue<string>(locale, step) || '')
  const [error, setError] = useState(''), [busy, setBusy] = useState(false)
  async function save() {
    if (!component || !value.trim()) return
    setBusy(true)
    try { updateServiceComponentPayload(locale, step, value.trim()); await (component.ownership_level === 'project' ? syncProjectProperties(locale) : syncServiceComponents(locale)); nav.goNext() }
    catch { setError(ar ? 'تعذر حفظ المتطلب.' : 'Could not save requirement.') } finally { setBusy(false) }
  }
  if (!component) return <p>{ar ? 'لم يتم العثور على هذه الخطوة.' : 'This step could not be found.'}</p>
  return <div className="max-w-4xl mx-auto pb-28" dir={ar ? 'rtl' : 'ltr'}><h2 className="text-3xl text-slate-900">{component.name}</h2><label htmlFor="requirement-value" className="block mt-6 text-sm">{component.name}</label><textarea id="requirement-value" value={value} onChange={event => setValue(event.target.value)} rows={5} className="mt-2 w-full rounded-xl border-slate-200" />{error && <p role="alert">{error}</p>}<div className="mt-6 flex justify-between"><Link href={nav.backHref}>{ar ? 'رجوع' : 'Back'}</Link><button disabled={busy || !value.trim()} onClick={() => void save()} className="btn-sm rounded-full px-6 bg-[#1C7CBB] text-white">{nav.continueLabel}</button></div></div>
}
