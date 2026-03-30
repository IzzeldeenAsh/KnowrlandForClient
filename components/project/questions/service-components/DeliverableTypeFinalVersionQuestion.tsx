'use client'

import type { WizardLocale } from '@/components/project/wizardStorage'
import MultiChipServiceComponentQuestion from './MultiChipServiceComponentQuestion'
import { getReportTypeOptions } from './deliverableReportTypes'

export default function DeliverableTypeFinalVersionQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const isRTL = locale === 'ar'
  return (
    <MultiChipServiceComponentQuestion
      locale={locale}
      slug="deliverable-type-final-version"
      title={isRTL ? 'نوع المخرجات (النسخة النهائية)' : 'Deliverable type (final version)'}
      subtitle={
        isRTL ? 'اختر صيغة واحدة أو أكثر.' : 'Select one or more formats.'
      }
      options={getReportTypeOptions(locale)}
    />
  )
}
