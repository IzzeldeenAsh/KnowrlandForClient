'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { IconCheck, IconPlus, IconPlusFilled, IconX, IconXboxXFilled } from '@tabler/icons-react'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { BACKEND_STRING_MAX } from '../backendLimits'
import { assertProjectApiResponse, getProjectApiErrorMessage } from '../projectApiError'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import type { WizardLocale } from '../wizardStorage'
import type { EditScope } from './agreementEdit'
import type { StepEditBase } from './stepEditAdapter'

// Agreement-edit versions of the wizard's project-scope and project-subscopes steps:
// same catalog (service scope settings), same cards and chips, but the selection is
// read from and returned to the edit draft instead of being synced to the project.

type CatalogScope = { name: string; children: string[] }

type ScopeStepProps = StepEditBase & {
  locale: WizardLocale
  serviceId: number | null
  scopes: EditScope[]
  onSave: (scopes: EditScope[]) => void
}

const key = (name: string) => name.trim().toLowerCase()

function useScopeCatalog(locale: WizardLocale, serviceId: number | null) {
  const [catalog, setCatalog] = useState<CatalogScope[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isRTL = locale === 'ar'

  useEffect(() => {
    let cancelled = false
    if (!serviceId) {
      setCatalog([])
      return
    }
    const load = async () => {
      try {
        const token = getAuthToken()
        const res = await fetch(getApiUrl(`/api/common/setting/service/scope/${serviceId}?definition_mode=advanced`), {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: 'application/json',
            'Accept-Language': isRTL ? 'ar' : 'en',
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          cache: 'no-store',
        })
        await assertProjectApiResponse(res, isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.')
        const json = await res.json()
        const list: CatalogScope[] = (Array.isArray(json?.data) ? json.data : [])
          .map((raw: any) => ({
            name: String(raw?.name ?? raw?.title ?? raw?.scope ?? '').trim(),
            children: (raw?.children ?? raw?.subscopes ?? raw?.sub_scopes ?? [])
              .map((c: any) => String(typeof c === 'string' ? c : c?.name ?? c?.title ?? c?.scope ?? '').trim())
              .filter(Boolean),
          }))
          .filter((item: CatalogScope) => item.name)
        if (!cancelled) setCatalog(list)
      } catch (err) {
        if (cancelled) return
        setError(getProjectApiErrorMessage(err, isRTL ? 'تعذر تحميل نطاقات الخدمة.' : 'Failed to load service scopes.'))
        setCatalog([])
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [isRTL, serviceId])

  return { catalog, error }
}

function useEntered() {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])
  return entered
}

function StepFooter({ isRTL, backHref, continueLabel, canContinue, onContinue }: {
  isRTL: boolean
  backHref: string
  continueLabel: string
  canContinue: boolean
  onContinue: () => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="flex items-center justify-between gap-3">
          <Link href={backHref} className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200">
            {isRTL ? 'رجوع' : 'Back'}
          </Link>
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className={`btn-sm px-6 py-2 rounded-full ${canContinue ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90' : 'text-slate-500 bg-slate-200 cursor-not-allowed'}`}
          >
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function StepTitle({ id, entered, isRTL, locale, title, subtitle, children }: {
  id: string
  entered: boolean
  isRTL: boolean
  locale: WizardLocale
  title: React.ReactNode
  subtitle: string
  children?: React.ReactNode
}) {
  return (
    <div className={`mt-2 text-start transition-all duration-700 ${entered ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'}`}>
      {locale === 'en' ? <style>{`#${id}, #${id} * { font-family: "IBM Plex Serif", serif !important; }`}</style> : null}
      <div className="flex flex-wrap items-center justify-start gap-3">
        <h2 id={id} className="text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        {children}
      </div>
      <p className="mt-1.5 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600">{subtitle}</p>
    </div>
  )
}

export function EditScopesStep({ locale, serviceId, scopes, onSave, projectType, serviceLabel, backHref, continueLabel }: ScopeStepProps) {
  const isRTL = locale === 'ar'
  const entered = useEntered()
  const { catalog, error } = useScopeCatalog(locale, serviceId)
  useProjectStepErrorToast(error, locale)

  // Names picked from the catalog, plus the client's own scopes (checked or not).
  const [selected, setSelected] = useState<Set<string>>(() => new Set(scopes.map(s => key(s.scope))))
  const [custom, setCustom] = useState<string[]>([])
  const [pending, setPending] = useState<string | null>(null)

  useEffect(() => {
    if (!catalog) return
    const known = new Set(catalog.map(item => key(item.name)))
    setCustom(scopes.map(s => s.scope).filter(name => !known.has(key(name))))
    // Seed once when the catalog arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog])

  const toggle = (name: string) => setSelected(prev => {
    const next = new Set(prev)
    if (next.has(key(name))) next.delete(key(name))
    else next.add(key(name))
    return next
  })

  const commitPending = () => {
    const name = (pending || '').trim()
    setPending(null)
    if (!name) return
    const exists = [...(catalog || []).map(item => item.name), ...custom].some(other => key(other) === key(name))
    if (!exists) setCustom(prev => [...prev, name])
    setSelected(prev => new Set(prev).add(key(name)))
  }

  const removeCustom = (name: string) => {
    setCustom(prev => prev.filter(other => other !== name))
    setSelected(prev => {
      const next = new Set(prev)
      next.delete(key(name))
      return next
    })
  }

  const catalogNames = (catalog || []).map(item => item.name)
  const allNames = [...catalogNames, ...custom]
  const selectable = catalogNames.length
  const allSelected = selectable > 0 && catalogNames.every(name => selected.has(key(name)))
  const canContinue = catalog !== null && allNames.some(name => selected.has(key(name)))

  const onContinue = () => {
    if (!canContinue) return
    // Keep saved scopes (with their ids, descriptions and subscopes) in place; append new picks.
    const kept = scopes.filter(s => selected.has(key(s.scope)))
    const keptKeys = new Set(kept.map(s => key(s.scope)))
    const added = allNames
      .filter(name => selected.has(key(name)) && !keptKeys.has(key(name)))
      .map<EditScope>(name => ({ scope: name, description: null, subscopes: [] }))
    onSave([...kept, ...added])
  }

  const cardClass = (checked: boolean) =>
    `flex min-h-[56px] cursor-pointer select-none items-center gap-3 rounded-xl border px-3.5 py-3 text-start shadow-sm backdrop-blur-md transition-all duration-500 [-webkit-tap-highlight-color:transparent] sm:px-4 ${
      checked ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/40 hover:bg-white/55 active:bg-white/60'
    } ${entered ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0'}`

  const gradient = 'bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent'
  const title = serviceLabel
    ? isRTL
      ? <>اختر نطاق <span className={gradient}>{serviceLabel}</span></>
      : <>Select <span className={gradient}>{serviceLabel}</span> scope</>
    : isRTL ? 'اختر نطاق المشروع' : 'Select project scope'

  return (
    <div className="mx-auto w-full max-w-5xl touch-manipulation" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader locale={locale} entered={entered} projectTypeId={projectType} serviceLabelOverride={serviceLabel} />
      <StepTitle id="edit-scope-title" entered={entered} isRTL={isRTL} locale={locale} title={title}
        subtitle={catalogNames.length ? (isRTL ? 'يمكنك اختيار أكثر من نطاق.' : 'You can select multiple scopes.') : (isRTL ? 'أضف نطاقات المشروع يدويًا (يمكنك إضافة أكثر من نطاق).' : 'Add your scopes manually (you can add multiple scopes).')} />

      <div className="mt-5 pb-[100px] sm:mt-7">
        {catalog === null ? (
          <div className="text-sm font-semibold text-slate-600">{isRTL ? 'جاري التحميل…' : 'Loading…'}</div>
        ) : (
          <>
            {selectable > 0 ? (
              <div className="mb-3 flex items-center justify-end">
                <button
                  type="button"
                  aria-pressed={allSelected}
                  onClick={() => setSelected(prev => {
                    const next = new Set(prev)
                    catalogNames.forEach(name => (allSelected ? next.delete(key(name)) : next.add(key(name))))
                    return next
                  })}
                  className={`inline-flex min-h-[36px] select-none items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    allSelected ? 'border-blue-300 bg-blue-50 text-[#1C7CBB]' : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                  }`}
                >
                  <span className={`inline-flex h-4 w-4 items-center justify-center rounded border ${allSelected ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white' : 'border-slate-300 bg-white'}`}>
                    {allSelected ? <IconCheck size={12} stroke={3} /> : null}
                  </span>
                  {allSelected ? (isRTL ? 'إلغاء تحديد الكل' : 'Deselect all') : (isRTL ? 'تحديد الكل' : 'Select all')}
                </button>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3" role="group">
              {catalogNames.map((name, index) => (
                <label key={name} className={cardClass(selected.has(key(name)))} style={{ transitionDelay: `${110 + index * 45}ms` }}>
                  <input
                    type="checkbox"
                    checked={selected.has(key(name))}
                    onChange={() => toggle(name)}
                    className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                  />
                  <span className="text-sm font-semibold leading-snug text-slate-900">{name}</span>
                </label>
              ))}

              {custom.map(name => {
                const checked = selected.has(key(name))
                return (
                  <div key={name} className={`flex min-h-[56px] items-stretch rounded-xl border shadow-sm backdrop-blur-md transition-colors duration-300 ${checked ? 'border-blue-300 bg-white/70' : 'border-white/30 bg-white/40 hover:bg-white/55'}`}>
                    <label className="flex min-w-0 flex-1 cursor-pointer select-none items-center gap-3 py-3 ps-3.5 text-start sm:ps-4">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(name)}
                        className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
                      />
                      <span className="min-w-0 flex-1 break-words text-sm font-semibold leading-snug text-slate-900">{name}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeCustom(name)}
                      aria-label={isRTL ? 'إزالة النطاق' : 'Remove scope'}
                      className="group inline-flex w-11 shrink-0 items-center justify-center sm:w-12"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 group-hover:bg-white group-hover:text-slate-700">
                        <IconXboxXFilled size={14} />
                      </span>
                    </button>
                  </div>
                )
              })}

              {pending !== null ? (
                <div className="flex min-h-[56px] items-center gap-3 rounded-xl border border-white/30 bg-white/55 px-3.5 py-3 shadow-sm backdrop-blur-md sm:px-4">
                  <span className="inline-flex h-5 w-5 shrink-0 rounded border border-slate-300 bg-white/80" aria-hidden="true" />
                  <input
                    value={pending}
                    maxLength={BACKEND_STRING_MAX}
                    onChange={e => setPending(e.target.value)}
                    onBlur={commitPending}
                    onKeyDown={e => {
                      if (e.key === 'Enter') commitPending()
                      if (e.key === 'Escape') setPending(null)
                    }}
                    placeholder={isRTL ? 'اسم النطاق…' : 'Scope name…'}
                    className="min-w-0 flex-1 border-0 bg-transparent p-0 text-start text-base font-semibold text-slate-900 shadow-none outline-none ring-0 placeholder:text-slate-400 focus:ring-0 sm:text-sm"
                    autoFocus
                  />
                  <button
                    type="button"
                    onMouseDown={e => e.preventDefault()}
                    onClick={commitPending}
                    aria-label={isRTL ? 'إضافة النطاق' : 'Add scope'}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 sm:h-6 sm:w-6"
                  >
                    <IconCheck size={13} stroke={2.5} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => setPending(null)}
                    aria-label={isRTL ? 'إلغاء' : 'Cancel'}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 sm:h-6 sm:w-6"
                  >
                    <IconXboxXFilled size={13} />
                  </button>
                </div>
              ) : null}

              <button
                type="button"
                onMouseDown={e => { if (pending !== null) e.preventDefault() }}
                onClick={() => setPending('')}
                className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-white/35 px-3.5 py-3 shadow-sm backdrop-blur-md hover:bg-blue-50/30 sm:px-4"
              >
                <IconPlusFilled size={15} className="shrink-0 text-blue-500" />
                <span className="text-sm font-semibold text-blue-500">{isRTL ? 'إضافة نطاق' : 'Add Scope'}</span>
              </button>
            </div>
          </>
        )}
      </div>

      <StepFooter isRTL={isRTL} backHref={backHref} continueLabel={continueLabel} canContinue={canContinue} onContinue={onContinue} />
    </div>
  )
}

export function EditSubscopesStep({ locale, serviceId, scopes, onSave, projectType, serviceLabel, backHref, continueLabel }: ScopeStepProps) {
  const isRTL = locale === 'ar'
  const entered = useEntered()
  const { catalog, error } = useScopeCatalog(locale, serviceId)
  useProjectStepErrorToast(error, locale)

  // Selected subscope names per scope (by scope key), and the client's own subscopes.
  const [selected, setSelected] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(scopes.map(s => [key(s.scope), s.subscopes.map(child => key(child.scope))])))
  const [custom, setCustom] = useState<Record<string, string[]>>({})
  const [adding, setAdding] = useState<string | null>(null)
  const [draftName, setDraftName] = useState('')

  const childrenOf = useMemo(() => {
    const map = new Map<string, string[]>()
    ;(catalog || []).forEach(item => map.set(key(item.name), item.children))
    return map
  }, [catalog])

  useEffect(() => {
    if (!catalog) return
    setCustom(Object.fromEntries(scopes.map(s => {
      const known = new Set((childrenOf.get(key(s.scope)) || []).map(key))
      return [key(s.scope), s.subscopes.map(child => child.scope).filter(name => !known.has(key(name)))]
    })))
    // Seed once when the catalog arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog])

  const isSelected = (scopeKey: string, name: string) => (selected[scopeKey] || []).includes(key(name))
  const toggle = (scopeKey: string, name: string) => setSelected(prev => {
    const list = prev[scopeKey] || []
    return { ...prev, [scopeKey]: list.includes(key(name)) ? list.filter(k => k !== key(name)) : [...list, key(name)] }
  })

  const finishAdding = (scopeKey: string) => {
    const name = draftName.trim()
    setAdding(null)
    setDraftName('')
    if (!name) return
    const existing = [...(childrenOf.get(scopeKey) || []), ...(custom[scopeKey] || [])]
    if (!existing.some(other => key(other) === key(name))) setCustom(prev => ({ ...prev, [scopeKey]: [...(prev[scopeKey] || []), name] }))
    if (!isSelected(scopeKey, name)) toggle(scopeKey, name)
  }

  const removeCustom = (scopeKey: string, name: string) => {
    setCustom(prev => ({ ...prev, [scopeKey]: (prev[scopeKey] || []).filter(other => other !== name) }))
    setSelected(prev => ({ ...prev, [scopeKey]: (prev[scopeKey] || []).filter(k => k !== key(name)) }))
  }

  const total = Object.values(selected).reduce((sum, list) => sum + list.length, 0)

  const onContinue = () => {
    onSave(scopes.map(scope => {
      const scopeKey = key(scope.scope)
      const picked = new Set(selected[scopeKey] || [])
      // Keep saved subscopes in place (with ids and descriptions); append new picks.
      const kept = scope.subscopes.filter(child => picked.has(key(child.scope)))
      const keptKeys = new Set(kept.map(child => key(child.scope)))
      const added = [...(childrenOf.get(scopeKey) || []), ...(custom[scopeKey] || [])]
        .filter(name => picked.has(key(name)) && !keptKeys.has(key(name)))
        .filter((name, index, list) => list.findIndex(other => key(other) === key(name)) === index)
        .map<EditScope>(name => ({ scope: name, description: null, subscopes: [] }))
      return { ...scope, subscopes: [...kept, ...added] }
    }))
  }

  const chip = ({ chipKey, label, active, onToggle, onRemove }: { chipKey: string; label: string; active: boolean; onToggle: () => void; onRemove?: () => void }) => (
    <span
      key={chipKey}
      className={`inline-flex items-center rounded-full border text-[12.5px] font-medium transition-colors ${
        active ? 'border-[#1C7CBB] bg-[#1C7CBB] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-[#1C7CBB]/50'
      }`}
    >
      <button type="button" onClick={onToggle} aria-pressed={active} className={`inline-flex items-center gap-1.5 py-1.5 ${onRemove ? 'ps-3.5 pe-1.5' : 'px-3.5'}`}>
        {active ? <IconCheck size={14} stroke={2.5} /> : null}
        {label}
      </button>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={isRTL ? 'إزالة النطاق الفرعي' : 'Remove subscope'}
          className={`me-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${active ? 'hover:bg-white/20' : 'text-slate-400 hover:bg-rose-50 hover:text-rose-500'}`}
        >
          <IconX size={12} stroke={2.5} />
        </button>
      ) : null}
    </span>
  )

  return (
    <div className="mx-auto w-full max-w-7xl" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader locale={locale} entered={entered} projectTypeId={projectType} serviceLabelOverride={serviceLabel} />
      <StepTitle id="edit-subscopes-title" entered={entered} isRTL={isRTL} locale={locale}
        title={isRTL ? 'اختر النطاقات الفرعية وأضف أخرى' : 'Select and add subscopes'}
        subtitle={isRTL ? 'اختر النطاقات الفرعية المطلوبة، ويمكنك إضافة نطاقات فرعية أخرى.' : 'Select the required subscopes, and add other subscopes if you need them.'}>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">{isRTL ? `${total} محدد` : `${total} selected`}</span>
      </StepTitle>

      <div className="mt-6 space-y-4 pb-[130px] lg:pb-24">
        {catalog === null ? (
          <div className="text-sm font-semibold text-slate-600">{isRTL ? 'جاري التحميل…' : 'Loading…'}</div>
        ) : scopes.map(scope => {
          const scopeKey = key(scope.scope)
          const children = childrenOf.get(scopeKey) || []
          const own = custom[scopeKey] || []
          const allSelected = children.length > 0 && children.every(name => isSelected(scopeKey, name))
          return (
            <section key={scopeKey} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-bold text-slate-900">{scope.scope}</h3>
                {children.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelected(prev => {
                      const rest = (prev[scopeKey] || []).filter(k => !children.some(name => key(name) === k))
                      return { ...prev, [scopeKey]: allSelected ? rest : [...rest, ...children.map(key)] }
                    })}
                    className="text-[13px] font-semibold text-[#1C7CBB] hover:underline"
                  >
                    {allSelected ? (isRTL ? 'إلغاء تحديد الكل' : 'Clear') : (isRTL ? 'تحديد الكل' : 'Select all')}
                  </button>
                ) : null}
              </div>
              {children.length === 0 && own.length === 0 ? (
                <p className="text-[13px] font-medium text-slate-500">
                  {isRTL ? 'سيتم تضمين هذا النطاق بالكامل. أضف نطاقات فرعية إذا أردت تفاصيل أكثر.' : 'This whole scope will be included. Add subscopes if you want to be more specific.'}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {children.map(name => chip({ chipKey: name, label: name, active: isSelected(scopeKey, name), onToggle: () => toggle(scopeKey, name) }))}
                {own.map(name => chip({ chipKey: `own-${name}`, label: name, active: isSelected(scopeKey, name), onToggle: () => toggle(scopeKey, name), onRemove: () => removeCustom(scopeKey, name) }))}
                {adding === scopeKey ? (
                  <input
                    autoFocus
                    value={draftName}
                    maxLength={BACKEND_STRING_MAX}
                    onChange={e => setDraftName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        finishAdding(scopeKey)
                      }
                      if (e.key === 'Escape') setAdding(null)
                    }}
                    onBlur={() => finishAdding(scopeKey)}
                    placeholder={isRTL ? 'اكتب الاسم ثم اضغط Enter' : 'Type a name, then press Enter'}
                    className="min-w-[220px] rounded-full border border-[#1C7CBB] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => { setDraftName(''); setAdding(scopeKey) }}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-3.5 py-1.5 text-[12.5px] font-medium text-slate-500 transition-colors hover:border-[#1C7CBB] hover:text-[#1C7CBB]"
                  >
                    <IconPlus size={14} stroke={2.2} />
                    {isRTL ? 'أضف نطاقًا خاصًا' : 'Add your own'}
                  </button>
                )}
              </div>
            </section>
          )
        })}
      </div>

      <StepFooter isRTL={isRTL} backHref={backHref} continueLabel={continueLabel} canContinue={catalog !== null} onContinue={onContinue} />
    </div>
  )
}
