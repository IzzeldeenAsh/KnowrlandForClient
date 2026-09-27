'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  definitionRequest,
  loadDefinitionAddons,
  projectDefinitionIds,
  type DefinitionOption,
} from '../projectDefinitionApi'
import { projectWizardStorage } from '../wizardStorage'
import { markServiceComplete } from '../projectServicesState'
import { syncServiceComponents } from '../serviceComponentsSync'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import {
  getNextProjectWizardStepId,
  serviceAddonsHidden,
} from '../projectWizardFlow'
import WizardStepFrame from './WizardStepFrame'

type AddonValue = {
  enabled: boolean
  dates: string[]
  scopes: string
  size: string
  distribution: string
}
export default function ServiceAddonsStep({ locale }: { locale: string }) {
  if (serviceAddonsHidden) return <FinishServiceStep locale={locale} />
  return <ServiceAddonsForm locale={locale} />
}

// Stands in for the hidden add-ons step: saves the service components and marks the service complete.
function FinishServiceStep({ locale }: { locale: string }) {
  const ar = locale === 'ar'
  const router = useRouter()
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let cancelled = false
    async function finish() {
      setError('')
      try {
        await syncServiceComponents(locale)
        markServiceComplete(locale, true)
        if (cancelled) return
        const next = getNextProjectWizardStepId(locale, 'service-addons')
        router.replace(`/${locale}/project/wizard/${next || 'services-summary'}`)
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Unable to save service')
      }
    }
    void finish()
    return () => {
      cancelled = true
    }
  }, [locale, router, attempt])
  return (
    <WizardStepFrame
      locale={locale}
      title={ar ? 'حفظ الخدمة' : 'Saving your service'}
      error={error}
      busy={!error}
      onContinue={() => setAttempt((n) => n + 1)}
      continueLabel={ar ? 'إعادة المحاولة' : 'Try again'}
    >
      <p className="text-slate-600">
        {ar ? 'نحفظ تفاصيل الخدمة.' : 'Saving the service details.'}
      </p>
    </WizardStepFrame>
  )
}

function ServiceAddonsForm({ locale }: { locale: string }) {
  const ar = locale === 'ar'
  const nav = useProjectWizardNavigation(locale)
  const [options, setOptions] = useState<DefinitionOption[]>([])
  const [values, setValues] = useState<Record<string, AddonValue>>(() => {
    if (typeof window === 'undefined') return {}
    try {
      return JSON.parse(
        sessionStorage.getItem(projectWizardStorage.serviceAddonsKey(locale)) ||
          '{}',
      )
    } catch {
      return {}
    }
  })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    loadDefinitionAddons(locale, true)
      .then((data) => {
        if (!cancelled) setOptions(data)
      })
      .catch((e) => {
        if (!cancelled) setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [locale, attempt])
  const valueFor = (slug: string): AddonValue =>
    values[slug] || {
      enabled: false,
      dates: [''],
      scopes: '',
      size: '',
      distribution: '',
    }
  function update(slug: string, patch: Partial<AddonValue>) {
    const next = { ...values, [slug]: { ...valueFor(slug), ...patch } }
    setValues(next)
    sessionStorage.setItem(
      projectWizardStorage.serviceAddonsKey(locale),
      JSON.stringify(next),
    )
  }
  async function save() {
    setBusy(true)
    setError('')
    try {
      const addons: Record<string, unknown> = {}
      for (const option of options) {
        const value = valueFor(option.slug)
        if (!value.enabled) continue
        if (option.slug === 'survey-conduct') {
          const scopes = value.scopes
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
          if (!scopes.length)
            throw new Error(
              ar
                ? 'أضف نطاقاً واحداً على الأقل للاستبيان.'
                : 'Add at least one survey scope.',
            )
          addons[option.slug] = {
            scopes,
            parameters: {
              size: value.size ? Number(value.size) : null,
              distribution: value.distribution
                ? Number(value.distribution)
                : null,
            },
          }
        } else {
          addons[option.slug] = value.dates.map((date) => ({
            date: date || null,
            ...(option.slug === 'third-party-consultant'
              ? { insighter_id: null }
              : {}),
          }))
        }
      }
      await syncServiceComponents(locale)
      await definitionRequest(
        locale,
        `addon/sync/${projectDefinitionIds(locale, true)}`,
        'POST',
        { addons },
      )
      markServiceComplete(locale, true)
      nav.goNext()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save service')
    } finally {
      setBusy(false)
    }
  }
  const labels: Record<string, string> = {
    'consulting-sessions': ar ? 'جلسات استشارية' : 'Consulting sessions',
    'third-party-consultant': ar
      ? 'استشاري طرف ثالث'
      : 'Third-party consultant',
    'survey-conduct': ar ? 'إجراء استبيان' : 'Conduct a survey',
  }
  return (
    <WizardStepFrame
      locale={locale}
      title={ar ? 'إضافات الخدمة' : 'Service add-ons'}
      subtitle={
        ar
          ? 'اختر الإضافات الاختيارية لهذه الخدمة.'
          : 'Choose any optional extras for this service.'
      }
      busy={busy || loading}
      disabled={!!error && !options.length}
      error={error}
      onContinue={save}
    >
      {loading ? (
        <p role="status">{ar ? 'جاري التحميل…' : 'Loading…'}</p>
      ) : !options.length && !error ? (
        <p className="text-slate-600">
          {ar
            ? 'لا توجد إضافات متاحة لهذه الخدمة.'
            : 'No add-ons are available for this service.'}
        </p>
      ) : (
        <div className="space-y-4">
          {options.map((option) => {
            const value = valueFor(option.slug)
            const supported = option.slug in labels
            return (
              <fieldset
                disabled={busy || !supported}
                key={option.slug}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5"
              >
                <label className="flex items-center gap-3 font-medium">
                  <input
                    type="checkbox"
                    checked={value.enabled}
                    onChange={(e) =>
                      update(option.slug, { enabled: e.target.checked })
                    }
                  />
                  {labels[option.slug] || option.name}
                </label>
                {!supported && (
                  <p className="mt-2 text-sm text-slate-500">
                    {ar
                      ? 'هذه الإضافة غير متاحة في نموذج الطلب حالياً.'
                      : 'This add-on is not yet available in the request form.'}
                  </p>
                )}
                {value.enabled &&
                  (option.slug === 'survey-conduct' ? (
                    <div className="mt-4 space-y-4">
                      <label className="block text-sm">
                        {ar
                          ? 'نطاقات الاستبيان، كل نطاق في سطر'
                          : 'Survey scopes, one per line'}
                        <textarea
                          value={value.scopes}
                          onChange={(e) =>
                            update(option.slug, { scopes: e.target.value })
                          }
                          className="mt-2 block w-full rounded-xl border-slate-200"
                          rows={3}
                        />
                      </label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {(['size', 'distribution'] as const).map((field) => (
                          <label key={field} className="text-sm">
                            {field === 'size'
                              ? ar
                                ? 'حجم العينة (اختياري)'
                                : 'Sample size (optional)'
                              : ar
                                ? 'التوزيع (اختياري)'
                                : 'Distribution (optional)'}
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={value[field]}
                              onChange={(e) =>
                                update(option.slug, { [field]: e.target.value })
                              }
                              className="mt-2 block w-full rounded-xl border-slate-200"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {value.dates.map((date, i) => (
                        <div key={i} className="flex items-end gap-3">
                          <label className="text-sm">
                            {ar
                              ? `الموعد ${i + 1} (اختياري)`
                              : `Date ${i + 1} (optional)`}
                            <input
                              type="date"
                              value={date}
                              onChange={(e) =>
                                update(option.slug, {
                                  dates: value.dates.map((d, j) =>
                                    i === j ? e.target.value : d,
                                  ),
                                })
                              }
                              className="mt-2 block rounded-xl border-slate-200"
                            />
                          </label>
                          {value.dates.length > 1 && (
                            <button
                              type="button"
                              className="pb-3 text-sm text-rose-700"
                              onClick={() =>
                                update(option.slug, {
                                  dates: value.dates.filter((_, j) => j !== i),
                                })
                              }
                            >
                              {ar ? 'حذف' : 'Remove'}
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-sm text-sky-700"
                        onClick={() =>
                          update(option.slug, { dates: [...value.dates, ''] })
                        }
                      >
                        {ar ? '+ إضافة موعد' : '+ Add date'}
                      </button>
                    </div>
                  ))}
              </fieldset>
            )
          })}
        </div>
      )}
      {error && !options.length && (
        <button
          type="button"
          className="mt-4 text-sky-700"
          onClick={() => setAttempt((n) => n + 1)}
        >
          {ar ? 'إعادة المحاولة' : 'Try again'}
        </button>
      )}
    </WizardStepFrame>
  )
}
