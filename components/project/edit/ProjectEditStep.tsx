'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DeliverablesPlanQuestion from '../questions/service-components/DeliverablesPlanQuestion'
import DataSourcesExpectedQuestion from '../questions/service-components/DataSourcesExpectedQuestion'
import TargetMarketQuestion from '../questions/TargetMarketQuestion'
import ProjectScheduleQuestion from '../questions/ProjectScheduleQuestion'
import DeadlineOfferQuestion from '../questions/DeadlineOfferQuestion'
import { addDaysToIsoDate } from '../projectSchedule'
import type { WizardLocale } from '../wizardStorage'
import { EditScopesStep, EditSubscopesStep } from './EditScopeSteps'
import {
  editReviewHref,
  editStepHref,
  latestEditDeliverableDay,
  minEditDeadline,
  minEditStartDate,
  orderDeliverables,
  readDraft,
  updateDraft,
  type EditDraft,
  type EditState,
  type TargetMarketValue,
} from './agreementEdit'

// One agreement-edit section, rendered with the same wizard step the client used to
// define it. Changes go back into the edit draft; nothing is saved until the summary.
export default function ProjectEditStep({ locale, projectUuid, step }: { locale: WizardLocale; projectUuid: string; step: string }) {
  const isRTL = locale === 'ar'
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceId = Number(searchParams?.get('service')) || 0
  const componentId = Number(searchParams?.get('component')) || 0
  const reviewHref = editReviewHref(locale, projectUuid)
  const [draft, setDraft] = useState<EditDraft | null>(null)

  const service = draft?.current.services.find(s => s.id === serviceId)
  const component = draft?.current.components.find(c => c.id === componentId)
  const allowed =
    (step === 'schedule' && !!draft?.original.schedule) ||
    (step === 'offer-deadline' && !!draft?.original.deadlineOffer) ||
    ((step === 'scopes' || step === 'subscopes') && !!service?.editScopes) ||
    (step === 'deliverables' && !!service?.editDeliverables) ||
    (step === 'target-market' && component?.slug === 'target-market') ||
    (step === 'data-sources' && component?.slug === 'data-sources-expected')

  useEffect(() => {
    const stored = readDraft(projectUuid)
    if (!stored) router.replace(reviewHref)
    else setDraft(stored)
  }, [projectUuid, reviewHref, router])

  useEffect(() => {
    if (draft && !allowed) router.replace(reviewHref)
  }, [allowed, draft, reviewHref, router])

  if (!draft || !allowed) return null

  const save = (change: (state: EditState) => EditState, next = reviewHref) => {
    updateDraft(projectUuid, change)
    router.push(next)
  }

  const base = {
    projectType: draft.context.type,
    serviceLabel: service?.title || null,
    backHref: reviewHref,
    continueLabel: isRTL ? 'العودة إلى الملخص' : 'Return to summary',
  }

  if (step === 'schedule' && draft.current.schedule && draft.original.schedule) {
    return (
      <ProjectScheduleQuestion
        locale={locale}
        edit={{
          ...base,
          serviceLabel: null,
          value: draft.current.schedule,
          original: draft.original.schedule,
          minStartDate: minEditStartDate(draft.original.schedule),
          latestDeliverableDay: latestEditDeliverableDay(draft.current),
          onSave: schedule => save(state => ({ ...state, schedule })),
        }}
      />
    )
  }

  if (step === 'offer-deadline' && draft.current.deadlineOffer && draft.original.deadlineOffer) {
    const schedule = draft.current.schedule
    return (
      <DeadlineOfferQuestion
        locale={locale}
        edit={{
          ...base,
          serviceLabel: null,
          value: draft.current.deadlineOffer,
          original: draft.original.deadlineOffer,
          minDate: minEditDeadline(draft.original.deadlineOffer),
          projectEnd: schedule ? addDaysToIsoDate(schedule.plannedStartDate, schedule.durationDays) : '',
          onSave: deadlineOffer => save(state => ({ ...state, deadlineOffer })),
        }}
      />
    )
  }

  if (step === 'scopes' && service) {
    return (
      <EditScopesStep
        {...base}
        continueLabel={isRTL ? 'متابعة' : 'Continue'}
        locale={locale}
        serviceId={service.serviceId}
        scopes={service.scopes}
        onSave={scopes => save(
          state => ({ ...state, services: state.services.map(s => (s.id === service.id ? { ...s, scopes } : s)) }),
          editStepHref(locale, projectUuid, 'subscopes', { service: service.id }),
        )}
      />
    )
  }

  if (step === 'subscopes' && service) {
    return (
      <EditSubscopesStep
        {...base}
        backHref={editStepHref(locale, projectUuid, 'scopes', { service: service.id })}
        locale={locale}
        serviceId={service.serviceId}
        scopes={service.scopes}
        onSave={scopes => save(state => ({ ...state, services: state.services.map(s => (s.id === service.id ? { ...s, scopes } : s)) }))}
      />
    )
  }

  if (step === 'deliverables' && service) {
    // The edited schedule bounds the deliverables, so an extended duration allows later days.
    const schedule = draft.current.schedule ?? (draft.context.plannedStartDate && draft.context.durationDays !== null
      ? { plannedStartDate: draft.context.plannedStartDate, durationDays: draft.context.durationDays }
      : null)
    return (
      <DeliverablesPlanQuestion
        locale={locale}
        edit={{
          ...base,
          deliverables: service.deliverables,
          schedule,
          lockedIds: draft.context.linkedDeliverableIds,
          onSave: items => save(state => ({
            ...state,
            services: state.services.map(s => (s.id === service.id ? { ...s, deliverables: orderDeliverables(items) } : s)),
          })),
        }}
      />
    )
  }

  if (step === 'target-market' && component) {
    return (
      <TargetMarketQuestion
        locale={locale}
        edit={{
          ...base,
          value: component.value as TargetMarketValue,
          onSave: (value, labels) => save(state => ({
            ...state,
            // Sorted ids so re-picking the same markets is not a change.
            components: state.components.map(c => (c.id === component.id ? { ...c, value: { ...value, ids: [...value.ids].sort((x, y) => x - y) }, labels } : c)),
          })),
        }}
      />
    )
  }

  if (step === 'data-sources' && component) {
    return (
      <DataSourcesExpectedQuestion
        locale={locale}
        edit={{
          ...base,
          value: String(component.value || ''),
          onSave: value => save(state => ({
            ...state,
            components: state.components.map(c => (c.id === component.id ? { ...c, value } : c)),
          })),
        }}
      />
    )
  }

  return null
}
