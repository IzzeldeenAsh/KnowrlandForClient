'use client'

import ProjectPropertiesNumericRangeQuestion from './ProjectPropertiesNumericRangeQuestion'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

export default function CompanyTeamSizeQuestion({
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
          ? 'ما حجم فريق الشركة الذي تفضله لهذا المشروع؟'
          : 'What team size should the company insighter have for this project?'
      }
      titleId="company-team-size-question-title"
      subtitle={
        isRTL
          ? 'يمكنك تحديد الحد الأدنى أو الحد الأقصى أو كليهما.'
          : 'You can set a minimum, a maximum, or both.'
      }
      minLabel={isRTL ? 'الحد الأدنى لحجم الفريق' : 'Minimum team size'}
      maxLabel={isRTL ? 'الحد الأقصى لحجم الفريق' : 'Maximum team size'}
      minPlaceholder={isRTL ? 'مثال: 3' : 'Example: 3'}
      maxPlaceholder={isRTL ? 'مثال: 7' : 'Example: 7'}
      minStorageKey={projectWizardStorage.companyMinTeamSizeKey(locale)}
      maxStorageKey={projectWizardStorage.companyMaxTeamSizeKey(locale)}
      sliderMin={1}
      sliderMax={200}
      sliderMarks={[1, 10, 25, 50, 100, 200]}
      emptyErrorText={
        isRTL
          ? 'أدخل قيمة واحدة على الأقل أو استخدم التخطي.'
          : 'Enter at least one value or use skip.'
      }
      invalidRangeText={
        isRTL
          ? 'يجب أن تكون القيمة الدنيا أقل من أو تساوي القيمة العليا.'
          : 'Minimum team size must be less than or equal to maximum team size.'
      }
      saveErrorText={
        isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'
      }
    />
  )
}
