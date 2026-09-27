'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  definitionRequest,
  projectDefinitionIds,
  type DefinitionOption,
} from '../projectDefinitionApi'
import { projectWizardStorage } from '../wizardStorage'
import {
  getNextProjectWizardStepId,
  preServiceProjectComponentSlugs,
} from '../projectWizardFlow'
import WizardStepFrame from './WizardStepFrame'

export default function ProjectContextStep({ locale }: { locale: string }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let cancelled = false
    async function load() {
      setError('')
      try {
        const result = await definitionRequest<{ data: DefinitionOption[] }>(
          locale,
          `component/${projectDefinitionIds(locale)}`,
        )
        if (cancelled) return
        const slugs = result.data.map((c) => c.slug)
        if (
          slugs.some(
            (slug) =>
              !preServiceProjectComponentSlugs.includes(slug),
          )
        )
          throw new Error(
            locale === 'ar'
              ? 'هناك أسئلة جديدة للمشروع غير مدعومة بعد.'
              : 'This project has new questions that are not supported yet.',
          )
        sessionStorage.setItem(
          projectWizardStorage.projectComponentSlugsKey(locale),
          JSON.stringify(slugs),
        )
        const next = getNextProjectWizardStepId(locale, 'project-context')
        if (!next) throw new Error('Unable to find the next project step')
        router.replace(`/${locale}/project/wizard/${next}`)
      } catch (e) {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : 'Unable to load project questions',
          )
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [locale, router, attempt])
  return (
    <WizardStepFrame
      locale={locale}
      title={locale === 'ar' ? 'أسئلة المشروع' : 'Project questions'}
      error={error}
      busy={!error}
      onContinue={() => setAttempt((n) => n + 1)}
      continueLabel={locale === 'ar' ? 'إعادة المحاولة' : 'Try again'}
    >
      <p className="text-slate-600">
        {locale === 'ar'
          ? 'نحدد الأسئلة المشتركة المناسبة لخدماتك.'
          : 'Checking which shared questions apply to your services.'}
      </p>
    </WizardStepFrame>
  )
}
