'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconMapPin, IconWorld } from '@tabler/icons-react'
import { getApiUrl } from '@/app/config'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { syncProjectProperties } from '@/components/project/projectPropertiesSync'
import { useProjectStepErrorToast } from '@/components/project/useProjectStepErrorToast'
import ProjectSelectedTypeHeader from '../ProjectSelectedTypeHeader'
import { projectWizardStepIds } from '../projectWizardFlow'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import ChoiceCard from './ChoiceCard'

type OriginType = 'country' | 'region'
type PreferredInsighterType = 'Individual' | 'Company' | 'Either'

type Country = {
  id: number
  flag?: string
  name?: string
  names?: {
    en?: string
    ar?: string
  }
  status?: string
}

type Region = {
  id: number
  name: string
}

type OriginOption = {
  value: OriginType
  label: string
}

function getDisplayName(
  locale: WizardLocale,
  value: { name?: string; names?: { en?: string; ar?: string } }
) {
  if (locale === 'ar') return value.names?.ar || value.name || ''
  return value.names?.en || value.name || ''
}

async function fetchList<T>(path: string, locale: WizardLocale): Promise<T[]> {
  const res = await fetch(getApiUrl(path), {
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

function getOriginOptions(locale: WizardLocale): OriginOption[] {
  if (locale === 'ar') {
    return [
      { value: 'country', label: 'دولة' },
      { value: 'region', label: 'منطقة' },
    ]
  }

  return [
    { value: 'country', label: 'Country' },
    { value: 'region', label: 'Region' },
  ]
}

export default function InsighterOriginQuestion({
  locale,
}: {
  locale: WizardLocale
}) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const originOptions = useMemo(() => getOriginOptions(locale), [locale])

  const [entered, setEntered] = useState(false)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [preferredInsighterType, setPreferredInsighterType] =
    useState<PreferredInsighterType | null>(null)
  const [originType, setOriginType] = useState<OriginType | null>(null)
  const [originId, setOriginId] = useState<string>('')
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState<Country[] | null>(null)
  const [regions, setRegions] = useState<Region[] | null>(null)
  const [loading, setLoading] = useState<OriginType | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

      const savedPreferred = window.sessionStorage.getItem(
        projectWizardStorage.preferredInsighterTypeKey(locale)
      ) as PreferredInsighterType | null
      if (
        savedPreferred === 'Individual' ||
        savedPreferred === 'Company' ||
        savedPreferred === 'Either'
      ) {
        setPreferredInsighterType(savedPreferred)
      }

      const savedOriginType = window.sessionStorage.getItem(
        projectWizardStorage.insighterOriginTypeKey(locale)
      ) as OriginType | null
      if (savedOriginType === 'country' || savedOriginType === 'region') {
        setOriginType(savedOriginType)
      }

      setOriginId(
        window.sessionStorage.getItem(projectWizardStorage.insighterOriginIdKey(locale)) ||
        ''
      )
    } catch {
      // ignore
    }
  }, [locale])

  const title = isRTL
    ? 'ما هو الأصل المفضل لهذا الخبير؟'
    : 'What should be the origin of this insighter?'

  const subtitle = isRTL
    ? 'اختر دولة واحدة أو منطقة واحدة.'
    : 'Select one country or one region.'

  const shouldDeferPropertiesSync =
    nav.nextStepId === projectWizardStepIds.insighterExperience ||
    nav.nextStepId === projectWizardStepIds.companyTeamSize

  const finishSync = async () => {
    setSubmitting(true)
    setError(null)

    try {
      await syncProjectProperties(locale)
      if (nav.nextHref) {
        nav.goNext()
        return
      }
      router.push(`/${locale}/project`)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ خصائص المشروع.' : 'Failed to save project properties.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

  const ensureCountries = async () => {
    if (countries) return

    setLoading('country')
    setError(null)

    try {
      const list = await fetchList<Country>('/api/common/setting/country/list', locale)
      setCountries(list.filter((country) => country.status !== 'inactive'))
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

    setLoading('region')
    setError(null)

    try {
      const list = await fetchList<Region>('/api/common/setting/region/list', locale)
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

  const onSelectOriginType = async (value: OriginType) => {
    setOriginType(value)
    setOriginId('')
    setQuery('')
    setError(null)

    if (value === 'country') {
      await ensureCountries()
      return
    }

    await ensureRegions()
  }

  useEffect(() => {
    if (originType === 'country') void ensureCountries()
    if (originType === 'region') void ensureRegions()
  }, [originType])

  const entries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (originType === 'country') {
      const list = countries || []
      if (!normalizedQuery) return list

      return list.filter((country) => {
        const localized = getDisplayName(locale, country).toLowerCase()
        const en = (country.names?.en || '').toLowerCase()
        const ar = (country.names?.ar || '').toLowerCase()
        return (
          localized.includes(normalizedQuery) ||
          en.includes(normalizedQuery) ||
          ar.includes(normalizedQuery)
        )
      })
    }

    const list = regions || []
    if (!normalizedQuery) return list

    return list.filter((region) =>
      region.name.toLowerCase().includes(normalizedQuery)
    )
  }, [countries, locale, originType, query, regions])

  const canContinue = Boolean(originType && originId)

  const iconBadgeBase =
    'inline-flex h-full w-full items-center justify-center rounded-2xl border shadow-sm'
  const optionIcons: Record<
    OriginType,
    ({
      size,
      stroke,
    }: {
      size: number
      stroke: number
      className?: string
    }) => ReactNode
  > = {
    country: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-sky-200/80 bg-sky-50/90 text-sky-700`}
      >
        <IconWorld size={size * 0.58} stroke={stroke} />
      </span>
    ),
    region: ({ size, stroke }) => (
      <span
        className={`${iconBadgeBase} border-emerald-200/80 bg-emerald-50/90 text-emerald-700`}
      >
        <IconMapPin size={size * 0.58} stroke={stroke} />
      </span>
    ),
  }

  const onContinue = async () => {
    if (!originType || !originId || submitting) return

    try {
      window.sessionStorage.setItem(
        projectWizardStorage.insighterOriginTypeKey(locale),
        originType
      )
      window.sessionStorage.setItem(
        projectWizardStorage.insighterOriginIdKey(locale),
        originId
      )
    } catch {
      // ignore
    }

    if (shouldDeferPropertiesSync && nav.nextHref) {
      nav.goNext()
      return
    }

    await finishSync()
  }

  const onSkip = async () => {
    if (submitting) return

    try {
      window.sessionStorage.setItem(
        projectWizardStorage.insighterOriginTypeKey(locale),
        ''
      )
      window.sessionStorage.setItem(projectWizardStorage.insighterOriginIdKey(locale), '')
    } catch {
      // ignore
    }

    if (shouldDeferPropertiesSync && nav.nextHref) {
      nav.goNext()
      return
    }

    await finishSync()
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 pb-32">
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
              #insighter-origin-question-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}
          <h2
            id="insighter-origin-question-title"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{subtitle}</p>

        </div>

        <div className="mt-6 sm:mt-20" role="radiogroup" aria-label={title}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {originOptions.map((option, index) => (
              <ChoiceCard
                key={option.value}
                checked={originType === option.value}
                title={option.label}
                renderIcon={optionIcons[option.value]}
                onSelect={() => void onSelectOriginType(option.value)}
                entered={entered}
                isRTL={isRTL}
                delayMs={110 + index * 70}
                align="center"
                size="sm"
                className="min-h-[150px]"
                iconSize={56}
                iconStroke={1.6}
              />
            ))}
          </div>
        </div>

        {originType ? (
          <div
            className={`mt-4 transition-all duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              }`}
            style={{ transitionDelay: '320ms' }}
          >
            <div className="rounded-3xl border border-white/30 bg-white/45 p-4 shadow-sm backdrop-blur-md">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  originType === 'country'
                    ? isRTL
                      ? 'ابحث عن دولة...'
                      : 'Search country...'
                    : isRTL
                      ? 'ابحث عن منطقة...'
                      : 'Search region...'
                }
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              <div className="mt-4 max-h-[340px] overflow-auto pr-1">
                {loading === originType ? (
                  <div className="text-sm font-semibold text-slate-600">
                    {isRTL ? 'جاري التحميل…' : 'Loading…'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {entries.map((entry) => {
                      const entryId = String(entry.id)
                      const isSelected = originId === entryId
                      const countryEntry =
                        originType === 'country' ? (entry as Country) : null
                      const label =
                        originType === 'country'
                          ? getDisplayName(locale, countryEntry as Country) || `#${entryId}`
                          : (entry as Region).name
                      const flagSrc = countryEntry?.flag
                        ? `/images/flags/${countryEntry.flag}.svg`
                        : null

                      return (
                        <button
                          key={entryId}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setOriginId(entryId)}
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
                            {label}
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

        {error ? (
          <div className="mt-4 text-sm font-semibold text-rose-700">{error}</div>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:static border-t rounded-lg border-slate-200/70 bg-white/80 backdrop-blur-md lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto px-4 lg:px-0 w-full pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className=" lg:mt-8 flex  items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void onSkip()}
                disabled={submitting}
                className="btn-sm px-5 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRTL ? 'تخطي' : 'Skip'}
              </button>

              <button
                type="button"
                onClick={() => void onContinue()}
                disabled={!canContinue || submitting}
                className={`btn-sm px-6 py-2 rounded-full ${canContinue && !submitting
                  ? 'text-white bg-[#1C7CBB] hover:bg-opacity-90'
                  : 'text-slate-500 bg-slate-200 cursor-not-allowed'
                  }`}
              >
                {submitting ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : isRTL ? 'متابعة' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
