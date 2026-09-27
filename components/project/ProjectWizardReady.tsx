'use client'
import { useEffect, useState, type ReactNode } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { readProjectServices } from './projectServicesState'
import { readStoredProjectRequestUuid } from './projectRequestUuid'
import { readStoredSpecifiedInsighterUuid } from './specifiedInsighterProject'

/** Browser-owned draft answers must load before displaying interactive form controls. */
export default function ProjectWizardReady({
  children,
}: {
  children: ReactNode
}) {
  const [ready, setReady] = useState(false)
  const params = useParams<{ locale: string; step?: string }>()
  const search = useSearchParams()
  useEffect(() => {
    setReady(true)
  }, [])
  if (!ready)
    return (
      <div
        role="status"
        aria-label="Loading"
        className="mx-auto mt-16 h-8 w-8 animate-spin rounded-full border-2 border-sky-200 border-t-sky-700"
      />
    )
  const locale = params.locale || 'en'
  const legacyDraft =
    !!readStoredProjectRequestUuid(locale) &&
    !readProjectServices(locale).length
  const lockedBasics =
    !!readStoredProjectRequestUuid(locale) &&
    [
      'project-type',
      'deliverables-language',
      'insighter-industry',
      'insighter-sub-industry',
    ].includes(params.step || '')
  if (search.get('fresh') !== '1' && (legacyDraft || lockedBasics)) {
    const ar = locale === 'ar'
    const expert = readStoredSpecifiedInsighterUuid(locale)
    const href = `/${locale}/project/wizard/project-type?fresh=1${expert ? `&specified_insighter=${encodeURIComponent(expert)}` : ''}`
    return (
      <div
        className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8"
        dir={ar ? 'rtl' : 'ltr'}
      >
        <h1 className="text-2xl font-semibold">
          {legacyDraft
            ? ar
              ? 'تم تحديث نموذج طلب المشروع'
              : 'The project request form has been updated'
            : ar
              ? 'تم حفظ إعدادات المشروع'
              : 'Your project settings have been saved'}
        </h1>
        <p className="mt-4 text-slate-600">
          {legacyDraft
            ? ar
              ? 'تستخدم هذه المسودة النموذج السابق. ابدأ طلباً جديداً لتحديد الخدمات والمخرجات بالنموذج المحدث.'
              : 'This draft uses the previous format. Start a new request to define services and deliverables with the updated form.'
            : ar
              ? 'يتم تثبيت نوع المشروع ولغته وصناعته عند اختيار الخدمة الأولى. لتغييرها، ابدأ طلباً جديداً.'
              : 'Project type, language, and industry are set when the first service is created. Start a new request to change these settings.'}
        </p>
        {!legacyDraft && (
          <Link
            className="mt-6 me-4 inline-block text-sky-700"
            href={`/${locale}/project/wizard/services-summary`}
          >
            {ar ? 'العودة إلى الخدمات' : 'Back to services'}
          </Link>
        )}
        <Link
          className="mt-6 inline-block rounded-full bg-sky-700 px-5 py-3 text-white"
          href={href}
        >
          {ar ? 'بدء طلب جديد' : 'Start a new request'}
        </Link>
      </div>
    )
  }
  return <>{children}</>
}
