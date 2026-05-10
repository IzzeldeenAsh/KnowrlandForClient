'use client'

import type { WizardLocale } from '@/components/project/wizardStorage'
import DeliverableStageQuestion from './DeliverableStageQuestion'

export default function DeliverableFirstDraftTypeQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  return (
    <DeliverableStageQuestion
      locale={locale}
      stage="first_draft"
      stepKind="report_type"
    />
  )
}
