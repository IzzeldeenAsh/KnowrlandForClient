'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { readStoredProjectRequestUuid } from '@/components/project/projectRequestUuid'
import { readProjectAddonsState, readProjectScopeSnapshot } from '../projectAddonsState'
import { projectTypeLabel } from '../projectLabels'
import { readProjectDescriptionState } from '../projectDescriptionState'
import {
  readServiceComponentsPayload,
  type ServiceComponentsPayload,
} from '../serviceComponentsPayload'
import { readServiceComponentSlugs } from '../projectWizardFlow'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

type Country = {
  id: number
  name?: string
  names?: { en?: string; ar?: string }
}

type Region = {
  id: number
  name: string
}

type EconomicBloc = {
  id: number
  name: string
}

type RequestService = {
  id: number
  name: string
  slug?: string
}

type ProjectRequestData = {
  id: number
  uuid?: string
  title?: string | null
  service?: RequestService | null
}

type ReviewRow = {
  label: string
  value: string[]
  variant?: 'default' | 'chips'
}

type ReviewSection = {
  title: string
  rows: ReviewRow[]
}

type ReviewData = {
  title: string
  projectType: string
  deliverablesLanguage: string
  service: string
  projectStatus: string
  whoAreYou: string
  preferredInsighterType: string
  origin: string
  experienceRange: string
  teamSizeRange: string
  targetMarket: string[]
  servicePrompt: string
  description: string
  descriptionFiles: Array<{ name: string; size: number; type: string }>
  scopeSnapshot: Array<{ name: string; subscopes: string[] }>
  kickoffMeeting: boolean | null
  serviceComponentSections: ReviewSection[]
}

const sectionIcons = [
  {
    icon: ClipboardDocumentListIcon,
    className: 'bg-sky-50 text-sky-500',
  },
  {
    icon: SparklesIcon,
    className: 'bg-amber-50 text-amber-500',
  },
  {
    icon: DocumentTextIcon,
    className: 'bg-emerald-50 text-emerald-500',
  },
  {
    icon: GlobeAltIcon,
    className: 'bg-violet-50 text-violet-500',
  },
]

function readStorageValue(locale: WizardLocale, key: string): string {
  if (typeof window === 'undefined') return ''

  try {
    return window.sessionStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

function safeParseNumberArray(value: string | null): number[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => Number(item)).filter((item) => Number.isFinite(item))
  } catch {
    return []
  }
}

function parseStringArray(value: string | null): string[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => String(item || '').trim()).filter(Boolean)
  } catch {
    return [String(value || '').trim()].filter(Boolean)
  }
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

function formatRange(min: string, max: string, locale: WizardLocale): string {
  if (min && max) return locale === 'ar' ? `${min} إلى ${max}` : `${min} to ${max}`
  if (min) return locale === 'ar' ? `من ${min}` : `From ${min}`
  if (max) return locale === 'ar' ? `حتى ${max}` : `Up to ${max}`
  return locale === 'ar' ? 'غير محدد' : 'Not specified'
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
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

async function fetchProjectRequest(
  locale: WizardLocale,
  projectUuid: string
): Promise<ProjectRequestData | null> {
  const token = getAuthToken()
  if (!token) return null

  const res = await fetch(getApiUrl(`/api/account/project/request/${projectUuid}`), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Accept-Language': locale === 'ar' ? 'ar' : 'en',
    },
    cache: 'no-store',
  })

  await assertProjectApiResponse(res)

  const json = (await res.json()) as { data?: ProjectRequestData }
  return json.data || null
}

function isOtherService(service: RequestService | null | undefined): boolean {
  if (!service) return false
  if (service.id === 10) return true

  const slug = String(service.slug || '').trim().toLowerCase()
  const name = String(service.name || '').trim().toLowerCase()
  const otherWord = /\bothers?\b/i

  if (slug === 'other' || slug === 'others') return true
  if (otherWord.test(slug)) return true
  if (name === 'other' || name === 'others') return true
  if (otherWord.test(name)) return true
  if (name.includes('أخرى') || name.includes('اخرى')) return true

  return false
}

function getComponentTitle(locale: WizardLocale, slug: string): string {
  const map: Record<string, { en: string; ar: string }> = {
    'deliverable-stage': {
      en: 'Deliverable stage',
      ar: 'مرحلة المخرجات',
    },
    'deliverable-type-first-draft': {
      en: 'Deliverable type (first draft)',
      ar: 'نوع المخرجات (المسودة الأولى)',
    },
    'deliverable-type-final-version': {
      en: 'Deliverable type (final version)',
      ar: 'نوع المخرجات (النسخة النهائية)',
    },
    'data-sources-expected': {
      en: 'Expected data sources',
      ar: 'مصادر البيانات المتوقعة',
    },
  }

  const label = map[slug]
  if (!label) return humanizeSlug(slug)
  return locale === 'ar' ? label.ar : label.en
}

function getDeliverableWayLabel(locale: WizardLocale, value: string): string {
  const labels: Record<string, { en: string; ar: string }> = {
    on_platform: { en: 'On platform', ar: 'على المنصة' },
    session: { en: 'Session', ar: 'جلسة' },
    physical_workshop: { en: 'Physical workshop', ar: 'ورشة حضورية' },
  }

  const match = labels[value]
  if (!match) return value
  return locale === 'ar' ? match.ar : match.en
}

function resolveDeliverableWay(value: unknown): { key: string; address: string } {
  const raw = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const way = raw.way && typeof raw.way === 'object' ? (raw.way as Record<string, unknown>) : {}

  const onPlatform =
    way.on_platform && typeof way.on_platform === 'object'
      ? Number((way.on_platform as Record<string, unknown>).selected)
      : 0
  const session =
    way.session && typeof way.session === 'object'
      ? Number((way.session as Record<string, unknown>).selected)
      : 0
  const workshop =
    way.physical_workshop && typeof way.physical_workshop === 'object'
      ? (way.physical_workshop as Record<string, unknown>)
      : {}

  if (Number(workshop.selected) > 0) {
    return {
      key: 'physical_workshop',
      address: String(workshop.address || '').trim(),
    }
  }

  if (session > 0) return { key: 'session', address: '' }
  if (onPlatform > 0) return { key: 'on_platform', address: '' }

  return { key: 'on_platform', address: '' }
}

function buildServiceComponentSections(params: {
  locale: WizardLocale
  slugs: string[]
  payload: ServiceComponentsPayload
}) {
  const { locale, slugs, payload } = params

  return slugs
    .filter((slug) => slug !== 'target-market')
    .map((slug) => {
      const payloadValue = payload.components?.[slug]

      if (slug === 'deliverable-stage') {
        const raw =
          payloadValue && typeof payloadValue === 'object'
            ? (payloadValue as Record<string, unknown>)
            : {}
        const firstDraft =
          raw.first_draft && typeof raw.first_draft === 'object'
            ? (raw.first_draft as Record<string, unknown>)
            : {}
        const finalVersion =
          raw.final_version && typeof raw.final_version === 'object'
            ? (raw.final_version as Record<string, unknown>)
            : {}

        const firstDraftWay = resolveDeliverableWay(firstDraft)
        const finalVersionWay = resolveDeliverableWay(finalVersion)

        return {
          title: getComponentTitle(locale, slug),
          rows: [
            {
              label: locale === 'ar' ? 'المسودة الأولى' : 'First draft',
              value: [
                `${locale === 'ar' ? 'التاريخ' : 'Date'}: ${String(firstDraft.date || '').trim() || (locale === 'ar' ? 'غير محدد' : 'Not specified')}`,
                `${locale === 'ar' ? 'الصيغ' : 'Formats'}: ${(Array.isArray(firstDraft.report_type) ? firstDraft.report_type : []).map((item) => String(item || '').toUpperCase()).join(', ') || (locale === 'ar' ? 'غير محدد' : 'Not specified')}`,
                `${locale === 'ar' ? 'طريقة التسليم' : 'Delivery mode'}: ${getDeliverableWayLabel(locale, firstDraftWay.key)}`,
                ...(firstDraftWay.address
                  ? [
                      `${locale === 'ar' ? 'العنوان' : 'Address'}: ${firstDraftWay.address}`,
                    ]
                  : []),
              ],
            },
            {
              label: locale === 'ar' ? 'النسخة النهائية' : 'Final version',
              value: [
                `${locale === 'ar' ? 'التاريخ' : 'Date'}: ${String(finalVersion.date || '').trim() || (locale === 'ar' ? 'غير محدد' : 'Not specified')}`,
                `${locale === 'ar' ? 'الصيغ' : 'Formats'}: ${(Array.isArray(finalVersion.report_type) ? finalVersion.report_type : []).map((item) => String(item || '').toUpperCase()).join(', ') || (locale === 'ar' ? 'غير محدد' : 'Not specified')}`,
                `${locale === 'ar' ? 'طريقة التسليم' : 'Delivery mode'}: ${getDeliverableWayLabel(locale, finalVersionWay.key)}`,
                ...(finalVersionWay.address
                  ? [
                      `${locale === 'ar' ? 'العنوان' : 'Address'}: ${finalVersionWay.address}`,
                    ]
                  : []),
              ],
            },
          ],
        }
      }

      if (slug === 'data-sources-expected') {
        const raw =
          payloadValue && typeof payloadValue === 'object'
            ? (payloadValue as Record<string, unknown>)
            : {}
        const primary =
          raw.primary_data && typeof raw.primary_data === 'object'
            ? Number((raw.primary_data as Record<string, unknown>).required)
            : 0
        const secondary =
          raw.secondary_data && typeof raw.secondary_data === 'object'
            ? Number((raw.secondary_data as Record<string, unknown>).required)
            : 0

        let values: string[] = []
        if (primary > 0 && secondary > 0) {
          values = [locale === 'ar' ? 'بيانات أولية وثانوية' : 'Primary and secondary data']
        } else if (primary > 0) {
          values = [locale === 'ar' ? 'بيانات أولية' : 'Primary data']
        } else if (secondary > 0) {
          values = [locale === 'ar' ? 'بيانات ثانوية' : 'Secondary data']
        } else {
          values = [locale === 'ar' ? 'لا يهم' : "Doesn't matter"]
        }

        return {
          title: getComponentTitle(locale, slug),
          rows: [
            {
              label: locale === 'ar' ? 'الاختيار' : 'Selection',
              value: values,
            },
          ],
        }
      }

      const rawAnswer = readStorageValue(
        locale,
        projectWizardStorage.serviceComponentAnswerKey(locale, slug)
      )
      const values = parseStringArray(rawAnswer).map((item) =>
        slug.includes('deliverable-type') ? item.toUpperCase() : item
      )

      if (values.length === 0) return null

      return {
        title: getComponentTitle(locale, slug),
        rows: [
          {
            label: locale === 'ar' ? 'الإجابة' : 'Answer',
            value: values,
          },
        ],
      }
    })
    .filter((section): section is ReviewSection => Boolean(section))
}

function SectionBlock({
  title,
  rows,
  emptyText,
  toneIndex,
  isRTL,
}: {
  title: string
  rows: ReviewRow[]
  emptyText: string
  toneIndex: number
  isRTL: boolean
}) {
  const sectionIcon = sectionIcons[toneIndex % sectionIcons.length]
  const Icon = sectionIcon.icon
  const filledRows = rows.filter((row) => row.value.length > 0).length

  return (
    <section className="border-t border-slate-200 pt-6 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full ${sectionIcon.className}`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.35} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{title}</h2>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((row) => (
          <article
            key={row.label}
            className={`min-w-0 ${rows.length === 1 ? 'sm:col-span-2 xl:col-span-3' : ''}`}
          >
            <div className="mb-2 text-xs font-semibold text-slate-500">{row.label}</div>

            {row.value.length > 0 ? (
              <ul className="space-y-2">
                {row.variant === 'chips' ? (
                  <li className="flex items-start gap-3 text-sm leading-6 text-slate-800">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                    <div className="flex flex-wrap gap-2">
                      {row.value.map((item, itemIndex) => (
                        <span
                          key={`${row.label}-${itemIndex}-${item}`}
                          className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </li>
                ) : (
                  row.value.map((item, itemIndex) => (
                    <li
                      key={`${row.label}-${itemIndex}-${item}`}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-800"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                      <span>{item}</span>
                    </li>
                  ))
                )}
              </ul>
            ) : (
              <div className="text-sm text-slate-400">{emptyText}</div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default function ProjectReviewStep({
  locale,
}: {
  locale: WizardLocale
}) {
  const router = useRouter()
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'

  const [review, setReview] = useState<ReviewData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useProjectStepErrorToast(error, locale)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setError(null)

      const projectUuid = readStoredProjectRequestUuid(locale)

      const rawProjectType = readStorageValue(
        locale,
        projectWizardStorage.projectTypeKey(locale)
      )
      const deliverablesLanguage = readStorageValue(
        locale,
        projectWizardStorage.deliverablesLanguageKey(locale)
      )
      const servicePrompt = readStorageValue(
        locale,
        projectWizardStorage.servicePromptKey(locale)
      )
      const projectStatus = readStorageValue(
        locale,
        projectWizardStorage.projectStatusKey(locale)
      )
      const whoAreYou = readStorageValue(
        locale,
        projectWizardStorage.whoAreYouKey(locale)
      )
      const preferredInsighterType = readStorageValue(
        locale,
        projectWizardStorage.preferredInsighterTypeKey(locale)
      )
      const originType = readStorageValue(
        locale,
        projectWizardStorage.insighterOriginTypeKey(locale)
      )
      const originId = readStorageValue(
        locale,
        projectWizardStorage.insighterOriginIdKey(locale)
      )
      const targetMode = readStorageValue(
        locale,
        projectWizardStorage.targetMarketModeKey(locale)
      )
      const countryIds = safeParseNumberArray(
        readStorageValue(locale, projectWizardStorage.targetMarketCountryIdsKey(locale))
      )
      const regionIds = safeParseNumberArray(
        readStorageValue(locale, projectWizardStorage.targetMarketRegionIdsKey(locale))
      )
      const blocIds = safeParseNumberArray(
        readStorageValue(
          locale,
          projectWizardStorage.targetMarketEconomicBlocIdsKey(locale)
        )
      )

      const needsCountries = originType === 'country' || targetMode === 'country'
      const needsRegions =
        originType === 'region' || targetMode === 'worldwide' || targetMode === 'regions'
      const needsBlocs = targetMode === 'economic'

      let requestData: ProjectRequestData | null = null
      let countries: Country[] = []
      let regions: Region[] = []
      let blocs: EconomicBloc[] = []

      const [requestResult, countriesResult, regionsResult, blocsResult] =
        await Promise.allSettled([
          projectUuid ? fetchProjectRequest(locale, projectUuid) : Promise.resolve(null),
          needsCountries
            ? fetchList<Country>('/api/common/setting/country/list', locale)
            : Promise.resolve([]),
          needsRegions
            ? fetchList<Region>('/api/common/setting/region/list', locale)
            : Promise.resolve([]),
          needsBlocs
            ? fetchList<EconomicBloc>('/api/common/setting/economic-bloc/list', locale)
            : Promise.resolve([]),
        ])

      if (requestResult.status === 'fulfilled') {
        requestData = requestResult.value
      }

      if (countriesResult.status === 'fulfilled') {
        countries = countriesResult.value
      }

      if (regionsResult.status === 'fulfilled') {
        regions = regionsResult.value
      }

      if (blocsResult.status === 'fulfilled') {
        blocs = blocsResult.value
      }

      const firstRejectedResult = [
        requestResult,
        countriesResult,
        regionsResult,
        blocsResult,
      ].find((result) => result.status === 'rejected')

      if (firstRejectedResult && !cancelled) {
        if (!cancelled) {
          setError(
            getProjectApiErrorMessage(
              firstRejectedResult.reason,
              isRTL
                ? 'تعذر تحميل تفاصيل المراجعة.'
                : 'Failed to load review details.'
            )
          )
        }
      }

      const service = requestData?.service || null
      const serviceName =
        service?.name || (isRTL ? 'غير محدد' : 'Not specified')
      const projectTitle = String(requestData?.title || '').trim()
      const headerTitle = projectTitle || (isRTL ? 'ملخص المشروع' : 'Project Summary')

      const originLabel =
        originType === 'country'
          ? countries.find((item) => String(item.id) === originId)
            ? getDisplayName(
                locale,
                countries.find((item) => String(item.id) === originId) as Country
              )
            : originId || (isRTL ? 'غير محدد' : 'Not specified')
          : originType === 'region'
            ? regions.find((item) => String(item.id) === originId)?.name ||
              originId ||
              (isRTL ? 'غير محدد' : 'Not specified')
            : isRTL
              ? 'غير محدد'
              : 'Not specified'

      const targetMarket =
        targetMode === 'country'
          ? countryIds.map((id) => {
              const match = countries.find((item) => item.id === id)
              return match ? getDisplayName(locale, match) : `#${id}`
            })
          : targetMode === 'economic'
            ? blocIds.map((id) => blocs.find((item) => item.id === id)?.name || `#${id}`)
            : targetMode === 'worldwide'
              ? [locale === 'ar' ? 'عالميًا' : 'Worldwide']
              : regionIds.map(
                  (id) => regions.find((item) => item.id === id)?.name || `#${id}`
                )

      const descriptionState = readProjectDescriptionState(locale)
      const addonsState = readProjectAddonsState(locale)
      const scopeSnapshot = readProjectScopeSnapshot(locale)
      const serviceComponentsPayload = readServiceComponentsPayload(locale)
      const serviceComponentSections = buildServiceComponentSections({
        locale,
        slugs: readServiceComponentSlugs(locale),
        payload: serviceComponentsPayload,
      })

      const nextReview: ReviewData = {
        title: headerTitle,
        projectType:
          projectTypeLabel(locale, rawProjectType) ||
          (isRTL ? 'غير محدد' : 'Not specified'),
        deliverablesLanguage:
          deliverablesLanguage || (isRTL ? 'غير محدد' : 'Not specified'),
        service: serviceName,
        projectStatus: projectStatus || (isRTL ? 'غير محدد' : 'Not specified'),
        whoAreYou: whoAreYou || (isRTL ? 'غير محدد' : 'Not specified'),
        preferredInsighterType:
          preferredInsighterType || (isRTL ? 'غير محدد' : 'Not specified'),
        origin: originLabel,
        experienceRange: formatRange(
          readStorageValue(
            locale,
            projectWizardStorage.insighterMinYearsExperienceKey(locale)
          ),
          readStorageValue(
            locale,
            projectWizardStorage.insighterMaxYearsExperienceKey(locale)
          ),
          locale
        ),
        teamSizeRange: formatRange(
          readStorageValue(locale, projectWizardStorage.companyMinTeamSizeKey(locale)),
          readStorageValue(locale, projectWizardStorage.companyMaxTeamSizeKey(locale)),
          locale
        ),
        targetMarket:
          targetMarket.length > 0
            ? targetMarket
            : [isRTL ? 'غير محدد' : 'Not specified'],
        servicePrompt: servicePrompt.trim(),
        description: descriptionState.description,
        descriptionFiles: descriptionState.files,
        scopeSnapshot,
        kickoffMeeting: addonsState.kickoffMeeting.enabled,
        serviceComponentSections,
      }

      if (!cancelled) setReview(nextReview)
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [isRTL, locale])

  const emptyText = isRTL ? 'غير محدد' : 'Not specified'

  const overviewRows = useMemo(() => {
    if (!review) return []

    return [
      { label: isRTL ? 'نوع المشروع' : 'Project type', value: [review.projectType] },
      {
        label: isRTL ? 'لغة المخرجات' : 'Deliverables language',
        value: [review.deliverablesLanguage],
      },
      { label: isRTL ? 'الخدمة' : 'Service', value: [review.service] },
      { label: isRTL ? 'مرحلة المشروع' : 'Project status', value: [review.projectStatus] },
      { label: isRTL ? 'نوع العميل' : 'Business profile', value: [review.whoAreYou] },
    ]
  }, [isRTL, review])

  const scopeRows = useMemo(() => {
    if (!review) return []

    return [
      {
        label: isRTL ? 'النطاق' : 'Scope',
        value: review.scopeSnapshot.flatMap((scope) =>
          scope.subscopes.length > 0
            ? scope.subscopes.map((subscope) => `${scope.name}: ${subscope}`)
            : [scope.name]
        ),
      },
      {
        label: isRTL ? 'ملاحظة الخدمة' : 'Service note',
        value: review.servicePrompt ? [review.servicePrompt] : [],
      },
    ]
  }, [isRTL, review])

  const contextRows = useMemo(() => {
    if (!review) return []

    return [
      {
        label: isRTL ? 'الوصف الإضافي' : 'Additional description',
        value: review.description ? [review.description] : [],
      },
    ]
  }, [isRTL, review])

  const preferenceRows = useMemo(() => {
    if (!review) return []

    return [
      {
        label: isRTL ? 'السوق المستهدف' : 'Target market',
        value: review.targetMarket,
        variant: 'chips' as const,
      },
      {
        label: isRTL ? 'نوع الخبير المفضل' : 'Preferred insighter type',
        value: [review.preferredInsighterType],
      },
      { label: isRTL ? 'الأصل المفضل' : 'Preferred origin', value: [review.origin] },
      {
        label: isRTL ? 'سنوات الخبرة' : 'Experience range',
        value: review.experienceRange === emptyText ? [] : [review.experienceRange],
      },
      {
        label: isRTL ? 'حجم فريق الشركة' : 'Company team size',
        value: review.teamSizeRange === emptyText ? [] : [review.teamSizeRange],
      },
      {
        label: isRTL ? 'اجتماع الانطلاقة' : 'Kickoff meeting',
        value: [
          review.kickoffMeeting
            ? isRTL
              ? 'مطلوب'
              : 'Requested'
            : isRTL
              ? 'غير مطلوب'
              : 'Not requested',
        ],
      },
    ]
  }, [emptyText, isRTL, review])

  if (!review) {
    return (
      <div className="w-full max-w-6xl mx-auto min-h-full flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex-1 overflow-auto rounded-md px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-[980px] rounded-[32px] border border-slate-200 bg-white px-8 py-16">
            <div className="text-center text-base text-slate-600">
              {isRTL ? 'جاري إعداد ملخص المشروع...' : 'Preparing project summary...'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full max-w-6xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 overflow-auto rounded-md px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-[980px] overflow-hidden rounded-[36px] border border-slate-200 bg-white">
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-slate-50">
                    <Image
                      src="/images/smallLogo.png"
                      alt="Foresighta"
                      width={34}
                      height={34}
                      className="h-auto w-auto"
                    />
                  </div>

                  <div className="min-w-0">
                  
                    <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
                      {review.title}
                    </h1>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    {review.projectType}
                  </span>
                  <span className="inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                    {review.service}
                  </span>
                  <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                    {review.deliverablesLanguage}
                  </span>
                </div>
              </div>

             
            </div>

            <div className="mt-8 space-y-6">
              <SectionBlock
                title={isRTL ? 'نظرة عامة' : 'Overview'}
                rows={overviewRows}
                emptyText={emptyText}
                toneIndex={0}
                isRTL={isRTL}
              />

              <SectionBlock
                title={isRTL ? 'النطاق والمخرجات' : 'Scope and deliverables'}
                rows={scopeRows}
                emptyText={emptyText}
                toneIndex={1}
                isRTL={isRTL}
              />

              <SectionBlock
                title={isRTL ? 'السوق وتفضيلات الخبير' : 'Market and expert preferences'}
                rows={preferenceRows}
                emptyText={emptyText}
                toneIndex={2}
                isRTL={isRTL}
              />

              {review.serviceComponentSections.map((section, index) => (
                <SectionBlock
                  key={section.title}
                  title={section.title}
                  rows={section.rows}
                  emptyText={emptyText}
                  toneIndex={index + 3}
                  isRTL={isRTL}
                />
              ))}

              <SectionBlock
                title={isRTL ? 'تفاصيل إضافية' : 'Additional details'}
                rows={contextRows}
                emptyText={emptyText}
                toneIndex={review.serviceComponentSections.length + 3}
                isRTL={isRTL}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3 rounded-full px-3 py-3">
            <Link
              href={nav.backHref}
              className="btn-sm rounded-full border border-slate-200 bg-white px-5 text-slate-700 hover:bg-slate-50"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={() => router.push(`/${locale}/project`)}
              className="btn-sm rounded-full bg-[#1C7CBB] px-6 py-2 text-white hover:bg-opacity-90"
            >
              {isRTL ? 'إنهاء' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
