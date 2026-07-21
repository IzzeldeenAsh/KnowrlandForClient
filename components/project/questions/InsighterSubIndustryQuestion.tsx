'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { projectWizardStepIds } from '../projectWizardFlow'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { getApiUrl } from '@/app/config'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { useProjectWizardNavigation } from '@/components/project/useProjectWizardNavigation'
import {
  IndustryCard,
  type IndustryNode,
} from '@/components/project/questions/InsighterIndustryQuestion'

function safeParseId(value: string | null): number | null {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export default function InsighterSubIndustryQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [parent, setParent] = useState<IndustryNode | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isAdvancing, setIsAdvancing] = useState(false)

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
      setSelectedId(
        safeParseId(
          window.sessionStorage.getItem(
            projectWizardStorage.insighterIndustryIdKey(locale)
          )
        )
      )
    } catch {
      // ignore
    }
  }, [locale])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setError(null)
      setLoading(true)
      try {
        const parentId = safeParseId(
          window.sessionStorage.getItem(
            projectWizardStorage.insighterIndustryParentIdKey(locale)
          )
        )
        if (parentId == null) throw new Error('missing_parent_industry')

        const res = await fetch(getApiUrl('/api/common/setting/industry/tree'), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Accept-Language': locale === 'ar' ? 'ar' : 'en',
          },
          cache: 'no-store',
        })
        await assertProjectApiResponse(res)
        const json = (await res.json()) as { data?: IndustryNode[] } | IndustryNode[]
        const tree = Array.isArray(json) ? json : json.data || []
        const selectedParent = tree.find((item) => item.key === parentId) || null

        if (!selectedParent || (selectedParent.children || []).length === 0) {
          throw new Error('missing_parent_children')
        }

        if (!cancelled) {
          setParent(selectedParent)
          setSelectedId((current) =>
            (selectedParent.children || []).some((child) => child.key === current)
              ? current
              : null
          )
        }
      } catch (err) {
        if (!cancelled) {
          const isSelectionFlowError =
            err instanceof Error &&
            (err.message === 'missing_parent_industry' ||
              err.message === 'missing_parent_children')
          setError(
            isSelectionFlowError
              ? isRTL
                ? 'اختر صناعة رئيسية أولًا.'
                : 'Choose a parent industry first.'
              : getProjectApiErrorMessage(
                  err,
                  isRTL
                    ? 'تعذر تحميل الصناعات الفرعية.'
                    : 'Failed to load sub-industries.'
                )
          )
          setParent(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [isRTL, locale])

  const children = useMemo(() => parent?.children || [], [parent])
  const selectedChild = useMemo(
    () => children.find((child) => child.key === selectedId) || null,
    [children, selectedId]
  )

  const persistSelection = (child: IndustryNode) => {
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.insighterIndustryIdKey(locale),
        String(child.key)
      )
      window.sessionStorage.setItem(
        projectWizardStorage.insighterIndustryLabelKey(locale),
        child.label
      )
    } catch {
      // ignore
    }
  }

  const advanceWithChild = (child: IndustryNode) => {
    if (isAdvancing) return
    setError(null)
    setSelectedId(child.key)
    persistSelection(child)
    setIsAdvancing(true)
    nav.goNext()
  }

  const onContinue = () => {
    if (!selectedChild || isAdvancing) return
    advanceWithChild(selectedChild)
  }

  const title = isRTL
    ? 'ما هي الصناعة الفرعية لمشروعك؟'
    : 'Which sub-industry best fits your project?'

  return (
    <div className="w-full max-w-6xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
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
            #insighter-sub-industry-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="insighter-sub-industry-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {title}
        </h2>
        {parent ? (
          <p className="mt-2 text-sm font-semibold text-[#1C7CBB]">
            {parent.label}
          </p>
        ) : null}
      </div>

      {error ? (
        <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
      ) : null}

      <div className="mt-6 sm:mt-8 pb-[100px] lg:pb-0">
        {loading ? (
          <div className="text-sm font-semibold text-slate-600">
            {isRTL ? 'جاري التحميل…' : 'Loading…'}
          </div>
        ) : children.length > 0 ? (
          <div
            className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            role="radiogroup"
            aria-label={isRTL ? 'الصناعات الفرعية' : 'Sub-industries'}
          >
            {children.map((child, index) => (
              <IndustryCard
                key={child.key}
                industry={child}
                checked={selectedId === child.key}
                entered={entered}
                index={index}
                disabled={isAdvancing}
                onClick={() => advanceWithChild(child)}
                isRTL={isRTL}
                showIcon={false}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-0 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={
                parent
                  ? nav.backHref
                  : nav.hrefFor(projectWizardStepIds.insighterIndustry)
              }
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!selectedChild || isAdvancing}
              className={`btn-sm px-6 py-2 rounded-full ${
                selectedChild && !isAdvancing
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
              }`}
            >
              {nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
