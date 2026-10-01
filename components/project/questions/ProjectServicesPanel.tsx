'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { dayLabel } from '@/components/project/projectDeliverables'
import {
  forgetServiceSession,
  readPrimaryProjectServiceUuid,
  startServiceFlow,
} from '@/components/project/projectServiceSessions'
import { projectWizardStepIds } from '@/components/project/projectWizardFlow'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import { projectWizardStorage, type WizardLocale } from '@/components/project/wizardStorage'

type ServiceOption = { id: number; name: string; slug: string }

type ProjectServiceRow = {
  uuid: string
  position: number
  name: string
  serviceId: number | null
  isOther: boolean
  scopeNames: string[]
  deliverables: Array<{ title: string; period_days: number }>
}

function headers(locale: WizardLocale, token: string, json = false): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    ...(json ? { 'Content-Type': 'application/json' } : {}),
    'Accept-Language': locale === 'ar' ? 'ar' : 'en',
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

function toRows(projectServices: unknown): ProjectServiceRow[] {
  if (!Array.isArray(projectServices)) return []

  return projectServices
    .map((item: any) => {
      const service = item?.service ?? {}
      const deliverables = (Array.isArray(item?.components) ? item.components : [])
        .flatMap((block: any) => block?.['deliverable-stage']?.deliverables ?? [])
        .map((d: any) => ({ title: String(d?.title || ''), period_days: Number(d?.period_days) || 0 }))

      return {
        uuid: String(item?.uuid || ''),
        position: Number(item?.position) || 0,
        name: String(item?.title || service?.name || ''),
        serviceId: Number.isFinite(Number(service?.id)) ? Number(service.id) : null,
        isOther: String(service?.slug || '') === 'other',
        scopeNames: (Array.isArray(item?.scopes) ? item.scopes : [])
          .map((scope: any) => String(scope?.scope || ''))
          .filter(Boolean),
        deliverables,
      }
    })
    .filter((row) => row.uuid)
    .sort((a, b) => a.position - b.position)
}

/**
 * Specific-insighter projects can include more than one service from the
 * insighter's catalogue. Lists the additional services and lets the client add,
 * edit (scopes and deliverables) or remove them before submitting.
 */
export default function ProjectServicesPanel({
  locale,
  projectUuid,
  insighterUuid,
}: {
  locale: WizardLocale
  projectUuid: string
  insighterUuid: string
}) {
  const router = useRouter()
  const isRTL = locale === 'ar'

  const [rows, setRows] = useState<ProjectServiceRow[]>([])
  const [options, setOptions] = useState<ServiceOption[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [prompt, setPrompt] = useState('')
  const [busyUuid, setBusyUuid] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  const load = useCallback(async () => {
    const token = getAuthToken()
    if (!token || !projectUuid) return

    setLoading(true)
    try {
      const [projectRes, servicesRes] = await Promise.all([
        fetch(getApiUrl(`/api/account/project/show/${projectUuid}`), {
          headers: headers(locale, token),
          cache: 'no-store',
        }),
        fetch(getApiUrl(`/api/common/setting/service/insighter/${encodeURIComponent(insighterUuid)}`), {
          headers: headers(locale, token),
          cache: 'no-store',
        }),
      ])
      await assertProjectApiResponse(projectRes, 'Failed to load the project.')
      await assertProjectApiResponse(servicesRes, 'Failed to load services.')

      const projectJson = (await projectRes.json()) as any
      const servicesJson = (await servicesRes.json()) as any
      setRows(toRows(projectJson?.data?.project_services))
      setOptions(
        (Array.isArray(servicesJson?.data) ? servicesJson.data : [])
          .map((s: any) => ({ id: Number(s?.id), name: String(s?.name || ''), slug: String(s?.slug || '') }))
          .filter((s: ServiceOption) => Number.isFinite(s.id) && s.name)
      )
    } catch (err) {
      setError(getProjectApiErrorMessage(err, isRTL ? 'تعذر تحميل الخدمات.' : 'Failed to load services.'))
    } finally {
      setLoading(false)
    }
  }, [insighterUuid, isRTL, locale, projectUuid])

  useEffect(() => {
    void load()
  }, [load])

  const primaryUuid = readPrimaryProjectServiceUuid(locale)
  const additional = useMemo(
    () => rows.filter((row, index) => (primaryUuid ? row.uuid !== primaryUuid : index > 0)),
    [primaryUuid, rows]
  )
  const selectedOption = options.find((option) => option.id === selectedServiceId) ?? null
  const needsPrompt = selectedOption?.slug === 'other'

  const seedFor = (row: { serviceId: number | null; name: string; isOther: boolean }, servicePrompt = '') => ({
    [projectWizardStorage.serviceIdsKey(locale)]: JSON.stringify(row.serviceId),
    [projectWizardStorage.serviceIsOtherKey(locale)]: row.isOther ? '1' : '0',
    ...(row.isOther ? {} : { [projectWizardStorage.serviceLabelKey(locale)]: row.name }),
    ...(servicePrompt ? { [projectWizardStorage.servicePromptKey(locale)]: servicePrompt } : {}),
  })

  const goToScopes = () => router.push(`/${locale}/project/wizard/${projectWizardStepIds.projectScope}`)

  const addService = async () => {
    if (!selectedOption || submitting) return
    if (needsPrompt && !prompt.trim()) {
      setError(isRTL ? 'صف الخدمة التي تحتاجها.' : 'Describe the service you need.')
      return
    }

    const token = getAuthToken()
    if (!token) return

    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(getApiUrl(`/api/account/project/definition/service/${projectUuid}`), {
        method: 'POST',
        headers: headers(locale, token, true),
        body: JSON.stringify({
          service_id: selectedOption.id,
          ...(needsPrompt ? { prompt_ai: prompt.trim() } : {}),
        }),
      })
      await assertProjectApiResponse(res, 'Failed to add the service.')
      const json = (await res.json()) as any
      const uuid = String(json?.data?.uuid || '')
      if (!uuid) throw new Error('add_service_bad_response')

      startServiceFlow(
        locale,
        { mode: 'add', projectServiceUuid: uuid },
        seedFor({ serviceId: selectedOption.id, name: selectedOption.name, isOther: needsPrompt }, prompt.trim())
      )
      goToScopes()
    } catch (err) {
      setError(getProjectApiErrorMessage(err, isRTL ? 'تعذر إضافة الخدمة.' : 'Failed to add the service.'))
    } finally {
      setSubmitting(false)
    }
  }

  const editService = (row: ProjectServiceRow) => {
    startServiceFlow(locale, { mode: 'edit', projectServiceUuid: row.uuid }, seedFor(row))
    goToScopes()
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
        {!adding ? (
          <button
            type="button"
            onClick={() => setAdding(true)}
            disabled={loading || options.length === 0}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconPlus size={16} />
            {isRTL ? 'إضافة خدمة' : 'Add service'}
          </button>
        ) : null}
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-500">{isRTL ? 'جارٍ التحميل…' : 'Loading…'}</p>
      ) : null}

      {!loading && additional.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {additional.map((row) => (
            <li key={row.uuid} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{row.name}</p>
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
                    onClick={() => editService(row)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <IconPencil size={15} />
                    {isRTL ? 'تعديل' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void removeService(row)}
                    disabled={busyUuid === row.uuid}
                    aria-label={isRTL ? `حذف ${row.name}` : `Remove ${row.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {adding ? (
        <div className="mt-4 rounded-2xl border border-slate-200 p-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              {isRTL ? 'الخدمة' : 'Service'}
            </span>
            <select
              value={selectedServiceId ?? ''}
              onChange={(event) => setSelectedServiceId(event.target.value ? Number(event.target.value) : null)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">{isRTL ? 'اختر خدمة' : 'Choose a service'}</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>

          {needsPrompt ? (
            <label className="mt-3 block">
              <span className="text-sm font-semibold text-slate-700">
                {isRTL ? 'صف الخدمة' : 'Describe the service'}
              </span>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
          ) : null}

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setAdding(false)
                setSelectedServiceId(null)
                setPrompt('')
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {isRTL ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={() => void addService()}
              disabled={!selectedOption || submitting}
              className="rounded-full bg-[#1C7CBB] px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              {submitting
                ? isRTL
                  ? 'جارٍ الإضافة…'
                  : 'Adding…'
                : isRTL
                  ? 'متابعة إلى النطاقات'
                  : 'Continue to scopes'}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
