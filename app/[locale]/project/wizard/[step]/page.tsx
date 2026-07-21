import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProjectWizardShell from '@/components/project/ProjectWizardShell'
import ProjectTypeQuestion from '@/components/project/questions/ProjectTypeQuestion'
import ProjectStatusQuestion from '@/components/project/questions/ProjectStatusQuestion'
import WhoAreYouQuestion from '@/components/project/questions/WhoAreYouQuestion'
import PreferredInsighterTypeQuestion from '@/components/project/questions/PreferredInsighterTypeQuestion'
import InsighterOriginQuestion from '@/components/project/questions/InsighterOriginQuestion'
import InsighterExperienceQuestion from '@/components/project/questions/InsighterExperienceQuestion'
import CompanyTeamSizeQuestion from '@/components/project/questions/CompanyTeamSizeQuestion'
import ProjectDescriptionQuestion from '@/components/project/questions/ProjectDescriptionQuestion'
import DeadlineOfferQuestion from '@/components/project/questions/DeadlineOfferQuestion'
import ProjectDeadlineQuestion from '@/components/project/questions/ProjectDeadlineQuestion'
import ProjectAddonsIntroStep from '@/components/project/questions/ProjectAddonsIntroStep'
import KickoffMeetingQuestion from '@/components/project/questions/KickoffMeetingQuestion'
import ProjectReviewStep from '@/components/project/questions/ProjectReviewStep'
import ProjectMatchesStep from '@/components/project/questions/ProjectMatchesStep'
import ProjectSubmissionSuccessStep from '@/components/project/questions/ProjectSubmissionSuccessStep'
import DeliverablesLanguageQuestion from '@/components/project/questions/DeliverablesLanguageQuestion'
import InsighterIndustryQuestion from '@/components/project/questions/InsighterIndustryQuestion'
import InsighterSubIndustryQuestion from '@/components/project/questions/InsighterSubIndustryQuestion'
import TargetMarketQuestion from '@/components/project/questions/TargetMarketQuestion'
import ServiceQuestion from '@/components/project/questions/ServiceQuestion'
import ProjectScopeQuestion from '@/components/project/questions/ProjectScopeQuestion'
import ProjectSubscopesQuestion from '@/components/project/questions/ProjectSubscopesQuestion'
import DeliverableFirstDraftDateQuestion from '@/components/project/questions/service-components/DeliverableFirstDraftDateQuestion'
import DeliverableFirstDraftTypeQuestion from '@/components/project/questions/service-components/DeliverableFirstDraftTypeQuestion'
import DeliverableFirstDraftWayQuestion from '@/components/project/questions/service-components/DeliverableFirstDraftWayQuestion'
import DeliverableFinalVersionDateQuestion from '@/components/project/questions/service-components/DeliverableFinalVersionDateQuestion'
import DeliverableFinalVersionTypeQuestion from '@/components/project/questions/service-components/DeliverableFinalVersionTypeQuestion'
import DeliverableFinalVersionWayQuestion from '@/components/project/questions/service-components/DeliverableFinalVersionWayQuestion'
import DataSourcesExpectedQuestion from '@/components/project/questions/service-components/DataSourcesExpectedQuestion'

type PageProps = {
  params: Promise<{ locale: string; step: string }>
}

export default async function ProjectWizardStepPage({ params }: PageProps) {
  const { locale, step } = await params

  const legacyRedirects: Record<string, string> = {
    '1': 'project-type',
    '2': 'deliverables-language',
    '3': 'service',
    '5': 'project-status',
    '6': 'target-market',
    '7': 'service',
    'deliverable-stage': 'deliverable-first-draft-date',
    'deliverable-type-first-draft': 'deliverable-first-draft-type',
    'deliverable-type-final-version': 'deliverable-final-version-type',
  }

  const legacyTarget = legacyRedirects[step]
  if (legacyTarget) {
    redirect(`/${locale}/project/wizard/${legacyTarget}`)
  }

  if (step === 'project-type') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectTypeQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deliverables-language') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeliverablesLanguageQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'insighter-industry') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <InsighterIndustryQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'insighter-sub-industry') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <InsighterSubIndustryQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'service') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ServiceQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'project-scope') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectScopeQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'project-subscopes') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectSubscopesQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deliverable-first-draft-date') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeliverableFirstDraftDateQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deliverable-first-draft-type') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeliverableFirstDraftTypeQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deliverable-first-draft-way') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeliverableFirstDraftWayQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deliverable-final-version-date') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeliverableFinalVersionDateQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deliverable-final-version-type') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeliverableFinalVersionTypeQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deliverable-final-version-way') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeliverableFinalVersionWayQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'data-sources-expected') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DataSourcesExpectedQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'target-market') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <TargetMarketQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'project-status') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectStatusQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'who-are-you') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <WhoAreYouQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'preferred-insighter-type') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <PreferredInsighterTypeQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'insighter-origin') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <InsighterOriginQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'insighter-experience') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <InsighterExperienceQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'company-team-size') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <CompanyTeamSizeQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'project-description') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectDescriptionQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'deadline-offer') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <DeadlineOfferQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'project-deadline') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectDeadlineQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'addons-intro') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectAddonsIntroStep locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'kickoff-meeting') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <KickoffMeetingQuestion locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'project-review') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectReviewStep locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'project-matches') {
    return (
      <ProjectWizardShell align="top">
        <div className="w-full pt-2 sm:pt-4">
          <ProjectMatchesStep locale={locale} />
        </div>
      </ProjectWizardShell>
    )
  }

  if (step === 'submission-success') {
    return (
      <ProjectWizardShell align="center">
        <ProjectSubmissionSuccessStep locale={locale} />
      </ProjectWizardShell>
    )
  }

  return (
    <ProjectWizardShell align="top">
      <div className="w-full max-w-2xl mx-auto pt-2 sm:pt-4 text-start">
        <p className="text-sm font-semibold text-slate-600">Project wizard</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          Step {step}
        </h2>
        <p className="mt-4 text-slate-700">
          This step is not implemented yet.
        </p>

        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
          <div className="mx-auto w-full max-w-2xl px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
            <div className="flex items-center justify-between gap-3">
              <Link
                href={`/${locale}/project`}
                className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
              >
                Back
              </Link>
              <button
                type="button"
                className="btn-sm px-6 py-2 rounded-full text-slate-500 bg-slate-200 cursor-not-allowed"
                disabled
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProjectWizardShell>
  )
}
