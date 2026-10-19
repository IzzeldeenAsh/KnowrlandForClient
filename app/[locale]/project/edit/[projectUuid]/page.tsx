import { Suspense } from 'react'
import ProjectWizardShell from '@/components/project/ProjectWizardShell'
import ProjectEditReview from '@/components/project/edit/ProjectEditReview'
import type { WizardLocale } from '@/components/project/wizardStorage'

type PageProps = {
  params: Promise<{ locale: string; projectUuid: string }>
}

// Client agreement edit: a summary of everything the client may still change.
export default async function ProjectEditReviewPage({ params }: PageProps) {
  const { locale, projectUuid } = await params

  return (
    <ProjectWizardShell align="top">
      <div className="w-full pt-2 sm:pt-4">
        <Suspense fallback={null}>
          <ProjectEditReview locale={locale as WizardLocale} projectUuid={projectUuid} />
        </Suspense>
      </div>
    </ProjectWizardShell>
  )
}
