'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { dashboardUrl } from '@/app/config'
import { SectionBlock, type ReviewRow } from '../questions/ProjectReviewStep'
import { getProjectApiErrorMessage } from '../projectApiError'
import { projectTypeLabel } from '../projectLabels'
import { durationLabel, type ProjectDeliverable } from '../projectDeliverables'
import { addDaysToIsoDate, formatIsoDate } from '../projectSchedule'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import type { WizardLocale } from '../wizardStorage'
import {
  agreementLocked,
  agreementMatches,
  buildEditContext,
  buildEditState,
  buildPatch,
  changedKeys,
  clearDraft,
  defaultMatchUuid,
  editStepHref,
  fetchClientProject,
  hasEditableContent,
  projectFingerprint,
  readDraft,
  saveClientAgreement,
  writeDraft,
  type AgreementMatch,
  type EditComponent,
  type EditDraft,
} from './agreementEdit'

const DATA_SOURCE_LABELS: Record<string, [string, string]> = {
  primary_data: ['Primary data', 'بيانات أولية'],
  secondary_data: ['Secondary data', 'بيانات ثانوية'],
  both: ['Both', 'كلاهما'],
  does_not_matter: ["Doesn't matter", 'لا يهم'],
}

export function projectDashboardHref(projectUuid: string) {
  return `${dashboardUrl}/app/insighter-dashboard/projects-created/${projectUuid}`
}

export default function ProjectEditReview({ locale, projectUuid }: { locale: WizardLocale; projectUuid: string }) {
  const isRTL = locale === 'ar'
  const t = (en: string, ar: string) => (isRTL ? ar : en)
  const searchParams = useSearchParams()
  const requestedMatch = searchParams?.get('match') || ''

  const [draft, setDraft] = useState<EditDraft | null>(null)
  const [matches, setMatches] = useState<AgreementMatch[]>([])
  const [locked, setLocked] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [stale, setStale] = useState(false)

  useProjectStepErrorToast(error, locale)

  const load = useCallback(async (reset = false) => {
    setLoadError(null)
    setDraft(null)
    try {
      const project = await fetchClientProject(locale, projectUuid)
      const list = agreementMatches(project)
      const fingerprint = projectFingerprint(project)
      const existing = reset ? null : readDraft(projectUuid)
      const known = (uuid?: string) => !!uuid && list.some(match => match.uuid === uuid)
      const matchUuid = known(requestedMatch) ? requestedMatch : known(existing?.matchUuid) ? existing!.matchUuid : defaultMatchUuid(project, list)
      let next: EditDraft
      if (existing && existing.fingerprint === fingerprint) {
        next = { ...existing, matchUuid }
      } else {
        if (existing && changedKeys(existing).size > 0)
          setNotice(t('The agreement changed since you started editing, so your unsaved changes were cleared.', 'تغيّر الاتفاق منذ بدأت التعديل، لذلك أُزيلت تغييراتك غير المحفوظة.'))
        const state = buildEditState(project)
        next = {
          projectUuid, matchUuid, fingerprint, note: '',
          context: buildEditContext(project),
          original: state,
          current: JSON.parse(JSON.stringify(state)),
        }
      }
      writeDraft(next)
      setMatches(list)
      setLocked(agreementLocked(project))
      setStale(false)
      setDraft(next)
    } catch (err) {
      setLoadError(getProjectApiErrorMessage(err, t('Could not load the project.', 'تعذر تحميل المشروع.')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, projectUuid, requestedMatch])

  useEffect(() => {
    void load()
  }, [load])

  const changed = useMemo(() => (draft ? changedKeys(draft) : new Set<string>()), [draft])
  const editedBadge = t('Edited', 'معدّل')

  const setDraftAndStore = (next: EditDraft) => {
    writeDraft(next)
    setDraft(next)
  }

  const componentRow = (component: EditComponent): ReviewRow => {
    const isMarket = component.slug === 'target-market'
    const value = isMarket
      ? component.labels?.length ? component.labels : []
      : DATA_SOURCE_LABELS[String(component.value)] ? [t(...DATA_SOURCE_LABELS[String(component.value)])] : []
    return {
      label: isMarket ? t('Target market', 'السوق المستهدف') : t('Expected data sources', 'مصادر البيانات المتوقعة'),
      value,
      variant: isMarket ? 'chips' : 'default',
      editStepId: editStepHref(locale, projectUuid, isMarket ? 'target-market' : 'data-sources', { component: component.id }),
      badge: changed.has(`component:${component.id}`) ? editedBadge : undefined,
    }
  }

  const sections = useMemo(() => {
    if (!draft) return []
    const { components, services, schedule, deadlineOffer } = draft.current
    const result: Array<{ key: string; title: string; rows: ReviewRow[] }> = []
    const timelineRows: ReviewRow[] = []
    if (schedule) {
      const scheduleHref = editStepHref(locale, projectUuid, 'schedule', {})
      const scheduleBadge = changed.has('schedule') ? editedBadge : undefined
      timelineRows.push({
        label: t('Planned start', 'البدء المخطط'),
        value: [formatIsoDate(schedule.plannedStartDate, locale)],
        editStepId: scheduleHref,
        badge: scheduleBadge,
      }, {
        label: t('Duration', 'المدة'),
        value: [
          durationLabel(locale, schedule.durationDays),
          `${t('Planned close', 'الإغلاق المخطط')}: ${formatIsoDate(addDaysToIsoDate(schedule.plannedStartDate, schedule.durationDays), locale)}`,
        ],
        editStepId: scheduleHref,
        badge: scheduleBadge,
      })
    }
    if (deadlineOffer) timelineRows.push({
      label: t('Offer deadline', 'موعد انتهاء العرض'),
      value: [formatIsoDate(deadlineOffer, locale)],
      editStepId: editStepHref(locale, projectUuid, 'offer-deadline', {}),
      badge: changed.has('deadline') ? editedBadge : undefined,
    })
    if (timelineRows.length) result.push({ key: 'timeline', title: t('Project timeline', 'الجدول الزمني للمشروع'), rows: timelineRows })
    const projectRows = components.filter(c => c.level === 'project').map(componentRow)
    if (projectRows.length) result.push({ key: 'project', title: t('Project requirements', 'متطلبات المشروع'), rows: projectRows })
    services.forEach((service, index) => {
      const rows: ReviewRow[] = []
      if (service.editScopes) rows.push({
        label: t('Scopes and sub-scopes', 'النطاقات والنطاقات الفرعية'),
        value: service.scopes.map(scope => scope.scope),
        variant: 'scope-table',
        scopeGroups: service.scopes.map(scope => ({ name: scope.scope, subscopes: scope.subscopes.map(child => child.scope) })),
        full: true,
        editStepId: editStepHref(locale, projectUuid, 'scopes', { service: service.id }),
        badge: changed.has(`scopes:${service.id}`) ? editedBadge : undefined,
      })
      if (service.editDeliverables) rows.push({
        label: t('Deliverables', 'المخرجات'),
        value: service.deliverables.map(item => item.title),
        variant: 'deliverables-table',
        deliverables: service.deliverables as ProjectDeliverable[],
        full: true,
        editStepId: editStepHref(locale, projectUuid, 'deliverables', { service: service.id }),
        badge: changed.has(`deliverables:${service.id}`) ? editedBadge : undefined,
      })
      rows.push(...components.filter(c => c.level === 'service' && c.projectServiceId === service.id).map(componentRow))
      if (rows.length) result.push({ key: `service-${service.id}`, title: `${t('Service', 'الخدمة')} ${index + 1}: ${service.title}`, rows })
    })
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, changed, isRTL])

  const dirty = changed.size > 0
  const backToProject = projectDashboardHref(projectUuid)

  const discard = () => {
    if (dirty && !window.confirm(t('Discard your unsaved changes?', 'تجاهل التغييرات غير المحفوظة؟'))) return
    clearDraft(projectUuid)
    window.location.assign(backToProject)
  }

  const save = async () => {
    if (!draft || saving || !dirty || !draft.matchUuid) return
    setSaving(true)
    setError(null)
    try {
      const latest = await fetchClientProject(locale, projectUuid)
      if (projectFingerprint(latest) !== draft.fingerprint || agreementLocked(latest)) {
        setStale(true)
        setError(t('The agreement changed while you were editing. Reload it to see the latest details.', 'تغيّر الاتفاق أثناء التعديل. أعد تحميله لعرض أحدث التفاصيل.'))
        return
      }
      const note = draft.note.trim()
      await saveClientAgreement(locale, draft.matchUuid, { ...buildPatch(draft), ...(note ? { user_note: note } : {}) })
      clearDraft(projectUuid)
      window.location.assign(`${backToProject}?tab=revisions`)
    } catch (err) {
      setError(getProjectApiErrorMessage(err, t('Could not save your changes.', 'تعذر حفظ التعديلات.')))
    } finally {
      setSaving(false)
    }
  }

  const shell = (content: React.ReactNode) => (
    <div className="w-full max-w-6xl mx-auto min-h-full flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex-1 overflow-auto rounded-md px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-[980px] rounded-[32px] border border-slate-200 bg-white px-8 py-16 text-center">{content}</div>
      </div>
    </div>
  )

  if (loadError) return shell(
    <>
      <p className="text-base text-slate-700">{loadError}</p>
      <button type="button" onClick={() => void load()} className="btn-sm mt-4 rounded-full bg-[#1C7CBB] px-6 py-2 text-white">{t('Retry', 'إعادة المحاولة')}</button>
    </>
  )
  if (!draft) return shell(<p className="text-base text-slate-600">{t('Preparing project summary...', 'جاري إعداد ملخص المشروع...')}</p>)
  if (locked || !hasEditableContent(draft.original)) return shell(
    <>
      <p className="text-base font-semibold text-slate-800">
        {locked ? t('This agreement is locked after the first signature.', 'هذا الاتفاق مقفل بعد أول توقيع.') : t('There is nothing you can edit in this project.', 'لا توجد عناصر يمكنك تعديلها في هذا المشروع.')}
      </p>
      <a href={backToProject} className="btn-sm mt-4 inline-flex rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50">{t('Back to project', 'العودة إلى المشروع')}</a>
    </>
  )

  const typeLabel = projectTypeLabel(locale, draft.context.type)

  return (
    <div className="w-full max-w-6xl mx-auto min-h-full flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex-1 overflow-auto rounded-md px-4 pb-32 pt-8 sm:px-6 sm:pb-8">
        <div className="mx-auto max-w-[980px] overflow-hidden rounded-[36px] border border-slate-200 bg-white">
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[20px]">
                    <Image src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1777619443/smallLogo_3_wnmkra.png" alt="Foresighta" width={34} height={34} className="h-auto w-auto" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">{draft.context.title || t('Project Summary', 'ملخص المشروع')}</h1>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {typeLabel ? <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">{typeLabel}</span> : null}
                  <span className="inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">{t('Editing agreement', 'تعديل الاتفاق')}</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  {t('Only the details you can change are shown. Save to send all changes as one revision; the Insighter will be notified.', 'تظهر هنا التفاصيل التي يمكنك تعديلها فقط. احفظ لإرسال كل التغييرات كمراجعة واحدة، وسيتم إشعار الخبير.')}
                </p>
              </div>
            </div>

            {notice ? <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{notice}</div> : null}
            {stale ? (
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                {t('The agreement changed while you were editing.', 'تغيّر الاتفاق أثناء التعديل.')}{' '}
                <button type="button" className="font-semibold underline" onClick={() => void load(true)}>{t('Reload the latest details', 'إعادة تحميل أحدث التفاصيل')}</button>
              </div>
            ) : null}

            {matches.length > 1 ? (
              <label className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700">
                {t('Agreement with', 'الاتفاق مع')}
                <select
                  value={draft.matchUuid}
                  onChange={e => setDraftAndStore({ ...draft, matchUuid: e.target.value })}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">{t('Choose an Insighter', 'اختر الخبير')}</option>
                  {matches.map(match => <option key={match.uuid} value={match.uuid}>{match.name || t('Insighter', 'الخبير')}</option>)}
                </select>
              </label>
            ) : null}

            <div className="mt-8 space-y-6">
              {sections.map((section, index) => (
                <SectionBlock
                  key={section.key}
                  locale={locale}
                  plannedStartDate={draft.current.schedule?.plannedStartDate || draft.context.plannedStartDate || undefined}
                  title={section.title}
                  rows={section.rows}
                  emptyText={t('Not specified', 'غير محدد')}
                  toneIndex={index}
                  isRTL={isRTL}
                  editLabel={t('Edit', 'تعديل')}
                  editHrefFor={href => href}
                />
              ))}

              <section className="border-t border-slate-200 pt-6">
                <label htmlFor="agreement-edit-note" className="text-xs font-semibold text-slate-500">
                  {t('Note for the Insighter (optional)', 'ملاحظة للخبير (اختياري)')}
                </label>
                <textarea
                  id="agreement-edit-note"
                  value={draft.note}
                  maxLength={1000}
                  rows={3}
                  onChange={e => setDraftAndStore({ ...draft, note: e.target.value })}
                  placeholder={t('Explain why these changes help the project…', 'وضّح سبب هذه التغييرات…')}
                  className="mt-2 w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <div className="mt-1 text-end text-xs text-slate-400">{draft.note.length} / 1000</div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={discard} disabled={saving} className="btn-sm rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50">
              {dirty ? t('Discard changes', 'تجاهل التغييرات') : t('Back to project', 'العودة إلى المشروع')}
            </button>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-500 sm:inline">
                {!draft.matchUuid ? t('Choose an Insighter first', 'اختر الخبير أولاً') : dirty ? t('Unsaved changes', 'تغييرات غير محفوظة') : t('No changes yet', 'لا توجد تغييرات بعد')}
              </span>
              <button
                type="button"
                onClick={() => void save()}
                disabled={saving || !dirty || !draft.matchUuid || stale}
                className={`btn-sm rounded-full px-6 py-2 ${saving || !dirty || !draft.matchUuid || stale ? 'cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'}`}
              >
                {saving ? t('Saving...', 'جاري الحفظ...') : t('Save changes', 'حفظ التعديلات')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
