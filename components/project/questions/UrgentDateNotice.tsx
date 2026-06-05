'use client'

import type { WizardLocale } from '../wizardStorage'

export default function UrgentDateNotice({
  locale,
}: {
  locale: WizardLocale
}) {
  const isRTL = locale === 'ar'

  return (
    <div className="mt-4 flex max-w-sm items-start gap-3 rounded-[10px] border border-amber-200 bg-amber-50/90 px-4 py-3 text-start text-amber-900 shadow-sm">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black leading-none text-white"
        aria-hidden="true"
      >
        !
      </span>
      <p className="text-xs font-semibold leading-5 sm:text-sm">
        {isRTL
          ? 'هذا اليوم فقط متاح لأن الطلبات العاجلة يجب أن تكون خلال 24 ساعة.'
          : 'Only this date is available because urgent requests are 24-hour requests.'}
      </p>
    </div>
  )
}
