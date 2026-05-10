'use client'

import type { WizardLocale } from '@/components/project/wizardStorage'
import DeliverableStageQuestion from './DeliverableStageQuestion'

export default function DeliverableFinalVersionTypeQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  return (
    <DeliverableStageQuestion
      locale={locale}
      stage="final_version"
      stepKind="report_type"
    />
  )
}
