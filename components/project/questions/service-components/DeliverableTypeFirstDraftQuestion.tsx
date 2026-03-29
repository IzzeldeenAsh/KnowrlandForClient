'use client'

import type { WizardLocale } from '@/components/project/wizardStorage'
import MultiChipServiceComponentQuestion from './MultiChipServiceComponentQuestion'
import { getReportTypeOptions } from './deliverableReportTypes'

export default function DeliverableTypeFirstDraftQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const isRTL = locale === 'ar'
  return (
    <MultiChipServiceComponentQuestion
      locale={locale}
      slug="deliverable-type-first-draft"
      title={isRTL ? 'نوع المخرجات (المسودة الأولى)' : 'Deliverable type (first draft)'}
      subtitle={
        isRTL ? 'اختر صيغة واحدة أو أكثر.' : 'Select one or more formats.'
      }
      options={getReportTypeOptions(locale)}
    />
  )
}
