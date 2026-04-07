'use client'

import ProjectPropertiesNumericRangeQuestion from './ProjectPropertiesNumericRangeQuestion'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

export default function InsighterExperienceQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const isRTL = locale === 'ar'

  return (
    <ProjectPropertiesNumericRangeQuestion
      locale={locale}
      title={
        isRTL
          ? 'كم سنة خبرة تفضل أن يمتلكها الخبير الفرد؟'
          : 'How many years of experience should the individual insighter have?'
      }
      titleId="insighter-experience-question-title"
      subtitle={
        isRTL
          ? 'يمكنك إدخال حد أدنى أو حد أقصى أو كليهما.'
          : 'You can enter a minimum, a maximum, or both.'
      }
      minLabel={isRTL ? 'الحد الأدنى لسنوات الخبرة' : 'Minimum years of experience'}
      maxLabel={isRTL ? 'الحد الأقصى لسنوات الخبرة' : 'Maximum years of experience'}
      minPlaceholder={isRTL ? 'مثال: 3' : 'Example: 3'}
      maxPlaceholder={isRTL ? 'مثال: 8' : 'Example: 8'}
      minStorageKey={projectWizardStorage.insighterMinYearsExperienceKey(locale)}
      maxStorageKey={projectWizardStorage.insighterMaxYearsExperienceKey(locale)}
      sliderMin={0}
      sliderMax={40}
      sliderMarks={[0, 5, 10, 15, 20, 25, 30, 35, 40]}
      emptyErrorText={
        isRTL
          ? 'أدخل قيمة واحدة على الأقل أو استخدم التخطي.'
          : 'Enter at least one value or use skip.'
      }
      invalidRangeText={
        isRTL
          ? 'يجب أن تكون القيمة الدنيا أقل من أو تساوي القيمة العليا.'
          : 'Minimum years must be less than or equal to maximum years.'
      }
      saveErrorText={
        isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'
      }
    />
  )
}
