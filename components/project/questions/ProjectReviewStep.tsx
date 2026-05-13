'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import { syncProjectProperties } from '@/components/project/projectPropertiesSync'
import { readStoredProjectRequestUuid } from '@/components/project/projectRequestUuid'
import { readProjectAddonsState, readProjectScopeSnapshot } from '../projectAddonsState'
import { projectTypeLabel } from '../projectLabels'
import { readProjectDescriptionState } from '../projectDescriptionState'
import {
  readServiceComponentsPayload,
  type ServiceComponentsPayload,
} from '../serviceComponentsPayload'
import { projectWizardStepIds, readServiceComponentSlugs } from '../projectWizardFlow'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

type Country = {
  id: number
  name?: string | { en?: string; ar?: string }
  names?: { en?: string; ar?: string }
}

type Region = {
  id: number
  name?: string | { en?: string; ar?: string }
  names?: { en?: string; ar?: string }
}

type EconomicBloc = {
  id: number
  name?: string | { en?: string; ar?: string }
  names?: { en?: string; ar?: string }
}

type LocalizedName = {
  en?: string
  ar?: string
}

type DisplayNameValue = {
  name?: string | LocalizedName | null
  names?: LocalizedName | null
}

type RequestService = {
  id: number
  name: string
  slug?: string
}

type ProjectRequestComponent = Record<string, unknown>

type ProjectRequestData = {
  id: number
  uuid?: string
  title?: string | null
  type?: string | null
  service?: RequestService | null
  service_prompt?: string | null
  phase?: string | null
  business_type?: string | null
  insighter_preferred_type?: string | null
  insighter_origin?: {
    id: number
    name?: string | LocalizedName | null
    names?: LocalizedName | null
  } | null
  insighter_min_years_experience?: number | string | null
  insighter_max_years_experience?: number | string | null
  company_min_team_size?: number | string | null
  company_max_team_size?: number | string | null
  description?: string | null
  components?: ProjectRequestComponent[] | null
}

type ReviewRow = {
  label: string
  value: string[]
  fileTypes?: string[]
  variant?: 'default' | 'chips'
  editStepId?: string
  wide?: boolean
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
  deadline: string
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


const fileTypeIconMap: Record<string, string> = {
  pdf: '/file-icons/pdf.svg',
  doc: '/file-icons/doc.svg',
  docx: '/file-icons/docx.svg',
  xls: '/file-icons/xls.svg',
  xlsx: '/file-icons/xlsx.svg',
  ppt: '/file-icons/ppt.svg',
  pptx: '/file-icons/pptx.svg',
  csv: '/file-icons/csv.svg',
  txt: '/file-icons/txt.svg',
  zip: '/file-icons/zip.svg',
  rar: '/file-icons/zip.svg',
  jpg: '/file-icons/jpg.svg',
  jpeg: '/file-icons/jpg.svg',
  mp3: '/file-icons/mp3.svg',
  mp4: '/file-icons/mp4.svg',
  pub: '/file-icons/pub.svg',
}

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

function normalizeValue(value: unknown): string {
  return String(value || '')
    .trim()
    .toLowerCase()
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getDisplayName(locale: WizardLocale, value: DisplayNameValue) {
  const localizedName =
    value.names ||
    (value.name && typeof value.name === 'object' ? (value.name as LocalizedName) : null)
  const plainName = typeof value.name === 'string' ? value.name : ''

  if (locale === 'ar') {
    return localizedName?.ar || plainName || localizedName?.en || ''
  }

  return localizedName?.en || plainName || localizedName?.ar || ''
}

function getFileIconByExtension(extension: string): string {
  return fileTypeIconMap[normalizeValue(extension)] || fileTypeIconMap.txt
}

function formatProjectPhase(locale: WizardLocale, value: string): string {
  const normalized = normalizeValue(value)

  if (
    normalized === 'idea stage' ||
    normalized === 'idea' ||
    normalized === 'idea_stage' ||
    normalized === 'مرحلة الفكرة'
  ) {
    return locale === 'ar' ? 'مرحلة الفكرة' : 'Idea stage'
  }

  if (normalized === 'expansion' || normalized === 'التوسع') {
    return locale === 'ar' ? 'التوسع' : 'Expansion'
  }

  if (normalized === 'implementation' || normalized === 'التنفيذ') {
    return locale === 'ar' ? 'التنفيذ' : 'Implementation'
  }

  return stringifyValue(value)
}

function formatBusinessType(locale: WizardLocale, value: string): string {
  const normalized = normalizeValue(value)
  const labels: Record<string, { en: string; ar: string }> = {
    entrepreneur: { en: 'Entrepreneur', ar: 'رائد أعمال' },
    'رائد أعمال': { en: 'Entrepreneur', ar: 'رائد أعمال' },
    startup: { en: 'Startup', ar: 'شركة ناشئة' },
    'شركة ناشئة': { en: 'Startup', ar: 'شركة ناشئة' },
    sme: { en: 'SME', ar: 'شركة صغيرة/متوسطة' },
    'شركة صغيرة/متوسطة': { en: 'SME', ar: 'شركة صغيرة/متوسطة' },
    company: { en: 'Company', ar: 'شركة' },
    'شركة': { en: 'Company', ar: 'شركة' },
    organization: { en: 'Organization', ar: 'منظمة' },
    'منظمة': { en: 'Organization', ar: 'منظمة' },
    government: { en: 'Government', ar: 'حكومة' },
    'حكومة': { en: 'Government', ar: 'حكومة' },
  }

  const match = labels[normalized]
  if (!match) return stringifyValue(value)
  return locale === 'ar' ? match.ar : match.en
}

function formatPreferredInsighterType(locale: WizardLocale, value: string): string {
  const normalized = normalizeValue(value)

  if (normalized === 'individual' || normalized === 'فرد') {
    return locale === 'ar' ? 'فرد' : 'Individual'
  }

  if (normalized === 'company' || normalized === 'شركة') {
    return locale === 'ar' ? 'شركة' : 'Company'
  }

  if (
    normalized === 'either' ||
    normalized === 'any' ||
    normalized === 'كلاهما' ||
    normalized === 'أيهما' ||
    normalized === 'لا مانع'
  ) {
    return locale === 'ar' ? 'كلاهما' : 'Any'
  }

  return stringifyValue(value)
}

function normalizeProjectComponents(
  components: ProjectRequestComponent[] | null | undefined
): ServiceComponentsPayload {
  if (!Array.isArray(components)) return { components: {} }

  return {
    components: components.reduce<Record<string, unknown>>((acc, item) => {
      if (!item || typeof item !== 'object') return acc

      for (const [slug, value] of Object.entries(item)) {
        acc[slug] = value
      }

      return acc
    }, {}),
  }
}

function getTargetMarketLabels(locale: WizardLocale, value: unknown): string[] {
  if (!value || typeof value !== 'object') return []

  const raw = value as Record<string, unknown>
  const objects = Array.isArray(raw.objects) ? raw.objects : []

  return objects
    .map((item) => {
      if (!item || typeof item !== 'object') return stringifyValue(item)
      return getDisplayName(locale, item as DisplayNameValue)
    })
    .filter(Boolean)
}

function getReportTypes(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => stringifyValue(item).toLowerCase()).filter(Boolean)
  }

  const singleValue = stringifyValue(value).toLowerCase()
  return singleValue ? [singleValue] : []
}

function getDataSourceValues(locale: WizardLocale, value: unknown): string[] {
  const fallback = [locale === 'ar' ? 'لا يهم' : "Doesn't matter"]
  const normalizedValue = normalizeValue(value)

  if (
    normalizedValue === 'primary_and_secondary_data' ||
    normalizedValue === 'both' ||
    normalizedValue === 'primary_secondary'
  ) {
    return [locale === 'ar' ? 'بيانات أولية وثانوية' : 'Primary and secondary data']
  }

  if (normalizedValue === 'primary_data') {
    return [locale === 'ar' ? 'بيانات أولية' : 'Primary data']
  }

  if (normalizedValue === 'secondary_data') {
    return [locale === 'ar' ? 'بيانات ثانوية' : 'Secondary data']
  }

  if (!value || typeof value !== 'object') return fallback

  const raw = value as Record<string, unknown>
  const primary =
    raw.primary_data && typeof raw.primary_data === 'object'
      ? Number((raw.primary_data as Record<string, unknown>).required)
      : 0
  const secondary =
    raw.secondary_data && typeof raw.secondary_data === 'object'
      ? Number((raw.secondary_data as Record<string, unknown>).required)
      : 0

  if (primary > 0 && secondary > 0) {
    return [locale === 'ar' ? 'بيانات أولية وثانوية' : 'Primary and secondary data']
  }

  if (primary > 0) {
    return [locale === 'ar' ? 'بيانات أولية' : 'Primary data']
  }

  if (secondary > 0) {
    return [locale === 'ar' ? 'بيانات ثانوية' : 'Secondary data']
  }

  return fallback
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

  const res = await fetch(getApiUrl(`/api/account/project/show/${projectUuid}`), {
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
  if (!match) return stringifyValue(value)
  return locale === 'ar' ? match.ar : match.en
}

function resolveDeliverableWay(value: unknown): { key: string; address: string } {
  const raw = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const way = raw.way && typeof raw.way === 'object' ? (raw.way as Record<string, unknown>) : {}

  const selected = stringifyValue(way.selected)
  if (selected) {
    return {
      key: selected,
      address: stringifyValue(way.address),
    }
  }

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
}): ReviewSection[] {
  const { locale, slugs, payload } = params

  return slugs
    .filter((slug) => slug !== 'target-market')
    .map<ReviewSection | null>((slug) => {
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
        const firstDraftReportTypes = getReportTypes(firstDraft.report_type)
        const finalVersionReportTypes = getReportTypes(finalVersion.report_type)
        const notSpecified = locale === 'ar' ? 'غير محدد' : 'Not specified'

        return {
          title: getComponentTitle(locale, slug),
          rows: [
            {
              label: locale === 'ar' ? 'تاريخ المسودة الأولى' : 'First draft date',
              value: [String(firstDraft.date || '').trim() || notSpecified],
              editStepId: 'deliverable-first-draft-date',
            },
            {
              label: locale === 'ar' ? 'طريقة تسليم المسودة الأولى' : 'First draft delivery mode',
              value: [
                getDeliverableWayLabel(locale, firstDraftWay.key),
                ...(firstDraftWay.address
                  ? [`${locale === 'ar' ? 'العنوان' : 'Address'}: ${firstDraftWay.address}`]
                  : []),
              ],
              editStepId: 'deliverable-first-draft-way',
            },
            {
              label: locale === 'ar' ? 'صيغ المسودة الأولى' : 'First draft formats',
              value: firstDraftReportTypes.length === 0 ? [notSpecified] : [],
              fileTypes: firstDraftReportTypes,
              editStepId: 'deliverable-first-draft-type',
            },
            {
              label: locale === 'ar' ? 'تاريخ النسخة النهائية' : 'Final version date',
              value: [String(finalVersion.date || '').trim() || notSpecified],
              editStepId: 'deliverable-final-version-date',
            },
            {
              label: locale === 'ar' ? 'طريقة تسليم النسخة النهائية' : 'Final version delivery mode',
              value: [
                getDeliverableWayLabel(locale, finalVersionWay.key),
                ...(finalVersionWay.address
                  ? [`${locale === 'ar' ? 'العنوان' : 'Address'}: ${finalVersionWay.address}`]
                  : []),
              ],
              editStepId: 'deliverable-final-version-way',
            },
            {
              label: locale === 'ar' ? 'صيغ النسخة النهائية' : 'Final version formats',
              value: finalVersionReportTypes.length === 0 ? [notSpecified] : [],
              fileTypes: finalVersionReportTypes,
              editStepId: 'deliverable-final-version-type',
            },
          ],
        }
      }

      if (slug === 'data-sources-expected') {
        return {
          title: getComponentTitle(locale, slug),
          rows: [
            {
              label: locale === 'ar' ? 'الاختيار' : 'Selection',
              value: getDataSourceValues(locale, payloadValue),
              editStepId: 'data-sources-expected',
            },
          ],
        }
      }

      const rawAnswer = readStorageValue(
        locale,
        projectWizardStorage.serviceComponentAnswerKey(locale, slug)
      )
      const payloadValues = Array.isArray(payloadValue)
        ? payloadValue.map((item) => stringifyValue(item)).filter(Boolean)
        : payloadValue !== null &&
          payloadValue !== undefined &&
          typeof payloadValue !== 'object'
          ? [stringifyValue(payloadValue)].filter(Boolean)
          : []
      const values = (
        payloadValues.length > 0 ? payloadValues : parseStringArray(rawAnswer)
      ).map((item) => (slug.includes('deliverable-type') ? item.toUpperCase() : item))

      if (values.length === 0) return null

      return {
        title: getComponentTitle(locale, slug),
        rows: [
          {
            label: locale === 'ar' ? 'الإجابة' : 'Answer',
            value: values,
            editStepId: slug,
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
  editLabel,
  editHrefFor,
}: {
  title: string
  rows: ReviewRow[]
  emptyText: string
  toneIndex: number
  isRTL: boolean
  editLabel: string
  editHrefFor: (stepId: string) => string
}) {
  const sectionIcon = sectionIcons[toneIndex % sectionIcons.length]
  const Icon = sectionIcon.icon

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
            className={`min-w-0 ${
              rows.length === 1
                ? 'sm:col-span-2 xl:col-span-3'
                : row.wide
                  ? 'sm:col-span-2 xl:col-span-2'
                  : ''
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="text-xs font-semibold text-slate-500">{row.label}</div>
              {row.editStepId ? (
                <Link
                  href={editHrefFor(row.editStepId)}
                  title={`${editLabel}: ${row.label}`}
                  aria-label={`${editLabel}: ${row.label}`}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.83073 2.62588C10.6606 1.79601 12.0061 1.79601 12.8359 2.62588L14.3741 4.16408C15.204 4.99394 15.204 6.33941 14.3741 7.16928L6.87587 14.6675C6.74303 14.8004 6.56286 14.875 6.375 14.875H2.83333C2.44213 14.875 2.125 14.5579 2.125 14.1667V10.625C2.125 10.4371 2.19963 10.257 2.33247 10.1241L9.83073 2.62588ZM11.8342 3.62761C11.5576 3.35099 11.1091 3.35099 10.8325 3.62761L10.2101 4.25001L12.75 6.78994L13.3724 6.16754C13.649 5.89092 13.649 5.44243 13.3724 5.16581L11.8342 3.62761ZM11.7483 7.79168L9.20833 5.25174L3.54167 10.9184V13.4583H6.0816L11.7483 7.79168Z" fill="#00A028"/>
</svg>

                </Link>
              ) : null}
            </div>

            {row.value.length > 0 || (row.fileTypes?.length ?? 0) > 0 ? (
              <div className="space-y-3">
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
                ) : null}

                {row.fileTypes && row.fileTypes.length > 0 ? (
                  <div>
                    {row.value.length > 0 ? (
                      <div className="mb-2 text-xs font-semibold text-slate-500">
                        {isRTL ? 'الصيغ' : 'Formats'}
                      </div>
                    ) : null}
                    <ul className="space-y-2">
                      {row.fileTypes.map((fileType, itemIndex) => (
                        <li
                          key={`${row.label}-file-${itemIndex}-${fileType}`}
                          className="flex items-center gap-3 text-sm leading-6 text-slate-800"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                          <Image
                            src={getFileIconByExtension(fileType)}
                            alt={fileType.toUpperCase()}
                            width={18}
                            height={18}
                            className="h-[23px] w-[18px]"
                          />
                          <span>{fileType.toUpperCase()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
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
  const [submitting, setSubmitting] = useState(false)

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
      const storedServiceLabel = readStorageValue(
        locale,
        projectWizardStorage.serviceLabelKey(locale)
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
      const projectDeadline = readStorageValue(
        locale,
        projectWizardStorage.deadlineKey(locale)
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
        storedServiceLabel || service?.name || (isRTL ? 'غير محدد' : 'Not specified')
      const projectTitle = String(requestData?.title || '').trim()
      const headerTitle = projectTitle || (isRTL ? 'ملخص المشروع' : 'Project Summary')

      const storedOriginLabel =
        originType === 'country'
          ? countries.find((item) => String(item.id) === originId)
            ? getDisplayName(
              locale,
              countries.find((item) => String(item.id) === originId) as Country
            )
            : originId
          : originType === 'region'
            ? getDisplayName(
              locale,
              (regions.find((item) => String(item.id) === originId) as Region) || {}
            ) || originId
            : ''
      const originLabel =
        storedOriginLabel ||
        (requestData?.insighter_origin
          ? getDisplayName(locale, requestData.insighter_origin)
          : isRTL
            ? 'غير محدد'
            : 'Not specified')

      const targetMarket =
        targetMode === 'country'
          ? countryIds.map((id) => {
            const match = countries.find((item) => item.id === id)
            return match ? getDisplayName(locale, match) : `#${id}`
          })
          : targetMode === 'economic'
            ? blocIds.map((id) => {
              const match = blocs.find((item) => item.id === id)
              return match ? getDisplayName(locale, match) : `#${id}`
            })
            : targetMode === 'worldwide'
              ? [locale === 'ar' ? 'عالميًا' : 'Worldwide']
              : regionIds.map(
                (id) =>
                  getDisplayName(
                    locale,
                    (regions.find((item) => item.id === id) as Region) || {}
                  ) || `#${id}`
              )

      const descriptionState = readProjectDescriptionState(locale)
      const addonsState = readProjectAddonsState(locale)
      const scopeSnapshot = readProjectScopeSnapshot(locale)
      const storedServiceComponentsPayload = readServiceComponentsPayload(locale)
      const apiServiceComponentsPayload = normalizeProjectComponents(requestData?.components)
      const serviceComponentsPayload: ServiceComponentsPayload = {
        components: {
          ...(apiServiceComponentsPayload.components || {}),
          ...(storedServiceComponentsPayload.components || {}),
        },
      }
      const serviceComponentSlugs = Array.from(
        new Set([
          ...readServiceComponentSlugs(locale),
          ...Object.keys(serviceComponentsPayload.components || {}),
        ])
      )
      const apiTargetMarket = getTargetMarketLabels(
        locale,
        serviceComponentsPayload.components?.['target-market']
      )
      const serviceComponentSections = buildServiceComponentSections({
        locale,
        slugs: serviceComponentSlugs,
        payload: serviceComponentsPayload,
      })

      const projectTypeValue = projectTypeLabel(
        locale,
        rawProjectType || stringifyValue(requestData?.type) || null
      )
      const projectStatusValue = formatProjectPhase(
        locale,
        projectStatus || stringifyValue(requestData?.phase)
      )
      const businessTypeValue = formatBusinessType(
        locale,
        whoAreYou || stringifyValue(requestData?.business_type)
      )
      const preferredInsighterTypeValue = formatPreferredInsighterType(
        locale,
        preferredInsighterType || stringifyValue(requestData?.insighter_preferred_type)
      )
      const insighterMinYearsExperience =
        readStorageValue(locale, projectWizardStorage.insighterMinYearsExperienceKey(locale)) ||
        stringifyValue(requestData?.insighter_min_years_experience)
      const insighterMaxYearsExperience =
        readStorageValue(locale, projectWizardStorage.insighterMaxYearsExperienceKey(locale)) ||
        stringifyValue(requestData?.insighter_max_years_experience)
      const companyMinTeamSize =
        readStorageValue(locale, projectWizardStorage.companyMinTeamSizeKey(locale)) ||
        stringifyValue(requestData?.company_min_team_size)
      const companyMaxTeamSize =
        readStorageValue(locale, projectWizardStorage.companyMaxTeamSizeKey(locale)) ||
        stringifyValue(requestData?.company_max_team_size)

      const nextReview: ReviewData = {
        title: headerTitle,
        projectType: projectTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
        deliverablesLanguage:
          deliverablesLanguage || (isRTL ? 'غير محدد' : 'Not specified'),
        service: serviceName,
        projectStatus: projectStatusValue || (isRTL ? 'غير محدد' : 'Not specified'),
        whoAreYou: businessTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
        preferredInsighterType:
          preferredInsighterTypeValue || (isRTL ? 'غير محدد' : 'Not specified'),
        origin: originLabel,
        experienceRange: formatRange(
          insighterMinYearsExperience,
          insighterMaxYearsExperience,
          locale
        ),
        teamSizeRange: formatRange(
          companyMinTeamSize,
          companyMaxTeamSize,
          locale
        ),
        targetMarket:
          targetMarket.length > 0
            ? targetMarket
            : apiTargetMarket.length > 0
              ? apiTargetMarket
              : [isRTL ? 'غير محدد' : 'Not specified'],
        deadline: projectDeadline,
        servicePrompt: servicePrompt.trim() || stringifyValue(requestData?.service_prompt),
        description: descriptionState.description || stringifyValue(requestData?.description),
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
  const editLabel = isRTL ? 'تعديل' : 'Edit'

  const overviewRows = useMemo(() => {
    if (!review) return []

    return [
      {
        label: isRTL ? 'نوع المشروع' : 'Project type',
        value: [review.projectType],
        editStepId: projectWizardStepIds.projectType,
      },
      {
        label: isRTL ? 'لغة المخرجات' : 'Deliverables language',
        value: [review.deliverablesLanguage],
        editStepId: projectWizardStepIds.deliverablesLanguage,
      },
      {
        label: isRTL ? 'الخدمة' : 'Service',
        value: [review.service],
        editStepId: projectWizardStepIds.service,
      },
      {
        label: isRTL ? 'مرحلة المشروع' : 'Project status',
        value: [review.projectStatus],
        editStepId: projectWizardStepIds.projectStatus,
      },
      {
        label: isRTL ? 'نوع العميل' : 'Business profile',
        value: [review.whoAreYou],
        editStepId: projectWizardStepIds.whoAreYou,
      },
      {
        label: isRTL ? 'موعد التسليم' : 'Delivery deadline',
        value: review.deadline ? [review.deadline] : [],
        editStepId: projectWizardStepIds.projectDeadline,
      },
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
        editStepId: projectWizardStepIds.projectSubscopes,
      },
      {
        label: isRTL ? 'ملاحظة الخدمة' : 'Service note',
        value: review.servicePrompt ? [review.servicePrompt] : [],
        editStepId: projectWizardStepIds.service,
      },
    ]
  }, [isRTL, review])

  const contextRows = useMemo(() => {
    if (!review) return []

    return [
      {
        label: isRTL ? 'الوصف الإضافي' : 'Additional description',
        value: review.description ? [review.description] : [],
        editStepId: projectWizardStepIds.projectDescription,
        wide: true,
      },
      {
        label: isRTL ? 'الملفات المرفقة' : 'Attachments',
        value: review.descriptionFiles.map(
          (file) => `${file.name} (${formatBytes(file.size)})`
        ),
        editStepId: projectWizardStepIds.projectDescription,
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
        editStepId: 'target-market',
      },
      {
        label: isRTL ? 'نوع الخبير المفضل' : 'Preferred insighter type',
        value: [review.preferredInsighterType],
        editStepId: projectWizardStepIds.preferredInsighterType,
      },
      {
        label: isRTL ? 'الأصل المفضل' : 'Preferred origin',
        value: [review.origin],
        editStepId: projectWizardStepIds.insighterOrigin,
      },
      {
        label: isRTL ? 'سنوات الخبرة' : 'Experience range',
        value: review.experienceRange === emptyText ? [] : [review.experienceRange],
        editStepId: projectWizardStepIds.insighterExperience,
      },
      {
        label: isRTL ? 'حجم فريق الشركة' : 'Company team size',
        value: review.teamSizeRange === emptyText ? [] : [review.teamSizeRange],
        editStepId: projectWizardStepIds.companyTeamSize,
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
        editStepId: projectWizardStepIds.kickoffMeeting,
      },
    ]
  }, [emptyText, isRTL, review])

  const onContinue = async () => {
    if (submitting) return

    setSubmitting(true)
    setError(null)

    try {
      await syncProjectProperties(locale)
      router.push(nav.nextHref || `/${locale}/project`)
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? 'تعذر حفظ التعديلات قبل المتابعة.' : 'Failed to save edits before continuing.'
        )
      )
    } finally {
      setSubmitting(false)
    }
  }

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
      <div className="flex-1 overflow-auto rounded-md px-4 pb-32 pt-8 sm:px-6 sm:pb-8">
        <div className="mx-auto max-w-[980px] overflow-hidden rounded-[36px] border border-slate-200 bg-white">
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[20px]">
                    <Image
                      src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1777619443/smallLogo_3_wnmkra.png"
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
                editLabel={editLabel}
                editHrefFor={nav.editHrefFor}
              />

              <SectionBlock
                title={isRTL ? 'النطاق والمخرجات' : 'Scope and deliverables'}
                rows={scopeRows}
                emptyText={emptyText}
                toneIndex={1}
                isRTL={isRTL}
                editLabel={editLabel}
                editHrefFor={nav.editHrefFor}
              />

              <SectionBlock
                title={isRTL ? 'السوق وتفضيلات الخبير' : 'Market and expert preferences'}
                rows={preferenceRows}
                emptyText={emptyText}
                toneIndex={2}
                isRTL={isRTL}
                editLabel={editLabel}
                editHrefFor={nav.editHrefFor}
              />

              {review.serviceComponentSections.map((section, index) => (
                <SectionBlock
                  key={section.title}
                  title={section.title}
                  rows={section.rows}
                  emptyText={emptyText}
                  toneIndex={index + 3}
                  isRTL={isRTL}
                  editLabel={editLabel}
                  editHrefFor={nav.editHrefFor}
                />
              ))}

              <SectionBlock
                title={isRTL ? 'تفاصيل إضافية' : 'Additional details'}
                rows={contextRows}
                emptyText={emptyText}
                toneIndex={review.serviceComponentSections.length + 3}
                isRTL={isRTL}
                editLabel={editLabel}
                editHrefFor={nav.editHrefFor}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm rounded-full border border-slate-200 bg-white px-6 py-2 text-slate-700 hover:bg-slate-50"
            >
              {isRTL ? 'رجوع' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={() => void onContinue()}
              disabled={submitting}
              className={`btn-sm rounded-full px-6 py-2 ${
                submitting
                  ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                  : 'bg-[#1C7CBB] text-white hover:bg-opacity-90'
              }`}
            >
              {submitting ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
