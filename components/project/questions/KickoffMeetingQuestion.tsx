'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconCalendarEvent, IconX } from '@tabler/icons-react'
import { getProjectApiErrorMessage } from '../projectApiError'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { readProjectAddonsState, updateProjectAddonsState } from '../projectAddonsState'
import { syncProjectAddons } from '../projectAddonsSync'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import ChoiceCard from './ChoiceCard'

function renderBadgeIcon(
  Icon: ({ size, stroke }: { size?: number; stroke?: number }) => ReactNode,
  colorClassName: string
) {
  return ({ size, stroke }: { size: number; stroke: number; className?: string }) => (
    <span
      className={`inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm ${colorClassName}`}
    >
      <Icon size={size * 0.58} stroke={stroke} />
    </span>
  )
}

export default function KickoffMeetingQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [selected, setSelected] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useProjectStepErrorToast(error, locale)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )
      setSelected(readProjectAddonsState(locale).kickoffMeeting.enabled)
    } catch {
      // ignore
    }
  }, [locale])

  const title = isRTL
    ? 'هل تحتاج إلى اجتماع انطلاقة للمشروع؟'
    : 'Do you need a kickoff meeting (recommended)?'

  const persistSelection = (enabled: boolean) => {
    updateProjectAddonsState(locale, (current) => ({
      ...current,
      kickoffMeeting: { enabled, skipped: false },
    }))
  }

  const onSelect = (enabled: boolean) => {
    setSelected(enabled)
    setError(null)
    persistSelection(enabled)
  }

  const canContinue = selected !== null

  const onContinue = async () => {
    if (submitting) return
    if (selected === null) return

    persistSelection(selected)
    setSubmitting(true)
    setError(null)

    try {
      await syncProjectAddons({ locale })
      if (nav.nextHref) {
        nav.goNext()
        return
      }
      router.push(`/${locale}/project`)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ الإضافات.' : 'Failed to save project addons.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  const yesIcon = renderBadgeIcon(
    IconCalendarEvent,
    'border-sky-200/80 bg-sky-50/90 text-sky-700'
  )
  const noIcon = renderBadgeIcon(
    IconX,
    'border-slate-200/80 bg-slate-100/90 text-slate-600'
  )

  return (
    <div
      className="w-full max-w-4xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 pb-28">
        <ProjectSelectedTypeHeader
          locale={locale}
          entered={entered}
          projectTypeId={projectType}
        />

        <div
          className={`mt-2 text-start transition-all duration-700 ${
            entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
          }`}
        >
          {isEnglish ? (
            <style>{`
              #kickoff-meeting-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="kickoff-meeting-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {title}
          </h2>
        </div>

        <div className="mt-6 sm:mt-20" role="radiogroup" aria-label={title}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ChoiceCard
              checked={selected === true}
              title={isRTL ? 'نعم' : 'Yes'}
              renderIcon={yesIcon}
              onSelect={() => onSelect(true)}
              entered={entered}
              isRTL={isRTL}
              delayMs={110}
              align="center"
              size="sm"
              className="min-h-[170px]"
              iconSize={56}
              iconStroke={1.6}
            />

            <ChoiceCard
              checked={selected === false}
              title={isRTL ? 'لا' : 'No'}
              renderIcon={noIcon}
              onSelect={() => onSelect(false)}
              entered={entered}
              isRTL={isRTL}
              delayMs={180}
              align="center"
              size="sm"
              className="min-h-[170px]"
              iconSize={56}
              iconStroke={1.6}
            />
          </div>

          {error ? (
            <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
          ) : null}
        </div>
      </div>

      <div className="fixed left-0 right-0 z-20 bottom-0 border-t border-slate-200/70 bg-white/80 backdrop-blur-md lg:bottom-10 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={() => void onContinue()}
              disabled={!canContinue || submitting}
              className={`btn-sm px-6 py-2 rounded-full ${
                canContinue && !submitting
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
              }`}
            >
              {submitting
                ? isRTL
                  ? 'جاري الحفظ...'
                  : 'Saving...'
                : nav.nextHref
                  ? isRTL
                    ? 'متابعة'
                    : 'Continue'
                  : isRTL
                    ? 'إنهاء'
                    : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
