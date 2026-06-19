'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { updateServiceComponentPayload } from '@/components/project/serviceComponentsPayload'
import { syncServiceComponents } from '@/components/project/serviceComponentsSync'

type Mode = 'worldwide' | 'country' | 'regions' | 'economic'

type Country = {
  id: number
  region_id: number
  flag: string
  names?: { en?: string; ar?: string }
  name?: string
  status?: string
}

type Region = {
  id: number
  name: string
}

type EconomicBloc = {
  id: number
  name: string
}

function safeParseNumberArray(value: string | null): number[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map((n) => Number(n)).filter((n) => Number.isFinite(n))
  } catch {
    return []
  }
}

function getDisplayName(
  locale: WizardLocale,
  value: { names?: { en?: string; ar?: string }; name?: string }
) {
  if (locale === 'ar') return value.names?.ar || value.name || ''
  return value.names?.en || value.name || ''
}

async function fetchList<T>(url: string, locale: WizardLocale): Promise<T[]> {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale === 'ar' ? 'ar' : 'en',
    },
    cache: 'no-store',
  })
  await assertProjectApiResponse(res)
  const json = (await res.json()) as { data?: T[] }
  return json.data || []
}

export default function TargetMarketQuestion({ locale }: { locale: WizardLocale }) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const nav = useProjectWizardNavigation(locale)

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)

  const [mode, setMode] = useState<Mode | null>(null)

  const [countries, setCountries] = useState<Country[] | null>(null)
  const [regions, setRegions] = useState<Region[] | null>(null)
  const [blocs, setBlocs] = useState<EconomicBloc[] | null>(null)

  const [loading, setLoading] = useState<'countries' | 'regions' | 'blocs' | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useProjectStepErrorToast(error, locale)

  const [countryIds, setCountryIds] = useState<number[]>([])
  const [regionIds, setRegionIds] = useState<number[]>([])
  const [blocIds, setBlocIds] = useState<number[]>([])

  const [countryQuery, setCountryQuery] = useState('')

  // When the user actively picks "Worldwide", auto-advance to the next step
  // as soon as the (auto-selected) regions are loaded.
  const pendingWorldwideAdvanceRef = useRef(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      setProjectType(
        window.sessionStorage.getItem(projectWizardStorage.projectTypeKey(locale))
      )

      const savedMode = window.sessionStorage.getItem(
        projectWizardStorage.targetMarketModeKey(locale)
      ) as Mode | null
      if (savedMode) setMode(savedMode)

      setCountryIds(
        safeParseNumberArray(
          window.sessionStorage.getItem(
            projectWizardStorage.targetMarketCountryIdsKey(locale)
          )
        )
      )
      setRegionIds(
        safeParseNumberArray(
          window.sessionStorage.getItem(
            projectWizardStorage.targetMarketRegionIdsKey(locale)
          )
        )
      )
      setBlocIds(
        safeParseNumberArray(
          window.sessionStorage.getItem(
            projectWizardStorage.targetMarketEconomicBlocIdsKey(locale)
          )
        )
      )
    } catch {
      // ignore
    }
  }, [locale])

  const title = isRTL ? 'اختر السوق المستهدف' : 'Select the target market'

  const modeOptions = useMemo(() => {
    if (isRTL) {
      return [
        { id: 'worldwide' as const, label: ' كل العالم' },
        { id: 'country' as const, label: 'اختيار دولة' },
        { id: 'regions' as const, label: 'اختيار منطقة' },
        { id: 'economic' as const, label: 'اختيار تكتل اقتصادي' },
      ]
    }
    return [
      { id: 'worldwide' as const, label: 'Worldwide' },
      { id: 'country' as const, label: 'Select Country' },
      { id: 'regions' as const, label: 'Select Region' },
      { id: 'economic' as const, label: 'Select Economic Block' },
    ]
  }, [isRTL])

  const ensureCountries = async () => {
    if (countries) return
    setError(null)
    setLoading('countries')
    try {
      const list = await fetchList<Country>(
        'https://api.insightabusiness.com/api/common/setting/country/list',
        locale
      )
      setCountries(list.filter((c) => c.status !== 'inactive'))
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر تحميل الدول.' : 'Failed to load countries.'
        )
      )
      setCountries([])
    } finally {
      setLoading(null)
    }
  }

  const ensureRegions = async () => {
    if (regions) return
    setError(null)
    setLoading('regions')
    try {
      const list = await fetchList<Region>(
        'https://api.insightabusiness.com/api/common/setting/region/list',
        locale
      )
      setRegions(list)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر تحميل المناطق.' : 'Failed to load regions.'
        )
      )
      setRegions([])
    } finally {
      setLoading(null)
    }
  }

  const ensureBlocs = async () => {
    if (blocs) return
    setError(null)
    setLoading('blocs')
    try {
      const list = await fetchList<EconomicBloc>(
        'https://api.insightabusiness.com/api/common/setting/economic-bloc/list',
        locale
      )
      setBlocs(list)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر تحميل التكتلات.' : 'Failed to load economic blocks.'
        )
      )
      setBlocs([])
    } finally {
      setLoading(null)
    }
  }

  const onSelectMode = async (next: Mode) => {
    setMode(next)
    setError(null)
    setCountryQuery('')
    setCountryIds([])
    setRegionIds([])
    setBlocIds([])

    if (next === 'country') {
      await ensureCountries()
      return
    }

    if (next === 'regions') {
      await ensureRegions()
      return
    }

    if (next === 'economic') {
      await ensureBlocs()
      return
    }

    if (next === 'worldwide') {
      pendingWorldwideAdvanceRef.current = true
      await ensureRegions()
    }
  }

  useEffect(() => {
    if (mode !== 'worldwide') return
    if (!regions) return
    setRegionIds(regions.map((r) => r.id))
  }, [mode, regions])

  useEffect(() => {
    if (!mode) return
    if (mode === 'country') void ensureCountries()
    if (mode === 'regions' || mode === 'worldwide') void ensureRegions()
    if (mode === 'economic') void ensureBlocs()
  }, [mode])

  const filteredCountries = useMemo(() => {
    if (!countries) return []
    const q = countryQuery.trim().toLowerCase()
    if (!q) return countries
    return countries.filter((c) => {
      const name = getDisplayName(locale, c).toLowerCase()
      const en = (c.names?.en || '').toLowerCase()
      const ar = (c.names?.ar || '').toLowerCase()
      return name.includes(q) || en.includes(q) || ar.includes(q)
    })
  }, [countries, countryQuery, locale])

  const selectedTargetMarketItems = useMemo(() => {
    if (mode === 'worldwide') {
      const worldwideLabel =
        modeOptions.find((option) => option.id === 'worldwide')?.label ||
        (isRTL ? 'كل العالم' : 'Worldwide')
      return [{ id: 'worldwide', label: worldwideLabel, flagSrc: null }]
    }

    if (mode === 'country') {
      const selected = new Set(countryIds)
      return (countries || [])
        .filter((country) => selected.has(country.id))
        .map((country) => ({
          id: String(country.id),
          label: getDisplayName(locale, country) || `#${country.id}`,
          flagSrc: country.flag ? `/images/flags/${country.flag}.svg` : null,
        }))
    }

    if (mode === 'regions') {
      const selected = new Set(regionIds)
      return (regions || [])
        .filter((region) => selected.has(region.id))
        .map((region) => ({
          id: String(region.id),
          label: region.name,
          flagSrc: null,
        }))
    }

    if (mode === 'economic') {
      const selected = new Set(blocIds)
      return (blocs || [])
        .filter((bloc) => selected.has(bloc.id))
        .map((bloc) => ({
          id: String(bloc.id),
          label: bloc.name,
          flagSrc: null,
        }))
    }

    return []
  }, [blocIds, blocs, countries, countryIds, isRTL, locale, mode, modeOptions, regionIds, regions])

  const removeSelectedTargetMarketItem = (id: string) => {
    if (mode === 'country') setCountryIds((prev) => prev.filter((item) => String(item) !== id))
    if (mode === 'regions') setRegionIds((prev) => prev.filter((item) => String(item) !== id))
    if (mode === 'economic') setBlocIds((prev) => prev.filter((item) => String(item) !== id))
  }

  const canContinue =
    mode === 'worldwide'
      ? regionIds.length > 0
      : mode === 'country'
        ? countryIds.length > 0
        : mode === 'regions'
          ? regionIds.length > 0
          : mode === 'economic'
            ? blocIds.length > 0
            : false

  const onContinue = async () => {
    if (!mode || !canContinue || submitting) return

    try {
      window.sessionStorage.setItem(
        projectWizardStorage.targetMarketModeKey(locale),
        mode
      )

      window.sessionStorage.setItem(
        projectWizardStorage.targetMarketCountryIdsKey(locale),
        JSON.stringify(mode === 'country' ? countryIds : [])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.targetMarketRegionIdsKey(locale),
        JSON.stringify(mode === 'worldwide' || mode === 'regions' ? regionIds : [])
      )
      window.sessionStorage.setItem(
        projectWizardStorage.targetMarketEconomicBlocIdsKey(locale),
        JSON.stringify(mode === 'economic' ? blocIds : [])
      )
    } catch {
      // ignore
    }

    const payload =
      mode === 'country'
        ? { type: 'country', ids: countryIds }
        : mode === 'economic'
          ? { type: 'economic', ids: blocIds }
          : { type: 'region', ids: regionIds }

    updateServiceComponentPayload(locale, 'target-market', payload)

    const leavingComponents = nav.nextStepId === 'project-status' || nav.isReviewEditMode
    if (!leavingComponents) {
      nav.goNext()
      return
    }

    setSubmitting(true)
    try {
      await syncServiceComponents(locale)
      nav.goNext()
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ مكوّنات الخدمة.' : 'Failed to save service components.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (!pendingWorldwideAdvanceRef.current) return
    if (mode !== 'worldwide' || regionIds.length === 0 || submitting) return
    pendingWorldwideAdvanceRef.current = false
    void onContinue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, regionIds, submitting])

  return (
    <div className="w-full max-w-5xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
      />

      <div
        className={`mt-2 text-start transition-all duration-700 ${entered
          ? 'opacity-100 translate-x-0'
          : isRTL
            ? 'opacity-0 translate-x-4'
            : 'opacity-0 -translate-x-4'
          }`}
      >
        {isEnglish ? (
          <style>{`
            #target-market-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="target-market-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {title}
        </h2>
      </div>

      <div className="mt-6" role="radiogroup" aria-label={title}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {modeOptions.map((opt, index) => {
            const isSelected = mode === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => void onSelectMode(opt.id)}
                className={`h-full min-h-[88px] rounded-2xl border px-5 py-4 text-start shadow-sm backdrop-blur-md transition-all duration-700 ${isSelected
                  ? 'border-blue-300 bg-white/60'
                  : 'border-white/30 bg-white/35 hover:bg-white/45'
                  } ${entered
                    ? 'opacity-100 translate-x-0'
                    : isRTL
                      ? 'opacity-0 translate-x-4'
                      : 'opacity-0 -translate-x-4'
                  }`}
                style={{ transitionDelay: `${110 + index * 60}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-blue-600' : 'border-slate-300'
                      } bg-white/80`}
                    aria-hidden="true"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-transparent'
                        }`}
                    />
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {opt.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {error ? (
          <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
        ) : null}

        {mode !== 'worldwide' && selectedTargetMarketItems.length > 0 ? (
          <div className="mt-4 rounded-2xl border border-blue-100 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-md">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              {isRTL ? 'اختيارك' : 'Selected'}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTargetMarketItems.map((item) => (
                <span
                  key={item.id}
                  className={`inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {item.flagSrc ? (
                    <img src={item.flagSrc} alt="" className="h-4 w-4 object-contain" />
                  ) : null}
                  <span>{item.label}</span>
                  <button
                    type="button"
                    onClick={() => removeSelectedTargetMarketItem(item.id)}
                    aria-label={isRTL ? 'إزالة الاختيار' : 'Remove selection'}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {mode === 'country' ? (
          <div
            className={`mt-4 transition-all duration-700 pb-[100px] lg:pb-0 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              }`}
            style={{ transitionDelay: '420ms' }}
          >
            <div className="rounded-3xl border border-white/30 bg-white/45 p-4 shadow-sm backdrop-blur-md">
              <input
                value={countryQuery}
                onChange={(e) => setCountryQuery(e.target.value)}
                placeholder={isRTL ? 'ابحث عن دولة...' : 'Search country...'}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              <div className="mt-4 max-h-[340px] overflow-auto pr-1">
                {loading === 'countries' ? (
                  <div className="text-sm font-semibold text-slate-600">
                    {isRTL ? 'جاري التحميل…' : 'Loading…'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {filteredCountries.map((c) => {
                      const isSelected = countryIds.includes(c.id)
                      const label = getDisplayName(locale, c) || ''
                      const flagSrc = c.flag
                        ? `/images/flags/${c.flag}.svg`
                        : null

                      return (
                        <button
                          key={c.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() =>
                            setCountryIds((prev) =>
                              prev.includes(c.id)
                                ? prev.filter((x) => x !== c.id)
                                : [...prev, c.id]
                            )
                          }
                          className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-start transition-colors ${isSelected
                            ? 'border-blue-300 bg-white/75'
                            : 'border-white/30 bg-white/40 hover:bg-white/55'
                            }`}
                        >
                          <span
                            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-blue-600' : 'border-slate-300'
                              } bg-white/80`}
                            aria-hidden="true"
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-transparent'
                                }`}
                            />
                          </span>

                          {flagSrc ? (
                            <img
                              src={flagSrc}
                              alt=""
                              className="h-4 w-4 object-contain opacity-90"
                              onError={(e) => {
                                ; (e.currentTarget as HTMLImageElement).style.display =
                                  'none'
                              }}
                            />
                          ) : null}

                          <span className="text-sm font-semibold text-slate-900">
                            {label || `#${c.id}`}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {mode === 'regions' ? (
          <div
            className={`mt-4 transition-all duration-700  ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              }`}
            style={{ transitionDelay: '420ms' }}
          >
            <div className="rounded-2xl border border-white/30 bg-white/35 backdrop-blur-md shadow-sm p-4 pb-[150px] sm:pb-4">
              {loading === 'regions' ? (
                <div className="text-sm font-semibold text-slate-600">
                  {isRTL ? 'جاري التحميل…' : 'Loading…'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2  ">
                  {(regions || []).map((r) => {
                    const isSelected = regionIds.includes(r.id)
                    return (
                      <button
                        key={r.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setRegionIds((prev) =>
                            prev.includes(r.id)
                              ? prev.filter((x) => x !== r.id)
                              : [...prev, r.id]
                          )
                        }
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-start transition-colors ${isSelected
                          ? 'border-blue-300 bg-white/70'
                          : 'border-white/30 bg-white/35 hover:bg-white/45'
                          }`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${isSelected ? 'border-blue-600' : 'border-slate-300'
                            } bg-white/80`}
                          aria-hidden="true"
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${isSelected ? 'bg-blue-600' : 'bg-transparent'
                              }`}
                          />
                        </span>

                        <span className="text-sm font-semibold text-slate-900">
                          {r.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {mode === 'economic' ? (
          <div
            className={`mt-4 transition-all pb-[100px] sm:pb-0 duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              }`}
            style={{ transitionDelay: '420ms' }}
          >
            <div className="rounded-2xl border border-white/30 bg-white/35 backdrop-blur-md shadow-sm p-4 pb-[100px] sm:pb-4">
              {loading === 'blocs' ? (
                <div className="text-sm font-semibold text-slate-600">
                  {isRTL ? 'جاري التحميل…' : 'Loading…'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {(blocs || []).map((b) => {
                    const isSelected = blocIds.includes(b.id)
                    return (
                      <button
                        key={b.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setBlocIds((prev) =>
                            prev.includes(b.id)
                              ? prev.filter((x) => x !== b.id)
                              : [...prev, b.id]
                          )
                        }
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-start transition-colors ${isSelected
                          ? 'border-blue-300 bg-white/70'
                          : 'border-white/30 bg-white/35 hover:bg-white/45'
                          }`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${isSelected ? 'border-blue-600' : 'border-slate-300'
                            } bg-white/80`}
                          aria-hidden="true"
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${isSelected ? 'bg-blue-600' : 'bg-transparent'
                              }`}
                          />
                        </span>

                        <span className="text-sm font-semibold text-slate-900">
                          {b.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue || submitting}
              className={`btn-sm px-6 py-2 rounded-full ${canContinue && !submitting
                ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                }`}
            >
              {submitting ? (isRTL ? 'جاري الحفظ…' : 'Saving…') : nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
