// Lets a wizard step render outside the wizard (agreement edit pages): values come
// in from the caller and are handed back on continue instead of the wizard storage.
export type StepEditBase = {
  projectType: string | null
  serviceLabel: string | null
  backHref: string
  continueLabel: string
}

// Plain module (no 'use client') so the server route can validate the step.
export const PROJECT_EDIT_STEPS = ['schedule', 'offer-deadline', 'scopes', 'subscopes', 'deliverables', 'target-market', 'data-sources'] as const
