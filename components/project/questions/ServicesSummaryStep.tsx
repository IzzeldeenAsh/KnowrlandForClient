'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
  IconStack2,
  IconTrash,
} from '@tabler/icons-react'
import {
  beginProjectService,
  forgetProjectService,
  readProjectServices,
  selectProjectService,
  type WizardService,
} from '../projectServicesState'
import {
  definitionRequest,
  projectDefinitionIds,
} from '../projectDefinitionApi'
import {
  readStoredSpecifiedInsighterUuid,
  isSpecifiedInsighterProject,
} from '../specifiedInsighterProject'
import { projectWizardStorage } from '../wizardStorage'
import { readProjectComponents } from '../serviceComponentsPayload'
import { getNextProjectWizardStepId } from '../projectWizardFlow'
import { serviceMetaForSlug } from '../serviceMeta'
import type { Deliverable } from '../deliverables'
import SpecifiedInsighterBadge from '../SpecifiedInsighterBadge'
import WizardStepFrame from './WizardStepFrame'

type ServiceDetails = {
  scopes: number
  subscopes: number
  deliverables: number
  nextDue: string
  prompt: string
}

// Per-service answers live under the service's own storage prefix, not the active one.
function readServiceDetails(locale: string, uuid: string): ServiceDetails {
  const read = <T,>(name: string, fallback: T): T => {
    try {
      const raw = sessionStorage.getItem(`project:wizard:${locale}:services:${uuid}:${name}`)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  }
  const scopes = read<Array<{ subscopes?: string[] }>>('projectScopeSnapshot', [])
  const payload = read<{ components?: Record<string, unknown> }>('serviceComponentsPayload', {})
  const stage = payload.components?.['deliverable-stage'] as { deliverables?: Deliverable[] } | undefined
  const deliverables = stage?.deliverables || []
  const dates = deliverables.map((d) => d.date).filter(Boolean).sort()
  let prompt = ''
  try {
    prompt = sessionStorage.getItem(`project:wizard:${locale}:services:${uuid}:servicePrompt`) || ''
  } catch {}
  return {
    scopes: scopes.length,
    subscopes: scopes.reduce((sum, s) => sum + (s.subscopes?.length || 0), 0),
    deliverables: deliverables.length,
    nextDue: dates[0] || '',
    prompt,
  }
}

export default function ServicesSummaryStep({ locale }: { locale: string }) {
  const ar = locale === 'ar'
  const router = useRouter()
  const [services, setServices] = useState<WizardService[]>([])
  const [details, setDetails] = useState<Record<string, ServiceDetails>>({})
  const [canAdd, setCanAdd] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function refresh() {
    const list = readProjectServices(locale)
    setServices(list)
    setDetails(Object.fromEntries(list.map((s) => [s.uuid, readServiceDetails(locale, s.uuid)])))
  }
  useEffect(() => {
    refresh()
    setCanAdd(isSpecifiedInsighterProject(locale))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  async function remove(uuid: string) {
    setBusy(true)
    setError('')
    try {
      await definitionRequest(
        locale,
        `service/${projectDefinitionIds(locale)}/${uuid}`,
        'DELETE',
      )
      forgetProjectService(locale, uuid)
      refresh()
      const components = await definitionRequest<{
        data: Array<{ slug: string }>
      }>(locale, `component/${projectDefinitionIds(locale)}`)
      const slugs = components.data.map((c) => c.slug)
      sessionStorage.setItem(
        projectWizardStorage.projectComponentSlugsKey(locale),
        JSON.stringify(slugs),
      )
      sessionStorage.setItem(
        projectWizardStorage.projectComponentsKey(locale),
        JSON.stringify(
          Object.fromEntries(
            Object.entries(readProjectComponents(locale)).filter(([slug]) =>
              slugs.includes(slug),
            ),
          ),
        ),
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to remove service')
    } finally {
      setBusy(false)
    }
  }

  function edit(service: WizardService) {
    selectProjectService(locale, service.uuid)
    router.push(
      `/${locale}/project/wizard/${service.isOther ? 'service-intake' : 'project-scope'}`,
    )
  }

  const pendingCount = services.filter((s) => !s.complete).length
  const allComplete = services.length > 0 && pendingCount === 0
  const formatDate = (value: string) =>
    new Date(`${value}T00:00:00`).toLocaleDateString(
      ar ? 'ar-u-nu-latn' : 'en-GB',
      { day: 'numeric', month: 'short' },
    )

  return (
    <WizardStepFrame
      locale={locale}
      title={ar ? 'خدمات المشروع' : 'Your project services'}
      subtitle={
        canAdd
          ? ar
            ? 'كل خدمة لها نطاقاتها ومخرجاتها الخاصة. أضف خدمة أخرى أو تابع.'
            : 'Each service keeps its own scopes and deliverables. Add another service or continue.'
          : ar
            ? 'راجع تفاصيل الخدمة قبل المتابعة.'
            : 'Review your service before continuing.'
      }
      busy={busy}
      error={error}
      disabled={!allComplete}
      onContinue={() => {
        const next = getNextProjectWizardStepId(locale, 'services-summary')
        if (next) router.push(`/${locale}/project/wizard/${next}`)
      }}
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <IconStack2 size={14} stroke={2} />
          {ar
            ? `${services.length} ${services.length === 1 ? 'خدمة' : 'خدمات'}`
            : `${services.length} ${services.length === 1 ? 'service' : 'services'}`}
        </span>
        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <IconAlertTriangleFilled size={14} />
            {ar ? `${pendingCount} تحتاج إلى إكمال` : `${pendingCount} to finish`}
          </span>
        )}
        <SpecifiedInsighterBadge locale={locale} className="ms-auto" />
      </div>

      <ol className="space-y-4">
        {services.map((service) => {
          const meta = serviceMetaForSlug(service.isOther ? 'other' : service.slug)
          const Icon = meta.Icon
          const info = details[service.uuid]
          const description =
            service.isOther && info?.prompt
              ? info.prompt
              : ar
                ? meta.description.ar
                : meta.description.en
          const stats = info
            ? [
                info.scopes > 0 && {
                  icon: IconListTree,
                  text: ar ? `${info.scopes} نطاقات` : `${info.scopes} ${info.scopes === 1 ? 'scope' : 'scopes'}`,
                },
                info.subscopes > 0 && {
                  icon: IconLayersSubtract,
                  text: ar ? `${info.subscopes} نطاقات فرعية` : `${info.subscopes} sub-scopes`,
                },
                info.deliverables > 0 && {
                  icon: IconPackage,
                  text: ar
                    ? `${info.deliverables} مخرجات`
                    : `${info.deliverables} ${info.deliverables === 1 ? 'deliverable' : 'deliverables'}`,
                },
                info.nextDue && {
                  icon: IconCalendarEvent,
                  text: ar ? `أول تسليم ${formatDate(info.nextDue)}` : `First due ${formatDate(info.nextDue)}`,
                },
              ].filter((s): s is { icon: typeof IconPackage; text: string } => Boolean(s))
            : []

          return (
            <li
              key={service.uuid}
              className={`group relative overflow-hidden rounded-2xl border bg-white/90 p-5 sm:p-6 ${
                service.complete ? 'border-slate-200' : 'border-amber-200'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 start-0 w-1.5 ${service.complete ? 'bg-emerald-400' : 'bg-amber-400'}`}
              />
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${meta.iconClass}`}
                >
                  <Icon size={24} stroke={1.6} />
                </span>

                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1">
                  <h2 className="text-lg font-semibold text-slate-900">{service.label}</h2>
                  {service.complete ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      <IconCircleCheckFilled size={12} />
                      {ar ? 'مكتملة' : 'Complete'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      <IconAlertTriangleFilled size={12} />
                      {ar ? 'تحتاج إلى إكمال' : 'Needs completion'}
                    </span>
                  )}
                  {service.isOther && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
                      <IconSparkles size={12} stroke={2} />
                      {ar ? 'مخصصة بالذكاء الاصطناعي' : 'AI-defined'}
                    </span>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => edit(service)}
                    title={ar ? 'تعديل' : 'Edit'}
                    aria-label={ar ? `تعديل ${service.label}` : `Edit ${service.label}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 disabled:opacity-50"
                  >
                    <IconPencil size={16} stroke={1.8} />
                  </button>
                  {canAdd && services.length > 1 && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => remove(service.uuid)}
                      title={ar ? 'حذف' : 'Remove'}
                      aria-label={ar ? `حذف ${service.label}` : `Remove ${service.label}`}
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

                {stats.length > 0 && (
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
                )}

                {!service.complete && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => edit(service)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-amber-600 disabled:opacity-50"
                  >
                    {ar ? 'إكمال الخدمة' : 'Finish this service'}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {canAdd && (
        <button
          type="button"
          disabled={busy || !allComplete}
          onClick={() => {
            beginProjectService(locale)
            router.push(`/${locale}/project/wizard/service`)
          }}
          className="group mt-4 flex w-full items-center gap-4 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50/40 p-5 text-start transition hover:border-sky-500 hover:bg-sky-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-white/50 sm:p-6"
        >
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white transition group-hover:scale-105 group-disabled:bg-slate-300 group-disabled:group-hover:scale-100">
            <IconPlus size={24} stroke={2} />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-semibold text-sky-800 group-disabled:text-slate-500">
              {ar ? 'إضافة خدمة أخرى' : 'Add another service'}
            </span>
            <span className="mt-0.5 block text-sm text-slate-500">
              {allComplete
                ? ar
                  ? 'اجمع عدة خدمات في مشروع واحد، ولكل خدمة نطاقاتها ومخرجاتها.'
                  : 'Bundle several services in one project, each with its own scopes and deliverables.'
                : ar
                  ? 'أكمل الخدمة الحالية أولاً لإضافة خدمة أخرى.'
                  : 'Finish the current service first to add another one.'}
            </span>
          </span>
        </button>
      )}

      {pendingCount > 0 && (
        <p className="mt-5 text-sm text-slate-500">
          {ar ? 'يمكنك إكمال الخدمة أو ' : 'You can finish this service or '}
          <Link
            className="text-sky-700 underline"
            href={`/${locale}/project/wizard/project-type?fresh=1${canAdd ? `&specified_insighter=${encodeURIComponent(readStoredSpecifiedInsighterUuid(locale))}` : ''}`}
          >
            {ar ? 'بدء طلب جديد' : 'start a new request'}
          </Link>
          .
        </p>
      )}
    </WizardStepFrame>
  )
}
