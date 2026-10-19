import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ProjectWizardShell from '@/components/project/ProjectWizardShell'
import ProjectEditStep from '@/components/project/edit/ProjectEditStep'
import { PROJECT_EDIT_STEPS } from '@/components/project/edit/stepEditAdapter'
import type { WizardLocale } from '@/components/project/wizardStorage'

type PageProps = {
  params: Promise<{ locale: string; projectUuid: string; step: string }>
}

export default async function ProjectEditStepPage({ params }: PageProps) {
  const { locale, projectUuid, step } = await params
  if (!(PROJECT_EDIT_STEPS as readonly string[]).includes(step)) notFound()

  return (
    <ProjectWizardShell align="top">
      <div className="w-full pt-2 sm:pt-4">
        <Suspense fallback={null}>
          <ProjectEditStep locale={locale as WizardLocale} projectUuid={projectUuid} step={step} />
        </Suspense>
      </div>
    </ProjectWizardShell>
  )
}
