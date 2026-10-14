'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconListCheck, IconUserCheck } from '@tabler/icons-react'
import ChoiceCard from './ChoiceCard'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { readDefinitionMode, storeDefinitionMode, type ProjectDefinitionMode } from '../projectDefinitionMode'
import { initiateProjectDraft } from '../initiateProjectDraft'
import { readStoredProjectRequestUuid } from '../projectRequestUuid'
import { getProjectApiErrorMessage } from '../projectApiError'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

export default function DefinitionModeQuestion({ locale }: { locale: WizardLocale }) {
  const nav = useProjectWizardNavigation(locale)
  const router = useRouter()
  const ar = locale === 'ar'
  const [mode, setMode] = useState<ProjectDefinitionMode>('simple')
  const [locked, setLocked] = useState(false)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const submitting = useRef(false)

  useEffect(() => {
    const projectExists = Boolean(readStoredProjectRequestUuid(locale))
    if (!projectExists && !window.sessionStorage.getItem(projectWizardStorage.serviceIdsKey(locale))) {
      router.replace(`/${locale}/project/wizard/service`)
      return
    }
    setMode(readDefinitionMode(locale))
    setLocked(projectExists)
    setReady(true)
  }, [locale, router])

  const options = [
    {
      value: 'simple' as const,
      title: ar ? 'دع الخبير يقترحها' : 'Let the expert propose it',
      text: ar
        ? 'يقترح الخبير النطاق والمخرجات بناءً على طلبك. تراجعها وتوافق على العرض قبل ترسية المشروع.'
        : 'The expert proposes the scope and deliverables based on your request. You review the offer before awarding the project.',
      Icon: IconUserCheck,
    },
    {
      value: 'advanced' as const,
      title: ar ? 'أحددها بنفسي' : 'Define it myself',
      text: ar
        ? 'لديك تصور واضح؟ أضف النطاق والمخرجات التي تحتاجها ليطلع عليها الخبير ضمن طلبك.'
        : 'Already have clear requirements? Add the scope and deliverables you need for experts to review with your request.',
      Icon: IconListCheck,
    },
  ]

  async function onContinue() {
    if (!ready || submitting.current) return
    submitting.current = true
    setBusy(true)
    setError('')
    try {
      await initiateProjectDraft(locale, locked ? readDefinitionMode(locale) : mode)
      setLocked(true)
      setMode(readDefinitionMode(locale))
      nav.goNext()
    } catch (err) {
      setError(getProjectApiErrorMessage(err, ar ? 'تعذر حفظ الطلب. حاول مجددًا.' : 'Could not save your request. Please try again.'))
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-28" dir={ar ? 'rtl' : 'ltr'}>
      <p className="text-sm font-semibold text-[#1C7CBB]">{ar ? 'النطاق والمخرجات' : 'Scope and deliverables'}</p>
      {!ar && <style>{`#definition-mode-question-title { font-family: "IBM Plex Serif", serif !important; }`}</style>}
      <h2 id="definition-mode-question-title" className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
        {ar ? 'من سيحدد نطاق المشروع ومخرجاته؟' : 'Who should define the scope and deliverables?'}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
        {ar ? 'أكملت المعلومات العامة واخترت الخدمة. يمكنك الآن تحديد التفاصيل بنفسك أو تركها للخبير.' : 'You’ve provided the general details and chosen your service. You can now define the details or leave them to the expert.'}
      </p>
      <fieldset disabled={!ready || locked || busy} className="mt-8 grid sm:grid-cols-2 gap-4" role="radiogroup" aria-label={ar ? 'من يحدد المتطلبات' : 'Who defines the requirements'}>
        {options.map(option => (
          <ChoiceCard key={option.value} title={option.title} checked={mode === option.value} entered isRTL={ar} align="start" Icon={option.Icon} iconSize={32} iconClassName="text-[#1C7CBB]" className="!border-slate-200 !bg-white" onSelect={() => { if (!locked && !busy) { setMode(option.value); storeDefinitionMode(locale, option.value) } }}>
            <p className="text-sm text-slate-600 leading-relaxed">{option.text}</p>
          </ChoiceCard>
        ))}
      </fieldset>
      {locked && <p className="mt-5 text-sm text-slate-500">{ar ? 'تم حفظ اختيارك لهذا الطلب.' : 'Your choice has been saved for this request.'}</p>}
      {error && <p role="alert" className="mt-5 text-sm font-semibold text-rose-700">{error}</p>}
      <div className="fixed bottom-0 inset-x-0 bg-white/90 border-t border-slate-200 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="max-w-4xl mx-auto flex justify-between gap-3">
          <Link href={nav.backHref} aria-disabled={busy} onClick={event => { if (busy) event.preventDefault() }} className="btn-sm rounded-full border px-6">{ar ? 'رجوع' : 'Back'}</Link>
          <button type="button" disabled={!ready || busy} className="btn-sm rounded-full bg-[#1C7CBB] text-white px-6 disabled:opacity-50" onClick={() => void onContinue()}>
            {busy ? (ar ? 'جار الحفظ…' : 'Saving…') : nav.continueLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
