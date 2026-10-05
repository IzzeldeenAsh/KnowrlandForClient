'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  IconAlertTriangleFilled,
  IconCalendarEvent,
  IconCircleCheckFilled,
  IconLayersSubtract,
  IconListTree,
  IconPackage,
  IconPencil,
  IconPlus,
  IconSparkles,
  IconTrash,
} from '@tabler/icons-react'
import { serviceMetaForSlug } from '@/components/project/serviceMeta'
import { toProjectServiceRows, type ProjectServiceRow } from '@/components/project/projectServiceRows'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { dayLabel } from '@/components/project/projectDeliverables'
import { readStoredProjectServiceUuid } from '@/components/project/projectServiceUuid'
import {
  beginServiceAdd,
  forgetServiceSession,
  readPrimaryProjectServiceUuid,
  serviceSessionSeed,
  startServiceFlow,
} from '@/components/project/projectServiceSessions'
import { projectWizardStepIds } from '@/components/project/projectWizardFlow'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import type { WizardLocale } from '@/components/project/wizardStorage'

function headers(locale: WizardLocale, token: string, json = false): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    ...(json ? { 'Content-Type': 'application/json' } : {}),
    'Accept-Language': locale === 'ar' ? 'ar' : 'en',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

/**
 * Specific-insighter projects can include more than one service from the
 * insighter's catalogue. Lists the services and lets the client add (through
 * the service step), edit (scopes and deliverables) or remove the additional ones. The `step` variant
 * is the services wizard step and also lists the main service; the `review`
 * variant lists only the additional services.
 */
export default function ProjectServicesPanel({
  locale,
  projectUuid,
  variant = 'review',
}: {
  locale: WizardLocale
  projectUuid: string
  variant?: 'review' | 'step'
}) {
  const router = useRouter()
  const isRTL = locale === 'ar'

  const [rows, setRows] = useState<ProjectServiceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [busyUuid, setBusyUuid] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const load = useCallback(async () => {
    const token = getAuthToken()
    if (!token || !projectUuid) return

    setLoading(true)
    try {
      const projectRes = await fetch(getApiUrl(`/api/account/project/show/${projectUuid}`), {
        headers: headers(locale, token),
        cache: 'no-store',
      })
      await assertProjectApiResponse(projectRes, 'Failed to load the project.')
      const projectJson = (await projectRes.json()) as any
      setRows(toProjectServiceRows(projectJson?.data?.project_services))
    } catch (err) {
      setError(getProjectApiErrorMessage(err, isRTL ? 'تعذر تحميل الخدمات.' : 'Failed to load services.'))
    } finally {
      setLoading(false)
    }
  }, [isRTL, locale, projectUuid])

  useEffect(() => {
    void load()
  }, [load])

  const isStep = variant === 'step'
  const returnStepId = isStep ? projectWizardStepIds.servicesSummary : projectWizardStepIds.projectReview
  const primaryUuid = readPrimaryProjectServiceUuid(locale) || readStoredProjectServiceUuid(locale)
  const isPrimary = (row: ProjectServiceRow, index: number) =>
    primaryUuid ? row.uuid === primaryUuid : index === 0
  const additional = useMemo(
    () => rows.filter((row, index) => !isPrimary(row, index)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [primaryUuid, rows]
  )
  const goToScopes = () => router.push(`/${locale}/project/wizard/${projectWizardStepIds.projectScope}`)

  const editService = (row: ProjectServiceRow, index: number) => {
    // The main service is edited through the regular steps, which lead back here.
    if (isPrimary(row, index)) {
      goToScopes()
      return
    }
    startServiceFlow(
      locale,
      { mode: 'edit', projectServiceUuid: row.uuid, returnStepId },
      serviceSessionSeed(locale, row)
    )
    goToScopes()
  }

  // Another service is picked on the service step, which adds it and opens its scopes.
  const addAnotherService = () => {
    beginServiceAdd(locale, returnStepId)
    router.push(`/${locale}/project/wizard/${projectWizardStepIds.service}`)
  }

  const removeService = async (row: ProjectServiceRow) => {
    const token = getAuthToken()
    if (!token || busyUuid) return

    setBusyUuid(row.uuid)
    setError(null)
    try {
      const res = await fetch(
        getApiUrl(`/api/account/project/definition/service/${projectUuid}/${row.uuid}`),
        { method: 'DELETE', headers: headers(locale, token) }
      )
      await assertProjectApiResponse(res, 'Failed to remove the service.')
      forgetServiceSession(locale, row.uuid)
      setRows((prev) => prev.filter((item) => item.uuid !== row.uuid))
    } catch (err) {
      setError(getProjectApiErrorMessage(err, isRTL ? 'تعذر حذف الخدمة.' : 'Failed to remove the service.'))
    } finally {
      setBusyUuid(null)
    }
  }

  const serviceList = (
    <ul className="mt-4 space-y-3">
      {additional.map((row) => {
        const index = rows.indexOf(row)
        const primary = isPrimary(row, index)
        return (
          <li key={row.uuid} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{row.name}</p>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {row.scopeNames.length > 0
                    ? row.scopeNames.join(isRTL ? '، ' : ', ')
                    : isRTL
                      ? 'لم تُحدد النطاقات بعد'
                      : 'No scopes selected yet'}
                </p>
                {row.deliverables.length > 0 ? (
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {row.deliverables
                      .map((d) => `${d.title} · ${dayLabel(locale, d.period_days)}`)
                      .join(isRTL ? '، ' : ' · ')}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => editService(row, index)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <IconPencil size={15} />
                  {isRTL ? 'تعديل' : 'Edit'}
                </button>
                {primary ? null : (
                  <button
                    type="button"
                    onClick={() => void removeService(row)}
                    disabled={busyUuid === row.uuid}
                    aria-label={isRTL ? `حذف ${row.name}` : `Remove ${row.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                  >
                    <IconTrash size={16} />
                  </button>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )

  const renderServiceCard = (row: ProjectServiceRow) => {
    const index = rows.indexOf(row)
    const primary = isPrimary(row, index)
    const meta = serviceMetaForSlug(row.isOther ? 'other' : row.slug)
    const Icon = meta.Icon
    const complete = row.scopeNames.length > 0 && row.deliverables.length > 0
    const description =
      row.isOther && row.prompt ? row.prompt : isRTL ? meta.description.ar : meta.description.en
    const firstDue = row.deliverables.reduce<number | null>(
      (min, d) => (min === null ? d.period_days : Math.min(min, d.period_days)),
      null
    )
    const stats = [
      row.scopeNames.length > 0 && {
        icon: IconListTree,
        text: isRTL
          ? `${row.scopeNames.length} نطاقات`
          : `${row.scopeNames.length} ${row.scopeNames.length === 1 ? 'scope' : 'scopes'}`,
      },
      row.subscopeCount > 0 && {
        icon: IconLayersSubtract,
        text: isRTL
          ? `${row.subscopeCount} نطاقات فرعية`
          : `${row.subscopeCount} ${row.subscopeCount === 1 ? 'sub-scope' : 'sub-scopes'}`,
      },
      row.deliverables.length > 0 && {
        icon: IconPackage,
        text: isRTL
          ? `${row.deliverables.length} مخرجات`
          : `${row.deliverables.length} ${row.deliverables.length === 1 ? 'deliverable' : 'deliverables'}`,
      },
      firstDue !== null && {
        icon: IconCalendarEvent,
        text: `${isRTL ? 'أول تسليم' : 'First due'} · ${dayLabel(locale, firstDue)}`,
      },
    ].filter((stat): stat is { icon: typeof IconPackage; text: string } => Boolean(stat))

    return (
      <li
        key={row.uuid}
        className={`relative overflow-hidden rounded-2xl border bg-white/90 p-5 sm:p-6 ${
          complete ? 'border-slate-200' : 'border-amber-200'
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 start-0 w-1.5 ${complete ? 'bg-emerald-400' : 'bg-amber-400'}`}
        />
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${meta.iconClass}`}
          >
            <Icon size={24} stroke={1.6} />
          </span>

          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1">
            <h3 className="text-lg font-semibold text-slate-900">{row.name}</h3>
            {complete ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <IconCircleCheckFilled size={12} />
                {isRTL ? 'مكتملة' : 'Complete'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                <IconAlertTriangleFilled size={12} />
                {isRTL ? 'تحتاج إلى إكمال' : 'Needs completion'}
              </span>
            )}
            {row.isOther ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
                <IconSparkles size={12} stroke={2} />
                {isRTL ? 'مخصصة بالذكاء الاصطناعي' : 'AI-defined'}
              </span>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => editService(row, index)}
              title={isRTL ? 'تعديل' : 'Edit'}
              aria-label={isRTL ? `تعديل ${row.name}` : `Edit ${row.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
            >
              <IconPencil size={16} stroke={1.8} />
            </button>
            {primary ? null : (
              <button
                type="button"
                onClick={() => void removeService(row)}
                disabled={busyUuid === row.uuid}
                title={isRTL ? 'حذف' : 'Remove'}
                aria-label={isRTL ? `حذف ${row.name}` : `Remove ${row.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
              >
                <IconTrash size={16} stroke={1.8} />
              </button>
            )}
          </div>
        </div>

        {/* Indented under the badges on wider screens; full width on phones. */}
        <div className="mt-2 sm:-mt-3 sm:ms-16">
          <p className="line-clamp-2 text-sm text-slate-500">{description}</p>

          {stats.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {stats.map(({ icon: StatIcon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  <StatIcon size={14} stroke={1.8} className="text-slate-400" />
                  {text}
                </li>
              ))}
            </ul>
          ) : null}

          {complete ? null : (
            <button
              type="button"
              onClick={() => editService(row, index)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-amber-600"
            >
              {isRTL ? 'إكمال الخدمة' : 'Finish this service'}
            </button>
          )}
        </div>
      </li>
    )
  }

  if (isStep) {
    return (
      <div>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">{isRTL ? 'جارٍ التحميل…' : 'Loading…'}</p>
        ) : (
          <ol className="space-y-4">{rows.map(renderServiceCard)}</ol>
        )}

        <button
            type="button"
            onClick={addAnotherService}
            disabled={loading}
            className="group mt-4 flex w-full items-center gap-4 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50/40 p-5 text-start transition hover:border-sky-500 hover:bg-sky-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-white/50"
          >
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white transition group-hover:scale-105 group-disabled:bg-slate-300 group-disabled:group-hover:scale-100">
              <IconPlus size={24} stroke={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold text-sky-800 group-disabled:text-slate-500">
                {isRTL ? 'إضافة خدمة أخرى' : 'Add another service'}
              </span>
              <span className="mt-0.5 block text-sm text-slate-500">
                {isRTL
                  ? 'اجمع عدة خدمات من هذا الخبير في مشروع واحد، ولكل خدمة نطاقاتها ومخرجاتها.'
                  : 'Bundle several of this insighter’s services in one project, each with its own scopes and deliverables.'}
              </span>
            </span>
          </button>
      </div>
    )
  }

  return (
    <section className="border-t border-slate-200 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {isRTL ? 'خدمات إضافية' : 'Additional services'}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {isRTL
              ? 'أضف خدمات أخرى يقدمها هذا الخبير إلى المشروع نفسه.'
              : 'Add other services this insighter offers to the same project.'}
          </p>
        </div>
        <button
          type="button"
          onClick={addAnotherService}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconPlus size={16} />
          {isRTL ? 'إضافة خدمة' : 'Add service'}
        </button>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-500">{isRTL ? 'جارٍ التحميل…' : 'Loading…'}</p>
      ) : null}

      {!loading && additional.length > 0 ? serviceList : null}

    </section>
  )
}
