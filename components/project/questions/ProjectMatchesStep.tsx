'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { getApiUrl } from '@/app/config'
import { getAuthToken } from '@/lib/authToken'
import {
  assertProjectApiResponse,
  getProjectApiErrorMessage,
} from '@/components/project/projectApiError'
import {
  readStoredSelectedMatchIds,
  writeStoredSelectedMatchIds,
} from '@/components/project/projectProposalSubmit'
import {
  clearStoredProposalMatchUuid,
  writeStoredProposalMatchUuid,
} from '@/components/project/projectProposalMatchUuid'
import { readStoredProjectRequestUuid } from '@/components/project/projectRequestUuid'
import { useProjectStepErrorToast } from '../useProjectStepErrorToast'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'

type PreferredInsighterTypeFilter = 'Individual' | 'Company' | 'Either'

type LocalizedName = {
  en?: string
  ar?: string
}

type MatchCountry = {
  id?: number
  name?: string | LocalizedName | null
  names?: LocalizedName | null
  flag?: string | null
}

type MatchCompany = {
  uuid?: string
  legal_name?: string | null
  logo?: string | null
  verified?: boolean | null
}

type MatchInsighter = {
  uuid: string
  name: string
  profile_photo_url?: string | null
  roles?: string[]
  country?: MatchCountry | null
  company?: MatchCompany | null
}

type MatchCriteria = Record<string, boolean | undefined>

type MatchedInsighter = {
  uuid: string
  insighter: MatchInsighter
  match_score: number
  is_match_all_properties?: boolean
  status?: string | null
  matches?: MatchCriteria
}

type MatchApiResponse = {
  data?:
  | MatchedInsighter[]
  | {
    uuid?: string
    status?: string | null
    deadline_offer?: string | null
    total_matches?: number
    matches?: MatchedInsighter[]
  }
}

type MatchFetchResult = {
  proposalMatchUuid: string
  matches: MatchedInsighter[]
}

type LoaderMatchCard = {
  insighter: MatchInsighter
}

const MATCH_LOADER_DURATION_MS = 10000

const loaderMatchCards: LoaderMatchCard[] = [
  {
    insighter: {
      uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      name: 'Rami Hamam',
      profile_photo_url:
        'https://knoldg-common.s3.us-east-1.amazonaws.com/user/116/profile/1764053205_Rami Hamam-2025.png',
      roles: ['client', 'insighter'],
      country: {
        id: 79,
        name: 'Jordan',
        flag: 'jordan',
      },
    },
  },
  {
    insighter: {
      uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      name: 'Dr. Mohammed Ruzayqat',
      profile_photo_url: null,
      roles: ['client', 'insighter'],
      country: {
        id: 127,
        name: 'Germany',
        flag: 'germany',
      },
    },
  },
  {
    insighter: {
      uuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      name: 'Samara Qamar',
      profile_photo_url: null,
      roles: ['client', 'insighter'],
      country: {
        id: 79,
        name: 'Jordan',
        flag: 'jordan',
      },
    },
  },
  {
    insighter: {
      uuid: 'd4e5f6a7-b8c9-0123-defa-234567890123',
      name: 'Dr.NASIM ZOMOT',
      profile_photo_url:
        'https://knoldg-common.s3.us-east-1.amazonaws.com/user/115/profile/1764018116_WhatsApp Image 2025-11-25 at 00.01.36.jpeg',
      roles: ['client', 'insighter'],
      country: {
        id: 97,
        name: 'Saudi Arabia',
        flag: 'saudi-arabia',
      },
    },
  },
  {
    insighter: {
      uuid: 'e1f2a3b4-c5d6-7890-efab-123456789012',
      name: 'Mohammad Tamalli',
      profile_photo_url:
        'https://knoldg-common.s3.us-east-1.amazonaws.com/user/119/profile/1764175593_1758390021329.jpg',
      roles: ['client', 'insighter'],
      country: {
        id: 79,
        name: 'Jordan',
        flag: 'jordan',
      },
    },
  },

  {
    insighter: {
      uuid: 'a3b4c5d6-e7f8-9012-abcd-345678901234',
      name: 'maalikchina',
      profile_photo_url: null,
      roles: ['client', 'insighter'],
      country: {
        id: 97,
        name: 'Saudi Arabia',
        flag: 'saudi-arabia',
      },
    },
  },
  {
    insighter: {
      uuid: 'e5f6a7b8-c9d0-1234-efab-345678901234',
      name: 'Khaled Khraisat',
      profile_photo_url:
        'https://knoldg-common.s3.us-east-1.amazonaws.com/user/268/profile/1774433730_20240914_233048.jpg',
      roles: ['client', 'company'],
      country: {
        id: 79,
        name: 'Jordan',
        flag: 'jordan',
      },
      company: {
        uuid: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
        legal_name: 'ACADEMIA INDUSTRY PLATFORM',
        logo: 'https://knoldg-common.s3.us-east-1.amazonaws.com/insighter/company/6/logo/1774434781_high resolution .jpg',
        verified: true,
      },
    },
  },
  {
    insighter: {
      uuid: 'a7b8c9d0-e1f2-3456-abcd-567890123456',
      name: 'Dr. Nasim Zomot',
      profile_photo_url:
        'https://knoldg-common.s3.us-east-1.amazonaws.com/user/139/profile/1773524319_WhatsApp Image 2025-11-25 at 00.01.36.jpeg',
      roles: ['client', 'company'],
      country: {
        id: 108,
        name: 'United Arab Emirates',
        flag: 'united-arab-emirates',
      },
      company: {
        uuid: 'b8c9d0e1-f2a3-4567-bcde-678901234567',
        legal_name: 'FORESIGHTA CONSULTING',
        logo: 'https://knoldg-common.s3.us-east-1.amazonaws.com/insighter/company/5/logo/1773523880_foresighta_logo_icon_359X355_colored.jpg',
        verified: true,
      },
    },
  },
  {
    insighter: {
      uuid: 'c9d0e1f2-a3b4-5678-cdef-789012345678',
      name: 'د. نسيم زعمط',
      profile_photo_url:
        'https://knoldg-common.s3.us-east-1.amazonaws.com/user/140/profile/1767809948_WhatsApp Image 2024-05-27 at 09.31.04.jpeg',
      roles: ['client', 'company'],
      country: {
        id: 97,
        name: 'Saudi Arabia',
        flag: 'saudi-arabia',
      },
      company: {
        uuid: 'd0e1f2a3-b4c5-6789-defa-890123456789',
        legal_name: 'نظم المستقبل للاستشارات',
        logo: 'https://knoldg-common.s3.us-east-1.amazonaws.com/insighter/company/3/logo/1767808147_fs logo small.jpeg',
        verified: true,
      },
    },
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

function normalizeValue(value: unknown): string {
  return String(value || '')
    .trim()
    .toLowerCase()
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

function getDisplayName(
  locale: WizardLocale,
  value: { name?: string | LocalizedName | null; names?: LocalizedName | null }
) {
  const localizedName =
    value.names ||
    (value.name && typeof value.name === 'object' ? (value.name as LocalizedName) : null)
  const plainName = typeof value.name === 'string' ? value.name : ''

  if (locale === 'ar') {
    return localizedName?.ar || plainName || localizedName?.en || ''
  }

  return localizedName?.en || plainName || localizedName?.ar || ''
}

async function fetchMatchedInsighters(
  locale: WizardLocale,
  projectUuid: string,
  signal?: AbortSignal
): Promise<MatchFetchResult> {
  const token = getAuthToken()
  if (!token) {
    throw new Error(
      locale === 'ar'
        ? 'يلزم تسجيل الدخول للبحث عن المطابقات.'
        : 'Login is required to search for matches.'
    )
  }

  const res = await fetch(
    getApiUrl(`/api/account/project/proposal/match/default/${projectUuid}`),
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Accept-Language': locale === 'ar' ? 'ar' : 'en',
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      cache: 'no-store',
      signal,
    }
  )

  await assertProjectApiResponse(res)

  const json = (await res.json()) as MatchApiResponse

  if (Array.isArray(json.data)) {
    return {
      proposalMatchUuid: '',
      matches: json.data,
    }
  }

  if (json.data && Array.isArray(json.data.matches)) {
    return {
      proposalMatchUuid: stringifyValue(json.data.uuid),
      matches: json.data.matches,
    }
  }

  return {
    proposalMatchUuid: '',
    matches: [],
  }
}

function normalizePreferredInsighterTypeSelection(
  value: string
): PreferredInsighterTypeFilter {
  const normalized = normalizeValue(value)

  if (normalized === 'company' || normalized === 'شركة') return 'Company'
  if (normalized === 'either' || normalized === 'any' || normalized === 'كلاهما') {
    return 'Either'
  }

  return 'Individual'
}

function isCompanyLikeInsighter(roles: string[] | null | undefined): boolean {
  return (roles || []).some((role) => {
    const normalized = normalizeValue(role)
    return normalized === 'company' || normalized === 'company-insighter'
  })
}

function filterLoaderCardsByPreferredType(
  cards: LoaderMatchCard[],
  preferredType: PreferredInsighterTypeFilter
): LoaderMatchCard[] {
  if (preferredType === 'Either') return cards
  if (preferredType === 'Company') {
    return cards.filter((card) => isCompanyLikeInsighter(card.insighter.roles))
  }
  return cards.filter((card) => !isCompanyLikeInsighter(card.insighter.roles))
}

function filterMatchedInsightersByPreferredType(
  matches: MatchedInsighter[],
  preferredType: PreferredInsighterTypeFilter
): MatchedInsighter[] {
  if (preferredType === 'Either') return matches

  return matches.filter((match) =>
    preferredType === 'Company'
      ? isCompanyLikeInsighter(match.insighter.roles)
      : !isCompanyLikeInsighter(match.insighter.roles)
  )
}

function getInitials(name: string, maxLetters = 2): string {
  const cleaned = String(name || '').trim()
  if (!cleaned) return ''

  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 1) {
    return Array.from(parts[0]).slice(0, maxLetters).join('').toUpperCase()
  }

  return parts
    .slice(0, maxLetters)
    .map((part) => Array.from(part)[0] || '')
    .join('')
    .toUpperCase()
}

function formatMatchStatus(locale: WizardLocale, value: string | null | undefined): string {
  const normalized = stringifyValue(value)
  if (!normalized) return ''

  const text = normalized
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')

  if (locale !== 'ar') return text

  const labels: Record<string, string> = {
    invited: 'تمت الدعوة',
    pending: 'قيد الانتظار',
    accepted: 'مقبول',
    rejected: 'مرفوض',
  }

  return labels[normalizeValue(value)] || text
}

function getInsighterProfileHref(locale: WizardLocale, insighterUuid: string): string {
  return `/${locale}/profile/${insighterUuid}?entity=insighter`
}

function getCompanyProfileHref(locale: WizardLocale, companyUuid: string): string {
  return `/${locale}/profile/${companyUuid}`
}

function getLoaderCardPositionClass(
  index: number,
  activeIndex: number,
  total: number
): string {
  if (total <= 1) return 'translate-y-0 scale-100 opacity-100 z-30'

  const previousIndex = (activeIndex - 1 + total) % total
  const nextIndex = (activeIndex + 1) % total

  if (index === activeIndex) return 'translate-y-0 scale-100 opacity-100 z-30'
  if (index === previousIndex) return '-translate-y-[92px] scale-[0.9] opacity-25 z-10'
  if (index === nextIndex) return 'translate-y-[92px] scale-[0.9] opacity-25 z-10'

  return index < activeIndex
    ? '-translate-y-[156px] scale-[0.84] opacity-0 z-0'
    : 'translate-y-[156px] scale-[0.84] opacity-0 z-0'
}

function MatchAvatar({
  name,
  profileImage,
  companyLogo,
  isCompany,
  size = 72,
}: {
  name: string
  profileImage?: string | null
  companyLogo?: string | null
  isCompany: boolean
  size?: number
}) {
  const overlaySize = Math.max(30, Math.round(size * 0.36))
  const mainImage = isCompany ? companyLogo || profileImage : profileImage
  const overlayImage = isCompany ? profileImage : companyLogo
  const shouldShowOverlay = Boolean(overlayImage) && overlayImage !== mainImage

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#3B82F6]/80 bg-white/35 backdrop-blur-md">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={name}
            width={size}
            height={size}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <span className="text-base font-semibold text-slate-500">{getInitials(name)}</span>
        )}
      </div>

      {shouldShowOverlay ? (
        <div
          className="absolute bottom-[-16px] right-0 overflow-hidden rounded-full border-[3px] border-white/90 bg-white/80"
          style={{ width: overlaySize, height: overlaySize }}
        >
          <Image
            src={overlayImage!}
            alt={`${name} secondary`}
            width={overlaySize}
            height={overlaySize}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  )
}

function MatchLoader({
  cards,
  activeIndex,
  isRTL,
}: {
  cards: LoaderMatchCard[]
  activeIndex: number
  isRTL: boolean
}) {
  if (cards.length === 0) return null

  return (
    <div >
      <div className="relative mt-1 h-[400] overflow-hidden top-[-70px]" >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          {cards.map((card, index) => {
            const isCompany = isCompanyLikeInsighter(card.insighter.roles)
            const companyName = stringifyValue(card.insighter.company?.legal_name)
            const countryName = card.insighter.country
              ? getDisplayName(isRTL ? 'ar' : 'en', card.insighter.country)
              : ''
            const countryFlag = stringifyValue(card.insighter.country?.flag)
            const showVerifiedBadge = Boolean(card.insighter.company?.verified)
            const isActiveCard = index === activeIndex

            return (
              <div
                key={card.insighter.uuid}
                className={`pointer-events-none absolute inset-x-0 transition-all duration-700 ease-out ${getLoaderCardPositionClass(
                  index,
                  activeIndex,
                  cards.length
                )}`}
              >
                <div
                  className={`mx-auto flex items-center gap-3 rounded-[24px] border px-4 py-3.5 backdrop-blur-md transition-all duration-700 sm:px-5 ${isActiveCard
                    ? 'max-w-3xl border-[#E3EBF8] bg-[#EEF4FF]'
                    : 'max-w-[640px] border-white/80 bg-white/92'
                    }`}
                >
                  <MatchAvatar
                    name={card.insighter.name}
                    profileImage={card.insighter.profile_photo_url}
                    companyLogo={card.insighter.company?.logo}
                    isCompany={isCompany}
                    size={72}
                  />

                  <div className={`min-w-0 flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <div
                      className={`flex flex-wrap items-center gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="truncate text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
                        {card.insighter.name}
                      </div>
                      {showVerifiedBadge ? (
                        <CheckBadgeIcon className="h-4 w-4 shrink-0 text-[#3B82F6]" aria-hidden="true" />
                      ) : null}
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${isCompany ? 'bg-sky-100/90 text-sky-600' : 'bg-emerald-100/90 text-emerald-600'}`}
                      >
                        {isCompany ? 'Company' : 'INSIGHTER'}
                      </span>
                    </div>

                    {isCompany && companyName ? (
                      <div className="mt-1 text-[11px] font-semibold text-[#3B82F6] sm:text-xs">
                        {isRTL ? 'مدير في ' : 'Manager at '}
                        <span className="underline underline-offset-2">{companyName}</span>
                      </div>
                    ) : null}

                    {countryName ? (
                      <div
                        className={`mt-2 flex items-center gap-2 text-[11px] text-slate-600 sm:text-xs ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                      >
                        {countryFlag ? (
                          <Image
                            src={`/images/flags/${countryFlag}.svg`}
                            alt={countryName}
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 object-contain"
                          />
                        ) : null}
                        <span className="truncate">{countryName}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MatchScoreDonut({ score, isRTL }: { score: number; isRTL: boolean }) {
  const pct = Math.round(Math.min(Math.max(score, 0), 1) * 100)
  const radius = 30
  const stroke = 5
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct / 100)
  const size = (radius + stroke) * 2

  const color =
    pct >= 80 ? '#22c55e' : pct >= 50 ? '#3b82f6' : '#f59e0b'

  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-sm font-bold"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
      <span className="text-center text-[10px] font-medium leading-tight text-slate-500">
        {isRTL ? 'نسبة التطابق' : 'Matching Score'}
      </span>
    </div>
  )
}

const MATCH_CRITERIA_LABELS: Record<string, { en: string; ar: string }> = {
  ORIGIN_MATCH: { en: 'Origin', ar: 'البلد' },
  INDUSTRY_MATCH: { en: 'Industry', ar: 'القطاع' },
  EXPERIENCE_MATCH: { en: 'Experience', ar: 'الخبرة' },
  TEAM_SIZE_MATCH: { en: 'Team size', ar: 'حجم الفريق' },
  INSIGHTER_TYPE_MATCH: { en: 'Insighter type', ar: 'نوع الخبير' },
}

function MatchCriteriaPanel({
  matches,
  isRTL,
}: {
  matches: MatchCriteria
  isRTL: boolean
}) {
  const entries = Object.entries(matches).filter(([, value]) => value !== undefined)
  if (entries.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {entries.map(([key, matched]) => {
        const label = MATCH_CRITERIA_LABELS[key]
          ? isRTL
            ? MATCH_CRITERIA_LABELS[key].ar
            : MATCH_CRITERIA_LABELS[key].en
          : key.replace(/_MATCH$/, '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

        return (
          <div
            key={key}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${matched
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
              : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
              }`}
          >
            {matched ? (
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#22c55e" fillOpacity="0.2" />
                <path d="M3.5 6l1.75 1.75L8.5 4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#94a3b8" fillOpacity="0.2" />
                <path d="M4 4l4 4M8 4l-4 4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            {label}
          </div>
        )
      })}
    </div>
  )
}

function MatchedInsighterCard({
  match,
  locale,
  isRTL,
  selected,
  onToggleSelected,
}: {
  match: MatchedInsighter
  locale: WizardLocale
  isRTL: boolean
  selected: boolean
  onToggleSelected: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const isCompany = isCompanyLikeInsighter(match.insighter.roles)
  const companyName = stringifyValue(match.insighter.company?.legal_name)
  const companyUuid = stringifyValue(match.insighter.company?.uuid)
  const countryName = match.insighter.country
    ? getDisplayName(locale, match.insighter.country)
    : ''
  const countryFlag = stringifyValue(match.insighter.country?.flag)
  const badgeLabel = isRTL ? (isCompany ? 'شركة' : 'خبير') : isCompany ? 'Company' : 'INSIGHTER'
  const insighterHref = getInsighterProfileHref(locale, match.insighter.uuid)
  const companyHref = companyUuid ? getCompanyProfileHref(locale, companyUuid) : ''
  const showVerifiedBadge = Boolean(match.insighter.company?.verified)
  const hasMatches = match.matches && Object.keys(match.matches).length > 0

  return (
    <article
      className={`overflow-hidden rounded-[26px] border backdrop-blur-2xl transition-all duration-300 ${selected
        ? 'border-sky-200/90 bg-white/55'
        : 'border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0.3))]'
        }`}
    >
      <div className="p-4 sm:p-5">
        <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <div className="flex self-start pt-1">
            <input
              type="checkbox"
              checked={selected}
              onChange={onToggleSelected}
              onClick={(event) => event.stopPropagation()}
              className="h-5 w-5 rounded border-slate-300 text-[#1C7CBB] focus:ring-2 focus:ring-blue-200"
              aria-label={isRTL ? `تحديد ${match.insighter.name}` : `Select ${match.insighter.name}`}
            />
          </div>

          <div className={`flex flex-1 items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div
              className={`flex flex-1 items-start gap-4 rounded-[22px] ${isRTL ? 'flex-row-reverse text-right' : ''}`}
            >
              <MatchAvatar
                name={match.insighter.name}
                profileImage={match.insighter.profile_photo_url}
                companyLogo={match.insighter.company?.logo}
                isCompany={isCompany}
                size={72}
              />

              <div className="min-w-0 flex-1">
                <div
                  className={`flex flex-wrap items-center gap-2 ${isRTL ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <span className="truncate text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
                    {match.insighter.name}
                  </span>

                  {showVerifiedBadge ? (
                    <CheckBadgeIcon className="h-4 w-4 shrink-0 text-[#3B82F6]" aria-hidden="true" />
                  ) : null}

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${isCompany
                      ? 'bg-sky-100/90 text-sky-600'
                      : 'bg-emerald-100/90 text-emerald-600'
                      }`}
                  >
                    {badgeLabel}
                  </span>
                </div>

                {isCompany && companyName ? (
                  <div className="mt-1 text-[11px] font-semibold text-[#3B82F6] sm:text-xs">
                    {isRTL ? 'مدير في ' : 'Manager at '}
                    {companyUuid ? (
                      <Link
                        href={companyHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="underline underline-offset-2 hover:opacity-80"
                      >
                        {companyName}
                      </Link>
                    ) : (
                      <span>{companyName}</span>
                    )}
                  </div>
                ) : null}

                {countryName ? (
                  <div
                    className={`mt-2 flex items-center gap-2 text-[11px] text-slate-600 sm:text-xs ${isRTL ? 'flex-row-reverse justify-end' : ''
                      }`}
                  >
                    {countryFlag ? (
                      <Image
                        src={`/images/flags/${countryFlag}.svg`}
                        alt={countryName}
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                    ) : null}
                    <span className="truncate">{countryName}</span>
                  </div>
                ) : null}

                <Link
                  href={insighterHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-2.5 hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-[#1C7CBB] hover:text-[#1C7CBB] sm:inline-flex"
                >
                  {isRTL ? 'عرض الملف الشخصي' : 'View profile'}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                    <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Score + expand button column */}
            <div className="hidden shrink-0 flex-col items-center gap-2 sm:flex">
              <MatchScoreDonut score={match.match_score} isRTL={isRTL} />
              {hasMatches ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsExpanded((v) => !v) }}
                  aria-expanded={isExpanded}
                  aria-label={isRTL ? 'عرض تفاصيل التطابق' : 'Show match details'}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                >
                  <ChevronDownIcon
                    className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                  {isRTL ? 'التفاصيل' : 'Details'}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`mt-4 flex items-center justify-between gap-3 sm:hidden ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={`flex min-w-0 flex-1 flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
            <Link
              href={insighterHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-[#1C7CBB] hover:text-[#1C7CBB]"
            >
              {isRTL ? 'عرض الملف الشخصي' : 'View profile'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
              </svg>
            </Link>

            {hasMatches ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded((v) => !v)
                }}
                aria-expanded={isExpanded}
                aria-label={isRTL ? 'عرض تفاصيل التطابق' : 'Show match details'}
                className="inline-flex min-h-9 items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
              >
                <ChevronDownIcon
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                />
                {isRTL ? 'التفاصيل' : 'Details'}
              </button>
            ) : null}
          </div>

          <div className="shrink-0">
            <MatchScoreDonut score={match.match_score} isRTL={isRTL} />
          </div>
        </div>
      </div>

      {/* Expanded match criteria panel */}
      {hasMatches && isExpanded ? (
        <div className={`border-t border-slate-100/70 px-4 py-3 sm:px-5 ${isRTL ? 'text-right' : ''}`}>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {isRTL ? 'معايير التطابق' : 'Match criteria'}
          </p>
          <MatchCriteriaPanel matches={match.matches!} isRTL={isRTL} />
        </div>
      ) : null}
    </article>
  )
}

export default function ProjectMatchesStep({
  locale,
}: {
  locale: WizardLocale
}) {
  const nav = useProjectWizardNavigation(locale)
  const isRTL = locale === 'ar'
  const isEnglish = typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  const [entered, setEntered] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [matchPhase, setMatchPhase] = useState<
    'idle' | 'loader' | 'fetching' | 'ready' | 'empty' | 'error'
  >('idle')
  const [projectUuid, setProjectUuid] = useState<string | null>(null)
  const [preferredMatchType, setPreferredMatchType] =
    useState<PreferredInsighterTypeFilter>('Either')
  const [matchedInsighters, setMatchedInsighters] = useState<MatchedInsighter[]>([])
  const [selectedMatchIds, setSelectedMatchIds] = useState<string[]>([])
  const [loaderActiveIndex, setLoaderActiveIndex] = useState(0)

  useProjectStepErrorToast(error, locale)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30)
    return () => window.clearTimeout(timer)
  }, [])

  const visibleLoaderCards = useMemo(() => {
    const filteredCards = filterLoaderCardsByPreferredType(
      loaderMatchCards,
      preferredMatchType
    )

    return filteredCards.length > 0 ? filteredCards : loaderMatchCards
  }, [preferredMatchType])

  const selectedMatches = useMemo(
    () => matchedInsighters.filter((match) => selectedMatchIds.includes(match.uuid)),
    [matchedInsighters, selectedMatchIds]
  )

  useEffect(() => {
    const nextProjectUuid = readStoredProjectRequestUuid(locale)
    const preferredType = normalizePreferredInsighterTypeSelection(
      readStorageValue(locale, projectWizardStorage.preferredInsighterTypeKey(locale))
    )

    setProjectUuid(nextProjectUuid || null)
    setPreferredMatchType(preferredType)
    setSelectedMatchIds(readStoredSelectedMatchIds(locale))
    setIsInitialized(true)
  }, [locale])

  useEffect(() => {
    if (matchPhase !== 'loader' && matchPhase !== 'fetching') return
    if (visibleLoaderCards.length <= 1) return

    const interval = window.setInterval(() => {
      setLoaderActiveIndex((currentIndex) => (currentIndex + 1) % visibleLoaderCards.length)
    }, 1100)

    return () => window.clearInterval(interval)
  }, [matchPhase, visibleLoaderCards.length])

  useEffect(() => {
    if (!isInitialized) return

    if (!projectUuid) {
      setMatchPhase('empty')
      setMatchedInsighters([])
      setSelectedMatchIds([])
      clearStoredProposalMatchUuid(locale)
      writeStoredSelectedMatchIds(locale, [])
      return
    }

    let cancelled = false
    const controller = new AbortController()

    setError(null)
    setMatchPhase('loader')
    setMatchedInsighters([])
    setLoaderActiveIndex(0)
    clearStoredProposalMatchUuid(locale)

    const timeout = window.setTimeout(() => {
      const loadMatches = async () => {
        if (cancelled) return

        setMatchPhase('fetching')

        try {
          const { matches, proposalMatchUuid } = await fetchMatchedInsighters(
            locale,
            projectUuid,
            controller.signal
          )
          if (cancelled) return

          if (proposalMatchUuid) {
            writeStoredProposalMatchUuid(locale, proposalMatchUuid)
          }

          const filteredMatches = filterMatchedInsightersByPreferredType(
            matches,
            preferredMatchType
          )

          setMatchedInsighters(filteredMatches)
          setSelectedMatchIds((currentIds) => {
            const nextIds = Array.from(
              new Set(
                currentIds.flatMap((id) => {
                  const matchedByUuid = filteredMatches.find((match) => match.uuid === id)
                  if (matchedByUuid) return matchedByUuid.uuid

                  // Preserve selections stored before the switch to match UUIDs.
                  const matchedByInsighterUuid = filteredMatches.find(
                    (match) => match.insighter.uuid === id
                  )
                  return matchedByInsighterUuid ? matchedByInsighterUuid.uuid : []
                })
              )
            )

            writeStoredSelectedMatchIds(locale, nextIds)
            return nextIds
          })
          setMatchPhase(filteredMatches.length > 0 ? 'ready' : 'empty')
        } catch (fetchError) {
          if (cancelled) return
          if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return

          setMatchPhase('error')
          setError(
            getProjectApiErrorMessage(
              fetchError,
              isRTL ? 'تعذر تحميل المطابقات المقترحة.' : 'Failed to load suggested matches.'
            )
          )
        }
      }

      void loadMatches()
    }, MATCH_LOADER_DURATION_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [isInitialized, isRTL, locale, preferredMatchType, projectUuid])

  const toggleSelectedMatch = (matchUuid: string) => {
    setSelectedMatchIds((currentIds) =>
      currentIds.includes(matchUuid)
        ? currentIds.filter((id) => id !== matchUuid)
        : [...currentIds, matchUuid]
    )
  }

  const handleSubmitSelectedMatches = () => {
    if (!canSubmitMatches) return

    writeStoredSelectedMatchIds(locale, selectedMatchIds)
    nav.goNext()
  }

  const canSubmitMatches = matchPhase === 'ready' && selectedMatches.length > 0
  const matchSectionTitle =
    preferredMatchType === 'Company'
      ? isRTL
        ? 'الشركات المطابقة'
        : 'Matched companies'
      : preferredMatchType === 'Individual'
        ? isRTL
          ? 'الخبراء المطابقون'
          : 'Matched insighters'
        : isRTL
          ? 'المطابقات المقترحة'
          : 'Suggested matches'
  const isLoadingMatches =
    matchPhase === 'idle' || matchPhase === 'loader' || matchPhase === 'fetching'
  const stepTitle = isLoadingMatches
    ? preferredMatchType === 'Company'
      ? isRTL
        ? 'جارٍ البحث عن الشركات المطابقة'
        : 'Searching for matching companies'
      : preferredMatchType === 'Individual'
        ? isRTL
          ? 'جارٍ البحث عن الخبراء المطابقين'
          : 'Searching for matching insighters'
        : isRTL
          ? 'جارٍ البحث عن النتائج المطابقة'
          : 'Searching for matching results'
    : matchPhase === 'ready'
      ? isRTL
        ? 'اختر واحدًا أو أكثر من النتائج المقترحة'
        : 'Select one or more from suggested results'
      : matchSectionTitle
  const stepDescription = isLoadingMatches
    ? isRTL
      ? 'نطابق متطلبات المشروع وتفضيلاتك مع الحسابات الأنسب.'
      : 'We are matching the project requirements and preferences with the most relevant profiles.'
    : matchPhase === 'ready'
      ? isRTL
        ? 'راجع النتائج المقترحة وحدد الحسابات التي تريد المتابعة معها.'
        : 'Review the suggested results and select the profiles you want to continue with.'
      : isRTL
        ? 'هذه الحسابات المطابقة لتفضيلات المشروع.'
        : 'These profiles match the project preferences.'

  return (
    <div
      className="w-full max-w-6xl mx-auto min-h-full flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 overflow-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-[980px]">
          {isEnglish ? (
            <style>{`
              #project-matches-step-title {
                font-family: "IBM Plex Serif", serif !important;
              }
            `}</style>
          ) : null}

          <div
            className={`text-start transition-all duration-700 ${entered
              ? 'opacity-100 translate-x-0'
              : isRTL
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              }`}
          >
            <h2
              id="project-matches-step-title"
              className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start"
            >
              {stepTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 pb-12">
              {stepDescription}
            </p>
          </div>

          <div className={`${isLoadingMatches ? '' : 'mt-6'}`}>
            {matchPhase === 'idle' ||
              matchPhase === 'loader' ||
              matchPhase === 'fetching' ? (
              <MatchLoader
                cards={visibleLoaderCards}
                activeIndex={loaderActiveIndex}
                isRTL={isRTL}
              />
            ) : null}

            {matchPhase === 'ready' ? (
              <div className="space-y-4 max-w-4xl m-auto">
                {matchedInsighters.map((match) => (
                  <MatchedInsighterCard
                    key={match.uuid}
                    match={match}
                    locale={locale}
                    isRTL={isRTL}
                    selected={selectedMatchIds.includes(match.uuid)}
                    onToggleSelected={() => toggleSelectedMatch(match.uuid)}
                  />
                ))}
              </div>
            ) : null}

            {matchPhase === 'empty' ? (
              <div className="rounded-[26px] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0.3))] px-6 py-10 text-center backdrop-blur-2xl">
                <div className="text-base font-semibold text-slate-900">
                  {isRTL
                    ? 'لا توجد مطابقات متاحة حاليًا'
                    : 'No matches are available right now'}
                </div>
                <div className="mt-2 text-xs text-slate-500 sm:text-sm">
                  {isRTL
                    ? 'سنضيف النتائج هنا فور توفر مطابقات تناسب تفضيلات المشروع.'
                    : 'Results will appear here as soon as there are matches that fit the project preferences.'}
                </div>
              </div>
            ) : null}

            {matchPhase === 'error' ? (
              <div className="rounded-[26px] border border-rose-100/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,245,245,0.36))] px-6 py-10 text-center backdrop-blur-2xl">
                <div className="text-base font-semibold text-rose-700">
                  {isRTL ? 'تعذر تحميل المطابقات' : 'Unable to load matches'}
                </div>
                <div className="mt-2 text-xs text-rose-600 sm:text-sm">
                  {error ||
                    (isRTL
                      ? 'حاول مرة أخرى بعد قليل.'
                      : 'Please try again in a moment.')}
                </div>
              </div>
            ) : null}
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
              onClick={handleSubmitSelectedMatches}
              disabled={!canSubmitMatches}
              className={`btn-sm rounded-full px-5 py-2 ${canSubmitMatches
                ? 'bg-[#1C7CBB] text-white hover:bg-opacity-90'
                : 'cursor-not-allowed bg-slate-200 text-slate-500'
                }`}
            >
              {matchPhase === 'loader' || matchPhase === 'fetching'
                ? isRTL
                  ? 'جاري البحث...'
                  : 'Searching...'
                : isRTL
                  ? 'متابعة'
                  : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
